"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { track } from "@vercel/analytics";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileStickyCta() {
  const [shown, setShown] = React.useState(false);
  const [afterDrops, setAfterDrops] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setShown(y > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const el = document.getElementById("drops");
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setAfterDrops(entry.isIntersecting),
      { threshold: 0.25, rootMargin: "-96px 0px 0px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ctaLabel = afterDrops ? "Join list" : "Shop";
  const ctaTarget = afterDrops ? "#list" : "#drops";
  const ctaEvent = afterDrops ? "StickyJoinClick" : "StickyShopClick";

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 p-3 sm:hidden transition-transform duration-200",
        shown ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto max-w-6xl rounded-2xl border border-border/70 bg-background/80 shadow-lg backdrop-blur">
        <div className="flex items-center justify-between gap-3 px-3 py-3">
          <div className="min-w-0">
            <div className="font-heading text-xl tracking-wide">
              {afterDrops ? "Stay in the loop" : "Ready for the drop?"}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {afterDrops
                ? "Tap to join the email list"
                : "Tap to see featured drops"}
            </div>
          </div>
          <Button
            onClick={() => {
              track(ctaEvent);
              document.querySelector(ctaTarget)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            {ctaLabel} <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

