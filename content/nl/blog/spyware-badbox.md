---
title: "BadBox en de harde waarheid over het vervangen van apparaten"
date: 2025-07-28
author: PowerOn
translationKey: "badbox-effects"
tags: ["spyware", "beveiliging-leveringsketen", "apparaatvervanging", "veilige-apparaten", "play-protect"]
description: "BadBox laat zien dat sommige apparaten al gecompromitteerd zijn voordat je ze aanzet. Dit betekent het voor het vervangen van apparaten."
---

Je gooit een verdachte oude tablet weg, koopt een glanzende "nieuwe" Android-telefoon en haalt opgelucht adem. Probleem opgelost.

Behalve dat dit niet zo is.

[Ontmoet BadBox](https://www.humansecurity.com/learn/blog/satori-threat-intelligence-disruption-badbox-2-0/) - de vrolijke codenaam voor een uitgebreide cyber-spionageoperatie die malware rechtstreeks in Android-apparaten bouwt *voordat ze de fabriek verlaten*. Dit zijn geen verdachte koopjes van de markt. Velen worden verkocht via vertrouwde online winkels en grote platforms. Duizenden zijn al in Europa aangekomen, meestal als "budget" tablets, telefoons of streamingboxen.

## Waarom BadBox relevant is voor apparaatvervanging

De malware, vriendelijk bekend als **Guerrilla**, zit diep in de firmware - onder het niveau waar de meeste mensen (of antivirussoftware) het kunnen zien. Het kan stilletjes apps installeren, gebruikers bespioneren, gerichte phishing uitvoeren of je apparaat volledig aan iemand anders verhuren. Het is modulair, dus er kunnen op elk moment meer functies worden toegevoegd.

BadBox is niet één malware maar een volledig crimineel ecosysteem. Het wordt gerund door verschillende onderling verbonden groepen - waaronder SalesTracker, MoYu, Lemon en LongTV - die het werk onderling hebben verdeeld. Sommigen beheren de command-and-control-infrastructuur, anderen ontwikkelen de firmware-backdoor zelf, terwijl weer anderen geïnfecteerde apparaten monetariseren via advertentie-fraude, residentiële proxynetwerken en geautomatiseerde oplichting. Wat hen verenigt is dat de malware is ingebakken voordat het apparaat de gebruiker bereikt, wat betekent dat de compromittering begint op het moment dat je de doos opent.

Tot nu toe was geld de belangrijkste drijfveer, niet surveillance-for-hire. De meeste BadBox-infecties worden gebruikt voor klikfraude, nep-advertentieweergaven en het verkopen van anoniem netwerkverkeer aan andere actoren. Maar de architectuur is modulair en de betrokken groepen hebben een bewezen gewoonte om mogelijkheden te verhuren of te verkopen. Met andere woorden: als iemand dit platform wilde aanpassen voor stalking, gerichte spionage of datadiefstal, zouden ze dat kunnen - zonder het wiel opnieuw uit te vinden.

Daarom is BadBox belangrijk voor apparaatvervanging. Deze groepen voeren momenteel geen directe stalkerware aanvallen uit; maar de infrastructuur en technieken liggen al klaar, en de verkeerde koper kan ze van de ene op de andere dag als wapen inzetten. Wanneer je vervangende telefoon, tablet of tv-box al als bot, baken of datasifon kan fungeren voordat je zelfs maar inlogt, betekent "nieuw" niet automatisch "veilig".

Een fabrieksreset helpt niet. Antivirus helpt niet. En het uitzetten en weer aanzetten verdrijft de spoken niet.

## Wat dit betekent voor slachtoffers

Voor slachtoffers van partnergeweld verandert dit het veiligheidsplan. Bij *PowerOn* zeggen we: *bij twijfel, vervang het apparaat*. Dat geldt nog steeds, maar met een waarschuwing: **Als het vervangende apparaat uit een niet-vertrouwde bron komt, kan het erger zijn dan het origineel.**

BadBox verandert de aannames:

- Een verzegelde doos is geen bewijs van veiligheid  
- Lage kosten zijn geen groen licht voor delen  
- Een apparaat dat vandaag normaal werkt, kan je morgen verraden

Een met BadBox geïnfecteerd apparaat kan weken of maanden stil blijven voordat het activeert, update of begint te werken voor iemand die *echt* je gegevens wil.

Ja, ze kunnen zo goedkoop zijn als €20. Ja, dat is verleidelijk. Maar privacy en autonomie zijn meer waard.

### Praktische stappen voor slachtoffers

- Gebruik apparaten van vertrouwde, verifieerbare bronnen  
- Kies indien mogelijk modellen waarvan bekend is dat ze schoon zijn (zie tabel hieronder)  
- Meld je niet aan op gevoelige accounts op onbekende of geschonken apparaten  
- Houd hoogrisico- en laagrisico-activiteiten gescheiden op verschillende apparaten als je er meer dan één hebt

## Reactie van opvangcentra

Opvangcentra staan voor twee verbonden uitdagingen: voorkomen dat gecompromitteerde apparaten binnenkomen, en detecteren welke er toch doorheen glippen.

### Preventie

- Volg de herkomst van gedoneerde of gekochte apparaten en controleer firmwareversies  
- Overweeg voor gedeeld gebruik Linux-laptops of gereviseerde Chromebooks met Linux in plaats van goedkope Android-apparaten  
- Zorg voor een veilig onboardingstation om apparaten te controleren en voor te bereiden voor gebruik  

### BadBox intake-checklist

**Doel:** Zorg dat alle binnenkomende Android-apparaten worden gescreend op BadBox-risico voordat ze in het opvangcentrum worden gebruikt.

**1. Basisgegevens vastleggen**
- Apparaattype (telefoon, tablet, tv-box, projector, auto-eenheid, anders)
- Merk en modelnummer
- Serienummer / IMEI
- Bron (donatie, aankoop, anders)
- Ontvangstdatum

**2. Eerste visuele en verpakkingcontrole**
- Verzegelde retailverpakking? Ja / Nee  
- Tekenen van manipulatie? Ja / Nee  
- Ongebruikelijk of generiek merk? Ja / Nee  

**3. Risicocategorie**
- Bekend schoon model? (Controleer interne veilige lijst van het opvangcentrum) Ja / Nee  
- Bekend riskant/off-brand model? Ja / Nee  
- Onbekend? (Behandel als hoog risico)  

**4. Firmware- en Play Protect-controle**
- Zet aan en sla accountinstellingen over  
- Controleer Play Protect-certificering (Instellingen → Info → Google Play-systeemupdate of Play Store → Instellingen)  
- Noteer firmwareversie  
- Vergelijk met veilige lijst

**5. Netwerkgedragstest**
- Verbind met geïsoleerd onboarding Wi-Fi (niet het productienetwerk)  
- Monitor met PiRogue, Zeek of Suricata gedurende 15-30 minuten  
- Let op ongebruikelijke uitgaande verbindingen of DNS-query's

**6. Beslissing**
- **Geslaagd** → Voeg toe aan inventaris met veilig label  
- **Gefaald** → In quarantaine plaatsen of verantwoord recyclen  
- **Onzeker** → Houd offline, escaleren naar technische ondersteuning

*(Bewaar ondertekende kopieën voor elk apparaat. Bewaar resultaten in apparaatlogboek van het opvangcentrum.)*

### Detectie

BadBox kan gedeeltelijk worden gedetecteerd, maar niet op firmwareniveau, en alleen als het al actief is op het netwerk of besturingssysteem.

Met een [SIEM-stack (Wazuh + Zeek + Suricata + Sysmon + optioneel PiRogue)](docs/lab/on-prem/), is detectie mogelijk via:

- Netwerkniveau-indicatoren zoals verbindingen met command-and-controlservers, shady domeinen of malware-leveringspunten  
- Suricata-waarschuwingen voor bekende BadBox-infrastructuur  
- Zeek-logs die herhaalde beaconing-patronen of verdachte DNS-query's tonen

Let op: command-and-control-infrastructuur verandert vaak. Detectie hangt af van het up-to-date houden van threat intelligence-feeds.

## Wanneer vervangen, en hoe

Vervang wanneer:

- Een apparaat duidelijk gecompromitteerd is  
- Stalkerware niet kan worden verwijderd  
- De persoon die het gebruikt zich niet langer veilig voelt  
- Doorgebruik juridische risico's met zich meebrengt

Vervanging is alleen veilig als het vervangende apparaat zelf vertrouwd kan worden.

Verkrijg apparaten via:

- Bekende winkels met goed retourbeleid  
- Gecertificeerde refurbishers die op firmwareniveau resetten  
- Organisaties die privacyrespecterende besturingssystemen vooraf installeren  

Of kies, als budget het toelaat, voor nieuwe telefoons van grote merken met vergrendelde bootloaders en geen bekende BadBox-gevallen.

| Apparaattype                                                     | BadBox-risico    | Notities                                             |
|------------------------------------------------------------------|------------------|------------------------------------------------------|
| Pixel-telefoons (Play Protect gecertificeerd)                    | ✅ Laag           | Geen bekende BadBox-gevallen in onderzoek            |
| Topklasse Android-telefoons van Samsung, OnePlus, etc.           | ✅ Laag tot matig | Moet Play Protect gecertificeerd zijn                |
| Off-brand Android-telefoons of "gereviseerde" generieke modellen | ❌ Hoog           | Veel bevestigde infecties                            |
| Android TV-boxen, tablets, projectoren, auto-eenheden            | ❌ Zeer hoog      | Meerdere modellen gecompromitteerd op firmwareniveau |
| iPhones / Apple-apparaten                                        | ✅ N.v.t.         | Volledig ander ecosysteem                            |

## Laatste gedachten

BadBox is niet alleen een leveringsketenfout. Het is een herinnering dat vertrouwen op de verpakking niet genoeg is. Aanvallers denken vooruit; dat moeten wij ook.

Een apparaat vervangen is nog steeds een cruciale stap om controle terug te krijgen. Nu weten we alleen dat sommige dozen al vooraf verloren zijn.
