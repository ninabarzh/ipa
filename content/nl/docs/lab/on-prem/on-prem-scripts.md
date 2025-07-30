---
title: "Handige scripts om controles en antwoorden/responsen te automatiseren"
weight: 4
translationKey: "on-prem-scripts"
_build:
  render: always
menu:
  sidebar:
    weight: 20
description: "Scripts zijn kleine tools die je eenmalig bouwt, en die stilletjes belangrijke taken voor je uitvoeren op de achtergrond—zoals zoeken naar spyware, verdachte apparaten blokkeren of logs van telefoons kopiëren."
---

Je hoeft niet te kunnen programmeren. Zie het als bakken: volg het recept precies en de taart (nou, het script) doet zijn werk.

## Waar je je scripts plaatst

Je wilt al je aangepaste scripts op één veilige, voorspelbare plek hebben. Zo regel je dat.

1. Open Terminal: Op je server (Linux), open een terminalvenster.
2. Maak de `scripts` map. Hier komen je scripts:

```bash
sudo mkdir -p /opt/siem/scripts
```

3. Ga naar die map

```bash
cd /opt/siem/scripts
```

4. Vergrendel het (alleen admingebruikers mogen hierbij)

```bash
sudo chmod 700 /opt/siem/scripts
```

## Een apparaat van het netwerk afsluiten

**Wat het doet:** Als een telefoon of laptop op het netwerk verdacht gedrag vertoont—misschien tekenen van spyware of tracking—kun je het direct afsluiten met dit script.

**Waarom het belangrijk is:** Snel reageren is cruciaal. Dit blokkeert een apparaat om iets naar internet te sturen.

### Stap-voor-stap om het te maken

1. Nog steeds in `/opt/siem/scripts`, maak het scriptbestand:

```bash
sudo nano quarantine_device.sh
```

2. Plak dit:

```bash
#!/bin/bash

echo "Verbinding verbreken met $1..."
sudo iptables -A OUTPUT -s $1 -j DROP
```

3. Opslaan en afsluiten:

* Druk `Ctrl + O`, dan `Enter`
* Druk `Ctrl + X`

4. Maak het uitvoerbaar:

```bash
sudo chmod +x quarantine_device.sh
```

### Gebruik

Als het verdachte apparaat IP `192.168.1.50` heeft:

```bash
sudo /opt/siem/scripts/quarantine_device.sh 192.168.1.50
```

Het komt niet meer langs de poort.

## Zoeken naar verdachte zaken in Wazuh-logs

**Wat het doet:** Doorzoekt logs van je Wazuh-agent en haalt alles eruit gemarkeerd als "verdacht".

**Waarom het belangrijk is:** Ruwelogs lezen is pijnlijk. Dit geeft je een beknopt bestand met alleen de waarschuwingen.

### Stap-voor-stap

1. Maak het bestand:

```bash
sudo nano parse_logs.sh
```

2. Plak dit:

```bash
#!/bin/bash

mkdir -p /opt/siem/alerts
journalctl -u wazuh-agent | grep -i suspicious > /opt/siem/alerts/suspicious.log
```

3. Opslaan en afsluiten (`Ctrl + O`, `Enter`, `Ctrl + X`)

4. Maak het uitvoerbaar:

```bash
sudo chmod +x parse_logs.sh
```

### Automatiseer elk uur

```bash
crontab -e
```

Onderaan, voeg toe:

```
0 * * * * /opt/siem/scripts/parse_logs.sh
```

Nu controleert het elk uur de logs en bewaart alarmerende zaken in:

```
/opt/siem/alerts/suspicious.log
```

### Versleutel de resultaten (optioneel, maar aanbevolen)

Zorg dat alleen vertrouwde personen het kunnen lezen:

```bash
gpg -c /opt/siem/alerts/suspicious.log
```

Kies een sterk wachtwoord, bewaar het veilig.

## Uitvoeren op Android via Termux

