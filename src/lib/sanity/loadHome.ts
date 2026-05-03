import { unstable_cache } from "next/cache";

import type { Product } from "@/content/products";
import { featuredProducts as fallbackFeatured } from "@/content/products";

import { sanityClient } from "./client";
import { sanityProductImageUrl } from "./image";
import { homePageQuery } from "./queries";

type SanityFeaturedRow = {
  slug?: string | null;
  name?: string | null;
  note?: string | null;
  priceLabel?: string | null;
  cashAppPayUrl?: string | null;
  image?: unknown;
  details?: Product["details"];
};

type SanityHomeDocument = {
  urgencyBannerEnabled?: boolean | null;
  dropEndsAt?: string | null;
  urgencySupportingText?: string | null;
  featuredProducts?: SanityFeaturedRow[] | null;
};

function mapFeatured(
  featured: SanityFeaturedRow[] | undefined | null,
): Product[] {
  if (!featured?.length) return [];
  const out: Product[] = [];
  for (const row of featured) {
    const slug = row.slug?.trim();
    const name = row.name?.trim();
    const url = row.cashAppPayUrl?.trim();
    if (!slug || !name || !url) continue;
    out.push({
      slug,
      name,
      note: row.note ?? "",
      priceLabel: row.priceLabel ?? "",
      cashAppPayUrl: url,
      imageUrl: sanityProductImageUrl(row.image),
      details: row.details ?? undefined,
    });
  }
  return out;
}

async function fetchHomeRaw(): Promise<SanityHomeDocument | null> {
  try {
    return await sanityClient.fetch<SanityHomeDocument | null>(homePageQuery);
  } catch {
    return null;
  }
}

export const getHomePageData = unstable_cache(
  async () => fetchHomeRaw(),
  ["sanity-home-page"],
  { tags: ["sanity:home"], revalidate: 120 },
);

export async function resolveHomeProducts(): Promise<Product[]> {
  const data = await getHomePageData();
  const mapped = mapFeatured(data?.featuredProducts);
  if (mapped.length > 0) return mapped;
  return fallbackFeatured;
}

export async function resolveUrgencyBanner() {
  const data = await getHomePageData();
  const fallbackIso =
    process.env.NEXT_PUBLIC_DROP_END_AT ?? "2026-04-17T23:59:59-04:00";
  const defaultSupporting = "Join the list for first restock alerts.";

  if (data && data.urgencyBannerEnabled === false) {
    return { visible: false as const };
  }

  const ends =
    data &&
    typeof data.dropEndsAt === "string" &&
    data.dropEndsAt.length > 0
      ? data.dropEndsAt
      : fallbackIso;

  const supporting =
    data &&
    typeof data.urgencySupportingText === "string" &&
    data.urgencySupportingText.trim().length > 0
      ? data.urgencySupportingText.trim()
      : defaultSupporting;

  return {
    visible: true as const,
    endsAtISO: ends,
    supportingText: supporting,
  };
}
