---
title: "Hoe een opvangcentrumbeveiligingssysteem op te zetten"
weight: 2
translationKey: "on-prem"
_build:
  render: always
menu:
  sidebar:  # Wordt toegevoegd aan de automatisch gegenereerde zijbalk van Docsy
    weight: 10
description: "Deze handleiding begeleidt je bij het opzetten van de SIEM-stack volledig binnen je opvangcentrum. Privé, krachtig en in jouw handen - geen cloud nodig."
---

## Disclaimer: Systeem in actieve ontwikkeling

De PowerOn on-prem SIEM-stack is momenteel in actieve ontwikkeling. Dit betekent dat zaken snel kunnen veranderen - functies kunnen verschuiven, integraties kunnen breken en sommige configuraties zijn nog experimenteel of niet getest in productieomgevingen.

De begeleiding hier is bedoeld voor technische gebruikers die pilotsystemen of testimplementaties bouwen. Als je deze stack implementeert om kwetsbare personen te beschermen, wees uiterst voorzichtig. Valideer elke component in je eigen omgeving en ga ervan uit dat niets standaard waterdicht is.

We breiden actief documentatie uit, voegen voorbeeldconfiguraties toe en verfijnen logcorrelatiestrategieën over Zeek, Suricata, Sysmon en Linux-endpoints heen. Bijdragen, correcties en veldgeteste verbeteringen zijn zeer welkom.

Totdat het als stabiel wordt verklaard, behandel deze stack als een levend systeem: kwetsbaar in sommige gebieden, veelbelovend in andere, en altijd onderhevig aan revisie.

## Ontwerpkeuzes

* Geen cloudplatforms van derden
* Geen data die je gebouw verlaat
* Geen mysterieuze surveillance van slachtoffers

Het is ontworpen voor opvangcentra met:

* Een stabiele internetverbinding (zelfs als die alleen binnen het gebouw werkt)
* Een klein maar toegewijd team
* Geen technische achtergrond (we leggen alles uit)
* Behoefte aan het opsporen van signalen van digitale stalking, manipulatie of surveillance

## Wat dit systeem zou moeten doen

Het verzamelt aanwijzingen van apparaten (zoals logs, waarschuwingen en vreemd gedrag), houdt toezicht op tekenen van tracking of inbraak, en geeft je een visueel dashboard zodat je bedreigingen snel kunt spotten en actie kunt ondernemen.

## Wat je nodig hebt

### Een opvangcentrumserver (je commandocentrum)

Dit is de machine waar alles op draait.

**Minimale specificaties:**

* Ubuntu 22.04 LTS (een gratis versie van Linux - we leggen uit hoe je dit installeert indien nodig)
* Minimaal 8 GB RAM (geheugen)
* Minimaal 4 CPU-cores (verwerkingskracht)
* Minimaal 100 GB schijfruimte
* Een **vast** intern IP-adres (zodat andere apparaten het altijd kunnen vinden)

*Bij twijfel, vraag je IT-vrijwilliger om een vast IP in te stellen zoals `192.168.1.10`.*

Je kunt gebruiken:

* Een reserve-PC
* Een mini-PC (zoals Intel NUC)
* Een virtuele machine op je bestaande beheercomputer (als die krachtig genoeg is)

### Te monitoren apparaten

Dit zijn de apparaten die dit systeem kan bedienen:

* Windows-laptops
* macOS-apparaten (bijv. MacBooks)
* Android-telefoons (geroot = meer toegang, maar niet vereist)
* iPhones (alleen gedeeltelijke data tenzij gejailbreakt)

### Opvangcentrumnetwerk (bedraad of Wi-Fi)

Moet alleen alle apparaten **binnen** het gebouw verbinden. Het systeem heeft geen internettoegang nodig na installatie.

### Optioneel: PiRogue-apparaat

[Een kleine toolkit (gebaseerd op Raspberry Pi)](/docs/lab/pts.md) die apparaten controleert op verdacht gedrag voordat ze verbinding maken met het opvangcentrumnetwerk. Ideaal tijdens intakegesprekken of outreach.

## Stapsgewijze serverinstallatie

Hier draaien al je beveiligingstools.

1. Open een terminalvenster (Op je Ubuntu-server druk je op `Ctrl + Alt + T`)
2. Werk je systeem bij en installeer enkele essentiële tools om ervoor te zorgen dat je server up-to-date is en pakketten veilig kan downloaden:

```bash
sudo apt update && sudo apt install -y curl unzip gnupg
```

3. Installeer Java (vereist door sommige ELK-componenten):

