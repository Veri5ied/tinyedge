export type TinyedgeConfig = {
  webhookSecret: string | undefined;
  port: number;
  llmProvider: "openai" | "gemini" | "mock";
  llmApiKey?: string;
  llmModel?: string;
  llmUrl?: string;
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

  const webhookSecret = requiredEnv("GITHUB_WEBHOOK_SECRET", missing);
  const llmUrl = process.env.TINYEDGE_LLM_URL;
  const llmProvider = resolveProvider(
    process.env.TINYEDGE_LLM_PROVIDER,
    llmUrl,
    missing,
  );

  const isMock = llmProvider === "mock";
  if (isMock && !llmUrl) missing.push("TINYEDGE_LLM_URL");

  const llmApiKey = isMock ? undefined : requiredEnv("TINYEDGE_LLM_API_KEY", missing);
  const llmModel = isMock ? undefined : requiredEnv("TINYEDGE_LLM_MODEL", missing);

  if (missing.length > 0) {
    throw new Error(`Missing required env: ${missing.join(", ")}`);
  }

  const port = Number(process.env.PORT ?? 3000);
  const maxDiffBytes = Number(process.env.TINYEDGE_MAX_DIFF_BYTES ?? 500_000);
  const requestTimeoutMs = Number(
    process.env.TINYEDGE_REQUEST_TIMEOUT_MS ?? 15_000,
  );
  const retryAttempts = Number(process.env.TINYEDGE_RETRY_ATTEMPTS ?? 2);
  const retryDelayMs = Number(process.env.TINYEDGE_RETRY_DELAY_MS ?? 500);
  const deliveryTtlMs = Number(
    process.env.TINYEDGE_DELIVERY_TTL_MS ?? 10 * 60 * 1000,
  );
  const octokitCacheTtlMs = Number(
    process.env.TINYEDGE_OCTOKIT_CACHE_TTL_MS ?? 5 * 60 * 1000,
  );
  const dryRun =
    String(process.env.TINYEDGE_DRY_RUN ?? "").toLowerCase() === "true";

  return {
    webhookSecret,
    port,
    llmProvider: llmProvider ?? "mock",
    llmApiKey,
    llmModel,
    llmUrl,
    dryRun,
    maxDiffBytes,
    requestTimeoutMs,
    retryAttempts,
    retryDelayMs,
    deliveryTtlMs,
    octokitCacheTtlMs,
  };
}

function requiredEnv(name: string, missing: string[]): string | undefined {
  const value = process.env[name];
  if (!value) missing.push(name);
  return value;
}

function resolveProvider(
  raw: string | undefined,
  llmUrl: string | undefined,
  missing: string[],
): TinyedgeConfig["llmProvider"] | undefined {
  const normalized = raw?.toLowerCase();
  if (normalized) {
    if (normalized === "openai" || normalized === "gemini" || normalized === "mock") {
      return normalized;
    }
    throw new Error(`Unsupported TINYEDGE_LLM_PROVIDER: ${normalized}`);
  }

  if (llmUrl) return "mock";
  missing.push("TINYEDGE_LLM_PROVIDER");
  return undefined;
}
