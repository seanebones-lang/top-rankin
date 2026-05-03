import { createXai } from "@ai-sdk/xai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { z } from "zod";

export const runtime = "edge";

const xai = createXai({ apiKey: process.env.XAI_API_KEY });

const ChatRequestSchema = z.object({
  messages: z.array(z.unknown()),
});

const system = [
  "You are the Top Rankin' Herbs-n-Oils assistant for a CBD brand with a Jamaican/Rastafarian vibe.",
  "Be friendly, concise, and helpful.",
  "Do not provide medical advice, diagnosis, or treatment. Avoid health claims.",
  "If asked about effects or dosing, give general wellness info and suggest consulting a professional.",
  "Encourage checking local laws where relevant.",
  "Users can open /learn for a printed-style CBD guide (usage line, 1000/2000mg per-ml math, weight chart, wholesale note, disclaimers); still avoid diagnosing or dosing individuals.",
].join("\n");

export async function POST(req: Request) {
  const parsed = ChatRequestSchema.safeParse(await req.json());
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!process.env.XAI_API_KEY) {
    return Response.json(
      { error: "Missing XAI_API_KEY on server." },
      { status: 500 },
    );
  }

  const uiMessages = parsed.data.messages as UIMessage[];
  const result = await streamText({
    model: xai.responses("grok-4.20-reasoning"),
    system,
    messages: await convertToModelMessages(uiMessages),
    temperature: 0.7,
  });

  return result.toTextStreamResponse();
}

