---
title: "Sicheres Frauenhaus Build-a-thon"
linkTitle: "Sicheres Frauenhaus Build-a-thon"
weight: 2
_build:
  render: always
description: "Ein fröhlicher, technikbegeisterter Hands-on-Workshop für Frauenhaus-Mitarbeiter. Keine Vorträge, kein Doomscrolling – nur Teamwork, Gadgets und gesunder Respekt vor gemeistertem Chaos."
menu:
  sidebar:
    weight: 10
    identifier: "de-secure-shelter"
    parent: "de-docs"
translationKey: "secure-shelter"
---

## Überblick

* Name: Secure the Shelter  
* Typ: Praktischer Workshop zum Aufbau eines Sicherheitslabors  
* Zielgruppe: Frauenhaus-Mitarbeiter, technikbegeisterte Freiwillige und alle, die neugierig genug sind, einen USB-Stick einzustecken  
* Dauer: Ein langer Tag (6–8 Stunden) oder zwei halbe Tage (empfohlen)  
* Ergebnis: Voll funktionsfähiges Wazuh + Pirogue Sicherheitslabor  

## Ziele

* Funktionierende Wazuh SIEM-Instanz aufbauen und konfigurieren  
* Pirogue/Pithon auf bootfähigem USB oder Raspberry Pi einrichten  
* Echte Geräte anschließen, Logs generieren, simulierte Bedrohungen erkennen  
* Gemeinsamen "Erste-Hilfe"-Prozess für Technikprobleme entwickeln  
* Selbstvertrauen und Zusammenarbeit durch Spaß statt Angst stärken  

## Vorbereitungscheckliste

| Was                  | Notizen                                                                        |
|----------------------|--------------------------------------------------------------------------------|
| USB-Sticks (mind. 3) | Vorinstalliert mit setup.sh, Konfigurationsdateien, Tools                      |
| Laptop oder Server   | Für Wazuh-Installation – Cloud-VM, Mini-Server oder leistungsstarker Laptop    |
| Internetzugang       | Für Setup und Paketdownloads                                                   |
| Beamer               | Für Live-Demonstrationen                                                       |
| Spickzettel          | Gedruckt und laminiert – "Was einzugeben ist", "Was nicht anzufassen ist" usw. |
| Aufkleber, Ausweise  | Log-Monster, Kernel-Gremlin, Alarm-Waschbär... Sie verstehen schon             |
| Snacks & Kaffee      | Sie installieren ein SIEM, kein Überlebenstraining                             |

## Phase 1: Setup wählen (a.k.a. Wähle dein Biest)

*"Was wird das Gehirn unserer digitalen Festung?"*

### Optionen:

* Cloud-basierten Wazuh-Server einrichten (DigitalOcean, Hetzner usw.)  
* Wazuh auf einem Ersatz-Laptop oder Mini-PC installieren  
* Raspberry Pi 4 verwenden (für Fortgeschrittene)  

### Aktivitäten:

* Teams wählen ihren Host-Rechner und geben ihm einen Namen (Codenamen-Vorschläge vorhanden!)  
* `setup.sh` ausführen und Installationsassistent folgen  
* Erfolg feiern, wenn Kibana sich öffnet (mit Siegestanz oder Keks)  

Tipp: Jedes Team erhält einen Schnellstart-Ordner auf USB mit:  

* Vorgefertigtem `setup.sh`  
* Standard-Firewall-Regeln  
* Team-Flagge (echte Papierflagge)  

## Phase 2: Agenten im Einsatz (a.k.a. Wazuh entfesselt)

*"Lasst uns beibringen, Ärger zu erschnüffeln."*

### Ziele:

* 1–2 Geräte (Windows/macOS Test-Laptops oder VMs) mit Wazuh verbinden  
* Logs auslösen und Alerts in Echtzeit beobachten  

### Aktivitäten:

* Wazuh-Agent auf Testgerät installieren  
* Normales und "verdächtiges" Verhalten simulieren: neue Benutzerkonten, unbekannte App-Installationen, merkwürdige USB-Nutzung  
* Fake-Signaturen für Stalkerware-Simulation verwenden  

Mini-Herausforderung:  

* Wer bekommt den ersten "kritischen" Alert auf seinem Dashboard?  
* Optional: "Lustigste Alert-Erklärung"-Wettbewerb  

Lernmomente:  

* "Was sagt dieser Log überhaupt?"  
* "Wann ist es nur Windows, das komisch ist?"  

## Phase 3: Booten und scannen (a.k.a. Pirogue & Spiel)

*"Jetzt gehen wir auf Fischfang – nach Spyware."*

### Ziele:

* Pirogue-USB oder Raspberry Pi vorbereiten  
* Davon booten und Android-Testgerät oder USB-Stick scannen  

### Aktivitäten:

* Jedes Team erstellt bootfähigen Pirogue-USB (oder startet Pi)  
* Mit USB-C oder OTG-Adapter an Testtelefone anschließen  
* Bericht erstellen: Was ist normal, was ist verdächtig?  

Optionale Spiele:  
* Ein Telefon hat "mysteriöse Spyware" (eigentlich nur Test-Apps)  
* Kann dein Team sie identifizieren, ohne in Panik zu verfallen?  

Profi-Tipps:  
* Gedrucktes Glossar harmloser aber beunruhigender App-Namen bereithalten  
* Notizen fördern: "Komisch aber harmlos", "Später prüfen" usw.  

## Phase 4: Log-Party (a.k.a. Präsentation & Austausch)

*"Denn wenn man eine Festung baut und es niemandem erzählt, was bringt's?"*

### Aktivitäten:

* Jedes Team präsentiert sein Setup: Codename, Agenten, Erkenntnisse  
* Runde für "coolster Alert", "seltsamster Log", "größte Überraschung"  
* Gemeinsam den "Technik-Erste-Hilfe"-Leitfaden erstellen:  

  * "Wenn jemand sagt, sein Telefon verhält sich komisch..."  
  * "Wenn wir einen ernst aussehenden Alert sehen..."  
  * "Wenn wir uns unsicher sind, machen wir das..."  

Ergebnisse:  

* Gedruckter Spickzettel (laminiert ideal)  
* Erste-Hilfe-Prozess an der Wand  
* Mitarbeiter-Logins oder Admin-Login eingerichtet  
* USB-Sticks für zukünftige Nutzung verteilt  

Abschlussaktivität: Aufkleber, Log-Monster-Taufe, Teamfotos mit Servernamen  

## Nachbereitung

| Was                    | Beschreibung                                     |
|------------------------|--------------------------------------------------|
| Technik-Spickzettel    | Schritt-für-Schritt: Wazuh, Pirogue, Erste Hilfe |
| USB-Kit                | Tools, Skripte, PDF-Anleitungen                  |
| Erste-Hilfe-Checkliste | Was tun, wenn Technik unsicher erscheint         |
| Funktionierendes SIEM  | Mit angeschlossenen Geräten und laufenden Logs   |
| Prahlrechte            | Verdient, nicht geschenkt                        |

---

## Optionale Folgemaßnahmen

* Monatliches Remote-Check-in: "Was gibt's Neues in den Logs?"  
* Technik-Buddy-System: Mitarbeiter mit Freiwilligen oder digitalen Verbündeten paaren  
* Rechtsberatung oder Fachleute für zukünftige gemeinsame Planung einladen  

## Unterstützung und Materialien zur Veranstaltung
