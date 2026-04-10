## Top Rankin' Herb

Modern Vercel-ready storefront/landing page for **Top Rankin' Herb** (Jamaican/Rastafarian-inspired theme) with:

- **Square checkout links** for featured products
- **Grok (xAI) chat** at `POST /api/chat`
- **xAI Text-to-Speech** at `POST /api/tts` (bot speaks responses)

## Getting Started

Install deps and run the dev server:

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Environment variables

Create a `.env.local` (or set in Vercel → Project → Settings → Environment Variables):

- **`XAI_API_KEY`**: required (server-only). Used by both `/api/chat` and `/api/tts`.
- **`NEXT_PUBLIC_SITE_URL`**: optional (e.g. `https://toprankinherb.com`). Used for metadata base URL.
- **`NEXT_PUBLIC_DROP_END_AT`**: optional ISO datetime used by the urgency banner countdown (example: `2026-04-17T23:59:59-04:00`).
- **`UPSTASH_REDIS_REST_URL`**, **`UPSTASH_REDIS_REST_TOKEN`**: required for the email list (`/api/subscribe`). Add a Redis integration in Vercel Marketplace (Upstash Redis) to auto-provision these.

Security: if you ever paste an API key into chat/logs, treat it as compromised and **revoke it** in the xAI console.

## Editing products (Square links)

Update featured products in:

- `src/content/products.ts`

Replace each `squareCheckoutUrl: "#"` with your real Square checkout link.

## Build

```bash
pnpm build
pnpm start
```

## Deploy on Vercel

1. Import this repo into Vercel.
2. Set `XAI_API_KEY` (and optionally `NEXT_PUBLIC_SITE_URL`) in Vercel env vars.
3. Deploy.

Notes:
- The chat widget is mounted globally in `src/app/layout.tsx` via `src/components/ChatWidget.tsx`.
- SEO endpoints: `/sitemap.xml`, `/robots.txt`, and `/opengraph-image`.
- Email list: signup section is on the homepage (`#list`) and posts to `POST /api/subscribe`.
- Countdown: set `NEXT_PUBLIC_DROP_END_AT` in Vercel and redeploy to update the limited-drop timer.
