import { createImageUrlBuilder } from "@sanity/image-url";

import { sanityEnv } from "./env";

const builder = createImageUrlBuilder({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
});

export function sanityProductImageUrl(image: unknown): string | undefined {
  if (!image) return undefined;
  try {
    return builder.image(image as never)
      .width(800)
      .height(520)
      .fit("crop")
      .url();
  } catch {
    return undefined;
  }
}
