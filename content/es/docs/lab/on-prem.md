---
title: "Cómo configurar un sistema de seguridad en refugios"
weight: 2
translationKey: "on-prem"
_build:
  render: always
menu:
  sidebar:
    weight: 10
description: "Guía para implementar el stack SIEM completamente dentro del refugio. Privado, potente y bajo tu control – sin necesidad de cloud."
---

* Sin plataformas cloud de terceros
* Sin que los datos salgan del edificio
* Sin vigilancia oculta a sobrevivientes

Diseñado para refugios con:

* Conexión a Internet estable (aunque sea solo interna)
* Equipo pequeño pero comprometido
* Sin conocimientos técnicos (lo explicamos todo)
* Necesidad de detectar acoso digital, manipulación o vigilancia

## Funcionalidades

Recopila pistas de dispositivos (logs, alertas, comportamientos sospechosos), detecta rastreo o intrusiones, y proporciona un panel visual para identificar amenazas rápidamente.

## Requisitos

### Servidor del refugio (centro de control)

**Especificaciones mínimas:**

* Ubuntu 22.04 LTS (versión gratuita de Linux)
* 8 GB RAM mínimo
* 4 núcleos de CPU
* 100 GB de almacenamiento
* IP interna **fija**

Hardware compatible:

* PC antiguo
* Mini PC (ej. Intel NUC)
* Máquina virtual (si el equipo es potente)

### Dispositivos a monitorear

* Windows
* macOS
* Android (root opcional)
* iPhone (datos limitados sin jailbreak)

### Red local (cable o Wi-Fi)

Solo necesita conectar dispositivos **dentro** del edificio.

### Opcional: Dispositivo PiRogue

[Herramienta basada en Raspberry Pi](/docs/lab/pts.md) para analizar dispositivos antes de conectarlos a la red.

## Configuración paso a paso

### Preparar el servidor

1. Abrir terminal (`Ctrl + Alt + T`)
2. Actualizar sistema:

```bash
sudo apt update && sudo apt install -y curl unzip gnupg
```

### Instalar Wazuh

Añadir repositorio:

```bash
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | sudo gpg --dearmor -o /usr/share/keyrings/wazuh.gpg

echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | sudo tee /etc/apt/sources.list.d/wazuh.list

sudo apt update
```

Instalar componentes:

```bash
sudo apt install -y wazuh-manager wazuh-api elasticsearch kibana
```

Iniciar servicios:

```bash
sudo systemctl enable --now wazuh-manager elasticsearch kibana
```

### Configurar dashboard

Acceder desde:

```
http://localhost:5601
```

O desde la red local:

```
http://192.168.1.10:5601
```

## Conectar dispositivos

### Windows/Mac

Instalar **Wazuh Agent**:

1. Descargar desde `http://192.168.1.10:5601`
2. Ejecutar instalador
3. Ingresar IP del servidor

### Android (root)

1. Instalar Termux desde [F-Droid](https://f-droid.org/packages/com.termux/)
2. Ejecutar:

```bash
pkg update && pkg install curl git
curl -s http://192.168.1.10/setup_android.sh | bash
```

### Android (sin root)

1. Instalar ADB:

```bash
sudo apt install android-tools-adb
```

2. Activar depuración USB en el teléfono
3. Conectar y verificar:

```bash
adb devices
```

4. Extraer logs:

```bash
adb logcat -d > /opt/logs/android_logcat.txt
adb bugreport > /opt/logs/android_bugreport.zip
```

### iPhone (jailbreak)

1. Instalar OpenSSH via Cydia
2. Transferir logs via SSH

### iPhone (sin jailbreak)

1. Instalar herramientas:

```bash
sudo apt install libimobiledevice-utils
```

2. Crear backup:

```bash
idevicebackup2 backup /opt/backups/ios_device/
```

3. Analizar:

```bash
python3 parse_ios_backup.py /opt/backups/ios_device/
```

### Opcional: PiRogue

1. Conectar:

```bash
ssh pi@piroguedevice.local
```

2. Escanear:

```bash
sudo ./start_capture.sh --target 192.168.1.75
```

3. Transferir datos:

```bash
scp capture.pcap user@192.168.1.10:/opt/forensics/
```

## Mantenimiento semanal

* Revisar alertas en el dashboard
* Respaldar `/var/ossec/logs/`
* Reiniciar servidor mensualmente
* Almacenar servidor en lugar seguro
* Revisar logs de alertas

## Resumen

Este sistema open-source mantiene todos los datos dentro del refugio, sin dependencia de la nube. Con prácticas básicas, cualquier miembro del refugio puede operarlo.
