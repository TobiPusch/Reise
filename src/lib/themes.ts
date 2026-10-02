/**
 * Typografie und Hero-Details der Original-Stadtseiten (legacy/reiseziele1.html).
 * Die Farben selbst kommen aus der `palette` der Content Collection; hier steht nur,
 * welche Palettenrolle wofür verwendet wird und was das Schema nicht abbildet.
 * Neue Ziele ohne Eintrag bekommen `defaultTheme`.
 */
export type PaletteRole = "primary" | "secondary" | "accent" | "text";

export interface CityTheme {
  /** CSS font-family für Titel, Lead, Kapitel und Zitate. */
  font: string;
  title: { weight: number; size: [mobile: number, desktop: number]; lineHeight: number; tracking?: string };
  lead: { italic: boolean; size: number; weight: number; lineHeight: number };
  chapter: { numSize: number; titleSize: number; titleWeight: number };
  quote: { italic: boolean; size: number; weight: number; border: PaletteRole };
  hero: {
    opacity: number;
    filter?: string;
    minHeight: [mobile: number, desktop: number];
    background: PaletteRole;
    shade: PaletteRole;
    shadeAlpha: number;
  };
  /** --paper-warm des Originals (Hintergrund der Notiz-Boxen). */
  surface?: string;
  /** Deckkraft der Trennlinien in Prozent. */
  ruleAlpha: number;
  /** Navigation liegt hell über dem Hero (sonst normal darüber). */
  navOverlay: boolean;
}

const cormorant = "'Cormorant Garamond', serif";

export const defaultTheme: CityTheme = {
  font: cormorant,
  title: { weight: 600, size: [56, 72], lineHeight: 0.95 },
  lead: { italic: true, size: 24, weight: 500, lineHeight: 1.45 },
  chapter: { numSize: 16, titleSize: 30, titleWeight: 600 },
  quote: { italic: true, size: 19, weight: 400, border: "accent" },
  hero: { opacity: 0.68, minHeight: [72, 78], background: "text", shade: "text", shadeAlpha: 92 },
  ruleAlpha: 15,
  navOverlay: false,
};

export const themes: Record<string, CityTheme> = {

  tokio: {
    font: "'Zen Old Mincho', serif",
    title: { weight: 500, size: [52, 68], lineHeight: 0.98 },
    lead: { italic: false, size: 22, weight: 500, lineHeight: 1.45 },
    chapter: { numSize: 15, titleSize: 28, titleWeight: 500 },
    quote: { italic: true, size: 18, weight: 400, border: "accent" },
    hero: { opacity: 0.62, minHeight: [78, 82], background: "text", shade: "text", shadeAlpha: 92 },
    surface: "#EFE7D6",
    ruleAlpha: 14,
    navOverlay: true,
  },
  rom: {
    ...defaultTheme,
    surface: "#EAE0CC",
  },
  griechenland: {
    ...defaultTheme,
    title: { weight: 600, size: [52, 68], lineHeight: 0.95 },
    quote: { ...defaultTheme.quote, border: "secondary" },
    surface: "#E4E5D6",
  },
  london: {
    ...defaultTheme,
    quote: { ...defaultTheme.quote, border: "primary" },
    hero: { ...defaultTheme.hero, background: "secondary", shade: "secondary" },
    surface: "#E1DDD0",
    navOverlay: true,
  },
  berlin: {
    font: "'Space Grotesk', sans-serif",
    title: { weight: 700, size: [52, 66], lineHeight: 0.95, tracking: "-0.01em" },
    lead: { italic: false, size: 22, weight: 600, lineHeight: 1.4 },
    chapter: { numSize: 15, titleSize: 27, titleWeight: 700 },
    quote: { italic: false, size: 18, weight: 500, border: "accent" },
    hero: {
      opacity: 0.62,
      filter: "grayscale(20%)",
      minHeight: [72, 78],
      background: "secondary",
      shade: "text",
      shadeAlpha: 94,
    },
    surface: "#DEDBD3",
    ruleAlpha: 15,
    navOverlay: true,
  },
  kopenhagen: {
    font: "'Lora', serif",
    title: { weight: 600, size: [52, 66], lineHeight: 0.98 },
    lead: { italic: true, size: 22, weight: 500, lineHeight: 1.5 },
    chapter: { numSize: 15, titleSize: 28, titleWeight: 600 },
    quote: { italic: true, size: 18, weight: 400, border: "accent" },
    hero: { opacity: 0.7, minHeight: [72, 78], background: "secondary", shade: "text", shadeAlpha: 92 },
    surface: "#EADFC9",
    ruleAlpha: 15,
    navOverlay: true,
  },
  // Neu angelegt (nicht aus dem Original): Standard-Typografie, Navigation über dem Hero.
  wien: {
    ...defaultTheme,
    surface: "#ECE3CF",
    navOverlay: true,
  },
};

export function themeFor(slug: string): CityTheme {
  return themes[slug] ?? defaultTheme;
}

/** Alle Theme-Werte als CSS Custom Properties (für das style-Attribut am Seitenroot). */
export function themeVars(theme: CityTheme): Record<string, string> {
  const role = (r: PaletteRole) => `var(--${r})`;
  return {
    "--font-display": theme.font,
    "--title-weight": String(theme.title.weight),
    "--title-size": `${theme.title.size[0]}px`,
    "--title-size-lg": `${theme.title.size[1]}px`,
    "--title-leading": String(theme.title.lineHeight),
    "--title-tracking": theme.title.tracking ?? "normal",
    "--lead-style": theme.lead.italic ? "italic" : "normal",
    "--lead-size": `${theme.lead.size}px`,
    "--lead-weight": String(theme.lead.weight),
    "--lead-leading": String(theme.lead.lineHeight),
    "--chapter-num-size": `${theme.chapter.numSize}px`,
    "--chapter-title-size": `${theme.chapter.titleSize}px`,
    "--chapter-title-weight": String(theme.chapter.titleWeight),
    "--quote-style": theme.quote.italic ? "italic" : "normal",
    "--quote-size": `${theme.quote.size}px`,
    "--quote-weight": String(theme.quote.weight),
    "--quote-border": role(theme.quote.border),
    "--hero-opacity": String(theme.hero.opacity),
    "--hero-filter": theme.hero.filter ?? "none",
    "--hero-min": `${theme.hero.minHeight[0]}vh`,
    "--hero-min-lg": `${theme.hero.minHeight[1]}vh`,
    "--hero-bg": role(theme.hero.background),
    "--hero-shade": role(theme.hero.shade),
    "--hero-shade-alpha": `${theme.hero.shadeAlpha}%`,
    "--rule-alpha": `${theme.ruleAlpha}%`,
    ...(theme.surface ? { "--surface-light": theme.surface } : {}),
  };
}
