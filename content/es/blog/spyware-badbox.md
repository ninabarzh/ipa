---
title: "BadBox y la cruda realidad sobre reemplazar dispositivos"  
date: 2025-07-28  
author: PowerOn  
translationKey: "badbox-effects"  
tags: ["spyware", "seguridad-cadena-suministro", "reemplazo-dispositivos", "dispositivos-seguros", "play-protect"]  
description: "BadBox nos muestra que algunos dispositivos vienen comprometidos antes de encenderlos. Esto es lo que significa para reemplazar equipos."  
---

Tiras a la basura una tablet sospechosa, compras un reluciente teléfono Android "nuevo" y respiras aliviado. Problema resuelto.  

Excepto que no lo está.  

Conoce [BadBox](https://www.humansecurity.com/learn/blog/satori-threat-intelligence-disruption-badbox-2-0/),  el amable nombre en clave de una vasta operación de ciberespionaje que instala malware directamente en dispositivos Android *antes de salir de fábrica*. No son productos sospechosos de mercadillos. Muchos se venden a través de minoristas en línea confiables y plataformas reconocidas. Miles han llegado a Europa, usualmente como tablets, teléfonos o cajas de streaming "económicos".  

## Por qué BadBox es relevante al reemplazar dispositivos  

El malware, cortésmente llamado **Guerrilla**, reside profundamente en el firmware,  por debajo del nivel que la mayoría de usuarios (o software antivirus) puede detectar. Puede instalar apps en silencio, espiar usuarios, servir phishing dirigido o alquilar tu dispositivo a terceros. Es modular, por lo que pueden añadirse más funciones en cualquier momento.  

BadBox no es solo un malware, sino un ecosistema criminal completo. Lo operan varios grupos interconectados,  incluyendo SalesTracker, MoYu, Lemon y LongTV,  que han dividido el trabajo entre sí. Algunos gestionan la infraestructura de comando y control, otros desarrollan la puerta trasera a nivel de firmware, mientras otros monetizan dispositivos infectados mediante fraude publicitario, redes proxy residenciales y estafas automatizadas. Lo que los une es que el malware viene preinstalado antes de que el dispositivo llegue al usuario, lo que significa que el compromiso comienza al abrir la caja.  

Hasta ahora, el principal motivador ha sido el dinero, no la vigilancia por encargo. La mayoría de infecciones BadBox se explotan para fraude de clics, impresiones falsas de anuncios y venta de tráfico de red anónimo. Pero su arquitectura es modular, y estos grupos tienen historial de alquilar o vender capacidades. En otras palabras: si alguien quisiera adaptar esta plataforma para acecho, espionaje dirigido o robo de datos, podría hacerlo,  sin reinventar la rueda.  

Por eso BadBox importa al reemplazar dispositivos. No es que las supervivientes sean actualmente blancos directos de estos grupos; es que la infraestructura y técnicas ya existen, y el comprador equivocado podría armarlas de la noche a la mañana. Cuando tu teléfono, tablet o caja de TV de reemplazo ya podría actuar como bot, baliza o sifón de datos antes de iniciar sesión, "nuevo" no significa automáticamente "seguro".  

Un restablecimiento de fábrica no ayudará. El antivirus no ayudará. Y apagarlo y encenderlo no exorcizará los fantasmas.  

## Qué significa para víctimas  

Para sobrevivientes de violencia de pareja, esto cambia el manual de seguridad. En *PowerOn* decimos: *en caso de duda, reemplaza el dispositivo*. Sigue siendo cierto, pero con una advertencia: **Si el reemplazo viene de una fuente no confiable, podría ser peor que el original.**  

BadBox cambia las premisas:  

- Una caja sellada no garantiza seguridad  
- Bajo costo no es luz verde para compartir  
- Un dispositivo que funciona bien hoy podría traicionarte mañana  

Un dispositivo infectado con BadBox puede permanecer inactivo semanas o meses antes de activarse, actualizarse o empezar a trabajar para alguien que *realmente* quiere tus datos.  

Sí, pueden costar tan poco como 20€. Sí, es tentador. Pero la privacidad y autonomía valen más.  

### Pasos prácticos para víctimas  

- Usa dispositivos de fuentes confiables y verificables  
- Si es posible, elige modelos conocidos como limpios (ver tabla abajo)  
- Evita iniciar sesión en cuentas sensibles en dispositivos desconocidos o regalados  
- Separa actividades de alto y bajo riesgo en dispositivos distintos si es posible  

## Respuesta para refugios  

Los refugios enfrentan dos desafíos: evitar que entren dispositivos comprometidos, y detectar los que se filtren.  

### Prevención  

- Rastrear el origen de dispositivos donados o comprados y verificar versiones de firmware  
- Para uso compartido, considerar laptops con Linux o Chromebooks restaurados con Linux en lugar de Androids baratos  
- Tener una estación segura para verificar y preparar dispositivos antes del uso  

### Lista de verificación BadBox  

**Objetivo:** Asegurar que todos los dispositivos Android sean evaluados antes de entrar en uso.  

**1. Registrar datos básicos**  
- Tipo de dispositivo  
- Marca y modelo  
- Número de serie / IMEI  
- Fuente (donación, compra, etc.)  
- Fecha de recepción  

**2. Verificación visual**  
- ¿Embalaje original sellado? Sí / No  
- ¿Signos de manipulación? Sí / No  
- ¿Marca genérica o inusual? Sí / No  

**3. Categoría de riesgo**  
- ¿Modelo conocido como seguro? (Consultar lista interna) Sí / No  
- ¿Modelo riesgoso o marca desconocida? Sí / No  
- ¿Desconocido? (Tratar como alto riesgo)  

**4. Verificar firmware y Play Protect**  
- Encender y saltar configuración inicial  
- Verificar certificación Play Protect (Ajustes → Información → Actualización de Google Play o Play Store → Ajustes)  
- Anotar versión de firmware  
- Comparar con lista segura  

**5. Prueba de comportamiento en red**  
- Conectar a WiFi aislado (no a red principal)  
- Monitorear con PiRogue, Zeek o Suricata por 15–30 minutos  
- Buscar conexiones salientes inusuales o consultas DNS sospechosas  

**6. Decisión**  
- **Aprobado** → Añadir a inventario con etiqueta segura  
- **Rechazado** → Cuarentena o reciclaje responsable  
- **Incierto** → Mantener offline, escalar a soporte técnico  

*(Guardar copias firmadas por dispositivo. Registrar resultados en log de refugio.)*  

### Detección  

BadBox puede detectarse parcialmente, pero no a nivel de firmware, y solo si ya está activo en la red o sistema operativo.  

Con un [stack SIEM (Wazuh + Zeek + Suricata + Sysmon + opcional PiRogue)](docs/lab/on-prem/), la detección es posible mediante:  

- Indicadores de red como conexiones a servidores de comando y control, dominios sospechosos o puntos de distribución de malware  
- Alertas Suricata de infraestructura BadBox conocida  
- Logs de Zeek mostrando patrones de beaconing o consultas DNS inusuales  

Nota: La infraestructura de comando y control cambia frecuentemente. La detección depende de actualizar feeds de inteligencia de amenazas.  

## Cuándo y cómo reemplazar  

Reemplazar cuando:  

- El dispositivo está claramente comprometido  
- No se puede eliminar stalkerware  
- La usuaria ya no se siente segura  
- Continuar su uso implica riesgo legal  

El reemplazo solo es seguro si el nuevo dispositivo es confiable.  

Fuentes seguras:  

- Minoristas conocidos con buenas políticas de devolución  
- Reacondicionadores certificados que restablecen firmware  
- Organizaciones que preinstalan sistemas operativos respetuosos con la privacidad  

O, si el presupuesto lo permite, elegir teléfonos nuevos de marcas principales con bootloader bloqueado y sin casos conocidos de BadBox.  

| Tipo de dispositivo                                             | Riesgo BadBox     | Notas                                       |  
|-----------------------------------------------------------------|-------------------|---------------------------------------------|  
| Teléfonos Pixel (certificados Play Protect)                     | ✅ Bajo            | Sin casos conocidos en investigaciones      |  
| Android gama alta (Samsung, OnePlus, etc.)                      | ✅ Bajo a moderado | Deben estar certificados por Play Protect   |  
| Android genéricos o "reacondicionados" de marcas no reconocidas | ❌ Alto            | Múltiples infecciones confirmadas           |  
| Cajas Android TV, tablets, proyectores, unidades para coche     | ❌ Muy alto        | Múltiples modelos comprometidos en firmware |  
| iPhones / dispositivos Apple                                    | ✅ No aplica       | Ecosistema diferente                        |  

## Reflexión final  

BadBox no es solo un fallo en la cadena de suministro. Es un recordatorio de que confiar en el empaquetado no basta. Los atacantes piensan ahead; nosotros también debemos.  

Reemplazar un dispositivo sigue siendo clave para recuperar el control. Solo que ahora sabemos que algunas cajas llegan pre-perdidas.  
