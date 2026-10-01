import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const hexColor = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, "Erwartet einen Hex-Farbwert wie #B24A30");

const image = z.object({
  src: z.string(),
  alt: z.string(),
  credit: z.string().optional(),
});

const destinations = defineCollection({
  // Dateien mit führendem Unterstrich (z.B. _template.md) werden ignoriert.
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/destinations" }),
  schema: z.object({
    title: z.string(),
    country: z.string(),
    /** Kurztext aus dem Eintrag auf der Übersichtsseite. */
    teaser: z.string(),
    status: z.enum(["besucht", "geplant"]).default("geplant"),
    visitedAt: z.coerce.date().optional(),
    /**
     * Farben aus dem CSS der Original-Stadtseite.
     * primary   → Kapitelnummern, Hervorhebung in Notizen
     * secondary → Zitatfarbe (und Hero-Ton, je nach Theme)
     * accent    → Zitat-Linie (je nach Theme)
     * background / text → --paper / --ink
     */
    palette: z.object({
      primary: hexColor,
      secondary: hexColor,
      accent: hexColor,
      background: hexColor,
      text: hexColor,
    }),
    heroImage: image,
    attractions: z
      .array(
        z.object({
          name: z.string(),
          description: z.string(),
          image: image.optional(),
          category: z.enum(["Kultur", "Geschichte", "Architektur", "Natur", "Essen"]),
        }),
      )
      .default([]),

    // Zusätzliche optionale Felder, damit kein Inhalt des Originals verloren geht.
    /** Reihenfolge auf der Übersicht („Städteprofil · 01“). */
    order: z.number().int().optional(),
    /** Untertitel im Hero der Stadtseite. */
    subtitle: z.string().optional(),
    /** Vorbelegung „Beste Reisezeit“ auf der Seite „Meine Liste“. */
    bestTime: z.string().optional(),
    /** Sammel-Bildnachweis aus dem Footer der Stadtseite. */
    photoCredits: z.string().optional(),
  }),
});

export const collections = { destinations };
