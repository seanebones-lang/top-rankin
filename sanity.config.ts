import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { storefrontDocumentActions } from "./sanity/actions/documentActions";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "swis517n";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "top-rankin-storefront",
  title: "Top Rankin' Herbs-n-Oils",
  projectId,
  dataset,
  basePath: "/studio",
  /**
   * Sanity 5 ships Content Releases + scheduled drafts + scheduled publishing
   * enabled by default. In that mode, browsing with `perspective=published`
   * makes new docs open as published-first and Studio shows “Cannot create a
   * published document…” until you route the doc into drafts or a release.
   * This project is a small storefront CMS — turn those features off so
   * creation stays draft→publish without the extra navbar / destination picker UX.
   */
  releases: { enabled: false },
  scheduledDrafts: { enabled: false },
  scheduledPublishing: { enabled: false },
  schema: { types: schemaTypes },
  document: { actions: storefrontDocumentActions },
  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],
});
