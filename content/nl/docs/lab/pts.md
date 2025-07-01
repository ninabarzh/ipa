---
title: "Handleiding voor het opzetten van een PiRogue toolkit om stalkerware te detecteren"
weight: 3
translationKey: "pts"
_build:
  render: always
menu:
  sidebar:
    weight: 15
description: "Deze stapsgewijze handleiding is bedoeld voor opvangmedewerkers zonder technische achtergrond. Het helpt u een eenvoudig apparaat op te zetten dat computers en telefoons kan controleren op verborgen trackingsoftware die door daders wordt gebruikt."
---

## Wat u nodig heeft

Verzamel vooraf deze items (allemaal verkrijgbaar bij de meeste elektronica winkels):

1. [Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) (2GB RAM is voldoende)  
2. Officiële voeding (micro-USB)  
3. 32GB micro SD-kaart (Klasse 10 snelheid)  
4. Ethernetkabel (een eenvoudige is voldoende)  
5. Een extra monitor/TV met HDMI-aansluiting (voor initiële setup)  

*Budgetnotitie: Sommige organisaties zoals WESNET in Australië bieden kortingskits aan – check lokale netwerken voor huiselijk geweld.*

## Stap 1: Voorbereiding van de PiRogue software  

### Downloaden van het systeem  

1. Ga op een computer naar de [officiële PiRogue website](https://pts-project.org)  
2. Klik op "Downloads" en kies de nieuwste versie voor Raspberry Pi 4   
3. Sla het bestand op (eindigend op `.img.xz`) – dit bevat het volledige besturingssysteem  

### Flashen van de SD-kaart

1. Installeer **Balena Etcher** (gratis software) van [etcher.io](https://www.balena.io/etcher/)  
2. Steek uw micro SD-kaart in de computer (gebruik een adapter indien nodig)  
3. Open Etcher, selecteer het gedownloade PiRogue image, kies uw SD-kaart en klik op "Flash!"  
4. Wacht tot "Flash Complete" verschijnt (ongeveer 10 minuten)

## Stap 2: Hardware opzetten  

1. **Plaats de SD-kaart** in de sleuf van de Raspberry Pi (onderaan)  
2. **Sluit de Ethernetkabel** aan van uw Pi naar de router van het opvanghuis  
3. **Sluit HDMI aan** op een monitor/TV  
4. **Sluit als laatste de voeding aan** – de Pi start automatisch op  

*Eerste opstarttip:* Het systeem heeft ongeveer 5 minuten nodig om op te starten. Een regenboogscherm is normaal in het begin.

## Stap 3: Initiële configuratie  

1. Log bij prompt in met:  
   - Gebruikersnaam: `pi`  
   - Wachtwoord: `raspberry` (u wijzigt dit later)  

2. Volg de scherminstructies om:  
   - Een nieuw veilig wachtwoord in te stellen (bewaar dit op een veilige plek)  
   - Uw tijdzone te bevestigen (belangrijk voor nauwkeurige logs)  
   - Niet-supergebruikers verkeer te laten vastleggen (typ "Y" en druk op Enter)   

3. Het systeem update zichzelf – wacht tot het herstart (ongeveer 15 minuten)

## Stap 4: Apparaten aansluiten voor controle  

### Voor telefoons

1. Noteer op het scherm van de PiRogue de WiFi-netwerknaam (bijv. "PiRogue-123") en wachtwoord  
2. Op de telefoon van de overlever:  
   - Ga naar WiFi-instellingen  
   - Verbind met het PiRogue-netwerk (negeer "geen internet" waarschuwingen)  
   - Gebruik de telefoon normaal voor 5 minuten – de PiRogue analyseert verkeer op de achtergrond   

### Voor computers

1. Verbind de computer met de PiRogue via Ethernetkabel  
2. Open een browser en ga naar: `https://pirogue.local/dashboard`  
   - Gebruikersnaam: `admin`  
   - Wachtwoord: Check het PiRogue-scherm voor het automatisch gegenereerde wachtwoord

## Stap 5: Resultaten lezen  

Het dashboard toont eenvoudige verkeerslichten:

- **Groen:** Geen stalkerware gedetecteerd  
- **Geel:** Verdachte activiteit (bijv. onbekende locatietracking)  
- **Rood:** Bevestigde stalkerware (bijv. Cerberus, FlexiSpy)   

*Wat te doen bij rood:*

1. Noteer de getoonde malwarenaam  
2. Verbreek direct de verbinding  
3. Neem contact op met uw lokale tech-veiligheids partner (lijst op [stopstalkerware.org](https://stopstalkerware.org/resources/#find-support))

## Veiligheid en onderhoud  

1. **Na elk gebruik:**  
   - Schakel de PiRogue correct uit (typ `sudo shutdown now` op het scherm)  
   - Wis de SD-kaart, bijvoorbeeld met DiskGenius op Windows: Formatteren van een SD-kaart verwijdert alleen bestandsverwijzingen – data kan nog worden hersteld met tools zoals PhotoRec 7. Wissen overschrijft de data, waardoor het onherstelbaar wordt. Dit is cruciaal voor:
      - Verwijderen van sporen van stalkerware of malware.
      - Beschermen van privacy bij hergebruik van kaarten.
      - Zorgen van schone setups voor PiRogue’s forensische tools.
   - Verifieer de kaart na wissen: Steek hem opnieuw in → Controleer of hij als "leeg" wordt weergegeven in Verkenner.

2. **Maandelijkse controles:**  
   - Flash de SD-kaart opnieuw met de nieuwste PiRogue versie (updates bevatten nieuwe detectieregels)   

3. **Voor gevoelige gevallen:**  
   - Gebruik in een aparte ruimte van de leefruimtes van overlevers  
   - Documenteer bevindingen voor juridisch bewijs (maak screenshots van het dashboard)

## Hulp krijgen  

- Sluit u aan bij PiRogue’s **Discord server** (https://discord.gg/pts-project) voor realtime ondersteuning  
- EU Tech Veiligheidshulplijn: https://www.accessnow.org/help/ *(24/7 ondersteuning in meerdere talen)*
- UK-opvanghuizen kunnen **Women's Aid** tech veiligheidskliniek bellen (+44 0808 802 0300)   
- Bij direct gevaar, prioriteer altijd fysieke veiligheid boven digitale controles

## Notities

Deze setup kost minder dan een uur en minder dan €80. Het is een krachtige manier om overlevers te helpen hun digitale veiligheid terug te krijgen.

Deze tool vervangt geen professionele forensische analyse, maar is een goede eerste check wanneer overlevers apparaten meenemen naar uw opvang. De hele setup duurt ongeveer 45 minuten en kost minder dan €70 – een kleine prijs om iemands digitale privacy te herstellen.
