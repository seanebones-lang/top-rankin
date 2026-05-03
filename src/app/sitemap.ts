import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/learn`, lastModified: new Date() },
    { url: `${siteUrl}/terms`, lastModified: new Date() },
  ];
}
