---
title: "Anleitung: Deepfake-Videoclips für Schulungen erstellen"
linkTitle: "Deepfake-Videos erstellen"
slug: "deepfake-videos-erstellen"
weight: 6
_build:
  render: always
description: "Schritt-für-Schritt-Anleitung zur Erstellung echter und gefälschter Videoclips für die 'Spot the Fake'-Übung – mit kostenlosen Tools für Windows und Linux."
menu:
  sidebar:
    weight: 30
    identifier: "de-make-deepfake"
    parent: "de-docs"
translationKey: "make-deepfake"
---

Diese Anleitung zeigt, wie man kurze **echte** und **gefälschte** Videoclips für Schulungen in Schutzunterkünften oder Workshops erstellt. Nur für Bildungszwecke – nicht für Social-Media-Pranks, politische Manipulation oder um Nachbarn zu provozieren.

Möglich auf:

- **Windows** mit kostenlosen Tools oder Browser-Diensten
- **Linux** über Kommandozeile oder GUI
- Sowohl Online- als auch Offline-Workflows je nach Bedrohungsmodell und verfügbarer Zeit

## Grundprinzipien

- Clips unter **30 Sekunden** halten
- **Neutrale, nicht-triggernde Inhalte** verwenden (z.B. "Hallo, ich bin X. Willkommen im Shelter.")
- Teilnehmern **immer offenlegen**, was gefälscht ist und wie es erstellt wurde
- Niemals echte Identitäten von Betroffenen, Mitarbeitern oder Klienten in Fake-Videos nutzen
- Verantwortungsvoll speichern und löschen

## Echte Videoaufnahmen

Sie benötigen:

- Ein Smartphone oder Webcam (sogar 720p reicht)
- Einen ruhigen Ort mit guter Beleuchtung
- Jemanden, der ein kurzes Skript spricht
- Kein Schnitt nötig, außer Sie wollen den Clip kürzen

Empfohlene kostenlose Schnitttools:
- **Windows**: Integrierte Fotos-App → Bearbeiten → Kürzen
- **Linux**: `Shotcut` oder `Kdenlive` verwenden

```bash
ffmpeg -i input.mp4 -ss 00:00:01 -to 00:00:29 -c copy trimmed.mp4
```

## Deepfake-Versionen erstellen

### Windows: Online-Tools verwenden

**Am einfachsten für die meisten Nutzer**, nur geeignet wenn Cloud-Uploads kein Problem darstellen.

#### Option 1: DeepBrain AI Studios

* Gehe zu [DeepBrain AI Studios](https://www.aistudios.com/)
* Erstelle ein kostenloses Konto (begrenzte Nutzung)
* Lade ein Skript hoch und wähle ein Gesicht aus (oder erstelle einen Klon)
* Generiere einen Clip – normalerweise unter einer Minute
* Lade das Video herunter (MP4)

#### Option 2: HeyGen

* Gehe zu [HeyGen](https://www.heygen.com/)
* Wähle einen Presenter aus oder lade dein eigenes Foto hoch
* Füge ein Textskript hinzu
* Unterstützt mehrere Sprachen und Akzente
* Kostenlose Testversion mit Wasserzeichen

#### Option 3: Synthesia.io

* Gehe zu [Synthesia.io](https://www.synthesia.io/)
* Hochwertige Avatare, sehr benutzerfreundlich
* Erfordert ein Konto
* Kostenlose Testversion umfasst einige Videos

*Alle Online-Plattformen speichern deine Clips. Verwende nur generische Inhalte und erwäge die Verwendung von Wegwerf-E-Mails.*

### Windows: Kostenlose Offline-Tools

#### Option 1: Avatarify (Open-Source, Echtzeit-Deepfake)

* Installiere [Avatarify](https://avatarify.ai/)

```bash
pip install avatarify
```

* Verwende es mit einer Webcam + Skriptvorleser
* Überlagere ein Promi- oder Stock-Gesicht in Echtzeit

#### Option 2: DeepFaceLab

* Lade es von [GitHub](https://github.com/iperov/DeepFaceLab) herunter
* Erfordert eine starke GPU und Geduld
* Am besten für Realismus geeignet, aber Einrichtung ist fortgeschritten

### Linux: Kostenlose Tools verwenden

#### Option 1: First-order Motion Model (FOMM)

* Verwende [vorab trainierte Modelle von Aliaksandr Siarohin](https://github.com/AliaksandrSiarohin/first-order-model).

```bash
git clone https://github.com/AliaksandrSiarohin/first-order-model
cd first-order-model
pip install -r requirements.txt
```

* Füttere es mit:

    * Einem Standbild (Gesicht)
    * Einem Referenzvideo (du oder ein Schauspieler, der das Skript liest)

- Erzeugt animierte Videos

#### Option 2: DeepFaceLive (Linux-native Build)

Es gibt *tatsächlich* eine Linux-native Version, allerdings ist sie weit weniger dokumentiert und erfordert mehr Aufwand bei den Abhängigkeiten 
wie `dlib`, `onnxruntime` und spezifischen Versionen von `ffmpeg`. Aber sie funktioniert:

* Projekt klonen: `git clone https://github.com/iperov/DeepFaceLive.git`
* Folgen Sie den [Linux-Installationsanweisungen](https://github.com/iperov/DeepFaceLive#linux) (nicht so ausgereift, aber funktional):

  * Abhängigkeiten installieren wie Python 3.8–3.10, `onnxruntime`, `torch`, `opencv` und `dlib`.
  * Nutzen Sie virtualenv, um die Umgebung sauber zu halten.
  * Seien Sie auf etwas Fehlersuche vorbereitet - besonders bei CUDA, wenn Sie GPU-Beschleunigung wollen. Es ist recht systemintensiv.

- Gut geeignet für Video-Output mit Sprach- und Gesichtsüberlagerung.
- Weniger flüssig in Echtzeit als unter Windows, aber mit etwas Geduld nutzbar.

## Vorbereitung

* **3 bis 4 echte Clips** mit einfachen Einführungen
* **3 bis 4 gefälschte Clips**, generiert aus denselben oder ähnlichen Skripten
* Optional: **Ein gemischter Clip**, bei dem nur Teile verändert sind (z.B. Stimme vs. Gesicht)

Verwende konsistente Beleuchtung und Ton, damit die Unterschiede subtil sind.

## Privatsphäre und Ethik

Do:

* Hol informierte Zustimmung von echten Sprechern ein
* Verwende erfundene Namen und harmlose Skripte
* Erkläre, wie und warum der Fake erstellt wurde

Don't:

* Videos von echten Betroffenen, Kindern oder sensiblen Geschichten verwenden
* Deepfake-Generatoren nutzen, ohne deren Nutzungsbedingungen zu prüfen
* Vergessen, zwischengespeicherte oder übriggebliebene Trainingsdaten zu löschen

