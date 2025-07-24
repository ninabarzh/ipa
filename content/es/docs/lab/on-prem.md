---
title: "Cómo configurar un sistema de seguridad basado en refugios"
weight: 2
translationKey: "on-prem"
_build:
  render: always
menu:
  sidebar:  # Se añade a la barra lateral generada automáticamente por Docsy
    weight: 10
description: "Esta guía te lleva paso a paso en la configuración de la pila SIEM completamente dentro de tu refugio. Privado, potente y en tus manos - sin necesidad de la nube."
---

## Descargo de responsabilidad: Sistema en desarrollo activo

La pila SIEM local de PowerOn se encuentra actualmente en desarrollo activo. Esto significa que las cosas pueden cambiar rápidamente: las características pueden modificarse, las integraciones pueden fallar y algunas configuraciones siguen siendo experimentales o no han sido probadas en entornos de producción.

La orientación proporcionada aquí está diseñada para usuarios técnicos que construyen sistemas piloto o despliegues de prueba. Si estás implementando esta pila para proteger a personas vulnerables, procede con extremo cuidado. Valida cada componente en tu propio entorno y asume que nada es infalible desde el primer momento.

Estamos ampliando activamente la documentación, añadiendo configuraciones de ejemplo y refinando estrategias de correlación de registros a través de Zeek, Suricata, Sysmon y endpoints Linux. Las contribuciones, correcciones y mejoras probadas en el campo son muy bienvenidas.

Hasta que se declare estable, trata esta pila como un sistema vivo: frágil en algunas áreas, prometedor en otras y siempre sujeto a revisión.

## Decisiones de diseño

* Sin plataformas en la nube de terceros
* Sin que los datos salgan de tu edificio
* Sin vigilancia misteriosa sobre los supervivientes

Está diseñado para refugios con:

* Una conexión a Internet estable (aunque solo sea dentro del edificio)
* Un equipo pequeño pero comprometido
* Sin conocimientos técnicos (lo explicamos todo)
* Necesidad de detectar señales de acoso digital, manipulación o vigilancia

## Qué hace este sistema

Recopila pistas de dispositivos (como registros, alertas y comportamientos extraños), vigila signos de rastreo o intrusiones, y te proporciona un panel visual para que puedas detectar amenazas y actuar rápidamente.

## Qué necesitarás

### Un servidor para el refugio (tu centro de mando)

Esta es la máquina que ejecutará todo.

**Especificaciones mínimas:**

* Ubuntu 22.04 LTS (una versión gratuita de Linux - explicaremos cómo instalarlo si es necesario)
* Al menos 8 GB de RAM (memoria)
* Al menos 4 núcleos de CPU (potencia de procesamiento)
* Al menos 100 GB de espacio en disco
* Una dirección IP interna **fija** (para que otros dispositivos siempre puedan encontrarlo)

*Si no estás seguro, pide a tu voluntario de TI que configure una IP fija como `192.168.1.10`.*

Puedes usar:

* Un PC sobrante
* Un mini PC (como Intel NUC)
* Una máquina virtual en tu computadora administrativa existente (si es lo suficientemente potente)

### Dispositivos a monitorear

Estos son los dispositivos que puede atender este sistema:

* Laptops con Windows
* Dispositivos macOS (ej. MacBooks)
* Teléfonos Android (rooteados = más acceso, pero no requerido)
* iPhones (solo datos parciales a menos que estén liberados/jailbreak)

### Red del refugio (cableada o Wi-Fi)

Solo necesita conectar todos los dispositivos **dentro** del edificio. El sistema no necesita acceso a Internet una vez configurado.

### Opcional: Dispositivo PiRogue

[Un pequeño kit (basado en Raspberry Pi)](/docs/lab/pts.md) que verifica dispositivos en busca de comportamientos sospechosos antes de unirse a la red del refugio. Ideal durante entrevistas de admisión o trabajo comunitario.

## Configuración paso a paso del servidor

Aquí es donde vivirán todas tus herramientas de seguridad.

1. Abre una ventana de terminal (En tu servidor Ubuntu, presiona `Ctrl + Alt + T`)
2. Actualiza tu sistema e instala algunas herramientas esenciales para asegurarte de que tu servidor esté actualizado y pueda descargar paquetes de forma segura:

```bash
sudo apt update && sudo apt install -y curl unzip gnupg
```

3. Instala Java (requerido por algunos componentes ELK):

```bash
sudo apt install -y openjdk-11-jdk
```

### Instalar Wazuh (tu sistema de seguridad central)

