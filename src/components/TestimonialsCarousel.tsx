"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { track } from "@vercel/analytics";

import { Button } from "@/components/ui/button";

type Testimonial = {
  quote: string;
  name: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "My evenings feel smoother. Not sleepy, just settled and clear.",
    name: "A. R.",
  },
  {
    quote: "Fast checkout and the balm hits after workouts every single time.",
    name: "J. K.",
  },
  {
    quote: "The tincture fits my routine. Easy, consistent, and clean taste.",
    name: "M. S.",
  },
];

export function TestimonialsCarousel() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  const goTo = (next: number) => {
    const normalized = (next + TESTIMONIALS.length) % TESTIMONIALS.length;
    setIndex(normalized);
    track("TestimonialSlideChange", { index: String(normalized) });
  };

  return (
    <div className="mt-8 rounded-[1.75rem] border border-border/70 bg-background/40 p-6">
      <blockquote className="text-sm leading-7 text-foreground/90 sm:text-base">
        &quot;{TESTIMONIALS[index].quote}&quot;
      </blockquote>
      <figcaption className="mt-4 text-xs text-muted-foreground">
        - {TESTIMONIALS[index].name}
      </figcaption>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.quote}
              type="button"
              onClick={() => goTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? "bg-primary" : "bg-border"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={() => goTo(index - 1)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={() => goTo(index + 1)}
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

