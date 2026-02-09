export type TinyedgeConfig = {
  webhookSecret: string;
  port: number;
  llmUrl: string;
  llmApiKey?: string;
  dryRun: boolean;
  maxDiffBytes: number;
  requestTimeoutMs: number;
  retryAttempts: number;
  retryDelayMs: number;
  deliveryTtlMs: number;
  octokitCacheTtlMs: number;
};

export function loadConfig(): TinyedgeConfig {
  const missing: string[] = [];

  const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!webhookSecret) missing.push("GITHUB_WEBHOOK_SECRET");

  const llmUrl = process.env.TINYEDGE_LLM_URL;
  if (!llmUrl) missing.push("TINYEDGE_LLM_URL");

  if (missing.length > 0) {
    throw new Error(`Missing required env: ${missing.join(", ")}`);
  }

  const port = Number(process.env.PORT ?? 3000);
  const maxDiffBytes = Number(process.env.TINYEDGE_MAX_DIFF_BYTES ?? 500_000);
  const requestTimeoutMs = Number(process.env.TINYEDGE_REQUEST_TIMEOUT_MS ?? 15_000);
  const retryAttempts = Number(process.env.TINYEDGE_RETRY_ATTEMPTS ?? 2);
  const retryDelayMs = Number(process.env.TINYEDGE_RETRY_DELAY_MS ?? 500);
  const deliveryTtlMs = Number(process.env.TINYEDGE_DELIVERY_TTL_MS ?? 10 * 60 * 1000);
  const octokitCacheTtlMs = Number(process.env.TINYEDGE_OCTOKIT_CACHE_TTL_MS ?? 5 * 60 * 1000);
  const dryRun = String(process.env.TINYEDGE_DRY_RUN ?? "").toLowerCase() === "true";

  return {
    webhookSecret,
    port,
    llmUrl,
    llmApiKey: process.env.TINYEDGE_LLM_API_KEY,
    dryRun,
    maxDiffBytes,
    requestTimeoutMs,
    retryAttempts,
    retryDelayMs,
    deliveryTtlMs,
    octokitCacheTtlMs,
  };
}
