---
title: "Overzicht van de stack"
weight: 1
translationKey: "ipa-siem-stack"
_build:
  render: always
menu:
  sidebar:
    weight: 5
---

De IPA‑SIEM Stack is een gespecialiseerde cybersecurity-tool gebaseerd op Wazuh, een open-source SIEM/XDR-platform dat ontworpen is om overlevenden van huiselijk geweld (IPA) te helpen bij het ontdekken en bestrijden van heimelijke digitale surveillance. Dit betreft bedreigingen als stalkerware, spyware en ongeoorloofde apparaattoegang. Het systeem biedt een alomvattende aanpak van digitale bescherming voor kwetsbare personen.

## Belangrijkste doelen van de IPA‑SIEM stack

Het systeem vervult vier hoofdrollen. Ten eerste maakt het forensische dataverzameling mogelijk door logs en artefacten van apparaten van overlevenden op Windows-, macOS-, Android- en iOS-platforms te verzamelen om mogelijke compromittering te identificeren. Ten tweede gebruikt het dreigingsdetectiesysteem vooraf ingestelde regels om gangbare surveillance‑tools zoals commerciële stalkerware (mSpy, FlexiSPY), keyloggers en tools voor externe toegang te detecteren.

Voor incidentrespons biedt de stack geautomatiseerde scripts en duidelijke richtlijnen om gecompromitteerde apparaten te isoleren, digitale bewijzen te verzamelen en overlevenden te ondersteunen bij het beveiligen van hun technologie. Tot slot hanteert het platform een privacygerichte benadering die voldoet aan GDPR en de Britse Data Protection Act, zodat alle gegevens van overlevenden tijdens het gehele proces versleuteld en geanonimiseerd blijven.

## Hoe het systeem werkt

De IPA‑SIEM Stack draait op een gecentraliseerde architectuur. Een dedicated server of cloud‑VM vormt de basis en draait een aantal kerncomponenten. De Wazuh‑module monitort continu aangesloten apparaten op verdacht gedrag, terwijl Elasticsearch en Kibana samenwerken om beveiligingslogs, zoals waarschuwingen over spywareprocessen of pogingen tot locatie‑tracking, op te slaan en weer te geven. De installatie verloopt via een automatische `setup.sh`‑script dat alle afhankelijkheden en configuratie regelt.

Apparaatintegratie verschilt per platform. Windows‑ en macOS‑systemen kunnen Wazuh‑agents installeren die logs automatisch naar de centrale server sturen. Voor Android‑apparaten kunnen gerootte systemen de agent via Termux installeren, terwijl niet‑gerootte apparaten handmatige logverzameling via ADB vereisen. iOS‑ondersteuning is momenteel beperkt tot gejailbreakte apparaten met Cydia of handmatige logextractie via iTunes.

Het detectiesysteem maakt gebruik van vooraf gebouwde regels die bekende bedreigingen identificeren, zoals mSpy‑processen of ongeautoriseerde pogingen tot locatie‑toegang. Deze waarschuwingen verschijnen in het Kibana-dashboard, samen met aanbevolen acties die kunnen bestaan uit het isoleren van een apparaat of het resetten van GPS-instellingen. Wanneer er een bedreiging wordt gedetecteerd, treden de incidentresponsprotocollen in werking. Geautomatiseerde scripts zoals `quarantine_device.sh` helpen bij het indammen van bedreigingen, terwijl uitgebreide richtlijnen overlevenden ondersteunen bij het veiligstellen van bewijzen, juridische rapportageprocedures en het overstappen naar meer veilige apparaten indien nodig.

## Belang en toepassingen

Deze oplossing is om meerdere redenen bijzonder waardevol. Het stelt niet-technische hulpverleners in staat om onderkomst en ondersteuning te bieden met beveiligingstools van enterprise-niveau, zonder diepgaande expertise in cybersecurity vereist. Het systeem blijft strikt legaal en ethisch conform dankzij robuuste versleuteling, gegevensanonimisering en een logbewaarbeleid van 90 dagen dat bewijsmogelijkheden en privacy in balans houdt. Doordat het is opgebouwd met gratis, open-source tools zoals Wazuh en Elasticsearch, is het bijzonder kostenefficiënt voor hulporganisaties met beperkte budgetten die met overlevenden werken.

Het platform is bij uitstek geschikt voor opvangcentra die cliënten moeten beschermen tegen digitale surveillance, forensische organisaties die helpen bij bewijsvergaring, en juridische bijstandsgroepen die zaken voorbereiden voor straatverbod of vervolging. Hoewel het project open source is (GPLv3-licentie) en gemeenschapsparticipatie verwelkomt, dienen gebruikers rekening te houden met enkele beperkingen. De ondersteuning voor Android en iOS is nog beperkt voor niet-geroote/gejailbreakte apparaten, maar dat kan in de toekomst veranderen.
