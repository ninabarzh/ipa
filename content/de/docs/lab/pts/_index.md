---
title: "Anleitung zum Einrichten eines PiRogue-Toolkits zur Erkennung von Stalkerware"
weight: 3
translationKey: "pts"
_build:
  render: always
menu:
  sidebar:
    weight: 15
    identifier: "de-pts"
    parent: "de-lab"
description: "Diese Schritt-für-Schritt-Anleitung richtet sich an Mitarbeiter von Frauenhäusern ohne technische Vorkenntnisse. Sie hilft Ihnen, ein einfaches Gerät einzurichten, das Computer und Telefone auf versteckte Überwachungssoftware von Tätern überprüfen kann."
---

## Was Sie benötigen

Bevor Sie beginnen, besorgen Sie sich folgende Artikel (alle in den meisten Elektronikgeschäften erhältlich):

1. [Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) (2GB RAM reichen aus)  
2. Offizielles Netzteil (Micro-USB)  
3. 32 GB Micro-SD-Karte (Geschwindigkeit Klasse 10)  
4. Ethernet-Kabel (ein einfaches reicht aus)  
5. Einen zusätzlichen Monitor/Fernseher mit HDMI-Anschluss (für die Erstinstallation)  

*Hinweis zum Budget: Einige Wohltätigkeitsorganisationen wie WESNET in Australien bieten vergünstigte Kits an – fragen Sie bei lokalen Hilfsnetzwerken für häusliche Gewalt nach.*

## Schritt 1: Vorbereitung der PiRogue-Software  

### Herunterladen des Systems  

