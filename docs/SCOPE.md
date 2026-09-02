# rhico.website — Scope & Plan

_Last updated: 2026-09-02_

Portfolio site for **Rhico**, a multimedia designer — showcasing design work, digital
and traditional art, and development projects, with a contact channel and a future
art-print shop.

---

## 1. Goals

- A fast, lightweight portfolio that is cheap to host and easy to update.
- Three work categories — **Design**, **Art**, **Code** — plus **Home** and **Contact**.
- Content editable by hand (data files + images in the repo), no CMS to start.
- A working contact form that actually delivers messages.
- A backend that can grow into an **art-print ordering** flow without a rewrite.
- Room for richer motion later (Framer Motion now, `anime.js` for bespoke SVG/timeline work).

## 2. Non-goals (for the initial foundation)

- No CMS, no database, no auth.
- No e-commerce yet — the print shop is designed for, not built (see §8).
- No blog / case-study long-form system yet (data model leaves room for it).
- No SSR / SSG — this is a client-rendered SPA. SEO needs are light (a portfolio,
  not a content site); revisit if that changes.

## 3. Stack decisions

| Area | Choice | Why |
| --- | --- | --- |
| Monorepo | **pnpm workspaces** — `apps/web`, `apps/api`, `packages/shared` | One repo, one deploy, shared constants; API can grow independently. |
| Frontend | **Vite + React 19 + React Router v7** | Lean SPA, no framework weight. Everything client-side — no `"use client"` friction for DOM-driven animation libs. |
| Language | **Plain JavaScript + JSX** (no TypeScript) | Per project coding standards. |
| Styling | **Tailwind v4** (`@tailwindcss/vite`), dark-first with a light toggle | Utility-first, token-driven theming via `@theme`. |
| Motion | **Framer Motion** now; **anime.js** added later | Framer Motion for route/element transitions; anime.js for SVG/timeline set pieces. |
| Content | **Local JS data files** + images in `apps/web/public/images/` | Version-controlled, zero infra. Structured so a CMS can slot in later. |
| API | **Hono** | ~14 kB, runs identically as a local Node server and as Vercel functions. Scales to Stripe + webhooks. |
| Email | **Resend** | Simple API; no key needed for local dev (route logs instead of sending). |
| Hosting | **Vercel** — static SPA + `/api/*` serverless functions | Matches current workflow. |

### Why React over Next.js here

`anime.js` is framework-agnostic — it manipulates DOM/SVG nodes via refs in
`useEffect`. In a Vite SPA everything is client-rendered, so there is no SSR
hydration timing to fight and no client/server component split. Next.js would add
weight and constraints without a matching benefit for this use case.

## 4. Repository structure

```
rhico.website/
├── api/
│   └── [[...route]].js        # Vercel entry — forwards /api/* to the Hono app
├── apps/
│   ├── web/                   # Vite React SPA
│   │   ├── public/images/     # portfolio images: design/ art/ code/
│   │   └── src/
│   │       ├── app.jsx        # renders <RootLayout />
│   │       ├── components/
│   │       │   ├── layout/    # root_layout, site_nav, site_footer
│   │       │   ├── theme/     # theme_provider, theme_toggle
│   │       │   └── ui/        # page, project_grid, project_card
│   │       ├── context/       # theme_context
│   │       ├── data/          # design.js, art.js, code.js  ← edit these
│   │       ├── hooks/         # use_theme
│   │       ├── lib/           # use_document_title
│   │       └── pages/         # home, design, art, code, contact, not_found
│   └── api/                   # Hono app
│       └── src/
│           ├── app.js         # app factory (CORS, routes, error handling)
│           ├── server.js      # local Node server on :8787
│           └── routes/
│               └── contact.js # POST /api/contact
├── packages/
│   └── shared/                # @rhico/shared — SITE metadata, NAV_ITEMS, allowed origins
├── docs/
│   └── SCOPE.md               # this file
├── vercel.json
└── pnpm-workspace.yaml
```

## 5. Routes & pages

| Path | Page | Content source |
| --- | --- | --- |
| `/` | Home — hero + links into the three categories | static |
| `/design` | Design grid | `src/data/design.js` |
| `/art` | Art grid (digital + traditional) | `src/data/art.js` |
| `/code` | Code / creative-coding grid | `src/data/code.js` |
| `/contact` | Contact form + links | posts to `/api/contact` |
| `*` | 404 | static |

