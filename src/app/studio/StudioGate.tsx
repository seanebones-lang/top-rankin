"use client";

import nextDynamic from "next/dynamic";

const StudioShell = nextDynamic(() => import("./StudioShell"), {
  ssr: false,
  loading: () => (
    <div className="grid min-h-dvh place-items-center bg-background text-sm text-muted-foreground">
      Loading Studio…
    </div>
  ),
});

export default function StudioGate() {
  return <StudioShell />;
}
