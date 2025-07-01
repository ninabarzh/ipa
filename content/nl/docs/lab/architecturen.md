---
title: "Architecturen"
weight: 1
translationKey: "architectures"
_build:
  render: always
menu:
  sidebar:
    weight: 5
description: "Aanbevolen architecturen voor SIEM-stackimplementatie, afgestemd op organisatorische contexten en middelen. Allemaal ontworpen voor forensische datacollectie, threat detection en incident response, met bescherming van privacy en wettelijke compliance. Aanpasbaar voor opvangcentra, hulpverlenersnetwerken of gedecentraliseerde community-implementaties."
---

## Opvanggerichte on-premise implementatie (Low-tech, all-in-one)

Ideaal voor: Opvangcentra met betrouwbaar intern netwerk en technisch aanspreekpunt.

* Perfect voor kleine opvang zonder IT-team
* Werkt offline of semi-verbonden
* Logimport via USB mogelijk bij internetrisico

Architectuur: Single-VM lokale implementatie

```text
+---------------------------+             +---------------------------+
|     Opvanglaptop          |             |    Optionele PiRogue      |
|  (Ubuntu VM of host OS)   |             |  (Veldanalyse-apparaat)   |
|---------------------------|             |---------------------------|
| - Wazuh Manager           |             | - PiRogue OS              |
| - Elasticsearch           |             | - Packet capture tools    |
| - Kibana                  |             | - USB-logimport           |
| - setup.sh automatisering |             +---------------------------+
+---------------------------+                       |
        |                                           |
        | Beveiligd LAN / USB-import                |
        v                                           v
+---------------------------+            +----------------------------+
| Slachtofferapparaten      |            |  Veldapparaten (bijv.      |
| (Windows/macOS/Android)   |            |  verdachte telefoon)       |
+---------------------------+            +----------------------------+
```

* Fysieke of virtuele IPA-SIEM-server ter plaatse
  * Draait Wazuh Manager, Elasticsearch en Kibana
  * Bevat geautomatiseerde scripts (o.a. `quarantine_device.sh`)
* Wazuh-agents geïnstalleerd op:
  * Windows/macOS-apparaten (direct of via USB)
  * Android (via Termux op geroote toestellen)
  * iOS (gejailbreakt of offline backups)
* Intern netwerk voor veilige logoverdracht
* Optioneel beveiligd PiRogue-apparaat voor lokale analyse

Voordelen: Data blijft lokaal; sterke privacy; Nadelen: Vereist lokale technische kennis

## Private cloud-implementatie (Opvang/NGO-beheerd)

Ideaal voor: Organisaties met meerdere locaties.

* Externe toegang voor multilocatie-organisaties
* Vereist sterke VPN/versleutelde backups
* Lager lokaal risico, hogere opsec-discipline

Architectuur: Beveiligde cloud-SIEM (bijv. Hetzner)

```text
+---------------------------------+
|     Versleutelde cloud-VM       |
|---------------------------------|
| - Wazuh Manager                 |
| - Elasticsearch                 |
| - Kibana                        |
| - HTTPS-toegang (VPN optioneel) |
+---------------------------------+
        |
        | Versleutelde logoverdracht
        v
+---------------------------------+
| Slachtofferapparaten wereldwijd |
| (via Wazuh-agent/ADB/iTunes)    |
+---------------------------------+
```

* Cloud-VM (bijv. Hetzner) met:
  * Wazuh + Elasticsearch + Kibana-stack
  * Versleutelde VPN-toegang
* Apparaten verbinden via beveiligde tunnel (WireGuard)
* Logs lokaal geanonimiseerd voor overdracht

Voordelen: Centraal overzicht; Nadelen: Cloudkennis vereist

## Draagbaar analyse-lab (Offline-first)

Ideaal voor: Spoedeisende hulp, mobiele ondersteuning.

* Geen internet nodig
* Data wisbaar na export
* Compacte setup