```bash
sudo apt install -y openjdk-11-jdk
```

### Installeer Wazuh (je kernbeveiligingssysteem)

Wazuh is een open-source systeem dat apparaten bewaakt, problemen opspoort en je waarschuwingen en een dashboard geeft. Het omvat:
* Wazuh Manager (handelt waarschuwingen en acties)
* Wazuh API (laat het dashboard met het systeem communiceren)
* Elasticsearch (slaat logs en data op)
* Kibana (je visuele dashboard)

1. Voeg de Wazuh-softwarebron toe:

```bash
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | sudo gpg --dearmor -o /usr/share/keyrings/wazuh.gpg

echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | sudo tee /etc/apt/sources.list.d/wazuh.list

sudo apt update
```

2. Installeer Wazuh en ondersteunende tools:

```bash
sudo apt install -y wazuh-manager wazuh-api elasticsearch kibana
```

3. Start de services om ze nu en bij elke herstart van de server te laten draaien:

```bash
sudo systemctl enable --now wazuh-manager elasticsearch kibana
```

### Stel het Wazuh-dashboard in

Zodra alles draait, open je een browser op je server en ga je naar je hoofdcontrolecentrum. Je logt in en ziet waarschuwingen, apparaatinfo en meer:

```
http://localhost:5601
```

Of vanaf een ander apparaat op hetzelfde netwerk:

```
http://192.168.1.10:5601
```

### Installeer Zeek (je netwerkmonitoringsysteem)

Zeek (voorheen Bro) is een krachtig netwerkanalyseframework dat al het netwerkverkeer monitort en gedetailleerde logs maakt van verbindingen, bestanden en protocollen. Het omvat:

* Realtime verkeersanalyse
* Protocoldetectie (HTTP, DNS, SSL etc.)
* Bestandsextractiemogelijkheden
* Aangepaste scripts voor dreigingsdetectie

1. Installeer Zeek vanuit de Ubuntu-repositories:

```bash
sudo apt install -y zeek
```

Als Zeek niet beschikbaar is in je Ubuntu-versie (of je hebt nieuwere functies nodig), bouw het dan vanuit broncode:

```bash
# Installeer bouwafhankelijkheden
sudo apt install -y cmake make gcc g++ flex bison libpcap-dev libssl-dev python3 python3-dev zlib1g-dev

# Download en bouw Zeek (vervang X.X.X met de nieuwste versie)
wget https://download.zeek.org/zeek-X.X.X.tar.gz
tar xzf zeek-X.X.X.tar.gz
cd zeek-X.X.X
./configure
make
sudo make install
```

2. Configureer Zeek om je netwerkinterface te monitoren (vind de jouwe met `ip link show`):

```bash
sudo nano /etc/zeek/node.cfg
```

Wijzig om je interface te specificeren (meestal `eth0` of `ens33`):
```ini
[zeek]
type=standalone
host=localhost
interface=eth0   # Verander dit naar je daadwerkelijke interface
```

3. Voeg aangepaste spyware-detectiescripts toe

* Sla je detectiescript op (bijv. `poweron-spyware.zeek`) in `/opt/zeek/share/zeek/site/` of `/opt/zeek/poweron-spyware.zeek`.
* Bewerk `/opt/zeek/local.zeek` en voeg toe:

```zeek
@load ./poweron-spyware.zeek
```

4. Stel rechten in:

* Zeek moet **lezen** en **schrijven** kunnen naar zijn logmappen (`/opt/zeek/logs/current/`).
* Als je Zeek als niet-root gebruiker draait, zorg dan dat deze gebruiker in de juiste groepen zit of eigenaar is van de logmappen:

```bash
sudo chown -R zeekuser:zeekgroup /opt/zeek/logs
sudo chmod -R 750 /opt/zeek/logs
```

5. Start de Zeek-service:

```bash
sudo systemctl enable --now zeek
sudo zeekctl deploy  # Initiële implementatie
```

6. Verifieer dat Zeek draait:

```bash
zeekctl status
```

### Installeer Suricata (je inbraakdetectiesysteem)

Suricata is een krachtig inbraakdetectiesysteem (IDS) dat:
* Netwerkverkeer scant op kwaadaardige patronen
* Bekende aanvalssignaturen detecteert
* Beveiligingswaarschuwingen genereert
* Integreert met dreigingsinformatie-feeds

1. Installeer Suricata en afhankelijkheden:

```bash
sudo apt install -y suricata jq
```

2. Configureer Suricata om je netwerkinterface te monitoren:

