"use client";

import * as React from "react";
import { MessageCircle, Volume2, VolumeX } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { track } from "@vercel/analytics";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type VoiceId = "ara" | "eve" | "sal" | "rex" | "leo";

const STORAGE_KEYS = {
  voiceEnabled: "trh_chat_voice_enabled",
  voiceId: "trh_chat_voice_id",
};

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [voiceEnabled, setVoiceEnabled] = React.useState(true);
  const [voiceId, setVoiceId] = React.useState<VoiceId>("ara");
  const [input, setInput] = React.useState("");
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const lastObjectUrlRef = React.useRef<string | null>(null);
  const endRef = React.useRef<HTMLDivElement | null>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new TextStreamChatTransport({ api: "/api/chat" }),
    onFinish: async ({ message }) => {
      if (!voiceEnabled) return;
      const text = message.parts
        .map((p) => (p.type === "text" ? p.text : ""))
        .join("")
        .trim();
      if (!text) return;
      await speak(text);
    },
  });

  React.useEffect(() => {
    try {
      const savedEnabled = localStorage.getItem(STORAGE_KEYS.voiceEnabled);
      const savedVoiceId = localStorage.getItem(STORAGE_KEYS.voiceId);
      if (savedEnabled !== null) setVoiceEnabled(savedEnabled === "true");
      if (
        savedVoiceId === "ara" ||
        savedVoiceId === "eve" ||
        savedVoiceId === "sal" ||
        savedVoiceId === "rex" ||
        savedVoiceId === "leo"
      ) {
        setVoiceId(savedVoiceId);
      }
    } catch {
      // ignore
    }
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.voiceEnabled, String(voiceEnabled));
      localStorage.setItem(STORAGE_KEYS.voiceId, voiceId);
    } catch {
      // ignore
    }
  }, [voiceEnabled, voiceId]);

  React.useEffect(() => {
    if (!open) return;
    track("ChatOpen");
  }, [open]);

  React.useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("trh-chat-open-state", { detail: { open } }),
    );
  }, [open]);

  React.useEffect(() => {
    const openFromExternal = () => setOpen(true);
    window.addEventListener("trh-open-chat", openFromExternal);
    return () => window.removeEventListener("trh-open-chat", openFromExternal);
  }, []);

  async function speak(text: string) {
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice_id: voiceId, language: "en" }),
    });

    if (!res.ok) return;

    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);

    if (lastObjectUrlRef.current) {
      URL.revokeObjectURL(lastObjectUrlRef.current);
    }
    lastObjectUrlRef.current = objectUrl;

    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.src = objectUrl;
    await audioRef.current.play().catch(() => undefined);
  }

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open]);

  React.useEffect(() => {
    return () => {
      if (lastObjectUrlRef.current) URL.revokeObjectURL(lastObjectUrlRef.current);
    };
  }, []);

  return (
    <div className="fixed right-3 bottom-24 sm:right-5 sm:bottom-5 z-50">
      {open ? (
        <div className="w-[min(94vw,420px)] overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] border border-border/70 bg-background/80 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3">
            <div className="leading-tight">
              <div className="font-heading text-xl tracking-wide">
                Ask Top Rankin&apos; Herbs-n-Oils
              </div>
              <div className="text-xs text-muted-foreground">
                Product help • shipping • FAQs
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setVoiceEnabled((v) => {
                    const next = !v;
                    track(next ? "ChatVoiceOn" : "ChatVoiceOff");
                    return next;
                  });
                }}
                aria-label={voiceEnabled ? "Disable voice" : "Enable voice"}
              >
                {voiceEnabled ? (
                  <Volume2 className="size-4" />
                ) : (
                  <VolumeX className="size-4" />
                )}
              </Button>
              <select
                value={voiceId}
                onChange={(e) => {
                  const next = e.target.value as VoiceId;
                  setVoiceId(next);
                  track("ChatVoiceSelect", { voiceId: next });
                }}
                className="h-9 rounded-md border border-border/70 bg-background/70 px-2 text-xs"
                aria-label="Voice"
              >
                <option value="ara">Ara (warm)</option>
                <option value="eve">Eve (upbeat)</option>
                <option value="sal">Sal (balanced)</option>
                <option value="rex">Rex (clear)</option>
                <option value="leo">Leo (strong)</option>
              </select>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setOpen(false);
                  track("ChatClose");
                }}
              >
                Close
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[340px] px-4 py-3">
            <div className="space-y-3">
              {messages.length === 0 ? (
                <div className="rounded-xl border border-border/70 bg-card/60 p-3 text-sm text-muted-foreground">
                  Ask about products, effects (general info only), shipping, or
                  what to try first.
                </div>
              ) : null}

              {messages.map((m) => {
                const isUser = m.role === "user";
                const text = m.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("");
                return (
                  <div
                    key={m.id}
                    className={cn(
                      "max-w-[85%] rounded-2xl border border-border/70 px-3 py-2 text-sm leading-6 shadow-sm",
                      isUser
                        ? "ml-auto bg-primary text-primary-foreground"
                        : "mr-auto bg-card/70"
                    )}
                  >
                    {text}
                  </div>
                );
              })}
              {status !== "ready" ? (
                <div className="mr-auto max-w-[85%] rounded-2xl border border-border/70 bg-card/50 px-3 py-2 text-sm text-muted-foreground">
                  Typing…
                </div>
              ) : null}
              <div ref={endRef} />
            </div>
          </ScrollArea>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (status !== "ready") return;
              if (!input.trim()) return;
              track("ChatSend", { chars: String(input.trim().length) });
              sendMessage({ text: input });
              setInput("");
            }}
            className="flex items-center gap-2 border-t border-border/70 p-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              disabled={status !== "ready"}
              className="bg-background/70"
            />
            <Button
              type="submit"
              disabled={status !== "ready" || !input.trim()}
            >
              Send
            </Button>
          </form>
        </div>
      ) : null}

      {!open ? (
        <Button
          size="lg"
          className="rounded-full shadow-lg"
          onClick={() => setOpen(true)}
        >
          <MessageCircle className="size-4" />
          Chat
        </Button>
      ) : null}
    </div>
  );
}

