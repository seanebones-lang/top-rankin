import { createClient } from "next-sanity";

import { sanityEnv } from "./env";

export const sanityClient = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: true,
});

/** Storefront home data — bypass Sanity CDN so publishes show right away. */
export const sanityLiveClient = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: false,
});
