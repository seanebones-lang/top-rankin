import type { ReactNode } from "react";

import { SiteGlobalOverlays } from "@/components/SiteGlobalOverlays";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <SiteGlobalOverlays />
    </>
  );
}
