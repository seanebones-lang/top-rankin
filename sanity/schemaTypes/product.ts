import { defineField, defineType } from "sanity";

import { CashAppPayUrlInput } from "../components/CashAppPayUrlInput";
import { DEFAULT_CASH_APP_PAY_URL } from "../constants";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  /** Ensures Cash App URL is set when editors create *new* products. */
  initialValue: () => ({
    cashAppPayUrl: DEFAULT_CASH_APP_PAY_URL,
  }),
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "note",
      title: "Short note",
      description:
        'One line beneath the title (e.g. "Sweet + steady • evening")',
      type: "string",
    }),
    defineField({
      name: "priceLabel",
      title: "Price label",
      description:
        'Display-only (e.g. "$29") — customer pays the amount you set in Cash App.',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cashAppPayUrl",
      title: "Cash App pay link",
      description:
        "Default is your storefront profile (`$toprankinherbsnoils`). Override only when a SKU needs another pay link.",
      type: "string",
      initialValue: DEFAULT_CASH_APP_PAY_URL,
      components: {
        input: CashAppPayUrlInput,
      },
      validation: (Rule) =>
        Rule.required().custom((val) => {
          if (!val || typeof val !== "string" || val.trim() === "") {
            return "Required";
          }
          try {
            const parsed = new URL(val);
            if (parsed.protocol !== "https:") {
              return "Must be an https:// URL";
            }
          } catch {
            return "Enter a valid URL";
          }
          return true;
        }),
    }),
    defineField({
      name: "image",
      title: "Image",
      description: "Optional — card artwork (falls back to gradient)",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "details",
      title: "Details drawer",
      type: "object",
      fields: [
        defineField({ name: "subtitle", title: "Subtitle", type: "text" }),
        defineField({
          name: "bullets",
          title: "Bullets",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "disclaimer",
          title: "Disclaimer",
          type: "text",
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
