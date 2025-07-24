---
title: "Comment configurer un système de sécurité basé sur un refuge"
weight: 2
translationKey: "on-prem"
_build:
  render: always
menu:
  sidebar:  # S'ajoute à la barre latérale générée automatiquement par Docsy
    weight: 10
description: "Ce guide vous explique comment configurer la pile SIEM entièrement dans votre refuge. Privé, puissant et entre vos mains - sans cloud requis."
---

## Avertissement : Système en développement actif

La pile SIEM sur site PowerOn est actuellement en développement actif. Cela signifie que les choses peuvent changer rapidement - les fonctionnalités peuvent évoluer, les intégrations peuvent casser, et certaines configurations sont encore expérimentales ou non testées en environnement de production.

Les conseils fournis ici sont conçus pour les utilisateurs techniques construisant des systèmes pilotes ou des déploiements tests. Si vous déployez cette pile pour protéger des personnes vulnérables, faites preuve d'une extrême prudence. Validez chaque composant dans votre propre environnement et partez du principe que rien n'est invulnérable dès le départ.

Nous développons activement la documentation, ajoutons des configurations exemples et affinons les stratégies de corrélation des logs à travers Zeek, Suricata, Sysmon et les terminaux Linux. Les contributions, corrections et améliorations testées sur le terrain sont les bienvenues.

Jusqu'à déclaration de stabilité, considérez cette pile comme un système vivant : fragile dans certains domaines, prometteur dans d'autres, et toujours sujet à révision.

## Choix de conception

* Pas de plateformes cloud tierces
* Aucune donnée ne quitte votre bâtiment
* Pas de surveillance mystérieuse des survivants

Conçu pour les refuges avec :

