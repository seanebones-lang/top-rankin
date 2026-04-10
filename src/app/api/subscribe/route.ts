import { z } from "zod";
import { track } from "@vercel/analytics/server";
import { Redis } from "@upstash/redis";

export const runtime = "edge";

const SubscribeSchema = z.object({
  email: z.string().email().max(254),
  name: z.string().trim().max(120).optional(),
});

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function POST(req: Request) {
  const parsed = SubscribeSchema.safeParse(await req.json());
  if (!parsed.success) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return Response.json(
      { error: "Email list is not configured on server." },
      { status: 500 },
    );
  }

  const redis = Redis.fromEnv();

  const email = normalizeEmail(parsed.data.email);
  const name = parsed.data.name?.trim() || null;

  const now = Date.now();

  // De-dup via set membership
  const added = await redis.sadd("toprankin:email_list", email);

  // Keep a lightweight profile for export/debugging
  await redis.hset(`toprankin:email:${email}`, {
    email,
    name: name ?? "",
    firstSeenAt: String(now),
    lastSeenAt: String(now),
  });

  await track("EmailSignup", { added: String(added === 1) });

  return Response.json({ ok: true, added: added === 1 });
}

