import { z } from "zod";
import { track } from "@vercel/analytics/server";
import { createClient } from "redis";

import { notifyOwnerOfSignup } from "@/lib/signup-notification";

/** TCP Redis (Redis Cloud, Vercel `REDIS_URL`, etc.). Not compatible with Edge. */
export const runtime = "nodejs";

const SubscribeSchema = z.object({
  email: z.string().email().max(254),
  name: z.string().trim().max(120).optional(),
});

type RedisClient = ReturnType<typeof createClient>;

/** Re-use one connection across warm serverless invocations. */
const globalForRedis = globalThis as typeof globalThis & {
  __subscribeRedis?: RedisClient;
};

async function getRedis(): Promise<RedisClient> {
  const url = process.env.REDIS_URL?.trim();
  if (!url) {
    throw new Error("REDIS_URL is not set");
  }

  if (!globalForRedis.__subscribeRedis) {
    const client = createClient({ url });
    client.on("error", (err) => console.error("[subscribe] Redis error:", err));
    globalForRedis.__subscribeRedis = client;
  }

  const redis = globalForRedis.__subscribeRedis;
  if (!redis.isOpen) {
    await redis.connect();
  }
  return redis;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function POST(req: Request) {
  const parsed = SubscribeSchema.safeParse(await req.json());
  if (!parsed.success) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  let redis: RedisClient;
  try {
    redis = await getRedis();
  } catch {
    return Response.json(
      {
        error:
          "Email list is not configured. Set REDIS_URL to your Redis connection string (e.g. redis://default:PASSWORD@HOST:PORT — use TLS rediss:// if your provider requires it).",
      },
      { status: 500 },
    );
  }

  const email = normalizeEmail(parsed.data.email);
  const name = parsed.data.name?.trim() || null;
  const now = Date.now();

  try {
    const addedMembers = await redis.sAdd("toprankin:email_list", email);
    const newlyAdded = addedMembers === 1;

    await redis.hSet(`toprankin:email:${email}`, {
      email,
      name: name ?? "",
      firstSeenAt: String(now),
      lastSeenAt: String(now),
    });

    await track("EmailSignup", { added: String(newlyAdded) });

    try {
      await notifyOwnerOfSignup({ subscriberEmail: email, subscriberName: name });
    } catch (err) {
      console.error("[subscribe] Owner notification failed:", err);
    }

    return Response.json({ ok: true, added: newlyAdded });
  } catch (err) {
    console.error("[subscribe]", err);
    return Response.json(
      { error: "Could not save signup. Try again later." },
      { status: 502 },
    );
  }
}
