---
title: "Descripción general de la stack"
weight: 1
translationKey: "ipa-siem-stack"
_build:
  render: always
menu:
  sidebar:  # Adds to Docsy's auto-generated sidebar
    weight: 5
---

La IPA-SIEM Stack es una herramienta especializada de ciberseguridad basada en Wazuh, una plataforma SIEM/XDR de código abierto diseñada para ayudar a las sobrevivientes de violencia de pareja a detectar y responder a la vigilancia digital encubierta. Esto incluye amenazas como stalkerware, spyware y acceso no autorizado a dispositivos. El sistema proporciona un enfoque integral de protección digital para personas vulnerables.

## Objetivos clave de la IPA-SIEM Stack

El sistema cumple cuatro funciones principales. En primer lugar, permite la recolección forense de datos mediante la recopilación de registros y artefactos de dispositivos de sobrevivientes en Windows, macOS, Android e iOS para identificar posibles compromisos. En segundo lugar, su capacidad de detección de amenazas utiliza reglas preconfiguradas para identificar herramientas comunes de vigilancia, incluyendo stalkerware comercial como mSpy y FlexiSPY, junto con keyloggers y herramientas de acceso remoto.

Para la respuesta a incidentes, la stack proporciona scripts automatizados y guías claras para aislar dispositivos comprometidos, recolectar evidencia digital y apoyar a las sobrevivientes en la protección de su tecnología. Finalmente, la plataforma mantiene un diseño centrado en la privacidad que cumple con los requisitos del GDPR y del UK Data Protection Act, asegurando que todos los datos de las sobrevivientes permanezcan cifrados y anonimizados durante todo el proceso.

## Cómo opera el sistema

La IPA-SIEM Stack opera a través de una arquitectura centralizada. Un servidor dedicado o VM en la nube forma la base, ejecutando varios componentes clave. El módulo Wazuh monitorea continuamente los dispositivos conectados en busca de actividad sospechosa, mientras que Elasticsearch y Kibana trabajan juntos para almacenar y visualizar registros de seguridad, incluyendo alertas sobre procesos de spyware o intentos de rastreo de ubicación. La instalación se simplifica mediante un script `setup.sh` automatizado que maneja todas las dependencias y configuraciones.

La integración de dispositivos varía según la plataforma. Los sistemas Windows y macOS pueden instalar agentes Wazuh que transmiten automáticamente registros al servidor central. Para dispositivos Android, los sistemas con root pueden implementar el agente a través de Termux, mientras que los dispositivos sin root requieren recolección manual de registros mediante ADB. El soporte para iOS está actualmente limitado a dispositivos con jailbreak usando Cydia o extracción manual de registros a través de iTunes.

El sistema de detección emplea reglas preconstruidas que identifican amenazas conocidas, como procesos mSpy o intentos de acceso no autorizado a ubicación. Estas alertas aparecen en el panel de Kibana junto con acciones recomendadas, que pueden incluir aislar un dispositivo o restablecer configuraciones de GPS. Cuando se detectan amenazas, los protocolos de respuesta a incidentes entran en acción. Scripts automatizados como quarantine_device.sh ayudan a contener amenazas, mientras que guías completas apoyan a las sobrevivientes en la preservación de evidencia, procedimientos de reporte legal y transición a dispositivos más seguros cuando sea necesario.

## Importancia y aplicaciones

Esta solución tiene especial importancia por varias razones. Empodera a defensores no técnicos al proporcionar a refugios y organizaciones de apoyo herramientas de seguridad de nivel empresarial sin requerir experiencia profunda en ciberseguridad. El sistema mantiene estricto cumplimiento legal y ético mediante cifrado robusto, prácticas de anonimización de datos y una política de retención de registros de 90 días que equilibra necesidades probatorias con preocupaciones de privacidad. Al estar construido sobre herramientas gratuitas y de código abierto como Wazuh y Elasticsearch, resulta especialmente rentable para organizaciones con recursos limitados que trabajan con sobrevivientes de abuso.

La plataforma es ideal para refugios de violencia doméstica que necesitan proteger a clientas de vigilancia digital, defensores de forensia digital que asisten en recolección de evidencia, y organizaciones de ayuda legal que construyen casos para órdenes de restricción o procesos judiciales. Si bien el proyecto es de código abierto (bajo licencia GPLv3) y acepta contribuciones comunitarias, los usuarios deben notar algunas limitaciones actuales. El soporte para Android e iOS sigue siendo limitado para dispositivos sin root/jailbreak, pero esto podría cambiar.