---
title: "Eyezy : L'observateur clandestin dans votre poche"
date: 2025-07-24
author: PowerOn
translationKey: "context-eyezy"
tags: ["spyware", "surveillance mobile", "abus numérique", "risques pour la vie privée", "sécurité des survivants"]
description: "Examen des capacités de surveillance d'Eyezy, son ciblage des utilisateurs vulnérables et ce que les travailleurs sociaux doivent savoir pour le détecter."
---

Eyezy est le nouveau venu enjoué dans la course aux stalkerwares. Avec un nom évoquant une start-up d'emojis ou une marque de soins oculaires trop zélée, on pourrait le croire inoffensif. Mais ne vous fiez pas à sa palette pastel et son interface pétillante,  Eyezy est un logiciel de surveillance redoutable, mascara ou pas.

Il promet "tranquillité d'esprit", "contrôle total" et "mises à jour en temps réel",  ce qui, entre de mauvaises mains, est plus une menace qu'un réconfort. Et comme le veut la tradition dans ce domaine, il clame être "pour les parents".

## Ce qu'Eyezy fait (et n'avoue pas)

Offre standard : accès aux SMS, historiques d'appels, localisation GPS, utilisation des apps, navigation, messages privés sur réseaux sociaux, frappes clavier et même contenu supprimé. En bref, il lit votre vie comme un roman et en vend le résumé.

Ses "Alertes Magiques" notifient le stalker,  pardon, "l'utilisateur inquiet",  quand certains mots-clés sont tapés ou quand la cible quitte une zone géodélimitée. Vendu comme outil pour parents. Évidemment, "il a recontacté son ex" et "elle est allée au refuge" se ressemblent étrangement dans le système.

Eyezy fonctionne en mode furtif, comme ses concurrents. Pas d'icône, pas d'avertissement, pas d'éthique. Conçu pour rester invisible, avec une efficacité troublante.

Installation variable : Android nécessite un accès physique. iOS exploite l'accès iCloud. Pas de jailbreak requis,  pratique si "violer facilement l'intimité" est un argument de vente.

## Innocence marketing, accès armé

Eyezy joue les interfaces douces et l'inquiétude parentale. Son branding évoque plus l'auto-assistance numérique que l'espionnage. Pas d'avertissements, pas de mention d'abus, encore moins de questionnement sur l'accès clandestin aux communications privées.

Pourtant, c'est exactement ce qu'il permet. Son modèle économique repose sur une surveillance à l'insu de la cible. Le site parle d'ados ; les forums, de conjoints.

Cette dénégation plausible est le vrai produit. Le logiciel n'est qu'un vecteur.

## Conséquences pour les survivantes

Eyezy est moins puissant que FlexiSPY, mais l'important est ailleurs. Pour une survivante, même des fuites basiques,  messages, déplacements, recherches,  peuvent être catastrophiques. L'illusion de sécurité s'effondre avec un SMS inexplicablement bien timing du bourreau.

Contrairement aux logiciels étatiques, Eyezy est acheté et installé par des particuliers. Des gens qui confondent "confiance" et "contrôle".

Les survivantes peuvent remarquer un comportement étrange,  batterie qui se vide, redémarrages, messages lus avant ouverture. Ou simplement que l'agresseur en sait trop. Eyezy est un fantôme dans la machine. Et comme tout fantôme, il ne part pas facilement.

## Enlever les "yeux" d'Eyezy

Il ne s'annonce pas. Il collecte discrètement. Le détecter nécessite une analyse forensique des apps installées, processus en arrière-plan ou activité suspecte. Sur Android, vérifier les permissions. Sur iOS, les accès iCloud donnent des indices.

Le retirer est délicat. Une réinitialisation fonctionne, mais efface aussi photos, messages, preuves. Et les survivantes agissent rarement sans risque. Souvent, remplacer l'appareil ou demander de l'aide experte en environnement sécurisé (comme un refuge avec support tech) est préférable.

## L'écosystème d'Eyezy