Wazuh es un sistema de código abierto que monitorea dispositivos, busca problemas y te proporciona alertas y un panel. Incluye:
* Wazuh Manager (maneja alertas y acciones)
* Wazuh API (permite que el panel se comunique con el sistema)
* Elasticsearch (almacena registros y datos)
* Kibana (tu panel visual)

1. Añade la fuente de software de Wazuh:

```bash
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | sudo gpg --dearmor -o /usr/share/keyrings/wazuh.gpg

echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | sudo tee /etc/apt/sources.list.d/wazuh.list

sudo apt update
```

2. Instala Wazuh y herramientas de soporte:

```bash
sudo apt install -y wazuh-manager wazuh-api elasticsearch kibana
```

3. Inicia los servicios para que se ejecuten ahora y cada vez que reinicies el servidor:

```bash
sudo systemctl enable --now wazuh-manager elasticsearch kibana
```

### Configurar el panel de Wazuh

Una vez que todo esté funcionando, abre un navegador en tu servidor y ve a tu sala de control principal. Iniciarás sesión y verás alertas, información de dispositivos y más:

```
http://localhost:5601
```

O desde otro dispositivo en la misma red:

```
http://192.168.1.10:5601
```

### Instalar Zeek (tu sistema de monitoreo de red)

Zeek (antes Bro) es un potente framework de análisis de red que monitorea todo el tráfico y crea registros detallados de conexiones, archivos y protocolos. Incluye:

* Análisis de tráfico en tiempo real
* Detección de protocolos (HTTP, DNS, SSL, etc.)
* Capacidades de extracción de archivos
* Scripting personalizado para detección de amenazas

1. Instala Zeek desde los repositorios de Ubuntu:

```bash
sudo apt install -y zeek
```

Si Zeek no está disponible en tu versión de Ubuntu (o necesitas funciones más nuevas), compílalo desde el código fuente:

```bash
# Instala dependencias de compilación
sudo apt install -y cmake make gcc g++ flex bison libpcap-dev libssl-dev python3 python3-dev zlib1g-dev

# Descarga y compila Zeek (reemplaza X.X.X con la última versión)
wget https://download.zeek.org/zeek-X.X.X.tar.gz
tar xzf zeek-X.X.X.tar.gz
cd zeek-X.X.X
./configure
make
sudo make install
```

2. Configura Zeek para monitorear tu interfaz de red (encuentra la tuya con `ip link show`):

```bash
sudo nano /etc/zeek/node.cfg
```

Modifica para especificar tu interfaz (normalmente `eth0` o `ens33`):
```ini
[zeek]
type=standalone
host=localhost
interface=eth0   # Cambia esto a tu interfaz real
```

3. Añade scripts personalizados de detección de spyware

* Guarda tu script de detección (ej. `poweron-spyware.zeek`) en `/opt/zeek/share/zeek/site/` o `/opt/zeek/poweron-spyware.zeek`.
* Edita `/opt/zeek/local.zeek` y añade:

```zeek
@load ./poweron-spyware.zeek
```

4. Establece permisos:

* Zeek debe tener acceso de **lectura** y **escritura** a sus directorios de registros (`/opt/zeek/logs/current/`).
* Si ejecutas Zeek como usuario no root, asegúrate de que este usuario esté en los grupos apropiados o sea dueño de los directorios de registros:

```bash
sudo chown -R zeekuser:zeekgroup /opt/zeek/logs
sudo chmod -R 750 /opt/zeek/logs
```

5. Inicia el servicio Zeek:

```bash
sudo systemctl enable --now zeek
sudo zeekctl deploy  # Despliegue inicial
```

6. Verifica que Zeek esté funcionando:

```bash
zeekctl status
```

### Instalar Suricata (tu sistema de detección de intrusiones)

Suricata es un potente sistema de detección de intrusiones (IDS) que:
* Escanea el tráfico de red en busca de patrones maliciosos
* Detecta firmas de ataque conocidas
* Genera alertas de seguridad
* Se integra con fuentes de inteligencia sobre amenazas

1. Instala Suricata y dependencias:

```bash
sudo apt install -y suricata jq
```

2. Configura Suricata para monitorear tu interfaz de red:

```bash
sudo nano /etc/suricata/suricata.yaml
```

Establece la interfaz `af-packet`:

```yaml
af-packet:
  - interface: eth0   # Reemplaza con tu interfaz
    threads: auto
    cluster-id: 99
    cluster-type: cluster_flow
    defrag: yes
```

Habilita la salida EVE JSON para el envío de registros:

```yaml
outputs:
  - eve-log:
      enabled: yes
      filetype: regular
      filename: /var/log/suricata/eve.json
      types:
        - alert
        - dns
        - http
        - tls
        - flow
```

