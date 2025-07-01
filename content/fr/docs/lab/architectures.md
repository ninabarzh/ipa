---
title: "Architectures"
weight: 1
translationKey: "architectures"
_build:
  render: always
menu:
  sidebar:
    weight: 5
description: "Architectures recommandées pour déployer la stack SIEM, adaptées à différents contextes organisationnels et niveaux de ressources. Toutes sont conçues pour la collecte forensique, la détection de menaces et la réponse aux incidents, tout en protégeant la vie privée des survivantes et la conformité légale. Chacune peut être adaptée aux refuges, réseaux d'aide ou déploiements communautaires décentralisés."
---

## Déploiement sur site centré refuge (Low-tech, tout-en-un)

Idéal pour : Refuges avec réseau interne fiable et référent technique désigné.

* Parfait pour petits refuges sans équipe IT
* Peut fonctionner offline ou semi-connecté
* Import des logs par USB si internet risqué

Architecture : Déploiement local mono-VM (Low-tech, tout-en-un)

```text
+-------------------------+             +---------------------------+
|     Ordinateur Refuge   |             |    PiRogue Optionnel      |
|  (VM Ubuntu ou OS hôte) |             |  (Appareil d'analyse)     |
|-------------------------|             |---------------------------|
| - Wazuh Manager         |             | - PiRogue OS              |
| - Elasticsearch         |             | - Outils de capture       |
| - Kibana                |             | - Import USB              |
| - scripts setup.sh      |             +---------------------------+
+-------------------------+                       |
        |                                         |
        | LAN sécurisé / Import USB               |
        v                                         v
+--------------------------+            +----------------------------+
| Appareils Survivantes    |            |  Appareils sur le terrain  |
| (Windows/macOS/Android)  |            |  (ex. téléphone suspect)   |
+--------------------------+            +----------------------------+
```

* Un serveur IPA-SIEM physique ou virtuel local
  * Exécute Wazuh Manager, Elasticsearch et Kibana
  * Inclut scripts automatisés (ex. `quarantine_device.sh`)
* Agents Wazuh installés sur :
  * Appareils Windows/macOS (direct ou via USB)
  * Android (via Termux sur appareils rootés)
  * iOS (jailbreak ou sauvegardes offline)
* Réseau interne pour transmission sécurisée
* Option PiRogue durci pour analyse locale

Avantages : Données sur site; contrôle accru; Inconvénients : Maintenance locale nécessaire

## Déploiement cloud privé (Contrôlé par refuge/ONG)

Idéal pour : Organisations multi-sites.

* Accès distant pour multi-sites
* Nécessite VPN robuste + backups chiffrés
* Risque local réduit mais discipline opsec accrue

Architecture : SIEM cloud sécurisé (ex. Hetzner)

```text
+-------------------------------+
|     VM cloud chiffrée         |
|-------------------------------|
| - Wazuh Manager               |
| - Elasticsearch               |
| - Kibana                      |
| - Accès HTTPS (VPN optionnel) |
+-------------------------------+
        |
        | Transfert chiffré
        v
+-------------------------------+
| Appareils partout             |
| (via agent Wazuh/ADB/iTunes)  |
+-------------------------------+
```

* VM cloud (ex. Hetzner) avec :
  * Stack Wazuh + Elasticsearch + Kibana
  * Accès VPN chiffré
* Appareils connectés via tunnel sécurisé (WireGuard)
* Logs anonymisés avant transmission

Avantages : Visibilité centralisée; Inconvénients : Expertise cloud requise

## Lab portable (Offline-first)

Idéal pour : Triage d'urgence, refuges temporaires.

* Parfait pour le terrain
* Sans internet
* Données effaçables post-export

Architecture : SIEM portable "Go Bag" (Raspberry Pi ou laptop)

```text
+---------------------------------+
|   Appareil portable             |
| (Laptop Linux ou Pi 4)          |
|---------------------------------|
| - Wazuh Manager                 |
| - Kibana (localhost uniquement) |
| - setup.sh mode portable        |
+---------------------------------+
        |
        | Logs USB/Wi-Fi
        v
+---------------------------------+
|  Appareil (offline)             |
+---------------------------------+
```

* Station forensique portable avec :
  * SIEM préinstallé (Wazuh, Kibana)
  * Isolation contre fuites
* Outils USB pour collecte
* Rapports sur volume chiffré
* Sync manuelle ultérieure

Avantages : Indépendant d'internet; Inconvénients : Limité par stockage local

## Pods décentralisés

Idéal pour : Réseaux de petites organisations.

* Multiples refuges envoient données anonymisées
* Support central pour triage
* Fonctionne mieux avec partenaire technique

Architecture : Configuration décentralisée

```text
+--------------------------+     +--------------------------+
|  Refuge A                |     |  Refuge B                |
|--------------------------|     |--------------------------|
| - Agent Wazuh            | --> | - Agent Wazuh            |
+--------------------------+     +--------------------------+
         \                           /
          \                         /
           v                       v
           +--------------------------+
           |  VM Analyste Central     |
           |--------------------------|
           | - Wazuh Manager          |
           | - Elasticsearch + Kibana |
           +--------------------------+
```

* Micro-nœuds SIEM (ex. Raspberry Pi 5) par défenseur
* Chaque nœud gère :
  * 1-2 appareils simultanés
  * Règles préconfigurées
* Sync périodique centrale

Avantages : Coût réduit, résilience; Inconvénients : Visibilité centrale limitée

## Réseau communautaire hybride

Idéal pour : Grandes coalitions avec personnel rotatif.

* Pour formation ou cliniques juridiques
* Peut utiliser traces répliquées de stalkerware
* Doit être complètement isolé

Architecture : Environnement sandboxé

```text
+----------------------------+
|      VM(s) recherche       |
|----------------------------|
| - Wazuh Manager            |
| - Images VM infectées      |
| - Replay de logs           |
+----------------------------+
        |
        | Export preuves nettoyées
        v
+----------------------------+
| Archives / Preuves légales |
+----------------------------+
```

* Système à plusieurs niveaux avec :
  * SIEM cloud central
  * Unités de terrain préconfigurées
  * Interface web pour upload manuel

Avantages: Combine le meilleur des deux mondes - sécurité centralisée avec action locale;  
Inconvénients: Nécessite une bonne coordination et des contrôles d'accès entre les niveaux

## Considérations de conception

* **Confidentialité des données**: Utilisez le chiffrement intégral du disque sur tous les nœuds. Les journaux doivent être anonymisés par défaut sauf consentement explicite.
* **Traces d'audit**: Toutes les actions forensiques doivent générer des journaux immuables pour soutenir l'admissibilité légale.
* **Mises à jour**: Les mises à jour par script (par Git ou synchronisation USB) doivent être poussées régulièrement pour maintenir la précision de détection.
* **Signatures de menaces**: Ensembles de règles partagés et mis à jour pour les modèles de surveillance VPI (ex. malware "Calculatrice+", journaux de spoofing SIM).

