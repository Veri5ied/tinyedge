# Contributing to Tinyedge

Thanks for helping improve Tinyedge. This project is intentionally small and focused. Contributions should keep the scope narrow and the signal high.

## Principles

- Keep changes minimal and purposeful.
- Avoid features that turn Tinyedge into a platform or SaaS.
- Do not add test generation, style feedback, or speculative analysis.
- Favor clarity and stability over cleverness.

## Getting started

```bash
pnpm install
```

## Project layout

- `apps/api`: GitHub App (webhook server + diff analysis)
- `apps/web`: Next.js placeholder

## Local development

### API

```bash
pnpm -C apps/api run dev
```

### Mock LLM

```bash
pnpm -C apps/api run mock-llm
```

Set:

- `TINYEDGE_LLM_PROVIDER=mock`
- `TINYEDGE_LLM_URL=http://localhost:5050/llm`

## Contribution guidelines

- Keep PRs small and focused.
- Include a clear description of behavior changes.
- Update docs when adding or changing configuration.
- Avoid adding new dependencies unless justified.
- When tackling an issue, create a branch named `feat/<issue-id>-short-title` or `fix/<issue-id>-short-title` and reference the issue in the PR description.

## Reporting issues

When filing a bug, include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Logs and error messages (redact secrets)

## License

By contributing, you agree your contributions will be licensed under the MIT License.
