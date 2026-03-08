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

export function parseResultWithFallback(raw: string): AnalysisResult {
  try {
    return parseResult(raw);
  } catch (strictError) {
    const fallback = tryParseResultWithFallback(raw);
    if (fallback) {
      return fallback;
    }
    throw strictError;
  }
}

export function tryParseResultWithFallback(raw: string): AnalysisResult | null {
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const candidates = extractJsonCandidates(trimmed);
  for (const candidate of candidates) {
    const parsed = tryParseJson(candidate);
    if (!parsed) {
      continue;
    }

    const normalized = normalizeParsedResult(parsed);
    if (normalized) {
      return normalized;
    }
  }

  return null;
}

function normalizeParsedResult(parsed: JsonValue): AnalysisResult | null {
  if (parsed === null || Array.isArray(parsed) || typeof parsed !== "object") {
    return null;
  }

  const objectValue = parsed as { [key: string]: JsonValue };
  if (!("testSuggestions" in objectValue) || !("riskFlags" in objectValue)) {
    return null;
  }

  const testSuggestions = coerceStringArray(objectValue.testSuggestions);
  const riskFlags = coerceStringArray(objectValue.riskFlags);
  if (!testSuggestions || !riskFlags) {
    return null;
  }

  return {
    testSuggestions: testSuggestions.slice(0, 5),
    riskFlags: riskFlags.slice(0, 5),
  };
}

function coerceStringArray(value: JsonValue): string[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const filtered = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return filtered;
}

function tryParseJson(input: string): JsonValue | null {
  try {
    return JSON.parse(input) as JsonValue;
  } catch {
    return null;
  }
}

function extractJsonCandidates(raw: string): string[] {
  const candidates: string[] = [raw];

  const fencedBlocks = raw.matchAll(/```(?:json)?\s*([\s\S]*?)```/gi);
  for (const block of fencedBlocks) {
    const content = block[1]?.trim();
    if (content) {
      candidates.push(content);
    }
  }

  const firstObject = extractFirstJsonObject(raw);
  if (firstObject) {
    candidates.push(firstObject);
  }

  return dedupe(candidates);
}

function extractFirstJsonObject(raw: string): string | null {
  for (
    let start = raw.indexOf("{");
    start !== -1;
    start = raw.indexOf("{", start + 1)
  ) {
    let depth = 0;
    let inString = false;
    let escaped = false;

    for (let i = start; i < raw.length; i += 1) {
      const char = raw[i];

      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === '"') {
        inString = !inString;
        continue;
      }

      if (inString) {
        continue;
      }

      if (char === "{") {
        depth += 1;
      } else if (char === "}") {
        depth -= 1;
        if (depth === 0) {
          return raw.slice(start, i + 1);
        }
      }
    }
  }

  return null;
}

function dedupe(values: string[]): string[] {
  return [...new Set(values)];
}
