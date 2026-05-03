import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "swis517n",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  },
});
