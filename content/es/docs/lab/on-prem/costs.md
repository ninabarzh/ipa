---
title: "Estimación de costes para un sistema de seguridad en refugios"
weight: 5
translationKey: "on-prem-costs"
_build:
  render: always
menu:
  sidebar:
    weight: 25
description: "Hecho en el reverso de un sobre."
---

## Servidor del refugio (Ubuntu 22.04)

* Ordenador de sobremesa o mini PC reacondicionado

  * Especificaciones: ≥8 GB RAM, 4+ núcleos, 100+ GB SSD  
  * Coste: €350–€585

* Mejoras opcionales:

  * RAM (16 GB total): +€60  
  * SSD (500 GB): +€70

Subtotal hardware: €350–€585 (añadir €130 si se mejora)

## Red y almacenamiento

* Switch no gestionado (8 puertos): €35  
* Cableado y punto de acceso Wi‑Fi: €25  
* Disco duro USB (1 TB): €60

Subtotal red: €120

## Escáner PiRogue opcional (Raspberry Pi)

* Raspberry Pi 4 (kit 4 GB): €95  
* Adaptador USB Wi‑Fi / extras: €25

Subtotal PiRogue: €120

## Software y herramientas (gratis)

* Ubuntu, Wazuh, Elasticsearch, Termux, adb, OpenSSH, herramientas idevice — €0

## Trabajo e instalación

* Personal pagado (~€45/hora): instalación y pruebas (12 horas): €540  
* Con voluntariado: €0

### Mantenimiento y colchón

* Colchón anual hardware/software: €120  
* Tiempo de personal anual (10 horas): €450  
* Contingencia (10 %): ~€65–€160

## Resumen del primer año

| Categoría            | Bajo (Voluntario) | Alto (Pagado + Extras) |
|----------------------|------------------:|-----------------------:|
| Hardware servidor    |              €350 |                   €715 |
| Red y almacenamiento |              €120 |                   €120 |
| PiRogue (opcional)   |                €0 |                   €330 |
| Software             |                €0 |                     €0 |
| Mano de obra         |                €0 |                   €540 |
| Mantenimiento        |              €120 |                   €160 |
| **Total (aprox.)**   |          **€590** |             **€1.865** |

## Costes anuales desde el año 2 (estimado)

|            Elemento | Coste anual |
|--------------------:|------------:|
|    Colchón hardware |        €120 |
|      Soporte pagado |        €450 |
|     **Total anual** |    **€570** |

## Notas

* Coste mínimo (~€590) supone tiempo voluntario y equipos donados.  
* Coste completo (~€1.655) incluye mejoras, PiRogue y mano de obra.  
* No se incluye acceso a Internet, cerraduras físicas ni consumo eléctrico.  
* Para múltiples ubicaciones, servicios compartidos (como un SIEM central) pueden reducir el coste por sitio.