```bash
sudo nano /etc/suricata/suricata.yaml
```

Stel de `af-packet`-interface in:

```yaml
af-packet:
  - interface: eth0   # Vervang met je interface
    threads: auto
    cluster-id: 99
    cluster-type: cluster_flow
    defrag: yes
```

Schakel EVE JSON-uitvoer in voor logverzending:

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

3. Werk Suricata-regels bij (inclusief opkomende bedreigingen):

```bash
sudo suricata-update
sudo suricata-update update-sources
sudo systemctl restart suricata
```

4. Stel rechten in

Zorg dat Suricata kan schrijven naar `/var/log/suricata/`:

```bash
sudo chown -R suricata:suricata /var/log/suricata
sudo chmod -R 750 /var/log/suricata
```

5. Schakel in en start Suricata

```bash
sudo systemctl enable suricata
sudo systemctl start suricata
```

6. Verifieer dat Suricata draait:

```bash
sudo systemctl status suricata
```

7. Controleer recente waarschuwingen (zou een lege array \[] moeten tonen als geen bedreigingen zijn gedetecteerd):

```bash
jq '.event_type' /var/log/suricata/eve.json | grep alert | wc -l
```

### Configureer Zeek en Suricata om bij opstarten te starten

Zorg dat beide services automatisch herstarten:

```bash
sudo systemctl enable zeek
sudo systemctl enable suricata
```

### Verifieer integratie met je dashboard

Na ongeveer 5 minuten, controleer je Wazuh-dashboard op `http://192.168.1.10:5601` voor:
1. Zeek-netwerklogs onder "Security Events"
2. Suricata-waarschuwingen in de "Threat Detection"-sectie

Voor probleemoplossing, controleer logs met:
```bash
journalctl -u zeek -f
journalctl -u suricata -f
```

## Verbind slachtofferapparaten

Zo verzamel je nuttige logs en waarschuwingen van elk apparaat.

### Voor Windows of Mac

Deze apparaten gebruiken een programma genaamd de **Wazuh Agent** om logs naar je server te sturen.

*Wat is een Wazuh Agent?* Een kleine app die op de achtergrond draait, beveiligingsgerelateerde informatie verzamelt zoals inlogpogingen, vreemd app-gedrag of wijzigingen in instellingen. Het stuurt deze data veilig naar je server.

**Optie 1: Installeer agent rechtstreeks vanuit browser**

1. Open op het apparaat een webbrowser.
2. Ga naar: `http://192.168.1.10:5601`
3. Download de agent voor Windows of macOS.
4. Voer de installer uit.
5. Voer bij de vraag om de server-IP het vaste IP van je server in (bijv. `192.168.1.10`)

**Optie 2: Installeer via USB-stick (als internet niet beschikbaar is op het apparaat)**

1. Op de server:

```bash
wget https://packages.wazuh.com/4.x/agents/wazuh-agent_x.x.x.msi
cp wazuh-agent_x.x.x.msi /media/usb
```

2. Steek de USB in het apparaat van het slachtoffer.
3. Voer de installer handmatig uit.

### Voor Android (geroot)

**Geroot** betekent volledige toegang tot het interne telefoonsysteem. Indien niet geroot, zie volgende sectie.

