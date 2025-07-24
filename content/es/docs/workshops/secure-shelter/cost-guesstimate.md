---
title: "Estimación de costes: Construye un refugio seguro"
weight: 3
translationKey: "cost-guesstimate-shelter"
_build:
  render: always
menu:
  sidebar:
    weight: 15
description: "Estimación detallada para el 'Construye un refugio seguro'—taller práctico donde el personal configura su propio laboratorio de seguridad digital (Wazuh + Pirogue) con ayuda de facilitadores."
---

## Tablas resumen

### Opción A: Build-a-thon local (configuración privada)

| **Concepto**                  | **Detalles**                                      | **Coste estimado (€)** |
|-------------------------------|---------------------------------------------------|-----------------------:|
| Facilitadores (2–3 pers.)     | Seguridad digital y facilitación trauma-informada |              800–1.200 |
| Stack SIEM                    | Hardware servidor, configuración, red             |              590–1.865 |
| Dispositivo(s) PiRogue (opc.) | Monitor de red basado en Raspberry Pi             |                200–400 |
| USBs/almacenamiento           | Claves setup, backup, exportación                 |                     60 |
| Material impreso/señalética   | Guías, pegatinas, carteles                        |                     80 |
| Catering                      | Comida, snacks, bebidas                           |                200–300 |
| Transporte                    | Para facilitadores y equipo                       |                100–200 |
| Decoración                    | Iluminación, banderines, insignias                |                     50 |
| Contingencia                  | Por si acaso                                      |                    100 |
| **TOTAL (aprox.)**            |                                                   |    **2.180 – 4.155 €** |

[Costes estimados solución local incluidos](/docs/lab/costs.md).

PiRogue es opcional pero útil para escaneos sin internet.

### Opción B: Build-a-thon en la nube

*Incluye registro remoto seguro, soporte móvil y monitoreo continuo.*

| **Concepto**                   | **Detalles**                         | **Coste estimado (€)** |
|--------------------------------|--------------------------------------|-----------------------:|
| Facilitadores (2–3 pers.)      | Igual que modelo local               |              800–1.200 |
| Servidor cloud & configuración | Hardening, VPN, instalación, ajustes |            1.220–1.720 |
| Configuración agentes          | Herramientas Android/iOS, agentes PC |            1.000–1.200 |
| PiRogue (opc.)                 | Como en build local                  |                200–400 |
| Backups automáticos            | Incluye scripts setup                |                144–264 |
| Mantenimiento anual            | Coste tiempo estimado                |            2.880–4.320 |
| Material impreso               | Guías, pegatinas                     |                     80 |
| Catering                       | Comida, snacks                       |                200–300 |
| Transporte                     | Facilitadores y equipo               |                100–200 |
| Decoración                     | Iluminación, banderines              |                     50 |
| Contingencia                   | Siempre necesario                    |                    100 |
| **TOTAL (aprox.)**             |                                      |    **6.774 – 9.034 €** |

[Costes estimados solución cloud incluidos](/docs/lab/costs-cloud.md).

Requiere personal con habilidades cloud, incrementando costes. Preparamos la solución en un repo, pero necesita mantenimiento. Para refugios que priorizan privacidad total y control físico, la Opción A es mejor [opción](/docs/lab/architectures.md).

## Qué obtienes

* Servidor SIEM funcional (Wazuh, Kibana)
* Kit PiRogue instalado para chequeos
* Personal entrenado en forense digital
* Guías imprimibles para sobrevivientes
* Día dinámico y colaborativo

## Ahorro de costes

* Reutilizar hardware existente
* Solicitar Raspberry Pis donados
* Voluntarios o aliados técnicos internos
* Catering compartido con otros eventos
