## Top Rankin' Herbs-n-Oils

Modern Vercel-ready storefront/landing page for **Top Rankin' Herbs-n-Oils** (Jamaican/Rastafarian-inspired theme) with:

- **Sanity CMS** at `/studio` — products, featured-drop order, urgency banner (project `swis517n`)
- **Cash App only** — each product has a **Cash App pay URL**. Canonical value: **`https://cash.app/$toprankinherbsnoils`**, defined in [`sanity/constants.ts`](sanity/constants.ts) (re-exported for the storefront as [`src/lib/default-cash-app.ts`](src/lib/default-cash-app.ts)). Studio pre-fills new products via schema `initialValue`; the site falls back to the same URL when a featured product has no stored link.
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
- The homepage reads **live Sanity** (`sanityLiveClient`, `useCdn: false`) and is **`force-dynamic`**, so CMS publishes show on refresh without relying on ISR. Keep the webhook anyway so **`revalidatePath("/")`** runs on publish.

**Site**

- **`NEXT_PUBLIC_SITE_URL`**: optional (e.g. `https://top.mothership-ai.com` or `https://top-rankin.vercel.app`). Used for metadata, sitemap, and robots. Set in Vercel to your **primary** production domain.
- **`NEXT_PUBLIC_DROP_END_AT`**: optional ISO datetime — urgency banner fallback if Sanity has no `dropEndsAt` yet.

**Other**

- **`XAI_API_KEY`**: required (server-only). Used by both `/api/chat` and `/api/tts`.
- **`REDIS_URL`**: required for the email list (`/api/subscribe`). Use the full connection string Redis gives you (same as `redis-cli -u`). Example shape: `redis://default:PASSWORD@HOST:PORT` or `rediss://...` if TLS is required.
- **Optional — copy each signup to your Gmail:** set **`RESEND_API_KEY`** from [Resend](https://resend.com). Each signup still saves to Redis **and** emails **`SIGNUP_NOTIFICATION_EMAIL`** (defaults to **`toprankin.herbsnoils@gmail.com`**). Set **`RESEND_FROM`** to a sender on your **verified domain** for production (e.g. `List <noreply@top.mothership-ai.com>`). Until then, Resend may only allow **`onboarding@resend.dev`** for testing — check Resend docs for delivering to real inboxes.

Security: if you ever paste an API key into chat/logs, treat it as compromised and **revoke it** in the xAI console. **Never post Redis passwords publicly** — rotate them in Redis Cloud if they were exposed.

## Editing products

1. **Preferred:** open **Sanity Studio** (`/studio`), edit **Products** and **Site settings** (featured order, countdown).
2. **Cash App pay link:** new products pick up defaults from Studio schema (`sanity/constants.ts`). Old rows missing a URL still use that same default link on the **storefront**; fill the field in Studio so validation and publishing stay clean.
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
- Email list: homepage `#list` → `POST /api/subscribe` (Redis + optional Resend ping to **`toprankin.herbsnoils@gmail.com`** via `RESEND_API_KEY`).