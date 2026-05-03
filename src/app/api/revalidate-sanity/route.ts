import { revalidatePath, revalidateTag } from "next/cache";
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
      return NextResponse.json(
        {
          ok: false,
          message:
            "Invalid signature. Sanity webhook secret must equal SANITY_REVALIDATE_SECRET on Vercel.",
        },
        { status: 401 },
      );
    }

    // Tag clears unstable_cache(...) for home data.
    // Path helps the static `/` RSC payload actually refresh after CMS edits.
    revalidateTag("sanity:home", "max");
    revalidatePath("/");

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[revalidate-sanity]", err);
    return NextResponse.json({ ok: false, message: "Webhook error." }, {
      status: 400,
    });
  }
}
