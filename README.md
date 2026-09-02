# rhico.website

Portfolio of **Rhico** — multimedia design, digital & traditional art, and development work.
Monorepo: a React SPA (`apps/web`) and a Hono API (`apps/api`), deployed on Vercel.

Full plan and roadmap: [`docs/SCOPE.md`](docs/SCOPE.md).

## Stack

Vite · React 19 · React Router 7 · Tailwind v4 · Framer Motion · Hono · Resend · pnpm workspaces

## Quick start

```bash
pnpm install
pnpm dev:all      # web → http://localhost:5173, api → http://localhost:8787
```

| Command | Does |
| --- | --- |
| `pnpm dev` | web only |
| `pnpm dev:api` | api only |
| `pnpm dev:all` | both |
| `pnpm build` | production build → `apps/web/dist` |
| `pnpm preview` | serve the built app |
| `pnpm lint` | oxlint across apps |
| `pnpm format` | prettier |

For real email in dev: `cp apps/api/.env.example apps/api/.env` and add a Resend key.

## Editing content

Portfolio entries live in `apps/web/src/data/{design,art,code}.js`.
Images go in `apps/web/public/images/{design,art,code}/`.
See [`docs/SCOPE.md`](docs/SCOPE.md) §6 for the entry shape.

## Structure

```
api/                 Vercel entry → forwards /api/* to the Hono app
apps/web/            Vite React SPA
apps/api/            Hono API (contact now; commerce later)
packages/shared/     site metadata, nav model, allowed origins
docs/SCOPE.md        scope & roadmap
```

## Deploy

Vercel project → this repo, framework preset **Other** (config in `vercel.json`).
Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` in project env vars.
