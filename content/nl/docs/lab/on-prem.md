---
title: "Beveiligingssysteem voor opvanghuizen opzetten"
weight: 2
translationKey: "on-prem"
_build:
  render: always
menu:
  sidebar:
    weight: 10
description: "Handleiding voor het opzetten van het SIEM-systeem volledig binnen uw opvanghuis. Privé, krachtig en in eigen beheer – geen cloud nodig."
---

* Geen cloud-dienstenaanbieders
* Geen data die het gebouw verlaat
* Geen verborgen surveillance van slachtoffers

Ontworpen voor opvanghuizen met:

* Stabiele internetverbinding (zelfs alleen lokaal)
* Klein maar toegewijd team
* Geen technische achtergrond (wij leggen alles uit)
* Behoefte aan detectie van digitaal stalken of manipulatie

## Functionaliteiten

Verzamelt aanwijzingen van apparaten (logs, waarschuwingen), detecteert tracking of inbreuken, en biedt een visueel dashboard voor snelle actie.

## Benodigdheden

### Opvanghuis-server

**Minimale specificaties:**

* Ubuntu 22.04 LTS
* 8 GB RAM
* 4 CPU-kernen
* 100 GB opslag
* Vast **lokaal IP-adres**

Geschikte hardware:

* Oude PC
* Mini-PC (bijv. Intel NUC)
* Virtuele machine

### Te monitoren apparaten

* Windows
* macOS
* Android (geroot optioneel)
* iPhone (beperkte data zonder jailbreak)

### Lokaal netwerk (bedraad of Wi-Fi)

### Optioneel: PiRogue-apparaat

[Raspberry Pi-toolkit](/docs/lab/pts.md) voor apparaatscanning vóór netwerktoegang.

## Stapsgewijze installatie

### Server voorbereiden

1. Terminal openen (`Ctrl + Alt + T`)
2. Systeem bijwerken:

```bash
sudo apt update && sudo apt install -y curl unzip gnupg
```

### Wazuh installeren

Repository toevoegen:

```bash
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | sudo gpg --dearmor -o /usr/share/keyrings/wazuh.gpg

echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | sudo tee /etc/apt/sources.list.d/wazuh.list

sudo apt update
```

Installeren:

```bash
sudo apt install -y wazuh-manager wazuh-api elasticsearch kibana
```

Starten:

```bash
sudo systemctl enable --now wazuh-manager elasticsearch kibana
```

### Dashboard instellen

Toegang via:

```
http://localhost:5601
```

Of lokaal netwerk:

```
http://192.168.1.10:5601
```

## Apparaten verbinden

### Windows/Mac

**Wazuh Agent** installeren:

1. Downloaden van `http://192.168.1.10:5601`
2. Installeren
3. Server-IP invoeren

### Android (geroot)

1. Termux installeren via [F-Droid](https://f-droid.org/packages/com.termux/)
2. Uitvoeren:

```bash
pkg update && pkg install curl git
curl -s http://192.168.1.10/setup_android.sh | bash
```

### Android (niet geroot)

1. ADB installeren:

```bash
sudo apt install android-tools-adb
```

2. USB-debugging inschakelen
3. Controleren:

```bash
adb devices
```

4. Logs kopiëren:

```bash
adb logcat -d > /opt/logs/android_logcat.txt
adb bugreport > /opt/logs/android_bugreport.zip
```

### iPhone (jailbreak)

1. OpenSSH via Cydia installeren
2. Logs via SSH overdragen

### iPhone (zonder jailbreak)

1. Tools installeren:

```bash
sudo apt install libimobiledevice-utils
```

2. Backup maken:

```bash
idevicebackup2 backup /opt/backups/ios_device/
```

3. Analyseren:

```bash
python3 parse_ios_backup.py /opt/backups/ios_device/
```

### Optioneel: PiRogue

1. Verbinden:

```bash
ssh pi@piroguedevice.local
```

2. Scannen:

```bash
sudo ./start_capture.sh --target 192.168.1.75
```

3. Data overdragen:

```bash
scp capture.pcap user@192.168.1.10:/opt/forensics/
```

## Wekelijks onderhoud

* Dashboard controleren
* `/var/ossec/logs/` back-uppen
* Server maandelijks herstarten
* Server fysiek beveiligen
* Alarmlogs bekijken

## Samenvatting

Deze open-source oplossing houdt alle data binnen het opvanghuis. Met basiskennis kan het hele team meewerken aan beheer en monitoring.
