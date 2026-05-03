"use client";

import { useState } from "react";
import { TrashIcon } from "@sanity/icons";

import { useDocumentOperation, type DocumentActionComponent } from "sanity";

/**
 * Sanity often tucks Delete under the ⋯ actions menu (and drafts vs published
 * can affect which ops show). For products only, expose an explicit destructive
 * action so owners always see deletion.
 */
export function GuaranteedDeleteProductAction(
  props: Parameters<DocumentActionComponent>[0],
): ReturnType<DocumentActionComponent> {
  const { delete: deleteOp } = useDocumentOperation(props.id, props.type);
  const [busy, setBusy] = useState(false);

  const deleteDisabled =
    typeof deleteOp.disabled === "boolean"
      ? deleteOp.disabled
      : !!deleteOp.disabled;

  return {
    icon: TrashIcon,
    tone: "critical",
    label: busy ? "Deleting…" : "Delete product",
    shortcut: "",
    disabled: deleteDisabled,
    title:
      "Permanently delete this catalog item. Remove it from Site settings → Featured drops first if it appears there.",
    onHandle() {
      setBusy(true);
      deleteOp.execute();
      props.onComplete();
    },
  };
}

function hasBuiltinDelete(component: DocumentActionComponent) {
  if (typeof component !== "function") return false;
  const typed = component as DocumentActionComponent & { action?: string };
  return typed.action === "delete";
}

export function productDocumentActions(
  prev: DocumentActionComponent[],
  context: { schemaType?: string },
) {
  if (context.schemaType !== "product") return prev;

  const withoutBuiltinDelete = prev.filter((c) => !hasBuiltinDelete(c));
  return [GuaranteedDeleteProductAction, ...withoutBuiltinDelete];
}
