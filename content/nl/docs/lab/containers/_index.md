---
title: "Beveiligde SIEM-stackcontainers opzetten"
linkTitle: "SIEM-stackcontainers"
weight: 4
_build:
  render: always
description: "Deze handleiding beschrijft stap voor stap het opzetten en gebruiken van onze vooraf gemaakte, beveiligde en productieklare containers, geschikt voor on-premise- en cloudimplementaties."
menu:
  sidebar:
    weight: 20
    identifier: "nl-containers"
    parent: "nl-lab"
translationKey: "containers"
---

Een kant-en-klare, beveiligde SIEM-stack voor opvangcentra en crisisopvang: Monitort netwerk en endpoints op 
inbraken, stalkerware en andere schadelijke software - met vooraf gebouwde dashboards en dagelijkse threat 
intelligence updates.

---

## Kenmerken

- Wazuh + Elasticsearch + Kibana SIEM-stack
- Netwerkmonitoring met Zeek & Suricata en aangepaste stalkerware-regels
- Alleen VPN-toegang (WireGuard)
- TLS-versleuteling tussen alle services
- Vooraf ingestelde RBAC-accounts (admin, viewer)
- Dagelijkse regel- en threat intelligence-updates
- Versleutelde nachtelijke back-ups naar lokale 500 GB schijf
- Voorgebouwde Kibana-dashboards voor:
  - Dreigingsoverzicht
  - Stalkerware-waaklijst
  - Netwerkanomalieën
  - Hoogrisico-apparaten

---

## Vereisten

**Hostsysteem:**
- Linux-server (getest met Debian 12, Ubuntu 22.04 LTS, Rocky Linux 9)
- Docker + Docker Compose v2
- **Minimale specificaties:**
  - CPU: 4 kernen (8+ aanbevolen)
  - RAM: 8 GB (16 GB aanbevolen)
  - Opslag: 200 GB SSD voor data + **aparte 500 GB schijf** voor back-ups
- **Dedicated sniffing NIC:**
  - Tweede netwerkkaart aangesloten op te monitoren netwerk
  - **Mag geen IP-adres hebben**
  - Voorbeeld: `eth1` op Linux
  - Kan een USB 3.0 Gigabit Ethernet-adapter zijn bij geen vrije PCIe-slot
- Internetverbinding (voor regelupdates, tenzij offline feed gebruikt wordt)

**Clientapparaten (voor VPN-toegang):**
- WireGuard-client geïnstalleerd (Windows, macOS, Linux, iOS of Android)

---

## ## Eerste installatie

### 1. Kloon de repository

```bash
git clone https://github.com/ninabarzh/secure-shelter-siem-stack.git
cd secure-shelter-siem-stack
```

### 2. Kopieer en bewerk omgevingsvariabelen

```bash
cp .env.example .env
nano .env
```

Stel veilige wachtwoorden in voor:

* `ELASTIC_PASSWORD`
* `KIBANA_PASSWORD`
* `WAZUH_PASSWORD`

### 3. Start de WireGuard VPN (verplicht)

Alle toegang tot Kibana, Elasticsearch en Wazuh verloopt **via de VPN** - niets is blootgesteld aan het openbare internet.

Vanuit de hoofdmap van de repository:

```bash
docker-compose up -d vpn
```

De VPN-server luistert op UDP/51820.
De standaard VPN-subnetgateway is `10.13.13.1`.

### 4. Voeg VPN-peers toe (medewerkers, responders, remote agents)

Om een nieuwe peer toe te voegen:

```bash
./vpn/add-peer.sh <peer-naam>
```

Voorbeeld:

```bash
./vpn/add-peer.sh alice
```

Dit zal:

* Een WireGuard-peer aanmaken genaamd `alice`
* Er een IP toewijzen in het VPN-subnet
* De configuratie opslaan in `vpn/alice.conf`

**Verstuur `alice.conf` beveiligd** naar de gebruiker - deze kan het importeren in de WireGuard-client op Windows, macOS, Linux, Android of iOS.

### 5. Genereer TLS-certificaten voor Elasticsearch

Voer uit:

```bash
./scripts/gen-certs.sh
```

Maakt aan:

