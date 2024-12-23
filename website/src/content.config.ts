import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "../events/" }),
  schema: z.object({
    title: z.string().optional().default("Event TBD"),
    date: z
      .date()
      .optional()
      .default(() => new Date("2030-01-01")),
    time: z.string().optional().default("8:00 am"),
    description: z
      .string()
      .optional()
      .default("Join the Copperstate4Wheelers on a run!"),
    invite: z.string().optional().default("open to visitors"),
  }),
});

export const collections = { events };
