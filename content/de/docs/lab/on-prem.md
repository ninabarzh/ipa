---
title: "Einrichtung eines sicherheitsbasierten Systems im Frauenhaus"
weight: 2
translationKey: "on-prem"
_build:
  render: always
menu:
  sidebar:
    weight: 10
description: "Diese Anleitung führt Sie durch die Einrichtung des SIEM-Stacks komplett innerhalb Ihres Frauenhauses. Privat, leistungsstark und in Ihren Händen – keine Cloud erforderlich."
---

* Keine Cloud-Drittanbieter
* Keine Daten verlassen Ihr Gebäude
* Keine versteckte Überwachung von Betroffenen

Entwickelt für Frauenhäuser mit:

* Einer stabilen Internetverbindung (auch wenn nur innerhalb des Gebäudes)
* Einem kleinen, engagierten Team
* Keinem technischen Hintergrund (wir erklären alles)
* Bedarf an Erkennung von digitalem Stalking, Manipulation oder Überwachung

## Was dieses System leistet

Es sammelt Hinweise von Geräten (wie Protokolle, Warnungen und verdächtiges Verhalten), sucht nach Anzeichen von Tracking oder Eindringversuchen und bietet ein visuelles Dashboard zur schnellen Bedrohungserkennung.

## Was Sie benötigen

### Ein Server im Frauenhaus (Ihre Kommandozentrale)

Dieser Computer wird alles steuern.

**Mindestanforderungen:**

* Ubuntu 22.04 LTS (kostenlose Linux-Version – wir erklären die Installation)
* Mindestens 8 GB RAM
* Mindestens 4 CPU-Kerne
* Mindestens 100 GB Speicherplatz
* Eine **feste** interne IP-Adresse (damit andere Geräte den Server immer finden)

*Falls unsicher: Bitten Sie Ihren IT-Helfer, eine feste IP wie `192.168.1.10` einzurichten.*

Geeignete Hardware:

* Ein älterer PC
* Mini-PC (z.B. Intel NUC)
* Virtuelle Maschine auf vorhandenem Verwaltungscomputer (falls leistungsstark genug)

### Zu überwachende Geräte

Das System unterstützt:

* Windows-Laptops
* macOS-Geräte (z.B. MacBooks)
* Android-Handys (gerootet = mehr Zugriff, aber nicht erforderlich)
* iPhones (nur eingeschränkte Daten ohne Jailbreak)

### Netzwerk im Frauenhaus (kabelgebunden oder WLAN)

Muss nur alle Geräte **innerhalb** des Gebäudes verbinden. Nach der Einrichtung ist kein Internetzugang nötig.

### Optional: PiRogue-Gerät

[Ein kleines Toolkit (basierend auf Raspberry Pi)](/docs/lab/pts.md) das Geräte auf verdächtiges Verhalten prüft, bevor sie ins Netzwerk kommen. Ideal bei Aufnahmeinterviews oder Außeneinsätzen.

## Schritt-für-Schritt-Einrichtung

### Server vorbereiten

Hier werden alle Sicherheitstools installiert.

1. Terminal öffnen (Auf Ubuntu-Server: `Strg + Alt + T`)
2. System aktualisieren und Grundtools installieren:

```bash
sudo apt update && sudo apt install -y curl unzip gnupg
```

### Wazuh installieren (Ihr Sicherheitssystem)

**Was ist Wazuh?**: Ein Open-Source-System zur Geräteüberwachung mit Alarmen und Dashboard.

Wazuh-Quelle hinzufügen:

```bash
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | sudo gpg --dearmor -o /usr/share/keyrings/wazuh.gpg

echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | sudo tee /etc/apt/sources.list.d/wazuh.list

sudo apt update
```

Wazuh installieren:

```bash
sudo apt install -y wazuh-manager wazuh-api elasticsearch kibana
```

Dienste starten:

```bash
sudo systemctl enable --now wazuh-manager elasticsearch kibana
```

### Dashboard einrichten

Im Browser auf dem Server öffnen:

```
http://localhost:5601
```

Oder von anderen Geräten im Netzwerk:

```
http://192.168.1.10:5601
```

## Geräte verbinden

### Für Windows/Mac

**Wazuh Agent** sendet Protokolle an Ihren Server.

**Option 1: Direktinstallation**

1. Im Browser: `http://192.168.1.10:5601`
2. Agent für Windows/macOS herunterladen
3. Installieren
4. Server-IP eingeben (z.B. `192.168.1.10`)

**Option 2: USB-Installation (ohne Internet)**

Auf Server:

```bash
wget https://packages.wazuh.com/4.x/agents/wazuh-agent_x.x.x.msi
cp wazuh-agent_x.x.x.msi /media/usb
```

### Für Android (gerootet)

1. Termux von [F-Droid](https://f-droid.org/packages/com.termux/) installieren
2. In Termux:

```bash
pkg update && pkg install curl git
curl -s http://192.168.1.10/setup_android.sh | bash
```

### Für Android (nicht gerootet)

1. ADB auf Server installieren:

```bash
sudo apt install android-tools-adb
```

2. USB-Debugging auf dem Handy aktivieren
3. Mit USB verbinden und prüfen:

```bash
adb devices
```

4. Protokolle kopieren:

```bash
adb logcat -d > /opt/logs/android_logcat.txt
adb bugreport > /opt/logs/android_bugreport.zip
```

### Für iPhones (gejailbreakt)

1. OpenSSH via Cydia installieren
2. Protokolle per SSH übertragen

### Für iPhones (nicht gejailbreakt)

1. Tools installieren:

```bash
sudo apt install libimobiledevice-utils
```

2. Backup erstellen:

```bash
idevicebackup2 backup /opt/backups/ios_device/
```

3. Backup analysieren:

```bash
python3 parse_ios_backup.py /opt/backups/ios_device/
```

### Optional: PiRogue-Scans

1. Verbindung herstellen:

```bash
ssh pi@piroguedevice.local
```

2. Scan starten:

```bash
sudo ./start_capture.sh --target 192.168.1.75
```

3. Daten übertragen:

```bash
scp capture.pcap user@192.168.1.10:/opt/forensics/
```

## Wöchentliche Wartung

* Dashboard auf neue Alarme prüfen
* `/var/ossec/logs/` sichern
* Server monatlich neu starten
* Server physisch sichern
* Alarmprotokolle prüfen (`/opt/ipa-siem/alerts/suspicious.log`)

## Zusammenfassung

Das System blockiert nicht alle Bedrohungen, macht sie aber sichtbar. Für Unterstützung kontaktieren Sie digitale Menschenrechtsgruppen. Mit dieser Open-Source-Lösung bleiben alle Daten bei Ihnen – keine Cloud, kein Drittanbieterrisiko.
