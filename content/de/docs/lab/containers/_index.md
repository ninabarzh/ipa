---
title: "Sichere SIEM-Stack-Container einrichten"
linkTitle: "SIEM-Stack-Container"
weight: 4
_build:
  render: always
description: "Diese Anleitung beschreibt Schritt für Schritt die Einrichtung und Verwendung unserer vorgefertigten, gehärteten und produktionsreifen Container, die für On-Premise- und Cloud-Bereitstellung geeignet sind."
menu:
  sidebar:
    weight: 20
    identifier: "de-containers"
    parent: "de-lab"
translationKey: "containers"
---

Ein einsatzbereiter, gehärteter SIEM-Stack für Schutzunterkünfte und Krisenzentren: Überwacht Netzwerk und Endgeräte 
auf Eindringlinge, Stalkerware und andere Missbrauchssoftware – mit vorgefertigten Dashboards und täglichen 
Threat-Intel-Updates. 

---  

## Funktionen 

- Wazuh + Elasticsearch + Kibana SIEM-Stack  
- Zeek & Suricata zur Netzwerküberwachung mit speziellen Stalkerware-Regeln  
- Nur VPN-Zugriff (WireGuard) 
- TLS-Verschlüsselung zwischen allen Diensten  
- Vordefinierte RBAC-Konten (Admin, Viewer)  
- Tägliche Regel- und Threat-Intel-Updates  
- Verschlüsselte Nachtbackups auf lokale 500-GB-Festplatte  
- Vorgefertigte Kibana-Dashboards für:  
  - Bedrohungsüberblick  
  - Stalkerware-Watchlist  
  - Netzwerkanomalien  
  - Hochrisiko-Geräte  

---  

## Anforderungen

**Host-System:**  
- Linux-Server (getestet mit Debian 12, Ubuntu 22.04 LTS, Rocky Linux 9)  
- Docker + Docker Compose v2  
- **Mindestanforderungen:**  
  - CPU: 4 Kerne (8+ empfohlen)  
  - RAM: 8 GB (16 GB empfohlen)  
  - Speicher: 200 GB SSD für Daten + **separate 500-GB-Festplatte** für Backups  
- **Dedizierte Netzwerkkarte für Monitoring (Sniffing):**  
  - Zweite Netzwerkkarte, die mit dem zu überwachenden Netzwerk verbunden ist  
  - **Darf keine IP-Adresse haben**  
  - Beispiel: `eth1` unter Linux  
  - Kann ein USB-3.0-Gigabit-Ethernet-Adapter sein, falls kein PCIe-Slot frei ist  
- Internetverbindung (für Regel-Updates, außer bei Offline-Nutzung)  

**Client-Geräte (für VPN-Zugriff):**  
- WireGuard-Client installiert (Windows, macOS, Linux, iOS oder Android)  

---

## Erstinstallation

### 1. Repository klonen

```bash
git clone https://github.com/ninabarzh/secure-shelter-siem-stack.git
cd secure-shelter-siem-stack
```

### 2. Umgebungsvariablen kopieren und anpassen

```bash
cp .env.example .env
nano .env
```

Sichere Passwörter setzen für:

* `ELASTIC_PASSWORD`
* `KIBANA_PASSWORD`
* `WAZUH_PASSWORD`

### 3. WireGuard VPN starten (erforderlich)

Zugriff auf Kibana, Elasticsearch und Wazuh erfolgt **ausschließlich über das VPN** – keine Dienste sind öffentlich erreichbar.

Im Repository-Stammverzeichnis:

```bash
docker-compose up -d vpn
```

Der VPN-Server lauscht auf UDP/51820.
Das standardmäßige VPN-Subnetz-Gateway ist `10.13.13.1`.

### 4. VPN-Peers hinzufügen (Mitarbeiter, Responder, Remote-Agents)

Neuen Peer anlegen:

```bash
./vpn/add-peer.sh <peer-name>
```

Beispiel:

```bash
./vpn/add-peer.sh alice
```

Dies führt folgende Schritte aus:

* Erstellt einen WireGuard-Peer namens `alice`
* Weist eine IP im VPN-Subnetz zu
* Speichert die Konfiguration unter `vpn/alice.conf`

**`alice.conf` sicher an den Nutzer übermitteln** – die Datei kann im WireGuard-Client (Windows, macOS, Linux, Android oder iOS) importiert werden.

### 5. TLS-Zertifikate für Elasticsearch generieren

Ausführen:

```bash
./scripts/gen-certs.sh
```

Erstellt:

```
config/elasticsearch/certs/elastic-stack-ca.p12
config/elasticsearch/certs/elastic-certificates.p12
```

