---
title: "Eyezy: Der Schattenbeobachter in Ihrer Tasche"
date: 2025-07-24
author: PowerOn
translationKey: "context-eyezy"
tags: ["Spyware", "Mobile Überwachung", "digitaler Missbrauch", "Privatsphärenrisiken", "Sicherheit für Betroffene"]
description: "Untersuchung von Eyezys Überwachungsfähigkeiten, wie es gefährdete Nutzer ins Visier nimmt und was Fachkräfte wissen müssen, um es zu erkennen."
---

Eyezy ist der neongrelle Neue im Stalkerware-Wettrüsten. Mit einem Namen, der nach einem Emoji-Startup oder einer übereifrigen Augenpflegemarke klingt, könnte man es für harmlos halten. Doch lassen Sie sich nicht vom Pastellfarben-Design und munteren Interface täuschen – Eyezy ist Überwachungssoftware mit Biss, Mascara hin oder her.

Es verspricht "Seelenfrieden", "totale Kontrolle" und "Echtzeit-Updates" – was in den falschen Händen weniger beruhigend als bedrohlich ist. Und wie in diesem Genre üblich, behauptet es, "für Eltern" zu sein.

## Was Eyezy tut (und nicht zugibt)

Eyezy bietet das Übliche: Zugriff auf SMS, Anruflisten, GPS-Standort, App-Nutzung, Browserverlauf, Social-Media-Nachrichten, Tastenanschläge und sogar gelöschte Inhalte. Kurz: Es liest Ihr Leben wie einen Roman und verkauft die Zusammenfassung weiter.

Seine "Magic Alerts" lassen den Stalker – Verzeihung, besorgten Nutzer – Benachrichtigungen erhalten, wenn bestimmte Begriffe getippt werden oder das Ziel einen Geofence verlässt. Als Hilfsmittel für besorgte Eltern vermarktet. Natürlich sehen "Er hat seine Ex wieder geschrieben" und "Sie ging ins Frauenhaus" im Backend fast identisch aus.

Eyezy läuft im Stealth-Modus, wie alle Konkurrenten. Keine Icons, keine Warnungen, keine Ethik. Es bleibt unsichtbar – und das mit beunruhigender Perfektion.

Die Installation variiert: Android erfordert physischen Zugang. iOS nutzt iCloud-Zugriffe und Account-Kompromittierung. Kein Jailbreak nötig – praktisch, wenn man "einfachere Privatsphärenverletzung" als Verkaufsargument sieht.

## Vermarktete Unschuld, bewaffneter Zugriff

Eyezy ist ganz weiche Konturen und elterliche Sorge. Sein Branding wirkt weniger wie Spionagetechnik, mehr wie digitale Selbsthilfe. Keine Warnungen, kein Hinweis auf Missbrauchsszenarien, schon gar keine Frage, was es bedeutet, jemandem stillen Fremdzugriff auf private Kommunikation zu geben.

Doch genau das ermöglicht Eyezy. Sein Geschäftsmodell braucht heimliche Überwachung. Die Website spricht von Teenagern; Internetforen von Partnern.

Diese glaubhafte Abstreitbarkeit ist das eigentliche Produkt. Die Software nur das Transportmittel.

## Folgen für Betroffene

Eyezy ist nicht so mächtig wie FlexiSPY, doch darum geht es nicht. Für Missbrauchsopfer kann selbst grundlegender Datenabfluss – Nachrichten, Standorte, Suchanfragen – katastrophal sein. Ein einziger, unerklärlich gut getimter Text des Täters zerstört jedes Sicherheitsgefühl.

Anders als Staatstrojaner wird Eyezy von Normalbürgern gekauft und installiert. Von Menschen, die "Vertrauen" mit "Kontrolle" verwechseln.

Betroffene merken vielleicht seltsames Geräteverhalten – schneller Akkuverbrauch, unerklärliche Neustarts, Nachrichten, die schon gelesen wurden. Oder einfach, dass der Täter zu viel weiß. Eyezy ist ein Geist in der Maschine. Und wie alle Geister geht es nicht leicht.

## Eyezy die Augen ausstechen

Eyezy verrät sich nicht. Es sammelt still Daten. Die Erkennung erfordert meist forensische Analyse von Apps, Hintergrundprozessen oder verdächtigen Account-Aktivitäten. Auf Android können Technikversierte App-Berechtigungen prüfen. Bei iOS geben iCloud-Zugriffsmuster Hinweise.

Die Entfernung ist knifflig. Ein Werksreset hilft, löscht aber auch Fotos, Nachrichten, Beweise. Und Betroffene können selten risikofrei handeln. Oft ist ein Gerätetausch oder Expertenhilfe in sicheren Umgebungen wie Frauenhaus-Techlaboren die bessere Lösung.

