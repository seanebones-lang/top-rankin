import type { DocumentActionComponent } from "sanity";

function isBuiltinDelete(component: DocumentActionComponent): boolean {
  if (typeof component !== "function") return false;
  const typed = component as DocumentActionComponent & { action?: string };
  return typed.action === "delete";
}

/** Hide destructive delete on products — use dataset cleanup / API if removal is needed. */
export function storefrontDocumentActions(
  prev: DocumentActionComponent[],
  context: { schemaType?: string },
) {
  if (context.schemaType !== "product") return prev;
  return prev.filter((action) => !isBuiltinDelete(action));
}
