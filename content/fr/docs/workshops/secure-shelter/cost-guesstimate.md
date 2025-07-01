---
title: "Estimation des coûts: Sécuriser le refuge build-a-thon"
weight: 3
translationKey: "cost-guesstimate-shelter"
_build:
  render: always
menu:
  sidebar:
    weight: 15
description: "Estimation détaillée pour organiser un build-a-thon d'une journée où le personnel configure son propre lab de sécurité numérique (Wazuh + Pirogue) avec l'aide de facilitateurs."
---

## Tableaux récapitulatifs

### Option A : Build-a-thon local (solution sur site)

| **Poste**                       | **Détails**                                       | **Coût estimé (€)** |
|---------------------------------|---------------------------------------------------|--------------------:|
| Facilitateurs (2–3 pers.)       | Sécurité numérique & facilitation trauma-informée |           800–1.200 |
| Stack IPA-SIEM                  | Matériel serveur, configuration, réseau           |           590–1.865 |
| Appareil(s) PiRogue (opt.)      | Moniteur réseau Raspberry Pi                      |             200–400 |
| Clés USB/stockage               | Clés d'installation, sauvegarde                   |                  60 |
| Documents imprimés/signalétique | Guides, autocollants, panneaux                    |                  80 |
| Restauration                    | Déjeuner, collations, boissons                    |             200–300 |
| Transport                       | Pour facilitateurs et équipement                  |             100–200 |
| Décoration                      | Éclairage, fanions, badges                        |                  50 |
| Contingence                     | Au cas où                                         |                 100 |
| **TOTAL (env.)**                |                                                   | **2.180 – 4.155 €** |

[Coûts estimés solution locale incluse](/docs/lab/costs.md).

PiRogue est optionnel mais utile pour scans hors ligne.

### Option B : Build-a-thon cloud

*Inclut journalisation sécurisée à distance et monitoring continu.*

| **Poste**                 | **Détails**                     | **Coût estimé (€)** |
|---------------------------|---------------------------------|--------------------:|
| Facilitateurs (2–3 pers.) | Comme modèle local              |           800–1.200 |
| Serveur cloud & config    | Durcissement, VPN, installation |         1.220–1.720 |
| Configuration agents      | Outils Android/iOS, agents PC   |         1.000–1.200 |
| PiRogue (opt.)            | Comme build local               |             200–400 |
| Sauvegardes auto          | Inclut scripts d'installation   |             144–264 |
| Maintenance annuelle      | Coût temps estimé               |         2.880–4.320 |
| Documents imprimés        | Guides, autocollants            |                  80 |
| Restauration              | Déjeuner, collations            |             200–300 |
| Transport                 | Facilitateurs et équipement     |             100–200 |
| Décoration                | Éclairage, fanions              |                  50 |
| Contingence               | Toujours utile                  |                 100 |
| **TOTAL (env.)**          |                                 | **6.774 – 9.034 €** |

[Coûts estimés solution cloud incluse](/docs/lab/costs-cloud.md).

Nécessite du personnel qualifié en cloud. Pour refuges privilégiant confidentialité totale et contrôle physique, l'Option A est préférable ([choix](/docs/lab/architectures.md)).

## Ce que vous obtenez

* Serveur SIEM fonctionnel (Wazuh, Kibana)
* Kit PiRogue installé pour diagnostics
* Personnel formé en forensic numérique
* Guides imprimables pour survivantes
* Journée collaborative et ludique

## Économies possibles

* Réutiliser du matériel existant
* Demander des Raspberry Pis donnés
* Bénévoles ou alliés tech internes
* Restauration partagée avec autres événements
