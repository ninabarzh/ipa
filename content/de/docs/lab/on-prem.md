---
title: "Einrichtung eines sicherheitsbasierten Schutzsystems im Schutzraum"
weight: 2
translationKey: "on-prem"
_build:
  render: always
menu:
  sidebar:  # Ergänzt Docsys automatisch generierte Seitenleiste
    weight: 10
description: "Diese Anleitung führt Sie durch die Einrichtung des SIEM-Stacks vollständig innerhalb Ihres Schutzraums. Privat, leistungsstark und in Ihren Händen – keine Cloud erforderlich."
---

## Haftungsausschluss: System in aktiver Entwicklung

Der PowerOn On-Prem SIEM-Stack befindet sich derzeit in aktiver Entwicklung. Das bedeutet, dass sich Dinge schnell ändern können – Funktionen können sich verschieben, Integrationen können brechen und einige Konfigurationen sind noch experimentell oder nicht in Produktionsumgebungen getestet.

Die hier bereitgestellten Anleitungen richten sich an technische Nutzer, die Pilot-Systeme oder Test-Installationen aufbauen. Wenn Sie diesen Stack zum Schutz gefährdeter Personen einsetzen, gehen Sie äußerst sorgfältig vor. Validieren Sie jede Komponente in Ihrer eigenen Umgebung und gehen Sie davon aus, dass nichts von Haus aus bombensicher ist.

Wir arbeiten aktiv an der Erweiterung der Dokumentation, fügen Beispielkonfigurationen hinzu und verfeinern die Strategien zur Log-Korrelation über Zeek, Suricata, Sysmon und Linux-Endpoints hinweg. Beiträge, Korrekturen und praxiserprobte Verbesserungen sind sehr willkommen.

Bis zur offiziellen Stabilitätserklärung sollten Sie diesen Stack als lebendiges System betrachten: in manchen Bereichen fragil, in anderen vielversprechend und stets revisionsbedürftig.

## Design-Entscheidungen

* Keine Drittanbieter-Cloud-Plattformen
* Keine Daten, die Ihr Gebäude verlassen
* Keine undurchsichtige Überwachung von Schutzsuchenden

Das System ist ausgelegt für Schutzräume mit:

* Einer stabilen Internetverbindung (auch wenn sie nur innerhalb des Gebäudes verfügbar ist)
* Einem kleinen, aber engagierten Team
* Keinem technischen Hintergrund (wir erklären alles)
* Der Notwendigkeit, Anzeichen von digitalem Stalking, Manipulation oder Überwachung zu erkennen

## Was dieses System leisten soll

Es sammelt Hinweise von Geräten (wie Logs, Warnungen und auffälliges Verhalten), überwacht auf Anzeichen von Tracking oder Eindringversuchen und bietet ein visuelles Dashboard, damit Sie Bedrohungen schnell erkennen und handeln können.

## Was Sie benötigen

### Ein Schutzraum-Server (Ihre Kommandozentrale)

Dies ist die Maschine, auf der alles läuft.

**Mindestanforderungen:**

* Ubuntu 22.04 LTS (eine kostenlose Linux-Version – wir erklären die Installation bei Bedarf)
* Mindestens 8 GB RAM (Arbeitsspeicher)
* Mindestens 4 CPU-Kerne (Rechenleistung)
* Mindestens 100 GB Speicherplatz
* Eine **feste** interne IP-Adresse (damit andere Geräte sie immer finden)

*Falls unsicher, bitten Sie Ihren IT-Helfer, eine feste IP wie `192.168.1.10` einzurichten.*

Sie können verwenden:

* Einen übrigen PC
* Einen Mini-PC (wie Intel NUC)
* Eine virtuelle Maschine auf Ihrem vorhandenen Admin-Computer (falls leistungsstark genug)

### Zu überwachende Geräte

Dies sind die Geräte, die dieses System bedienen kann:

* Windows-Laptops
* macOS-Geräte (z.B. MacBooks)
* Android-Handys (gerootet = mehr Zugriff, aber nicht erforderlich)
* iPhones (nur teilweise Daten, außer bei Jailbreak)

### Schutzraum-Netzwerk (verkabelt oder Wi-Fi)

Muss nur alle Geräte **innerhalb** des Gebäudes verbinden. Das System benötigt nach der Einrichtung keine Internetverbindung.

### Optional: PiRogue-Gerät

[Ein kleines Toolkit (basierend auf einem Raspberry Pi)](/docs/lab/pts.md), das Geräte auf verdächtiges Verhalten überprüft, bevor sie dem Schutzraum-Netzwerk beitreten. Ideal während Aufnahmegesprächen oder Outreach.

## Schritt-für-Schritt-Server-Einrichtung

Hier leben all Ihre Sicherheitstools.

1. Öffnen Sie ein Terminalfenster (Auf Ihrem Ubuntu-Server drücken Sie `Strg + Alt + T`)
2. Aktualisieren Sie Ihr System und installieren Sie einige essentielle Tools, um sicherzustellen, dass Ihr Server auf dem neuesten Stand ist und Pakete sicher herunterladen kann:

```bash
sudo apt update && sudo apt install -y curl unzip gnupg
```

3. Installieren Sie Java (wird von einigen ELK-Komponenten benötigt):

```bash
sudo apt install -y openjdk-11-jdk
```

