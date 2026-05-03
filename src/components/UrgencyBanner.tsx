"use client";

import * as React from "react";
import { Clock3 } from "lucide-react";

function formatRemaining(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return { days, hours, minutes };
}

export function UrgencyBanner({
  endsAtISO,
  supportingText,
}: {
  endsAtISO: string;
  supportingText: string;
}) {
  const dropEndsAt = React.useMemo(
    () => new Date(endsAtISO).getTime(),
    [endsAtISO],
  );
  const [now, setNow] = React.useState<number | null>(null);

  React.useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = formatRemaining(dropEndsAt - (now ?? dropEndsAt));

  return (
    <div className="rounded-2xl border border-border/70 bg-card/70 px-4 py-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Clock3 className="size-4 text-primary" />
        <span className="font-medium">Limited drop closes in:</span>
        <span className="rounded-full bg-background/70 px-2 py-0.5">
          {remaining.days}d {remaining.hours}h {remaining.minutes}m
        </span>
        <span className="text-muted-foreground">{supportingText}</span>
      </div>
    </div>
  );
}
