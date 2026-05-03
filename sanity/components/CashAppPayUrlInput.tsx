"use client";

import { useEffect, useRef } from "react";

import type { StringInputProps } from "sanity";
import { set } from "sanity";

import { DEFAULT_CASH_APP_PAY_URL } from "../constants";

/**
 * Applies the storefront Cash App URL when the field is empty (new docs, old
 * drafts, or partial edits). Editors can override; normal typing still works.
 */
export function CashAppPayUrlInput(props: StringInputProps) {
  const { onChange, value, renderDefault } = props;
  const seeded = useRef(false);

  useEffect(() => {
    if (seeded.current) return;
    const empty =
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "");
    if (!empty) return;
    seeded.current = true;
    onChange(set(DEFAULT_CASH_APP_PAY_URL));
  }, [onChange, value]);

  return renderDefault(props);
}
