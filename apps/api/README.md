# Tinyedge

Tinyedge is an open-source GitHub App that reviews pull requests and highlights:
- Suggested test scenarios
- Risky or non-obvious logic changes

Tinyedge does not write tests.
Tinyedge does not replace code review.
Tinyedge exists to point out what deserves attention.

## What Tinyedge does

- Runs on pull request open and update events
- Analyzes only the changed diff
- Suggests missing test scenarios
- Flags risky logic changes
- Posts a single comment per pull request

## What Tinyedge does NOT do

- No test code generation
- No style or formatting comments
- No dashboards or UI
- No configuration files
- No database
- No analytics
- No CI replacement

## Setup

### Environment variables

Required:
- `GITHUB_APP_ID`: GitHub App ID
- `GITHUB_PRIVATE_KEY`: GitHub App private key (PEM). Newlines can be escaped as `\n`.
- `GITHUB_WEBHOOK_SECRET`: Webhook secret configured in the GitHub App
- `TINYEDGE_LLM_URL`: HTTP endpoint that accepts `{ "prompt": "..." }` and returns `{ "text": "..." }`

Optional:
- `TINYEDGE_LLM_API_KEY`: Optional bearer token for the LLM endpoint
- `TINYEDGE_BOT_LOGIN`: Optional GitHub login to identify the Tinyedge comment
- `PORT`: Optional, defaults to `3000`
- `TINYEDGE_DRY_RUN`: Set to `true` to skip posting comments
- `TINYEDGE_MAX_DIFF_BYTES`: Max diff size in bytes (default `500000`)
- `TINYEDGE_REQUEST_TIMEOUT_MS`: LLM request timeout in ms (default `15000`)
- `TINYEDGE_RETRY_ATTEMPTS`: Retry attempts for GitHub/LLM calls (default `2`)
- `TINYEDGE_RETRY_DELAY_MS`: Delay between retries in ms (default `500`)
- `TINYEDGE_DELIVERY_TTL_MS`: Delivery id cache TTL in ms (default `600000`)
- `TINYEDGE_OCTOKIT_CACHE_TTL_MS`: Octokit cache TTL in ms (default `300000`)

### Install

```bash
pnpm install
```

### Build

```bash
pnpm -C apps/api run build
```

### Run

```bash
pnpm -C apps/api start
```

## Local mock LLM

The mock server is useful for local wiring without external dependencies.

1. Start the mock server:

```bash
pnpm -C apps/api run mock-llm
```

2. Point Tinyedge at it:

- `TINYEDGE_LLM_URL=http://localhost:5050/llm`
- `MOCK_LLM_PORT=5050` (optional)

## License

MIT
