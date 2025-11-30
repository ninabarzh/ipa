---
title: "Hoe maak je deepfake video's voor trainingen"
linkTitle: "Deepfake video's maken"
slug: "deepfake-vids-maken"
weight: 6
_build:
  render: always
description: "Stap-voor-stap handleiding voor het maken van echte en deepfake-video's voor de 'Spot de Nep'-oefening, met gratis tools voor Windows en Linux."
menu:
  sidebar:
    weight: 30
    identifier: "nl-make-deepfake"
    parent: "nl-docs"
translationKey: "make-deepfake"
---

Deze handleiding legt uit hoe je korte **echte** en **nep** video's maakt voor trainingen in opvangcentra. Alleen voor educatie,  niet voor social media of pesten.

Op:

- **Windows** (gratis tools of online)
- **Linux** (commandline of GUI)
- Online/offline workflows

## Basisprincipes

- Max **30 seconden**
- **Neutrale inhoud** (bijv. "Hallo, ik ben X. Welkom.")
- Altijd uitleggen wat nep is
- Nooit echte identiteiten gebruiken
- Verantwoord opslaan/verwijderen

## Echte opname

Nodig:

- Telefoon/webcam (720p volstaat)
- Rustige ruimte met goed licht
- Iemand voor kort script
- Alleen knippen indien nodig

Gratis tools:
- **Windows**: Foto's-app → Bewerken → Bijsnijden
- **Linux**: `Shotcut`, `Kdenlive` of:

```bash
ffmpeg -i input.mp4 -ss 00:00:01 -to 00:00:29 -c copy geknipt.mp4
```

## Deepfake-versies maken

### Windows: Online tools gebruiken

**Het makkelijkst voor de meeste gebruikers**, alleen geschikt als je geen probleem hebt met cloud-uploads.

#### Optie 1: DeepBrain AI Studios

* Ga naar [DeepBrain AI Studios](https://www.aistudios.com/)
* Maak een gratis account (beperkt gebruik)
* Upload een script en kies een gezicht (of maak een kloon)
* Genereer een clip - meestal binnen een minuut
* Download de video (MP4)

#### Optie 2: HeyGen

* Ga naar [HeyGen](https://www.heygen.com/)
* Kies een presentator of upload je eigen foto
* Voeg een tekstscript toe
* Ondersteunt meerdere talen en accenten
* Gratis proefversie met watermerk

#### Optie 3: Synthesia.io

* Ga naar [Synthesia.io](https://www.synthesia.io/)
* Professionele avatars, zeer gebruiksvriendelijk
* Vereist een account
* Gratis proefversie bevat enkele video's

*Alle online platforms slaan je clips op. Gebruik alleen generieke inhoud en overweeg wegwerpmail.*

### Windows: Gratis offline tools

#### Optie 1: Avatarify (open-source, realtime deepfake)

* Installeer [Avatarify](https://avatarify.ai/)

```bash
pip install avatarify
```

* Gebruik met webcam + scriptlezer
* Overlay een bekend of standaard gezicht in realtime

#### Optie 2: DeepFaceLab

* Download van [GitHub](https://github.com/iperov/DeepFaceLab)
* Vereist een krachtige GPU en geduld
* Het beste voor realisme, maar geavanceerde setup

### Linux: Gratis tools gebruiken

#### Optie 1: First-order Motion Model (FOMM)

* Gebruik [vooraf getrainde modellen van Aliaksandr Siarohin](https://github.com/AliaksandrSiarohin/first-order-model)

```bash
git clone https://github.com/AliaksandrSiarohin/first-order-model
cd first-order-model
pip install -r requirements.txt
```

* Geef het:
  * Een stilstaand beeld (gezicht)
  * Een besturingsvideo (jij of een acteur die het script leest)
- Geeft geanimeerde video's uit

#### Optie 2: DeepFaceLive (Linux-native build)

Er is *een* Linux-native build, hoewel veel minder gedocumenteerd en wat lastiger met afhankelijkheden zoals `dlib`, `onnxruntime`, en specifieke versies van `ffmpeg`. Maar het werkt:

* Kloon het project: `git clone https://github.com/iperov/DeepFaceLive.git`
* Volg de [Linux installatie-instructies](https://github.com/iperov/DeepFaceLive#linux) (minder uitgewerkt maar werkbaar):

  * Installeer afhankelijkheden zoals Python 3.8–3.10, `onnxruntime`, `torch`, `opencv`, en `dlib`
  * Gebruik virtualenv om zaken netjes te houden
  * Reken op wat probleemoplossing - vooral met CUDA als je GPU-versnelling wilt

- Goed voor het genereren van video-output met stem + gezichtsoverlay
- Minder soepel in realtime dan op Windows, maar bruikbaar met wat geduld

## Voorbereiding

* **3 tot 4 echte clips** met eenvoudige introducties
* **3 tot 4 nepclips**, gegenereerd van dezelfde of vergelijkbare scripts
* Optioneel: **Een gemengde clip** waarbij slechts een deel is aangepast (bijv. stem vs gezicht)

Gebruik consistente belichting en toon zodat het verschil subtiel is - dit maakt het spotten moeilijker (en leuker).

## Privacy en ethiek

Wel doen:

* Vraag geïnformeerde toestemming van echte sprekers
* Gebruik verzonnen namen en onschuldige scripts
* Leg uit hoe en waarom de nepversie is gemaakt

Niet doen:

* Video's van echte slachtoffers, kinderen of gevoelige verhalen gebruiken
* Deepfake-generators gebruiken zonder hun voorwaarden te controleren
* Vergeten om cache- of overblijvende trainingsdata te verwijderen