3. Actualiza las reglas de Suricata (incluyendo amenazas emergentes):

```bash
sudo suricata-update
sudo suricata-update update-sources
sudo systemctl restart suricata
```

4. Establece permisos

Asegúrate de que Suricata pueda escribir en `/var/log/suricata/`:

```bash
sudo chown -R suricata:suricata /var/log/suricata
sudo chmod -R 750 /var/log/suricata
```

5. Habilita e inicia Suricata

```bash
sudo systemctl enable suricata
sudo systemctl start suricata
```

6. Verifica que Suricata esté funcionando:

```bash
sudo systemctl status suricata
```

7. Comprueba alertas recientes (debería mostrar un array vacío \[] si no se detectaron amenazas):

```bash
jq '.event_type' /var/log/suricata/eve.json | grep alert | wc -l
```

### Configura Zeek y Suricata para iniciar al arrancar

Asegúrate de que ambos servicios se reinicien automáticamente:

```bash
sudo systemctl enable zeek
sudo systemctl enable suricata
```

### Verifica la integración con tu panel

Después de unos 5 minutos, revisa tu panel de Wazuh en `http://192.168.1.10:5601` para:
1. Registros de red de Zeek bajo "Security Events"
2. Alertas de Suricata en la sección "Threat Detection"

Para solucionar problemas, revisa los registros con:
```bash
journalctl -u zeek -f
journalctl -u suricata -f
```

## Conectar dispositivos de sobrevivientes

Así es como recopilas registros y alertas útiles de cada dispositivo.

### Para Windows o Mac

Estos dispositivos usan un programa llamado **Agente Wazuh** para enviar registros a tu servidor.

*¿Qué es un Agente Wazuh?* Una pequeña aplicación que se ejecuta en segundo plano, recopilando información relacionada con la seguridad como intentos de inicio de sesión, comportamientos extraños de aplicaciones o cambios en configuraciones. Envía estos datos de forma segura a tu servidor.

**Opción 1: Instalar el agente directamente desde el navegador**

1. En el dispositivo, abre un navegador web.
2. Ve a: `http://192.168.1.10:5601`
3. Descarga el agente para Windows o macOS.
4. Ejecuta el instalador.
5. Cuando te solicite la IP del servidor, ingresa la IP fija de tu servidor (ej. `192.168.1.10`)

**Opción 2: Instalar mediante USB (si no hay internet en el dispositivo)**

1. En el servidor:

```bash
wget https://packages.wazuh.com/4.x/agents/wazuh-agent_x.x.x.msi
cp wazuh-agent_x.x.x.msi /media/usb
```

2. Conecta el USB al dispositivo del sobreviviente.
3. Ejecuta el instalador manualmente.

### Para Android (rooteado)

**Rooteado** significa acceso completo al sistema interno del teléfono. Si no está rooteado, mira la siguiente sección.

