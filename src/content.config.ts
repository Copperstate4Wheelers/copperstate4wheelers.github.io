import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const event = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/events",
  }),

  schema: z.object({
    title: z.string(),
    time: z.string(),
    location: z.string(),
    invite: z.enum(["Guests Welcome", "Members Only", "Invite Only"]),
  }),
});

export const collections = { event };
