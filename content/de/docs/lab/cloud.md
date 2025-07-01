---
title: "Einrichtung eines privaten Cloud-Sicherheitssystems"
weight: 6
translationKey: "cloud"
_build:
  render: always
menu:
  sidebar:
    weight: 30
description: "Diese Anleitung führt Sie durch die Bereitstellung des SIEM-Stacks in einer privaten Cloud – ideal für Schutzräume oder Interessenvertretungen mit mehreren Standorten. Sie erhalten Fernzugriff, zentrales Monitoring und dieselben Überwachungserkennungs-Tools – ohne die Datenhoheit an Big Tech abzugeben."
---

Wir gehen davon aus, dass Sie grundlegenden Admin-Zugang zum Cloud-Server haben – oder einen hilfsbereiten Nerd kennen, der das hat.

## Was Sie benötigen

### Einen sicheren Cloud-Server

* Anbieterbeispiele: Hetzner, Netcup, 1984 Hosting (meiden Sie AWS/Azure/Google, außer wenn gesetzlich vorgeschrieben)
* Empfohlene Spezifikationen:

  * 8+ GB RAM
  * 4 CPU-Kerne
  * 100 GB SSD
  * Ubuntu 22.04 LTS
* Gehärtet mit:

  * Fail2ban
  * Automatische Updates
  * UFW (Firewall)

### VPN-Zugang

* Alle Schutzraum-Standorte müssen sichere VPN-Tunnel verwenden, um den Cloud-Server zu erreichen.
* WireGuard oder OpenVPN sind beide geeignet.

### Geräte von Betroffenen

Wie in der Vor-Ort-Variante: Windows, macOS, Android (gerootet bevorzugt), iOS (jailbroken oder Backups)

### Optional: PiRogue-Werkzeugkasten

Nützlich in Kliniken oder Außenstellen für lokale Gerätescans.

## Schritt-für-Schritt-Einrichtung

### Cloud-Server härten

```bash
# Server aktualisieren
sudo apt update && sudo apt upgrade -y

# Basis-Sicherheit installieren
sudo apt install fail2ban ufw unattended-upgrades -y
sudo ufw allow ssh
sudo ufw enable
````

### IPA-SIEM-Stack installieren

Gleich wie bei Vor-Ort:

```bash
# Wazuh-Repo hinzufügen
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | sudo gpg --dearmor -o /usr/share/keyrings/wazuh.gpg
echo \"deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main\" | sudo tee /etc/apt/sources.list.d/wazuh.list
sudo apt update

# Komponenten installieren
sudo apt install -y wazuh-manager wazuh-api elasticsearch kibana

# Dienste starten
sudo systemctl enable --now wazuh-manager elasticsearch kibana
```

### Sicheren Zugriff aktivieren

#### VPN einrichten (Beispiel: WireGuard)

```bash
sudo apt install wireguard -y
# (Schlüssel generieren, mit Standorten teilen. Port 51820 verwenden.)
```

#### Wazuh-Dashboard aufrufen

* Öffnen Sie Kibana unter `https://your-cloud-ip:5601`
* HTTPS mit Let’s Encrypt konfigurieren, wenn möglich

## Geräte aus der Ferne verbinden

### Windows/macOS

* Agenten auf Geräten in den Schutzräumen installieren
* Agent über VPN mit Ihrer Cloud-IP verbinden

### Android (gerootet über Termux)

```bash
pkg update && pkg install curl git
curl -s https://your-cloud-ip/setup_android.sh | bash
```

### Android (nicht gerootet)

Direktes Monitoring ist eingeschränkt, aber manuelle Extraktion und Upload sind möglich.

#### Option 1: ADB (Android Debug Bridge) verwenden

1. **ADB auf dem Rechner installieren**:

```bash
sudo apt install android-tools-adb
```

2. **USB-Debugging aktivieren**:

   * Einstellungen > Über das Telefon > Build-Nummer 7x tippen
   * Entwickleroptionen öffnen
   * USB-Debugging aktivieren

3. **Gerät via USB verbinden**

4. **Logs sammeln**:

```bash
adb devices
adb logcat -d > android_logcat.txt
adb shell dumpsys > android_dumpsys.txt
adb shell pm list packages -f > installed_packages.txt
```

5. **Logs hochladen**:

```bash
scp android_*.txt youruser@your-ipasiem.cloud:/opt/forensics/android_logs/
```

6. **(Optional) Verschlüsseln vor dem Upload**

```bash
gpg -c android_logcat.txt
```

#### Option 2: Shelter-Tablet-Sammler

1. Auf dem Android-Gerät mithilfe von „Dateien“ oder „CX File Explorer“:

   * Navigieren zu `/Download`, `/WhatsApp/`, `/DCIM/`
   * Logs, Screenshots und Medien kopieren

2. Übertragen per USB oder SD-Karte an Tablet

3. Sicherer Upload zum Server via `scp` oder Upload-Skript

### iOS (jailbroken oder via Backup)

```bash
# Backup auf dem Client
idevicebackup2 backup /tmp/device_backup
# Upload zum Cloud-Server
scp /tmp/device_backup user@your-cloud-ip:/opt/backups/
```

## PiRogue für Triage (optional)

* PiRogue an entfernten Standorten einsetzen
* Logs/pcap sicher senden:

```bash
scp suspicious.pcap user@your-cloud-ip:/opt/forensics/
```

* Analyse mit `tshark` oder Kibana-Dashboards

## Laufende Wartung

* WireGuard-Schlüssel alle 90 Tage rotieren
* Tägliche Log-Backups:

```bash
tar -czf /opt/backup/siem_logs_$(date +%F).tar.gz /var/ossec/logs/
```

* Verschlüsseln mit GPG oder age:

```bash
gpg -c /opt/backup/siem_logs_*.tar.gz
```

* Cronjobs für Parsing und Auto-Alerts einrichten

## Zusammenfassung

Diese Einrichtung ermöglicht sichere, zentrale Bedrohungserkennung an mehreren Standorten – ohne Abhängigkeit von Cloud-Diensten Dritter. Die Daten bleiben bei Ihnen, verschlüsselt und unter Kontrolle. Es erfordert Wartung (VPN, Benutzerverwaltung), senkt aber lokale Risiken erheblich und schützt die Privatsphäre der Betroffenen.

Mit etwas Schulung können technisch versierte Mitarbeitende den Betrieb übernehmen, während Spezialisten Upgrades und Forensik aus der Ferne unterstützen.
