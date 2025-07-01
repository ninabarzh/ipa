---
title: "Arquitecturas"
weight: 1
translationKey: "architectures"
_build:
  render: always
menu:
  sidebar:
    weight: 5
description: "Arquitecturas recomendadas para implementar el stack SIEM, basadas en diferentes contextos organizacionales y niveles de recursos. Todas están diseñadas para soportar recolección forense, detección de amenazas y respuesta a incidentes, manteniendo la privacidad de sobrevivientes y cumplimiento legal. Cada una puede adaptarse a entornos de refugios, redes de apoyo o implementaciones comunitarias descentralizadas."
---

## Implementación local centrada en refugios (Low-tech, todo en uno)

Ideal para: Refugios con redes internas confiables y un voluntario técnico designado.

* Perfecto para pequeños refugios sin equipo IT
* Puede operar offline o semi-conectado
* Importación de logs via USB si internet es riesgoso

Arquitectura: Implementación local en máquina virtual (Low-tech, todo en uno)

```text
+---------------------------+             +----------------------------+
|   Portátil del Refugio    |             |    PiRogue Opcional        |
|  (VM Ubuntu o sistema)    |             |  (Dispositivo de análisis) |
|---------------------------|             |----------------------------|
| - Wazuh Manager           |             | - PiRogue OS               |
| - Elasticsearch           |             | - Herramientas de captura  |
| - Kibana                  |             | - Importación USB          |
| - automatización setup.sh |             +----------------------------+
+---------------------------+                       |
        |                                           |
        | LAN seguro / Importación USB              |
        v                                           v
+--------------------------+            +----------------------------+
| Dispositivos de Sobreviv.|            |  Dispositivos en campo     |
| (Windows/macOS/Android)  |            |  (ej. teléfono sospechoso) |
+--------------------------+            +----------------------------+
```

* Un servidor físico o virtual IPA-SIEM local
  * Ejecuta Wazuh Manager, Elasticsearch y Kibana
  * Incluye scripts automáticos (ej. `quarantine_device.sh`)
* Agentes Wazuh instalados en:
  * Dispositivos Windows/macOS (directo o via USB)
  * Android (via Termux en dispositivos root)
  * iOS (jailbreak o backups offline)
* Red interna para transmisión segura de logs
* Opcional dispositivo PiRogue para análisis local

Ventajas: Datos locales; control de privacidad; Desventajas: Requiere mantenimiento local

## Implementación en nube privada (Controlada por refugio/ONG)

Ideal para: Organizaciones con múltiples ubicaciones.

* Acceso remoto para multilocaciones
* Requiere VPN fuerte + backups encriptados
* Menor riesgo local pero mayor disciplina opsec

Arquitectura: SIEM en nube segura (ej. Hetzner)

```text
+---------------------------------+
|     VM encriptada en nube       |
|---------------------------------|
| - Wazuh Manager                 |
| - Elasticsearch                 |
| - Kibana                        |
| - Acceso HTTPS (VPN opcional)   |
+---------------------------------+
        |
        | Transferencia encriptada
        v
+---------------------------------+
| Dispositivos en cualquier lugar |
| (via agente Wazuh/ADB/iTunes)   |
+---------------------------------+
```

* VM en nube (ej. Hetzner) con:
  * Stack Wazuh + Elasticsearch + Kibana
  * Acceso VPN encriptado
* Dispositivos se conectan via túnel seguro (WireGuard)
* Logs se anonimizan antes de transmitir

Ventajas: Visibilidad centralizada; Desventajas: Requiere conocimiento de seguridad en nube

## Laboratorio portátil (Offline-first)

Ideal para: Triage de emergencia, refugios temporales.

* Perfecto para trabajo de campo
* Sin necesidad de internet
* Datos borrables post-exportación

Arquitectura: SIEM portátil "Go Bag" (Raspberry Pi o portátil)

```text
+-----------------------------+
|   Dispositivo portátil      |
| (Portátil Linux o Pi 4)     |
|-----------------------------|
| - Wazuh Manager             |
| - Kibana (solo localhost)   |
| - setup.sh modo portátil    |
+-----------------------------+
        |
        | Logs via USB/Wi-Fi
        v
+-----------------------------+
|  Dispositivo (offline)      |
+-----------------------------+
```

* Estación forense portátil con:
  * SIEM preinstalado (Wazuh, Kibana)
  * Aislamiento contra fugas
* Herramientas USB para recolección
* Informes en volumen encriptado
* Sincronización manual posterior

Ventajas: Independiente de internet; Desventajas: Limitado por almacenamiento local

## Nodos descentralizados de apoyo

Ideal para: Redes de pequeñas organizaciones.

* Múltiples refugios envían datos anónimos
* Soporte central para triage
* Funciona mejor con socio técnico

Arquitectura: Configuración descentralizada

```text
+--------------------------+     +--------------------------+
|  Refugio A               |     |  Refugio B               |
|--------------------------|     |--------------------------|
| - Agente Wazuh           | --> | - Agente Wazuh           |
+--------------------------+     +--------------------------+
         \                           /
          \                         /
           v                       v
           +--------------------------+
           |  VM Analista Central     |
           |--------------------------|
           | - Wazuh Manager          |
           | - Elasticsearch + Kibana |
           +--------------------------+
```

* Micro-nodos SIEM (ej. Raspberry Pi 5) por defensor
* Cada nodo maneja:
  * 1-2 dispositivos simultáneos
  * Reglas preconfiguradas
* Sincronización periódica central

Ventajas: Bajo costo, resiliente; Desventajas: Menor visibilidad central

## Red comunitaria híbrida

Ideal para: Coaliciones grandes con personal rotativo.

* Para entrenamiento o clínicas legales
* Puede usar rastros de stalkerware replicados
* Debe estar completamente aislado

Arquitectura: Entorno de laboratorio sandboxed

```text
+----------------------------+
|    VM(s) de investigación  |
|----------------------------|
| - Wazuh Manager            |
| - Imágenes VM infectadas   |
| - Replay de logs           |
+----------------------------+
        |
        | Exportar evidencia limpia
        v
+----------------------------+
| Archivo / Evidencia legal  |
+----------------------------+
```

* Sistema escalonado con:
  * SIEM central en nube
  * Unidades de campo preconfiguradas
  * UI web para upload manual

Ventajas: Combina lo mejor de ambos mundos: seguridad centralizada con acción local;  
Desventajas: Requiere buena coordinación y controles de acceso entre niveles

## Consideraciones de diseño

* **Privacidad de datos**: Use cifrado de disco completo en todos los nodos. Los registros deben anonimizarse por defecto a menos que se obtenga consentimiento explícito.
* **Trazabilidad**: Todas las acciones forenses deben generar registros inmutables para apoyar la admisibilidad legal.
* **Actualizaciones**: Las actualizaciones basadas en scripts (ej. vía Git o sincronización USB) deben implementarse regularmente para mantener la precisión de detección.
* **Firmas de amenazas**: Paquetes de reglas compartidos y actualizados para patrones de vigilancia de VPI (ej. malware "Calculadora+", registros de suplantación SIM).
