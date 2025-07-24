---
title: "Kostenraming: Beveilig het opvanghuis build-a-thon"
weight: 3
translationKey: "cost-guesstimate-shelter"
_build:
  render: always
menu:
  sidebar:
    weight: 15
description: "Gedetailleerde kostenraming voor een praktische workshopdag waar medewerkers een digitaal veiligheidslab (Wazuh + Pirogue) opzetten met begeleiding."
---

## Overzichtstabellen

### Optie A: On-site lab build-a-thon (lokaal, privé)

| **Post**                      | **Details**                                      | **Geschatte kosten (€)** |
|-------------------------------|--------------------------------------------------|-------------------------:|
| Begeleiders (2–3 personen)    | Digitale veiligheid & trauma-bewuste begeleiding |                800–1.200 |
| SIEM-stack                    | Serverhardware, setup, netwerk                   |                590–1.865 |
| PiRogue-appara(a)t(en) (opt.) | Raspberry Pi-netwerkmonitor                      |                  200–400 |
| USB-sticks/opslag             | Installatiesleutels, backup                      |                       60 |
| Drukwerk/signalering          | Handleidingen, stickers, bordjes                 |                       80 |
| Catering                      | Lunch, snacks, drankjes                          |                  200–300 |
| Reis/transport                | Voor begeleiders en apparatuur                   |                  100–200 |
| Decoratie                     | Verlichting, vlaggetjes, badges                  |                       50 |
| Reserve                       | Voor onvoorziene kosten                          |                      100 |
| **TOTAAL (ca.)**              |                                                  |      **2.180 – 4.155 €** |

[Kosten on-site oplossing inbegrepen](/docs/lab/costs.md).

PiRogue is optioneel maar handig voor offline telefoonscans.

### Optie B: Cloud-based build-a-thon

*Met beveiligde remote logging en doorlopend monitoring.*

| **Post**                   | **Details**                         | **Geschatte kosten (€)** |
|----------------------------|-------------------------------------|-------------------------:|
| Begeleiders (2–3 personen) | Gelijk aan lokaal model             |                800–1.200 |
| Cloudserver & setup        | Beveiliging, VPN, installatie       |              1.220–1.720 |
| Agent-installaties         | Android/iOS-loggingtools, PC-agents |              1.000–1.200 |
| PiRogue (opt.)             | Gelijk aan lokaal                   |                  200–400 |
| Geautomatiseerde backups   | Inclusief setup-scripts             |                  144–264 |
| Doorlopend onderhoud (1jr) | Geschatte tijdkosten                |              2.880–4.320 |
| Drukwerk                   | Handleidingen, stickers             |                       80 |
| Catering                   | Lunch, snacks                       |                  200–300 |
| Reis/transport             | Begeleiders en apparatuur           |                  100–200 |
| Decoratie                  | Verlichting, vlaggetjes             |                       50 |
| Reserve                    | Altijd verstandig                   |                      100 |
| **TOTAAL (ca.)**           |                                     |      **6.774 – 9.034 €** |

[Kosten cloudoplossing inbegrepen](/docs/lab/costs-cloud.md).

Vereist cloudvaardig personeel. Voor opvanghuizen die volledige privacy en fysieke controle prefereren, is Optie A beter ([keuze](/docs/lab/architectures.md)).

## Wat je krijgt

* Werkend SIEM-lab (Wazuh, Kibana)
* Geïnstalleerd PiRogue-kit voor checks
* Getraind personeel in digitale forensiek
* Afdrukbare handleidingen
* Dynamische, teamgerichte dag

## Bespaarmogelijkheden

* Hergebruik bestaande hardware
* Vraag gedoneerde Raspberry Pi's aan
* Vrijwilligers of interne tech-experts
* Gedeelde catering met andere events
