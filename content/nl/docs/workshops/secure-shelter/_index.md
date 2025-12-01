---
title: "Beveilig het opvanghuis build-a-thon"
linkTitle: "Beveilig het opvanghuis build-a-thon"
weight: 2
_build:
  render: always
description: "Een vrolijke, techniek-positieve, handen-uit-de-mouwen build-a-thon voor opvangmedewerkers. Geen preken, geen doemscrollen, gewoon teamwork, gadgets en gezond respect voor getemd gedoe."
menu:
  sidebar:
    weight: 10
    identifier: "nl-secure-shelter"
    parent: "nl-docs"
translationKey: "secure-shelter"
---

## Overzicht

* Naam: Secure the Shelter  
* Type: Praktische workshop lab-opbouw  
* Doelgroep: Opvangmedewerkers, digitale vrijwilligers en nieuwsgierige mensen die een USB kunnen insteken  
* Duur: Één lange dag (6–8 uur) of twee halve dagen (aanbevolen)  
* Resultaat: Volledig functioneel Wazuh + Pirogue veiligheidslab  

## Doelen

* Werkende Wazuh SIEM-installatie opzetten  
* Pirogue/Pithon op opstartbare USB of Raspberry Pi installeren  
* Echte apparaten aansluiten, logs genereren, nepbedreigingen detecteren  
* Gezamenlijk "eerste hulp"-proces voor techproblemen maken  
* Zelfvertrouwen en samenwerking bevorderen via plezier, niet angst  

## Voorbereidingschecklist

| Wat                     | Notities                                                                 |
|-------------------------|--------------------------------------------------------------------------|
| USB-sticks (minstens 3) | Vooraf geladen met setup.sh, configuratiebestanden, tools                |
| Host-laptop of server   | Voor Wazuh-installatie – cloud-VM, mini-server of krachtige laptop       |
| Internettoegang         | Voor installatie en downloads                                            |
| Projector               | Voor live demonstraties                                                  |
| Spiekbriefjes           | Geprint en gelamineerd – "wat in te typen", "wat niet aan te raken" etc. |
| Stickers, badges        | Log Monster, Kernel Gremlin, Alarm Wasbeer... je snapt het wel           |
| Snacks & koffie         | Je installeert een SIEM, geen overlevingstraining                        |

## Fase 1: Kies je setup (a.k.a. Kies je beest)

*"Wat wordt het brein van onze digitale vesting?"*

### Opties:

* Wazuh-server in de cloud opzetten (DigitalOcean, Hetzner, etc.)  
* Wazuh installeren op reserve-laptop of mini-PC  
* Raspberry Pi 4 gebruiken (voor gevorderden)  

### Activiteiten:

* Teams kiezen hun host-machine en geven het een naam (codenaamsuggesties beschikbaar!)  
* `setup.sh` uitvoeren en installatiewizard volgen  
* Vieren wanneer Kibana opent (met overwinningsdans of koekje)  

Tip: Elk team krijgt een opstartmap op USB met:  

* Voorbereid `setup.sh`  
* Standaard firewall-regels  
* Teamvlag (letterlijk, papieren vlag)  

## Fase 2: Agenten in het wild (a.k.a. Wazuh ontketend)

*"Laten we dit ding leren problemen te ruiken."*

### Doelen:

* 1–2 apparaten (Windows/macOS test-laptops of VM's) verbinden  
* Logs triggeren en alerts live bekijken  

### Activiteiten:

* Wazuh-agent installeren op testmachine  
* Normaal en "verdacht" gedrag simuleren: nieuwe accounts, onbekende apps, rare USB-gebruik  
* Nep-signaturen gebruiken om stalkerware te simuleren  

Mini-uitdaging:  

* Wie krijgt de eerste "kritieke" alert?  
* Optioneel: "Meest bizarre alert-uitleg"-wedstrijd  

Leermomenten:  

* "Wat zegt dit log überhaupt?"  
* "Hoe weet je of het gewoon Windows is die raar doet?"  

## Fase 3: Aansluiten, opstarten, scannen (a.k.a. Pirogue & spelen)

*"Nu gaan we vissen, naar spyware."*

### Doelen:

* Pirogue-USB of Raspberry Pi voorbereiden  
* Opstarten en Android-testapparaat of USB scannen  

### Activiteiten:

* Elk team flasht Pirogue naar USB (of start Pi)  
* Aansluiten op testtelefoons met USB-C/OTG-adapters  
* Rapport genereren: wat is normaal, wat is raar?  

Optioneel spel:  
* Eén telefoon heeft "mysterieuze spyware" (eigenlijk test-apps)  
* Kan je team het identificeren zonder in paniek te raken?  

Pro-tips:  
* Print een verklarende woordenlijst van eng klinkende maar onschuldige app-namen  
* Notities aanmoedigen: "Raar maar veilig", "Later checken", etc.  

## Fase 4: Logfeest (a.k.a. Show & tell)

*"Want als je een vesting bouwt en het niemand vertelt, wat is dan het punt?"*

### Activiteiten:

* Elk team presenteert setup: codenaam, agenten, leerpunten  
* Open podium voor "coolste alert", "raarste log", "grootste verrassing"  
* Gezamenlijk de Opvang Tech Triage Sheet opstellen:  

  * "Als iemand zegt dat hun telefoon raar doet..."  
  * "Als we een ernstig uitziende alert zien..."  
  * "Als we twijfelen, doen we dit..."  

Resultaten:  

* Geprint spiekbriefje (gelamineerd ideaal)  
* Eerste hulp-procedure aan de muur  
* Inloggegevens ingesteld  
* USB-sticks uitgedeeld voor toekomstig gebruik  

Afsluiting: Stickers, Log Monster doopceremonie, teamfoto's met servernamen  

## Naslagmaterialen

| Materiaal                  | Beschrijving                              |
|----------------------------|-------------------------------------------|
| Techniek-spiekbrief        | Stapsgewijs: Wazuh, Pirogue, triage       |
| USB-kit                    | Tools, scripts, PDF-gidsen                |
| Triage-checklist           | Wat te doen bij onveilig gevoel           |
| Werkend SIEM + triage-tool | Met aangesloten apparaten en actieve logs |
| Opscheprechten             | Verdiend, niet gekregen                   |

---

## Optionele vervolgacties

* Maandelijkse remote check-in: "Wat is er nieuw in de logs?"  
* Tech-maatjessysteem: koppel medewerkers aan vrijwilligers  
* Nodig juridische ondersteuning uit voor gezamenlijke planning  

## Ondersteuning en materialen voor het evenement