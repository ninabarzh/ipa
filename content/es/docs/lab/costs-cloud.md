---
title: "Estimación de costes del sistema de seguridad en la nube"
weight: 7
translationKey: "cloud-costs"
_build:
  render: always
menu:
  sidebar:
    weight: 35
description: "Gestionar tu propia infraestructura conlleva costes reales—especialmente en tiempo y conocimientos técnicos."
---

## Servidor en la nube privada

Asumimos un VPS de gama media de proveedor europeo (ej. Hetzner, Netcup, 1984 Hosting).

* **Especificaciones**: 4 vCPU, 8–16 GB RAM, 100 GB SSD, Ubuntu 22.04
* Coste mensual: **15–30 €**
* Anual: **~300 €**

*Mínimo 8 GB RAM. Los stacks SIEM consumen recursos.*

## Seguridad básica

* Fail2ban, UFW, actualizaciones automáticas = gratis
* Configuración inicial: 4h × 60 €/h = **240 €**

## Instalación IPA-SIEM (Wazuh)

* Wazuh Manager, API, Elasticsearch, Kibana
* Software: **0 €** (open source)
* Configuración inicial: 1–2 días experto = **500–1.000 €**

*Voluntarios técnicos pueden ayudar—pero presupuestar soporte.*

## VPN (WireGuard/OpenVPN)

* Software: gratis
* Configuración: 3h = **180 €**
* Mantenimiento: rotación claves, soporte

## Despliegue de agentes

* Windows/macOS (10–20 dispositivos):
  30 min/dispositivo → 10h total = **600 €**

* Extracción logs Android/iOS:
  Manual o automatizado
  Coste: **400–600 €**

## Opcional: Kit PiRogue

* Hardware: ~150 € + envío
* Configuración: 3h = **180 €**

## Copias de seguridad

* Usar SSD del servidor
* Almacenamiento extra: 2 €/mes → **24 €/año**
* Herramientas cifrado: gratis
* Automatización: 2–4h = **120–240 €**

## Mantenimiento continuo

* Rotación claves, logs, alertas
* Mensual: 4–6h × 60 € = **240–360 €/mes**
* Anual: **2.880–4.320 €**

## Imprevistos & formación

* Contingencia: **500 €**
* Formación interna: **300 €**

## Resumen costes (Año 1)

| Concepto                            |  Coste estimado (€) |
|-------------------------------------|--------------------:|
| Servidor nube                       |                €300 |
| Seguridad básica                    |                €240 |
| Instalación SIEM                    |         €500–€1.000 |
| VPN                                 |                €180 |
| Agentes (10–20 dispositivos)        |                €600 |
| Extracción logs móviles             |           €400–€600 |
| PiRogue (opcional)                  |                €330 |
| Copias seguridad                    |           €144–€264 |
| Mantenimiento                       |       €2.880–€4.320 |
| Formación & contingencias           |                €800 |
| **Total (Año 1)**                   | **€6.374 – €8.634** |

## Costes anuales (Año 2+)

* Servidor: 300 €/año
* Mantenimiento: 3.000–4.000 €
* Actualizaciones puntuales

**Estimación anual: ~3.500–4.500 €**

## Notas presupuestarias

* Costes varían según número de dispositivos
* Voluntarios reducen costes pero requieren coordinación
* Incluir tiempo staff en solicitudes de subvención
* Sistema compartible entre organizaciones via VPN
