---
title: "Kostenschätzung für ein schutzraumbasiertes Sicherheitssystem"
weight: 5
translationKey: "on-prem-costs"
_build:
  render: always
menu:
  sidebar:
    weight: 25
description: "Auf der Rückseite eines Briefumschlags."
---

## Schutzraum-Server (Ubuntu 22.04)

* Wiederaufbereiteter Desktop oder Mini-PC

  * Spezifikationen: ≥8 GB RAM, 4+ CPU-Kerne, 100+ GB SSD
  * Kosten: €350–€585

* Optionale Upgrades:

  * RAM (insgesamt 16 GB): +€60
  * SSD (500 GB): +€70

Zwischensumme Hardware: €350–€585 (plus €130 für Upgrades)

## Netzwerk & Speicher

* Unmanaged Switch (8 Ports): €35  
* Verkabelung und WLAN-Access Point: €25  
* USB-Festplatte (1 TB): €60

Zwischensumme Netzwerk: €120

## Optionale PiRogue-Scanner (Raspberry Pi)

* Raspberry Pi 4 (4 GB Kit): €95  
* WLAN-USB-Adapter / Extras: €25

Zwischensumme PiRogue: €120

## Software & Tools (kostenlos)

* Ubuntu, Wazuh, Elasticsearch, Termux, adb, OpenSSH, idevice tools — €0

## Arbeitsaufwand & Einrichtung

* Bei bezahltem Personal (ca. €45/Stunde): Einrichtung & Tests (12 Std): €540  
* Bei Freiwilligen: €0

### Wartung & Puffer

* Jährlicher Hardware-/Softwarepuffer: €120  
* Jährlicher Personalaufwand (ca. 10 Std): €450  
* Rücklage (10 %): ca. €65–€160

## Zusammenfassung Jahr 1

| Kategorie           | Niedrig (Freiwillig) |  Hoch (Bezahlt + Extras) |
|---------------------|---------------------:|-------------------------:|
| Server-Hardware     |                 €350 |                     €715 |
| Netzwerk & Speicher |                 €120 |                     €120 |
| PiRogue (optional)  |                   €0 |                     €330 |
| Software            |                   €0 |                       €0 |
| Einrichtung         |                   €0 |                     €540 |
| Wartung & Puffer    |                 €120 |                     €160 |
| **Gesamt (ca.)**    |             **€590** |               **€1.865** |

## Laufende Kosten ab Jahr 2 (geschätzt)

| Posten                 | Jährliche Kosten |
|------------------------|-----------------:|
| Hardware-Puffer        |             €120 |
| Bezahlte Unterstützung |             €450 |
| **Jahresgesamt**       |         **€570** |

## Hinweise

* Die Mindestkosten (ca. €590) setzen Freiwilligenzeit und gespendete Geräte voraus.  
* Die Vollkosten (ca. €1.655) beinhalten Upgrades, PiRogue und bezahlte Arbeitszeit.  
* Internet, physische Schlösser und Stromkosten sind nicht enthalten.  
* Bei mehreren Standorten können gemeinsame Dienste (wie ein zentrales SIEM) die Kosten pro Standort deutlich senken.
