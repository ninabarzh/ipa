---
title: "Architekturen"
weight: 1
translationKey: "architectures"
_build:
  render: always
menu:
  sidebar:
    weight: 5
description: "Empfohlene Architekturen für die Bereitstellung des SIEM-Stacks, basierend auf verschiedenen Organisationskontexten und Ressourcen. Alle sind für forensische Datensammlung, Bedrohungserkennung und Incident Response ausgelegt, unter Wahrung der Privatsphäre von Betroffenen und gesetzlicher Compliance. Jede kann an Shelter-Umgebungen, Advocacy-Netzwerke oder dezentrale Community-Bereitstellungen angepasst werden."
---

## Shelter-zentrierte On-Premise-Bereitstellung (Low-Tech, All-in-One-Box)

Am besten für: Frauenhäuser mit zuverlässigen internen Netzwerken und einer technischen Ansprechperson.

* Ideal für kleine Einrichtungen ohne IT-Team
* Kann offline oder teilweise verbunden betrieben werden
* Log-Import per USB möglich, falls Internet riskant ist

Architektur: Single-VM-Lokalbereitstellung (Low-Tech, All-in-One-Box)

```text
+-------------------------+             +---------------------------+
|     Shelter-Laptop      |             |    Optionaler PîRogue     |
| (Ubuntu-VM oder Host-OS)|             |   (Feldanalysegerät)      |
|-------------------------|             |---------------------------|
| - Wazuh Manager         |             | - PiRogue OS              |
| - Elasticsearch         |             | - Paketerfassungstools    |
| - Kibana                |             | - USB-Log-Import          |
| - setup.sh Automation   |             +---------------------------+
+-------------------------+                       |
        |                                         |
        | Sicheres LAN / USB-Log-Import           |
        v                                         v
+--------------------------+            +----------------------------+
| Betroffenen-Geräte-Logs  |            |   Feldgeräte (z.B.         |
| (Windows/macOS/Android)  |            |   verdächtiges Handy)      |
+--------------------------+            +----------------------------+
```

* Ein physischer oder virtueller IPA-SIEM-Server vor Ort
  * Läuft Wazuh Manager, Elasticsearch und Kibana
  * Beinhaltet automatisierte Skripte (z.B. `quarantine_device.sh`, Log-Parser)
* Wazuh-Agents installiert auf:
  * Windows/macOS-Geräten (direkt oder via USB-Boot-Toolkit)
  * Android (über Termux auf gerooteten Geräten)
  * iOS (gejailbreakt oder Offline-Backups)
* Internes Netzwerk zur sicheren Log-Übertragung
* Optional gehärtetes PiRogue-Gerät für lokale Analyse und Feldtriage

Vorteile: Daten bleiben vor Ort; starke Privatsphäre-Kontrolle; Nachteile: Erfordert lokale Wartung und physische Sicherheit.

## Private Cloud-Bereitstellung (Shelter/NGO-kontrolliert)

Am besten für: Organisationen mit Remote-Zugriff von mehreren Standorten.

* Remote-Zugriff für multilokale Organisationen
* Benötigt starke VPN/Tunnel + verschlüsselte Backups
* Geringeres lokales Risiko, aber höhere Opsec-Disziplin

Architektur: Sichere Cloud-basierte SIEM-Lösung (z.B. Hetzner)

```text
+--------------------------------+
|     Verschlüsselte Cloud-VM    |
|--------------------------------|
| - Wazuh Manager                |
| - Elasticsearch                |
| - Kibana                       |
| - HTTPS-Zugriff (VPN optional) |
+--------------------------------+
        |
        | Verschlüsselte Log-Übertragung
        v
+--------------------------------+
|  Betroffenen-Geräte weltweit   |
|  (via Wazuh-Agent/ADB/iTunes)  |
+--------------------------------+
```

* Cloud-gehostete VM (z.B. Hetzner, DigitalOcean) mit:
  * Wazuh Manager + Elasticsearch + Kibana Stack
  * Verschlüsselter VPN-Zugang für Einrichtungen
* Geräte verbinden sich via sicherem Tunnel (z.B. WireGuard)
* Logs werden vor Übertragung lokal anonymisiert

Vorteile: Zentrale Übersicht; keine physische Wartung; Nachteile: Cloud-Sicherheitswissen nötig; strenge Verschlüsselung erforderlich

## Tragbares Analyse-Lab (Offline-First)

Am besten für: Notfalltriage, temporäre Unterkünfte, mobile Beratung.

* Ideal für Feldeinsätze, Kliniken, Hausbesuche
* Kein Internet nötig, alles lokal
* Daten können nach Export gelöscht werden