### Installation von Wazuh (Ihr Kern-Sicherheitssystem)

Wazuh ist ein Open-Source-System, das Geräte überwacht, nach Problemen sucht und Ihnen Warnungen sowie ein Dashboard bietet. Es umfasst:
* Wazuh Manager (verarbeitet Warnungen und Aktionen)
* Wazuh API (ermöglicht die Kommunikation zwischen Dashboard und System)
* Elasticsearch (speichert Logs und Daten)
* Kibana (Ihr visuelles Dashboard)

1. Fügen Sie die Wazuh-Softwarequelle hinzu:

```bash
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | sudo gpg --dearmor -o /usr/share/keyrings/wazuh.gpg

echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | sudo tee /etc/apt/sources.list.d/wazuh.list

sudo apt update
```

2. Installieren Sie Wazuh und unterstützende Tools:

```bash
sudo apt install -y wazuh-manager wazuh-api elasticsearch kibana
```

3. Starten Sie die Dienste, um sie jetzt und bei jedem Neustart des Servers auszuführen:

```bash
sudo systemctl enable --now wazuh-manager elasticsearch kibana
```

### Einrichtung des Wazuh-Dashboards

Sobald alles läuft, öffnen Sie einen Browser auf Ihrem Server und gehen Sie zu Ihrem Hauptkontrollraum. Sie melden sich an und sehen Warnungen, Geräteinformationen und mehr:

```
http://localhost:5601
```

Oder von einem anderen Gerät im selben Netzwerk:

```
http://192.168.1.10:5601
```

### Installation von Zeek (Ihr Netzwerküberwachungssystem)

Zeek (ehemals Bro) ist ein leistungsstarkes Netzwerkanalyse-Framework, das den gesamten Netzwerkverkehr überwacht und detaillierte Logs von Verbindungen, Dateien und Protokollen erstellt. Es umfasst:

* Echtzeit-Verkehrsanalyse
* Protokollerfassung (HTTP, DNS, SSL usw.)
* Dateiextraktionsfähigkeiten
* Benutzerdefinierte Skripte zur Bedrohungserkennung

1. Installieren Sie Zeek aus den Ubuntu-Repositories:

```bash
sudo apt install -y zeek
```

Falls Zeek in Ihrer Ubuntu-Version nicht verfügbar ist (oder Sie neuere Funktionen benötigen), bauen Sie es aus dem Quellcode:

```bash
# Installieren Sie Build-Abhängigkeiten
sudo apt install -y cmake make gcc g++ flex bison libpcap-dev libssl-dev python3 python3-dev zlib1g-dev

# Laden Sie Zeek herunter und bauen Sie es (ersetzen Sie X.X.X durch die neueste Version)
wget https://download.zeek.org/zeek-X.X.X.tar.gz
tar xzf zeek-X.X.X.tar.gz
cd zeek-X.X.X
./configure
make
sudo make install
```

2. Konfigurieren Sie Zeek zur Überwachung Ihrer Netzwerkschnittstelle (finden Sie Ihre mit `ip link show`):

```bash
sudo nano /etc/zeek/node.cfg
```

Ändern Sie die Angabe zu Ihrer Schnittstelle (normalerweise `eth0` oder `ens33`):
```ini
[zeek]
type=standalone
host=localhost
interface=eth0   # Ändern Sie dies zu Ihrer tatsächlichen Schnittstelle
```

3. Fügen Sie benutzerdefinierte Spyware-Erkennungsskripte hinzu

* Speichern Sie Ihr Erkennungsskript (z.B. `poweron-spyware.zeek`) in `/opt/zeek/share/zeek/site/` oder `/opt/zeek/poweron-spyware.zeek`.
* Bearbeiten Sie `/opt/zeek/local.zeek` und fügen Sie hinzu:

```zeek
@load ./poweron-spyware.zeek
```

4. Setzen Sie Berechtigungen:

* Zeek benötigt **Lese-** und **Schreibzugriff** auf seine Log-Verzeichnisse (`/opt/zeek/logs/current/`).
* Falls Sie Zeek als Nicht-Root-Benutzer ausführen, stellen Sie sicher, dass dieser Benutzer in den entsprechenden Gruppen ist oder die Log-Verzeichnisse besitzt:

```bash
sudo chown -R zeekuser:zeekgroup /opt/zeek/logs
sudo chmod -R 750 /opt/zeek/logs
```

5. Starten Sie den Zeek-Dienst:

```bash
sudo systemctl enable --now zeek
sudo zeekctl deploy  # Erste Bereitstellung
```

6. Überprüfen Sie, ob Zeek läuft:

```bash
zeekctl status
```

### Installation von Suricata (Ihr Intrusion Detection System)

Suricata ist ein leistungsstarkes Intrusion Detection System (IDS), das:
* Netzwerkverkehr auf bösartige Muster scannt
* Bekannte Angriffssignaturen erkennt
* Sicherheitswarnungen generiert
* Mit Threat-Intelligence-Feeds integriert

1. Installieren Sie Suricata und Abhängigkeiten:

```bash
sudo apt install -y suricata jq
```

2. Konfigurieren Sie Suricata zur Überwachung Ihrer Netzwerkschnittstelle:

```bash
sudo nano /etc/suricata/suricata.yaml
```

Setzen Sie die `af-packet`-Schnittstelle:

