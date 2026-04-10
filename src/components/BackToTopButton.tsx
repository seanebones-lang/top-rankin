"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { track } from "@vercel/analytics";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BackToTopButton() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setVisible((window.scrollY || 0) > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-5 left-5 z-40 transition-all duration-200 hidden sm:block",
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-3 opacity-0 pointer-events-none",
      )}
    >
      <Button
        variant="secondary"
        className="rounded-full shadow-lg"
        onClick={() => {
          track("BackToTopClick");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <ArrowUp className="size-4" />
        Top
      </Button>
    </div>
  );
}

