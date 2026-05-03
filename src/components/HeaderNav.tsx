"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { track } from "@vercel/analytics";

import { Button } from "@/components/ui/button";

export function HeaderNav() {
  const [afterDrops, setAfterDrops] = React.useState(false);

  React.useEffect(() => {
    const el = document.getElementById("drops");
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // When the drops section is visible, switch CTA to the email list.
        setAfterDrops(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.25,
        // Sticky header height
        rootMargin: "-96px 0px 0px 0px",
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const primaryHref = afterDrops ? "/#list" : "/#drops";
  const primaryLabel = afterDrops ? "Join list" : "Shop now";

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg focus:ring-2 focus:ring-ring/50"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-5 sm:py-4">
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded-2xl"
          onClick={() => track("HeaderBrandClick")}
          aria-label="Top Rankin' Herbs-n-Oils home"
        >
          <div className="relative size-9 sm:size-10 overflow-hidden rounded-2xl border border-border/70 bg-card/70 shadow-sm">
            <Image
              src="/images/logo.jpg"
              alt="Top Rankin' Herbs-n-Oils logo"
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </div>
          <div className="leading-tight">
            <div className="font-heading text-[1.75rem] sm:text-2xl tracking-wide">
              Top Rankin&apos; Herbs-n-Oils
            </div>
            <div className="text-[0.95rem] sm:text-sm text-muted-foreground">
              CBD with island soul
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-2 sm:flex">
          <Button variant="ghost" asChild>
            <Link href="/learn" onClick={() => track("HeaderNavClick", { to: "learn" })}>
              CBD guide
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#drops" onClick={() => track("HeaderNavClick", { to: "drops" })}>
              Featured drops
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/#list" onClick={() => track("HeaderNavClick", { to: "list" })}>
              Email list
            </Link>
          </Button>
          <Button asChild>
            <Link
              href={primaryHref}
              onClick={() =>
                track("HeaderPrimaryClick", { to: afterDrops ? "list" : "drops" })
              }
            >
              {primaryLabel} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