1. Instala Termux (una app de terminal Linux): Descárgala desde [F-Droid](https://f-droid.org/packages/com.termux/).
2. Abre Termux y escribe:

```bash
pkg update && pkg install curl git
curl -s http://192.168.1.10/setup_android.sh | bash
```

([Este script debe prepararse en tu servidor](/docs/lab/on-prem-scripts.md).)

### Para Android (no rooteado)

Extraerás registros manualmente usando `adb`.

*¿Qué es `adb`?* ADB (Android Debug Bridge) es una herramienta que te permite comunicarte con teléfonos Android desde una computadora. La usarás para copiar información del sistema y registros.

1. Instala adb en tu servidor Ubuntu:

```bash
sudo apt install android-tools-adb
```

2. Habilita la depuración USB en el teléfono:

   * Ve a **Ajustes → Información del teléfono**
   * Toca **Número de compilación** 7 veces para desbloquear las opciones de desarrollador
   * Ve a **Opciones de desarrollador**, habilita **Depuración USB**

3. Conecta el teléfono al servidor con un cable USB.
4. Verifica que sea reconocido:

```bash
adb devices
```

Deberías ver un ID de dispositivo. Si no, revisa tu cable USB y los permisos.

5. Copia registros del teléfono:

```bash
adb logcat -d > /opt/logs/android_logcat.txt
adb bugreport > /opt/logs/android_bugreport.zip
```

6. Opcional: Extrae la lista de apps y configuraciones de proxy

```bash
adb shell pm list packages -f > /opt/logs/android_apps.txt
adb shell settings get global http_proxy
```

### Para iPhones con jailbreak (acceso completo)

1. Instala OpenSSH via Cydia (tienda de apps de jailbreak)
2. Usa [scripts seguros](on-prem-scripts.md) para transferir registros a tu servidor via SSH

### iPhones **sin** jailbreak

Usa copias de seguridad locales para extraer datos de apps.

1. Instala herramientas en el servidor:

```bash
sudo apt install libimobiledevice-utils
```

2. Haz una copia de seguridad del iPhone:

```bash
idevicebackup2 backup /opt/backups/ios_device/
```

3. Ejecuta un [script de análisis](on-prem-scripts.md) (puede que necesites ayuda):

```bash
python3 parse_ios_backup.py /opt/backups/ios_device/
```

Busca:

* Apps desconocidas
* Registros de ubicación
* Software de espejo

### Instalación de Sysmon (endpoints Windows)

Sysmon (System Monitor) es un servicio del sistema Windows que registra:  

* Creaciones de procesos con líneas de comando  
* Conexiones de red  
* Marcas de tiempo de creación de archivos  
* Cargas de controladores  
* Seguimiento más detallado que los registros estándar de Windows  

Instala Sysmon **después** de desplegar los agentes Wazuh pero **antes** de configurar reglas avanzadas de monitoreo.

1. Descarga Sysmon de Microsoft [https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon):

```powershell
Invoke-WebRequest -Uri "https://download.sysinternals.com/files/Sysmon.zip" -OutFile "$env:TEMP\Sysmon.zip"
Expand-Archive -Path "$env:TEMP\Sysmon.zip" -DestinationPath "C:\Program Files\Sysmon"
```

2. Crea un archivo de configuración  

Usa una configuración mínima centrada en spyware (guarda como `poweron-sysmon-config.xml`):

```xml
<Sysmon schemaversion="4.70">
  <EventFiltering>
    <ProcessCreate onmatch="include" />
    <NetworkConnect onmatch="include" />
    <ImageLoad onmatch="include" />
    <ProcessAccess onmatch="include" />
    <CreateRemoteThread onmatch="include" />
    <RegistryEvent onmatch="include" />
    <Exclude>
      <Image condition="is">C:\Windows\System32\svchost.exe</Image>
      <Image condition="is">C:\Windows\System32\services.exe</Image>
      <Image condition="is">C:\Windows\System32\lsass.exe</Image>
    </Exclude>
  </EventFiltering>
</Sysmon>
```

3. Instala con configuración

Abre PowerShell como Administrador y ejecuta:

```powershell
cd "C:\Program Files\Sysmon"
.\Sysmon64.exe -i poweron-sysmon-config.xml -accepteula
```

4. Verifica en el Visor de Eventos  

Abre: **Visor de Eventos > Registros de aplicaciones y servicios > Microsoft > Windows > Sysmon > Operativo** 

Deberías ver nuevos eventos de proceso/red.

5. Añade esto al `ossec.conf` del agente Wazuh:  

```xml
<localfile>
  <log_format>eventchannel</log_format>
  <location>Microsoft-Windows-Sysmon/Operational</location>
</localfile>
```

### Configurar monitoreo de endpoints Linux

* Como Sysmon es solo para Windows, para endpoints Linux:

  * Considera `auditd` para monitoreo de procesos y sistema de archivos.
  * Usa Zeek y Suricata en sensores de red.
  * Despliega agentes Wazuh en máquinas Linux para recopilar syslogs, registros auditd y registros personalizados.
  * Configura agentes Wazuh para recopilación detallada de eventos Linux.

### Opcional: Usa PiRogue para escanear dispositivos antes de conectarlos

[Un dispositivo PiRogue](pts.md) se sitúa entre la red y un teléfono/laptop y observa todo el tráfico.

1. Conéctate al PiRogue:

```bash
ssh pi@piroguedevice.local
```

2. Inicia un escaneo de red:

```bash
sudo ./start_capture.sh --target 192.168.1.75
```

3. Cuando termine el escaneo, envía los datos a tu servidor:

```bash
scp capture.pcap user@192.168.1.10:/opt/forensics/
```

4. Revisa con este comando:

```bash
tshark -r /opt/forensics/capture.pcap
```

## Envío de registros al SIEM

### Envío de registros Zeek via Filebeat en máquinas sensoras

1. Instala Filebeat:

```bash
sudo apt install -y filebeat
```

2. Configura `/etc/filebeat/filebeat.yml`:

```yaml
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /opt/zeek/logs/current/conn.log
      - /opt/zeek/logs/current/dns.log
      - /opt/zeek/logs/current/http.log
    json.keys_under_root: true
    json.add_error_key: true
    fields:
      source: zeek
    fields_under_root: true

output.logstash:
  hosts: ["your-wazuh-manager:5044"]
```

3. Habilita el módulo Zeek (opcional, si usas módulo):

```bash
sudo filebeat modules enable zeek
```

4. Inicia y habilita Filebeat:

```bash
sudo systemctl start filebeat
sudo systemctl enable filebeat
```

### Envío de registros Suricata via Filebeat

1. En `/etc/filebeat/filebeat.yml`, añade:

```yaml
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /var/log/suricata/eve.json
    json.keys_under_root: true
    json.add_error_key: true
    fields:
      source: suricata
    fields_under_root: true

output.logstash:
  hosts: ["your-wazuh-manager:5044"]
```

2. Habilita el módulo Suricata (opcional):

```bash
sudo filebeat modules enable suricata
```

3. Reinicia Filebeat para aplicar cambios:

```bash
sudo systemctl restart filebeat
```

### Envío de registros Sysmon desde endpoints Windows

* En Windows, instala el agente Wazuh (preferido) o Filebeat.
* Para el agente Wazuh, configúralo para recopilar registros del canal de eventos Sysmon (ver abajo).
* Si usas Filebeat, configúralo para leer registros de eventos Sysmon y enviarlos directamente a Wazuh o Elasticsearch.

## Configurar Wazuh para ingesta de registros

### Añadir registros Zeek

En la configuración del manager o agente Wazuh (`ossec.conf`), añade:

```xml
<localfile>
  <log_format>json</log_format>
  <location>/opt/zeek/logs/current/conn.log</location>
</localfile>
<localfile>
  <log_format>json</log_format>
  <location>/opt/zeek/logs/current/dns.log</location>
</localfile>
<localfile>
  <log_format>json</log_format>
  <location>/opt/zeek/logs/current/http.log</location>
</localfile>
```

### Añadir registros Suricata

Añade a `ossec.conf`:

```xml
<localfile>
  <log_format>json</log_format>
  <location>/var/log/suricata/eve.json</location>
</localfile>
```

### Añadir registros Sysmon

En el `ossec.conf` del agente Windows:

```xml
<localfile>
  <log_format>eventchannel</log_format>
  <location>Microsoft-Windows-Sysmon/Operational</location>
</localfile>
```

## Configuración de decodificadores y reglas para Wazuh

### Configuración de decodificador y reglas para Zeek

Para que los registros Zeek sean significativos en Wazuh, debes habilitar los decodificadores y reglas correctos. Por defecto, Wazuh no entiende automáticamente los registros Zeek a menos que se le indique cómo hacerlo. Así es como lo configuras:

1. Habilita el decodificador Zeek

Revisa el archivo `etc/decoders/zeek-decoder.xml` en tu manager Wazuh. Si no existe, créalo con:

```xml
<decoder name="zeek">
  <program_name>zeek</program_name>
  <type>json</type>
</decoder>
```

Si estás ingiriendo registros JSON sin campo `program_name`, añade reglas personalizadas que se activen en campos específicos de Zeek como `uid`, `id.orig_h`, `proto`, etc.

2. Carga archivos de reglas para Zeek

Wazuh necesita reglas que entiendan la estructura y semántica de los registros Zeek. Puedes:

* Usar las [reglas Zeek contribuidas por la comunidad](https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/ruleset.html) de Wazuh, o
* Crear un archivo `rules/zeek_rules.xml` con entradas como:

```xml
<group name="zeek,">
  <rule id="100200" level="5">
    <decoded_as>json</decoded_as>
    <field name="proto">tcp</field>
    <description>Conexión TCP de Zeek detectada</description>
  </rule>
</group>
```

Esto permite marcar, correlacionar o escalar basado en contenidos de Zeek.

3. Si los registros se envían desde otra máquina...

Cuando Zeek se ejecuta en un sensor y envía registros a la máquina SIEM:

* **Permisos**: Asegúrate de que Filebeat (o tu proceso de sincronización) tenga permiso para leer los registros Zeek y que no se roten antes de la ingesta. Usa `chmod o+r` o un grupo dedicado.

* **Integridad**: Evita manipulación o truncamiento con:

  * `rsync -a --checksum` o
  * Canales de transporte encriptados (ej. túneles SSH, Filebeat sobre TLS)

* **Marcas de tiempo**: Verifica zonas horarias y usa campos `ts` de los registros Zeek directamente – evita depender de tiempos de modificación de archivos.

4. Verifica que todo esté conectado

* Ejecuta `wazuh-logtest` con una línea de registro Zeek para probar coincidencias
* Observa `/var/ossec/logs/ossec.log` para errores o advertencias del decodificador
* Usa `alerts.json` o la pestaña Discover en Kibana para confirmar que las reglas se activan como se espera

### Habilita decodificadores Suricata

Usa los decodificadores y reglas predeterminados de Suricata de Wazuh o contribuciones de la comunidad.

### Habilita decodificadores Sysmon

Wazuh incluye decodificadores y reglas predeterminados para Sysmon. Asegúrate de que estén habilitados.

## Pruebas y validación

* Ejecuta `filebeat test config -c filebeat.yml` antes de iniciar Filebeat
* Confirma que los registros aparezcan en tu índice o manager dentro de 30 segundos
* Usa `jq` para validar manualmente JSON de Zeek si la ingesta falla misteriosamente

1. Ejecuta:

```bash
filebeat test config -c /etc/filebeat/filebeat.yml
```

2. Prueba decodificadores Wazuh con:

```bash
wazuh-logtest
```

3. Monitorea los registros del manager Wazuh (`/var/ossec/logs/ossec.log`) para errores del decodificador.
4. Revisa Elasticsearch/Kibana para registros entrantes y alertas.

## Consideraciones de seguridad e integridad

* Para envío remoto de registros, asegúrate:
  * Los permisos de archivo permitan leer registros a Filebeat/Wazuh.
  * Los registros no se roten antes de la ingesta.
  * Usa canales de transporte encriptados (TLS, túneles SSH).
  * Verifica regularmente la integridad de registros y corrección de marcas de tiempo.

## Añade scripts de automatización

Ver [Scripts útiles (para automatizar comprobaciones y respuestas)](on-prem-scripts.md)

## Mantenimiento semanal

* Revisa el panel para nuevas alertas
* Haz copia de seguridad de la carpeta `/var/ossec/logs/` en un USB o disco externo
* Reinicia el servidor mensualmente para limpiar memoria
* Guarda el servidor en un lugar seguro
* Revisa los registros de alertas (`/opt/siem/alerts/suspicious.log` si usas script)

## Resumen

| Componente        | Ubicación instalación | Archivos clave de configuración     | Rutas de registros                 | Permisos                     |
|-------------------|-----------------------|-------------------------------------|------------------------------------|------------------------------|
| Zeek              | Servidor/Sensor Ubuntu | `/etc/zeek/node.cfg`, `local.zeek` | `/opt/zeek/logs/current/*.log`     | `chmod/chown` en registros    |
| Suricata          | Servidor/Sensor Ubuntu | `/etc/suricata/suricata.yaml`      | `/var/log/suricata/eve.json`       | `chmod/chown` en registros    |
| Sysmon            | Endpoints Windows     | `poweron-sysmon-config.xml`        | Registro de eventos Windows (Canal Sysmon) | Configurar reenvío de eventos |
| Filebeat (Linux)  | Servidor/Sensor Ubuntu | `/etc/filebeat/filebeat.yml`       | Lee registros Zeek/Suricata        | Lectura en registros          |
| Filebeat (Windows)| Endpoints Windows     | `filebeat.yml`                     | Lee registros `.evtx` de Sysmon    | Lectura en registros          |
| Wazuh Manager     | Servidor Ubuntu       | `/var/ossec/etc/ossec.conf`        | Recibe todos los registros via agentes | N/A                           |

No bloquea todas las amenazas, pero te permite **verlas**, y eso es la mitad de la batalla. Para soporte adicional, contacta a un grupo local de confianza de derechos digitales – pueden guiarte remotamente por chat encriptado o teléfono.

Con esta configuración basada en herramientas de código abierto, todo permanece bajo tu techo – sin nube, sin exposición a terceros. Es tu radar privado, observando silenciosamente en busca de stalkerware o manipulación. El poder del sistema proviene de prácticas simples: revisa registros regularmente, responde a alertas y protege el acceso físico. Con orientación básica, todos en el refugio pueden ayudar a operar y entender este sistema.

## Construcción de paneles Kibana y alertas Wazuh para detección de spyware

1. Abre tu navegador web preferido.

2. Ingresa tu URL de Kibana, que normalmente luce así:

```
http://your-kibana-server:5601
```

3. Inicia sesión con tu nombre de usuario y contraseña.

## Creación de patrones de índice en Kibana

Los patrones de índice le dicen a Kibana qué datos debe observar.

1. En la barra lateral izquierda, haz clic en **Stack Management** (o solo **Management** dependiendo de tu versión de Kibana).

2. Bajo **Kibana**, selecciona **Index Patterns**.

3. Haz clic en **Create index pattern**.

4. Ingresa el nombre del patrón de índice que coincida con tus datos de registro:

   * Para registros Zeek: `zeek-*`
   * Para registros Suricata: `suricata-*`
   * Para registros Sysmon: `sysmon-*`
   * Para alertas Wazuh: `wazuh-alerts-*`

5. Haz clic en **Next step**.

6. Selecciona el **campo de tiempo** para tu patrón de índice, normalmente `@timestamp`.

7. Haz clic en **Create index pattern**.

Repite para cada fuente de datos.

## Creación de visualizaciones en Kibana

Crearás varias visualizaciones para monitorear actividades relacionadas con spyware.

### Visualizando conexiones a dominios e IPs de spyware

**Objetivo:** Ver tráfico de red a dominios de spyware conocidos o IPs sospechosas.

1. En la barra lateral izquierda, haz clic en **Analytics** → **Visualize Library**.

2. Haz clic en **Create visualization**.

3. Elige **Lens**.

4. Selecciona el patrón de índice `zeek-*` o `suricata-*`.

5. En el panel derecho, ubica el campo `destination.ip` o `dns.rrname` (nombre de dominio solicitado).

6. Arrastra `destination.ip` al área de trabajo principal.

7. Arrastra `source.ip` junto a él o añádelo como **Break down by** para ver mapeos origen-destino.

8. Para filtrar por dominios o IPs relacionados con spyware:

   * Haz clic en **Add filter** sobre el área de trabajo.
   * Selecciona el campo relevante (`dns.rrname` o `destination.ip`).
   * Elige **is one of**.
   * Ingresa tu lista de dominios de spyware conocidos o direcciones IP, separados por comas.
   * Haz clic en **Save**.

9. Ajusta el tipo de visualización si lo deseas (ej. gráfico de barras, tabla).

10. Haz clic en **Save** arriba, nómbralo **Conexiones de red de spyware** y guárdalo.

### Visualizando consultas DNS sospechosas

**Objetivo:** Identificar consultas DNS a dominios sospechosos.

1. Crea una nueva visualización como arriba.

2. Selecciona el patrón de índice `zeek-*` o `suricata-*`.

3. Arrastra el campo `dns.rrname` o `dns.query` al área principal.

4. Establece agregación en **Top values** y tamaño en algo razonable como 10 o 20.

5. Añade filtros:

   * Para incluir solo dominios sospechosos, añade un filtro en `dns.rrname` para tu lista de dominios spyware.

   * Alternativamente, excluye dominios populares comunes:

     * Añade un filtro con `dns.rrname` **is not one of** y lista dominios comunes (google.com, microsoft.com, etc.).

6. Haz clic en **Save**, nómbralo **Consultas DNS sospechosas**.

### Visualizando patrones de beaconing

**Objetivo:** Detectar llamadas de red repetitivas y periódicas típicas de beaconing de spyware.

1. Crea una nueva visualización usando **Lens** o **Gráfico de líneas**.

2. Selecciona el patrón de índice `zeek-*` o `suricata-*`.

3. Establece el eje X en **Date Histogram** basado en `@timestamp`.

4. Establece el intervalo en 1 o 5 minutos dependiendo de tu volumen de registros.

5. Establece el eje Y en **Count** de eventos.

6. Para enfocarte en actividad sospechosa:

   * Añade un filtro en `destination.ip` o `dns.rrname` para IPs o dominios spyware.

7. Opcionalmente, añade **Break down by** `source.ip` para ver qué hosts hacen beaconing.

8. Guarda como **Actividad de beaconing**.

### Visualizando procesos y conexiones sospechosas de Sysmon

**Objetivo:** Ver creaciones de procesos y conexiones de red sospechosas desde endpoints Windows.

1. Crea una nueva visualización.

2. Selecciona el patrón de índice `sysmon-*`.

3. Para creaciones de procesos:

   * Filtra `event_id` = 1 (creación de proceso Sysmon).

   * Arrastra el campo `process_name` o `image` al área de trabajo.

   * Agrega por valores principales.

4. Para conexiones de red:

   * Filtra `event_id` = 3.

   * Arrastra `destination_ip` o `destination_port`.

5. Aplica filtros para nombres de procesos o puertos sospechosos conocidos si están disponibles.

6. Guarda la visualización como **Actividad sospechosa de Sysmon**.

## Construyendo el panel de Kibana

1. En la barra lateral izquierda, haz clic en **Dashboard**.

2. Haz clic en **Create new dashboard**.

3. Haz clic en **Add** y selecciona las visualizaciones guardadas:

   * Conexiones de red de spyware
   * Consultas DNS sospechosas
   * Actividad de beaconing
   * Actividad sospechosa de Sysmon

4. Organiza las visualizaciones lógicamente para monitoreo de un vistazo.

5. Haz clic en **Save**, nombra tu panel, ej. **Resumen de monitoreo de spyware**.

## Correlacionando registros de endpoints y red por hostname o IP

Esto ayuda a vincular actividad de red sospechosa con endpoints específicos.

1. Asegúrate de que tus registros tengan identificadores consistentes:

   * Registros Zeek y Suricata: `source.ip`, `destination.ip`

   * Registros Sysmon: `hostname` o `computer_name`

2. Para correlacionar en Kibana: Usa **Lens** o **Canvas** para crear visualizaciones combinadas emparejando `source.ip` de Zeek/Suricata con `hostname` en registros Sysmon.

3. Ejemplo: Construye un gráfico de series de tiempo mostrando beaconing de red por IP de origen junto con procesos sospechosos de la misma IP/hostname.

## Creando alertas en Wazuh para eventos sospechosos combinados

### Escribiendo reglas de correlación personalizadas

1. Conéctate a tu manager Wazuh (servidor Ubuntu).

2. Abre el archivo de reglas personalizadas:

```bash
sudo nano /var/ossec/etc/rules/local_rules.xml
```

3. Escribe una regla que se active si múltiples eventos sospechosos ocurren juntos. Ejemplo:

```xml
<rule id="100500" level="12">
  <if_sid>100200</if_sid>  <!-- Conexión sospechosa de Zeek -->
  <if_sid>200300</if_sid>  <!-- Alerta de spyware de Suricata -->
  <if_sid>300400</if_sid>  <!-- Proceso sospechoso de Sysmon -->
  <frequency>3</frequency>
  <timeframe>600</timeframe> <!-- 10 minutos -->
  <description>Actividad de spyware detectada a través de red y endpoint</description>
</rule>
```

4. Guarda y cierra.

### Reinicia el manager Wazuh para aplicar reglas

```bash
sudo systemctl restart wazuh-manager
```

## Configurando acciones de alerta

Quieres que Wazuh te notifique cuando ocurra actividad sospechosa.

1. Edita la configuración de Wazuh:

```bash
sudo nano /var/ossec/etc/ossec.conf
```

2. Configura alertas por email, webhook de Slack u otros métodos de notificación dentro de las secciones `<global>` y `<alerts>`.

3. Guarda y reinicia el manager Wazuh:

```bash
sudo systemctl restart wazuh-manager
```

## Probando paneles y alertas

1. Genera eventos de prueba:

   * Simula consultas DNS a dominios spyware.
   * Dispara conexiones de red a IPs sospechosas conocidas.
   * Inicia procesos sospechosos en endpoints Windows.

2. Confirma que los registros aparezcan en visualizaciones de Kibana.

3. Confirma que las alertas se activen en Wazuh y recibas notificaciones.

## Consejos de correlación Wazuh y Kibana

* Envía registros Zeek (`conn.log`, `dns.log`, `http.log`) via Filebeat o ingesta nativa.
* Ingiere salida `eve.json` de Suricata y mapea `alert.signature` en paneles.
* Reenvía registros Sysmon con el agente Wazuh; usa el conjunto de reglas predeterminado para filtrado de eventos.

### Ideas para paneles

* Dominios/IPs relacionados con spyware a lo largo del tiempo
* Comportamiento de beaconing por endpoint
* Frecuencia de alertas Suricata por host
* Detecciones correlacionadas: proceso + red + DNS para el mismo host

### Consejo de automatización

Activa una alerta Wazuh si:

* Un proceso con línea de comandos sospechosa se inicia, **y**
* Una firma de beaconing se activa dentro de 10 minutos desde el mismo host

Configura notificaciones para coincidencias de alta confianza via email o webhook.

# Resumen

Esta guía te llevó desde cero a un panel de monitoreo Kibana funcional, con alertas Wazuh en indicadores combinados de spyware abarcando registros de red y endpoints.

Ahora tienes:

* Patrones de índice personalizados para Zeek, Suricata, Sysmon y alertas Wazuh
* Visualizaciones rastreando conexiones a dominios spyware, consultas DNS, beaconing y eventos sospechosos de Sysmon
* Un panel integral que unifica todo
* Reglas de correlación Wazuh que activan alertas en actividad sospechosa multi-fuente
* Configuración de notificaciones para alertas accionables

No se requiere conocimiento previo, solo sigue cada paso como se describe. Las defensas digitales de tu refugio son ahora mucho más vigilantes.
