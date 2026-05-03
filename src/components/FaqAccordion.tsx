"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS: { q: string; a: ReactNode }[] = [
  {
    q: "Is this legal / will it get me high?",
    a: "We focus on CBD products. Effects vary by person. We do not provide medical advice or make treatment claims. Please check local laws and consult a professional if you are unsure.",
  },
  {
    q: "Do you have a deeper CBD overview (pamphlet-style)?",
    a: (
      <>
        Yes—see our{" "}
        <Link
          href="/learn"
          className="font-medium text-foreground underline underline-offset-4"
        >
          CBD guide
        </Link>{" "}
        for ECS basics, THC-free labeling, a reference dosage table, and reproduced brochure
        &ldquo;benefits&rdquo; sections with disclaimers (general education only—not medical advice).
      </>
    ),
  },
  {
    q: "Shipping and returns",
    a: "Checkout is completed in Cash App. Use the payment note for your product name if asked. Shipping timelines and return questions are confirmed by our team by email or receipt details from Cash App.",
  },
  {
    q: "How often do you release new drops?",
    a: "We run limited batches and announce drops to the email list first, then social channels.",
  },
];

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="mt-5 w-full">
      {FAQ_ITEMS.map((item, i) => (
        <AccordionItem value={`item-${i}`} key={item.q}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground leading-6">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
