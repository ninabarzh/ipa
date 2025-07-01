---
title: "Kostenraming cloudbeveiligingssysteem"
weight: 7
translationKey: "cloud-costs"
_build:
  render: always
menu:
  sidebar:
    weight: 35
description: "Eigen infrastructuur brengt reële kosten met zich mee—vooral qua tijd en expertise."
---

## Privécloudserver

Uitgangspunt: middelgrote VPS bij Europese provider (bv. Hetzner, Netcup, 1984 Hosting).

* **Specificaties**: 4 vCPU, 8–16 GB RAM, 100 GB SSD, Ubuntu 22.04
* Maandkosten: **€15–€30**
* Jaarlijks: **~€300**

*Minimaal 8 GB RAM. SIEM-stacks zijn zwaar.*

## Basisbeveiliging

* Fail2ban, UFW, automatische updates = gratis
* Configuratietijd: 4u × €60/u = **€240**

## IPA-SIEM-installatie (Wazuh)

* Wazuh Manager, API, Elasticsearch, Kibana
* Software: **€0** (open source)
* Initiële configuratie: 1–2 dagen expert = **€500–€1.000**

*Technische vrijwilligers mogelijk—maar reserveer budget.*

## VPN (WireGuard/OpenVPN)

* Software: gratis
* Installatie: 3u = **€180**
* Onderhoud: sleutelrotatie, support

## Agentinstallatie

* Windows/macOS (10–20 toestellen):
  30 min/toestel → 10u totaal = **€600**

* Android/iOS-logverzameling:
  Handmatig of geautomatiseerd
  Kosten: **€400–€600**

## Optioneel: PiRogue-kit

* Hardware: ~€150 + verzending
* Installatie: 3u = **€180**

## Back-up & encryptie

* Gebruik server-SSD
* Extra opslag: €2/maand → **€24/jaar**
* Encryptietools: gratis
* Automatisering: 2–4u = **€120–€240**

## Doorlopend onderhoud

* Sleutelrotatie, logbeheer, alerts
* Maandelijks: 4–6u × €60 = **€240–€360/maand**
* Jaarlijks: **€2.880–€4.320**

## Reserves & training

* Onvoorzien: **€500**
* Interne training: **€300**

## Totaalkosten (Jaar 1)

| Onderdeel                 | Geschatte kosten (€) |
|---------------------------|---------------------:|
| Privécloudserver          |                 €300 |
| Basisbeveiliging          |                 €240 |
| SIEM-installatie          |          €500–€1.000 |
| VPN                       |                 €180 |
| Agents (10–20 toestellen) |                 €600 |
| Mobiele logcollectie      |            €400–€600 |
| PiRogue (optioneel)       |                 €330 |
| Back-ups                  |            €144–€264 |
| Onderhoud                 |        €2.880–€4.320 |
| Training & reserves       |                 €800 |
| **Totaal (Jaar 1)**       |    **€6.374–€8.634** |

## Jaarlijkse kosten (Jaar 2+)

* Server: €300/jaar
* Onderhoud: €3.000–€4.000
* Incidentele updates

**Schatting: ~€3.500–€4.500/jaar**

## Budgettips

* Kosten variëren per aantal toestellen
* Vrijwilligers besparen kosten maar vergen coördinatie
* Vergeet personeelstijd niet in subsidieaanvragen
* Systeem deelbaar tussen organisaties via VPN