```
config/elasticsearch/certs/elastic-stack-ca.p12
config/elasticsearch/certs/elastic-certificates.p12
```

Wachtwoord is ingesteld in `.env` - wijzig dit indien gewenst.

### 6. Update detectieregels

Haal de nieuwste Suricata-regels op:

```bash
./scripts/update-rules.sh
```

Bronnen:

* Emerging Threats (v7.0.3)
* AbuseCH SSL blacklist
* Lokale `custom.rules` voor stalkerware-detectie

### 7. Implementeer de SIEM-stack

```bash
./scripts/deploy.sh
```

Start:

* Elasticsearch met TLS
* Kibana (importeert dashboards van `config/dashboards/`)
* Wazuh Manager
* Suricata & Zeek
* Filebeat met TLS naar Elasticsearch

### 8. Toegang tot dashboards (via VPN)

Verbind met de VPN met je peer-config, open dan:

```
http://10.13.13.1:5601
```

Login:

* **Gebruikersnaam:** `kibana_system` (uit `.env`)
* **Wachtwoord:** jouw `KIBANA_PASSWORD`

Beschikbare dashboards:

* **Threat Overview**: alerts van alle bronnen
* **High Risk Devices**: endpoints met herhaalde detecties
* **Network Anomalies**: verdachte verkeerspatronen
* **Stalkerware Watchlist**: detecties voor BadBox, mFly, FlexiSpy, Spynger

### 9. Implementeer Wazuh-agents

Op een bewaakt endpoint (binnen VPN of lokaal netwerk):

```bash
curl -so wazuh-agent.deb https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_4.12.0-1_amd64.deb \
 && sudo WAZUH_MANAGER='10.13.13.1' dpkg -i ./wazuh-agent.deb \
 && sudo systemctl enable wazuh-agent --now
```

### 10. Netwerkinterface vereisten

Bij gebruik van Suricata/Zeek in packet capture-modus:

* Stel `SNIFFING_INTERFACE` in in `.env` (bijv. `eth1`)
* Zet interface in promiscuous mode:

```bash
sudo ip link set eth1 promisc on
```

Klaar om te monitoren, detecteren en verdedigen.

---

## Dashboards

Na het eerste inloggen ziet u:

* **Bedreigingsoverzicht:** Samenvatting van alle waarschuwingen
* **Stalkerware-waaklijst:** Detecties van BadBox, BadBox2, mFly, FlexiSpy, Spynger en andere
* **Netwerkanomalieën:** Suricata/Zeek-gebeurtenissen buiten normale patronen
* **Hoogrisico-apparaten:** Eindpunten met meerdere stalkerware-indicatoren

---

## Backups

* Draait elke nacht om 02:00
* Versleuteld met GPG
* Opgeslagen op `/mnt/secure-backup` (500 GB schijf)
* Bij eerste uitvoering wordt `config/backup/backup-key.gpg` gegenereerd
* **Kopieer de sleutel naar een USB-stick en berg deze veilig op** - zonder deze kunnen back-ups niet worden hersteld

### Herstellen

```bash
gpg --import config/backup/backup-key.gpg
gpg --decrypt /mnt/secure-backup/shelter-siem-YYYY-MM-DD_HH-MM.tar.gz.gpg | tar -xz -C data/
```

---

## Onderhoud

* **Stop stack**: `./scripts/stop.sh`
* **Backup data**: draait nachtelijks naar `/mnt/secure-backup`
* **Herstel backup**: `./scripts/restore-backup.sh`

### Regels handmatig bijwerken

```bash
./scripts/update-rules.sh
docker compose restart suricata zeek
```

### Stack bijwerken

```bash
docker compose pull && docker compose up -d
```

---

## Beveiligingsnotities

* Wijzig alle standaardwachtwoorden in `.env` voor implementatie
* Bewaar VPN-peerconfigs veilig
* Houd Elasticsearch TLS-certificaten privé
* Monitor schijfgebruik (`./data/elasticsearch`) - verwijder oude indices wanneer nodig
* Alle toegang verloopt via VPN - stel nooit poorten 9200, 5601, 55000 bloot aan internet
* Bewaar de back-upschijf fysiek beveiligd
* Test regelmatig VPN-configuraties en back-ups