Gebruikt wanneer een overlever een Android-apparaat heeft en je nuttige aanwijzingen wilt verzamelen.

**Op je server (waar anderen het kunnen downloaden):**

1. Maak het bestand:

```bash
sudo nano /opt/siem/scripts/setup_android.sh
```

2. Plak dit:

```bash
#!/data/data/com.termux/files/usr/bin/bash

echo "Android-aanwijzingen verzamelen..."

mkdir -p ~/ipa_siem_logs

pm list packages -f > ~/ipa_siem_logs/apps.txt
settings get global http_proxy > ~/ipa_siem_logs/proxy.txt
cat /data/misc/wifi/wpa_supplicant.conf > ~/ipa_siem_logs/wifi.txt 2>/dev/null
logcat -d > ~/ipa_siem_logs/logcat.txt

echo "✅ Klaar. Bestanden opgeslagen in ~/ipa_siem_logs/"
```

3. Maak het uitvoerbaar:

```bash
chmod +x /opt/siem/scripts/setup_android.sh
```

**Host het voor download:**

Vanuit `/opt/siem/scripts`:

```bash
python3 -m http.server 8000
```

**Op het Android-apparaat (in Termux):**

```bash
pkg update && pkg install curl
curl -s http://192.168.1.10:8000/setup_android.sh | bash
```

## Logs ophalen van jailbroken iPhone

Vereist:

* iPhone met **OpenSSH geïnstalleerd** via Cydia
* Je kent het IP-adres van de iPhone op het lokale Wi-Fi

Op de server

```bash
sudo nano /opt/siem/scripts/pull_ios_logs.sh
```

Plak dit:

```bash
#!/bin/bash

IP=$1
USER=mobile
DATE=$(date +"%Y-%m-%d_%H-%M")

mkdir -p /opt/siem/ios_logs/$DATE

scp -r ${USER}@${IP}:/var/mobile/Library/Logs/CrashReporter /opt/siem/ios_logs/$DATE/
scp ${USER}@${IP}:/var/log/syslog /opt/siem/ios_logs/$DATE/

echo "iPhone-logs opgeslagen in /opt/siem/ios_logs/$DATE"
```

Maak het uitvoerbaar:

```bash
chmod +x /opt/siem/scripts/pull_ios_logs.sh
```

Voer het zo uit:

```bash
/opt/siem/scripts/pull_ios_logs.sh 192.168.1.23
```

## Spyware-woorden zoeken in logs

```bash
sudo nano /opt/siem/scripts/watch_logs.sh
```

Plak dit:

```bash
#!/bin/bash

LOGDIR="/opt/siem/ios_logs"
ALERTS="/opt/siem/alerts"

mkdir -p $ALERTS

grep -rEi "spy|track|mirror|record|stalker|surveil|remote access" $LOGDIR > $ALERTS/suspicious.log

echo "Verdachte termen gevonden. Controleer $ALERTS/suspicious.log"
```

Maak het uitvoerbaar:

```bash
chmod +x /opt/siem/scripts/watch_logs.sh
```

## Bestanden verzamelen van USB-sticks

```bash
sudo nano /opt/siem/scripts/usb_intake.sh
```

Plak dit:

```bash
#!/bin/bash

MOUNT="/media/usb"
DEST="/opt/siem/manual_uploads/$(date +%F_%H%M)"
mkdir -p $DEST

cp -r $MOUNT/* $DEST

echo "Bestanden gekopieerd naar $DEST"
```

Maak het uitvoerbaar:

```bash
chmod +x /opt/siem/scripts/usb_intake.sh
```

## Alles uitvoeren

```bash
sudo nano /opt/siem/scripts/full_check.sh
```

Plak dit:

```bash
#!/bin/bash

/opt/siem/scripts/usb_intake.sh
/opt/siem/scripts/watch_logs.sh
```

Maak het uitvoerbaar:

```bash
chmod +x /opt/siem/scripts/full_check.sh
```