```yaml
af-packet:
  - interface: eth0   # Ersetzen Sie durch Ihre Schnittstelle
    threads: auto
    cluster-id: 99
    cluster-type: cluster_flow
    defrag: yes
```

Aktivieren Sie die EVE-JSON-Ausgabe für den Log-Versand:

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

3. Aktualisieren Sie die Suricata-Regeln (einschließlich Emerging Threats):

```bash
sudo suricata-update
sudo suricata-update update-sources
sudo systemctl restart suricata
```

4. Setzen Sie Berechtigungen

Stellen Sie sicher, dass Suricata auf `/var/log/suricata/` schreiben kann:

```bash
sudo chown -R suricata:suricata /var/log/suricata
sudo chmod -R 750 /var/log/suricata
```

5. Aktivieren und starten Sie Suricata

```bash
sudo systemctl enable suricata
sudo systemctl start suricata
```

6. Überprüfen Sie, ob Suricata läuft:

```bash
sudo systemctl status suricata
```

7. Überprüfen Sie aktuelle Warnungen (sollte ein leeres Array \[] anzeigen, falls keine Bedrohungen erkannt wurden):

```bash
jq '.event_type' /var/log/suricata/eve.json | grep alert | wc -l
```

### Konfigurieren Sie Zeek und Suricata für den Start beim Booten

Stellen Sie sicher, dass beide Dienste automatisch neu starten:

```bash
sudo systemctl enable zeek
sudo systemctl enable suricata
```

### Überprüfen Sie die Integration mit Ihrem Dashboard

Nach etwa 5 Minuten überprüfen Sie Ihr Wazuh-Dashboard unter `http://192.168.1.10:5601` auf:
1. Zeek-Netzwerklogs unter "Security Events"
2. Suricata-Warnungen im Abschnitt "Threat Detection"

Zur Fehlerbehebung überprüfen Sie die Logs mit:
```bash
journalctl -u zeek -f
journalctl -u suricata -f
```

## Verbindung von Geräten Schutzsuchender

So sammeln Sie nützliche Logs und Warnungen von jedem Gerät.

### Für Windows oder Mac

Diese Geräte verwenden ein Programm namens **Wazuh Agent**, um Logs an Ihren Server zu senden.

*Was ist ein Wazuh Agent?* Eine kleine App, die im Hintergrund läuft und sicherheitsrelevante Informationen wie Anmeldeversuche, seltsames App-Verhalten oder Änderungen an Einstellungen sammelt. Sie sendet diese Daten sicher an Ihren Server.

**Option 1: Agent direkt über den Browser installieren**

1. Öffnen Sie auf dem Gerät einen Webbrowser.
2. Gehen Sie zu: `http://192.168.1.10:5601`
3. Laden Sie den Agenten für Windows oder macOS herunter.
4. Führen Sie das Installationsprogramm aus.
5. Geben Sie bei Aufforderung nach der Server-IP die feste IP Ihres Servers ein (z.B. `192.168.1.10`)

**Option 2: Installation über USB-Stick (falls auf dem Gerät kein Internet verfügbar ist)**

1. Auf dem Server:

```bash
wget https://packages.wazuh.com/4.x/agents/wazuh-agent_x.x.x.msi
cp wazuh-agent_x.x.x.msi /media/usb
```

2. Stecken Sie den USB in das Gerät des Schutzsuchenden.
3. Führen Sie das Installationsprogramm manuell aus.

### Für Android (gerootet)

**Gerootet** bedeutet vollen Zugriff auf das interne System des Telefons. Falls nicht gerootet, siehe nächster Abschnitt.

