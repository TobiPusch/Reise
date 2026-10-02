---
# Vorlage für ein neues Reiseziel.
# 1. Datei kopieren und als <slug>.md speichern (z.B. lissabon.md) – ohne führenden Unterstrich.
#    Der Dateiname wird zur URL: /lissabon/
# 2. Felder ausfüllen. Pflichtfelder: title, country, continent, teaser, palette, heroImage.
title: "Stadtname"
country: "Land"
continent: "Europa"       # Europa | Asien | Afrika | Nordamerika | Südamerika | Ozeanien | Antarktis
teaser: "Ein Satz für die Karte auf der Übersicht."
status: "geplant"          # "geplant" | "besucht"
budget: 3                  # optional: 1 (günstig) bis 5 (teuer)
# visitedAt: 2026-05-14    # optional, nur bei status "besucht"
order: 7                   # optional: Position auf der Übersicht
subtitle: "Untertitel im Hero der Detailseite."   # optional
bestTime: "z.B. Mai–September"                    # optional: beste Reisezeit
photoCredits: "Bildnachweis: …"                   # optional: Footer der Detailseite
palette:
  primary: "#B24A30"       # Kapitelnummern, Hervorhebungen
  secondary: "#2B3A55"     # Zitate, Hero-Ton
  accent: "#A9824F"        # Zitat-Linie
  background: "#F5F1E7"    # Seitenhintergrund
  text: "#201D19"          # Textfarbe
heroImage:
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/DATEINAME.jpg?width=1600"
  alt: "Beschreibung des Bildes"
  credit: "Fotograf:in, Wikimedia Commons"   # optional
attractions: []            # optional, siehe README
# attractions:
#   - name: "Name der Sehenswürdigkeit"
#     description: "Kurzbeschreibung."
#     category: "Kultur"   # Kultur | Geschichte | Architektur | Natur | Essen
#     image:               # optional
#       src: "https://…"
#       alt: "…"
---

<p class="lead">Einleitender Satz in größerer Schrift.</p>

Einleitender Absatz.

## Erstes Kapitel

Text des Kapitels.

<figure>
  <img src="https://commons.wikimedia.org/wiki/Special:FilePath/DATEINAME.jpg?width=1200" alt="Bildbeschreibung" loading="lazy">
  <figcaption>Bildunterschrift <span class="credit">Quelle: Wikimedia Commons</span></figcaption>
</figure>

> Ein Zitat.

<div class="note"><strong>Für dich interessant:</strong> Eine Notiz.</div>

## Zweites Kapitel

Text des Kapitels.

<!-- Optional: Unterpunkte als Karten (Bild, Titel, 1–2 Sätze), z.B. für Attraktionen oder Restaurants -->
<div class="items">

<article class="item">
  <figure>
    <img src="https://commons.wikimedia.org/wiki/Special:FilePath/DATEINAME.jpg?width=1200" alt="Bildbeschreibung" loading="lazy">
    <figcaption>Bildunterschrift <span class="credit">Quelle: Wikimedia Commons</span></figcaption>
  </figure>
  <div class="item-body">
    <h3>Name des Unterpunkts</h3>
    <p>Ein bis zwei Sätze zum Unterpunkt.</p>
  </div>
</article>

</div>
