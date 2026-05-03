import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, message: "Missing SANITY_REVALIDATE_SECRET." },
      { status: 500 },
    );
  }

  try {
    const { isValidSignature } = await parseBody(req, secret, true);

    if (isValidSignature !== true) {
      return NextResponse.json({ ok: false, message: "Invalid signature." }, {
        status: 401,
      });
    }

    revalidateTag("sanity:home", "max");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Webhook error." }, {
      status: 400,
    });
  }
}
