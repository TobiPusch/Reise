# Reiseziele

Mein Reise-Journal als statische Website mit [Astro](https://astro.build) (TypeScript strict), veröffentlicht über GitHub Pages unter **https://reisen.open.t-pusch.de**.

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
├── layouts/Base.astro           # Grundgerüst, Zurück-Link, globale Farben, Dark Mode
├── lib/
│   ├── destinations.ts          # Ziele laden und sortieren
│   ├── taxonomy.ts              # Kontinente und Status (für Schema und Filter)
│   └── themes.ts                # Schriften & Hero-Details je Stadt (aus dem Original-CSS)
└── pages/
    ├── index.astro              # Übersicht mit Filtern (leitet alte Links wie /#rom auf /rom/ um)
    └── [slug].astro             # Detailseite je Ziel
```

## Filter auf der Übersicht

Die Übersicht lässt sich nach **Kontinent** und **Status** filtern. Angeboten wird ein Filter nur, wenn es dafür mindestens zwei verschiedene Werte gibt – solange z.B. alle Ziele „geplant“ sind, erscheint der Status-Filter nicht. Die Auswahl steht in der URL (`/?kontinent=europa&status=besucht`) und lässt sich so teilen.

## Neues Ziel hinzufügen

1. `src/content/destinations/_template.md` kopieren und als `<slug>.md` speichern, z.B. `lissabon.md`. Der Dateiname wird zur URL (`/lissabon/`). Dateien mit führendem `_` werden ignoriert.
2. Frontmatter ausfüllen:
   - **Pflicht:** `title`, `country`, `continent` (`Europa` | `Asien` | `Afrika` | `Nordamerika` | `Südamerika` | `Ozeanien` | `Antarktis`), `teaser`, `palette` (fünf Hex-Farben), `heroImage` (`src`, `alt`, optional `credit`)
   - **Optional:** `status` (`"geplant"` | `"besucht"`, Standard `"geplant"`), `visitedAt` (Datum), `attractions`, `order` (Position auf der Übersicht), `subtitle` (Hero-Untertitel), `bestTime` (beste Reisezeit), `photoCredits` (Bildnachweis im Footer)
3. Text als Markdown schreiben: Einleitung oben, jedes Kapitel als `## Überschrift`. Kapitel werden automatisch nummeriert. Bilder, Zitate (`>`) und Notizen (`<div class="note">`) wie in der Vorlage.
4. `npm run dev` – das Ziel erscheint automatisch auf der Übersicht (inkl. Filter) und als Detailseite.

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

## Deployment

Jeder Push auf `main` (oder ein manueller Start über „Run workflow“) baut die Seite mit `withastro/action` und veröffentlicht sie mit `actions/deploy-pages` – siehe [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

Einmalig einrichten:

1. **GitHub → Settings → Pages → Build and deployment → Source:** „GitHub Actions“.
2. **GitHub → Settings → Pages → Custom domain:** `reisen.open.t-pusch.de` eintragen und speichern. Bei Deployments über GitHub Actions wird `public/CNAME` von GitHub nicht ausgewertet – die Domain muss hier gesetzt sein.
3. **Cloudflare → DNS → Records** für `t-pusch.de`:

   | Typ | Name | Ziel | Proxy-Status |
   |---|---|---|---|
   | `CNAME` | `reisen.open` | `tobipusch.github.io` | **DNS only** (graue Wolke) |

   „DNS only“ ist nötig: Das kostenlose Cloudflare-Zertifikat deckt nur eine Subdomain-Ebene ab (`*.t-pusch.de`), nicht `reisen.open.t-pusch.de`. Mit orangener Wolke gäbe es einen SSL-Fehler, außerdem könnte GitHub kein eigenes Zertifikat ausstellen.
4. Warten, bis GitHub unter Settings → Pages „DNS check successful“ meldet und das Zertifikat ausgestellt ist (einige Minuten bis ca. eine Stunde), dann **Enforce HTTPS** aktivieren.
5. Optional, gegen Domain-Übernahme: **GitHub → Profil-Settings → Pages → Add a domain** `t-pusch.de` verifizieren. GitHub zeigt dafür einen `TXT`-Eintrag an, der in Cloudflare angelegt wird.
