"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { track } from "@vercel/analytics";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DesktopStickyCta() {
  const [visible, setVisible] = React.useState(false);
  const [afterDrops, setAfterDrops] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setVisible((window.scrollY || 0) > 380);
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

  const target = afterDrops ? "#list" : "#drops";
  const label = afterDrops ? "Join email list" : "Shop featured drops";

  return (
    <aside
      className={cn(
        "fixed left-5 bottom-24 z-30 hidden lg:block transition-all duration-200",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none",
      )}
    >
      <div className="w-72 rounded-2xl border border-border/70 bg-background/80 p-4 shadow-lg backdrop-blur">
        <div className="font-heading text-2xl tracking-wide">Top Rankin&apos;</div>
        <p className="mt-1 text-xs text-muted-foreground">
          {afterDrops
            ? "Get updates for every limited run."
            : "Tap into this week&apos;s highlighted drops."}
        </p>
        <Button
          className="mt-3 w-full"
          onClick={() => {
            track("DesktopStickyCtaClick", { to: afterDrops ? "list" : "drops" });
            document.querySelector(target)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          {label} <ArrowRight className="size-4" />
        </Button>
      </div>
    </aside>
  );
}

