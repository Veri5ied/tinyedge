export type TinyedgeConfig = {
  webhookSecret: string | undefined;
  port: number;
  llmProvider: "openai" | "gemini" | "mock";
  llmApiKey?: string;
  llmModel?: string;
  llmUrl?: string;
  llmBaseUrl?: string;
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

  const providerRaw = process.env.TINYEDGE_LLM_PROVIDER;
  const llmUrl = process.env.TINYEDGE_LLM_URL;
  const llmProvider =
    (providerRaw?.toLowerCase() as TinyedgeConfig["llmProvider"] | undefined) ??
    (llmUrl ? "mock" : undefined);

  if (!llmProvider) {
    missing.push("TINYEDGE_LLM_PROVIDER");
  } else if (!["openai", "gemini", "mock"].includes(llmProvider)) {
    throw new Error(`Unsupported TINYEDGE_LLM_PROVIDER: ${llmProvider}`);
  }

  let llmApiKey: string | undefined;
  let llmModel: string | undefined;
  let llmBaseUrl: string | undefined;

  if (llmProvider === "mock") {
    if (!llmUrl) missing.push("TINYEDGE_LLM_URL");
  } else {
    if (llmProvider === "openai") {
      llmApiKey =
        process.env.OPENAI_API_KEY ?? process.env.TINYEDGE_LLM_API_KEY;
      llmModel = process.env.OPENAI_MODEL ?? process.env.TINYEDGE_LLM_MODEL;
      llmBaseUrl =
        process.env.OPENAI_BASE_URL ?? process.env.TINYEDGE_LLM_BASE_URL;
      if (!llmApiKey) missing.push("OPENAI_API_KEY");
      if (!llmModel) missing.push("OPENAI_MODEL");
    } else if (llmProvider === "gemini") {
      llmApiKey =
        process.env.GEMINI_API_KEY ?? process.env.TINYEDGE_LLM_API_KEY;
      llmModel = process.env.GEMINI_MODEL ?? process.env.TINYEDGE_LLM_MODEL;
      if (!llmApiKey) missing.push("GEMINI_API_KEY");
      if (!llmModel) missing.push("GEMINI_MODEL");
    }
  }

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
    llmBaseUrl,
    dryRun,
    maxDiffBytes,
    requestTimeoutMs,
    retryAttempts,
    retryDelayMs,
    deliveryTtlMs,
    octokitCacheTtlMs,
  };
}