1. Gehen Sie auf einem beliebigen Computer auf die [offizielle PiRogue-Website](https://pts-project.org)  
2. Klicken Sie auf „Downloads“ und wählen Sie die neueste Version für Raspberry Pi 4   
3. Speichern Sie die Datei (Endung `.img.xz`) – sie enthält das gesamte Betriebssystem  

### Aufspielen der SD-Karte

1. Installieren Sie **Balena Etcher** (kostenlose Software) von [etcher.io](https://www.balena.io/etcher/)  
2. Stecken Sie Ihre Micro-SD-Karte in den Computer (ggf. mit Adapter)  
3. Öffnen Sie Etcher, wählen Sie das heruntergeladene PiRogue-Image, wählen Sie Ihre SD-Karte und klicken Sie auf „Flash!“  
4. Warten Sie, bis „Flash Complete“ angezeigt wird (ca. 10 Minuten)

## Schritt 2: Hardware einrichten  

1. **Stecken Sie die SD-Karte** in den Slot des Raspberry Pi (unten)  
2. **Verbinden Sie das Ethernet-Kabel** von Ihrem Pi mit dem Router des Frauenhauses  
3. **Schließen Sie HDMI** an einen Monitor/Fernseher an  
4. **Stecken Sie das Netzteil zuletzt ein** – der Pi startet automatisch  

*Tipp für den ersten Start:* Das System benötigt etwa 5 Minuten zum Hochfahren. Ein Regenbogenbildschirm ist zunächst normal.

## Schritt 3: Erstkonfiguration  

1. Geben Sie bei Aufforderung folgendes ein:  
   - Benutzername: `pi`  
   - Passwort: `raspberry` (Sie werden dies später ändern)  

2. Folgen Sie den Anweisungen auf dem Bildschirm, um:  
   - Ein neues sicheres Passwort zu setzen (notieren Sie dies an einem sicheren Ort)  
   - Ihre Zeitzone zu bestätigen (wichtig für genaue Protokolle)  
   - Nicht-Administratoren das Erfassen von Datenverkehr zu erlauben (geben Sie „Y“ ein und drücken Sie Enter)   

3. Das System aktualisiert sich selbst – warten Sie, bis es neu startet (ca. 15 Minuten)

## Schritt 4: Geräte zur Überprüfung verbinden  

### Für Telefone

1. Notieren Sie sich auf dem Bildschirm des PiRogue den WiFi-Netzwerknamen (z. B. „PiRogue-123“) und das Passwort  
2. Auf dem Telefon der betroffenen Person:  
   - Gehen Sie zu den WiFi-Einstellungen  
   - Verbinden Sie sich mit dem PiRogue-Netzwerk (ignorieren Sie Warnungen wie „Kein Internet“)  
   - Benutzen Sie das Telefon wie gewohnt für 5 Minuten – der PiRogue analysiert den Datenverkehr im Hintergrund   

### Für Computer

1. Verbinden Sie den Computer per Ethernet-Kabel mit dem PiRogue  
2. Öffnen Sie einen Browser und rufen Sie das Dashboard auf: `https://pirogue.local/dashboard`  
   - Benutzername: `admin`  
   - Passwort: Prüfen Sie den PiRogue-Bildschirm für das automatisch generierte Passwort

## Schritt 5: Ergebnisse lesen  

Das Dashboard zeigt einfache Ampelfarben an:

- **Grün:** Keine Stalkerware erkannt  
- **Gelb:** Verdächtige Aktivität (z. B. unbekannte Standortverfolgung)  
- **Rot:** Bestätigte Stalkerware (z. B. Cerberus, FlexiSpy)   

*Was tun, wenn Rot angezeigt wird:*

1. Notieren Sie den Namen der Schadsoftware  
2. Trennen Sie das Gerät sofort vom Netzwerk  
3. Wenden Sie sich an Ihren lokalen Tech-Sicherheitspartner (gelistet auf [stopstalkerware.org](https://stopstalkerware.org/resources/#find-support))

## Sicherheit und Wartung  

1. **Nach jeder Nutzung:**  
   - Fahren Sie den PiRogue ordnungsgemäß herunter (geben Sie `sudo shutdown now` auf dem Bildschirm ein)  
   - Löschen Sie die SD-Karte, z. B. mit DiskGenius unter Windows: Das einfache Formatieren einer SD-Karte entfernt nur Dateiverweise – Daten können mit Tools wie PhotoRec 7 wiederhergestellt werden. Durch das Löschen werden die Daten überschrieben und sind nicht wiederherstellbar. Dies ist entscheidend für:
      - Die Entfernung von Spuren der Stalkerware oder Malware.
      - Den Schutz der Privatsphäre der Betroffenen bei Wiederverwendung der Karte.
      - Eine saubere Einrichtung der forensischen Tools des PiRogue.
   - Überprüfen Sie die Karte nach dem Löschen: Stecken Sie sie erneut ein → Prüfen Sie, ob sie im Explorer als „leer“ angezeigt wird.

2. **Monatliche Überprüfungen:**  
   - Spielen Sie die SD-Karte mit der neuesten PiRogue-Version neu auf (Updates enthalten neue Erkennungsregeln für Stalkerware)   

3. **Bei sensiblen Fällen:**  
   - Nutzen Sie das Gerät in einem separaten Raum, weg von den Wohnbereichen der Betroffenen  
   - Dokumentieren Sie die Ergebnisse für rechtliche Beweise (machen Sie Screenshots des Dashboards)

## Hilfe erhalten  

- Treten Sie dem **Discord-Server von PiRogue** bei (https://discord.gg/pts-project) für Echtzeit-Support  
- EU Tech-Sicherheits-Hotline: https://www.accessnow.org/help/ *(24/7 Support in mehreren Sprachen)*
- Frauenhäuser in Großbritannien können die **Women's Aid** Tech-Sicherheitsklinik kontaktieren (+44 0808 802 0300)   
- Bei unmittelbarer Gefahr priorisieren Sie immer die physische Sicherheit vor digitalen Überprüfungen

## Hinweise

Die Einrichtung dauert weniger als eine Stunde und kostet weniger als 80 €. Es ist eine effektive Möglichkeit, Betroffenen dabei zu helfen, ihre digitale Sicherheit zurückzugewinnen.

Dieses Tool ersetzt keine professionelle forensische Analyse, ist jedoch eine gute erste Überprüfung, wenn Betroffene Geräte in Ihr Frauenhaus mitbringen. Die gesamte Einrichtung dauert etwa 45 Minuten und kostet weniger als 70 € – ein kleiner Preis, um jemandem dabei zu helfen, seine digitale Privatsphäre zurückzugewinnen.
