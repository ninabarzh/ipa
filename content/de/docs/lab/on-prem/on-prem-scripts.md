---
title: "Hilfreiche Skripte zur Automatisierung von Überprüfungen und Antworten"
weight: 4
translationKey: "on-prem-scripts"
_build:
  render: always
menu:
  sidebar:
    weight: 20
description: "Skripte sind kleine Werkzeuge, die wichtige Aufgaben automatisieren – wie das Erkennen von Spyware, Blockieren verdächtiger Geräte oder Sammeln von Telefonprotokollen – um schnelle Sicherheitsantworten zu ermöglichen."
---

Sie müssen keine Programmierung beherrschen. Stellen Sie es sich wie Backen vor: Befolgen Sie das Rezept genau und der Kuchen (nun, das Skript) wird seine Arbeit tun.

## Wo Sie Ihre Skripte ablegen sollten

Sie sollten alle Ihre benutzerdefinierten Skripte an einem sicheren, vorhersehbaren Ort speichern. So erreichen Sie das.

1. Terminal öffnen: Öffnen Sie auf Ihrem Server (Linux) ein Terminalfenster.
2. Erstellen Sie den Ordner `scripts`. Hier werden Ihre Skripte gespeichert:

```bash
sudo mkdir -p /opt/siem/scripts
```

3. Wechseln Sie in diesen Ordner

```bash
cd /opt/siem/scripts
```

4. Sichern Sie ihn (nur Admin-Benutzer sollten darauf zugreifen können)

```bash
sudo chmod 700 /opt/siem/scripts
```

## Ein Gerät vom Netzwerk trennen

**Funktion:** Wenn ein Telefon oder Laptop im Netzwerk verdächtiges Verhalten zeigt – möglicherweise Anzeichen von Spyware oder Tracking – können Sie es sofort mit diesem Skript vom Netzwerk trennen.

**Warum es wichtig ist:** Eine schnelle Reaktion ist entscheidend. Dies blockiert ein Gerät daran, Daten ins Internet zu senden.

### Schritt-für-Schritt-Anleitung zur Erstellung

1. Immer noch in `/opt/siem/scripts`, erstellen Sie die Skriptdatei:

```bash
sudo nano quarantine_device.sh
```

2. Fügen Sie dies ein:

```bash
#!/bin/bash

echo "Trenne $1 vom Netzwerk..."
sudo iptables -A OUTPUT -s $1 -j DROP
```

3. Speichern und beenden:

* Drücken Sie `Strg + O`, dann `Enter`
* Drücken Sie `Strg + X`

4. Machen Sie es ausführbar:

```bash
sudo chmod +x quarantine_device.sh
```

### Verwendung

Wenn das verdächtige Gerät die IP `192.168.1.50` hat:

```bash
sudo /opt/siem/scripts/quarantine_device.sh 192.168.1.50
```

Es kommt nicht mehr durch das Tor.

## Nach verdächtigen Dingen in Wazuh-Protokollen suchen

**Funktion:** Durchsucht Protokolle Ihres Wazuh-Agents und extrahiert alles, was als „verdächtig“ markiert ist.

**Warum es wichtig ist:** Rohe Protokolle zu lesen ist mühsam. Dies liefert Ihnen eine handliche Datei mit nur den Warnhinweisen.

### Schritt-für-Schritt

1. Erstellen Sie die Datei:

```bash
sudo nano parse_logs.sh
```

2. Fügen Sie ein:

```bash
#!/bin/bash

mkdir -p /opt/siem/alerts
journalctl -u wazuh-agent | grep -i suspicious > /opt/siem/alerts/suspicious.log
```

3. Speichern und beenden (`Strg + O`, `Enter`, `Strg + X`)

4. Machen Sie es ausführbar:

```bash
sudo chmod +x parse_logs.sh
```

### Automatisieren Sie es stündlich

```bash
crontab -e
```

Fügen Sie am Ende hinzu:

```
0 * * * * /opt/siem/scripts/parse_logs.sh
```

Jetzt wird es stündlich die Protokolle überprüfen und alles Alarmierende in:

```
/opt/siem/alerts/suspicious.log
```

speichern.

### Ergebnisse verschlüsseln (optional, aber empfohlen)

Stellen Sie sicher, dass nur vertrauenswürdige Personen sie lesen können:

