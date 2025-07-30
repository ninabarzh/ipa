---
title: "How to set up a shelter-based security system from the ground up"
linkTitle: "On-prem siem stack"
weight: 3
_build:
  render: always
description: "This guide walks you through setting up the SIEM stack entirely from the ground up as pilot or for testing tools. Private, powerful, and in your hands – no containers or cloud required."
menu:
  sidebar:
    weight: 15
    identifier: "en-on-prem"
    parent: "en-lab"
translationKey: "on-prem"
---

The guidance provided here is designed for technical users building pilot systems or testing tool deployments. It *can* 
be deployed on an old PC or laptop, but if you are deploying this stack to protect vulnerable people, exercise extreme 
care. Validate every component in your own environment, and assume nothing is bulletproof out of the box.

For production, we recommend using our pre-made containers (also under active development).

## Design choices

* No third-party cloud platforms
* No containers
* No data leaving your building
* No mystery surveillance on survivors

It’s designed for shelters with:

* A stable internet connection (even if it’s just inside the building)
* A small but committed team
* No digital background (we’ll explain everything)
* A need to spot signs of digital stalking, tampering, or surveillance

## What this system is supposed to do

It collects clues from devices (like logs, alerts, and odd behaviour), watches for signs of tracking or intrusion, 
and gives you a visual dashboard so you can spot threats and act fast.

## What you’ll need

### A shelter server (your command centre)

This is the machine that will run everything.

**Minimum spec:**

* Ubuntu 22.04 LTS (a free version of Linux — we’ll explain how to install this if you need)
* At least 8 GB RAM (memory)
* At least 4 CPU cores (processing power)
* At least 100 GB disk space
* A **fixed** internal IP address (so other devices can always find it)

*If unsure, ask your IT volunteer to set a fixed IP like `192.168.1.10`.*

You can use:

* A spare PC
* A mini PC (like Intel NUC)
* A virtual machine on your existing admin computer (if powerful enough)

### Devices to monitor

These are the devices this system can serve:

* Windows laptops
* macOS devices (e.g. MacBooks)
* Android phones (rooted = more access, but not required)
* iPhones (only partial data unless jailbroken)

### Shelter network (wired or Wi-Fi)

Just needs to connect all devices **within** the building. The system does not need internet access once set up.

### Optional: PiRogue device

[A small toolkit (based on a Raspberry Pi)](/docs/lab/pts.md) that checks devices for suspicious behaviour before they join the 
shelter network. Ideal during intake interviews or outreach.

## Step-by-step server setup

This is where all your security tools will live.

1. Open a terminal window (On your Ubuntu server, press `Ctrl + Alt + T`)
2. Update your system and install some essential tools to ensure your server is up to date and can download packages securely:

```bash
sudo apt update && sudo apt install -y curl unzip gnupg
```

3. Install Java (required by some ELK components):

```bash
sudo apt install -y openjdk-11-jdk
```

### Install Wazuh (your core security system)

Wazuh is an open-source system that watches devices, looks for problems, and gives you alerts and a dashboard. It includes:
* Wazuh Manager (handles alerts and actions)
* Wazuh API (lets the dashboard talk to the system)
* Elasticsearch (stores logs and data)
* Kibana (your visual dashboard)

1. Add the Wazuh software source:

```bash
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | sudo gpg --dearmor -o /usr/share/keyrings/wazuh.gpg

echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | sudo tee /etc/apt/sources.list.d/wazuh.list

sudo apt update
```

2. Install Wazuh and supporting tools:

```bash
sudo apt install -y wazuh-manager wazuh-api elasticsearch kibana
```

3. Start the services to set them to run now and every time you restart the server:

```bash
sudo systemctl enable --now wazuh-manager elasticsearch kibana
```

### Set up the Wazuh dashboard

Once everything is running, open a browser on your server and go to your main control room. You’ll log in and see alerts, device info, and more:

```
http://localhost:5601
```

Or from another device on the same network:

```
http://192.168.1.10:5601
```

### Install Zeek (your network monitoring system)

