---
title: "Übersicht der Stack-Architektur"
weight: 1
translationKey: "ipa-siem-stack"
_build:
  render: always
menu:
  sidebar:  # Adds to Docsy's auto-generated sidebar
    weight: 5
---

Der IPA-SIEM Stack ist ein spezialisiertes Cybersicherheitswerkzeug, das auf Wazuh basiert, einer Open-Source-SIEM/XDR-Plattform, die entwickelt wurde, um Überlebende von Partnerschaftsgewalt bei der Erkennung und Reaktion auf verdeckte digitale Überwachung zu unterstützen. Dazu gehören Bedrohungen wie Stalkerware, Spyware und unbefugter Gerätezugriff. Das System bietet einen umfassenden Ansatz zum digitalen Schutz gefährdeter Personen.

## Hauptziele des IPA-SIEM Stacks

Das System erfüllt vier Hauptfunktionen. Erstens ermöglicht es die forensische Datenerfassung durch das Sammeln von Protokollen und Artefakten von Geräten der Überlebenden unter Windows, macOS, Android und iOS, um mögliche Kompromittierungen zu identifizieren. Zweitens verwendet seine Bedrohungserkennung vorkonfigurierte Regeln, um gängige Überwachungstools zu identifizieren, einschließlich kommerzieller Stalkerware wie mSpy und FlexiSPY, sowie Keylogger und Fernzugriffstools.

Für die Reaktion auf Vorfälle stellt der Stack automatisierte Skripte und klare Anleitungen bereit, um kompromittierte Geräte zu isolieren, digitale Beweise zu sammeln und Überlebende bei der Sicherung ihrer Technologie zu unterstützen. Schließlich behält die Plattform ein datenschutzorientiertes Design bei, das den Anforderungen der DSGVO und des UK Data Protection Act entspricht und sicherstellt, dass alle Daten der Überlebenden während des gesamten Prozesses verschlüsselt und anonymisiert bleiben.

## Funktionsweise des Systems

Der IPA-SIEM Stack arbeitet mit einer zentralisierten Architektur. Ein dedizierter Server oder Cloud-VM bildet die Grundlage und führt mehrere Schlüsselkomponenten aus. Das Wazuh-Modul überwacht kontinuierlich verbundene Geräte auf verdächtige Aktivitäten, während Elasticsearch und Kibana zusammenarbeiten, um Sicherheitsprotokolle zu speichern und zu visualisieren, einschließlich Warnungen zu Spyware-Prozessen oder Standortverfolgungsversuchen. Die Installation wird durch ein automatisiertes `setup.sh`-Skript vereinfacht, das alle Abhängigkeiten und Konfigurationen handhabt.

Die Geräteintegration variiert je nach Plattform. Windows- und macOS-Systeme können Wazuh-Agents installieren, die automatisch Protokolle an den zentralen Server senden. Für Android-Geräte können gerootete Systeme den Agent über Termux bereitstellen, während nicht gerootete Geräte eine manuelle Protokollerfassung über ADB erfordern. Die iOS-Unterstützung ist derzeit auf jailbreakte Geräte mit Cydia oder manuelle Protokollentnahme über iTunes beschränkt.

Das Erkennungssystem verwendet vorgefertigte Regeln, die bekannte Bedrohungen identifizieren, wie mSpy-Prozesse oder unbefugte Standortzugriffsversuche. Diese Warnungen werden im Kibana-Dashboard zusammen mit empfohlenen Maßnahmen angezeigt, die möglicherweise die Isolierung eines Geräts oder das Zurücksetzen der GPS-Einstellungen umfassen. Wenn Bedrohungen erkannt werden, greifen die Incident-Response-Protokolle. Automatisierte Skripte wie quarantine_device.sh helfen bei der Eindämmung von Bedrohungen, während umfassende Anleitungen Überlebende durch Beweissicherung, rechtliche Meldeprozeduren und den Wechsel zu sichereren Geräten unterstützen, falls erforderlich.

## Bedeutung und Anwendungen

Diese Lösung ist aus mehreren Gründen besonders wichtig. Sie befähigt nicht-technische Unterstützer, indem sie Schutzunterkünften und Hilfsorganisationen unternehmensweite Sicherheitstools zur Verfügung stellt, ohne tiefgehende Cybersicherheitskenntnisse zu erfordern. Das System hält strenge rechtliche und ethische Compliance durch robuste Verschlüsselung, Datenanonymisierungspraktiken und eine 90-tägige Protokollaufbewahrungsrichtlinie ein, die Beweisanforderungen mit Datenschutzbedenken in Einklang bringt. Da es auf kostenlosen Open-Source-Tools wie Wazuh und Elasticsearch basiert, ist es besonders kostengünstig für finanzschwache Organisationen, die mit Missbrauchsüberlebenden arbeiten.

Die Plattform eignet sich ideal für Frauenhäuser, die Klientinnen vor digitaler Überwachung schützen müssen, digitale Forensik-Unterstützer, die bei der Beweissammlung helfen, und Rechtshilfeorganisationen, die Fälle für Schutzanordnungen oder Strafverfolgung aufbauen. Obwohl das Projekt Open Source (unter GPLv3-Lizenz) ist und Community-Beiträge begrüßt, sollten Benutzer einige aktuelle Einschränkungen beachten. Die Android- und iOS-Unterstützung bleibt für nicht gerootete/jailbreakte Geräte eingeschränkt, aber dies könnte sich ändern.
