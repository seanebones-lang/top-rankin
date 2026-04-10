"use client";

import * as React from "react";
import { track } from "@vercel/analytics";

type Props = React.ComponentPropsWithoutRef<"a"> & {
  eventName: string;
  eventData?: Record<string, string>;
};

export function TrackedLink({
  eventName,
  eventData,
  onClick,
  ...props
}: Props) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(eventName, eventData);
        onClick?.(e);
      }}
    />
  );
}

