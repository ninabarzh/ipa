---
title: "Scripts utiles pour automatiser les vérifications et réponses"
weight: 4
translationKey: "on-prem-scripts"
_build:
  render: always
menu:
  sidebar:
    weight: 20
description: "Les scripts sont de petits outils que vous construisez une fois, et qui font silencieusement des travaux importants en arrière-plan—comme chercher des signes de spyware, bloquer des appareils suspects, ou copier des logs depuis des téléphones."
---

Vous n'avez pas besoin de savoir programmer. Voyez cela comme de la pâtisserie : suivez la recette exactement et le gâteau (enfin, le script) fera son travail.

## Où placer vos scripts

Vous voudrez tous vos scripts personnalisés dans un endroit sécurisé et prévisible. Voici comment faire.

1. Ouvrez Terminal : Sur votre serveur (Linux), ouvrez une fenêtre de terminal.
2. Créez le dossier `scripts`. C'est là que vivront vos scripts :

```bash
sudo mkdir -p /opt/siem/scripts
```

3. Allez dans ce dossier

```bash
cd /opt/siem/scripts
```

4. Verrouillez-le (seuls les admins devraient pouvoir y toucher)

```bash
sudo chmod 700 /opt/siem/scripts
```

## Couper un appareil du réseau

**Ce que ça fait :** Si un téléphone ou ordinateur sur le réseau agit bizarrement—peut-être montre-t-il des signes de spyware ou de tracking—vous pouvez le couper immédiatement avec ce script.

**Pourquoi c'est important :** Une réponse rapide est cruciale. Cela bloque un appareil d'envoyer quoi que ce soit sur internet.

### Étapes pour le créer

1. Toujours dans `/opt/siem/scripts`, créez le fichier de script :

```bash
sudo nano quarantine_device.sh
```

2. Collez ceci :

```bash
#!/bin/bash

echo "Déconnexion de $1 du réseau..."
sudo iptables -A OUTPUT -s $1 -j DROP
```

3. Sauvegardez et quittez :

* Appuyez sur `Ctrl + O`, puis `Entrée`
* Appuyez sur `Ctrl + X`

4. Rendez-le exécutable :

```bash
sudo chmod +x quarantine_device.sh
```

### Pour l'utiliser

Si l'appareil suspect a l'IP `192.168.1.50` :

```bash
sudo /opt/siem/scripts/quarantine_device.sh 192.168.1.50
```

Il ne passera plus la porte.

## Chercher des choses suspectes dans les logs Wazuh

**Ce que ça fait :** Parcourt les logs de votre agent Wazuh et extrait tout ce qui est marqué "suspect".

**Pourquoi c'est important :** Lire des logs bruts est pénible. Ceci vous donne un fichier concis avec seulement les alertes.

### Étapes

1. Créez le fichier :

```bash
sudo nano parse_logs.sh
```

2. Collez ceci :

```bash
#!/bin/bash

mkdir -p /opt/siem/alerts
journalctl -u wazuh-agent | grep -i suspicious > /opt/siem/alerts/suspicious.log
```

3. Sauvegardez et quittez (`Ctrl + O`, `Entrée`, `Ctrl + X`)

4. Rendez-le exécutable :

```bash
sudo chmod +x parse_logs.sh
```

### Automatisez toutes les heures

```bash
crontab -e
```

En bas, ajoutez :

```
0 * * * * /opt/siem/scripts/parse_logs.sh
```

Maintenant, toutes les heures il vérifiera les logs et sauvegardera toute chose alarmante dans :

```
/opt/siem/alerts/suspicious.log
```

### Chiffrez les résultats (optionnel, mais recommandé)

Assurez-vous que seules les personnes de confiance puissent les lire :

```bash
gpg -c /opt/siem/alerts/suspicious.log
```

Choisissez un mot de passe fort, stockez-le en sécurité.

## Exécuter sur Android via Termux