1. Installieren Sie Termux (eine Linux-Terminal-App): Laden Sie es von [F-Droid](https://f-droid.org/packages/com.termux/) herunter.
2. Öffnen Sie Termux und tippen Sie:

```bash
pkg update && pkg install curl git
curl -s http://192.168.1.10/setup_android.sh | bash
```

([Dieses Skript muss auf Ihrem Server vorbereitet werden](/docs/lab/on-prem-scripts.md).)

### Für Android (nicht gerootet)

Sie extrahieren Logs manuell mit `adb`.

*Was ist `adb`?* ADB (Android Debug Bridge) ist ein Tool, das Ihnen ermöglicht, mit Android-Telefonen von einem Computer aus zu kommunizieren. Sie verwenden es, um Systeminformationen und Logs zu kopieren.

1. Installieren Sie adb auf Ihrem Ubuntu-Server:

```bash
sudo apt install android-tools-adb
```

2. Aktivieren Sie USB-Debugging auf dem Telefon:

   * Gehen Sie zu **Einstellungen → Telefoninfo**
   * Tippen Sie siebenmal auf **Build-Nummer**, um die Entwickleroptionen freizuschalten
   * Gehen Sie zu **Entwickleroptionen**, aktivieren Sie **USB-Debugging**

3. Verbinden Sie das Telefon mit dem Server über ein USB-Kabel.
4. Überprüfen Sie, ob es erkannt wird:

```bash
adb devices
```

Sie sollten eine Geräte-ID sehen. Falls nicht, überprüfen Sie Ihr USB-Kabel und die Berechtigungen.

5. Kopieren Sie Logs vom Telefon:

```bash
adb logcat -d > /opt/logs/android_logcat.txt
adb bugreport > /opt/logs/android_bugreport.zip
```

6. Optional: Extrahieren Sie die App-Liste und Proxy-Einstellungen

```bash
adb shell pm list packages -f > /opt/logs/android_apps.txt
adb shell settings get global http_proxy
```

### Für jailbroken iPhones (voller Zugriff)

1. Installieren Sie OpenSSH über Cydia (Jailbreak-App-Store)
2. Verwenden Sie [sichere Skripte](on-prem-scripts.md), um Logs per SSH auf Ihren Server zu übertragen

### iPhones, die **nicht** jailbroken sind

Verwenden Sie lokale Backups, um App-Daten zu extrahieren.

1. Installieren Sie Tools auf dem Server:

```bash
sudo apt install libimobiledevice-utils
```

2. Erstellen Sie ein Backup des iPhones:

```bash
idevicebackup2 backup /opt/backups/ios_device/
```

3. Führen Sie ein [Parser-Skript](on-prem-scripts.md) aus (möglicherweise benötigen Sie Hilfe):

```bash
python3 parse_ios_backup.py /opt/backups/ios_device/
```

Suchen Sie nach:

* Unbekannten Apps
* Standortprotokollen
* Mirroring-Software

### Sysmon-Installation (Windows-Endpoints)

Sysmon (System Monitor) ist ein Windows-Systemdienst, der protokolliert:  

* Prozesserstellungen mit Befehlszeilen  
* Netzwerkverbindungen  
* Dateierstellungszeitstempel  
* Treiberladungen  
* Detailliertere Überwachung als Standard-Windows-Logs  

Installieren Sie Sysmon **nach** der Bereitstellung der Wazuh-Agenten, aber **vor** der Konfiguration erweiterter Überwachungsregeln.

1. Laden Sie Sysmon von Microsoft herunter [https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon):

```powershell
Invoke-WebRequest -Uri "https://download.sysinternals.com/files/Sysmon.zip" -OutFile "$env:TEMP\Sysmon.zip"
Expand-Archive -Path "$env:TEMP\Sysmon.zip" -DestinationPath "C:\Program Files\Sysmon"
```

2. Erstellen Sie eine Konfigurationsdatei  

Verwenden Sie eine minimale, auf Spyware fokussierte Konfiguration (speichern als `poweron-sysmon-config.xml`):

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

3. Installieren Sie mit Konfiguration

Öffnen Sie PowerShell als Administrator und führen Sie aus:

```powershell
cd "C:\Program Files\Sysmon"
.\Sysmon64.exe -i poweron-sysmon-config.xml -accepteula
```

4. Überprüfen Sie in der Ereignisanzeige  

Öffnen Sie: **Ereignisanzeige > Anwendungs- und Dienstprotokolle > Microsoft > Windows > Sysmon > Betriebsbereit** 

Hier sollten neue Prozess-/Netzwerkereignisse angezeigt werden.

5. Fügen Sie dies zur `ossec.conf` des Wazuh-Agenten hinzu:  

```xml
<localfile>
  <log_format>eventchannel</log_format>
  <location>Microsoft-Windows-Sysmon/Operational</location>
</localfile>
```

### Einrichtung der Linux-Endpoint-Überwachung

* Da Sysmon nur für Windows ist, für Linux-Endpoints:

  * Verwenden Sie `auditd` zur Prozess- und Dateisystemüberwachung.
  * Nutzen Sie Zeek und Suricata auf Netzwerksensoren.
  * Setzen Sie Wazuh-Agenten auf Linux-Maschinen ein, um Syslogs, auditd-Logs und benutzerdefinierte Logs zu sammeln.
  * Konfigurieren Sie Wazuh-Agenten für detaillierte Linux-Ereigniserfassung.

### Optional: Verwenden Sie PiRogue, um Geräte vor der Verbindung zu scannen

[Ein PiRogue-Gerät](pts.md) sitzt zwischen dem Netzwerk und einem Telefon/Laptop und beobachtet den gesamten Verkehr.

1. Verbinden Sie sich mit dem PiRogue:

```bash
ssh pi@piroguedevice.local
```

2. Starten Sie einen Netzwerkscan:

```bash
sudo ./start_capture.sh --target 192.168.1.75
```

3. Nach Abschluss des Scans senden Sie die Daten an Ihren Server:

```bash
scp capture.pcap user@192.168.1.10:/opt/forensics/
```

4. Überprüfen Sie mit diesem Befehl:

```bash
tshark -r /opt/forensics/capture.pcap
```

## Versand von Logs an das SIEM

### Versand von Zeek-Logs über Filebeat auf Sensormaschinen

1. Installieren Sie Filebeat:

```bash
sudo apt install -y filebeat
```

2. Konfigurieren Sie `/etc/filebeat/filebeat.yml`:

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

3. Aktivieren Sie das Zeek-Modul (optional, falls Modul verwendet):

```bash
sudo filebeat modules enable zeek
```

4. Starten und aktivieren Sie Filebeat:

```bash
sudo systemctl start filebeat
sudo systemctl enable filebeat
```

### Versand von Suricata-Logs über Filebeat

1. Fügen Sie in `/etc/filebeat/filebeat.yml` hinzu:

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

2. Aktivieren Sie das Suricata-Modul (optional):

```bash
sudo filebeat modules enable suricata
```

3. Starten Sie Filebeat neu, um die Änderungen zu übernehmen:

```bash
sudo systemctl restart filebeat
```

### Versand von Sysmon-Logs von Windows-Endpoints

* Installieren Sie auf Windows den Wazuh-Agenten (bevorzugt) oder Filebeat.
* Konfigurieren Sie für den Wazuh-Agenten die Erfassung von Sysmon-Ereigniskanal-Logs (siehe unten).
* Falls Filebeat verwendet wird, konfigurieren Sie es zum Lesen von Sysmon-Ereignislogs und zum Versand direkt an Wazuh oder Elasticsearch.

## Konfiguration von Wazuh für die Log-Erfassung

### Hinzufügen von Zeek-Logs

Fügen Sie in der Wazuh-Manager- oder Agent-Konfiguration (`ossec.conf`) hinzu:

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

### Hinzufügen von Suricata-Logs

Fügen Sie in `ossec.conf` hinzu:

```xml
<localfile>
  <log_format>json</log_format>
  <location>/var/log/suricata/eve.json</location>
</localfile>
```

### Hinzufügen von Sysmon-Logs

In der `ossec.conf` des Windows-Agenten:

```xml
<localfile>
  <log_format>eventchannel</log_format>
  <location>Microsoft-Windows-Sysmon/Operational</location>
</localfile>
```

## Decoder- und Ruleset-Einrichtung für Wazuh

### Zeek-Decoder und Rule-Set-Konfiguration

Damit Zeek-Logs in Wazuh sinnvoll sind, müssen Sie die richtigen Decoder und Regeln aktivieren. Standardmäßig versteht Wazuh Zeek-Logs nicht automatisch, es sei denn, es wird entsprechend konfiguriert. So gehen Sie vor:

1. Aktivieren Sie den Zeek-Decoder

Überprüfen Sie die Datei `etc/decoders/zeek-decoder.xml` auf Ihrem Wazuh-Manager. Falls nicht vorhanden, erstellen Sie sie mit:

```xml
<decoder name="zeek">
  <program_name>zeek</program_name>
  <type>json</type>
</decoder>
```

Falls Sie JSON-Logs ohne `program_name`-Feld erfassen, fügen Sie benutzerdefinierte Regeln hinzu, die auf bestimmte Zeek-Felder wie `uid`, `id.orig_h`, `proto` usw. reagieren.

2. Laden Sie Rule-Dateien für Zeek

Wazuh benötigt Regeln, die die Struktur und Semantik von Zeek-Logs verstehen. Entweder:

* Verwenden Sie [community-beigetragene Zeek-Regeln](https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/ruleset.html) von Wazuh, oder
* Erstellen Sie eine `rules/zeek_rules.xml`-Datei mit Einträgen wie:

```xml
<group name="zeek,">
  <rule id="100200" level="5">
    <decoded_as>json</decoded_as>
    <field name="proto">tcp</field>
    <description>Zeek TCP-Verbindung erkannt</description>
  </rule>
</group>
```

Dies ermöglicht das Flaggen, Korrelieren oder Eskalieren basierend auf Zeek-Inhalten.

3. Falls Logs von einer anderen Maschine gesendet werden...

Wenn Zeek auf einem Sensor läuft und Logs an die SIEM-Maschine sendet:

* **Berechtigungen**: Stellen Sie sicher, dass Filebeat (oder Ihr Sync-Prozess) Berechtigungen zum Lesen der Zeek-Logs hat und dass diese nicht vor der Erfassung rotiert werden. Verwenden Sie `chmod o+r` oder eine dedizierte Gruppe.

* **Integrität**: Vermeiden Sie Manipulation oder Kürzung mit:

  * `rsync -a --checksum` oder
  * Verschlüsselten Transportkanälen (z.B. SSH-Tunnel, Filebeat über TLS)

* **Zeitstempel**: Überprüfen Sie Zeitzonen und verwenden Sie `ts`-Felder aus den Zeek-Logs direkt – vermeiden Sie die Abhängigkeit von Dateimodifikationszeiten.

4. Überprüfen Sie, ob alles verbunden ist

* Führen Sie `wazuh-logtest` mit einer Zeek-Log-Zeile aus, um die Übereinstimmung zu testen
* Beobachten Sie `/var/ossec/logs/ossec.log` auf Decoder-Fehler oder Warnungen
* Verwenden Sie `alerts.json` oder den Discover-Tab in Kibana, um zu bestätigen, dass Regeln wie erwartet ausgelöst werden

### Aktivieren Sie Suricata-Decoder

Verwenden Sie die standardmäßigen Suricata-Decoder und -Regeln von Wazuh oder Community-Beiträge.

### Aktivieren Sie Sysmon-Decoder

Wazuh enthält standardmäßige Sysmon-Decoder und -Regeln. Stellen Sie sicher, dass sie aktiviert sind.

## Tests und Validierung

* Führen Sie `filebeat test config -c filebeat.yml` aus, bevor Sie Filebeat starten
* Bestätigen Sie, dass Logs innerhalb von 30 Sekunden in Ihrem Index oder Manager erscheinen
* Verwenden Sie `jq`, um Zeek-JSON manuell zu validieren, falls die Erfassung mysteriös fehlschlägt

1. Führen Sie aus:

```bash
filebeat test config -c /etc/filebeat/filebeat.yml
```

2. Testen Sie Wazuh-Decoder mit:

```bash
wazuh-logtest
```

3. Überwachen Sie die Wazuh-Manager-Logs (`/var/ossec/logs/ossec.log`) auf Decoder-Fehler.
4. Überprüfen Sie Elasticsearch/Kibana auf eingehende Logs und Warnungen.

## Sicherheits- und Integritätsüberlegungen

* Für den Remote-Log-Versand stellen Sie sicher:
  * Dateiberechtigungen erlauben das Lesen der Logs durch Filebeat/Wazuh.
  * Logs werden nicht vor der Erfassung rotiert.
  * Verwenden Sie verschlüsselte Transportkanäle (TLS, SSH-Tunnel).
  * Überprüfen Sie regelmäßig die Log-Integrität und die Korrektheit der Zeitstempel.

## Fügen Sie Automatisierungsskripte hinzu

Siehe [Hilfreiche Skripte (zur Automatisierung von Prüfungen und Reaktionen)](on-prem-scripts.md)

## Wöchentliche Wartung

* Überprüfen Sie das Dashboard auf neue Warnungen
* Sichern Sie den Ordner `/var/ossec/logs/` auf einem USB oder externen Laufwerk
* Starten Sie den Server monatlich neu, um den Speicher zu bereinigen
* Schließen Sie den Server an einem sicheren Ort ein
* Überprüfen Sie die Warnlogs (`/opt/siem/alerts/suspicious.log`, falls Skript verwendet wird)

## Zusammenfassung

| Komponente       | Installationsort     | Wichtige Konfigurationsdateien     | Log-Pfade                                | Berechtigungen                      |
|------------------|----------------------|------------------------------------|------------------------------------------|-------------------------------------|
| Zeek             | Ubuntu-Server/Sensor | `/etc/zeek/node.cfg`, `local.zeek` | `/opt/zeek/logs/current/*.log`           | `chmod/chown` für Logs              |
| Suricata         | Ubuntu-Server/Sensor | `/etc/suricata/suricata.yaml`      | `/var/log/suricata/eve.json`             | `chmod/chown` für Logs              |
| Sysmon           | Windows-Endpoints    | `poweron-sysmon-config.xml`        | Windows-Ereignisprotokoll (Sysmon-Kanal) | Ereignisweiterleitung konfigurieren |
| Filebeat (Linux) | Ubuntu-Server/Sensor | `/etc/filebeat/filebeat.yml`       | Liest Zeek/Suricata-Logs                 | Lesezugriff auf Logs                |
| Filebeat (Win)   | Windows-Endpoints    | `filebeat.yml`                     | Liest Sysmon-`.evtx`-Logs                | Lesezugriff auf Logs                |
| Wazuh Manager    | Ubuntu-Server        | `/var/ossec/etc/ossec.conf`        | Empfängt alle Logs über Agenten          | N/A                                 |

Es blockiert nicht alle Bedrohungen, aber es lässt Sie **sie sehen**, und das ist die halbe Miete. Für zusätzliche Unterstützung wenden Sie sich an eine vertrauenswürdige lokale Digitalrechte-Gruppe – sie kann Sie remote über verschlüsselten Chat oder Telefon anleiten.

Mit diesem auf Open-Source-Tools basierenden Setup bleibt alles unter Ihrem Dach – keine Cloud, keine Drittanbieter-Exposition. Es ist Ihr privates Radar, das leise nach Stalkerware oder Manipulation Ausschau hält. Die Stärke des Systems liegt in einfachen Praktiken: Überprüfen Sie regelmäßig Logs, reagieren Sie auf Warnungen und schützen Sie den physischen Zugriff. Mit grundlegender Anleitung kann jeder im Schutzraum helfen, dieses System zu betreiben und zu verstehen.

## Erstellung von Kibana-Dashboards und Wazuh-Warnungen zur Spyware-Erkennung

1. Öffnen Sie Ihren bevorzugten Webbrowser.

2. Geben Sie Ihre Kibana-URL ein, die normalerweise wie folgt aussieht:

```
http://your-kibana-server:5601
```

3. Melden Sie sich mit Ihrem Benutzernamen und Passwort an.

## Erstellung von Indexmustern in Kibana

Indexmuster teilen Kibana mit, auf welche Daten es achten soll.

1. Klicken Sie in der linken Seitenleiste auf **Stack Management** (oder je nach Kibana-Version nur **Management**).

2. Wählen Sie unter **Kibana** die Option **Index Patterns**.

3. Klicken Sie auf **Create index pattern**.

4. Geben Sie den Namen des Indexmusters ein, das zu Ihren Log-Daten passt:

   * Für Zeek-Logs: `zeek-*`
   * Für Suricata-Logs: `suricata-*`
   * Für Sysmon-Logs: `sysmon-*`
   * Für Wazuh-Warnungen: `wazuh-alerts-*`

5. Klicken Sie auf **Next step**.

6. Wählen Sie das **Zeitfeld** für Ihr Indexmuster, normalerweise `@timestamp`.

7. Klicken Sie auf **Create index pattern**.

Wiederholen Sie dies für jede Datenquelle.

## Erstellung von Visualisierungen in Kibana

Sie werden mehrere Visualisierungen erstellen, um spyware-bezogene Aktivitäten zu überwachen.

### Visualisierung von Verbindungen zu Spyware-Domains und IP-Adressen

**Ziel:** Netzwerkverkehr zu bekannten Spyware-Domains oder verdächtigen IPs sehen.

1. Klicken Sie in der linken Seitenleiste auf **Analytics** → **Visualize Library**.

2. Klicken Sie auf **Create visualization**.

3. Wählen Sie **Lens**.

4. Wählen Sie das `zeek-*` oder `suricata-*` Indexmuster.

5. Suchen Sie im rechten Panel nach dem Feld `destination.ip` oder `dns.rrname` (angefragter Domainname).

6. Ziehen Sie `destination.ip` in den Hauptarbeitsbereich.

7. Ziehen Sie `source.ip` daneben oder fügen Sie es als **Break down by** hinzu, um Quell-Ziel-Zuordnungen zu sehen.

8. Zum Filtern nach spyware-bezogenen Domains oder IPs:

   * Klicken Sie oberhalb des Arbeitsbereichs auf **Add filter**.
   * Wählen Sie das relevante Feld (`dns.rrname` oder `destination.ip`).
   * Wählen Sie **is one of**.
   * Geben Sie Ihre Liste bekannter Spyware-Domains oder IP-Adressen ein, durch Kommas getrennt.
   * Klicken Sie auf **Save**.

9. Passen Sie den Visualisierungstyp bei Bedarf an (z.B. Balkendiagramm, Tabelle).

10. Klicken Sie oben auf **Save**, benennen Sie es **Spyware-Netzwerkverbindungen** und speichern Sie es.

### Visualisierung verdächtiger DNS-Abfragen

**Ziel:** DNS-Abfragen zu verdächtigen Domains identifizieren.

1. Erstellen Sie eine neue Visualisierung wie oben.

2. Wählen Sie das `zeek-*` oder `suricata-*` Indexmuster.

3. Ziehen Sie das Feld `dns.rrname` oder `dns.query` in den Hauptbereich.

4. Setzen Sie die Aggregation auf **Top values** und die Größe auf einen sinnvollen Wert wie 10 oder 20.

5. Fügen Sie Filter hinzu:

   * Um nur verdächtige Domains einzubeziehen, fügen Sie einen Filter auf `dns.rrname` für Ihre Spyware-Domainliste hinzu.

   * Alternativ schließen Sie gängige beliebte Domains aus:

     * Fügen Sie einen Filter mit `dns.rrname` **is not one of** hinzu und listen Sie gängige Domains auf (google.com, microsoft.com usw.).

6. Klicken Sie auf **Save**, benennen Sie es **Verdächtige DNS-Abfragen**.

### Visualisierung von Beaconing-Mustern

**Ziel:** Wiederholte, periodische Netzwerkaufrufe erkennen, die typisch für Spyware-Beaconing sind.

1. Erstellen Sie eine neue Visualisierung mit **Lens** oder **Liniendiagramm**.

2. Wählen Sie das `zeek-*` oder `suricata-*` Indexmuster.

3. Setzen Sie die X-Achse auf **Date Histogram** basierend auf `@timestamp`.

4. Setzen Sie das Intervall je nach Log-Aufkommen auf 1 oder 5 Minuten.

5. Setzen Sie die Y-Achse auf **Count** der Ereignisse.

6. Zur Eingrenzung auf verdächtige Aktivitäten:

   * Fügen Sie einen Filter auf `destination.ip` oder `dns.rrname` für Spyware-IPs oder -Domains hinzu.

7. Optional fügen Sie **Break down by** `source.ip` hinzu, um zu sehen, welche Hosts beaconing betreiben.

8. Speichern Sie als **Beaconing-Aktivität**.

### Visualisierung verdächtiger Sysmon-Prozesse und Netzwerkverbindungen

**Ziel:** Verdächtige Prozesserstellungen und Netzwerkverbindungen von Windows-Endpoints anzeigen.

1. Erstellen Sie eine neue Visualisierung.

2. Wählen Sie das `sysmon-*` Indexmuster.

3. Für Prozesserstellungen:

   * Filtern Sie `event_id` = 1 (Sysmon-Prozesserstellung).

   * Ziehen Sie das Feld `process_name` oder `image` in den Arbeitsbereich.

   * Aggregieren Sie nach Top-Werten.

4. Für Netzwerkverbindungen:

   * Filtern Sie `event_id` = 3.

   * Ziehen Sie `destination_ip` oder `destination_port`.

5. Wenden Sie Filter für bekannte verdächtige Prozessnamen oder Ports an, falls verfügbar.

6. Speichern Sie die Visualisierung als **Verdächtige Sysmon-Aktivität**.

## Erstellung des Kibana-Dashboards

1. Klicken Sie in der linken Seitenleiste auf **Dashboard**.

2. Klicken Sie auf **Create new dashboard**.

3. Klicken Sie auf **Add** und wählen Sie die gespeicherten Visualisierungen:

   * Spyware-Netzwerkverbindungen
   * Verdächtige DNS-Abfragen
   * Beaconing-Aktivität
   * Verdächtige Sysmon-Aktivität

4. Ordnen Sie die Visualisierungen logisch für eine übersichtliche Überwachung an.

5. Klicken Sie auf **Save**, benennen Sie Ihr Dashboard, z.B. **Spyware-Überwachungsübersicht**.

## Korrelation von Endpunkt- und Netzwerklogs nach Hostname oder IP

Dies hilft, verdächtige Netzwerkaktivitäten mit bestimmten Endpoints zu verknüpfen.

1. Stellen Sie sicher, dass Ihre Logs konsistente Identifikatoren haben:

   * Zeek- und Suricata-Logs: `source.ip`, `destination.ip`

   * Sysmon-Logs: `hostname` oder `computer_name`

2. Zur Korrelation in Kibana: Verwenden Sie **Lens** oder **Canvas**, um kombinierte Visualisierungen zu erstellen, indem Sie `source.ip` aus Zeek/Suricata mit `hostname` in Sysmon-Logs abgleichen.

3. Beispiel: Erstellen Sie ein Zeitreihendiagramm, das Netzwerk-Beaconing nach Quell-IP zusammen mit verdächtigen Prozessen derselben IP/Hostname zeigt.

## Erstellung von Warnungen in Wazuh für kombinierte verdächtige Ereignisse

### Schreiben benutzerdefinierter Korrelationsregeln

1. Verbinden Sie sich mit Ihrem Wazuh-Manager (Ubuntu-Server).

2. Öffnen Sie die benutzerdefinierte Regeldatei:

```bash
sudo nano /var/ossec/etc/rules/local_rules.xml
```

3. Schreiben Sie eine Regel, die auslöst, wenn mehrere verdächtige Ereignisse zusammen auftreten. Beispiel:

```xml
<rule id="100500" level="12">
  <if_sid>100200</if_sid>  <!-- Zeek verdächtige Verbindung -->
  <if_sid>200300</if_sid>  <!-- Suricata Spyware-Warnung -->
  <if_sid>300400</if_sid>  <!-- Sysmon verdächtiger Prozess -->
  <frequency>3</frequency>
  <timeframe>600</timeframe> <!-- 10 Minuten -->
  <description>Spyware-Aktivität über Netzwerk und Endpunkt hinweg erkannt</description>
</rule>
```

4. Speichern und beenden.

### Neustart des Wazuh-Managers zur Anwendung der Regeln

```bash
sudo systemctl restart wazuh-manager
```

## Konfiguration von Warnaktionen

Sie möchten, dass Wazuh Sie bei verdächtigen Aktivitäten benachrichtigt.

1. Bearbeiten Sie die Wazuh-Konfiguration:

```bash
sudo nano /var/ossec/etc/ossec.conf
```

2. Konfigurieren Sie E-Mail-Warnungen, Slack-Webhook oder andere Benachrichtigungsmethoden innerhalb der Abschnitte `<global>` und `<alerts>`.

3. Speichern und starten Sie den Wazuh-Manager neu:

```bash
sudo systemctl restart wazuh-manager
```

## Testen von Dashboards und Warnungen

1. Generieren Sie Testereignisse:

   * Simulieren Sie DNS-Abfragen zu Spyware-Domains.
   * Lösen Sie Netzwerkverbindungen zu bekannten verdächtigen IPs aus.
   * Starten Sie verdächtige Prozesse auf Windows-Endpoints.

2. Bestätigen Sie, dass Logs in Kibana-Visualisierungen erscheinen.

3. Bestätigen Sie, dass Warnungen in Wazuh ausgelöst werden und Sie Benachrichtigungen erhalten.

## Wazuh- und Kibana-Korrelationstipps

* Versenden Sie Zeek-Logs (`conn.log`, `dns.log`, `http.log`) über Filebeat oder native Erfassung.
* Erfassen Sie die Suricata-Ausgabe `eve.json` und bilden Sie `alert.signature` in Dashboards ab.
* Leiten Sie Sysmon-Logs mit dem Wazuh-Agenten weiter; verwenden Sie das Standard-Regelset für die Ereignisfilterung.

### Dashboard-Ideen

* Spyware-bezogene Domains/IPs über die Zeit
* Beaconing-Verhalten nach Endpunkt
* Häufigkeit von Suricata-Warnungen nach Host
* Korrelierte Erkennungen: Prozess + Netzwerk + DNS für denselben Host

### Automatisierungstipp

Lösen Sie eine Wazuh-Warnung aus, wenn:

* Ein Prozess mit verdächtiger Befehlszeile startet, **und**
* Innerhalb von 10 Minuten vom selben Host eine Beaconing-Signatur ausgelöst wird

Richten Sie Benachrichtigungen für hochvertrauenswürdige Treffer per E-Mail oder Webhook ein.

# Zusammenfassung

Diese Anleitung hat Sie von Null auf ein funktionierendes Kibana-Überwachungsdashboard gebracht, mit Wazuh-Warnungen bei kombinierten Spyware-Indikatoren über Netzwerk- und Endpunkt-Logs hinweg.

Sie haben jetzt:

* Benutzerdefinierte Indexmuster für Zeek, Suricata, Sysmon und Wazuh-Warnungen
* Visualisierungen zur Verfolgung von Spyware-Domain-Verbindungen, DNS-Abfragen, Beaconing und verdächtigen Sysmon-Ereignissen
* Ein umfassendes Dashboard, das alles zusammenbringt
* Wazuh-Korrelationsregeln, die bei verdächtigen Multi-Source-Aktivitäten Warnungen auslösen
* Benachrichtigungseinrichtung für handlungsrelevante Warnungen

Kein Vorwissen erforderlich, folgen Sie einfach jedem Schritt wie beschrieben. Die digitalen Abwehrkräfte Ihres Schutzraums sind jetzt viel wachsamer.