1. Installeer Termux (een Linux-terminalapp): Download van [F-Droid](https://f-droid.org/packages/com.termux/).
2. Open Termux en typ:

```bash
pkg update && pkg install curl git
curl -s http://192.168.1.10/setup_android.sh | bash
```

([Dit script moet op je server worden voorbereid](/docs/lab/on-prem-scripts.md).)

### Voor Android (niet geroot)

Je haalt logs handmatig op met `adb`.

*Wat is `adb`?* ADB (Android Debug Bridge) is een tool waarmee je met Android-telefoons kunt communiceren vanaf een computer. Je gebruikt het om systeeminformatie en logs te kopiëren.

1. Installeer adb op je Ubuntu-server:

```bash
sudo apt install android-tools-adb
```

2. Schakel USB-debugging in op de telefoon:

   * Ga naar **Instellingen → Telefooninfo**
   * Tik 7 keer op **Buildnummer** om ontwikkelaarsopties vrij te geven
   * Ga naar **Ontwikkelaarsopties**, schakel **USB-debugging** in

3. Verbind de telefoon met de server via USB-kabel.
4. Controleer of deze wordt herkend:

```bash
adb devices
```

Je zou een apparaat-ID moeten zien. Zo niet, controleer je USB-kabel en rechten.

5. Kopieer logs van de telefoon:

```bash
adb logcat -d > /opt/logs/android_logcat.txt
adb bugreport > /opt/logs/android_bugreport.zip
```

6. Optioneel: Haal app-lijst en proxy-instellingen op

```bash
adb shell pm list packages -f > /opt/logs/android_apps.txt
adb shell settings get global http_proxy
```

### Voor gejailbreakte iPhones (volledige toegang)

1. Installeer OpenSSH via Cydia (jailbreak app store)
2. Gebruik [beveiligde scripts](on-prem-scripts.md) om logs naar je server te transfereren via SSH

### iPhones die **niet** gejailbreakt zijn

Gebruik lokale backup om app-data op te halen.

1. Installeer tools op de server:

```bash
sudo apt install libimobiledevice-utils
```

2. Maak een backup van de iPhone:

```bash
idevicebackup2 backup /opt/backups/ios_device/
```

3. Voer een [parser script](on-prem-scripts.md) uit (mogelijk heb je hulp nodig):

```bash
python3 parse_ios_backup.py /opt/backups/ios_device/
```

Zoek naar:

* Onbekende apps
* Locatielogs
* Mirroring-software

### Sysmon installatie (Windows-endpoints)

Sysmon (System Monitor) is een Windows-systeemservice die logt:  

* Procescreaties met opdrachtregels  
* Netwerkverbindingen  
* Bestandscreatietijdstempels  
* Driverloads  
* Meer gedetailleerde tracking dan standaard Windows-logs  

Installeer Sysmon **na** het implementeren van Wazuh-agents maar **voor** het configureren van geavanceerde monitoringregels.

1. Download Sysmon van Microsoft [https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon):

```powershell
Invoke-WebRequest -Uri "https://download.sysinternals.com/files/Sysmon.zip" -OutFile "$env:TEMP\Sysmon.zip"
Expand-Archive -Path "$env:TEMP\Sysmon.zip" -DestinationPath "C:\Program Files\Sysmon"
```

2. Maak een configuratiebestand  

Gebruik een minimale, op spyware gerichte config (bewaar als `poweron-sysmon-config.xml`):

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

3. Installeer met configuratie

Open PowerShell als Administrator, voer uit:

```powershell
cd "C:\Program Files\Sysmon"
.\Sysmon64.exe -i poweron-sysmon-config.xml -accepteula
```

4. Verifieer in Event Viewer  

Open: **Event Viewer > Applications and Services Logs > Microsoft > Windows > Sysmon > Operational** 

Hier zouden nieuwe proces/netwerkgebeurtenissen moeten verschijnen.

5. Voeg dit toe aan de `ossec.conf` van de Wazuh-agent:  

```xml
<localfile>
  <log_format>eventchannel</log_format>
  <location>Microsoft-Windows-Sysmon/Operational</location>
</localfile>
```

### Linux-endpointmonitoring instellen

* Omdat Sysmon alleen voor Windows is, voor Linux-endpoints:

  * Overweeg `auditd` voor proces- en bestandssysteemmonitoring.
  * Gebruik Zeek en Suricata op netwerksensoren.
  * Implementeer Wazuh-agents op Linux-machines om syslogs, auditd-logs en aangepaste logs te verzamelen.
  * Configureer Wazuh-agents voor gedetailleerde Linux-gebeurtenisverzameling.

### Optioneel: Gebruik PiRogue om apparaten te scannen voor verbinding

[Een PiRogue-apparaat](pts.md) zit tussen het netwerk en een telefoon/laptop en observeert al het verkeer.

1. Verbind met de PiRogue:

```bash
ssh pi@piroguedevice.local
```

2. Start een netwerkscan:

```bash
sudo ./start_capture.sh --target 192.168.1.75
```

3. Na de scan, stuur data naar je server:

```bash
scp capture.pcap user@192.168.1.10:/opt/forensics/
```

4. Analyseer met dit commando:

```bash
tshark -r /opt/forensics/capture.pcap
```

## Logs verzenden naar de SIEM

### Zeek-logs verzenden via Filebeat op sensormachines

1. Installeer Filebeat:

```bash
sudo apt install -y filebeat
```

2. Configureer `/etc/filebeat/filebeat.yml`:

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

3. Schakel de Zeek-module in (optioneel, indien module gebruikt):

```bash
sudo filebeat modules enable zeek
```

4. Start en schakel Filebeat in:

```bash
sudo systemctl start filebeat
sudo systemctl enable filebeat
```

### Suricata-logs verzenden via Filebeat

1. Voeg in `/etc/filebeat/filebeat.yml` toe:

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

2. Schakel de Suricata-module in (optioneel):

```bash
sudo filebeat modules enable suricata
```

3. Herstart Filebeat om toe te passen:

```bash
sudo systemctl restart filebeat
```

### Sysmon-logs verzenden vanaf Windows-endpoints

* Installeer op Windows de Wazuh-agent (voorkeur) of Filebeat.
* Voor de Wazuh-agent, configureer deze om Sysmon-gebeurteniskanaallogs te verzamelen (zie beneden).
* Als je Filebeat gebruikt, configureer het om Sysmon-gebeurtenislogs te lezen en direct naar Wazuh of Elasticsearch te sturen.

## Wazuh configureren voor log-opname

### Zeek-logs toevoegen

Voeg in Wazuh-manager of agent-config (`ossec.conf`) toe:

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

### Suricata-logs toevoegen

Voeg toe aan `ossec.conf`:

```xml
<localfile>
  <log_format>json</log_format>
  <location>/var/log/suricata/eve.json</location>
</localfile>
```

### Sysmon-logs toevoegen

In de Windows-agent `ossec.conf`:

```xml
<localfile>
  <log_format>eventchannel</log_format>
  <location>Microsoft-Windows-Sysmon/Operational</location>
</localfile>
```

## Decoder- en regelinstellingen voor Wazuh

### Zeek-decoder en regelconfiguratie

Om Zeek-logs betekenisvol te maken in Wazuh, moet je de juiste decoders en regels inschakelen. Standaard begrijpt Wazuh Zeek-logs niet automatisch tenzij je het vertelt hoe. Hier lees je hoe:

1. Schakel de Zeek-decoder in

Controleer het bestand `etc/decoders/zeek-decoder.xml` op je Wazuh-manager. Als het niet bestaat, maak het aan met:

```xml
<decoder name="zeek">
  <program_name>zeek</program_name>
  <type>json</type>
</decoder>
```

Als je JSON-logs zonder `program_name`-veld opneemt, voeg dan aangepaste regels toe die reageren op specifieke Zeek-velden zoals `uid`, `id.orig_h`, `proto`, etc.

2. Laad regelbestanden voor Zeek

Wazuh heeft regels nodig die de structuur en semantiek van Zeek-logs begrijpen. Ofwel:

* Gebruik Wazuh's [door de community bijgedragen Zeek-regels](https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/ruleset.html), of
* Maak een `rules/zeek_rules.xml` bestand aan met items zoals:

```xml
<group name="zeek,">
  <rule id="100200" level="5">
    <decoded_as>json</decoded_as>
    <field name="proto">tcp</field>
    <description>Zeek TCP-verbinding gedetecteerd</description>
  </rule>
</group>
```

Hiermee kun je markeren, correleren of escaleren op basis van Zeek-inhoud.

3. Als logs vanaf een andere machine worden verzonden...

Wanneer Zeek op een sensor draait en logs naar de SIEM-machine stuurt:

* **Rechten**: Zorg dat Filebeat (of je sync-proces) leesrechten heeft op de Zeek-logs en dat ze niet worden geroteerd voor opname. Gebruik `chmod o+r` of een speciale groep.

* **Integriteit**: Voorkom manipulatie of afkapping met:

  * `rsync -a --checksum` of
  * Versleutelde transportkanalen (bijv. SSH-tunnels, Filebeat over TLS)

* **Tijdstempels**: Controleer tijdzones en gebruik `ts`-velden uit Zeek-logs direct - vermijd afhankelijkheid van bestandswijzigingstijden.

4. Verifieer dat alles verbonden is

* Voer `wazuh-logtest` uit met een Zeek-logregel om matching te testen
* Monitor `/var/ossec/logs/ossec.log` op decoderfouten of waarschuwingen
* Gebruik `alerts.json` of het Discover-tabblad in Kibana om te bevestigen dat regels zoals verwacht worden geactiveerd

### Schakel Suricata-decoders in

Gebruik Wazuh's standaard Suricata-decoders en -regels of community-bijdragen.

### Schakel Sysmon-decoders in

Wazuh bevat standaard Sysmon-decoders en -regels. Zorg dat ze ingeschakeld zijn.

## Tests en validatie

* Voer `filebeat test config -c filebeat.yml` uit voor het starten van Filebeat
* Bevestig dat logs binnen 30 seconden in je index of manager verschijnen
* Gebruik `jq` om Zeek-JSON handmatig te valideren als opname mysterieus faalt

1. Voer uit:

```bash
filebeat test config -c /etc/filebeat/filebeat.yml
```

2. Test Wazuh-decoders met:

```bash
wazuh-logtest
```

3. Monitor Wazuh-managerlogs (`/var/ossec/logs/ossec.log`) op decoderfouten.
4. Controleer Elasticsearch/Kibana op binnenkomende logs en waarschuwingen.

## Beveiligings- en integriteitsoverwegingen

* Voor externe logverzending, zorg dat:
  * Bestandsrechten het lezen van logs door Filebeat/Wazuh toestaan.
  * Logs niet worden geroteerd voor opname.
  * Gebruik versleutelde transportkanalen (TLS, SSH-tunnels).
  * Verifieer regelmatig logintegriteit en tijdstempelcorrectheid.

## Voeg automatiseringsscripts toe

Zie [Handige scripts (om checks en reacties te automatiseren)](on-prem-scripts.md)

## Wekelijkse onderhoud

* Controleer het dashboard op nieuwe waarschuwingen
* Back-up de `/var/ossec/logs/` map naar een USB of externe schijf
* Herstart de server maandelijks om geheugen vrij te maken
* Bewaar de server op een veilige locatie
* Controleer de waarschuwingslogs (`/opt/siem/alerts/suspicious.log` indien script gebruikt)

## Samenvatting

| Component        | Installatielocatie   | Belangrijke configbestanden        | Logpaden                               | Rechten                            |
|------------------|----------------------|------------------------------------|----------------------------------------|------------------------------------|
| Zeek             | Ubuntu-server/sensor | `/etc/zeek/node.cfg`, `local.zeek` | `/opt/zeek/logs/current/*.log`         | `chmod/chown` op logs              |
| Suricata         | Ubuntu-server/sensor | `/etc/suricata/suricata.yaml`      | `/var/log/suricata/eve.json`           | `chmod/chown` op logs              |
| Sysmon           | Windows-endpoints    | `poweron-sysmon-config.xml`        | Windows Gebeurtenislog (Sysmon-kanaal) | Configureer gebeurtenisdoorsturing |
| Filebeat (Linux) | Ubuntu-server/sensor | `/etc/filebeat/filebeat.yml`       | Leest Zeek/Suricata-logs               | Leesrechten op logs                |
| Filebeat (Win)   | Windows-endpoints    | `filebeat.yml`                     | Leest Sysmon `.evtx`-logs              | Leesrechten op logs                |
| Wazuh Manager    | Ubuntu-server        | `/var/ossec/etc/ossec.conf`        | Ontvangt alle logs via agents          | N/A                                |

Het blokkeert niet alle bedreigingen, maar laat je ze **zien**, en dat is het halve werk. Voor extra ondersteuning neem contact op met een vertrouwde lokale digitale rechtenorganisatie - ze kunnen je op afstand begeleiden via versleutelde chat of telefoon.

Met deze op open-source tools gebaseerde setup blijft alles onder jouw dak - geen cloud, geen blootstelling aan derden. Het is je privéradar, die stilletjes waakt naar stalkerware of manipulatie. De kracht van het systeem komt van eenvoudige praktijken: check logs regelmatig, reageer op waarschuwingen en bescherm fysieke toegang. Met basisrichtlijnen kan iedereen in het opvangcentrum helpen dit systeem te bedienen en begrijpen.

## Kibana-dashboards en Wazuh-waarschuwingen bouwen voor spywaredetectie

1. Open je favoriete webbrowser.

2. Voer je Kibana-URL in, die er meestal zo uitziet:

```
http://your-kibana-server:5601
```

3. Log in met je gebruikersnaam en wachtwoord.

## Indexpatronen aanmaken in Kibana

Indexpatronen vertellen Kibana naar welke data het moet kijken.

1. Klik in de linkersidebar op **Stack Management** (of alleen **Management** afhankelijk van je Kibana-versie).

2. Onder **Kibana**, selecteer **Index Patterns**.

3. Klik op **Create index pattern**.

4. Voer de naam in van het indexpatroon dat bij je logdata past:

   * Voor Zeek-logs: `zeek-*`
   * Voor Suricata-logs: `suricata-*`
   * Voor Sysmon-logs: `sysmon-*`
   * Voor Wazuh-waarschuwingen: `wazuh-alerts-*`

5. Klik op **Next step**.

6. Selecteer het **tijdveld** voor je indexpatroon, meestal `@timestamp`.

7. Klik op **Create index pattern**.

Herhaal voor elke gegevensbron.

## Visualisaties maken in Kibana

Je maakt verschillende visualisaties om spyware-gerelateerde activiteit te monitoren.

### Verbindingen naar spywaredomeinen en IP's visualiseren

**Doel:** Netwerkverkeer naar bekende spywaredomeinen of verdachte IP's zien.

1. Klik in de linkersidebar op **Analytics** → **Visualize Library**.

2. Klik op **Create visualization**.

3. Kies **Lens**.

4. Selecteer het `zeek-*` of `suricata-*` indexpatroon.

5. Zoek in het rechterpaneel het veld `destination.ip` of `dns.rrname` (gevraagde domeinnaam).

6. Sleep `destination.ip` naar de hoofdwerkruimte.

7. Sleep `source.ip` ernaast of voeg het toe als **Break down by** om bron-naar-doel-mappingen te zien.

8. Om te filteren op spyware-gerelateerde domeinen of IP's:

   * Klik boven de werkruimte op **Add filter**.
   * Selecteer het relevante veld (`dns.rrname` of `destination.ip`).
   * Kies **is one of**.
   * Voer je lijst met bekende spywaredomeinen of IP-adressen in, gescheiden door komma's.
   * Klik op **Save**.

9. Pas het visualisatietype aan indien gewenst (bijv. staafdiagram, tabel).

10. Klik bovenaan op **Save**, noem het **Spywarenetwerkverbindingen** en sla op.

### Verdachte DNS-query's visualiseren

**Doel:** DNS-query's naar verdachte domeinen identificeren.

1. Maak een nieuwe visualisatie zoals hierboven.

2. Selecteer het `zeek-*` of `suricata-*` indexpatroon.

3. Sleep het veld `dns.rrname` of `dns.query` naar het hoofdgebied.

4. Zet aggregatie op **Top values** en grootte op iets redelijks zoals 10 of 20.

5. Voeg filters toe:

   * Om alleen verdachte domeinen te includeren, voeg een filter toe op `dns.rrname` voor je spywaredomeinenlijst.

   * Alternatief, sluit veelvoorkomende populaire domeinen uit:

     * Voeg een filter toe met `dns.rrname` **is not one of** en lijst veelvoorkomende domeinen (google.com, microsoft.com, etc.).

6. Klik op **Save**, noem het **Verdachte DNS-query's**.

### Beaconingpatronen visualiseren

**Doel:** Repetitieve, periodieke netwerkaanroepen detecteren die typisch zijn voor spyware-beaconing.

1. Maak een nieuwe visualisatie met **Lens** of **Lijndiagram**.

2. Selecteer het `zeek-*` of `suricata-*` indexpatroon.

3. Zet de X-as op **Date Histogram** gebaseerd op `@timestamp`.

4. Zet het interval op 1 of 5 minuten afhankelijk van je logvolume.

5. Zet de Y-as op **Count** van gebeurtenissen.

6. Om te focussen op verdachte activiteit:

   * Voeg een filter toe op `destination.ip` of `dns.rrname` voor spyware-IP's of domeinen.

7. Optioneel, voeg **Break down by** `source.ip` toe om te zien welke hosts beaconing doen.

8. Sla op als **Beaconingactiviteit**.

### Verdachte Sysmon-processen en netwerkverbindingen visualiseren

**Doel:** Verdachte procescreaties en netwerkverbindingen van Windows-endpoints bekijken.

1. Maak een nieuwe visualisatie.

2. Selecteer het `sysmon-*` indexpatroon.

3. Voor procescreaties:

   * Filter `event_id` = 1 (Sysmon-procescreatie).

   * Sleep het veld `process_name` of `image` naar de werkruimte.

   * Aggregeer op topwaarden.

4. Voor netwerkverbindingen:

   * Filter `event_id` = 3.

   * Sleep `destination_ip` of `destination_port`.

5. Pas filters toe voor bekende verdachte procesnamen of poorten indien beschikbaar.

6. Sla de visualisatie op als **Verdachte Sysmon-activiteit**.

## Het Kibana-dashboard bouwen

1. Klik in de linkersidebar op **Dashboard**.

2. Klik op **Create new dashboard**.

3. Klik op **Add** en selecteer je opgeslagen visualisaties:

   * Spywarenetwerkverbindingen
   * Verdachte DNS-query's
   * Beaconingactiviteit
   * Verdachte Sysmon-activiteit

4. Rangschik de visualisaties logisch voor monitoring in één oogopslag.

5. Klik op **Save**, geef je dashboard een naam, bijv. **Spywaremonitoringoverzicht**.

## Endpoint- en netwerklogs correleren op hostnaam of IP

Dit helpt verdachte netwerkactiviteit te koppelen aan specifieke endpoints.

1. Zorg dat je logs consistente identifiers hebben:

   * Zeek- en Suricata-logs: `source.ip`, `destination.ip`

   * Sysmon-logs: `hostname` of `computer_name`

2. Om in Kibana te correleren: Gebruik **Lens** of **Canvas** om gecombineerde visualisaties te maken door `source.ip` van Zeek/Suricata te matchen met `hostname` in Sysmon-logs.

3. Voorbeeld: Bouw een tijdreeksgrafiek die netwerkbeaconing per bron-IP toont naast verdachte processen van hetzelfde IP/hostname.

## Waarschuwingen maken in Wazuh voor gecombineerde verdachte gebeurtenissen

### Aangepaste correlatieregels schrijven

1. Verbind met je Wazuh-manager (Ubuntu-server).

2. Open het aangepaste regelbestand:

```bash
sudo nano /var/ossec/etc/rules/local_rules.xml
```

3. Schrijf een regel die activeert als meerdere verdachte gebeurtenissen samen voorkomen. Voorbeeld:

```xml
<rule id="100500" level="12">
  <if_sid>100200</if_sid>  <!-- Zeek verdachte verbinding -->
  <if_sid>200300</if_sid>  <!-- Suricata spywarewaarschuwing -->
  <if_sid>300400</if_sid>  <!-- Sysmon verdacht proces -->
  <frequency>3</frequency>
  <timeframe>600</timeframe> <!-- 10 minuten -->
  <description>Spywareactiviteit gedetecteerd over netwerk en endpoint</description>
</rule>
```

4. Sla op en sluit af.

### Herstart Wazuh-manager om regels toe te passen

```bash
sudo systemctl restart wazuh-manager
```

## Waarschuwingsacties configureren

Je wilt dat Wazuh je waarschuwt bij verdachte activiteit.

1. Bewerk de Wazuh-configuratie:

```bash
sudo nano /var/ossec/etc/ossec.conf
```

2. Configureer e-mailwaarschuwingen, Slack-webhook of andere notificatiemethoden binnen de `<global>` en `<alerts>` secties.

3. Sla op en herstart de Wazuh-manager:

```bash
sudo systemctl restart wazuh-manager
```

## Dashboards en waarschuwingen testen

1. Genereer testgebeurtenissen:

   * Simuleer DNS-query's naar spywaredomeinen.
   * Activeer netwerkverbindingen naar bekende verdachte IP's.
   * Start verdachte processen op Windows-endpoints.

2. Bevestig dat logs verschijnen in Kibana-visualisaties.

3. Bevestig dat waarschuwingen activeren in Wazuh en je notificaties ontvangt.

## Wazuh- en Kibana-correlatietips

* Verstuur Zeek-logs (`conn.log`, `dns.log`, `http.log`) via Filebeat of native opname.
* Neem Suricata `eve.json` output op en map `alert.signature` in dashboards.
* Stuur Sysmon-logs door met de Wazuh-agent; gebruik de standaardregelset voor gebeurtenisfiltering.

### Dashboardideeën

* Spyware-gerelateerde domeinen/IP's over tijd
* Beaconinggedrag per endpoint
* Suricata-waarschuwingsfrequentie per host
* Gecorreleerde detecties: proces + netwerk + DNS voor dezelfde host

### Automatiseringstip

Activeer een Wazuh-waarschuwing als:

* Een proces met verdachte opdrachtregel start, **en**
* Een beaconing-signatuur activeert binnen 10 minuten vanaf dezelfde host

Stel notificaties in voor hoogvertrouwensmatches via e-mail of webhook.

# Samenvatting

Deze handleiding bracht je van nul naar een functioneel Kibana-monitoringdashboard, met Wazuh-waarschuwingen voor gecombineerde spyware-indicatoren over netwerk- en endpointlogs heen.

Je hebt nu:

* Aangepaste indexpatronen voor Zeek, Suricata, Sysmon en Wazuh-waarschuwingen
* Visualisaties die spywaredomeinverbindingen, DNS-query's, beaconing en verdachte Sysmon-gebeurtenissen volgen
* Een uitgebreid dashboard dat alles samenbrengt
* Wazuh-correlatieregels die waarschuwingen activeren bij verdachte multi-source activiteit
* Notificatie-instellingen voor actiegerichte waarschuwingen

Geen voorkennis nodig, volg gewoon elke stap zoals beschreven. De digitale verdediging van je opvangcentrum is nu veel waakzamer.
