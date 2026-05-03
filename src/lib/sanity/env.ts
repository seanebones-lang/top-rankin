export const sanityEnv = {
  projectId:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "swis517n",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-02-19" as const,
};
