import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const event = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/events",
  }),

  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string(),
    description: z.string(),
    invite: z.string(),
  }),
});

export const collections = { event };
