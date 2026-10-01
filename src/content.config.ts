import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const hexColor = z.string().regex(/^#([A-Fa-f0-9]{6})$/, 'Bitte Hex-Farbwert im Format #RRGGBB angeben.');

const destinations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/destinations' }),
  schema: z.object({
    title: z.string(),
    country: z.string(),
    status: z.enum(['besucht', 'geplant']),
    visitedAt: z.coerce.date().optional(),
    palette: z.object({
      primary: hexColor,
      secondary: hexColor,
      accent: hexColor,
      background: hexColor
    }),
    heroImage: z.object({
      src: z.string(),
      alt: z.string(),
      credit: z.string().optional()
    }),
    attractions: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        image: z.string().optional(),
        category: z.enum(['Kultur', 'Geschichte', 'Architektur', 'Natur', 'Essen'])
      })
    )
  })
});

export const collections = {
  destinations
};
