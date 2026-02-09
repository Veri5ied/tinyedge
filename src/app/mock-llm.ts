import express, { Request, Response } from "express";

export function startMockLlmServer(): void {
  const app = express();
  app.use(express.json({ limit: "2mb" }));

  app.post("/llm", (req: Request, res: Response) => {
    const payload = req.body as { prompt?: unknown };
    if (typeof payload?.prompt !== "string") {
      res.status(400).json({ error: "prompt must be a string" });
      return;
    }

    const response = {
      testSuggestions: [],
      riskFlags: [],
    };

    res.json({ text: JSON.stringify(response) });
  });

  const port = Number(process.env.MOCK_LLM_PORT) || 5050;
  app.listen(port, () => {
    process.stdout.write(`Mock LLM listening on ${port}\n`);
  });
}
