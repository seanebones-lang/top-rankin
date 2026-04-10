"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    q: "Is this legal / will it get me high?",
    a: "We focus on CBD products. Effects vary by person. We do not provide medical advice or make treatment claims. Please check local laws and consult a professional if you are unsure.",
  },
  {
    q: "Shipping and returns",
    a: "Checkout is completed securely via Square. Shipping timelines and return details are shown at checkout and on your receipt.",
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

