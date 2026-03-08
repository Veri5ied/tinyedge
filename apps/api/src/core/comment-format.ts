import { AnalysisResult } from "../types/analysis";

export const TINYEDGE_COMMENT_MARKER = "<!-- tinyedge:comment -->";

export function renderComment(analysis: AnalysisResult): string {
  const json = JSON.stringify(analysis, null, 2);
  const tests = renderSectionItems(
    analysis.testSuggestions,
    "No test scenarios identified from this diff.",
  );
  const risks = renderSectionItems(
    analysis.riskFlags,
    "No risky logic changes identified from this diff.",
  );

  return [
    TINYEDGE_COMMENT_MARKER,
    "## Tinyedge Review",
    "",
    "### Suggested test scenarios",
    tests,
    "",
    "### Risky logic flags",
    risks,
    "",
    "<details>",
    "<summary>Machine-readable JSON</summary>",
    "",
    "```json",
    json,
    "```",
    "</details>",
  ].join("\n");
}

export function isTinyedgeComment(body: string): boolean {
  return body.includes(TINYEDGE_COMMENT_MARKER);
}

function renderSectionItems(items: string[], emptyState: string): string {
  if (items.length === 0) {
    return `- ${emptyState}`;
  }

  return items
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter((item) => item.length > 0)
    .map((item) => `- ${item}`)
    .join("\n");
}
