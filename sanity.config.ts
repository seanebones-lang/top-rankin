import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./sanity/schemaTypes";
import { productDocumentActions } from "./sanity/actions/productDocumentActions";
import { structure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "swis517n";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "top-rankin-storefront",
  title: "Top Rankin' Herbs-n-Oils",
  projectId,
  dataset,
  basePath: "/studio",
  schema: { types: schemaTypes },
  document: {
    actions: productDocumentActions,
  },
  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],
});