```bash
gpg -c /opt/siem/alerts/suspicious.log
```

Wählen Sie ein starkes Passwort und speichern Sie es sicher.

## Auf Android über Termux ausführen

Wird verwendet, wenn eine betroffene Person ein Android-Gerät hat und Sie nützliche Hinweise daraus sammeln möchten.

**Auf Ihrem Server (von wo andere es herunterladen können):**

1. Erstellen Sie die Datei:

```bash
sudo nano /opt/siem/scripts/setup_android.sh
```

2. Fügen Sie ein:

```bash
#!/data/data/com.termux/files/usr/bin/bash

echo "Sammle Android-Hinweise..."

mkdir -p ~/ipa_siem_logs

pm list packages -f > ~/ipa_siem_logs/apps.txt
settings get global http_proxy > ~/ipa_siem_logs/proxy.txt
cat /data/misc/wifi/wpa_supplicant.conf > ~/ipa_siem_logs/wifi.txt 2>/dev/null
logcat -d > ~/ipa_siem_logs/logcat.txt

echo "✅ Fertig. Dateien gespeichert in ~/ipa_siem_logs/"
```

3. Machen Sie es ausführbar:

```bash
chmod +x /opt/siem/scripts/setup_android.sh
```

**Hosten Sie es zum Herunterladen:**

Von `/opt/siem/scripts`:

```bash
python3 -m http.server 8000
```

**Auf dem Android-Gerät (in Termux):**

```bash
pkg update && pkg install curl
curl -s http://192.168.1.10:8000/setup_android.sh | bash
```

## Protokolle von einem jailbroken iPhone abrufen

Erfordert:

* iPhone mit **OpenSSH installiert** über Cydia
* Sie kennen die IP-Adresse des iPhones im lokalen Wi-Fi

Auf dem Server

```bash
sudo nano /opt/siem/scripts/pull_ios_logs.sh
```

Fügen Sie ein:

```bash
#!/bin/bash

IP=$1
USER=mobile
DATE=$(date +"%Y-%m-%d_%H-%M")

mkdir -p /opt/siem/ios_logs/$DATE

scp -r ${USER}@${IP}:/var/mobile/Library/Logs/CrashReporter /opt/siem/ios_logs/$DATE/
scp ${USER}@${IP}:/var/log/syslog /opt/siem/ios_logs/$DATE/

echo "iPhone-Protokolle gespeichert in /opt/siem/ios_logs/$DATE"
```

Machen Sie es ausführbar:

```bash
chmod +x /opt/siem/scripts/pull_ios_logs.sh
```

Führen Sie es so aus:

```bash
/opt/siem/scripts/pull_ios_logs.sh 192.168.1.23
```

## Spyware-Begriffe in Protokollen finden

```bash
sudo nano /opt/siem/scripts/watch_logs.sh
```

Fügen Sie ein:

```bash
#!/bin/bash

LOGDIR="/opt/siem/ios_logs"
ALERTS="/opt/siem/alerts"

mkdir -p $ALERTS

grep -rEi "spy|track|mirror|record|stalker|surveil|remote access" $LOGDIR > $ALERTS/suspicious.log

echo "Verdächtige Begriffe gefunden. Überprüfen Sie $ALERTS/suspicious.log"
```

Machen Sie es ausführbar:

```bash
chmod +x /opt/siem/scripts/watch_logs.sh
```

## Dateien von USB-Sticks sammeln

```bash
sudo nano /opt/siem/scripts/usb_intake.sh
```

Fügen Sie ein:

```bash
#!/bin/bash

MOUNT="/media/usb"
DEST="/opt/siem/manual_uploads/$(date +%F_%H%M)"
mkdir -p $DEST

cp -r $MOUNT/* $DEST

echo "Dateien kopiert nach $DEST"
```

Machen Sie es ausführbar:

```bash
chmod +x /opt/siem/scripts/usb_intake.sh
```

## Alles ausführen

```bash
sudo nano /opt/siem/scripts/full_check.sh
```

Fügen Sie ein:

```bash
#!/bin/bash

/opt/siem/scripts/usb_intake.sh
/opt/siem/scripts/watch_logs.sh
```

Machen Sie es ausführbar:

```bash
chmod +x /opt/siem/scripts/full_check.sh
```
