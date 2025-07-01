---
title: "Build-a-thon pour refuges sécurisés"
linkTitle: "Build-a-thon pour refuges sécurisés"
weight: 2
_build:
  render: always
description: "Un atelier pratique et positif en technologie pour le personnel des refuges. Sans sermons, sans informations alarmistes—juste du travail d'équipe, des gadgets et un respect sain pour le chaos maîtrisé."
menu:
  sidebar:
    weight: 10
    identifier: "fr-secure-shelter"
    parent: "fr-docs"
translationKey: "secure-shelter"
---

## Aperçu

* Nom : Secure the Shelter  
* Type : Atelier pratique de création de laboratoire  
* Public : Personnel des refuges, bénévoles techniques et toute personne assez curieuse pour brancher une clé USB  
* Durée : Une longue journée (6–8 heures) ou deux demi-journées (recommandé)  
* Résultat : Laboratoire de sécurité fonctionnel avec Wazuh + Pirogue  

## Objectifs

* Installer une instance Wazuh SIEM opérationnelle  
* Configurer Pirogue/Pithon sur clé USB bootable ou Raspberry Pi  
* Connecter de vrais appareils, générer des logs, détecter des menaces simulées  
* Créer une procédure partagée de "premiers secours" techniques  
* Renforcer la confiance et la collaboration par le plaisir, non la peur  

## Checklist pré-atelier

| Matériel             | Notes                                                                   |
|----------------------|-------------------------------------------------------------------------|
| Clés USB (min. 3)    | Préchargées avec setup.sh, fichiers de config, outils                   |
| Ordinateur hôte      | Pour l'installation Wazuh – VM cloud, mini-serveur ou portable puissant |
| Accès internet       | Pour téléchargements et installation                                    |
| Projecteur           | Pour démonstrations en direct                                           |
| Aide-mémoire         | Imprimés et plastifiés – "quoi taper", "quoi ne pas toucher" etc.       |
| Autocollants, badges | Monstre des Logs, Gremlin du Noyau, Raton Laveur d'Alerte... vous voyez |
| Snacks & café        | Vous installez un SIEM, pas un stage de survie                          |

## Étape 1 : Choisir le setup (a.k.a. Choisis ta bête)

*"Quel sera le cerveau de notre forteresse numérique ?"*

### Options :

* Serveur Wazuh dans le cloud (DigitalOcean, Hetzner, etc.)  
* Installer Wazuh sur un portable ou mini-PC du refuge  
* Utiliser un Raspberry Pi 4 (pour les audacieux)  

### Activités :

* Les équipes choisissent leur machine et la baptisent (suggestions fournies !)  
* Exécuter `setup.sh` et suivre l'assistant  
* Célébrer quand Kibana s'ouvre (par une danse victorieuse ou un biscuit)  

Astuce : Chaque équipe reçoit un dossier de démarrage sur USB avec :  

* Un `setup.sh` pré-écrit  
* Des règles de firewall par défaut  
* Un drapeau d'équipe (en papier)  

## Étape 2 : Agents en liberté (a.k.a. Wazuh déchaîné)

*"Apprenons-lui à flairer les ennuis."*

### Buts :

* Connecter 1–2 appareils (portables Windows/macOS ou VMs de test)  
* Déclencher des logs et observer les alertes en direct  

### Activités :

* Installer l'agent Wazuh sur une machine test  
* Simuler comportements normaux et "suspects" : nouveaux comptes, installations d'apps, usage étrange d'USB  
* Utiliser de fausses signatures pour simuler des stalkerwares  

Mini-défi :  

* Qui obtient la première alerte "critique" ?  
* Optionnel : Concours "explication la plus absurde d'alerte"  

Moments d'apprentissage :  

* "Que dit ce log exactement ?"  
* "Comment savoir si c'est juste Windows qui fait des siennes ?"  

## Étape 3 : Brancher, démarrer, scanner (a.k.a. Pirogue & jouer)

*"Maintenant, partons à la pêche—aux spywares."*

### Objectifs :

* Préparer une clé USB ou Raspberry Pi avec Pirogue  
* Scanner un appareil Android ou clé USB test  

### Activités :

* Chaque équipe crée sa clé bootable (ou démarre son Pi)  
* Brancher à des téléphones test avec adaptateurs USB-C/OTG  
* Générer un rapport : quoi est normal ? quoi est suspect ?  

Jeux optionnels :  
* Un téléphone contient un "spyware mystère" (en réalité des apps test)  
* Votre équipe peut-elle l'identifier sans paniquer ?  

Conseils :  
* Glossaire des noms d'apps inquiétants mais inoffensifs  
* Encourager les notes : "Bizarre mais sûr", "À vérifier", etc.  

## Étape 4 : Fête des logs (a.k.a. Présenter & partager)

*"Car construire une forteresse sans le dire, à quoi bon ?"*

### Activités :

* Chaque équipe présente son setup : nom, agents, apprentissages  
* Tour de table "alerte la plus cool", "log le plus étrange", "plus grosse surprise"  
* Rédiger ensemble la Fiche de Tri Technique du Refuge :  

  * "Si quelqu'un dit que son téléphone agit bizarrement..."  
  * "Si on voit une alerte qui semble sérieuse..."  
  * "Si on n'est pas sûrs, on fait ça..."  

Résultats :  

* Aide-mémoire imprimé (idéalement plastifié)  
* Procédure affichée au mur  
* Identifiants de connexion configurés  
* Clés USB distribuées pour usage futur  

Activité finale : Autocollants, baptême du Monstre des Logs, photos d'équipe  

## Matériel post-atelier

| Matériel                | Description                                   |
|-------------------------|-----------------------------------------------|
| Aide-mémoire technique  | Étapes : Wazuh, Pirogue, triage               |
| Kit USB                 | Outils, scripts, guides PDF                   |
| Checklist de triage     | Que faire face à une technologie suspecte     |
| SIEM fonctionnel        | Avec appareils connectés et logs actifs       |
| Droit de se vanter      | Mérité, pas offert                            |

---

## Suivis optionnels

* Point mensuel à distance : "Quoi de neuf dans les logs ?"  
* Système de binômes : associer personnel et bénévoles techniques  
* Inviter un soutien juridique pour planification conjointe  

## Support et matériel pour l'événement