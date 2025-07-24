---
title: "Hoe een privé cloud beveiligingssysteem op te zetten"
weight: 6
translationKey: "cloud"
_build:
  render: always
menu:
  sidebar:
    weight: 30
description: "Deze gids leidt je door het uitrollen van de SIEM-stack in een private cloud – ideaal voor opvanglocaties of belangenorganisaties die op meerdere locaties actief zijn. Je krijgt remote toegang, gecentraliseerde monitoring en dezelfde tools voor surveillance-detectie – zonder dat je de controle over je data aan grote techbedrijven hoeft te geven."
---

We gaan ervan uit dat je basale adminrechten hebt op je cloudserver, of een vriendelijke nerd die dat voor je regelt.

## Wat je nodig hebt

### Een veilige cloudserver

* Voorbeelden van providers: Hetzner, Netcup, 1984 Hosting (vermijd AWS/Azure/Google tenzij wettelijk verplicht)
* Aanbevolen specificaties:

  * 8+ GB RAM  
  * 4 CPU-cores  
  * 100 GB SSD  
  * Ubuntu 22.04 LTS

* Beveiligd met:

  * Fail2ban  
  * Automatische updates  
  * UFW (firewall)

### VPN-toegang

* Alle opvanglocaties moeten via beveiligde VPN-tunnels verbinding maken met de cloudserver.  
* WireGuard of OpenVPN zijn prima keuzes.

### Apparaten van overlevenden

Zoals bij de on-prem versie: Windows, macOS, Android (bij voorkeur geroot), iOS (jailbroken of backups)

### Optioneel: PiRogue toolkit

Te gebruiken in klinieken of satellietkantoren voor lokale apparaat-scans.

## Stapsgewijze installatie

### Hardening van je cloudserver

```bash
# Server updaten
sudo apt update && sudo apt upgrade -y

# Basisbeveiliging installeren
sudo apt install fail2ban ufw unattended-upgrades -y
sudo ufw allow ssh
sudo ufw enable
````

### SIEM stack installeren

Net als on-prem:

```bash
# Wazuh repo toevoegen
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | sudo gpg --dearmor -o /usr/share/keyrings/wazuh.gpg
echo \"deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main\" | sudo tee /etc/apt/sources.list.d/wazuh.list
sudo apt update

# Componenten installeren
sudo apt install -y wazuh-manager wazuh-api elasticsearch kibana

# Diensten starten
sudo systemctl enable --now wazuh-manager elasticsearch kibana
```

### Veilige toegang instellen

#### VPN instellen (voorbeeld WireGuard)

```bash
sudo apt install wireguard -y
# (Genereer sleutels, deel met elke locatie. Gebruik poort 51820.)
```

#### Wazuh dashboard openen

* Open Kibana op `https://your-cloud-ip:5601`
* Configureer HTTPS met Let’s Encrypt indien mogelijk

## Verbind apparaten op afstand

### Windows/macOS

* Download en installeer agents op apparaten in de opvanglocaties
* Configureer agent om via VPN met je cloud-IP te verbinden

### Android (geroot via Termux)

```bash
pkg update && pkg install curl git
curl -s https://your-cloud-ip/setup_android.sh | bash
```

### Android (niet geroot)

Directe monitoring is beperkt, maar je kunt nog steeds handmatig bruikbare info verzamelen en veilig uploaden.

#### Optie 1: Gebruik ADB (Android Debug Bridge)

1. **Bereid je computer voor**:

```bash
sudo apt install android-tools-adb
```

2. **USB-debugging inschakelen**:

   * Ga naar **Instellingen > Over telefoon**
   * Tik 7 keer op **Buildnummer**
   * Schakel **Ontwikkelaarsopties > USB-debugging** in

3. **Verbind telefoon via USB**

4. **Verzamel logs en data**:

```bash
adb devices
adb logcat -d > android_logcat.txt
adb shell dumpsys > android_dumpsys.txt
adb shell pm list packages -f > installed_packages.txt
```

5. **Upload logs veilig**:

```bash
scp android_*.txt youruser@your-siem.cloud:/opt/forensics/android_logs/
```

6. **(Optioneel) Versleutel voor upload**

```bash
gpg -c android_logcat.txt
```

#### Optie 2: Shelter tablet collector

1. Gebruik op Android de app **Bestanden** of **CX File Explorer** om:

   * Naar `/Download`, `/WhatsApp/` en `/DCIM/` te navigeren
   * Logs, screenshots en verdachte media te kopiëren

2. Verplaats deze via USB of SD-kaart naar de intake tablet

3. Upload ze veilig naar de SIEM cloudserver (via `scp` of uploadscript)

### iOS (jailbroken of via backup)

```bash
# Backup maken op client-machine
idevicebackup2 backup /tmp/device_backup
# Veilig versturen naar cloudserver
scp /tmp/device_backup user@your-cloud-ip:/opt/backups/
```

## Triageren met PiRogue (optioneel)

* Zet PiRogue in op externe locaties
* Verstuur pcap of logs veilig naar cloud:

```bash
scp suspicious.pcap user@your-cloud-ip:/opt/forensics/
```

* Analyseer met `tshark` of Kibana dashboards

## Doorlopende onderhoud

* Wissel WireGuard sleutels elke 90 dagen
* Maak dagelijkse log-backups:

```bash
tar -czf /opt/backup/siem_logs_$(date +%F).tar.gz /var/ossec/logs/
```

* Versleutel met GPG of age:

```bash
gpg -c /opt/backup/siem_logs_*.tar.gz
```

* Plan cronjobs voor parsing en automatische alerts

## Samenvatting

Deze opzet biedt veilige, gecentraliseerde dreigingsdetectie op meerdere locaties, zonder afhankelijkheid van derde partij cloudtools. Alle data blijft bij jou, versleuteld en onder controle.

Het vraagt wel onderhoud (VPN, gebruikersbeheer), maar verlaagt het lokale risico fors en beschermt de privacy van overlevenden. Met wat training kunnen technisch onderlegde medewerkers het dagelijks beheer doen, terwijl specialisten upgrades en diepere forensische ondersteuning op afstand leveren.
