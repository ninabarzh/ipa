---
title: "Kostenraming voor een beveiligingssysteem in een opvanglocatie"
weight: 5
translationKey: "on-prem-costs"
_build:
  render: always
menu:
  sidebar:
    weight: 25
description: "Achterkant van een envelopje."
---

## Server voor de opvanglocatie (Ubuntu 22.04)

* Gereviseerde desktop of mini-pc

  * Specificaties: ≥8 GB RAM, 4+ CPU-cores, 100+ GB SSD  
  * Kosten: €350–€585

* Optionele upgrades:

  * RAM (totaal 16 GB): +€60  
  * SSD (500 GB): +€70

Subtotaal hardware: €350–€585 (plus €130 voor upgrades)

## Netwerk en opslag

* Niet-beheerde switch (8-poorts): €35  
* Bekabeling en Wi‑Fi-accesspoint: €25  
* USB-HDD (1 TB): €60

Subtotaal netwerk: €120

## Optionele PiRogue-scanner (Raspberry Pi)

* Raspberry Pi 4 (4 GB-kit): €95  
* Wi‑Fi USB-adapter / extra's: €25

Subtotaal PiRogue: €120

## Software en tools (gratis)

* Ubuntu, Wazuh, Elasticsearch, Termux, adb, OpenSSH, idevice-tools — €0

## Arbeid en installatie

* Bij betaald personeel (~€45/uur): installatie & testen (12 uur): €540  
* Bij vrijwilligers: €0

### Onderhoud & buffer

* Jaarlijkse hardware/softwarebuffer: €120  
* Jaarlijkse tijd personeel (~10 uur): €450  
* Onvoorzien (10%): ~€65–€160

## Samenvatting jaar 1

| Categorie           | Laag (Vrijwillig) |   Hoog (Betaald + Extra's) |
|---------------------|------------------:|---------------------------:|
| Serverhardware      |              €350 |                       €715 |
| Netwerk & opslag    |              €120 |                       €120 |
| PiRogue (optioneel) |                €0 |                       €330 |
| Software            |                €0 |                         €0 |
| Arbeid installatie  |                €0 |                       €540 |
| Onderhoud & buffer  |              €120 |                       €160 |
| **Totaal (±)**      |          **€590** |                 **€1.865** |

## Jaar 2+ jaarlijkse kosten (geschat)

| Onderdeel              | Jaarlijkse kosten |
|------------------------|------------------:|
| Hardwarebuffer         |              €120 |
| Betaalde ondersteuning |              €450 |
| **Totaal per jaar**    |          **€570** |

## Notities

* Minimale kosten (~€590) gaan uit van vrijwilligers en gedoneerde hardware.  
* Volledige kosten (~€1.655) omvatten upgrades, PiRogue en betaalde arbeid.  
* Internettoegang, fysieke sloten en stroomkosten zijn niet inbegrepen.  
* Bij meerdere locaties kunnen gedeelde diensten (zoals een centrale SIEM) de kosten per locatie flink verlagen.
