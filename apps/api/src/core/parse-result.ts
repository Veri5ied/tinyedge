import { AnalysisResult } from "../types/analysis";

type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue };

function isStringArray(value: JsonValue): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

export function parseResult(raw: string): AnalysisResult {
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    throw new Error("LLM response was empty");
  }

  let parsed: JsonValue;
  try {
    parsed = JSON.parse(trimmed) as JsonValue;
  } catch (error) {
    throw new Error("LLM response was not valid JSON");
  }

  if (parsed === null || Array.isArray(parsed) || typeof parsed !== "object") {
    throw new Error("LLM response was not an object");
  }

  const keys = Object.keys(parsed);
  if (
    keys.length !== 2 ||
    !keys.includes("testSuggestions") ||
    !keys.includes("riskFlags")
  ) {
    throw new Error("LLM response had unexpected shape");
  }

  const testSuggestions = (parsed as { testSuggestions: JsonValue })
    .testSuggestions;
  const riskFlags = (parsed as { riskFlags: JsonValue }).riskFlags;

  if (!isStringArray(testSuggestions) || !isStringArray(riskFlags)) {
    throw new Error("LLM response fields must be string arrays");
  }

  if (testSuggestions.length > 5 || riskFlags.length > 5) {
    throw new Error("LLM response arrays exceed maximum length");
  }

  return {
    testSuggestions,
    riskFlags,
  };
}
