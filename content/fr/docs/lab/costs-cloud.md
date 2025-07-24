---
title: "Estimation des coûts d'un système de sécurité cloud"
weight: 7
translationKey: "cloud-costs"
_build:
  render: always
menu:
  sidebar:
    weight: 35
description: "L'infrastructure autonome implique des coûts réels—notamment en temps et expertise."
---

## Serveur cloud privé

Hypothèse : VPS moyen de gamme chez un hébergeur européen (ex. Hetzner, Netcup, 1984 Hosting).

* **Spécifications** : 4 vCPU, 8–16 Go RAM, 100 Go SSD, Ubuntu 22.04
* Coût mensuel : **15–30 €**
* Annuel : **~300 €**

*Minimum 8 Go RAM requis. Les stacks SIEM sont gourmands.*

## Sécurisation de base

* Fail2ban, UFW, mises à jour auto = gratuit
* Configuration : 4h × 60 €/h = **240 €**

## Installation SIEM (Wazuh)

* Wazuh Manager, API, Elasticsearch, Kibana
* Logiciel : **0 €** (open source)
* Paramétrage initial : 1–2 jours expert = **500–1 000 €**

*Bénévoles techniques possibles—mais prévoir un budget de secours.*

## VPN (WireGuard/OpenVPN)

* Logiciel : gratuit
* Installation : 3h = **180 €**
* Maintenance : rotation clés, support

## Déploiement des agents

* Windows/macOS (10–20 appareils) :
  30 min/appareil → 10h total = **600 €**

* Collecte logs Android/iOS :
  Manuel ou automatisé
  Coût : **400–600 €**

## Optionnel : Kit PiRogue

* Matériel : ~150 € + livraison
* Configuration : 3h = **180 €**

## Sauvegardes sécurisées

* Utiliser le SSD du serveur
* Stockage supplémentaire : 2 €/mois → **24 €/an**
* Outils de chiffrement : gratuits
* Automatisation : 2–4h = **120–240 €**

## Maintenance continue

* Rotation clés, gestion logs, alertes
* Mensuel : 4–6h × 60 € = **240–360 €/mois**
* Annuel : **2 880–4 320 €**

## Imprévus & formation

* Budget imprévus : **500 €**
* Formation interne : **300 €**

## Récapitulatif (Année 1)

| Poste                    |   Coût estimé (€) |
|--------------------------|------------------:|
| Serveur cloud            |              €300 |
| Sécurisation             |              €240 |
| Installation SIEM        |       €500–€1 000 |
| VPN                      |              €180 |
| Agents (10–20 appareils) |              €600 |
| Collecte logs mobiles    |         €400–€600 |
| PiRogue (optionnel)      |              €330 |
| Sauvegardes              |         €144–€264 |
| Maintenance              |     €2 880–€4 320 |
| Formation & imprévus     |              €800 |
| **Total (Année 1)**      | **€6 374–€8 634** |

## Coûts annuels (Année 2+)

* Serveur : 300 €/an
* Maintenance : 3 000–4 000 €
* Mises à jour ponctuelles

**Estimation annuelle : ~3 500–4 500 €**

## Notes budgétaires

* Coût variable selon nombre d'appareils
* Bénévoles réduisent les coûts mais nécessitent coordination
* Inclure temps personnel dans demandes de subventions
* Système partageable entre structures via VPN