Zeek (formerly Bro) is a powerful network analysis framework that monitors all network traffic and creates detailed logs of connections, files, and protocols. It includes:

* Real-time traffic analysis
* Protocol detection (HTTP, DNS, SSL, etc.)
* File extraction capabilities
* Custom scripting for threat detection

1. Install Zeek from Ubuntu repositories:

```bash
sudo apt install -y zeek
```

If Zeek isn't available in your Ubuntu version (or you need newer features), build from source:

```bash
# Install build dependencies
sudo apt install -y cmake make gcc g++ flex bison libpcap-dev libssl-dev python3 python3-dev zlib1g-dev

# Download and build Zeek (replace X.X.X with latest version)
wget https://download.zeek.org/zeek-X.X.X.tar.gz
tar xzf zeek-X.X.X.tar.gz
cd zeek-X.X.X
./configure
make
sudo make install
```

2. Configure Zeek to monitor your network interface (find yours with `ip link show`):

```bash
sudo nano /etc/zeek/node.cfg
```

Modify to specify your interface (usually `eth0` or `ens33`):
```ini
[zeek]
type=standalone
host=localhost
interface=eth0   # Change this to your actual interface
```

3. Add custom spyware detection scripts

* Save your detection script (e.g., `poweron-spyware.zeek`) to `/opt/zeek/share/zeek/site/` or `/opt/zeek/poweron-spyware.zeek`.
* Edit `/opt/zeek/local.zeek` and add:

```zeek
@load ./poweron-spyware.zeek
```

4. Set permissions:

* Zeek must have **read** and **write** access to its log directories (`/opt/zeek/logs/current/`).
* If running Zeek as a non-root user, ensure this user is in appropriate groups or owns the log directories:

```bash
sudo chown -R zeekuser:zeekgroup /opt/zeek/logs
sudo chmod -R 750 /opt/zeek/logs
```

5. Start Zeek service:

```bash
sudo systemctl enable --now zeek
sudo zeekctl deploy  # Initial deployment
```

6. Verify Zeek is running:

```bash
zeekctl status
```

### Install Suricata (your intrusion detection system)

Suricata is a high-performance intrusion detection system (IDS) that:
* Scans network traffic for malicious patterns
* Detects known attack signatures
* Generates security alerts
* Integrates with threat intelligence feeds

1. Install Suricata and dependencies:

```bash
sudo apt install -y suricata jq
```

2. Configure Suricata to monitor your network interface:

```bash
sudo nano /etc/suricata/suricata.yaml
```

Set `af-packet` interface:

```yaml
af-packet:
  - interface: eth0   # Replace with your interface
    threads: auto
    cluster-id: 99
    cluster-type: cluster_flow
    defrag: yes
```

Enable EVE JSON output for log shipping:

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

3. Update Suricata rules (including emerging threats):

```bash
sudo suricata-update
sudo suricata-update update-sources
sudo systemctl restart suricata
```

4. Set permissions

Ensure Suricata can write to `/var/log/suricata/`:

```bash
sudo chown -R suricata:suricata /var/log/suricata
sudo chmod -R 750 /var/log/suricata
```

5. Enable and start Suricata

```bash
sudo systemctl enable suricata
sudo systemctl start suricata
```

6. Verify Suricata is running:

```bash
sudo systemctl status suricata
```

7. Check recent alerts (should show empty array \[] if no threats detected):

```bash
jq '.event_type' /var/log/suricata/eve.json | grep alert | wc -l
```

### Configure Zeek and Suricata to start at boot

Ensure both services will restart automatically:

```bash
sudo systemctl enable zeek
sudo systemctl enable suricata
```

### Verify integration with your dashboard

After about 5 minutes, check your Wazuh dashboard at `http://192.168.1.10:5601` for:
1. Zeek network logs under "Security Events"
2. Suricata alerts in the "Threat Detection" section

For troubleshooting, check logs with:
```bash
journalctl -u zeek -f
journalctl -u suricata -f
```

## Connect survivor devices

This is how you collect useful logs and alerts from each device.

