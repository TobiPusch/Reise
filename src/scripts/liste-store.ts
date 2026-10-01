/**
 * Speicherlogik für „Meine Liste“ – kompatibel zum Original (legacy/reiseziele1.html):
 * gleicher localStorage-Key und gleiches Datenformat { overrides, custom }.
 */

export const STORAGE_KEY = "reiseziele_liste_v1";

export const STATUSES = ["offen", "geplant", "gebucht", "besucht"] as const;
export type ListStatus = (typeof STATUSES)[number];

export const LABELS: Record<ListStatus, string> = {
  offen: "Offen",
  geplant: "Geplant",
  gebucht: "Gebucht",
  besucht: "Besucht",
};

export type EditableField = "status" | "budget" | "bestZeit";

export interface Override {
  status?: string;
  budget?: string;
  bestZeit?: string;
}

export interface CustomItem {
  id: string;
  title: string;
  status?: string;
  budget?: string;
  bestZeit?: string;
}

export interface ListState {
  overrides: Record<string, Override>;
  custom: CustomItem[];
}

/** Standard-Eintrag aus der Content Collection. */
export interface DefaultItem {
  id: string;
  title: string;
  link: string;
  hook: string;
  bestZeit: string;
  status: ListStatus;
}

export function isStatus(value: unknown): value is ListStatus {
  return typeof value === "string" && (STATUSES as readonly string[]).includes(value);
}

export function loadState(): ListState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { overrides: {}, custom: [] };
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return { overrides: {}, custom: [] };
    const { overrides, custom } = parsed as Partial<ListState>;
    return {
      overrides: overrides && typeof overrides === "object" ? overrides : {},
      custom: Array.isArray(custom) ? custom : [],
    };
  } catch {
    return { overrides: {}, custom: [] };
  }
}

export function saveState(state: ListState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* Speicher nicht verfügbar — Änderung bleibt nur für diese Sitzung sichtbar */
  }
}

/** Vom Nutzer gesetzter Status für ein Standard-Ziel, falls vorhanden. */
export function overrideStatus(state: ListState, id: string): ListStatus | undefined {
  const status = state.overrides[id]?.status;
  return isStatus(status) ? status : undefined;
}
