export type LlmClient = {
  request: (prompt: string) => Promise<string>;
};

export type LlmProvider = "openai" | "gemini" | "mock";

export type LlmConfig = {
  provider: LlmProvider;
  apiKey?: string;
  model?: string;
  url?: string;
  timeoutMs: number;
};

export function createLlmClient(config: LlmConfig): LlmClient {
  switch (config.provider) {
    case "openai":
      return createOpenAiClient(config);
    case "gemini":
      return createGeminiClient(config);
    case "mock":
      return createMockClient(config);
    default: {
      const exhaustive: never = config.provider;
      throw new Error(`Unsupported LLM provider: ${exhaustive}`);
    }
  }
}

function createOpenAiClient(config: LlmConfig): LlmClient {
  if (!config.apiKey) {
    throw new Error("TINYEDGE_LLM_API_KEY is required for OpenAI");
  }
  if (!config.model) {
    throw new Error("TINYEDGE_LLM_MODEL is required for OpenAI");
  }

  return {
    async request(prompt: string): Promise<string> {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

      try {
        const { default: OpenAI } = (await import("openai")) as {
          default: new (options: { apiKey: string }) => {
            chat: {
              completions: {
                create: (input: {
                  model: string;
                  messages: Array<{ role: "user"; content: string }>;
                }) => Promise<{
                  choices?: Array<{ message?: { content?: unknown } }>;
                }>;
              };
            };
          };
        };

        const client = new OpenAI({
          apiKey: config.apiKey!,
        });

        const completion = await client.chat.completions.create({
          model: config.model!,
          messages: [{ role: "user", content: prompt }],
        });

        const content = completion.choices?.[0]?.message?.content;
        if (typeof content !== "string") {
          throw new Error("OpenAI response missing message content");
        }
        return content;
      } finally {
        clearTimeout(timeout);
      }
    },
  };
}

function createGeminiClient(config: LlmConfig): LlmClient {
  if (!config.apiKey) {
    throw new Error("TINYEDGE_LLM_API_KEY is required for Gemini");
  }
  if (!config.model) {
    throw new Error("TINYEDGE_LLM_MODEL is required for Gemini");
  }

  return {
    async request(prompt: string): Promise<string> {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

      try {
        const { GoogleGenAI } = (await import("@google/genai")) as {
          GoogleGenAI: new (options: { apiKey: string }) => {
            models: {
              generateContent: (input: {
                model: string;
                contents: string;
              }) => Promise<{ text?: unknown }>;
            };
          };
        };

        const ai = new GoogleGenAI({ apiKey: config.apiKey! });
        const response = await ai.models.generateContent({
          model: config.model!,
          contents: prompt,
        });

        const text = response.text;
        if (typeof text !== "string") {
          throw new Error("Gemini response missing text");
        }
        return text;
      } finally {
        clearTimeout(timeout);
      }
    },
  };
}

function createMockClient(config: LlmConfig): LlmClient {
  if (!config.url) {
    throw new Error("TINYEDGE_LLM_URL is required for mock LLM");
  }

  return {
    async request(prompt: string): Promise<string> {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

      try {
        const response = await fetch(config.url!, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ prompt }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Mock LLM request failed with status ${response.status}`,
          );
        }

        const data = (await response.json()) as { text?: unknown };
        if (typeof data.text !== "string") {
          throw new Error("Mock LLM response missing text field");
        }

        return data.text;
      } finally {
        clearTimeout(timeout);
      }
    },
  };
}