### For Windows or Mac

These devices use a program called the **Wazuh Agent** to send logs to your server.

*What is a Wazuh Agent?* A small app that runs in the background, collecting security-related information like login 
attempts, strange app behaviour, or changes to settings. It sends this data securely to your server.

**Option 1: Install agent directly from browser**

1. On the device, open a web browser.
2. Go to: `http://192.168.1.10:5601`
3. Download the agent for Windows or macOS.
4. Run the installer.
5. When asked for the server IP, enter your server’s fixed IP (e.g. `192.168.1.10`)

**Option 2: Install via USB stick (if internet isn’t available on the device)**

1. On the server:

```bash
wget https://packages.wazuh.com/4.x/agents/wazuh-agent_x.x.x.msi
cp wazuh-agent_x.x.x.msi /media/usb
```

2. Plug the USB into the survivor’s device.
3. Run the installer manually.

### For Android (rooted)

**Rooted** means full access to the phone’s internal system. If not rooted, see next section.

1. Install Termux (a Linux terminal app): Download from [F-Droid](https://f-droid.org/packages/com.termux/).
2. Open Termux and type:

```bash
pkg update && pkg install curl git
curl -s http://192.168.1.10/setup_android.sh | bash
```

([This script must be prepared on your server](/docs/lab/on-prem-scripts.md).)

### For Android (non-rooted)

You’ll manually extract logs using `adb`.

**What is `adb`?** ADB (Android Debug Bridge) is a tool that lets you talk to Android phones from a computer. You’ll 
use it to copy system info and logs.

1. Install adb on your Ubuntu server:

```bash
sudo apt install android-tools-adb
```

2. Enable USB debugging on the phone:

   * Go to **Settings → About phone**
   * Tap **Build number** 7 times to unlock developer options
   * Go to **Developer options**, enable **USB debugging**

3. Connect phone to server with USB cable.
4. Check it is recognised:

```bash
adb devices
```

You should see a device ID listed. If not, check your USB cable and permissions.

5. Copy logs from the phone:

```bash
adb logcat -d > /opt/logs/android_logcat.txt
adb bugreport > /opt/logs/android_bugreport.zip
```

6. Optional: Extract app list and proxy settings

```bash
adb shell pm list packages -f > /opt/logs/android_apps.txt
adb shell settings get global http_proxy
```

### For jailbroken iPhones (full access)

1. Install OpenSSH via Cydia (jailbreak app store)
2. Use [secure scripts](on-prem/on-prem-scripts.md) to transfer logs to your server via SSH

### iPhones which are **not** jailbroken

Use local backup to pull app data.

1. Install tools on server:

```bash
sudo apt install libimobiledevice-utils
```

2. Backup the iPhone:

```bash
idevicebackup2 backup /opt/backups/ios_device/
```

3. Run a [parser script](on-prem/on-prem-scripts.md) (you may need to request help):

```bash
python3 parse_ios_backup.py /opt/backups/ios_device/
```

Look for:

* Unknown apps
* Location logs
* Mirroring software

### Sysmon installation (Windows endpoints)

Sysmon (System Monitor) is a Windows system service that logs:  

* Process creations with command lines  
* Network connections  
* File creation timestamps  
* Driver loads  
* More detailed tracking than standard Windows logs  

Install Sysmon **after** deploying Wazuh agents but **before** configuring advanced monitoring rules.

1. Download Sysmon from Microsoft [https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon):

```powershell
Invoke-WebRequest -Uri "https://download.sysinternals.com/files/Sysmon.zip" -OutFile "$env:TEMP\Sysmon.zip"
Expand-Archive -Path "$env:TEMP\Sysmon.zip" -DestinationPath "C:\Program Files\Sysmon"
```

2. Create configuration file  

Use a minimal, spyware-focused config (save as `poweron-sysmon-config.xml`):

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

3. Install with config

Open PowerShell as Administrator, run:

```powershell
cd "C:\Program Files\Sysmon"
.\Sysmon64.exe -i poweron-sysmon-config.xml -accepteula
```

4. Verify in Event Viewer  

Open: **Event Viewer > Applications and Services Logs > Microsoft > Windows > Sysmon > Operational** 

This should show new process/network events.

5. Add this to Wazuh agent's `ossec.conf`:  

```xml
<localfile>
  <log_format>eventchannel</log_format>
  <location>Microsoft-Windows-Sysmon/Operational</location>
</localfile>
```

### Setting up Linux endpoint monitoring

* Since Sysmon is Windows-only, for Linux endpoints:

  * Consider `auditd` for process and file system monitoring.
  * Use Zeek and Suricata on network sensors.
  * Deploy Wazuh agents on Linux machines to collect syslogs, auditd logs, and custom logs.
  * Configure Wazuh agents for detailed Linux event collection.

### Optional: Use PiRogue to scan devices before they connect

[A PiRogue device](pts.md) sits between the network and a phone/laptop and watches all traffic.

1. Connect to the PiRogue:

```bash
ssh pi@piroguedevice.local
```

2. Start a network scan:

```bash
sudo ./start_capture.sh --target 192.168.1.75
```

3. After scan finishes, send data to your server:

```bash
scp capture.pcap user@192.168.1.10:/opt/forensics/
```

4. Review with this command:

```bash
tshark -r /opt/forensics/capture.pcap
```

## Shipping logs to the SIEM

### Shipping Zeek logs via Filebeat on sensor machines

1. Install Filebeat:

```bash
sudo apt install -y filebeat
```

2. Configure `/etc/filebeat/filebeat.yml`:

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

3. Enable Zeek module (optional, if using module):

```bash
sudo filebeat modules enable zeek
```

4. Start and enable Filebeat:

```bash
sudo systemctl start filebeat
sudo systemctl enable filebeat
```

### Shipping Suricata logs via Filebeat

1. In `/etc/filebeat/filebeat.yml`, add:

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

2. Enable Suricata module (optional):

```bash
sudo filebeat modules enable suricata
```

3. Restart Filebeat to apply:

```bash
sudo systemctl restart filebeat
```

### Shipping Sysmon logs from Windows endpoints

* On Windows, install the Wazuh agent (preferred) or Filebeat.
* For Wazuh agent, configure it to collect Sysmon event channel logs (see below).
* If using Filebeat, configure to read Sysmon event logs and ship to Wazuh or Elasticsearch directly.

## Configuring Wazuh for log ingestion

### Adding Zeek logs

On Wazuh manager or agent config (`ossec.conf`), add:

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

### Adding Suricata logs

Add to `ossec.conf`:

```xml
<localfile>
  <log_format>json</log_format>
  <location>/var/log/suricata/eve.json</location>
</localfile>
```

### Adding Sysmon logs

On Windows agent’s `ossec.conf`:

```xml
<localfile>
  <log_format>eventchannel</log_format>
  <location>Microsoft-Windows-Sysmon/Operational</location>
</localfile>
```

## Decoder and ruleset setup for Wazuh

### Zeek decoder and rule set configuration

For Zeek logs to be meaningful in Wazuh, you must enable the right decoders and rules. Out of the box, Wazuh doesn’t 
automatically understand Zeek logs unless told how to read them. Here’s how to get that sorted:

1. Enable the Zeek decoder

Check your Wazuh manager’s `etc/decoders/zeek-decoder.xml`. If it's not already there, create it with:

```xml
<decoder name="zeek">
  <program_name>zeek</program_name>
  <type>json</type>
</decoder>
```

If you’re ingesting JSON logs without a `program_name` field, add custom rules that trigger on specific Zeek fields 
like `uid`, `id.orig_h`, `proto`, etc.

2. Load rule files for Zeek

Wazuh needs rules that understand the structure and semantics of Zeek logs. Either:

* Use Wazuh’s [community-contributed Zeek rules](https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/ruleset.html), or
* Create a `rules/zeek_rules.xml` file with entries like:

```xml
<group name="zeek,">
  <rule id="100200" level="5">
    <decoded_as>json</decoded_as>
    <field name="proto">tcp</field>
    <description>Zeek TCP connection detected</description>
  </rule>
</group>
```

This lets you flag, correlate, or escalate based on Zeek content.

3. If logs are shipped from another machine...

When Zeek runs on a sensor and sends logs to the SIEM machine:

* **Permissions**: Make sure Filebeat (or your sync process) has permission to read Zeek logs and that they aren’t rotated out before ingestion. Use `chmod o+r` or a dedicated group.

* **Integrity**: Avoid tampering or truncation with:

  * `rsync -a --checksum` or
  * Encrypted transport (e.g., SSH tunnels, Filebeat over TLS)

* **Timestamps**: Check timezones and use `ts` fields from Zeek logs directly – avoid relying on file modification time.

4. Verify everything's connected

* Run `wazuh-logtest` with a Zeek log line to test matching
* Watch `/var/ossec/logs/ossec.log` for decoder errors or warnings
* Use `alerts.json` or Kibana’s Discover tab to confirm rules are firing as expected

### Enable Suricata decoders

Use Wazuh’s default Suricata decoders and rules or community contributions.

### Enable Sysmon decoders

Wazuh includes default Sysmon decoders and rules. Make sure they are enabled.

## Testing and validation

* Run `filebeat test config -c filebeat.yml` before starting Filebeat
* Confirm logs appear in your index or manager within 30 seconds
* Use `jq` to manually validate Zeek JSON if ingestion fails mysteriously

1. Run:

```bash
filebeat test config -c /etc/filebeat/filebeat.yml
```

2. Test Wazuh decoders with:

```bash
wazuh-logtest
```

3. Monitor Wazuh manager logs (`/var/ossec/logs/ossec.log`) for decoder errors.
4. Check Elasticsearch/Kibana for incoming logs and alerts.

## Security and integrity considerations

* For remote log shipping, ensure:
  * File permissions allow reading logs by Filebeat/Wazuh.
  * Logs are not rotated out before ingestion.
  * Use encrypted transport channels (TLS, SSH tunnels).
  * Regularly verify log integrity and timestamp correctness.

## Add automation scripts

See [Helpful scripts (to automate checks and responses)](on-prem/on-prem-scripts.md)

## Weekly maintenance

* Check the dashboard for new alerts
* Back up the `/var/ossec/logs/` folder to a USB or external drive
* Reboot server monthly to clear memory
* Lock server in a secure place
* Review the alert logs (`/opt/siem/alerts/suspicious.log` if using script)

## Summary

| Component        | Installation location | Key config files                   | Log paths                          | Permissions                |
|------------------|-----------------------|------------------------------------|------------------------------------|----------------------------|
| Zeek             | Ubuntu server/sensor  | `/etc/zeek/node.cfg`, `local.zeek` | `/opt/zeek/logs/current/*.log`     | `chmod/chown` on logs      |
| Suricata         | Ubuntu server/sensor  | `/etc/suricata/suricata.yaml`      | `/var/log/suricata/eve.json`       | `chmod/chown` on logs      |
| Sysmon           | Windows endpoints     | `poweron-sysmon-config.xml`        | Windows Event Log (Sysmon channel) | Configure event forwarding |
| Filebeat (Linux) | Ubuntu server/sensor  | `/etc/filebeat/filebeat.yml`       | Reads Zeek/Suricata logs           | Read access to logs        |
| Filebeat (Win)   | Windows endpoints     | `filebeat.yml`                     | Reads Sysmon `.evtx` logs          | Read access to logs        |
| Wazuh Manager    | Ubuntu server         | `/var/ossec/etc/ossec.conf`        | Receives all logs via agents       | N/A                        |

It doesn’t block all threats, but it lets you **see them**, and that's half the battle. For added support, reach 
out to a trusted local digital rights group—they can guide you remotely over encrypted chat or phone.

With this setup based on open-source tools, affordable, everything stays under your roof—no cloud, no third-party 
exposure. It’s your private radar, quietly watching for stalkerware or tampering. The system’s power comes from 
simple practices: check logs regularly, respond to alerts, and protect physical access. With basic guidance, everybody
in the shelter can help run and understand this system.

## Building Kibana dashboards and Wazuh alerts for spyware detection

1. Open your preferred web browser.

2. Enter your Kibana URL, which usually looks like this:

```
http://your-kibana-server:5601
```

3. Log in with your username and password.

## Creating index patterns in Kibana

Index patterns tell Kibana which data to look at.

1. On the left sidebar, click **Stack Management** (or just **Management** depending on your Kibana version).

2. Under **Kibana**, select **Index Patterns**.

3. Click **Create index pattern**.

4. Enter the name of the index pattern matching your log data:

   * For Zeek logs, enter `zeek-*`
   * For Suricata logs, enter `suricata-*`
   * For Sysmon logs, enter `sysmon-*`
   * For Wazuh alerts, enter `wazuh-alerts-*`

5. Click **Next step**.

6. Select the **time field** for your index pattern, usually `@timestamp`.

7. Click **Create index pattern**.

Repeat for each data source.

## Creating visualisations in Kibana

You will create several visualisations to monitor spyware-related activity.

### Visualising connections to spyware domains and IP addresses

**Goal:** See network traffic to known spyware domains or suspicious IPs.

1. On the left sidebar, click **Analytics** → **Visualize Library**.

2. Click **Create visualization**.

3. Choose **Lens**.

4. Select the `zeek-*` or `suricata-*` index pattern.

5. On the right panel, locate the field `destination.ip` or `dns.rrname` (domain name requested).

6. Drag `destination.ip` into the main workspace.

7. Drag `source.ip` next to it or add it as a **Break down by** to see source-to-destination mappings.

8. To filter for spyware-related domains or IPs:

   * Click **Add filter** above the workspace.
   * Select the relevant field (`dns.rrname` or `destination.ip`).
   * Choose **is one of**.
   * Enter your list of known spyware domains or IP addresses, separated by commas.
   * Click **Save**.

9. Adjust the visualisation type if desired (e.g., Bar chart, Table).

10. Click **Save** at the top, name it **Spyware network connections**, and save it.

### Visualising suspicious DNS queries

**Goal:** Identify DNS queries to suspicious domains.

1. Create a new visualization as above.

2. Select the `zeek-*` or `suricata-*` index pattern.

3. Drag the `dns.rrname` or `dns.query` field into the main area.

4. Set aggregation to **Top values** and size to something reasonable like 10 or 20.

5. Add filters:

   * To include only suspicious domains, add a filter on `dns.rrname` for your spyware domains list.

   * Alternatively, exclude common popular domains:

     * Add a filter with `dns.rrname` **is not one of** and list common domains (google.com, microsoft.com, etc.).

6. Click **Save**, name it **Suspicious DNS queries**.

### Visualising beaconing patterns

**Goal:** Spot repetitive, periodic network calls typical of spyware beaconing.

1. Create a new visualisation using **Lens** or **Line chart**.

2. Select the `zeek-*` or `suricata-*` index pattern.

3. Set the X-axis to **Date Histogram** based on `@timestamp`.

4. Set the interval to 1 minute or 5 minutes depending on your log volume.

5. Set the Y-axis to **Count** of events.

6. To narrow down to suspicious activity:

   * Add a filter on `destination.ip` or `dns.rrname` for spyware IPs or domains.

7. Optionally, add **Break down by** `source.ip` to see which hosts are beaconing.

8. Save as **Beaconing activity**.

### Visualising suspicious Sysmon processes and network connections

**Goal:** View suspicious process creations and network connections from Windows endpoints.

1. Create a new visualization.

2. Select the `sysmon-*` index pattern.

3. For process creations:

   * Filter `event_id` = 1 (Sysmon process creation).

   * Drag `process_name` or `image` field into the workspace.

   * Aggregate by top values.

4. For network connections:

   * Filter `event_id` = 3.

   * Drag `destination_ip` or `destination_port`.

5. Apply filters for known suspicious process names or ports if available.

6. Save the visualization as **Sysmon suspicious activity**.

## Building the Kibana dashboard

1. On the left sidebar, click **Dashboard**.

2. Click **Create new dashboard**.

3. Click **Add** and select the visualisations you saved:

   * Spyware network connections
   * Suspicious DNS queries
   * Beaconing activity
   * Sysmon suspicious activity

4. Arrange the visualisations logically for at-a-glance monitoring.

5. Click **Save**, name your dashboard, e.g., **Spyware monitoring overview**.

## Correlating endpoint and network logs by hostname or IP

This helps link suspicious network activity to particular endpoints.

1. Make sure your logs have consistent identifiers:

   * Zeek and Suricata logs: `source.ip`, `destination.ip`

   * Sysmon logs: `hostname` or `computer_name`

2. To correlate in Kibana: Use **Lens** or **Canvas** to create combined visualisations by matching `source.ip` from Zeek/Suricata with `hostname` in Sysmon logs.

3. Example: Build a time-series chart showing network beaconing by source IP alongside suspicious processes from that same IP/hostname.

## Creating alerts in Wazuh for combined suspicious events

### Writing custom correlation rules

1. Connect to your Wazuh manager (Ubuntu server).

2. Open the custom rules file:

```bash
sudo nano /var/ossec/etc/rules/local_rules.xml
```

3. Write a rule to trigger if multiple suspicious events occur together. For example:

```xml
<rule id="100500" level="12">
  <if_sid>100200</if_sid>  <!-- Zeek suspicious connection -->
  <if_sid>200300</if_sid>  <!-- Suricata spyware alert -->
  <if_sid>300400</if_sid>  <!-- Sysmon suspicious process -->
  <frequency>3</frequency>
  <timeframe>600</timeframe> <!-- 10 minutes -->
  <description>Spyware activity detected across network and endpoint</description>
</rule>
```

4. Save and exit.

### Restart Wazuh manager to apply rules

```bash
sudo systemctl restart wazuh-manager
```

## Configuring alert actions

You want Wazuh to notify you when suspicious activity occurs.

1. Edit the Wazuh configuration:

```bash
sudo nano /var/ossec/etc/ossec.conf
```

2. Configure email alerts, Slack webhook, or other notification methods inside the `<global>` and `<alerts>` sections.

3. Save and restart Wazuh manager:

```bash
sudo systemctl restart wazuh-manager
```

## Testing dashboards and alerts

1. Generate test events:

   * Simulate DNS queries to spyware domains.
   * Trigger network connections to known suspicious IPs.
   * Launch suspicious processes on Windows endpoints.

2. Confirm logs appear in Kibana visualisations.

3. Confirm alerts trigger in Wazuh and you receive notifications.

## Wazuh and kibana correlation tips

* Ship Zeek (`conn.log`, `dns.log`, `http.log`) via Filebeat or native ingestion.
* Ingest Suricata `eve.json` output and map `alert.signature` into dashboards.
* Forward Sysmon logs with the Wazuh agent; use default ruleset for event filtering.

### Dashboard ideas

* Spyware-related domains/IPs over time
* Beaconing behaviour by endpoint
* Suricata alert frequency by host
* Correlated detections: process + network + DNS for same host

### Automation tip

Trigger a Wazuh alert if:

* A process with suspicious command line launches, **and**
* A beaconing signature triggers within 10 minutes from same host

Set notifications for high-confidence hits via email or webhook.

# Summary

This guide took you from zero to a functional Kibana monitoring dashboard, with Wazuh alerting on combined spyware 
indicators spanning network and endpoint logs.

You now have:

* Custom index patterns for Zeek, Suricata, Sysmon, and Wazuh alerts
* Visualisations tracking spyware domain connections, DNS queries, beaconing, and suspicious Sysmon events
* A comprehensive dashboard bringing it all together
* Wazuh correlation rules that trigger alerts on suspicious multi-source activity
* Notification setup for actionable alerts

No prior knowledge needed, just follow each step as written. Your shelter’s digital defences are now far more vigilant.