Architectuur: Draagbare "Go Bag"-SIEM (Raspberry Pi of laptop)

```text
+--------------------------------+
|   Draagbaar analyse-apparaat   |
| (Linux-laptop of Pi 4)         |
|--------------------------------|
| - Wazuh Manager                |
| - Kibana (alleen lokaal)       |
| - setup.sh draagbare modus     |
+--------------------------------+
        |
        | USB/Wi-Fi logoverdracht
        v
+--------------------------------+
|  Slachtofferapparaat (offline) |
+--------------------------------+
```

* Robuuste laptop of Pi-workstation met:
  * Voorgeïnstalleerde SIEM-stack
  * Luchtdichte beveiliging
* USB-tools voor dataverzameling
* Rapporten tijdelijk op versleutelde schijf
* Handmatige sync mogelijk

Voordelen: Internetonafhankelijk; Nadelen: Beperkte opslag

## Gedecentraliseerde hulpverlenersnodes

Ideaal voor: Netwerken van kleine organisaties.

* Meerdere opvanglocaties delen anonieme data
* Centrale ondersteuning voor triage
* Werkt optimaal met technische partner

Architectuur: Gedistribueerde setup

```text
+--------------------------+     +--------------------------+
|  Opvanglocatie A         |     |  Opvanglocatie B         |
|--------------------------|     |--------------------------|
| - Wazuh-agent/collector  | --> | - Wazuh-agent/collector  |
+--------------------------+     +--------------------------+
         \                           /
          \                         /
           v                       v
           +---------------------------+
           |  Centrale SIEM-analist-VM |
           |---------------------------|
           | - Wazuh Manager           |
           | - Elasticsearch + Kibana  |
           +---------------------------+
```

* Lichtgewicht SIEM-nodes (Raspberry Pi 5) per hulpverlener
* Elke node verwerkt:
  * 1-2 apparaten tegelijk
  * Real-time analyse met vooraf ingestelde regels
* Periodieke sync met centrale node

Voordelen: Kosteneffectief, veerkrachtig; Nadelen: Minder centraal overzicht

## Hybride gemeenschapsnetwerk

Ideaal voor: Grote samenwerkingsverbanden.

* Voor training of juridische ondersteuning
* Gebruik van nagebootste stalkerware-sporen
* Volledig geïsoleerde sandbox-omgeving

Architectuur: Trainings-/onderzoeksomgeving

```text
+------------------------------+
|      Onderzoeks-VM(s)        |
|------------------------------|
| - Wazuh Manager              |
| - Geïnfecteerde VM-images    |
| - Log-replay functionaliteit |
+------------------------------+
        |
        | Export van schone bewijslast
        v
+------------------------------+
| Archief / Juridisch bewijs   |
+------------------------------+
```

* Gelaagd systeem met:
  * Centrale cloud-SIEM voor coördinatie
  * Veldunits met vooraf geconfigureerde scripts
  * Webinterface voor handmatige logupload

Voordelen: Combineert het beste van beide werelden - centrale beveiliging met lokale actie;  
Nadelen: Vereist goede coördinatie en toegangscontroles tussen lagen

## Ontwerpoverwegingen

* **Gegevensbescherming**: Gebruik volledige schijfversleuteling op alle nodes. Logs moeten standaard geanonimiseerd worden tenzij expliciete toestemming is verkregen.
* **Audittrails**: Alle forensische acties moeten onveranderlijke logs genereren voor juridische toelaatbaarheid.
* **Updates**: Scriptgebaseerde updates (bijv. via Git of USB-sync) moeten regelmatig worden uitgevoerd om detectienauwkeurigheid te behouden.
* **Bedreigingshandtekeningen**: Gedeelde, bijgewerkte regelpakketten voor IPA-bewakingspatronen (bijv. "Rekenmachine+" malware, SIM-spoofing logs).
