## Top Rankin' Herbs-n-Oils

Modern Vercel-ready storefront/landing page for **Top Rankin' Herbs-n-Oils** (Jamaican/Rastafarian-inspired theme) with:

- **Sanity CMS** at `/studio` — products, featured-drop order, urgency banner (project `swis517n`)
- **Cash App only** — each product has a **Cash App pay URL**. Canonical fallback: **`https://cash.app/$toprankinherbsnoils`** (defined once in [`src/lib/default-cash-app.ts`](src/lib/default-cash-app.ts); matches the live Cash App **`$Cashtag`**). Override per SKU in Sanity; if Studio still has the old typo `…herbsandoils`, replace it everywhere with this URL.
- **Grok (xAI) chat** at `POST /api/chat`
- **xAI Text-to-Speech** at `POST /api/tts` (bot speaks responses)

## Getting Started

Install deps and run the dev server:

```bash
pnpm dev
```

Open `http://localhost:3000`. CMS: `http://localhost:3000/studio`.

## Environment variables

Create a `.env.local` (or set in Vercel → Project → Settings → Environment Variables):

**Sanity (storefront reads)**

- **`NEXT_PUBLIC_SANITY_PROJECT_ID`**: `swis517n` (default in code if unset).
- **`NEXT_PUBLIC_SANITY_DATASET`**: usually `production`.

**Sanity (webhook, optional but recommended)**

- **`SANITY_REVALIDATE_SECRET`**: shared secret for `POST /api/revalidate-sanity` (create a GROQ webhook in Sanity Manage → API → Webhooks targeting that URL with the same secret).

**Site**

- **`NEXT_PUBLIC_SITE_URL`**: optional (e.g. `https://toprankinherb.com`). Used for metadata, sitemap, and robots.
- **`NEXT_PUBLIC_DROP_END_AT`**: optional ISO datetime — urgency banner fallback if Sanity has no `dropEndsAt` yet.

**Other**

- **`XAI_API_KEY`**: required (server-only). Used by both `/api/chat` and `/api/tts`.
- **`REDIS_URL`**: required for the email list (`/api/subscribe`). Use the full connection string Redis gives you (same as `redis-cli -u`). Example shape: `redis://default:PASSWORD@HOST:PORT` or `rediss://...` if TLS is required.

Security: if you ever paste an API key into chat/logs, treat it as compromised and **revoke it** in the xAI console. **Never post Redis passwords publicly** — rotate them in Redis Cloud if they were exposed.

## Editing products

1. **Preferred:** open **Sanity Studio** (`/studio`), edit **Products** and **Site settings** (featured order, countdown).
2. **Fallback:** when CMS has no featured list yet, the site uses `src/content/products.ts` (all fallback products reuse **`DEFAULT_CASH_APP_PAY_URL`** from `src/lib/default-cash-app.ts`). Per-product overrides still use Sanity **`cashAppPayUrl`** — must match your real **https** Cash App link (`$toprankinherbsnoils`).

## Schema deploy (Sanity)

After changing files under `sanity/`, push the schema to your dataset:

```bash
pnpm sanity:schema:deploy
```

## Build

```bash
pnpm build
pnpm start
```

## Deploy on Vercel

1. Import this repo into Vercel.
2. Set `XAI_API_KEY`, Redis vars, `NEXT_PUBLIC_SANITY_*`, and `SANITY_REVALIDATE_SECRET` as needed.
3. Add a Sanity webhook to `https://<your-domain>/api/revalidate-sanity` with the same secret.
4. Deploy.

Notes:

- Chat widget: `src/app/layout.tsx` → `src/components/ChatWidget.tsx`.
- SEO: `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, **`/learn`** (CBD pamphlet-style guide).
- Email list: homepage `#list` → `POST /api/subscribe`.
