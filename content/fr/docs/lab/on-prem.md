---
title: "Configurer un système de sécurité pour refuge"
weight: 2
translationKey: "on-prem"
_build:
  render: always
menu:
  sidebar:
    weight: 10
description: "Guide pour déployer la stack SIEM entièrement dans votre refuge. Privé, puissant et sous votre contrôle – sans cloud."
---

* Pas de plateformes cloud tierces
* Aucune donnée ne quitte le bâtiment
* Pas de surveillance cachée des survivantes

Conçu pour les refuges avec:

* Une connexion Internet stable (même juste en interne)
* Une petite équipe engagée
* Aucune connaissance technique (nous expliquons tout)
* Besoin de détecter harcèlement numérique ou surveillance

## Fonctionnalités

Collecte des indices (logs, alertes), détecte le pistage ou les intrusions, et fournit un tableau de bord visuel.

## Prérequis

### Serveur du refuge

**Configuration minimale:**

* Ubuntu 22.04 LTS
* 8 GB RAM
* 4 cœurs CPU
* 100 GB stockage
* IP interne **fixe**

Matériel compatible:

* PC inutilisé
* Mini PC (ex. Intel NUC)
* Machine virtuelle

### Appareils à surveiller

* Windows
* macOS
* Android (rooté ou non)
* iPhone (données limitées sans jailbreak)

### Réseau local (filaire ou Wi-Fi)

### Optionnel: Appareil PiRogue

[Outil basé sur Raspberry Pi](/docs/lab/pts.md) pour analyser les appareils avant connexion.

## Installation étape par étape

### Préparer le serveur

1. Ouvrir terminal (`Ctrl + Alt + T`)
2. Mettre à jour:

```bash
sudo apt update && sudo apt install -y curl unzip gnupg
```

### Installer Wazuh

Ajouter le dépôt:

```bash
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | sudo gpg --dearmor -o /usr/share/keyrings/wazuh.gpg

echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | sudo tee /etc/apt/sources.list.d/wazuh.list

sudo apt update
```

Installer:

```bash
sudo apt install -y wazuh-manager wazuh-api elasticsearch kibana
```

Lancer:

```bash
sudo systemctl enable --now wazuh-manager elasticsearch kibana
```

### Configurer le tableau de bord

Accéder via:

```
http://localhost:5601
```

Ou depuis le réseau:

```
http://192.168.1.10:5601
```

## Connecter les appareils

### Windows/Mac

Installer **Wazuh Agent**:

1. Télécharger depuis `http://192.168.1.10:5601`
2. Installer
3. Entrer l'IP du serveur

### Android (rooté)

1. Installer Termux depuis [F-Droid](https://f-droid.org/packages/com.termux/)
2. Exécuter:

```bash
pkg update && pkg install curl git
curl -s http://192.168.1.10/setup_android.sh | bash
```

### Android (non rooté)

1. Installer ADB:

```bash
sudo apt install android-tools-adb
```

2. Activer débogage USB
3. Vérifier:

```bash
adb devices
```

4. Extraire logs:

```bash
adb logcat -d > /opt/logs/android_logcat.txt
adb bugreport > /opt/logs/android_bugreport.zip
```

### iPhone (jailbreak)

1. Installer OpenSSH via Cydia
2. Transférer logs via SSH

### iPhone (sans jailbreak)

1. Installer outils:

```bash
sudo apt install libimobiledevice-utils
```

2. Sauvegarde:

```bash
idevicebackup2 backup /opt/backups/ios_device/
```

3. Analyser:

```bash
python3 parse_ios_backup.py /opt/backups/ios_device/
```

### Optionnel: PiRogue

1. Se connecter:

```bash
ssh pi@piroguedevice.local
```

2. Scanner:

```bash
sudo ./start_capture.sh --target 192.168.1.75
```

3. Transférer:

```bash
scp capture.pcap user@192.168.1.10:/opt/forensics/
```

## Maintenance hebdomadaire

* Vérifier les alertes
* Sauvegarder `/var/ossec/logs/`
* Redémarrer mensuellement
* Sécuriser physiquement le serveur
* Examiner les logs

## Résumé

Cette solution open-source garde toutes les données dans le refuge. Avec des pratiques simples, toute l'équipe peut participer à sa gestion.
