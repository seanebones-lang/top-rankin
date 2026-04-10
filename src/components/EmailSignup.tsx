"use client";

import * as React from "react";
import { track } from "@vercel/analytics";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EmailSignup() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage(null);

    track("EmailSignupStart");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim() || undefined,
        email: email.trim(),
      }),
    });

    if (!res.ok) {
      setStatus("error");
      setMessage("Couldn’t sign you up right now. Please try again.");
      track("EmailSignupError");
      return;
    }

    setStatus("success");
    setMessage("You’re on the list. Big up—watch for the next drop.");
    track("EmailSignupSuccess");
    setEmail("");
    setName("");
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-3 sm:grid-cols-5">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name (optional)"
        className="sm:col-span-2 bg-background/70"
        disabled={status === "loading" || status === "success"}
      />
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        type="email"
        required
        className="sm:col-span-2 bg-background/70"
        disabled={status === "loading" || status === "success"}
      />
      <Button
        type="submit"
        className="sm:col-span-1"
        disabled={status === "loading" || !email.trim()}
      >
        {status === "loading" ? "Joining…" : "Join"}
      </Button>

      {message ? (
        <p
          className="sm:col-span-5 text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

