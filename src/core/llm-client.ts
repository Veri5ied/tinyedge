export type LlmClient = {
  request: (prompt: string) => Promise<string>;
};

export type HttpLlmConfig = {
  url: string;
  apiKey?: string;
  timeoutMs: number;
};

export function createHttpLlmClient(config: HttpLlmConfig): LlmClient {
  return {
    async request(prompt: string): Promise<string> {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

      try {
        const response = await fetch(config.url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            ...(config.apiKey ? { authorization: `Bearer ${config.apiKey}` } : {}),
          },
          body: JSON.stringify({ prompt }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`LLM request failed with status ${response.status}`);
        }

        const data = (await response.json()) as { text?: unknown };
        if (typeof data.text !== "string") {
          throw new Error("LLM response missing text field");
        }

        return data.text;
      } finally {
        clearTimeout(timeout);
      }
    },
  };
}
