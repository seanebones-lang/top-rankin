## Top Rankin' Herbs-n-Oils

Modern Vercel-ready storefront/landing page for **Top Rankin' Herbs-n-Oils** (Jamaican/Rastafarian-inspired theme) with:

- **Sanity CMS** at `/studio` — products, featured-drop order, urgency banner (project `swis517n`)
- **Cash App only** — each product has a **Cash App pay URL**. Canonical value: **`https://cash.app/$toprankinherbsnoils`**, defined in [`sanity/constants.ts`](sanity/constants.ts) (re-exported for the storefront as [`src/lib/default-cash-app.ts`](src/lib/default-cash-app.ts)). Studio auto-fills empty products and drafts via schema + a small input wrapper.
- **Grok (xAI) chat** at `POST /api/chat`
- **xAI Text-to-Speech** at `POST /api/tts` (bot speaks responses)

## Getting Started

Install deps and run the dev server:

```bash
pnpm dev
```

Open `http://localhost:3000`. CMS: `http://localhost:3000/studio`.

### Editors (Sanity Studio link for clients)

After you invite them in [Sanity Manage](https://www.sanity.io/manage/project/swis517n) (**Project** → **Team** / invite) with **Viewer**, **Editor**, or **Administrator** access, they sign in at:

- **`https://top.mothership-ai.com/studio`** (primary production domain)
- **`https://top-rankin.vercel.app/studio`** (Vercel default domain)

Either URL loads the same CMS. They authenticate with Sanity (Google/GitHub/email), not Vercel.

## Environment variables

Create a `.env.local` (or set in Vercel → Project → Settings → Environment Variables):

**Sanity (storefront reads)**

- **`NEXT_PUBLIC_SANITY_PROJECT_ID`**: `swis517n` (default in code if unset).
- **`NEXT_PUBLIC_SANITY_DATASET`**: usually `production`.

**Sanity (webhook, optional but recommended)**

- **`SANITY_REVALIDATE_SECRET`**: shared secret for `POST /api/revalidate-sanity` (create a GROQ webhook in Sanity Manage → API → Webhooks targeting that URL with the same secret).
- Without the webhook, the homepage Sanity cache can lag up to ~**30 seconds** after you publish (`unstable_cache` in `src/lib/sanity/loadHome.ts`). With the webhook, publishes **clear the cache immediately** (`revalidateTag("sanity:home")`).

**Site**

- **`NEXT_PUBLIC_SITE_URL`**: optional (e.g. `https://top.mothership-ai.com` or `https://top-rankin.vercel.app`). Used for metadata, sitemap, and robots. Set in Vercel to your **primary** production domain.
- **`NEXT_PUBLIC_DROP_END_AT`**: optional ISO datetime — urgency banner fallback if Sanity has no `dropEndsAt` yet.

**Other**

- **`XAI_API_KEY`**: required (server-only). Used by both `/api/chat` and `/api/tts`.
- **`REDIS_URL`**: required for the email list (`/api/subscribe`). Use the full connection string Redis gives you (same as `redis-cli -u`). Example shape: `redis://default:PASSWORD@HOST:PORT` or `rediss://...` if TLS is required.

Security: if you ever paste an API key into chat/logs, treat it as compromised and **revoke it** in the xAI console. **Never post Redis passwords publicly** — rotate them in Redis Cloud if they were exposed.

## Editing products

1. **Preferred:** open **Sanity Studio** (`/studio`), edit **Products** and **Site settings** (featured order, countdown).
2. **New products:** the **Cash App pay link** defaults from [`sanity/constants.ts`](sanity/constants.ts) and is **written into empty fields** when you open a product in Studio (covers old drafts). Override only when a SKU needs a different link.
3. **Fallback:** when CMS has no featured list yet, the site uses `src/content/products.ts` (values still come from the same constant via `default-cash-app.ts`).

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
