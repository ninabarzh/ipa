---
title: "Vue d'ensemble de la stack"
weight: 1
translationKey: "ipa-siem-stack"
_build:
  render: always
menu:
  sidebar:  # Adds to Docsy's auto-generated sidebar
    weight: 5
---

La IPA-SIEM Stack est un outil de cybersécurité spécialisé basé sur Wazuh, une plateforme SIEM/XDR open source conçue pour aider les survivantes de violences conjugales à détecter et répondre à la surveillance numérique clandestine. Cela inclut des menaces comme les stalkerwares, les logiciels espions et les accès non autorisés aux appareils. Le système fournit une approche globale de protection numérique pour les personnes vulnérables.

## Objectifs clés de la IPA-SIEM Stack

Le système remplit quatre fonctions principales. Premièrement, il permet la collecte de données médico-légales en rassemblant les journaux et artefacts des appareils des survivantes sur Windows, macOS, Android et iOS pour identifier les compromissions potentielles. Deuxièmement, sa capacité de détection des menaces utilise des règles préconfigurées pour identifier les outils de surveillance courants incluant les stalkerwares commerciaux comme mSpy et FlexiSPY, ainsi que les enregistreurs de frappe et les outils d'accès à distance.

Pour la réponse aux incidents, la stack fournit des scripts automatisés et des instructions claires pour isoler les appareils compromis, collecter des preuves numériques et aider les survivantes à sécuriser leur technologie. Enfin, la plateforme maintient une conception centrée sur la confidentialité conforme au RGPD et au UK Data Protection Act, garantissant que toutes les données des survivantes restent chiffrées et anonymisées tout au long du processus.

## Fonctionnement du système

La IPA-SIEM Stack fonctionne via une architecture centralisée. Un serveur dédié ou une machine virtuelle cloud forme la base, exécutant plusieurs composants clés. Le module Wazuh surveille en permanence les appareils connectés pour détecter les activités suspectes, tandis qu'Elasticsearch et Kibana travaillent ensemble pour stocker et visualiser les journaux de sécurité, y compris les alertes concernant les processus de logiciels espions ou les tentatives de suivi de localisation. L'installation est rationalisée grâce à un script `setup.sh` automatisé qui gère toutes les dépendances et configurations.

L'intégration des appareils varie selon la plateforme. Les systèmes Windows et macOS peuvent installer des agents Wazuh qui transmettent automatiquement les journaux au serveur central. Pour les appareils Android, les systèmes rootés peuvent déployer l'agent via Termux, tandis que les appareils non rootés nécessitent une collecte manuelle des journaux via ADB. Le support iOS est actuellement limité aux appareils jailbreakés utilisant Cydia ou à l'extraction manuelle des journaux via iTunes.

Le système de détection utilise des règles préétablies qui identifient les menaces connues, comme les processus mSpy ou les tentatives d'accès non autorisé à la localisation. Ces alertes apparaissent dans le tableau de bord Kibana accompagnées des actions recommandées, qui peuvent inclure l'isolation d'un appareil ou la réinitialisation des paramètres GPS. Lorsque des menaces sont détectées, les protocoles de réponse aux incidents entrent en action. Des scripts automatisés comme quarantine_device.sh aident à contenir les menaces, tandis que des instructions complètes guident les survivantes à travers la préservation des preuves, les procédures de signalement légal et la transition vers des appareils plus sécurisés si nécessaire.

## Importance et applications

Cette solution revêt une importance particulière pour plusieurs raisons. Elle permet aux défenseurs non techniques de fournir aux refuges et organisations de soutien des outils de sécurité de qualité professionnelle sans nécessiter une expertise approfondie en cybersécurité. Le système maintient une conformité légale et éthique stricte grâce à un chiffrement robuste, des pratiques d'anonymisation des données et une politique de rétention des journaux de 90 jours qui équilibre les besoins probatoires et les préoccupations de confidentialité. Le fait d'être basé sur des outils gratuits et open source comme Wazuh et Elasticsearch le rend particulièrement économique pour les organisations aux ressources limitées qui travaillent avec des survivantes d'abus.

La plateforme est idéalement adaptée aux refuges pour victimes de violence conjugale qui doivent protéger leurs clientes contre la surveillance numérique, aux défenseurs de la forensique numérique qui aident à la collecte de preuves et aux organisations d'aide juridique qui constituent des dossiers pour des ordonnances de restriction ou des poursuites. Bien que le projet soit open source (sous licence GPLv3) et accueille les contributions de la communauté, les utilisateurs doivent noter certaines limitations actuelles. Le support Android et iOS reste limité pour les appareils non rootés/jailbreakés, mais cela pourrait changer.