Utilisé quand une victime a un appareil Android et que vous voulez en extraire des indices utiles.

**Sur votre serveur (où d'autres peuvent le télécharger) :**

1. Créez le fichier :

```bash
sudo nano /opt/siem/scripts/setup_android.sh
```

2. Collez ceci :

```bash
#!/data/data/com.termux/files/usr/bin/bash

echo "Collecte d'indices Android..."

mkdir -p ~/ipa_siem_logs

pm list packages -f > ~/ipa_siem_logs/apps.txt
settings get global http_proxy > ~/ipa_siem_logs/proxy.txt
cat /data/misc/wifi/wpa_supplicant.conf > ~/ipa_siem_logs/wifi.txt 2>/dev/null
logcat -d > ~/ipa_siem_logs/logcat.txt

echo "✅ Terminé. Fichiers sauvegardés dans ~/ipa_siem_logs/"
```

3. Rendez-le exécutable :

```bash
chmod +x /opt/siem/scripts/setup_android.sh
```

**Hébergez-le pour téléchargement :**

Depuis `/opt/siem/scripts` :

```bash
python3 -m http.server 8000
```

**Sur l'appareil Android (dans Termux) :**

```bash
pkg update && pkg install curl
curl -s http://192.168.1.10:8000/setup_android.sh | bash
```

## Obtenir des logs d'un iPhone jailbreaké

Nécessite :

* iPhone avec **OpenSSH installé** via Cydia
* Vous connaissez l'adresse IP de l'iPhone sur le Wi-Fi local

Sur le serveur

```bash
sudo nano /opt/siem/scripts/pull_ios_logs.sh
```

Collez ceci :

```bash
#!/bin/bash

IP=$1
USER=mobile
DATE=$(date +"%Y-%m-%d_%H-%M")

mkdir -p /opt/siem/ios_logs/$DATE

scp -r ${USER}@${IP}:/var/mobile/Library/Logs/CrashReporter /opt/siem/ios_logs/$DATE/
scp ${USER}@${IP}:/var/log/syslog /opt/siem/ios_logs/$DATE/

echo "Logs iPhone sauvegardés dans /opt/siem/ios_logs/$DATE"
```

Rendez-le exécutable :

```bash
chmod +x /opt/siem/scripts/pull_ios_logs.sh
```

Exécutez-le ainsi :

```bash
/opt/siem/scripts/pull_ios_logs.sh 192.168.1.23
```

## Trouver des mots de spyware dans les logs

```bash
sudo nano /opt/siem/scripts/watch_logs.sh
```

Collez ceci :

```bash
#!/bin/bash

LOGDIR="/opt/siem/ios_logs"
ALERTS="/opt/siem/alerts"

mkdir -p $ALERTS

grep -rEi "spy|track|mirror|record|stalker|surveil|remote access" $LOGDIR > $ALERTS/suspicious.log

echo "Termes suspects trouvés. Vérifiez $ALERTS/suspicious.log"
```

Rendez-le exécutable :

```bash
chmod +x /opt/siem/scripts/watch_logs.sh
```

## Collecter des fichiers depuis des clés USB

```bash
sudo nano /opt/siem/scripts/usb_intake.sh
```

Collez ceci :

```bash
#!/bin/bash

MOUNT="/media/usb"
DEST="/opt/siem/manual_uploads/$(date +%F_%H%M)"
mkdir -p $DEST

cp -r $MOUNT/* $DEST

echo "Fichiers copiés vers $DEST"
```

Rendez-le exécutable :

```bash
chmod +x /opt/siem/scripts/usb_intake.sh
```

## Tout exécuter

```bash
sudo nano /opt/siem/scripts/full_check.sh
```

Collez ceci :

```bash
#!/bin/bash

/opt/siem/scripts/usb_intake.sh
/opt/siem/scripts/watch_logs.sh
```

Rendez-le exécutable :

```bash
chmod +x /opt/siem/scripts/full_check.sh
```
