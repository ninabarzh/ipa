---
title: "Kostenschätzung: Sicheres Frauenhaus Build-a-thon"
weight: 3
translationKey: "cost-guesstimate-shelter"
_build:
  render: always
menu:
  sidebar:
    weight: 15
description: "Detaillierte Kostenschätzung für den 'Sicheres Frauenhaus Build-a-thon', ein praktischer Tagesworkshop, bei dem Mitarbeitende ein eigenes digitales Sicherheitslabor (Wazuh + Pirogue) mit Hilfe von Moderator:innen einrichten."
---

## Übersichtstabellen

### Option A: Inhouse-Labor Build-a-thon (lokales, privates Setup)

| **Posten**                       | **Details**                                      | **Geschätzte Kosten (€)** |
|----------------------------------|--------------------------------------------------|--------------------------:|
| Moderator:innen (2–3 Personen)   | Digitale Sicherheit & trauma-sensible Begleitung |                 800–1.200 |
| SIEM-Stack                       | Server-Hardware, Setup, Netzwerk                 |                 590–1.865 |
| PiRogue-Gerät(e) (optional)      | Raspberry Pi-basierter Netzwerkmonitor           |                   200–400 |
| USB-Sticks / Speicher            | Setup-Schlüssel, Backup, Export                  |                        60 |
| Druckmaterialien & Beschilderung | Anleitungen, Aufkleber, Schilder                 |                        80 |
| Verpflegung                      | Mittagessen, Snacks, Getränke                    |                   200–300 |
| Reisekosten                      | Für Moderator:innen & Equipment                  |                   100–200 |
| Dekoration                       | Beleuchtung, Wimpel, Buttons                     |                        50 |
| Puffer                           | Für Unvorhergesehenes                            |                       100 |
| **GESAMT (ca.)**                 |                                                  |       **2.180 – 4.155 €** |

[Kostenschätzung für Inhouse-Lösung enthalten](/docs/lab/costs.md).

PiRogue ist optional, aber nützlich für private Handyscans ohne Internet.

### Option B: Cloud-basierter Build-a-thon

*Enthält sichere Fernprotokollierung, Mobile Support und kontinuierliches Monitoring.*

| **Posten**                       | **Details**                                    | **Geschätzte Kosten (€)** |
|----------------------------------|------------------------------------------------|--------------------------:|
| Moderator:innen (2–3 Personen)   | Wie lokales Modell                             |                 800–1.200 |
| Cloud-Server & Setup             | Absicherung, VPN, Installation, Feinabstimmung |               1.220–1.720 |
| Geräte-Agent-Setup               | Android/iOS-Logging-Tools, Desktop-Agents      |               1.000–1.200 |
| PiRogue-Gerät(e) (optional)      | Wie lokaler Build                              |                   200–400 |
| Automatisierte Backups           | Inkl. Setup-Skripts                            |                   144–264 |
| Laufende Wartung (1 Jahr)        | Geschätzter Zeitaufwand                        |               2.880–4.320 |
| Druckmaterialien & Beschilderung | Anleitungen, Aufkleber, Schilder               |                        80 |
| Verpflegung                      | Mittagessen, Snacks, Getränke                  |                   200–300 |
| Reisekosten                      | Für Moderator:innen & Equipment                |                   100–200 |
| Dekoration                       | Beleuchtung, Wimpel, Buttons                   |                        50 |
| Puffer                           | Immer sinnvoll                                 |                       100 |
| **GESAMT (ca.)**                 |                                                |       **6.774 – 9.034 €** |

[Kostenschätzung Cloud-Lösung enthalten](/docs/lab/costs-cloud.md).

Diese Tagesveranstaltung erfordert Cloud-erfahrenes Personal, was die Kosten erhöht. Wir bereiten die Lösung in einem Repo vor, aber Cloud-Setup und -Wartung benötigen geschultes Personal. Für Frauenhäuser, die vollständige Privatsphäre, Internetunabhängigkeit und physische Systemkontrolle bevorzugen, ist Option A die bessere [Wahl](/docs/lab/architectures.md).

## Das erhalten Sie

* Funktionierendes SIEM-Lab (Wazuh, Kibana, Log-Monitoring)
* Installiertes PiRogue-Kit für Gerätechecks
* Geschultes Personal in digitaler Forensik und Bedrohungserkennung
* Druckbare Anleitungen für die Arbeit mit Überlebenden
* Einen lebendigen, teamorientierten Tag, der sich nicht wie Schulung anfühlt

## Einsparmöglichkeiten

* Vorhandene Hardware wiederverwenden (alter Laptop/Server)
* Gespendete Raspberry Pis von lokalen Tech-Gruppen anfragen
* Freiwillige oder interne Tech-Expert:innen als Co-Moderator:innen
* Gemeinsame Verpflegung mit anderen Veranstaltungen