Architektur: Tragbare "Go Bag"-SIEM-Lösung (Raspberry Pi oder Laptop)

```text
+-----------------------------+
|   Tragbarer Analyse-Rechner |
| (Linux-Laptop oder Pi 4)    |
|-----------------------------|
| - Wazuh Manager             |
| - Kibana (nur localhost)    |
| - setup.sh Portable-Modus   |
+-----------------------------+
        |
        | USB / WLAN-Tethering-Logs
        v
+-----------------------------+
| Betroffenen-Gerät (offline) |
+-----------------------------+
```

* Robustes Laptop oder Pi-basierte Forensik-Station mit:
  * Vorkonfiguriertem SIEM-Stack (Wazuh, Kibana, Elasticsearch)
  * Air-gapped oder firewalled gegen Datenlecks
* USB-Boot-Tools zur Datenerfassung
* Berichte temporär auf verschlüsseltem Volume
* Manuelle Synchronisation mit Hauptsystem möglich

Vorteile: Internetunabhängig; maximale Kontrolle; Nachteile: Begrenzt durch lokale Ressourcen

## Dezentrale Advocate-Pods

Am besten für: Netzwerke kleiner Organisationen oder verteilter Helfer*innen.

* Mehrere Einrichtungen liefern anonymisierte Daten
* Zentrale Unterstützung für Triage und Beweissicherung
* Funktioniert am besten mit technischem Partner

Architektur: Verteiltes Partnerorg-Setup (Shelters + Zentralanalyst)

```text
+--------------------------+     +--------------------------+
|  Shelter-Standort A      |     |  Shelter-Standort B      |
|--------------------------|     |--------------------------|
| - Wazuh-Agent/Collector  | --> | - Wazuh-Agent/Collector  |
+--------------------------+     +--------------------------+
         \                           /
          \                         /
           v                       v
           +-----------------------------+
           |  Zentrale SIEM-Analysten-VM |
           |-----------------------------|
           | - Wazuh Manager             |
           | - Elasticsearch + Kibana    |
           +-----------------------------+
```

* Leichte SIEM-Micro-Knoten (z.B. Raspberry Pi 5) pro Helfer*in
* Jeder Knoten verarbeitet:
  * Ein bis zwei Geräte gleichzeitig (USB oder lokales WLAN)
  * Echtzeitanalyse mit vorkonfigurierten Regelsätzen
* Periodische Sync mit zentralem Knoten (wöchentlich/monatlich)

Vorteile: Flexibel, kostengünstig, ausfallsicher; Nachteile: Geringere zentrale Übersicht

## Hybride Community-Netzwerke

Am besten für: Größere Advocacy-Netzwerke mit rotierendem Personal.

* Für Training, Malware-Signaturerstellung oder Rechtskliniken
* Kann replizierte Stalkerware-Spuren nutzen
* Muss vollständig sandboxed und isoliert sein

Architektur: Schulungs-/Forensumgebung (Sandboxed)

```text
+-----------------------------+
|      Forschungs-VM(s)       |
|-----------------------------|
| - Wazuh Manager             |
| - Infizierte VM-Images      |
| - Log-Replay oder Emulation |
+-----------------------------+
        |
        | Export bereinigter Beweise
        v
+-----------------------------+
| Archiv / Juristische Beweise|
+-----------------------------+
```

* Mehrstufiges System mit:
  * Zentraler Cloud-SIEM für Koordination
  * Mehreren Feldgeräten mit vorkonfigurierten Skripten
  * Web-UI für manuellen Log-Upload

Vorteile: Kombiniert das Beste aus beiden Welten – zentrale Sicherheit mit lokaler Aktion;  
Nachteile: Erfordert gute Koordination und Zugriffskontrollen zwischen den Ebenen

## Design-Überlegungen

* **Datenprivatsphäre**: Verwenden Sie Vollverschlüsselung auf allen Knoten. Logs sollten standardmäßig anonymisiert werden, sofern keine ausdrückliche Zustimmung vorliegt.
* **Prüfpfade**: Alle forensischen Aktionen sollten unveränderliche Protokolle generieren, um die rechtliche Zulässigkeit zu unterstützen.
* **Aktualisierungen**: Skriptbasierte Updates (z.B. via Git oder USB-Sync) sollten regelmäßig durchgeführt werden, um die Erkennungsgenauigkeit zu erhalten.
* **Bedrohungssignaturen**: Gemeinsam genutzte, aktualisierte Regelpakete speziell für IPA-Überwachungsmuster (z.B. "Calculator+"-Malware, SIM-Spoofing-Protokolle).

