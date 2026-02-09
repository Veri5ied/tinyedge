import express, { Request, Response } from "express";
import crypto from "node:crypto";
import { createGitHubApp } from "./github-app";
import { analyzeDiff } from "../core/analyze-diff";
import { fetchDiff } from "../github/fetch-diff";
import { findExistingComment } from "../github/find-comment";
import { postComment } from "../github/post-comment";
import { loadConfig } from "./config";
import { log } from "./logger";
import { createMetrics } from "./metrics";
import { retry } from "./retry";
import { createHttpLlmClient } from "../core/llm-client";
import { createDeliveryCache } from "./idempotency";
import { createOctokitCache } from "./octokit-cache";

const EVENT_NAMES = new Set(["pull_request.opened", "pull_request.synchronize"]);

type WebhookHeaders = {
  "x-github-event": string | undefined;
  "x-github-delivery": string | undefined;
  "x-hub-signature-256": string | undefined;
};

export function startServer(): void {
  const config = loadConfig();
  const app = express();
  const githubApp = createGitHubApp();
  const llmClient = createHttpLlmClient({
    url: config.llmUrl,
    apiKey: config.llmApiKey,
    timeoutMs: config.requestTimeoutMs,
  });

  const metrics = createMetrics();
  const deliveryCache = createDeliveryCache(config.deliveryTtlMs);
  const getInstallationOctokit = createOctokitCache(githubApp, config.octokitCacheTtlMs);

  app.get("/healthz", (_req: Request, res: Response) => {
    res.status(200).json({ ok: true });
  });

  app.get("/metrics", (_req: Request, res: Response) => {
    res.status(200).json(metrics);
  });

  app.post("/webhook", express.raw({ type: "*/*" }), async (req: Request, res: Response) => {
    metrics.deliveriesReceived += 1;

    const headers = req.headers as WebhookHeaders;
    const eventName = headers["x-github-event"];
    const deliveryId = headers["x-github-delivery"];
    const signature = headers["x-hub-signature-256"];

    if (!eventName || !deliveryId || !signature) {
      metrics.deliveriesInvalid += 1;
      res.status(400).send("Missing webhook headers");
      return;
    }

    if (deliveryCache.has(deliveryId)) {
      metrics.deliveriesDuplicate += 1;
      res.status(202).send("Duplicate delivery");
      return;
    }
    deliveryCache.add(deliveryId);

    const payload = req.body instanceof Buffer ? req.body.toString("utf8") : "";

    if (!verifySignature(config.webhookSecret, payload, signature)) {
      metrics.deliveriesInvalid += 1;
      log("warn", "Invalid webhook signature", { deliveryId, eventName });
      res.status(401).send("Invalid signature");
      return;
    }

    if (!EVENT_NAMES.has(eventName)) {
      metrics.deliveriesIgnored += 1;
      res.status(202).send("Ignored event");
      return;
    }

    try {
      const event = JSON.parse(payload) as {
        installation?: { id: number };
        repository?: { name: string; owner?: { login: string } };
        pull_request?: { number: number };
      };

      const installationId = event.installation?.id;
      const owner = event.repository?.owner?.login;
      const repo = event.repository?.name;
      const pullNumber = event.pull_request?.number;

      if (!installationId || !owner || !repo || !pullNumber) {
        metrics.deliveriesInvalid += 1;
        res.status(400).send("Missing event data");
        return;
      }

      const octokit = await retry(
        () => getInstallationOctokit(installationId),
        config.retryAttempts,
        config.retryDelayMs
      );

      const diff = await retry(
        () => fetchDiff(octokit, owner, repo, pullNumber),
        config.retryAttempts,
        config.retryDelayMs
      );

      if (Buffer.byteLength(diff, "utf8") > config.maxDiffBytes) {
        metrics.diffsOversized += 1;
        log("warn", "Diff exceeded size limit", {
          owner,
          repo,
          pullNumber,
          deliveryId,
          maxDiffBytes: config.maxDiffBytes,
        });
        res.status(202).send("Diff too large");
        return;
      }

      let analysis;
      try {
        analysis = await retry(
          () => analyzeDiff(diff, llmClient.request),
          config.retryAttempts,
          config.retryDelayMs
        );
      } catch (error) {
        metrics.llmFailures += 1;
        throw error;
      }

      const commentBody = JSON.stringify(analysis, null, 2);
      const existingCommentId = await retry(
        () => findExistingComment(octokit, owner, repo, pullNumber),
        config.retryAttempts,
        config.retryDelayMs
      );

      if (config.dryRun) {
        metrics.commentsSkipped += 1;
        log("info", "Dry run enabled, skipping comment", {
          owner,
          repo,
          pullNumber,
          deliveryId,
        });
        res.status(200).send("Dry run");
        return;
      }

      await retry(
        () => postComment(octokit, owner, repo, pullNumber, commentBody, existingCommentId),
        config.retryAttempts,
        config.retryDelayMs
      );

      if (existingCommentId) {
        metrics.commentsUpdated += 1;
      } else {
        metrics.commentsPosted += 1;
      }

      res.status(200).send("OK");
    } catch (error) {
      metrics.deliveriesFailed += 1;
      log("error", "Tinyedge failed", {
        deliveryId,
        eventName,
        error: error instanceof Error ? error.message : String(error),
      });
      res.status(500).send("Tinyedge failed");
    }
  });

  app.listen(config.port, () => {
    log("info", "Tinyedge listening", { port: config.port });
  });
}

function verifySignature(secret: string, payload: string, signature: string): boolean {
  if (!signature.startsWith("sha256=")) {
    return false;
  }

  const expected = `sha256=${crypto.createHmac("sha256", secret).update(payload).digest("hex")}`;
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}