* Une connexion internet stable (même uniquement à l'intérieur du bâtiment)
* Une petite équipe mais engagée
* Aucune connaissance technique (nous expliquons tout)
* Un besoin de détecter des signes de harcèlement numérique, falsification ou surveillance

## Ce que ce système est censé faire

Il collecte des indices depuis les appareils (comme logs, alertes et comportements étranges), surveille les signes de traçage ou d'intrusion, et vous fournit un tableau de bord visuel pour repérer les menaces et agir rapidement.

## Ce dont vous aurez besoin

### Un serveur pour le refuge (votre centre de commande)

C'est la machine qui fera tout fonctionner.

**Configuration minimale :**

* Ubuntu 22.04 LTS (une version gratuite de Linux - nous expliquerons comment l'installer si besoin)
* Au moins 8 GB de RAM (mémoire)
* Au moins 4 cœurs CPU (puissance de traitement)
* Au moins 100 GB d'espace disque
* Une adresse IP interne **fixe** (pour que les autres appareils puissent toujours le trouver)

*Si incertain, demandez à votre bénévole informatique de configurer une IP fixe comme `192.168.1.10`.*

Vous pouvez utiliser :

* Un PC de rechange
* Un mini PC (comme Intel NUC)
* Une machine virtuelle sur votre ordinateur administratif existant (s'il est assez puissant)

### Appareils à surveiller

Voici les appareils que ce système peut prendre en charge :

* Ordinateurs portables Windows
* Appareils macOS (ex. MacBooks)
* Téléphones Android (rootés = plus d'accès, mais pas requis)
* iPhones (données partielles seulement sauf si jailbreakés)

### Réseau du refuge (filaire ou Wi-Fi)

Doit simplement connecter tous les appareils **à l'intérieur** du bâtiment. Le système n'a pas besoin d'internet une fois configuré.

### Optionnel : Appareil PiRogue

[Un petit kit (basé sur Raspberry Pi)](/docs/lab/pts.md) qui vérifie les appareils pour des comportements suspects avant qu'ils ne rejoignent le réseau du refuge. Idéal pendant les entretiens d'admission ou le travail de proximité.

## Configuration pas à pas du serveur

C'est ici que vivront tous vos outils de sécurité.

1. Ouvrez une fenêtre terminal (Sur votre serveur Ubuntu, appuyez sur `Ctrl + Alt + T`)
2. Mettez à jour votre système et installez quelques outils essentiels pour vous assurer que votre serveur est à jour et peut télécharger des paquets en sécurité :

```bash
sudo apt update && sudo apt install -y curl unzip gnupg
```

3. Installez Java (requis par certains composants ELK) :

```bash
sudo apt install -y openjdk-11-jdk
```

### Installer Wazuh (votre système de sécurité central)

Wazuh est un système open source qui surveille les appareils, recherche les problèmes, et vous fournit des alertes et un tableau de bord. Il inclut :
* Wazuh Manager (gère alertes et actions)
* Wazuh API (permet au tableau de bord de communiquer avec le système)
* Elasticsearch (stocke logs et données)
* Kibana (votre tableau de bord visuel)

1. Ajoutez la source logicielle de Wazuh :

```bash
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | sudo gpg --dearmor -o /usr/share/keyrings/wazuh.gpg

echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | sudo tee /etc/apt/sources.list.d/wazuh.list

sudo apt update
```

2. Installez Wazuh et les outils support :

```bash
sudo apt install -y wazuh-manager wazuh-api elasticsearch kibana
```

3. Démarrez les services pour qu'ils s'exécutent maintenant et à chaque redémarrage du serveur :

```bash
sudo systemctl enable --now wazuh-manager elasticsearch kibana
```

### Configurer le tableau de bord Wazuh

Une fois que tout fonctionne, ouvrez un navigateur sur votre serveur et allez dans votre salle de contrôle principale. Vous vous connecterez et verrez des alertes, infos appareils et plus :

```
http://localhost:5601
```

Ou depuis un autre appareil sur le même réseau :

```
http://192.168.1.10:5601
```

### Installer Zeek (votre système de surveillance réseau)

Zeek (anciennement Bro) est un puissant framework d'analyse réseau qui surveille tout le trafic et crée des logs détaillés de connexions, fichiers et protocoles. Il inclut :

* Analyse de trafic en temps réel
* Détection de protocoles (HTTP, DNS, SSL etc.)
* Capacités d'extraction de fichiers
* Scripting personnalisé pour la détection de menaces

1. Installez Zeek depuis les dépôts Ubuntu :

```bash
sudo apt install -y zeek
```

Si Zeek n'est pas disponible dans votre version d'Ubuntu (ou si vous avez besoin de fonctionnalités plus récentes), compilez-le depuis la source :

```bash
# Installez les dépendances de compilation
sudo apt install -y cmake make gcc g++ flex bison libpcap-dev libssl-dev python3 python3-dev zlib1g-dev

# Téléchargez et compilez Zeek (remplacez X.X.X par la dernière version)
wget https://download.zeek.org/zeek-X.X.X.tar.gz
tar xzf zeek-X.X.X.tar.gz
cd zeek-X.X.X
./configure
make
sudo make install
```

2. Configurez Zeek pour surveiller votre interface réseau (trouvez la vôtre avec `ip link show`) :

```bash
sudo nano /etc/zeek/node.cfg
```

Modifiez pour spécifier votre interface (normalement `eth0` ou `ens33`) :
```ini
[zeek]
type=standalone
host=localhost
interface=eth0   # Changez ceci par votre interface réelle
```

3. Ajoutez des scripts personnalisés de détection de spyware

* Sauvegardez votre script de détection (ex. `poweron-spyware.zeek`) dans `/opt/zeek/share/zeek/site/` ou `/opt/zeek/poweron-spyware.zeek`.
* Éditez `/opt/zeek/local.zeek` et ajoutez :

```zeek
@load ./poweron-spyware.zeek
```

4. Définissez les permissions :

* Zeek doit avoir un accès **lecture** et **écriture** à ses répertoires de logs (`/opt/zeek/logs/current/`).
* Si vous exécutez Zeek en tant qu'utilisateur non root, assurez-vous que cet utilisateur est dans les groupes appropriés ou possède les répertoires de logs :

```bash
sudo chown -R zeekuser:zeekgroup /opt/zeek/logs
sudo chmod -R 750 /opt/zeek/logs
```

5. Démarrez le service Zeek :

```bash
sudo systemctl enable --now zeek
sudo zeekctl deploy  # Déploiement initial
```

6. Vérifiez que Zeek fonctionne :

```bash
zeekctl status
```

### Installer Suricata (votre système de détection d'intrusion)

Suricata est un puissant système de détection d'intrusion (IDS) qui :
* Scanne le trafic réseau pour des motifs malveillants
* Détecte des signatures d'attaque connues
* Génère des alertes de sécurité
* S'intègre avec des flux de renseignement sur les menaces

1. Installez Suricata et les dépendances :

```bash
sudo apt install -y suricata jq
```

2. Configurez Suricata pour surveiller votre interface réseau :

```bash
sudo nano /etc/suricata/suricata.yaml
```

Définissez l'interface `af-packet` :

```yaml
af-packet:
  - interface: eth0   # Remplacez par votre interface
    threads: auto
    cluster-id: 99
    cluster-type: cluster_flow
    defrag: yes
```

Activez la sortie EVE JSON pour l'envoi des logs :

```yaml
outputs:
  - eve-log:
      enabled: yes
      filetype: regular
      filename: /var/log/suricata/eve.json
      types:
        - alert
        - dns
        - http
        - tls
        - flow
```

3. Mettez à jour les règles de Suricata (incluant les menaces émergentes) :

```bash
sudo suricata-update
sudo suricata-update update-sources
sudo systemctl restart suricata
```

4. Définissez les permissions

Assurez-vous que Suricata peut écrire dans `/var/log/suricata/` :

```bash
sudo chown -R suricata:suricata /var/log/suricata
sudo chmod -R 750 /var/log/suricata
```

5. Activez et démarrez Suricata

```bash
sudo systemctl enable suricata
sudo systemctl start suricata
```

6. Vérifiez que Suricata fonctionne :

```bash
sudo systemctl status suricata
```

7. Vérifiez les alertes récentes (devrait montrer un tableau vide \[] si aucune menace détectée) :

```bash
jq '.event_type' /var/log/suricata/eve.json | grep alert | wc -l
```

### Configurez Zeek et Suricata pour démarrer au boot

Assurez-vous que les deux services redémarrent automatiquement :

```bash
sudo systemctl enable zeek
sudo systemctl enable suricata
```

### Vérifiez l'intégration avec votre tableau de bord

Après environ 5 minutes, vérifiez votre tableau de bord Wazuh à `http://192.168.1.10:5601` pour :
1. Les logs réseau de Zeek sous "Security Events"
2. Les alertes Suricata dans la section "Threat Detection"

Pour le dépannage, vérifiez les logs avec :
```bash
journalctl -u zeek -f
journalctl -u suricata -f
```

## Connecter les appareils des survivants

Voici comment collecter des logs et alertes utiles depuis chaque appareil.

### Pour Windows ou Mac

Ces appareils utilisent un programme appelé **Agent Wazuh** pour envoyer des logs à votre serveur.

*Qu'est-ce qu'un Agent Wazuh ?* Une petite app qui tourne en arrière-plan, collectant des infos de sécurité comme des tentatives de connexion, comportements étranges d'apps ou changements de paramètres. Elle envoie ces données sécurisées à votre serveur.

**Option 1 : Installer l'agent directement depuis le navigateur**

1. Sur l'appareil, ouvrez un navigateur web.
2. Allez à : `http://192.168.1.10:5601`
3. Téléchargez l'agent pour Windows ou macOS.
4. Lancez l'installateur.
5. Quand demandé pour l'IP du serveur, entrez l'IP fixe de votre serveur (ex. `192.168.1.10`)

**Option 2 : Installer via clé USB (si pas d'internet sur l'appareil)**

1. Sur le serveur :

```bash
wget https://packages.wazuh.com/4.x/agents/wazuh-agent_x.x.x.msi
cp wazuh-agent_x.x.x.msi /media/usb
```

2. Branchez la clé USB à l'appareil du survivant.
3. Lancez l'installateur manuellement.

### Pour Android (rooté)

**Rooté** signifie accès complet au système interne du téléphone. Si non rooté, voir section suivante.

1. Installez Termux (une app terminal Linux) : Téléchargez depuis [F-Droid](https://f-droid.org/packages/com.termux/).
2. Ouvrez Termux et tapez :

```bash
pkg update && pkg install curl git
curl -s http://192.168.1.10/setup_android.sh | bash
```

([Ce script doit être préparé sur votre serveur](/docs/lab/on-prem-scripts.md).)

### Pour Android (non rooté)

Vous extrairez les logs manuellement avec `adb`.

*Qu'est-ce que `adb` ?* ADB (Android Debug Bridge) est un outil qui vous permet de communiquer avec des téléphones Android depuis un ordinateur. Vous l'utiliserez pour copier des infos système et logs.

1. Installez adb sur votre serveur Ubuntu :

```bash
sudo apt install android-tools-adb
```

2. Activez le débogage USB sur le téléphone :

   * Allez dans **Paramètres → À propos du téléphone**
   * Tapez 7 fois sur **Numéro de build** pour déverrouiller les options développeur
   * Allez dans **Options développeur**, activez **Débogage USB**

3. Connectez le téléphone au serveur avec un câble USB.
4. Vérifiez qu'il est reconnu :

```bash
adb devices
```

Vous devriez voir un ID d'appareil. Sinon, vérifiez votre câble USB et les permissions.

5. Copiez les logs du téléphone :

```bash
adb logcat -d > /opt/logs/android_logcat.txt
adb bugreport > /opt/logs/android_bugreport.zip
```

6. Optionnel : Extrayez la liste des apps et paramètres proxy

```bash
adb shell pm list packages -f > /opt/logs/android_apps.txt
adb shell settings get global http_proxy
```

### Pour iPhones jailbreakés (accès complet)

1. Installez OpenSSH via Cydia (boutique d'apps jailbreak)
2. Utilisez [scripts sécurisés](on-prem-scripts.md) pour transférer les logs à votre serveur via SSH

### iPhones **non** jailbreakés

Utilisez des sauvegardes locales pour extraire les données d'apps.

1. Installez les outils sur le serveur :

```bash
sudo apt install libimobiledevice-utils
```

2. Sauvegardez l'iPhone :

```bash
idevicebackup2 backup /opt/backups/ios_device/
```

3. Exécutez un [script d'analyse](on-prem-scripts.md) (vous pourriez avoir besoin d'aide) :

```bash
python3 parse_ios_backup.py /opt/backups/ios_device/
```

Cherchez :

* Apps inconnues
* Historique de localisation
* Logiciels de mirroring

### Installation de Sysmon (terminaux Windows)

Sysmon (System Monitor) est un service système Windows qui enregistre :  

* Créations de processus avec lignes de commande  
* Connexions réseau  
* Horodatages de création de fichiers  
* Chargements de pilotes  
* Suivi plus détaillé que les logs Windows standards  

Installez Sysmon **après** avoir déployé les agents Wazuh mais **avant** de configurer des règles de surveillance avancées.

1. Téléchargez Sysmon depuis Microsoft [https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon):

```powershell
Invoke-WebRequest -Uri "https://download.sysinternals.com/files/Sysmon.zip" -OutFile "$env:TEMP\Sysmon.zip"
Expand-Archive -Path "$env:TEMP\Sysmon.zip" -DestinationPath "C:\Program Files\Sysmon"
```

2. Créez un fichier de configuration  

Utilisez une config minimale axée sur les spywares (sauvegardez comme `poweron-sysmon-config.xml`):

```xml
<Sysmon schemaversion="4.70">
  <EventFiltering>
    <ProcessCreate onmatch="include" />
    <NetworkConnect onmatch="include" />
    <ImageLoad onmatch="include" />
    <ProcessAccess onmatch="include" />
    <CreateRemoteThread onmatch="include" />
    <RegistryEvent onmatch="include" />
    <Exclude>
      <Image condition="is">C:\Windows\System32\svchost.exe</Image>
      <Image condition="is">C:\Windows\System32\services.exe</Image>
      <Image condition="is">C:\Windows\System32\lsass.exe</Image>
    </Exclude>
  </EventFiltering>
</Sysmon>
```

3. Installez avec la configuration

Ouvrez PowerShell en Administrateur et exécutez :

```powershell
cd "C:\Program Files\Sysmon"
.\Sysmon64.exe -i poweron-sysmon-config.xml -accepteula
```

4. Vérifiez dans l'Observateur d'événements  

Ouvrez : **Observateur d'événements > Journaux des applications et services > Microsoft > Windows > Sysmon > Opérationnel** 

Vous devriez voir de nouveaux événements processus/réseau.

5. Ajoutez ceci au `ossec.conf` de l'agent Wazuh :  

```xml
<localfile>
  <log_format>eventchannel</log_format>
  <location>Microsoft-Windows-Sysmon/Operational</location>
</localfile>
```

### Configuration de la surveillance des terminaux Linux

* Comme Sysmon est seulement pour Windows, pour les terminaux Linux :

  * Considérez `auditd` pour la surveillance des processus et système de fichiers.
  * Utilisez Zeek et Suricata sur les capteurs réseau.
  * Déployez des agents Wazuh sur les machines Linux pour collecter syslogs, logs auditd et logs personnalisés.
  * Configurez les agents Wazuh pour une collecte détaillée d'événements Linux.

### Optionnel : Utilisez PiRogue pour scanner les appareils avant connexion

[Un appareil PiRogue](pts.md) se place entre le réseau et un téléphone/portable et observe tout le trafic.

1. Connectez-vous au PiRogue :

```bash
ssh pi@piroguedevice.local
```

2. Lancez un scan réseau :

```bash
sudo ./start_capture.sh --target 192.168.1.75
```

3. Après le scan, envoyez les données à votre serveur :

```bash
scp capture.pcap user@192.168.1.10:/opt/forensics/
```

4. Analysez avec cette commande :

```bash
tshark -r /opt/forensics/capture.pcap
```

## Envoi des logs au SIEM

### Envoi des logs Zeek via Filebeat sur les machines capteurs

1. Installez Filebeat :

```bash
sudo apt install -y filebeat
```

2. Configurez `/etc/filebeat/filebeat.yml` :

```yaml
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /opt/zeek/logs/current/conn.log
      - /opt/zeek/logs/current/dns.log
      - /opt/zeek/logs/current/http.log
    json.keys_under_root: true
    json.add_error_key: true
    fields:
      source: zeek
    fields_under_root: true

output.logstash:
  hosts: ["your-wazuh-manager:5044"]
```

3. Activez le module Zeek (optionnel, si utilisation de module) :

```bash
sudo filebeat modules enable zeek
```

4. Démarrez et activez Filebeat :

```bash
sudo systemctl start filebeat
sudo systemctl enable filebeat
```

### Envoi des logs Suricata via Filebeat

1. Dans `/etc/filebeat/filebeat.yml`, ajoutez :

```yaml
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /var/log/suricata/eve.json
    json.keys_under_root: true
    json.add_error_key: true
    fields:
      source: suricata
    fields_under_root: true

output.logstash:
  hosts: ["your-wazuh-manager:5044"]
```

2. Activez le module Suricata (optionnel) :

```bash
sudo filebeat modules enable suricata
```

3. Redémarrez Filebeat pour appliquer :

```bash
sudo systemctl restart filebeat
```

### Envoi des logs Sysmon depuis les terminaux Windows

* Sur Windows, installez l'agent Wazuh (préféré) ou Filebeat.
* Pour l'agent Wazuh, configurez-le pour collecter les logs du canal d'événements Sysmon (voir ci-dessous).
* Si utilisation de Filebeat, configurez pour lire les logs d'événements Sysmon et envoyer directement à Wazuh ou Elasticsearch.

## Configuration de Wazuh pour l'ingestion des logs

### Ajout des logs Zeek

Dans la config du manager ou agent Wazuh (`ossec.conf`), ajoutez :

```xml
<localfile>
  <log_format>json</log_format>
  <location>/opt/zeek/logs/current/conn.log</location>
</localfile>
<localfile>
  <log_format>json</log_format>
  <location>/opt/zeek/logs/current/dns.log</location>
</localfile>
<localfile>
  <log_format>json</log_format>
  <location>/opt/zeek/logs/current/http.log</location>
</localfile>
```

### Ajout des logs Suricata

Ajoutez à `ossec.conf` :

```xml
<localfile>
  <log_format>json</log_format>
  <location>/var/log/suricata/eve.json</location>
</localfile>
```

### Ajout des logs Sysmon

Dans le `ossec.conf` de l'agent Windows :

```xml
<localfile>
  <log_format>eventchannel</log_format>
  <location>Microsoft-Windows-Sysmon/Operational</location>
</localfile>
```

## Configuration des décodeurs et règles pour Wazuh

### Configuration du décodeur et des règles pour Zeek

Pour que les logs Zeek soient significatifs dans Wazuh, vous devez activer les bons décodeurs et règles. Par défaut, Wazuh ne comprend pas automatiquement les logs Zeek à moins qu'on lui dise comment. Voici comment configurer :

1. Activez le décodeur Zeek

Vérifiez le fichier `etc/decoders/zeek-decoder.xml` sur votre manager Wazuh. S'il n'existe pas, créez-le avec :

```xml
<decoder name="zeek">
  <program_name>zeek</program_name>
  <type>json</type>
</decoder>
```

Si vous ingérez des logs JSON sans champ `program_name`, ajoutez des règles personnalisées qui se déclenchent sur des champs spécifiques de Zeek comme `uid`, `id.orig_h`, `proto`, etc.

2. Chargez les fichiers de règles pour Zeek

Wazuh a besoin de règles qui comprennent la structure et la sémantique des logs Zeek. Soit :

* Utilisez les [règles Zeek contribuées par la communauté](https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/ruleset.html) de Wazuh, ou
* Créez un fichier `rules/zeek_rules.xml` avec des entrées comme :

```xml
<group name="zeek,">
  <rule id="100200" level="5">
    <decoded_as>json</decoded_as>
    <field name="proto">tcp</field>
    <description>Connexion TCP Zeek détectée</description>
  </rule>
</group>
```

Cela permet de marquer, corréler ou escalader basé sur les contenus de Zeek.

3. Si les logs sont envoyés depuis une autre machine...

Quand Zeek tourne sur un capteur et envoie des logs à la machine SIEM :

* **Permissions** : Assurez-vous que Filebeat (ou votre processus de sync) a la permission de lire les logs Zeek et qu'ils ne sont pas purgés avant l'ingestion. Utilisez `chmod o+r` ou un groupe dédié.

* **Intégrité** : Évitez la manipulation ou la troncation avec :

  * `rsync -a --checksum` ou
  * Canaux de transport chiffrés (ex. tunnels SSH, Filebeat sur TLS)

* **Horodatages** : Vérifiez les fuseaux horaires et utilisez les champs `ts` des logs Zeek directement - évitez de dépendre des heures de modification de fichiers.

4. Vérifiez que tout est connecté

* Exécutez `wazuh-logtest` avec une ligne de log Zeek pour tester les correspondances
* Surveillez `/var/ossec/logs/ossec.log` pour erreurs ou avertissements du décodeur
* Utilisez `alerts.json` ou l'onglet Discover dans Kibana pour confirmer que les règles se déclenchent comme attendu

### Activez les décodeurs Suricata

Utilisez les décodeurs et règles par défaut de Suricata de Wazuh ou les contributions communautaires.

### Activez les décodeurs Sysmon

Wazuh inclut des décodeurs et règles par défaut pour Sysmon. Assurez-vous qu'ils sont activés.

## Tests et validation

* Exécutez `filebeat test config -c filebeat.yml` avant de démarrer Filebeat
* Confirmez que les logs apparaissent dans votre index ou manager dans les 30 secondes
* Utilisez `jq` pour valider manuellement le JSON de Zeek si l'ingestion échoue mystérieusement

1. Exécutez :

```bash
filebeat test config -c /etc/filebeat/filebeat.yml
```

2. Testez les décodeurs Wazuh avec :

```bash
wazuh-logtest
```

3. Surveillez les logs du manager Wazuh (`/var/ossec/logs/ossec.log`) pour erreurs de décodeur.
4. Vérifiez Elasticsearch/Kibana pour les logs entrants et alertes.

## Considérations de sécurité et intégrité

* Pour l'envoi distant de logs, assurez-vous :
  * Les permissions de fichiers permettent la lecture des logs par Filebeat/Wazuh.
  * Les logs ne sont pas purgés avant ingestion.
  * Utilisez des canaux de transport chiffrés (TLS, tunnels SSH).
  * Vérifiez régulièrement l'intégrité des logs et la correction des horodatages.

## Ajoutez des scripts d'automatisation

Voir [Scripts utiles (pour automatiser vérifications et réponses)](on-prem-scripts.md)

## Maintenance hebdomadaire

* Vérifiez le tableau de bord pour de nouvelles alertes
* Sauvegardez le dossier `/var/ossec/logs/` sur une clé USB ou disque externe
* Redémarrez le serveur mensuellement pour libérer la mémoire
* Conservez le serveur dans un endroit sécurisé
* Vérifiez les logs d'alertes (`/opt/siem/alerts/suspicious.log` si utilisation de script)

## Résumé

| Composant        | Emplacement installation | Fichiers de config clés       | Chemins des logs               | Permissions                  |
|------------------|-------------------------|-------------------------------|--------------------------------|------------------------------|
| Zeek             | Serveur/Capteur Ubuntu  | `/etc/zeek/node.cfg`, `local.zeek` | `/opt/zeek/logs/current/*.log` | `chmod/chown` sur logs       |
| Suricata         | Serveur/Capteur Ubuntu  | `/etc/suricata/suricata.yaml` | `/var/log/suricata/eve.json`   | `chmod/chown` sur logs       |
| Sysmon           | Terminaux Windows       | `poweron-sysmon-config.xml`   | Journaux Windows (Canal Sysmon) | Configurer le transfert d'événements |
| Filebeat (Linux) | Serveur/Capteur Ubuntu  | `/etc/filebeat/filebeat.yml`  | Lit logs Zeek/Suricata         | Lecture sur logs             |
| Filebeat (Windows)| Terminaux Windows      | `filebeat.yml`                | Lit logs `.evtx` Sysmon        | Lecture sur logs             |
| Wazuh Manager    | Serveur Ubuntu          | `/var/ossec/etc/ossec.conf`   | Reçoit tous les logs via agents | N/A                          |

Il ne bloque pas toutes les menaces, mais il vous permet de **les voir**, et c'est la moitié de la bataille. Pour un support supplémentaire, contactez un groupe local de confiance pour les droits numériques - ils peuvent vous guider à distance via chat chiffré ou téléphone.

Avec cette configuration basée sur des outils open source, abordable, tout reste sous votre toit - pas de cloud, pas d'exposition à des tiers. C'est votre radar privé, surveillant tranquillement les logiciels espions ou les falsifications. La puissance du système vient de pratiques simples : vérifiez régulièrement les logs, répondez aux alertes et protégez l'accès physique. Avec des directives de base, tout le monde dans le refuge peut aider à faire fonctionner et comprendre ce système.

## Construction de tableaux de bord Kibana et alertes Wazuh pour la détection de logiciels espions

1. Ouvrez votre navigateur web préféré.

2. Entrez votre URL Kibana, qui ressemble généralement à :

```
http://your-kibana-server:5601
```

3. Connectez-vous avec votre nom d'utilisateur et mot de passe.

## Création de modèles d'index dans Kibana

Les modèles d'index indiquent à Kibana quelles données regarder.

1. Dans la barre latérale gauche, cliquez sur **Stack Management** (ou juste **Management** selon votre version de Kibana).

2. Sous **Kibana**, sélectionnez **Index Patterns**.

3. Cliquez sur **Create index pattern**.

4. Entrez le nom du modèle d'index correspondant à vos données de log :

   * Pour les logs Zeek : `zeek-*`
   * Pour les logs Suricata : `suricata-*`
   * Pour les logs Sysmon : `sysmon-*`
   * Pour les alertes Wazuh : `wazuh-alerts-*`

5. Cliquez sur **Next step**.

6. Sélectionnez le **champ de temps** pour votre modèle d'index, généralement `@timestamp`.

7. Cliquez sur **Create index pattern**.

Répétez pour chaque source de données.

## Création de visualisations dans Kibana

Vous créerez plusieurs visualisations pour surveiller l'activité liée aux logiciels espions.

### Visualisation des connexions aux domaines et IPs de logiciels espions

**Objectif :** Voir le trafic réseau vers les domaines de logiciels espions connus ou IPs suspectes.

1. Dans la barre latérale gauche, cliquez sur **Analytics** → **Visualize Library**.

2. Cliquez sur **Create visualization**.

3. Choisissez **Lens**.

4. Sélectionnez le modèle d'index `zeek-*` ou `suricata-*`.

5. Dans le panneau droit, localisez le champ `destination.ip` ou `dns.rrname` (nom de domaine demandé).

6. Faites glisser `destination.ip` dans l'espace de travail principal.

7. Faites glisser `source.ip` à côté ou ajoutez-le comme **Break down by** pour voir les mappages source-destination.

8. Pour filtrer les domaines ou IPs liés aux logiciels espions :

   * Cliquez sur **Add filter** au-dessus de l'espace de travail.
   * Sélectionnez le champ pertinent (`dns.rrname` ou `destination.ip`).
   * Choisissez **is one of**.
   * Entrez votre liste de domaines de logiciels espions connus ou adresses IP, séparés par des virgules.
   * Cliquez sur **Save**.

9. Ajustez le type de visualisation si désiré (ex. graphique à barres, tableau).

10. Cliquez sur **Save** en haut, nommez-le **Connexions réseau de logiciels espions** et sauvegardez.

### Visualisation des requêtes DNS suspectes

**Objectif :** Identifier les requêtes DNS vers des domaines suspects.

1. Créez une nouvelle visualisation comme ci-dessus.

2. Sélectionnez le modèle d'index `zeek-*` ou `suricata-*`.

3. Faites glisser le champ `dns.rrname` ou `dns.query` dans la zone principale.

4. Définissez l'agrégation sur **Top values** et la taille sur quelque chose de raisonnable comme 10 ou 20.

5. Ajoutez des filtres :

   * Pour inclure uniquement les domaines suspects, ajoutez un filtre sur `dns.rrname` pour votre liste de domaines de logiciels espions.

   * Alternativement, excluez les domaines populaires courants :

     * Ajoutez un filtre avec `dns.rrname` **is not one of** et listez des domaines courants (google.com, microsoft.com, etc.).

6. Cliquez sur **Save**, nommez-le **Requêtes DNS suspectes**.

### Visualisation des modèles de beaconing

**Objectif :** Détecter les appels réseau répétitifs et périodiques typiques du beaconing de logiciels espions.

1. Créez une nouvelle visualisation en utilisant **Lens** ou **Graphique en lignes**.

2. Sélectionnez le modèle d'index `zeek-*` ou `suricata-*`.

3. Définissez l'axe X sur **Date Histogram** basé sur `@timestamp`.

4. Définissez l'intervalle sur 1 ou 5 minutes selon votre volume de logs.

5. Définissez l'axe Y sur **Count** des événements.

6. Pour cibler l'activité suspecte :

   * Ajoutez un filtre sur `destination.ip` ou `dns.rrname` pour les IPs ou domaines de logiciels espions.

7. Optionnellement, ajoutez **Break down by** `source.ip` pour voir quels hôtes font du beaconing.

8. Sauvegardez sous **Activité de beaconing**.

### Visualisation des processus et connexions suspects de Sysmon

**Objectif :** Voir les créations de processus et connexions réseau suspectes depuis les terminaux Windows.

1. Créez une nouvelle visualisation.

2. Sélectionnez le modèle d'index `sysmon-*`.

3. Pour les créations de processus :

   * Filtrez `event_id` = 1 (création de processus Sysmon).

   * Faites glisser le champ `process_name` ou `image` dans l'espace de travail.

   * Agrégez par principales valeurs.

4. Pour les connexions réseau :

   * Filtrez `event_id` = 3.

   * Faites glisser `destination_ip` ou `destination_port`.

5. Appliquez des filtres pour les noms de processus ou ports suspects connus si disponibles.

6. Sauvegardez la visualisation sous **Activité suspecte de Sysmon**.

## Construction du tableau de bord Kibana

1. Dans la barre latérale gauche, cliquez sur **Dashboard**.

2. Cliquez sur **Create new dashboard**.

3. Cliquez sur **Add** et sélectionnez les visualisations sauvegardées :

   * Connexions réseau de logiciels espions
   * Requêtes DNS suspectes
   * Activité de beaconing
   * Activité suspecte de Sysmon

4. Organisez les visualisations logiquement pour un monitoring rapide.

5. Cliquez sur **Save**, nommez votre tableau de bord, ex. **Aperçu du monitoring des logiciels espions**.

## Corrélation des logs de terminaux et réseau par nom d'hôte ou IP

Cela aide à lier l'activité réseau suspecte à des terminaux spécifiques.

1. Assurez-vous que vos logs ont des identifiants cohérents :

   * Logs Zeek et Suricata : `source.ip`, `destination.ip`

   * Logs Sysmon : `hostname` ou `computer_name`

2. Pour corréler dans Kibana : Utilisez **Lens** ou **Canvas** pour créer des visualisations combinées en faisant correspondre `source.ip` de Zeek/Suricata avec `hostname` dans les logs Sysmon.

3. Exemple : Construisez un graphique chronologique montrant le beaconing réseau par IP source avec les processus suspects du même IP/nom d'hôte.

## Création d'alertes Wazuh pour des événements suspects combinés

### Écriture de règles de corrélation personnalisées

1. Connectez-vous à votre manager Wazuh (serveur Ubuntu).

2. Ouvrez le fichier de règles personnalisées :

```bash
sudo nano /var/ossec/etc/rules/local_rules.xml
```

3. Écrivez une règle qui se déclenche si plusieurs événements suspects se produisent ensemble. Exemple :

```xml
<rule id="100500" level="12">
  <if_sid>100200</if_sid>  <!-- Connexion suspecte Zeek -->
  <if_sid>200300</if_sid>  <!-- Alerte logiciel espion Suricata -->
  <if_sid>300400</if_sid>  <!-- Processus suspect Sysmon -->
  <frequency>3</frequency>
  <timeframe>600</timeframe> <!-- 10 minutes -->
  <description>Activité de logiciel espion détectée à travers réseau et terminal</description>
</rule>
```

4. Sauvegardez et quittez.

### Redémarrez le manager Wazuh pour appliquer les règles

```bash
sudo systemctl restart wazuh-manager
```

## Configuration des actions d'alerte

Vous voulez que Wazuh vous notifie lors d'activités suspectes.

1. Éditez la configuration Wazuh :

```bash
sudo nano /var/ossec/etc/ossec.conf
```

2. Configurez les alertes email, webhook Slack ou autres méthodes de notification dans les sections `<global>` et `<alerts>`.

3. Sauvegardez et redémarrez le manager Wazuh :

```bash
sudo systemctl restart wazuh-manager
```

## Test des tableaux de bord et alertes

1. Générez des événements de test :

   * Simulez des requêtes DNS vers des domaines de logiciels espions.
   * Déclenchez des connexions réseau vers des IPs suspectes connues.
   * Lancez des processus suspects sur des terminaux Windows.

2. Confirmez que les logs apparaissent dans les visualisations Kibana.

3. Confirmez que les alertes se déclenchent dans Wazuh et que vous recevez des notifications.

## Conseils de corrélation Wazuh et Kibana

* Envoyez les logs Zeek (`conn.log`, `dns.log`, `http.log`) via Filebeat ou ingestion native.
* Ingérez la sortie `eve.json` de Suricata et mappez `alert.signature` dans les tableaux de bord.
* Transférez les logs Sysmon avec l'agent Wazuh ; utilisez l'ensemble de règles par défaut pour le filtrage d'événements.

### Idées de tableaux de bord

* Domaines/IPs liés aux logiciels espions au fil du temps
* Comportement de beaconing par terminal
* Fréquence des alertes Suricata par hôte
* Détections corrélées : processus + réseau + DNS pour le même hôte

### Astuce d'automatisation

Déclenchez une alerte Wazuh si :

* Un processus avec ligne de commande suspecte démarre, **et**
* Une signature de beaconing se déclenche dans les 10 minutes depuis le même hôte

Configurez des notifications pour les correspondances de haute confiance via email ou webhook.

# Résumé

Ce guide vous a mené de zéro à un tableau de bord de monitoring Kibana fonctionnel, avec des alertes Wazuh sur des indicateurs combinés de logiciels espions couvrant les logs réseau et terminaux.

Vous avez maintenant :

* Des modèles d'index personnalisés pour Zeek, Suricata, Sysmon et alertes Wazuh
* Des visualisations suivant les connexions aux domaines de logiciels espions, requêtes DNS, beaconing et événements suspects Sysmon
* Un tableau de bord complet unifiant le tout
* Des règles de corrélation Wazuh déclenchant des alertes sur des activités suspectes multi-sources
* Une configuration de notifications pour des alertes actionnables

Aucune connaissance préalable requise, suivez simplement chaque étape comme décrit. Les défenses numériques de votre refuge sont maintenant bien plus vigilantes.
