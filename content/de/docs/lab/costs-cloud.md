---
title: "Kostenschätzung für cloudbasiertes Sicherheitssystem"
weight: 7
translationKey: "cloud-costs"
_build:
  render: always
menu:
  sidebar:
    weight: 35
description: "Der Betrieb eigener Infrastruktur verursacht reale Kosten – insbesondere in Bezug auf Zeit und Fachwissen."
---

## Privater Cloud-Server

Wir gehen von einem mittelgroßen VPS eines europäischen Anbieters aus (z.B. Hetzner, Netcup, 1984 Hosting).

* **Spezifikationen**: 4 vCPU, 8–16 GB RAM, 100 GB SSD, Ubuntu 22.04
* Monatliche Kosten: **15–30 €**
* Jährliche Kosten: **~300 €**

*Mindestens 8 GB RAM wählen. SIEM-Stacks sind ressourcenintensiv.*

## Absicherung & Basissicherheit

* Fail2ban, UFW, Unattended-upgrades = kostenlos (Open Source)
* Administrationszeit für Konfiguration und Tests: 4 Stunden × 60 €/h = **240 €**

## IPA-SIEM-Installation (Wazuh-Stack)

* Wazuh Manager, API, Elasticsearch, Kibana
* Softwarekosten: **0 €** (alle Open Source)
* Ersteinrichtung und Optimierung: 1–2 Tage Expertenzeit = **500–1.000 €**

*Kann von technisch versierten Freiwilligen durchgeführt werden – aber Budget für Unterstützung einplanen.*

## VPN-Einrichtung (WireGuard/OpenVPN)

* Software: kostenlos
* Einrichtungszeit: 3 Stunden (Server + erste Clients) = **180 €**
* Laufend: Schlüsselrotation, Diagnose, Client-Support

## Installation von Remote-Agents

* Installation und Konfiguration auf Windows/macOS:
  Angenommen 10–20 Geräte
  Einrichtung pro Gerät: ~30 Min → 10 Stunden insgesamt = **600 €**

* Android/iOS-Log-Extraktion:
  Manuell (ADB, Backups etc.) oder automatisiert
  Zeit- und Schulungskosten: **400–600 €**

## Optional: PiRogue-Triage-Kit

* 1 x PiRogue = ~150 € Hardware + Versand
* Einrichtung, Schulung: 3 Stunden = **180 €**

## Sichere Speicherung, Backups & Verschlüsselung

* Server-SSD nutzen; Logs rotieren und komprimieren
* Zusätzlicher Backup-Speicher: 2 €/Monat → **24 €/Jahr**
* Verschlüsselungstools (GPG, age): kostenlos
* Administrationszeit: 2–4 Stunden = **120–240 €**

## Laufende Wartung & Support

* VPN-Schlüsselrotation, Log-Rotation, Alert-Checks
* Monatliches Administrationsbudget: 4–6 Stunden × 60 € = **240–360 €/Monat**
* Jährlich: **2.880–4.320 €**

## Puffer & Schulungen

* Puffer (Fehler, Ausfallzeiten, unerwartete Updates): **500 €**
* Interne Schulungen/Dokumentation: **300 €**

## Zusammenfassung: Gesamtkosten (Jahr 1)

| Position                            | Geschätzte Kosten (€) |
|-------------------------------------|----------------------:|
| Privater Cloud-Server               |                  €300 |
| Server-Absicherung                  |                  €240 |
| SIEM-Installation & Optimierung     |           €500–€1.000 |
| VPN-Einrichtung                     |                  €180 |
| Agenten-Installation (10–20 Geräte) |                  €600 |
| Android/iOS-Log-Extraktion          |             €400–€600 |
| PiRogue (optional)                  |                  €330 |
| Sichere Backups & Automatisierung   |             €144–€264 |
| Laufende Wartung                    |         €2.880–€4.320 |
| Schulungen & Puffer                 |                  €800 |
| **Gesamt (Jahr 1)**                 |   **€6.374 – €8.634** |

## Laufende jährliche Kosten (ab Jahr 2)

Nach Einrichtung und Dokumentation sind die Kosten geringer:

* Server: 300 €/Jahr
* Wartung: 3.000–4.000 €
* Gelegentliche Schulungen/Updates

**Geschätzte jährliche Kosten: ~3.500–4.500 €**

## Hinweise zur Budgetplanung

* Kosten variieren je nach Anzahl unterstützter Geräte und Personen
* Freiwillige oder Praktikanten können Kosten senken, erfordern aber Koordination
* Förderanträge sollten Personalkosten und Puffer enthalten
* Setup kann zwischen mehreren Einrichtungen via VPN geteilt werden
