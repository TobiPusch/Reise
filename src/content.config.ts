import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const destinations = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/destinations" }),
  schema: z.object({
    city: z.string(),
    country: z.string(),
    hashRoute: z.string(),
    palette: z.object({
      primary: z.string(),
      secondary: z.string(),
      accent: z.string(),
      background: z.string(),
      text: z.string()
    }),
    chapters: z.array(
      z.object({
        title: z.string(),
        summary: z.string()
      })
    ),
    images: z.array(
      z.object({
        title: z.string(),
        source: z.string().url(),
        attribution: z.string()
      })
    )
  })
});

export const collections = {
  destinations
};
