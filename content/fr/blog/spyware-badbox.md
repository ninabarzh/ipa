---
title: "BadBox et la dure réalité du remplacement des appareils"
date: 2025-07-28
author: PowerOn
translationKey: "badbox-effects"
tags: ["logiciel espion", "sécurité-chaîne-approvisionnement", "remplacement-appareils", "appareils-sécurisés", "play-protect"]
description: "BadBox nous montre que certains appareils sont compromis avant même d'être allumés. Voici ce que cela implique pour le remplacement des appareils."
---

Vous jetez une vieille tablette douteuse, achetez un smartphone Android flambant « neuf » et respirez enfin. Problème résolu.

Sauf que non.

[Découvrez BadBox](https://www.humansecurity.com/learn/blog/satori-threat-intelligence-disruption-badbox-2-0/),  ce nom de code trompeur désigne une vaste opération de cyber-espionnage qui intègre directement des logiciels malveillants dans les appareils Android *avant même qu'ils ne quittent l'usine*. Il ne s'agit pas de produits suspects achetés sur des marchés parallèles. Beaucoup sont vendus par des revendeurs en ligne de confiance et des plateformes réputées. Des milliers sont déjà arrivés en Europe, généralement sous forme de tablettes, téléphones ou boîtiers streaming « premier prix ».

## Pourquoi BadBox concerne le remplacement d'appareils

Le malware, poliment appelé **Guerrilla**, se niche profondément dans le firmware,  bien en dessous du niveau détectable par la plupart des utilisateurs (ou des antivirus). Il peut installer des applications silencieusement, espionner les utilisateurs, diffuser du phishing ciblé ou même louer votre appareil à des tiers. Son architecture modulaire permet d'ajouter à tout moment de nouvelles fonctionnalités.

BadBox n'est pas un simple malware, mais un véritable écosystème criminel. Il est piloté par plusieurs groupes interconnectés,  dont SalesTracker, MoYu, Lemon et LongTV,  qui se répartissent les tâches. Certains gèrent l'infrastructure de commande et contrôle, d'autres développent la porte dérobée firmware, tandis que d'autres monétisent les appareils infectés via fraude publicitaire, réseaux proxy résidentiels et escroqueries automatisées. Leur point commun ? Le malware est intégré avant que l'appareil n'atteigne l'utilisateur, ce qui signifie que la compromission commence dès l'ouverture de l'emballage.

Jusqu'ici, la motivation principale est financière, pas la surveillance sur commande. La plupart des infections BadBox servent à la fraude au clic, aux impressions publicitaires fictives ou à la revente de trafic réseau anonyme. Mais son architecture modulaire et la propension avérée de ces groupes à louer leurs capacités signifient qu'un acheteur malveillant pourrait facilement détourner cette plateforme pour du harcèlement, de l'espionnage ciblé ou du vol de données,  sans avoir à tout réinventer.

Voilà pourquoi BadBox impacte le remplacement d'appareils. Il ne s'agit pas que les survivant·e·s soient directement ciblées aujourd'hui, mais que l'infrastructure existe déjà, prête à être weaponisée du jour au lendemain. Quand votre nouveau téléphone, tablette ou boîtier TV pourrait déjà agir comme bot, balise ou siphon de données avant même votre première connexion, « neuf » ne rime plus automatiquement avec « sûr ».

Une réinitialisation d'usine est inutile. L'antivirus aussi. Et l'éteindre/le rallumer n'exorcisera pas les démons.

## Implications pour les survivantes

Pour les survivantes de violences conjugales, cela change la donne. Chez *PowerOn*, nous disons : *en cas de doute, remplacez l'appareil*. Cela reste vrai, mais avec un avertissement : **Si le remplacement provient d'une source non fiable, il pourrait être pire que l'original.**

BadBox invalide trois présupposés :

- Un emballage scellé ne garantit pas la sécurité  
- Un prix bas n'autorise pas le partage  
- Un appareil normal aujourd'hui peut vous trahir demain

Un appareil infecté par BadBox peut rester inactif des semaines ou mois avant de s'activer, se mettre à jour ou commencer à travailler pour quelqu'un qui *veut vraiment* vos données.

Oui, certains coûtent moins de 20€. Oui, c'est tentant. Mais la vie privée et l'autonomie n'ont pas de prix.

### Mesures pratiques pour les survivantes

- Utilisez des appareils de sources vérifiables et fiables  
- Privilégiez si possible des modèles réputés « propres » (voir tableau ci-dessous)  
- Évitez de vous connecter à des comptes sensibles sur des appareils inconnus ou reçus en cadeau  
- Séparez activités à risque et bas risque sur des appareils distincts si possible

## Protocole pour les centres d'hébergement

Les centres font face à deux défis : empêcher l'introduction d'appareils compromis et détecter ceux qui passent entre les mailles du filet.

### Prévention

- Tracez l'origine des appareils achetés/donnés et vérifiez les versions de firmware  
- Pour un usage partagé, privilégiez des ordinateurs Linux ou Chromebooks reconditionnés avec Linux plutôt que des Android bas de gamme  
- Installez une station de vérification sécurisée pour contrôler les appareils avant utilisation  

### Checklist d'admission BadBox

**Objectif** : Vérifier tout appareil Android avant mise en service.

**1. Enregistrement des données de base**
- Type d'appareil  
- Marque et modèle  
- Numéro de série / IMEI  
- Provenance (don, achat, autre)  
- Date de réception  

**2. Vérification visuelle**
- Emballage d'origine scellé ? Oui / Non  
- Signes d'altération ? Oui / Non  
- Marque générique ou inhabituelle ? Oui / Non  

**3. Catégorisation du risque**
- Modèle répertorié comme sûr ? (Consulter la liste interne) Oui / Non  
- Modèle à risque/marque inconnue ? Oui / Non  
- Inconnu ? (Classer haut risque)  

**4. Vérification firmware et Play Protect**
- Allumer l'appareil (sans configurer de compte)  
- Vérifier la certification Play Protect (Paramètres → À propos → Mise à jour Google Play ou Play Store → Paramètres)  
- Noter la version du firmware  
- Comparer à la liste sécurisée  

**5. Test de comportement réseau**
- Connecter à un Wi-Fi isolé (pas au réseau principal)  
- Surveiller avec PiRogue, Zeek ou Suricata pendant 15-30 min  
- Repérer connexions sortantes ou requêtes DNS suspectes  

**6. Décision**
- **Validé** → Ajouter à l'inventaire avec étiquette « sûr »  
- **Rejeté** → Mettre en quarantaine ou recycler  
- **Incertain** → Conserver hors ligne, escalader au support technique  

*(Conserver une copie signée par appareil. Archivage dans le registre du centre.)*

### Détection

BadBox n'est détectable qu'en partie, jamais au niveau firmware, et uniquement si déjà actif sur le réseau ou l'OS.

Avec une [stack SIEM (Wazuh + Zeek + Suricata + Sysmon + optionnel PiRogue)](docs/lab/on-prem/), la détection passe par :

- Indicateurs réseau (connexions à des serveurs C&C, domaines douteux, points de distribution de malware)  
- Alertes Suricata sur l'infrastructure BadBox connue  
- Logs Zeek révélant des schémas de beaconing ou requêtes DNS anormales  

À noter : L'infrastructure C&C change fréquemment. La détection nécessite des feeds de threat intelligence à jour.

## Quand et comment remplacer ?

Remplacez quand :

- L'appareil est clairement compromis  
- Un stalkerware persiste  
- L'utilisatrice ne se sent plus en sécurité  
- L'utilisation continue présente un risque légal  

Le remplacement n'est sûr que si le nouvel appareil est fiable.

Sources recommandées :

- Revendeurs connus avec bonnes politiques de retour  
- Reconditionneurs certifiés effectuant des réinitialisations firmware  
- Organisations installant des OS respectueux de la vie privée  

Ou, si le budget le permet, optez pour des smartphones neufs de grandes marques avec bootloader verrouillé et aucun cas BadBox recensé.

| Type d'appareil                                     | Risque BadBox    | Remarques                                      |
|-----------------------------------------------------|------------------|------------------------------------------------|
| Téléphones Pixel (certifiés Play Protect)           | ✅ Faible         | Aucun cas recensé dans les recherches          |
| Android haut de gamme (Samsung, OnePlus, etc.)      | ✅ Faible à moyen | Doivent être certifiés Play Protect            |
| Android génériques ou « reconditionnés » noname     | ❌ Élevé          | Nombreuses infections confirmées               |
| Box Android TV, tablettes, projecteurs, auto-radios | ❌ Très élevé     | Multiples modèles compromis au niveau firmware |
| iPhones / appareils Apple                           | ✅ Non concerné   | Écosystème différent                           |

## Réflexion finale

BadBox n'est pas qu'un défaut de chaîne d'approvisionnement. C'est un rappel : se fier à l'emballage ne suffit pas. Les attaquants pensent en avance ; nous devons faire de même.

Remplacer un appareil reste crucial pour reprendre le contrôle. Simplement, nous savons désormais que certaines boîtes arrivent pré-perdues.
