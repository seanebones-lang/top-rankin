export type Product = {
  slug: string;
  name: string;
  note: string;
  priceLabel: string;
  squareCheckoutUrl: string;
};

export const featuredProducts: Product[] = [
  {
    slug: "island-calm-gummies",
    name: "Island Calm Gummies",
    note: "Sweet + steady • evening wind-down",
    priceLabel: "$29",
    squareCheckoutUrl: "#",
  },
  {
    slug: "herb-and-honey-tincture",
    name: "Herb & Honey Tincture",
    note: "Smooth dropper • everyday balance",
    priceLabel: "$39",
    squareCheckoutUrl: "#",
  },
  {
    slug: "top-rankin-relief-balm",
    name: "Top Rankin’ Relief Balm",
    note: "Cooling comfort • post-work recovery",
    priceLabel: "$24",
    squareCheckoutUrl: "#",
  },
];

