---
# Vorlage für ein neues Reiseziel, an der Struktur von wien.md orientiert.
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
order: 9                   # optional: Position auf der Übersicht
subtitle: "Untertitel im Hero der Detailseite."   # optional
bestTime: "z.B. Mai–September"                    # optional: beste Reisezeit
photoCredits: "Bildnachweis: Fotos von Wikimedia Commons, verschiedene CC-Lizenzen. Quellen: …"   # optional: Footer der Detailseite
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
# attractions ist ein alter, abgelöster Mechanismus (eigene Sehenswürdigkeiten-Sektion
# am Seitenende, getrennt vom Fließtext). Alle aktuellen Ziele nutzen stattdessen die
# Karten-Items im Text (siehe unten und README) – deshalb hier immer leer lassen.
attractions: []
---

<p class="lead">Einleitender Satz in größerer Schrift.</p>

Einleitender Absatz: worum es bei diesem Ziel insgesamt geht.

## Erstes Kapitel

Ein bis zwei Sätze, die das Kapitel einordnen, bevor die einzelnen Orte kommen.

<div class="items">

<article class="item">
  <figure>
    <img src="https://commons.wikimedia.org/wiki/Special:FilePath/DATEINAME.jpg?width=1200" alt="Bildbeschreibung" loading="lazy">
    <figcaption>Bildunterschrift <span class="credit">Quelle: Wikimedia Commons</span></figcaption>
  </figure>
  <div class="item-body">
    <h3>Name des Ortes</h3>
    <p>Ein bis zwei Sätze zu diesem Ort: was ihn ausmacht, eine konkrete Zahl oder Jahreszahl, ein Grund, warum er sich lohnt.</p>
  </div>
</article>

<article class="item">
  <figure>
    <img src="https://commons.wikimedia.org/wiki/Special:FilePath/DATEINAME2.jpg?width=1200" alt="Bildbeschreibung" loading="lazy">
    <figcaption>Bildunterschrift <span class="credit">Quelle: Wikimedia Commons</span></figcaption>
  </figure>
  <div class="item-body">
    <h3>Zweiter Ort im selben Kapitel</h3>
    <p>Jedes Kapitel bündelt mehrere thematisch verwandte Orte als Karten statt einen pro Kapitel – siehe wien.md und hamburg.md als Referenz.</p>
  </div>
</article>

</div>

<div class="note"><strong>Für dich interessant:</strong> Ein praktischer Tipp zu diesem Kapitel, z.B. Anfahrt, Ticket vorab buchen, beste Tageszeit.</div>

## Zweites Kapitel

Weiterer Einordnungssatz.

<div class="items">

<article class="item">
  <figure>
    <img src="https://commons.wikimedia.org/wiki/Special:FilePath/DATEINAME3.jpg?width=1200" alt="Bildbeschreibung" loading="lazy">
    <figcaption>Bildunterschrift <span class="credit">Quelle: Wikimedia Commons</span></figcaption>
  </figure>
  <div class="item-body">
    <h3>Dritter Ort</h3>
    <p>Auch ein letztes Kapitel wie „<Stadt> mobil" mit Öffi-Infos und einem Netzplan-Bild (Klasse <code>item-map</code> auf dem <code>article</code>, siehe wien.md) ist ein gutes Muster für den Abschluss.</p>
  </div>
</article>

</div>