Eyezy, comme mSpy et FlexiSPY, prospère dans un vide juridique où "surveillance" semble respectable et "contrôle coercitif" une note en bas de page. Ces apps exploitent des lois dépassées, où l'intention sert de justification,  même quand le résultat est intimidation et préjudice.

Eyezy ne vend pas qu'un outil, mais un récit : que surveiller est responsable, bienveillant, nécessaire. C'est le même scénario qui normalise de lire les messages de son partenaire, vérifier sa position et exiger ses mots de passe.

Ce scénario est à revoir.

## Eyezy n'est pas le vrai problème

Eyezy est un symptôme, pas la maladie. La maladie, c'est croire que l'amour se prouve par l'accès, que sécurité rime avec contrôle, et que la confiance s'impose par des apps.

Pour les refuges, Eyezy est un nom parmi d'autres à surveiller. Sa présence sur un appareil doit être prise au sérieux. Son marketing, lu avec cynisme. Son existence, contestée,  légalement, socialement, techniquement.

Bonne nouvelle ? Contrairement à l'agresseur, Eyezy laisse des traces. Et contrairement à la confiance, un logiciel peut se désinstaller.

## Exemple de règles de détection SIEM pour Eyezy

**Eyezy** se concentre sur la **capture de frappe**, la **surveillance des réseaux sociaux** et **l’enregistrement d’écran**, souvent caché sous des noms système.

### Capture de frappe via accessibilité ou détournement d’entrée

```json
{
  "rule": {
    "id": 100050,
    "level": 12,
    "description": "Capture de frappe style Eyezy via détournement d’accessibilité",
    "if_sid": [62002],
    "match": {
      "accessibility_service": "com.eye.sysinput/.KeyCaptureService"
    },
    "group": "spyware, android, keylogger"
  }
}
```

*Eyezy s’accroche aux services de saisie de texte pour intercepter ce qui est tapé, notamment dans les applications de messagerie.*

### Miroir de réseaux sociaux ou tentative de screen‑scraping

```json
{
  "rule": {
    "id": 100051,
    "level": 11,
    "description": "Screen‑scraping des réseaux sociaux – variante Eyezy",
    "if_sid": [62001],
    "match": {
      "package.name": "com.eye.mirror.service"
    },
    "group": "spyware, android, social"
  }
}
```

*Semble être un enregistreur d’écran ou outil miroir. S’il utilise les API d’accessibilité, supposez qu’il espionne vos messages privés.*

### Requêtes DNS suspectes vers l’infrastructure cloud Eyezy

```zeek
event zeek_notice::Weird {
  if (conn$host matches /eyezy|mirrorzone|eyec2/i &&
      conn$duration < 45 secs &&
      conn$resp_bytes < 1500) {
    NOTICE([$note=Notice::Eyezy_C2_Traffic,
            $msg="Possible beacon C2 Eyezy détecté",
            $conn=conn]);
  }
}
```

*Eyezy privilégie les POST HTTPS silencieux vers des domaines vagues sur le cloud. Surveillez les transferts de petite taille et réguliers vers des domaines contenant “eye”.*

### Escalade de privilèges ou accès root après installation

```json
{
  "rule": {
    "id": 100052,
    "level": 14,
    "description": "Escalade de privilèges détectée – possible spyware Eyezy",
    "if_sid": [5500],
    "match": {
      "event_type": "privilege_escalation",
      "package.name": "com.eye.sysinput"
    },
    "group": "android, spyware, root"
  }
}
```

*Eyezy peut exiger ou abuser d’un accès root pour se cacher complètement. Si cela se produit peu après l’installation, prenez cela au sérieux.*

### Meta‑règle de corrélation comportementale Eyezy

```json
{
  "rule": {
    "id": 199996,
    "level": 15,
    "description": "Comportement Eyezy détecté – surveillance probablement cachée",
    "if_matched_sid": [100050, 100051, 100052],
    "group": "spyware, survivor-risk, alert"
  }
}
```

*Tout détecter. Capture de frappe, screen‑scraping et root ensemble ne sont jamais une coïncidence innocente.*
