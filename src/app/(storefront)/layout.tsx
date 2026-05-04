import type { ReactNode } from "react";

import { SiteGlobalOverlays } from "@/components/SiteGlobalOverlays";

/** Storefront + /learn — chat / CTAs mount here only, not under /studio. */
export default function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <SiteGlobalOverlays />
    </>
  );
}