Route transitions are handled by `AnimatePresence` in `root_layout.jsx`, keyed on
`location.pathname`; each page wraps its content in `<Page>` which supplies the
enter/exit animation and sets `document.title`.

## 6. Content model

Each data file default-exports an array, newest first. A project/piece:

```js
{
    slug: 'kebab-case-unique',   // key + future detail-page URL
    title: 'Project title',
    category: 'Branding',        // free-text label shown on the card
    year: 2025,
    description: 'One or two sentences.',
    image: '/images/design/foo.jpg',  // '' → card shows a placeholder
    tags: ['Identity', 'Print'],
    href: 'https://…'            // optional; card becomes a link
}
```

Art pieces additionally carry `medium` and `for_sale` (the latter is a hook for §8).

**To add work:** drop images in `apps/web/public/images/<category>/`, add an entry
to the matching data file. No build config changes needed.

## 7. Contact flow

1. `pages/contact.jsx` posts `{ name, email, message }` to `/api/contact`.
2. `apps/api/src/routes/contact.js` validates with `zod`, checks a honeypot field.
3. If `RESEND_API_KEY` is set → sends via Resend to `CONTACT_TO_EMAIL`
   (`replyTo` = sender). If not set → logs and returns `{ ok: true, delivered: false }`
   so local dev needs no secrets.

## 8. Art-print shop — future roadmap

Designed for now, built later. Phases are independent; each ships on its own.

### Phase 2a — catalogue & checkout
- `apps/api`: `GET /api/products`, `POST /api/checkout` (creates a **Stripe
  Checkout Session**), `POST /api/webhooks/stripe` (verifies signature, records
  the order).
- Products/prices live in **Stripe** as the source of truth — no database yet.
- Web: `/shop` route + `/shop/:slug`; reuse `for_sale` art entries or a dedicated
  `data/prints.js`.
