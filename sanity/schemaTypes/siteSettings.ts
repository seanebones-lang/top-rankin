import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "featuredProducts",
      title: "Featured drops (ordered)",
      description:
        "Order here sets the storefront order for the Featured drops grid.",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
    }),
    defineField({
      name: "urgencyBannerEnabled",
      title: "Show limited-drop countdown banner",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "dropEndsAt",
      title: "Drop countdown ends at",
      type: "datetime",
      description:
        "When the timer hits zero we still show 0d 0h 0m unless you turn the banner off.",
      hidden: ({ parent }) => !parent?.urgencyBannerEnabled,
    }),
    defineField({
      name: "urgencySupportingText",
      title: "Banner supporting line",
      type: "string",
      hidden: ({ parent }) => !parent?.urgencyBannerEnabled,
    }),
  ],
});
