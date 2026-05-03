import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
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
        "Official Cash for Business or $Cashtag pay URL (HTTPS). Storefront checkout only — use the exact link from Cash App (Profile / Request → share). Example: https://cash.app/$toprankinherbsnoils ($toprankinherbsnoils, not “herbsandoils”).",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["https"] }),
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
