---
title: "Eyezy: De schaduwwachter in je broekzak"
date: 2025-07-24
author: PowerOn
translationKey: "context-eyezy"
tags: ["spyware", "mobiele monitoring", "digitaal misbruik", "privacyrisico's", "veiligheid voor slachtoffers"]
description: "Onderzoek naar Eyezy's surveillantiemogelijkheden, hoe het kwetsbare gebruikers target en wat hulpverleners moeten weten om het te herkennen."
---

Eyezy is de vrolijke nieuwkomer in de stalkerware-wapenwedloop. Met een naam die klinkt als een emoji-startup of overenthousiast oogverzorgingsmerk, zou je het bijna onschuldig noemen. Maar laat je niet misleiden door het pastelkleurige design – Eyezy is surveillancesoftware met tanden, mascara of niet.

Het belooft "geruststelling", "totale controle" en "real-time updates" – wat in verkeerde handen meer bedreigend dan geruststellend is. En zoals traditie in dit genre, beweert het "voor ouders" te zijn.

## Wat Eyezy doet (en niet toegeeft)

Standaardaanbod: toegang tot sms'jes, oproeplijsten, gps-locatie, app-gebruik, browsegeschiedenis, sociale media-DM's, toetsaanslagen en zelfs verwijderde content. Kortom: het leest je leven als een roman en verkoopt de samenvatting door.

Zijn "Magic Alerts" laten de stalker – sorry, "bezorgde gebruiker" – meldingen krijgen bij bepaalde trefwoorden of wanneer het doel een geo-fence verlaat. Verkocht als hulpmiddel voor ouders. Natuurlijk zien "hij appte z'n ex weer" en "ze ging naar het vluchthuis" er in het systeem bijna identiek uit.

Eyezy draait onzichtbaar, zoals alle concurrenten. Geen icoontjes, geen waarschuwingen, geen ethiek. Het blijft verborgen met verontrustende precisie.

Installatie verschilt: Android vereist fysieke toegang. iOS leunt op iCloud-toegang. Geen jailbreak nodig – handig als "privacy schenden made easy" een verkooppunt is.

## Gemarkete onschuld, bewapende toegang

Eyezy is alle zachte randen en ouderlijke bezorgdheid. Zijn branding lijkt meer op digitale zelfhulp dan spionagetech. Geen waarschuwingen, geen melding van misbruikscenario's, laat staan vragen over wat het betekent om iemand stille toegang tot je privécommunicatie te geven.

Toch is dat precies wat het mogelijk maakt. Zijn businessmodel draait om heimelijke surveillance. De site heeft het over tieners; forums over partners.

Deze geloofwaardige ontkenning is het echte product. De software slechts het transportmiddel.

## Gevolgen voor slachtoffers

Eyezy is niet zo krachtig als FlexiSPY, maar daar gaat het niet om. Voor een slachtoffer kan zelfs basisinformatielekkage – berichten, locaties, zoekopdrachten – catastrofaal zijn. De illusie van veiligheid breekt bij één onverklaarbaar goed getimede app van de misbruiker.

Anders dan staatsspyware wordt Eyezy gekocht en geïnstalleerd door gewone mensen. Mensen die "vertrouwen" verwarren met "controle".

Slachtoffers merken misschien vreemd gedrag – snelle batterij-drainage, onverwachte herstarts, berichten die al gelezen zijn. Of simpelweg dat de dader te veel weet. Eyezy is een geest in de machine. En zoals alle geesten gaat het niet zomaar weg.

## De "ogen" uit Eyezy halen

Het kondigt zich niet aan. Het verzamelt stilletjes data. Detectie vereist vaak forensische analyse van geïnstalleerde apps, achtergrondprocessen of verdachte accountactiviteit. Op Android kunnen techneuten app-permissies inspecteren. Op iOS geven iCloud-toegangspatronen hints.

Verwijderen is lastig. Een fabrieksreset werkt, maar wist ook foto's, berichten, bewijs. En slachtoffers kunnen zelden zonder risico handelen. Vaak is apparaatvervanging of expertondersteuning in gecontroleerde omgevingen (zoals techlabs in opvangcentra) veiliger.

## Het ecosysteem van Eyezy

