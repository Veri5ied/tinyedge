# Tinyedge Monorepo

Tinyedge is an open-source GitHub App that reviews pull requests and returns:
- Suggested test scenarios
- Risky or non-obvious logic changes

It is intentionally narrow in scope and operates only on the diff it receives.

## Repository layout

- `apps/api`: Tinyedge GitHub App (Express webhook server)
- `apps/web`: Next.js frontend placeholder (no app code yet)

## Goals

- Analyze only changed diffs
- Suggest concrete test scenarios
- Flag risky or non-obvious logic changes
- Stay silent when there is nothing meaningful to say

## Non-goals

- Test code generation
- Style or formatting comments
- UI dashboards or analytics
- CI replacement

## Quick start (api)

```bash
pnpm install
pnpm -C apps/api run build
pnpm -C apps/api run dev
```

## Configuration (api)

Required:
- `GITHUB_APP_ID`
- `GITHUB_PRIVATE_KEY`
- `GITHUB_WEBHOOK_SECRET`
- `TINYEDGE_LLM_PROVIDER` (`openai`, `gemini`, or `mock`)

Optional:
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `OPENAI_BASE_URL`
- `GEMINI_API_KEY`
- `GEMINI_MODEL`
- `TINYEDGE_LLM_URL` (required only for `mock`)
- `TINYEDGE_BOT_LOGIN`
- `PORT`
- `TINYEDGE_DRY_RUN`
- `TINYEDGE_MAX_DIFF_BYTES`
- `TINYEDGE_REQUEST_TIMEOUT_MS`
- `TINYEDGE_RETRY_ATTEMPTS`
- `TINYEDGE_RETRY_DELAY_MS`
- `TINYEDGE_DELIVERY_TTL_MS`
- `TINYEDGE_OCTOKIT_CACHE_TTL_MS`

## Docs

- `apps/api/README.md`
- `apps/api/SELF_HOSTING.md`