Das Passwort wird in `.env` gesetzt – bei Bedarf anpassen.

### 6. Erkennungsregeln aktualisieren

Aktuelle Suricata-Regeln beziehen:

```bash
./scripts/update-rules.sh
```

Quellen:

* Emerging Threats (v7.0.3)
* AbuseCH SSL-Blacklist
* Lokale `custom.rules` für Stalkerware-Erkennung

### 7. SIEM-Stack bereitstellen

```bash
./scripts/deploy.sh
```

Startet:

* Elasticsearch mit TLS
* Kibana (importiert Dashboards aus `config/dashboards/`)
* Wazuh Manager
* Suricata & Zeek
* Filebeat mit TLS zu Elasticsearch

### 8. Auf Dashboards zugreifen (über VPN)

Mit der Peer-Konfiguration zum VPN verbinden, dann aufrufen:

```
http://10.13.13.1:5601
```

Anmeldung:

* **Benutzername:** `kibana_system` (aus `.env`)
* **Passwort:** Ihr `KIBANA_PASSWORD`

Verfügbare Dashboards:

* **Threat Overview**: Alarme aller Quellen
* **High Risk Devices**: Endgeräte mit wiederholten Detektionen
* **Network Anomalies**: Verdächtige Verkehrsmuster
* **Stalkerware Watchlist**: Erkennungen für BadBox, mFly, FlexiSpy, Spynger

### 9. Wazuh-Agents bereitstellen

Auf einem überwachten Endgerät (innerhalb des VPN oder lokalen Netzwerks):

```bash
curl -so wazuh-agent.deb https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_4.12.0-1_amd64.deb \
 && sudo WAZUH_MANAGER='10.13.13.1' dpkg -i ./wazuh-agent.deb \
 && sudo systemctl enable wazuh-agent --now
```

### 10. Netzwerkschnittstellen-Anforderungen

Bei Nutzung von Suricata/Zeek im Paketerfassungsmodus:

* `SNIFFING_INTERFACE` in `.env` setzen (z.B. `eth1`)
* Schnittstelle in Promiscuous-Modus versetzen:

```bash
sudo ip link set eth1 promisc on
```

Bereit zur Überwachung, Erkennung und Abwehr.

---

## Dashboards

Nach dem ersten Login sehen Sie:  

* **Bedrohungsübersicht:** Zusammenfassung aller Warnmeldungen  
* **Stalkerware-Watchlist:** Erkennungen von BadBox, BadBox2, mFly, FlexiSpy, Spynger und anderen  
* **Netzwerkanomalien:** Suricata/Zeek-Ereignisse außerhalb normaler Muster  
* **Hochrisiko-Geräte:** Endgeräte mit mehreren Stalkerware-Indikatoren  

---  

## Backups 

* Laufen täglich um 02:00 Uhr  
* Mit GPG verschlüsselt  
* Gespeichert auf `/mnt/secure-backup` (500 GB Festplatte)  
* Beim ersten Lauf wird `config/backup/backup-key.gpg` generiert  
* **Kopieren Sie den Schlüssel auf einen USB-Stick und bewahren Sie ihn sicher auf** – ohne ihn können Backups nicht wiederhergestellt werden  

### Wiederherstellung  

```bash
gpg --import config/backup/backup-key.gpg
gpg --decrypt /mnt/secure-backup/shelter-siem-YYYY-MM-DD_HH-MM.tar.gz.gpg | tar -xz -C data/
```  

---  

## Wartung  

* **Stack stoppen**: `./scripts/stop.sh`
* **Daten sichern**: Läuft nächtlich nach `/mnt/secure-backup`
* **Backup wiederherstellen**: `./scripts/restore-backup.sh`

### Regeln manuell aktualisieren  

```bash
./scripts/update-rules.sh
docker compose restart suricata zeek
```  

### Stack aktualisieren  

```bash
docker compose pull && docker compose up -d
```  

---  

## Sicherheitshinweise

* Alle Standardpasswörter in `.env` vor der Bereitstellung ändern
* VPN-Peer-Konfigurationen sicher aufbewahren
* Elasticsearch-TLS-Zertifikate privat halten
* Speicherverbrauch überwachen (`./data/elasticsearch`) – alte Indizes bei Bedarf bereinigen
* Der Zugriff erfolgt ausschließlich über VPN – niemals die Ports 9200, 5601 oder 55000 dem Internet aussetzen  
* Bewahren Sie die Backup-Festplatte physisch gesichert auf  
* Testen Sie regelmäßig VPN-Konfigurationen und Backups  