- New env: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_*` or a
  product map.

### Phase 2b — order records
- Add **Drizzle ORM + Postgres** (Neon or Turso/libSQL) once order history/status
  is needed beyond the Stripe dashboard.
- Tables: `orders`, `order_items`, `shipping_addresses`.

### Phase 2c — fulfilment
- Integrate a print-on-demand API (**Prodigi** or **Printful**): on
  `checkout.session.completed`, create a print order and store its id.
- Manual fulfilment is an acceptable stand-in until volume justifies automation.

### Phase 3 — optional
- Customer accounts + order tracking (only if requested).
- Discount codes, shipping-zone rules.

**Open decisions (revisit at Phase 2):** final payment provider (default Stripe),
fulfilment partner, DB host, whether customer auth is wanted.

## 8b. Image protection & anti-scraping — future roadmap

Not built at M0. Guiding principle: **friction, deterrence, and attribution — not
an unbreakable wall.** Anything a browser renders can be captured; the aim is to
kill casual reposting and bulk/AI scraping while keeping the work visible, fast,
and accessible.

**Scope decision:** protection effort targets the **Art** section only. Design
work does not need it — normal optimised `<img>` there. **Accessibility and
runtime performance are hard constraints** — no measure ships if it regresses
screen-reader support or scroll/paint smoothness.

**Rejected:** rendering art as a coloured-glyph / ASCII grid as a *defense* —
doesn't stop headless-render + screenshot, hands targeted scrapers a cleaner
DOM-parsed copy, and taxes DOM weight, fidelity, a11y, and SEO. Kept only as an
optional **aesthetic** for the Art section (see M2 idea below); the real `<img>`
with `alt` stays as the actual content, any glyph effect is decorative.

### Do soon (cheap, low UX cost)
- **Serve WebP + AVIF, display-resolution only** — cap long edge ~2000px, strip
  EXCEED/print masters. Build step (sharp) generates sizes + formats from masters
  kept out of the repo. Responsive `srcset` so the big file is never the one loaded.
- **Subtle visible watermark / signature** baked into the display renditions —
  the one deterrent that survives a screenshot.
- **`<ProtectedImage>` component** — `draggable={false}`, right-click/long-press
  guard, optional watermark overlay, lazy loading. Casual friction only.
- **`robots.txt`** disallowing known AI crawlers (GPTBot, Google-Extended, CCBot,
  ClaudeBot / anthropic-ai, PerplexityBot, Bytespider, Amazonbot,
  Applebot-Extended, meta-externalagent, …). Compliant crawlers honour it.
- **`X-Robots-Tag: noai, noimageai`** response headers + meta tag — low adoption,
  zero cost, signals intent and helps legally in TDM-opt-out jurisdictions.

### Do later (medium effort, real friction)
- **Signed, short-lived image URLs** via a `/api/image/*` route (or an image CDN
  with signed URLs) + Referer/Origin check → stops hotlinking and direct-URL
  enumeration.
- **Per-IP rate limiting** on image routes (Vercel Firewall, or Upstash Redis).
- **Cloudflare in front** (proxied DNS) — one-click "Block AI Bots" + AI Labyrinth
  tarpit. Single most effective practical lever; evaluate vs. Vercel Firewall.
- **Glaze / Nightshade** pre-processing on high-value art before upload — resists
  style-mimicry training / poisons scrapers. Community standard for artists.
- **Login-gate** the print-shop masters and full-res galleries — removes anonymous
  scraping for that subset entirely.

### Skip
- Disabling devtools / F12 / Ctrl+S, canvas-tiling gymnastics — user-hostile,
  accessibility-breaking, trivially bypassed.

### M2 aesthetic idea (not a defense)
- Art pieces: a coloured-glyph render that resolves into the real image on
  load/hover (anime.js). Purely decorative — driven off the loaded `<img>`, gated
  behind `prefers-reduced-motion`, and cheap enough not to affect scroll/paint
  (coarse cells, `<canvas>` or a capped element count, one at a time).

## 9. Deployment (Vercel)

- `vercel.json`: `buildCommand` = `pnpm run build` → `apps/web/dist`;
  install via `pnpm install --frozen-lockfile`; SPA rewrite sends all non-`/api`
  paths to `index.html`.
- `/api/*` is served by the catch-all function in `api/[[...route]].js`, which
  mounts the Hono app.
- **Env vars to set in the Vercel project:** `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
  `CONTACT_FROM_EMAIL` (once a domain is verified in Resend).
- Point the Vercel project at this repo; framework preset = **Other** (config is
  in `vercel.json`).

## 10. Local development

```bash
pnpm install
pnpm dev          # web on http://localhost:5173
pnpm dev:api      # api on http://localhost:8787 (Vite proxies /api → here)
pnpm dev:all      # both together
pnpm build        # production build of the web app
pnpm lint         # oxlint across apps
pnpm format       # prettier
```

Copy `apps/api/.env.example` → `apps/api/.env` to test real email sending.

## 11. Conventions

Follows the project coding standards: 4-space indent, single quotes, semicolons,
no trailing commas; `snake_case` variables/files, `camelCase` functions,
`PascalCase` components; ES modules only; `export default` for components;
components ordered `Hooks → Refs → State → Variables → Callbacks → Handlers →
Effects → Render`.

## 12. Milestones

- [x] **M0 — Foundation:** monorepo, SPA shell, 5 pages, theme toggle, page
      transitions, contact form + Hono `/api/contact`, Vercel config, this doc.
- [ ] **M1 — Content pass:** real projects/art/code entries + images, real
      social links, home hero art direction, favicon/OG image.
- [ ] **M2 — Polish:** anime.js hero moment + Art glyph-resolve effect, per-project
      detail pages, `prefers-reduced-motion` audit, Lighthouse pass, custom domain,
      Art image-protection tier 1 (WebP/AVIF pipeline, watermark, `<ProtectedImage>`,
      AI-bot `robots.txt` + `noai` headers) — see §8b.
- [ ] **M3 — Print shop Phase 2a:** Stripe Checkout + `/shop`.
- [ ] **M4 — Print shop Phase 2b/2c:** order DB + fulfilment.

## 13. Known gaps / TODO after M0

- Portfolio data files contain sample entries only.
- No OG/social share image yet.
- No automated tests (add Vitest + Testing Library at M2 if scope grows).
- `sourcemap: true` in the web build — consider disabling for production later.
