/** Kontinente in der Reihenfolge, in der sie im Filter erscheinen. */
export const CONTINENTS = [
  "Europa",
  "Asien",
  "Afrika",
  "Nordamerika",
  "Südamerika",
  "Ozeanien",
  "Antarktis",
] as const;
export type Continent = (typeof CONTINENTS)[number];

export const STATUSES = ["geplant", "besucht"] as const;
export type Status = (typeof STATUSES)[number];

export const STATUS_LABELS: Record<Status, string> = {
  geplant: "Geplant",
  besucht: "Besucht",
};

/** URL-taugliche Kurzform, z.B. „Südamerika“ → „suedamerika“. */
export function filterKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-");
}

/** Budget-Skala: 1 = günstig … 5 = teuer. */
export const BUDGET_MAX = 5;
export const BUDGET_LEVELS = [1, 2, 3, 4, 5] as const;
export const BUDGET_ICON = "💰";
/** Filterwert für Ziele ohne Budget-Angabe. */
export const BUDGET_NONE = "keine";

export function budgetLabel(level: number): string {
  return `Budget ${level} von ${BUDGET_MAX}`;
}
