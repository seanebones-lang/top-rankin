import { groq } from "next-sanity";

export const homePageQuery = groq`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  urgencyBannerEnabled,
  dropEndsAt,
  urgencySupportingText,
  "featuredProducts": featuredProducts[]->{
    "slug": slug.current,
    name,
    note,
    priceLabel,
    cashAppPayUrl,
    image,
    details
  }
}`;
