"use client";

import * as React from "react";
import { ExternalLink, Info } from "lucide-react";
import { track } from "@vercel/analytics";

import type { Product } from "@/content/products";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/TrackedLink";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const [openSlug, setOpenSlug] = React.useState<string | null>(null);

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      {products.map((p) => (
        <article
          key={p.slug}
          className="group overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/70 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
        >
          <div className="h-44 bg-gradient-to-br from-primary/15 via-accent/10 to-transparent" />
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading text-2xl tracking-wide">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
              </div>
              <div className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-sm font-medium">
                {p.priceLabel}
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <Button className="flex-1" asChild>
                <TrackedLink
                  href={p.squareCheckoutUrl}
                  aria-label={`Buy ${p.name}`}
                  eventName="SquareBuyClick"
                  eventData={{ slug: p.slug }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy <ExternalLink className="size-4" />
                </TrackedLink>
              </Button>

              <Sheet
                open={openSlug === p.slug}
                onOpenChange={(next) => {
                  const willOpen = next === true;
                  setOpenSlug(willOpen ? p.slug : null);
                  track(willOpen ? "ProductDetailsOpen" : "ProductDetailsClose", {
                    slug: p.slug,
                  });
                }}
              >
                <SheetTrigger asChild>
                  <Button className="flex-1" variant="secondary">
                    Details <Info className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[min(92vw,440px)]">
                  <SheetHeader>
                    <SheetTitle className="font-heading text-3xl tracking-wide">
                      {p.name}
                    </SheetTitle>
                  </SheetHeader>

                  <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                    {p.details?.subtitle ? (
                      <p className="text-foreground/90">{p.details.subtitle}</p>
                    ) : null}

                    {p.details?.bullets?.length ? (
                      <ul className="list-disc pl-5 space-y-2">
                        {p.details.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : null}

                    {p.details?.disclaimer ? (
                      <p className="text-xs">{p.details.disclaimer}</p>
                    ) : null}
                  </div>

                  <div className="mt-6">
                    <Button className="w-full" asChild>
                      <TrackedLink
                        href={p.squareCheckoutUrl}
                        aria-label={`Buy ${p.name}`}
                        eventName="SquareBuyClick"
                        eventData={{ slug: p.slug }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Buy on Square <ExternalLink className="size-4" />
                      </TrackedLink>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

