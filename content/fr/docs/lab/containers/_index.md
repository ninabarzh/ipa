---
title: "Configuration de conteneurs SIEM sécurisés"
linkTitle: "Conteneurs SIEM stack"
weight: 4
_build:
  render: always
description: "Ce guide détaille étape par étape la configuration et l'utilisation de nos conteneurs prêts à l'emploi, durcis et adaptés à la production, convenant aux déploiements sur site et dans le cloud."
menu:
  sidebar:
    weight: 20
    identifier: "fr-containers"
    parent: "fr-lab"
translationKey: "containers"
---

Une solution SIEM prête à l'emploi et sécurisée pour les refuges et centres de crise : Surveille le réseau et les 
terminaux contre les intrusions, les logiciels espions (stalkerware) et autres logiciels malveillants - avec des 
tableaux de bord préconfigurés et des mises à jour quotidiennes de renseignements sur les menaces.

---

## Fonctionnalités

- Stack SIEM Wazuh + Elasticsearch + Kibana
- Surveillance réseau avec Zeek & Suricata et règles personnalisées pour stalkerware
- Accès exclusif par VPN (WireGuard)
- TLS entre tous les services
- Comptes RBAC préconfigurés (admin, viewer)
- Mises à jour quotidiennes des règles et des renseignements
- Sauvegardes nocturnes chiffrées sur un disque local de 500 Go
- Tableaux de bord Kibana préconfigurés pour :
  - Aperçu des menaces
  - Liste de surveillance des stalkerwares
  - Anomalies réseau
  - Appareils à haut risque

---

## Exigences

**Système hôte :**
- Serveur Linux (testé avec Debian 12, Ubuntu 22.04 LTS, Rocky Linux 9)
- Docker + Docker Compose v2
- **Configuration minimale :**
  - CPU : 4 cœurs (8+ recommandés)
  - RAM : 8 Go (16 Go recommandés)
  - Stockage : 200 Go SSD pour les données + **disque séparé de 500 Go** pour les sauvegardes
- **Carte réseau dédiée pour la surveillance (sniffing) :**
  - Une deuxième carte réseau connectée au réseau à surveiller
  - **Ne doit pas avoir d'adresse IP attribuée**
  - Exemple : `eth1` sous Linux
  - Peut être un adaptateur USB 3.0 Gigabit Ethernet si aucun slot PCIe n'est disponible
- Connexion Internet (pour les mises à jour des règles, sauf en mode hors ligne)

