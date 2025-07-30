---
title: "Cómo configurar un kit PiRogue para detectar stalkerware"
weight: 3
translationKey: "pts"
_build:
  render: always
menu:
  sidebar:
    weight: 15
    identifier: "es-pts"
    parent: "es-lab"
description: "Esta guía paso a paso está diseñada para personal de refugios sin conocimientos técnicos. Le ayudará a configurar un dispositivo simple que puede verificar computadoras y teléfonos en busca de software de rastreo oculto utilizado por agresores."
---

## Qué necesitará

Antes de comenzar, reúna estos elementos (todos disponibles en la mayoría de las tiendas de electrónica):

1. [Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) (2GB de RAM son suficientes)  
2. Fuente de alimentación oficial (micro-USB)  
3. Tarjeta micro SD de 32GB (velocidad Clase 10)  
4. Cable Ethernet (cualquier modelo básico sirve)  
5. Un monitor/televisor adicional con puerto HDMI (para la configuración inicial)  

*Nota sobre el presupuesto: Algunas organizaciones benéficas como WESNET en Australia ofrecen kits con descuento – consulte con redes locales de apoyo contra la violencia doméstica.*

## Paso 1: Preparación del software PiRogue  

### Descarga del sistema  

1. En cualquier computadora, visite el [sitio web oficial de PiRogue](https://pts-project.org)  
2. Haga clic en "Descargas" y elija la última versión para Raspberry Pi 4   
3. Guarde el archivo (terminará en `.img.xz`) – contiene todo el sistema operativo  

### Grabación en la tarjeta SD

1. Instale **Balena Etcher** (software gratuito) desde [etcher.io](https://www.balena.io/etcher/)  
2. Inserte su tarjeta micro SD en la computadora (usando un adaptador si es necesario)  
3. Abra Etcher, seleccione la imagen de PiRogue descargada, elija su tarjeta SD y haga clic en "Flash!"  
4. Espere hasta que diga "Flash Complete" (unos 10 minutos)

## Paso 2: Configuración del hardware  

1. **Inserte la tarjeta SD** en la ranura del Raspberry Pi (en la parte inferior)  
2. **Conecte el cable Ethernet** desde su Pi al router del refugio  
3. **Conecte el HDMI** a un monitor/televisor  
4. **Conecte la fuente de alimentación al final** – el Pi se encenderá automáticamente  

*Consejo para el primer arranque:* El sistema tarda unos 5 minutos en iniciar. Una pantalla de colores es normal al principio.

## Paso 3: Configuración inicial  

1. Cuando se le solicite, inicie sesión con:  
   - Usuario: `pi`  
   - Contraseña: `raspberry` (la cambiará más tarde)  

2. Siga las instrucciones en pantalla para:  
   - Establecer una nueva contraseña segura (anótela en un lugar seguro)  
   - Confirmar su zona horaria (importante para registros precisos)  
   - Permitir que usuarios no administradores capturen tráfico (escriba "Y" y presione Enter)   

3. El sistema se actualizará – espere hasta que se reinicie (unos 15 minutos)

## Paso 4: Conexión de dispositivos para verificar  

### Para teléfonos

1. En la pantalla del PiRogue, anote el nombre de la red WiFi (ej. "PiRogue-123") y la contraseña  
2. En el teléfono de la víctima:  
   - Vaya a configuraciones WiFi  
   - Conéctese a la red PiRogue (ignore advertencias de "sin internet")  
   - Use el teléfono normalmente durante 5 minutos – el PiRogue analizará el tráfico en segundo plano   

### Para computadoras

1. Conecte la computadora al PiRogue mediante cable Ethernet  
2. Abra cualquier navegador y visite el panel en: `https://pirogue.local/dashboard`  
   - Usuario: `admin`  
   - Contraseña: Consulte la pantalla del PiRogue para la generada automáticamente

## Paso 5: Interpretación de resultados  

El panel muestra un semáforo simple:

- **Verde:** No se detectó stalkerware  
- **Amarillo:** Actividad sospechosa (ej. rastreo de ubicación desconocido)  
- **Rojo:** Stalkerware confirmada (ej. Cerberus, FlexiSpy)   

*Qué hacer si aparece rojo:*

1. Anote el nombre del malware mostrado  
2. Desconecte el dispositivo inmediatamente  
3. Contacte a su aliado local en seguridad tecnológica (listado en [stopstalkerware.org](https://stopstalkerware.org/resources/#find-support))

## Seguridad y mantenimiento  

1. **Después de cada uso:**  
   - Apague el PiRogue correctamente (escriba `sudo shutdown now` en su pantalla)  
   - Borre la tarjeta SD, por ejemplo usando DiskGenius en Windows: Formatear una tarjeta SD solo elimina referencias de archivos – los datos aún pueden recuperarse con herramientas como PhotoRec 7. Borrar sobrescribe los datos, haciéndolos irrecuperables. Esto es crucial para:
      - Eliminar rastros de stalkerware o malware.
      - Proteger la privacidad de las víctimas al reutilizar tarjetas.
      - Garantizar configuraciones limpias para las herramientas forenses de PiRogue.
   - Verifique la tarjeta después de borrar: Reinsértela → Confirme que aparece "vacía" en el Explorador.

2. **Revisiones mensuales:**  
   - Vuelva a grabar la tarjeta SD con la última versión de PiRogue (las actualizaciones incluyen nuevas reglas de detección)   

3. **Para casos sensibles:**  
   - Úselo en una habitación separada de las áreas de vida de las víctimas  
   - Documente hallazgos para evidencia legal (tome capturas del panel)

## Obteniendo ayuda  

- Únase al **servidor Discord de PiRogue** (https://discord.gg/pts-project) para soporte en tiempo real  
- Línea de ayuda de seguridad tecnológica UE: https://www.accessnow.org/help/ *(soporte 24/7 en múltiples idiomas)*
- Refugios en UK pueden contactar la clínica de seguridad de **Women's Aid** (+44 0808 802 0300)   
- En peligro inmediato, priorice siempre seguridad física sobre verificaciones digitales

## Notas

Esta configuración toma menos de una hora y cuesta menos de 80 €. Es una forma poderosa de ayudar a víctimas a recuperar su seguridad digital.

Esta herramienta no reemplaza análisis forenses profesionales, pero es una buena primera verificación cuando víctimas llevan dispositivos a su refugio. Toda la configuración toma unos 45 minutos y cuesta menos de 70 € – un pequeño precio para ayudar a alguien a recuperar su privacidad digital.
