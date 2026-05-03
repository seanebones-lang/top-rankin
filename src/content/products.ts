export type Product = {
  slug: string;
  name: string;
  note: string;
  priceLabel: string;
  cashAppPayUrl: string;
  /** When set (e.g. from Sanity), replaces the gradient artwork on the card. */
  imageUrl?: string | null;
  details?: {
    subtitle?: string;
    bullets?: string[];
    disclaimer?: string;
  };
};

export const featuredProducts: Product[] = [
  {
    slug: "island-calm-gummies",
    name: "Island Calm Gummies",
    note: "Sweet + steady • evening wind-down",
    priceLabel: "$29",
    cashAppPayUrl: "https://cash.app/$toprankinherbsnoils",
    details: {
      subtitle: "A smooth nightly vibe, one chew at a time.",
      bullets: [
        "Flavor-forward, easy routine",
        "Best for end-of-day unwinding",
        "Start low, go slow (effects vary)",
      ],
      disclaimer:
        "Not medical advice. Consult a professional for personal guidance.",
    },
  },
  {
    slug: "herb-and-honey-tincture",
    name: "Herb & Honey Tincture",
    note: "Smooth dropper • everyday balance",
    priceLabel: "$39",
    cashAppPayUrl: "https://cash.app/$toprankinherbsnoils",
    details: {
      subtitle: "Everyday balance with a clean finish.",
      bullets: [
        "Flexible dosing with a dropper",
        "Great for steady daytime calm",
        "Pairs well with your morning ritual",
      ],
      disclaimer:
        "Not medical advice. Check local laws and consult a professional if needed.",
    },
  },
  {
    slug: "top-rankin-relief-balm",
    name: "Top Rankin’ Relief Balm",
    note: "Cooling comfort • post-work recovery",
    priceLabel: "$24",
    cashAppPayUrl: "https://cash.app/$toprankinherbsnoils",
    details: {
      subtitle: "Targeted comfort after training or long days.",
      bullets: [
        "Easy application, no mess",
        "Cooling sensation for sore spots",
        "Keep one at home, one in the bag",
      ],
      disclaimer:
        "For external use only. Not medical advice. Discontinue if irritation occurs.",
    },
  },
];
