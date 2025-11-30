---
title: "Comment créer des vidéos deepfake pour la formation?"
linkTitle: "Créer des deepfakes"
slug: "creer-des-deepfakes"
weight: 6
_build:
  render: always
description: "Guide étape par étape pour créer des exemples de vidéos réelles et falsifiées pour l'activité 'Détectez le Faux', avec des outils gratuits pour Windows et Linux."
menu:
  sidebar:
    weight: 30
    identifier: "fr-make-deepfake"
    parent: "fr-docs"
translationKey: "make-deepfake"
---

Ce guide explique comment créer des clips **réels** et **falsifiés** pour des formations en refuge. Usage éducatif uniquement,  pas pour les réseaux sociaux ou le harcèlement.

Sur:

- **Windows** avec outils gratuits
- **Linux** en ligne de commande ou interface
- Workflows en ligne/hors ligne selon besoins

## Principes clés

- Clips de **30 secondes max**
- Contenu **neutre** (ex: "Bonjour, je suis X. Bienvenue.")
- **Toujours expliquer** ce qui est faux
- Jamais d'identités réelles
- Stockage et suppression responsables

## Vidéo réelle

Il faut:

- Smartphone/webcam (720p suffit)
- Espace calme et éclairé
- Quelqu'un pour un court dialogue
- Montage optionnel

Outils gratuits:
- **Windows**: App Photos → Modifier → Rogner
- **Linux**: `Shotcut`, `Kdenlive` ou:

```bash
ffmpeg -i input.mp4 -ss 00:00:01 -to 00:00:29 -c copy coupe.mp4
```

## Création de versions deepfake

### Windows : Utilisation d'outils en ligne

**Le plus simple pour la plupart des utilisateurs**, uniquement si vous acceptez d'uploader en cloud.

#### Option 1 : DeepBrain AI Studios

* Allez sur [DeepBrain AI Studios](https://www.aistudios.com/)
* Créez un compte gratuit (usage limité)
* Uploader un script et choisir un visage (ou créer un clone)
* Générer un clip,  généralement en moins d'une minute
* Télécharger la vidéo (MP4)

#### Option 2 : HeyGen

* Allez sur [HeyGen](https://www.heygen.com/)
* Choisissez un présentateur ou uploader votre photo
* Ajoutez un script texte
* Supporte plusieurs langues et accents
* Version d'essai gratuite avec watermark

#### Option 3 : Synthesia.io

* Allez sur [Synthesia.io](https://www.synthesia.io/)
* Avatars professionnels, interface très fluide
* Requiert un compte
* L'essai gratuit inclut quelques vidéos

*Toutes les plateformes en ligne stockent vos clips. Utilisez uniquement du contenu générique et envisagez des emails jetables.*

### Windows : Outils gratuits hors ligne

#### Option 1 : Avatarify (open-source, deepfake en temps réel)

* Installez [Avatarify](https://avatarify.ai/)

```bash
pip install avatarify
```

* Utilisez avec une webcam + lecteur de script
* Superposez un visage de célébrité ou générique en temps réel

#### Option 2 : DeepFaceLab

* Téléchargez depuis [GitHub](https://github.com/iperov/DeepFaceLab)
* Requiert une GPU puissante et de la patience
* Le meilleur pour le réalisme, mais configuration avancée

### Linux : Utilisation d'outils gratuits

#### Option 1 : First-order Motion Model (FOMM)

* Utilisez les [modèles pré-entraînés d'Aliaksandr Siarohin](https://github.com/AliaksandrSiarohin/first-order-model)

```bash
git clone https://github.com/AliaksandrSiarohin/first-order-model
cd first-order-model
pip install -r requirements.txt
```

* Fournissez-lui :
  * Une image fixe (visage)
  * Une vidéo pilote (vous ou un acteur lisant le script)

- Produit des vidéos animées

#### Option 2 : DeepFaceLive (version native Linux)

Il existe *une* version native Linux, bien que moins documentée et nécessitant plus de bidouillage avec les dépendances comme `dlib`, `onnxruntime`, et des versions spécifiques de `ffmpeg`. Mais cela fonctionne :

* Clonez le projet : `git clone https://github.com/iperov/DeepFaceLive.git`
* Suivez les [instructions d'installation Linux](https://github.com/iperov/DeepFaceLive#linux) (moins abouties mais fonctionnelles) :

  * Installez les dépendances comme Python 3.8–3.10, `onnxruntime`, `torch`, `opencv`, et `dlib`
  * Utilisez virtualenv pour garder les choses organisées
  * Prévoyez de résoudre quelques problèmes,  surtout avec CUDA si vous voulez l'accélération GPU

- Bon pour générer des vidéos avec superposition voix + visage
- Moins fluide qu'en Windows, mais utilisable avec patience

## Préparation

* **3 à 4 clips réels** avec des présentations simples
* **3 à 4 clips faux**, générés à partir des mêmes scripts ou similaires
* Optionnel : **Un clip mixte** où seule une partie est altérée (ex. voix vs visage)

Utilisez un éclairage et un ton cohérents pour que la différence soit subtile,  cela rend le jeu de détection plus difficile (et plus amusant).

## Confidentialité et éthique

À faire :

* Obtenez le consentement éclairé des locuteurs réels
* Utilisez des noms inventés et des scripts anodins
* Expliquez comment et pourquoi le faux a été créé

À ne pas faire :

* Utiliser des vidéos de vrais survivants, enfants ou histoires sensibles
* Utiliser des générateurs deepfake sans vérifier leurs conditions
* Oublier de supprimer les données en cache ou résiduelles
