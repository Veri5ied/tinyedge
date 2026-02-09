# Self-Hosting Tinyedge

This guide covers the minimum steps to run Tinyedge on your own infrastructure.

## Requirements

- Node.js 18+
- pnpm
- Public HTTPS endpoint for GitHub webhooks

## 1. Create the GitHub App

1. Go to GitHub Settings → Developer settings → GitHub Apps → New GitHub App.
2. Set a homepage URL (any valid URL).
3. Set the webhook URL to your public endpoint + `/webhook`.
4. Set a webhook secret.
5. Permissions:
   - Pull requests: Read
   - Issues: Read & Write
   - Contents: Read
6. Subscribe to events:
   - Pull request
7. Create the App.
8. Generate and download a private key.
9. Install the App on the repositories you want to review.

## 2. Configure Environment Variables

Required:

- `GITHUB_APP_ID`
- `GITHUB_PRIVATE_KEY` (PEM content; newlines can be escaped as `\n`)
- `GITHUB_WEBHOOK_SECRET`
- `TINYEDGE_LLM_URL`

Optional:

- `TINYEDGE_LLM_API_KEY` (optional)
- `TINYEDGE_BOT_LOGIN` (optional; GitHub login used to detect existing comments)
- `PORT` (optional; default `3000`)
- `TINYEDGE_DRY_RUN` (optional; set to `true` to skip posting comments)
- `TINYEDGE_MAX_DIFF_BYTES` (optional; default `500000`)
- `TINYEDGE_REQUEST_TIMEOUT_MS` (optional; default `15000`)
- `TINYEDGE_RETRY_ATTEMPTS` (optional; default `2`)
- `TINYEDGE_RETRY_DELAY_MS` (optional; default `500`)
- `TINYEDGE_DELIVERY_TTL_MS` (optional; default `600000`)
- `TINYEDGE_OCTOKIT_CACHE_TTL_MS` (optional; default `300000`)

## 3. Run Locally

```bash
pnpm install
pnpm run build
pnpm start
```

## 4. Run with the Mock LLM

```bash
pnpm run mock-llm
```

Set:

- `TINYEDGE_LLM_URL=http://localhost:5050/llm`

## 5. Production Notes

- Terminate TLS at a reverse proxy (nginx, Caddy, or your platform edge).
- Preserve raw request bodies for webhook signature verification.
- Ensure only the `/webhook` endpoint is exposed publicly.
- Rotate the webhook secret and app private key if compromised.
- Use `/healthz` for uptime checks and `/metrics` for operational visibility.

## 6. Basic Health Check

A successful webhook delivery returns HTTP 200. Unsupported events return HTTP 202.

