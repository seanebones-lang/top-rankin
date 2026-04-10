import { z } from "zod";

export const runtime = "edge";

const TtsRequestSchema = z.object({
  text: z.string().min(1).max(15_000),
  voice_id: z.string().min(1).optional(),
  language: z.string().min(1).optional(),
});

export async function POST(req: Request) {
  if (!process.env.XAI_API_KEY) {
    return Response.json(
      { error: "Missing XAI_API_KEY on server." },
      { status: 500 },
    );
  }

  const parsed = TtsRequestSchema.safeParse(await req.json());
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const r = await fetch("https://api.x.ai/v1/tts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.XAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: parsed.data.text,
      voice_id: parsed.data.voice_id ?? "ara",
      language: parsed.data.language ?? "en",
      output_format: {
        codec: "mp3",
        sample_rate: 24000,
        bit_rate: 128000,
      },
    }),
  });

  if (!r.ok) {
    const detail = await r.text().catch(() => "");
    return Response.json(
      { error: "TTS request failed.", detail: detail.slice(0, 2000) },
      { status: 502 },
    );
  }

  const audio = await r.arrayBuffer();
  return new Response(audio, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}

