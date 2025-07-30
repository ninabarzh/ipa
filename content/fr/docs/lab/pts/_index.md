---
title: "Comment configurer un kit PiRogue pour détecter les stalkerwares"
weight: 3
translationKey: "pts"
_build:
  render: always
menu:
  sidebar:
    weight: 15
    identifier: "fr-pts"
    parent: "fr-lab"
description: "Ce guide étape par étape est conçu pour le personnel des refuges sans formation technique. Il vous aidera à configurer un appareil simple pouvant vérifier les ordinateurs et téléphones pour détecter les logiciels de traque cachés utilisés par les agresseurs."
---

## Ce dont vous aurez besoin

Avant de commencer, rassemblez ces éléments (tous disponibles dans la plupart des magasins d'électronique) :

1. [Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) (2GB de RAM suffisent)  
2. Alimentation officielle (micro-USB)  
3. Carte micro SD 32GB (Classe 10)  
4. Câble Ethernet (un modèle basique convient)  
5. Un moniteur/téléviseur supplémentaire avec port HDMI (pour l'installation initiale)  

*Note budgétaire : Certaines associations comme WESNET en Australie proposent des kits à prix réduit – contactez les réseaux locaux de soutien aux victimes de violences.*

## Étape 1 : Préparation du logiciel PiRogue  

### Téléchargement du système  

1. Sur un ordinateur, allez sur le [site officiel de PiRogue](https://pts-project.org)  
2. Cliquez sur "Téléchargements" et choisissez la dernière version pour Raspberry Pi 4   
3. Enregistrez le fichier (extension `.img.xz`) – il contient tout le système d'exploitation  

### Installation sur la carte SD

1. Installez **Balena Etcher** (logiciel gratuit) depuis [etcher.io](https://www.balena.io/etcher/)  
2. Insérez votre carte micro SD dans l'ordinateur (avec un adaptateur si nécessaire)  
3. Ouvrez Etcher, sélectionnez l'image PiRogue téléchargée, choisissez votre carte SD et cliquez sur "Flash!"  
4. Attendez "Flash Complete" (environ 10 minutes)

## Étape 2 : Configuration matérielle  

1. **Insérez la carte SD** dans le Raspberry Pi (slot en dessous)  
2. **Connectez le câble Ethernet** du Pi au routeur du refuge  
3. **Branchez le HDMI** à un moniteur/téléviseur  
4. **Branchez l'alimentation en dernier** – le Pi s'allumera automatiquement  

*Conseil premier démarrage :* Le système met environ 5 minutes à démarrer. Un écran arc-en-ciel est normal au début.

## Étape 3 : Configuration initiale  

1. Lorsque demandé, connectez-vous avec :  
   - Identifiant : `pi`  
   - Mot de passe : `raspberry` (à changer plus tard)  

2. Suivez les instructions pour :  
   - Définir un nouveau mot de passe sécurisé (notez-le en lieu sûr)  
   - Confirmer votre fuseau horaire (important pour les logs)  
   - Autoriser les non-administrateurs à capturer le trafic (tapez "Y" puis Entrée)   

3. Le système se mettra à jour – attendez le redémarrage (environ 15 minutes)

## Étape 4 : Connexion des appareils à vérifier  

### Pour téléphones

1. Sur l'écran du PiRogue, notez le nom WiFi (ex. "PiRogue-123") et le mot de passe  
2. Sur le téléphone de la victime :  
   - Allez dans paramètres WiFi  
   - Connectez-vous au réseau PiRogue (ignorez les alertes "pas d'internet")  
   - Utilisez le téléphone normalement pendant 5 minutes – le PiRogue analysera le trafic   

### Pour ordinateurs

1. Connectez l'ordinateur au PiRogue via câble Ethernet  
2. Ouvrez un navigateur et allez sur : `https://pirogue.local/dashboard`  
   - Identifiant : `admin`  
   - Mot de passe : Vérifiez sur l'écran du PiRogue celui généré automatiquement

## Étape 5 : Lecture des résultats  

Le tableau de bord affiche un code couleur :

- **Vert :** Aucun stalkerware détecté  
- **Jaune :** Activité suspecte (ex. suivi de localisation inconnu)  
- **Rouge :** Stalkerware confirmé (ex. Cerberus, FlexiSpy)   

*Que faire si rouge apparaît :*

1. Notez le nom du logiciel malveillant  
2. Déconnectez immédiatement l'appareil  
3. Contactez un partenaire local en sécurité tech (liste sur [stopstalkerware.org](https://stopstalkerware.org/resources/#find-support))

## Sécurité et maintenance  

1. **Après chaque utilisation :**  
   - Éteignez correctement le PiRogue (tapez `sudo shutdown now` sur l'écran)  
   - Effacez la carte SD, par exemple avec DiskGenius sous Windows : Formater une carte SD ne supprime que les références aux fichiers – les données restent récupérables avec des outils comme PhotoRec 7. L'effacement écrase les données, les rendant irrécupérables. Ceci est crucial pour :
      - Supprimer les traces de stalkerware.
      - Protéger la vie privée des victimes si réutilisation des cartes.
      - Garantir des installations propres pour les outils forensiques de PiRogue.
   - Vérifiez la carte après effacement : Réinsérez-la → Vérifiez qu'elle apparaît "vide" dans l'Explorateur.

2. **Vérifications mensuelles :**  
   - Réinstallez la dernière version de PiRogue sur la carte SD (inclut de nouvelles règles de détection)   

3. **Pour cas sensibles :**  
   - Utilisez dans une pièce séparée des espaces de vie des victimes  
   - Documentez les résultats pour preuves légales (captures d'écran du tableau de bord)

## Obtenir de l'aide  

- Rejoignez le **serveur Discord PiRogue** (https://discord.gg/pts-project) pour un support en direct  
- Ligne d'aide sécurité tech UE : https://www.accessnow.org/help/ *(support 24/7 multilingue)*
- Les refuges UK peuvent contacter la clinique tech de **Women's Aid** (+44 0808 802 0300)   
- En danger immédiat, priorisez toujours la sécurité physique aux vérifications numériques

## Notes

Cette installation prend moins d'une heure et coûte moins de 80 €. C'est un outil puissant pour aider les victimes à retrouver une sécurité numérique.

Cet outil ne remplace pas une analyse forensique professionnelle, mais constitue une bonne première vérification quand des victimes apportent des appareils à votre refuge. L'installation complète prend environ 45 minutes et coûte moins de 70 € – un petit prix pour aider quelqu'un à retrouver sa vie privée numérique.
