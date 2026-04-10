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
