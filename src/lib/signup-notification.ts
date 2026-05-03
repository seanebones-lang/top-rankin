const DEFAULT_OWNER_INBOX = "toprankin.herbsnoils@gmail.com";

/**
 * Optional: notify owner on each signup. Requires `RESEND_API_KEY`:
 * https://resend.com — add key + (for production) verify a domain for `RESEND_FROM`.
 */
export async function notifyOwnerOfSignup(args: {
  subscriberEmail: string;
  subscriberName: string | null;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return;

  const to =
    process.env.SIGNUP_NOTIFICATION_EMAIL?.trim() || DEFAULT_OWNER_INBOX;
  const from =
    process.env.RESEND_FROM?.trim() ||
    `Top Rankin' Herbs-n-Oils <onboarding@resend.dev>`;

  const lines = [
    "Someone joined the mailing list from the storefront.",
    "",
    args.subscriberName
      ? `Name: ${args.subscriberName}`
      : "(No name submitted)",
    `Email: ${args.subscriberEmail}`,
    "",
    "Stored in Redis (toprankin:email_list) as well.",
  ];
  const text = lines.join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New list signup: ${args.subscriberEmail}`,
      text,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[subscribe] Resend error:", res.status, body);
  }
}
