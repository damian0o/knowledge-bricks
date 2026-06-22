import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const bricks = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/bricks" }),
  schema: z
    .object({
      type: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
      timestamp: z.coerce.string().optional(),
      okf_version: z.string().optional(),
    })
    .passthrough(),
});

export const collections = { bricks };