Eyezy leeft, net als mSpy en FlexiSPY, in een wettelijk vacuüm waar "monitoring" respectabel klinkt en "dwingende controle" een voetnoot is. Deze apps opereren waar wetten de realiteit niet bijbenen, en waar intentie als verdediging geldt – zelfs als het resultaat intimidatie en schade is.

Wat Eyezy biedt is niet slechts een tool, maar een narratief: dat surveillance verantwoordelijk, zorgzaam, zelfs noodzakelijk is. Het is deel van hetzelfde script dat partnerberichten lezen, locaties checken en wachtwoorden eisen normaliseert.

Dat script is kapot.

## Eyezy is niet het echte probleem

Eyezy is een symptoom, niet de ziekte. De ziekte is de aanname dat liefde via toegang bewezen moet worden, dat veiligheid controle betekent, en dat vertrouwen iets is wat je met apps afdwingt.

Voor opvangcentra is Eyezy een van vele namen om op te letten. Zijn aanwezigheid op apparaten moet serieus genomen worden. Zijn marketing cynisch gelezen. Zijn bestaan moet worden aangevochten – wettelijk, sociaal, technologisch.

Het goede nieuws? Anders dan de misbruiker laat Eyezy sporen na. En anders dan vertrouwen kun je software verwijderen.

## Voorbeeld SIEM-detectieregels voor Eyezy

**Eyezy** richt zich op **toetsaanslag‑registratie**, **socialmediasurveillance** en **schermopname**, vaak verborgen onder systeem‐achtige namen.

### Toetsaanslag‑registratie via toegankelijkheids‑ of input‑kaping

```json
{
  "rule": {
    "id": 100050,
    "level": 12,
    "description": "Eyezy‑stijl toetsaanslag‑logging via toegankelijkheids‑kaping",
    "if_sid": [62002],
    "match": {
      "accessibility_service": "com.eye.sysinput/.KeyCaptureService"
    },
    "group": "spyware, android, keylogger"
  }
}
```

*Eyezy sluit zich vaak aan op tekstinvoerservices om te detecteren wat wordt getypt, vooral bij berichtenapps.*

### Social media spiegelen of screen‑scraping poging

```json
{
  "rule": {
    "id": 100051,
    "level": 11,
    "description": "Screen‑scraping van sociale media – Eyezy‑variant",
    "if_sid": [62001],
    "match": {
      "package.name": "com.eye.mirror.service"
    },
    "group": "spyware, android, social"
  }
}
```

*Het lijkt op een schermrecorder of spiegeltool. Als het Accessibility‑API's gebruikt, neem aan dat het privé‑berichten bespioneert.*

### Verdachte DNS‑lookup naar Eyezy cloud‑infrastructuur

```zeek
event zeek_notice::Weird {
  if (conn$host matches /eyezy|mirrorzone|eyec2/i &&
      conn$duration < 45 secs &&
      conn$resp_bytes < 1500) {
    NOTICE([$note=Notice::Eyezy_C2_Traffic,
            $msg="Mogelijke Eyezy C2‑beacon gedetecteerd",
            $conn=conn]);
  }
}
```

*Eyezy gebruikt stilte HTTPS‑POSTs naar vage cloud‑domeinen. Let op regelmatig terugkerende kleine overdrachten naar domeinen met “eye”.*

### Root‑of verhoogde toegang na installatie

```json
{
  "rule": {
    "id": 100052,
    "level": 14,
    "description": "Privilege escalatie gedetecteerd – mogelijk Eyezy spyware",
    "if_sid": [5500],
    "match": {
      "event_type": "privilege_escalation",
      "package.name": "com.eye.sysinput"
    },
    "group": "android, spyware, root"
  }
}
```

*Eyezy kan roottoegang vragen of misbruiken om zich volledig te verbergen. Als dat kort na installatie gebeurt, geef een alarm.*

### Eyezy gedragscorrelatie meta‑regel

```json
{
  "rule": {
    "id": 199996,
    "level": 15,
    "description": "Eyezy gedragspatroon gedetecteerd – waarschijnlijk heimelijke bewaking",
    "if_matched_sid": [100050, 100051, 100052],
    "group": "spyware, survivor-risk, alert"
  }
}
```

*Alles vangen. Toetsaanslagregistratie, screen‑scraping en roottoegang in één bundel is nooit onschuldig.*
