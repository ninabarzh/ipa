---
title: "Cómo configurar un sistema de seguridad en la nube privada"
weight: 6
translationKey: "cloud"
_build:
  render: always
menu:
  sidebar:
    weight: 30
description: "Esta guía te guía paso a paso para desplegar la pila SIEM en una nube privada, ideal para refugios u organizaciones de apoyo que operan en múltiples ubicaciones. Tendrás acceso remoto, monitoreo centralizado y las mismas herramientas de detección de vigilancia, sin ceder el control de datos a las grandes tecnológicas."
---

Suponemos que tienes acceso básico de administrador al servidor en la nube, o conoces a un friki amigable que lo tenga.

## Lo que necesitarás

### Un servidor seguro en la nube

* Ejemplos de proveedores: Hetzner, Netcup, 1984 Hosting (evita AWS/Azure/Google salvo que la ley lo exija)
* Especificaciones recomendadas:

  * 8+ GB de RAM
  * 4 núcleos de CPU
  * 100 GB SSD
  * Ubuntu 22.04 LTS
* Endurecido con:

  * Fail2ban  
  * Actualizaciones automáticas  
  * UFW (firewall)

### Acceso VPN

* Todos los refugios deben usar túneles VPN seguros para conectarse al servidor en la nube.  
* WireGuard u OpenVPN son válidos.

### Dispositivos de sobrevivientes

Como en la versión local: Windows, macOS, Android (rooteado preferido), iOS (jailbreak o respaldos)

### Opcional: kit de herramientas PiRogue

Útil en clínicas o oficinas satélite para escanear dispositivos localmente.

## Configuración paso a paso

### Endurecer el servidor en la nube

```bash
# Actualizar el servidor
sudo apt update && sudo apt upgrade -y

# Instalar seguridad básica
sudo apt install fail2ban ufw unattended-upgrades -y
sudo ufw allow ssh
sudo ufw enable
````

### Instalar la pila SIEM

Igual que en local:

```bash
# Añadir repositorio de Wazuh
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | sudo gpg --dearmor -o /usr/share/keyrings/wazuh.gpg
echo \"deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main\" | sudo tee /etc/apt/sources.list.d/wazuh.list
sudo apt update

# Instalar componentes
sudo apt install -y wazuh-manager wazuh-api elasticsearch kibana

# Iniciar servicios
sudo systemctl enable --now wazuh-manager elasticsearch kibana
```

### Habilitar acceso seguro

#### Configurar VPN (ejemplo: WireGuard)

```bash
sudo apt install wireguard -y
# (Generar claves, compartir con cada sede. Usa puerto 51820.)
```

#### Acceder al panel de Wazuh

* Abre Kibana en `https://your-cloud-ip:5601`
* Configura HTTPS con Let’s Encrypt si es posible

## Conectar los refugios remotos

### Windows/macOS

* Descargar e instalar los agentes en los dispositivos del refugio
* Configurar el agente para conectar vía VPN a la IP del servidor

### Android (rooteado vía Termux)

```bash
pkg update && pkg install curl git
curl -s https://your-cloud-ip/setup_android.sh | bash
```

### Android (no rooteado)

El monitoreo directo es limitado, pero puedes extraer datos útiles manualmente y subirlos de forma segura.

#### Opción 1: usar ADB (Android Debug Bridge)

1. **Preparar tu ordenador**:

```bash
sudo apt install android-tools-adb
```

2. **Habilitar depuración USB en el Android**:

   * Ir a **Ajustes > Acerca del teléfono**
   * Tocar **Número de compilación** 7 veces
   * Activar **Opciones de desarrollador > Depuración USB**

3. **Conectar el teléfono vía USB**

4. **Recolectar logs y datos**:

```bash
adb devices
adb logcat -d > android_logcat.txt
adb shell dumpsys > android_dumpsys.txt
adb shell pm list packages -f > installed_packages.txt
```

5. **Subir logs de forma segura**:

```bash
scp android_*.txt youruser@your-siem.cloud:/opt/forensics/android_logs/
```

6. **(Opcional) Encriptar antes de subir**

```bash
gpg -c android_logcat.txt
```

#### Opción 2: Tablet recolector del refugio

1. En el Android, con la app **Archivos** o **CX File Explorer**:

   * Ve a `/Download`, `/WhatsApp/`, y `/DCIM/`
   * Copia logs, capturas, y medios sospechosos

2. Transfiere vía USB o tarjeta SD a la tablet

3. Sube los archivos al servidor SIEM (usando `scp` o un script seguro)

### iOS (con jailbreak o vía respaldo)

```bash
# Hacer respaldo en máquina cliente
idevicebackup2 backup /tmp/device_backup
# Subir al servidor seguro
scp /tmp/device_backup user@your-cloud-ip:/opt/backups/
```

## Triage con PiRogue (opcional)

* Desplegar PiRogue en ubicaciones remotas
* Enviar `.pcap` o logs al servidor:

```bash
scp suspicious.pcap user@your-cloud-ip:/opt/forensics/
```

* Analizar usando `tshark` o paneles de Kibana

## Mantenimiento continuo

* Rota las claves de WireGuard cada 90 días
* Haz backups diarios de logs:

```bash
tar -czf /opt/backup/siem_logs_$(date +%F).tar.gz /var/ossec/logs/
```

* Encripta con GPG o age:

```bash
gpg -c /opt/backup/siem_logs_*.tar.gz
```

* Programa tareas con cron para alertas automáticas y análisis

## Resumen

Esta configuración proporciona detección de amenazas segura y centralizada en múltiples ubicaciones, sin depender de servicios en la nube externos. Todos los datos permanecen contigo, cifrados y bajo control.

Aunque requiere mantenimiento (VPN, gestión de usuarios), reduce dramáticamente el riesgo local y protege la privacidad de las personas atendidas. Con algo de formación, personal con afinidad tecnológica puede gestionar el sistema, mientras especialistas apoyan desde remoto.

