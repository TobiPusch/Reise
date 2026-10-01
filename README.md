# Reiseziele

Mein Reise-Journal als statische Website mit [Astro](https://astro.build) (TypeScript strict), veröffentlicht über GitHub Pages unter **https://reisen.open.MEINEDOMAIN.de**.

Die Inhalte stammen aus dem alten Single-File-Reisetagebuch, das unverändert unter [`legacy/reiseziele1.html`](legacy/reiseziele1.html) liegt.

## Lokale Entwicklung

Voraussetzung: Node.js ≥ 22.12.

```sh
npm install        # Abhängigkeiten installieren
npm run dev        # Dev-Server auf http://localhost:4321
npm run build      # Typprüfung (astro check) + statischer Build nach dist/
npm run preview    # gebaute Seite lokal ansehen
```

## Aufbau

```
src/
├── content.config.ts            # Schema der Content Collection „destinations“
├── content/destinations/
│   ├── _template.md             # Vorlage (wird wegen „_“ nicht gebaut)
│   └── <slug>.md                # ein Reiseziel pro Datei → /<slug>/
├── layouts/Base.astro           # Grundgerüst, Navigation, globale Farben, Dark Mode
├── lib/
│   ├── destinations.ts          # Ziele laden und sortieren
│   └── themes.ts                # Schriften & Hero-Details je Stadt (aus dem Original-CSS)
├── pages/
│   ├── index.astro              # Übersicht (leitet alte Links wie /#rom auf /rom/ um)
│   ├── [slug].astro             # Detailseite je Ziel
│   └── liste.astro              # „Meine Liste“
└── scripts/liste-store.ts       # localStorage-Logik (Key: reiseziele_liste_v1)
```

## Neues Ziel hinzufügen

1. `src/content/destinations/_template.md` kopieren und als `<slug>.md` speichern, z.B. `lissabon.md`. Der Dateiname wird zur URL (`/lissabon/`). Dateien mit führendem `_` werden ignoriert.
2. Frontmatter ausfüllen:
   - **Pflicht:** `title`, `country`, `teaser`, `palette` (fünf Hex-Farben), `heroImage` (`src`, `alt`, optional `credit`)
   - **Optional:** `status` (`"geplant"` | `"besucht"`, Standard `"geplant"`), `visitedAt` (Datum), `attractions`, `order` (Position auf der Übersicht), `subtitle` (Hero-Untertitel), `bestTime` (Vorbelegung auf „Meine Liste“), `photoCredits` (Bildnachweis im Footer)
3. Text als Markdown schreiben: Einleitung oben, jedes Kapitel als `## Überschrift`. Kapitel werden automatisch nummeriert. Bilder, Zitate (`>`) und Notizen (`<div class="note">`) wie in der Vorlage.
4. `npm run dev` – das Ziel erscheint automatisch auf der Übersicht, als Detailseite und auf „Meine Liste“.

Ohne Eintrag in `src/lib/themes.ts` bekommt ein neues Ziel das Standard-Design (Cormorant Garamond). Wer Schrift oder Hero-Details anpassen will, ergänzt dort einen Eintrag mit dem Slug.

### Attraktionen

```yaml
attractions:
  - name: "Torre de Belém"
    description: "Kurzbeschreibung."
    category: "Geschichte"   # Kultur | Geschichte | Architektur | Natur | Essen
    image:                   # optional
      src: "https://…"
      alt: "…"
      credit: "…"            # optional
```

Die Attraktionen erscheinen als Grid unter dem Text der Detailseite.

## Eigene Fotos

Eigene Fotos gehören nach `src/assets/destinations/<slug>/`, z.B. `src/assets/destinations/lissabon/alfama.jpg`. Astro optimiert sie dann beim Build (Größe, Format, `width`/`height`).

**Im Markdown-Text** relativ einbinden – Astro verarbeitet das Bild automatisch:

```md
![Blick über die Alfama](../../assets/destinations/lissabon/alfama.jpg)
```

**In Astro-Komponenten** über `astro:assets`:

```astro
---
import { Image } from "astro:assets";
import alfama from "../assets/destinations/lissabon/alfama.jpg";
---

<Image src={alfama} alt="Blick über die Alfama" width={1200} />
```

**Als Hero- oder Attraktionsbild im Frontmatter:** Das Schema erwartet dort aktuell eine URL (`src: string`). Für lokale Dateien kann man es in `src/content.config.ts` auf den `image()`-Helper umstellen:

```ts
schema: ({ image }) =>
  z.object({
    heroImage: z.object({ src: z.union([image(), z.string()]), alt: z.string(), credit: z.string().optional() }),
    // …
  }),
```

Dann im Frontmatter `src: "../../assets/destinations/lissabon/hero.jpg"` angeben und in `index.astro` / `[slug].astro` für lokale Bilder `<Image>` statt `<img>` verwenden.

## Meine Liste

Status, Budget und beste Reisezeit werden – wie im Original – im `localStorage` des Browsers unter `reiseziele_liste_v1` gespeichert. Die Daten bleiben also nur im jeweiligen Browser und für die jeweilige Domain erhalten.

## Deployment

Jeder Push auf `main` (oder ein manueller Start über „Run workflow“) baut die Seite mit `withastro/action` und veröffentlicht sie mit `actions/deploy-pages` – siehe [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

Einmalig im Repository einrichten:

1. **Settings → Pages → Build and deployment → Source:** „GitHub Actions“.
2. **Custom domain:** `reisen.open.MEINEDOMAIN.de` (steht auch in `public/CNAME`).
3. Beim DNS-Anbieter einen `CNAME`-Eintrag `reisen.open` → `<github-benutzername>.github.io` anlegen und danach „Enforce HTTPS“ aktivieren.

`MEINEDOMAIN` muss in `astro.config.mjs`, `public/CNAME` und hier durch die echte Domain ersetzt werden.