**Appareils clients (pour l'accès VPN) :**
- Client WireGuard installé (Windows, macOS, Linux, iOS ou Android)

---

## ## Configuration initiale

### 1. Cloner le dépôt

```bash
git clone https://github.com/ninabarzh/secure-shelter-siem-stack.git
cd secure-shelter-siem-stack
```

### 2. Copier et modifier les variables d'environnement

```bash
cp .env.example .env
nano .env
```

Définir des mots de passe sécurisés pour :

* `ELASTIC_PASSWORD`
* `KIBANA_PASSWORD`
* `WAZUH_PASSWORD`

### 3. Démarrer le VPN WireGuard (requis)

Tous les accès à Kibana, Elasticsearch et Wazuh se font **via le VPN** — rien n'est exposé à Internet public.

Depuis la racine du dépôt :

```bash
docker-compose up -d vpn
```

Le serveur VPN écoute sur UDP/51820.
La passerelle par défaut du sous-réseau VPN est `10.13.13.1`.

### 4. Ajouter des pairs VPN (personnel, répondeurs, agents distants)

Pour ajouter un nouveau pair :

```bash
./vpn/add-peer.sh <nom-du-pair>
```

Exemple :

```bash
./vpn/add-peer.sh alice
```

Cela va :

* Créer un pair WireGuard nommé `alice`
* Lui attribuer une IP dans le sous-réseau VPN
* Sauvegarder la configuration dans `vpn/alice.conf`

**Envoyer `alice.conf` de manière sécurisée** à l'utilisateur — il peut l'importer dans le client WireGuard sur Windows, macOS, Linux, Android ou iOS.

### 5. Générer les certificats TLS pour Elasticsearch

Exécuter :

```bash
./scripts/gen-certs.sh
```

Crée :

```
config/elasticsearch/certs/elastic-stack-ca.p12
config/elasticsearch/certs/elastic-certificates.p12
```

Le mot de passe est défini dans `.env` — le modifier si souhaité.

### 6. Mettre à jour les règles de détection

Récupérer les dernières règles Suricata :

```bash
./scripts/update-rules.sh
```

Sources :

* Emerging Threats (v7.0.3)
* Liste noire SSL d'AbuseCH
* Règles locales `custom.rules` pour détection de stalkerware

### 7. Déployer la stack SIEM

```bash
./scripts/deploy.sh
```

Démarre :

* Elasticsearch avec TLS
* Kibana (importe les tableaux de bord depuis `config/dashboards/`)
* Wazuh Manager
* Suricata & Zeek
* Filebeat avec TLS vers Elasticsearch

### 8. Accéder aux tableaux de bord (via VPN)

Se connecter au VPN avec votre configuration de pair, puis ouvrir :

```
http://10.13.13.1:5601
```

Identifiants :

* **Nom d'utilisateur :** `kibana_system` (depuis `.env`)
* **Mot de passe :** votre `KIBANA_PASSWORD`

Tableaux disponibles :

* **Vue d'ensemble des menaces** : alertes de toutes sources
* **Appareils à haut risque** : endpoints avec détections répétées
* **Anomalies réseau** : modèles de trafic suspects
* **Liste de surveillance stalkerware** : détections pour BadBox, mFly, FlexiSpy, Spynger

### 9. Déployer les agents Wazuh

Sur un endpoint surveillé (dans le VPN ou réseau local) :

```bash
curl -so wazuh-agent.deb https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_4.12.0-1_amd64.deb \
 && sudo WAZUH_MANAGER='10.13.13.1' dpkg -i ./wazuh-agent.deb \
 && sudo systemctl enable wazuh-agent --now
```

### 10. Exigences d'interface réseau

Si utilisation de Suricata/Zeek en mode capture de paquets :

* Définir `SNIFFING_INTERFACE` dans `.env` (ex. `eth1`)
* Mettre l'interface en mode promiscuité :

```bash
sudo ip link set eth1 promisc on
```

Prêt à surveiller, détecter et défendre.

---

## Tableaux de bord

Après la première connexion, vous verrez :  

* **Vue d'ensemble des menaces :** Résumé de toutes les alertes  
* **Liste de surveillance des stalkerwares :** Détections de BadBox, BadBox2, mFly, FlexiSpy, Spynger et autres  
* **Anomalies réseau :** Événements Suricata/Zeek hors des modèles normaux  
* **Appareils à haut risque :** Terminaux avec multiples indicateurs de stalkerware  

---  

## Sauvegardes

* Exécutées chaque nuit à 02:00  
* Chiffrées avec GPG  
* Stockées sur `/mnt/secure-backup` (disque de 500 Go)  
* Lors du premier lancement, génère `config/backup/backup-key.gpg`  
* **Copiez la clé sur une clé USB et conservez-la en lieu sûr** – sans elle, les sauvegardes ne peuvent pas être restaurées  

### Restaurer  

```bash
gpg --import config/backup/backup-key.gpg
gpg --decrypt /mnt/secure-backup/shelter-siem-YYYY-MM-DD_HH-MM.tar.gz.gpg | tar -xz -C data/
```  

---  

## Maintenance

* **Arrêter la stack :** `./scripts/stop.sh`
* **Sauvegarde des données :** s'exécute chaque nuit vers `/mnt/secure-backup`
* **Restaurer sauvegarde :** `./scripts/restore-backup.sh`

### Mettre à jour les règles manuellement  

```bash
./scripts/update-rules.sh
docker compose restart suricata zeek
```  

### Mettre à jour le stack  

```bash
docker compose pull && docker compose up -d
```  

---  

## Notes de sécurité

* Changer tous les mots de passe par défaut dans `.env` avant déploiement
* Stocker les configurations des pairs VPN de manière sécurisée
* Garder les certificats TLS d'Elasticsearch privés
* Surveiller l'utilisation du disque (`./data/elasticsearch`) — nettoyer les anciens indices si nécessaire
* L'accès se fait uniquement via VPN – ne jamais exposer les ports 9200, 5601 ou 55000 à Internet  
* Conservez le disque de sauvegarde en lieu sûr physiquement  
* Testez régulièrement les configurations VPN et les sauvegardes
