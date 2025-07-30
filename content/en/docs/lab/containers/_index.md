---
title: "Setting up secure SIEM stack containers"
linkTitle: "SIEM stack containers"
weight: 4
_build:
  render: always
description: "This guide covers the step-by-step process of setting up and using our pre-made hardened, production-ready containers, suitable for on-premise and cloud deployment."
menu:
  sidebar:
    weight: 20
    identifier: "en-containers"
    parent: "en-lab"
translationKey: "containers"
---


A ready-to-use, hardened SIEM stack for shelters and crisis centres: Monitors network and endpoints for intrusions, 
stalkerware, and other abuseware — with pre‑built dashboards and daily threat intel updates.

---

## Features

- Wazuh + Elasticsearch + Kibana SIEM stack
- Zeek & Suricata network monitoring with custom stalkerware rules
- VPN‑only access (WireGuard)
- TLS between all services
- Pre‑set RBAC accounts (admin, viewer)
- Daily rule and intel updates
- Encrypted nightly backups to local 500 GB disk
- Pre‑built Kibana dashboards for:
  - Threat overview
  - Stalkerware watchlist
  - Network anomalies
  - High‑risk devices

---

## Requirements

**Host system:**
- Linux server (Debian 12, Ubuntu 22.04 LTS, Rocky Linux 9 tested)
- Docker + Docker Compose v2
- Minimum:
  - CPU: 4 cores (8+ recommended)
  - RAM: 8 GB (16 GB recommended)
  - Storage: 200 GB SSD for data + **separate 500 GB disk** for backups
- **Dedicated sniffing NIC**:
  - A second network interface card connected to the network you want to monitor
  - Must not have an IP address assigned
  - Example: `eth1` on Linux
  - Can be a USB 3.0 Gigabit Ethernet adapter if no free PCIe slot
- Internet connection (for rule updates, unless using offline feed)

**Client devices (for VPN access):**

- WireGuard client installed (Windows, macOS, Linux, iOS, or Android)

---

## First‑time setup

### 1. Clone the repository

```bash
git clone https://github.com/ninabarzh/secure-shelter-siem-stack.git
cd secure-shelter-siem-stack
```

### 2. Copy and edit environment variables

```bash
cp .env.example .env
nano .env
```

Set secure passwords for:

* `ELASTIC_PASSWORD`
* `KIBANA_PASSWORD`
* `WAZUH_PASSWORD`

### 3. Start the WireGuard VPN (required)

All access to Kibana, Elasticsearch, and Wazuh is **through the VPN** — nothing is exposed to the public internet.

From the repo root:

```bash
docker-compose up -d vpn
```

The VPN server listens on UDP/51820.
The default VPN subnet gateway is `10.13.13.1`.

### 4. Add VPN peers (staff, responders, remote agents)

To add a new peer:

```bash
./vpn/add-peer.sh <peer-name>
```

Example:

```bash
./vpn/add-peer.sh alice
```

This will:

* Create a WireGuard peer named `alice`
* Assign it an IP in the VPN subnet
* Save the configuration to `vpn/alice.conf`

**Send `alice.conf` securely** to the user — they can import it into the WireGuard client on Windows, macOS, Linux, Android, or iOS.

### 5. Generate TLS certificates for Elasticsearch

Run:

```bash
./scripts/gen-certs.sh
```

Creates:

```
config/elasticsearch/certs/elastic-stack-ca.p12
config/elasticsearch/certs/elastic-certificates.p12
```

Password is set in `.env` — change it if you wish.

### 6. Update detection rules

Fetch latest Suricata rules:

```bash
./scripts/update-rules.sh
```

Sources:

* Emerging Threats (v7.0.3)
* AbuseCH SSL blacklist
* Local `custom.rules` for stalkerware detection

### 7. Deploy the SIEM stack

```bash
./scripts/deploy.sh
```

Starts:

* Elasticsearch with TLS
* Kibana (imports dashboards from `config/dashboards/`)
* Wazuh Manager
* Suricata & Zeek
* Filebeat with TLS to Elasticsearch

### 8. Access dashboards (via VPN)

Connect to the VPN with your peer config, then open:

```
http://10.13.13.1:5601
```

Login:

* **Username:** `kibana_system` (from `.env`)
* **Password:** your `KIBANA_PASSWORD`

Dashboards available:

* **Threat Overview**: alerts across all sources
* **High Risk Devices**: endpoints with repeated detections
* **Network Anomalies**: suspicious traffic patterns
* **Stalkerware Watchlist**: detections for BadBox, mFly, FlexiSpy, Spynger

### 9. Deploy Wazuh agents

On a monitored endpoint (inside VPN or local network):

```bash
curl -so wazuh-agent.deb https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_4.12.0-1_amd64.deb \
 && sudo WAZUH_MANAGER='10.13.13.1' dpkg -i ./wazuh-agent.deb \
 && sudo systemctl enable wazuh-agent --now
```

### 10. Network interface requirements

If using Suricata/Zeek in packet capture mode:

* Set `SNIFFING_INTERFACE` in `.env` (e.g., `eth1`)
* Put interface in promiscuous mode:

```bash
sudo ip link set eth1 promisc on
```

Ready to monitor, detect, and defend.

---

## Dashboards

After first login, you will see:

* **Threat Overview:** Summary of all alerts
* **Stalkerware Watchlist:** Detections for BadBox, BadBox2, mFly, FlexiSpy, Spynger, and others
* **Network Anomalies:** Suricata/Zeek events outside normal patterns
* **High‑risk Devices:** Endpoints with multiple stalkerware indicators

---

## Backups

* Run nightly at 02:00
* Encrypted with GPG
* Stored on `/mnt/secure-backup` (500 GB disk)
* On first run, generates `config/backup/backup-key.gpg`
* **Copy the key to a USB stick and lock it away** — without it, backups cannot be restored

### Restore

```bash
gpg --import config/backup/backup-key.gpg
gpg --decrypt /mnt/secure-backup/shelter-siem-YYYY-MM-DD_HH-MM.tar.gz.gpg | tar -xz -C data/
```

---

## Maintenance

* **Stop stack**: `./scripts/stop.sh`
* **Backup data**: runs nightly to `/mnt/secure-backup`
* **Restore backup**: `./scripts/restore-backup.sh`

### Update rules manually

```bash
./scripts/update-rules.sh
docker compose restart suricata zeek
```

### Update stack

```bash
docker compose pull && docker compose up -d
```

---

## Security notes

* Change all default passwords in `.env` before deployment
* Store VPN peer configs securely
* Keep Elasticsearch TLS certs private
* Monitor disk usage (`./data/elasticsearch`) — prune old indices when needed
* All access is via VPN — never expose ports 9200, 5601, 55000 to the internet
* Keep the backup disk physically secure
* Regularly test VPN configs and backups