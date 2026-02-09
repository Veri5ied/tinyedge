import { AnalysisResult } from "../types/analysis";
import { LLM_PROMPT } from "./prompt";
import { parseResult } from "./parse-result";

export type LlmCall = (prompt: string) => Promise<string>;

export async function analyzeDiff(
  diff: string,
  callLlm: LlmCall,
): Promise<AnalysisResult> {
  const prompt = `${LLM_PROMPT}\nDiff:\n${diff}`;
  const response = await callLlm(prompt);
  return parseResult(response);
}
