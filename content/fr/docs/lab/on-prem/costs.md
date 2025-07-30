---
title: "Estimation des coûts pour un système de sécurité en refuge"
weight: 5
translationKey: "on-prem-costs"
_build:
  render: always
menu:
  sidebar:
    weight: 25
description: "Griffonné au dos d'une enveloppe."
---

## Serveur du refuge (Ubuntu 22.04)

* PC de bureau ou mini PC reconditionné

  * Spécifications : ≥8 Go de RAM, 4+ cœurs CPU, SSD 100+ Go  
  * Coût : €350–€585

* Améliorations facultatives :

  * RAM (16 Go total) : +€60  
  * SSD (500 Go) : +€70

Sous-total matériel : €350–€585 (ajouter €130 pour améliorations)

## Réseau & stockage

* Switch non géré (8 ports) : €35  
* Câblage et point d'accès Wi‑Fi : €25  
* Disque dur USB (1 To) : €60

Sous-total réseau : €120

## Scanner PiRogue optionnel (Raspberry Pi)

* Raspberry Pi 4 (kit 4 Go) : €95  
* Adaptateur USB Wi‑Fi / extras : €25

Sous-total PiRogue : €120

## Logiciels & outils (gratuits)

* Ubuntu, Wazuh, Elasticsearch, Termux, adb, OpenSSH, outils idevice — €0

## Main-d'œuvre & configuration

* Personnel rémunéré (~€45/h) : installation & tests (12h) : €540  
* Bénévolat : €0

### Maintenance & marge

* Réserve annuelle matérielle/logicielle : €120  
* Temps de personnel annuel (~10h) : €450  
* Aléa (10 %) : ~€65–€160

## Résumé pour l’année 1

| Catégorie           | Bas (bénévole) |   Haut (payé + extras) |
|---------------------|---------------:|-----------------------:|
| Matériel serveur    |           €350 |                   €715 |
| Réseau & stockage   |           €120 |                   €120 |
| PiRogue (optionnel) |             €0 |                   €330 |
| Logiciels           |             €0 |                     €0 |
| Installation        |             €0 |                   €540 |
| Maintenance         |           €120 |                   €160 |
| **Total (env.)**    |       **€590** |             **€1.865** |

## Coûts annuels à partir de l’an 2 (estimés)

| Élément             | Coût annuel |
|---------------------|------------:|
| Réserve matérielle  |        €120 |
| Support rémunéré    |        €450 |
| **Total annuel**    |    **€570** |

## Notes

* Coût minimum (~€590) basé sur bénévolat et matériel donné.  
* Coût complet (~€1.655) inclut améliorations, PiRogue et temps salarié.  
* L'accès Internet, les serrures physiques et l'électricité ne sont pas inclus.  
* Pour plusieurs sites, des services partagés (comme un SIEM central) peuvent réduire les coûts par site.
