import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({ pattern: "*.md", base: "./events/" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

export const collections = { events };
