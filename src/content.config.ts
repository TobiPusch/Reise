import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { CONTINENTS } from "./lib/taxonomy";

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
    continent: z.enum(CONTINENTS),
    /** Kurztext aus dem Eintrag auf der Übersichtsseite. */
    teaser: z.string(),
    status: z.enum(["besucht", "geplant"]).default("geplant"),
    visitedAt: z.coerce.date().optional(),
    /** Budget-Einschätzung von 1 (günstig) bis 5 (teuer). */
    budget: z.number().int().min(1).max(5).optional(),
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
    /** Beste Reisezeit, angezeigt auf der Detailseite. */
    bestTime: z.string().optional(),
    /** Sammel-Bildnachweis aus dem Footer der Stadtseite. */
    photoCredits: z.string().optional(),
  }),
});

export const collections = { destinations };