## Das Ökosystem von Eyezy

Eyezy lebt wie mSpy und FlexiSPY in einem rechtlichen Vakuum, wo "Überwachung" seriös klingt und "Zwangskontrolle" eine Fußnote ist. Diese Apps nutzen Gesetzeslücken und behandeln Absicht als Rechtfertigung – selbst wenn das Ergebnis Einschüchterung und Schaden ist.

Eyezy verkauft nicht nur ein Tool, sondern eine Erzählung: dass Überwachung verantwortungsvoll, fürsorglich, nötig sei. Es ist Teil desselben Drehbuchs, das Partner-Nachrichtenlesen, Standortchecks und Passwortforderungen normalisiert.

Dieses Drehbuch ist kaputt.

## Eyezy ist nicht das eigentliche Problem

Eyezy ist ein Symptom, nicht die Krankheit. Die Krankheit ist der Glaube, Liebe müsse durch Zugang bewiesen werden, Sicherheit Kontrolle bedeute und Vertrauen etwas sei, das man mit Apps erzwingt.

Für Frauenhäuser ist Eyezy einer von vielen Namen, nach denen man Ausschau halten muss. Seine Präsenz auf Geräten ist ernst zu nehmen. Sein Marketing zynisch zu lesen. Seine Existenz zu hinterfragen – rechtlich, sozial, technologisch.

Die gute Nachricht? Anders als der Täter hinterlässt Eyezy Spuren. Und anders als Vertrauen lässt sich Software entfernen.

## Beispiel‑SIEM‑Erkennungsregeln für Eyezy

**Eyezy** konzentriert sich auf **Tastatur‑Logging**, **Überwachung sozialer Medien** und **Bildschirmaufzeichnung** und tarnt sich oft unter systemähnlichen Namen.

### Tastatur‑Logging via Accessibility oder Input‑Hijack

```json
{
  "rule": {
    "id": 100050,
    "level": 12,
    "description": "Eyezy‑Stil Tastatur‑Logging via Accessibility Hijack",
    "if_sid": [62002],
    "match": {
      "accessibility_service": "com.eye.sysinput/.KeyCaptureService"
    },
    "group": "spyware, android, keylogger"
  }
}
```

*Eyezy hängt sich oft in Texteingabedienste ein, um getippte Inhalte abzufangen – besonders in Nachrichten‑Apps.*

### Soziale Medien spiegeln oder Screen‑Scraping Versuch

```json
{
  "rule": {
    "id": 100051,
    "level": 11,
    "description": "Screen‑Scraping sozialer Medien – Eyezy‑Variante",
    "if_sid": [62001],
    "match": {
      "package.name": "com.eye.mirror.service"
    },
    "group": "spyware, android, social"
  }
}
```

*Sieht aus wie ein Bildschirmaufnahme‑ oder Mirror‑Tool. Wenn es Accessibility‑APIs verwendet, gehen Sie davon aus, dass es private Nachrichten ausspäht.*

### Verdächtige DNS‑Anfragen zu Eyezy‑Cloud‑Infrastruktur

```zeek
event zeek_notice::Weird {
  if (conn$host matches /eyezy|mirrorzone|eyec2/i &&
      conn$duration < 45 secs &&
      conn$resp_bytes < 1500) {
    NOTICE([$note=Notice::Eyezy_C2_Traffic,
            $msg="Mögliche Eyezy‑C2‑Beacon entdeckt",
            $conn=conn]);
  }
}
```

*Eyezy nutzt lautlose HTTPS‑POSTs zu vagen Cloud‑Domains. Achten Sie auf häufige kleine Datenübertragungen zu Domains mit „eye“.*

### Root‑ oder erhöhte Rechte nach der Installation

```json
{
  "rule": {
    "id": 100052,
    "level": 14,
    "description": "Rechteerhöhung erkannt – mögliche Eyezy Spionage‑App",
    "if_sid": [5500],
    "match": {
      "event_type": "privilege_escalation",
      "package.name": "com.eye.sysinput"
    },
    "group": "android, spyware, root"
  }
}
```

*Eyezy kann Root‑Zugriff verlangen oder missbrauchen, um sich vollständig zu verbergen. Wenn das kurz nach der Installation geschieht, alarmieren.*

### Eyezy Verhaltenskorrelations‑Meta‑Regel

```json
{
  "rule": {
    "id": 199996,
    "level": 15,
    "description": "Eyezy Verhaltensmuster erkannt – wahrscheinlich heimliche Überwachung",
    "if_matched_sid": [100050, 100051, 100052],
    "group": "spyware, survivor-risk, alert"
  }
}
```

*Fangen Sie alles ab. Tastatur‑Logging, Screen‑Scraping und Root‑Zugriff in einem Paket ist niemals unschuldig.*
