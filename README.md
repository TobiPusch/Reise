# Reise

Statische Reise-Website mit Astro und Content Collections.

## Neues Ziel hinzufügen

1. Lege Bilder unter `src/assets/destinations/<slug>/` ab (Hero als `hero.png`).
2. Kopiere `src/content/destinations/_template.md` nach `src/content/destinations/<slug>.md`.
3. Fülle Frontmatter (`title`, `country`, `status`, `palette`, `heroImage`, `attractions`) und den Markdown-Body mit `##`-Kapiteln aus.
4. Starte lokal mit `npm run dev` oder prüfe den Build mit `npm run build`.
