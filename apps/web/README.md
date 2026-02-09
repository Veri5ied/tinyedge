# Tinyedge Web

This package is the placeholder for the Tinyedge frontend. It is fully wired for Next.js + Tailwind + shadcn but intentionally contains no UI work yet.

## What’s included

- Next.js (latest tag)
- React (latest tag)
- Tailwind CSS (latest tag)
- shadcn CLI (latest tag) + base UI deps
- TypeScript + path aliases
- App Router scaffold

## Structure

- `app/`: Next.js entry
- `app/globals.css`: Tailwind entry + design tokens
- `components/`: UI components (empty)
- `lib/`: Utilities (`cn` helper)
- `components.json`: shadcn config

## Install

```bash
pnpm install
```

## Run

```bash
pnpm -C apps/web run dev
```

## Using shadcn

```bash
pnpm -C apps/web dlx shadcn@latest init
pnpm -C apps/web dlx shadcn@latest add button
```

## Notes

- Dependencies are set to the `latest` tag. If you prefer reproducible builds, pin exact versions after your first install.

