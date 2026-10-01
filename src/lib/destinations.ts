import { getCollection, type CollectionEntry } from "astro:content";

export type Destination = CollectionEntry<"destinations">;

/** Alle Ziele in der Reihenfolge der Original-Übersicht (Feld `order`, sonst alphabetisch). */
export async function getDestinations(): Promise<Destination[]> {
  const entries = await getCollection("destinations");
  return entries.sort((a, b) => {
    const oa = a.data.order ?? Number.POSITIVE_INFINITY;
    const ob = b.data.order ?? Number.POSITIVE_INFINITY;
    return oa === ob ? a.data.title.localeCompare(b.data.title, "de") : oa - ob;
  });
}

/** Zweistellige Profilnummer wie im Original („01“, „02“ …). */
export function profileNumber(entry: Destination, index: number): string {
  return String(entry.data.order ?? index + 1).padStart(2, "0");
}

/** Wikimedia-FilePath-URL mit anderer Breite (Übersicht nutzt im Original ?width=900). */
export function withWidth(src: string, width: number): string {
  return src.replace(/([?&]width=)\d+/, `$1${width}`);
}
