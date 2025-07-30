---
title: "Scripts útiles para automatizar comprobaciones y respuestas"
weight: 4
translationKey: "on-prem-scripts"
_build:
  render: always
menu:
  sidebar:
    weight: 20
description: "Los scripts son pequeñas herramientas que construyes una vez, y que hacen trabajos importantes por ti en segundo plano—como buscar señales de spyware, bloquear dispositivos sospechosos o copiar registros de teléfonos."
---

No necesitas saber programación. Piensa en ello como cocinar: sigue la receta al pie de la letra y el pastel (bueno, el script) hará su trabajo.

## Dónde colocar tus scripts

Querrás tener todos tus scripts personalizados en un lugar seguro y predecible. Así es como lograrlo.

1. Abre Terminal: En tu servidor (Linux), abre una ventana de terminal.
2. Crea la carpeta `scripts`. Aquí es donde vivirán tus scripts:

```bash
sudo mkdir -p /opt/siem/scripts
```

3. Entra en esa carpeta

```bash
cd /opt/siem/scripts
```

4. Bloquéala (solo los usuarios admin deberían poder tocarla)

```bash
sudo chmod 700 /opt/siem/scripts
```

## Desconectar un dispositivo de la red

**Qué hace:** Si un teléfono o portátil en la red se comporta de manera sospechosa—quizás muestra señales de spyware o rastreo—puedes desconectarlo inmediatamente usando este script.

**Por qué importa:** La respuesta rápida es crucial. Esto bloquea un dispositivo para que no envíe nada a internet.

### Paso a paso para crearlo

1. Dentro de `/opt/siem/scripts`, crea el archivo del script:

```bash
sudo nano quarantine_device.sh
```

2. Pega esto:

```bash
#!/bin/bash

echo "Desconectando $1 de la red..."
sudo iptables -A OUTPUT -s $1 -j DROP
```

3. Guarda y sal:

* Presiona `Ctrl + O`, luego `Enter`
* Presiona `Ctrl + X`

4. Hazlo ejecutable:

```bash
sudo chmod +x quarantine_device.sh
```

### Para usarlo

Si el dispositivo sospechoso tiene la IP `192.168.1.50`:

```bash
sudo /opt/siem/scripts/quarantine_device.sh 192.168.1.50
```

No volverá a pasar la puerta.

## Buscar cosas sospechosas en los logs de Wazuh

**Qué hace:** Revisa los logs de tu agente Wazuh y extrae cualquier cosa marcada como "sospechosa".

**Por qué importa:** Leer logs crudos es doloroso. Esto te da un archivo pequeño con solo las alertas.

### Paso a paso

1. Crea el archivo:

```bash
sudo nano parse_logs.sh
```

2. Pega esto:

```bash
#!/bin/bash

mkdir -p /opt/siem/alerts
journalctl -u wazuh-agent | grep -i suspicious > /opt/siem/alerts/suspicious.log
```

3. Guarda y sal (`Ctrl + O`, `Enter`, `Ctrl + X`)

4. Hazlo ejecutable:

```bash
sudo chmod +x parse_logs.sh
```

### Automatízalo cada hora

```bash
crontab -e
```

Al final, añade:

```
0 * * * * /opt/siem/scripts/parse_logs.sh
```

Ahora cada hora revisará los logs y guardará cualquier cosa alarmante en:

```
/opt/siem/alerts/suspicious.log
```

### Encripta los resultados (opcional, pero recomendado)

Asegúrate de que solo personas de confianza puedan leerlo:

```bash
gpg -c /opt/siem/alerts/suspicious.log
```

Elige una contraseña fuerte, guárdala de forma segura.

## Ejecutar en Android via Termux

Se usa cuando una víctima tiene un dispositivo Android y quieres recoger pistas útiles de él.

**En tu servidor (donde otros pueden descargarlo):**

1. Crea el archivo:

```bash
sudo nano /opt/siem/scripts/setup_android.sh
```

2. Pega esto:

```bash
#!/data/data/com.termux/files/usr/bin/bash

echo "Recogiendo pistas de Android..."

mkdir -p ~/ipa_siem_logs

pm list packages -f > ~/ipa_siem_logs/apps.txt
settings get global http_proxy > ~/ipa_siem_logs/proxy.txt
cat /data/misc/wifi/wpa_supplicant.conf > ~/ipa_siem_logs/wifi.txt 2>/dev/null
logcat -d > ~/ipa_siem_logs/logcat.txt

echo "✅ Hecho. Archivos guardados en ~/ipa_siem_logs/"
```

3. Hazlo ejecutable:

```bash
chmod +x /opt/siem/scripts/setup_android.sh
```

**Hospédalo para descargar:**

Desde `/opt/siem/scripts`:

```bash
python3 -m http.server 8000
```

**En el dispositivo Android (en Termux):**

```bash
pkg update && pkg install curl
curl -s http://192.168.1.10:8000/setup_android.sh | bash
```

## Obtener logs de un iPhone con jailbreak

Requiere:

* iPhone con **OpenSSH instalado** via Cydia
* Conoces la dirección IP del iPhone en la Wi-Fi local

En el servidor

```bash
sudo nano /opt/siem/scripts/pull_ios_logs.sh
```

Pega esto:

```bash
#!/bin/bash

IP=$1
USER=mobile
DATE=$(date +"%Y-%m-%d_%H-%M")

mkdir -p /opt/siem/ios_logs/$DATE

scp -r ${USER}@${IP}:/var/mobile/Library/Logs/CrashReporter /opt/siem/ios_logs/$DATE/
scp ${USER}@${IP}:/var/log/syslog /opt/siem/ios_logs/$DATE/

echo "Logs de iPhone guardados en /opt/siem/ios_logs/$DATE"
```

Hazlo ejecutable:

```bash
chmod +x /opt/siem/scripts/pull_ios_logs.sh
```

Ejecútalo así:

```bash
/opt/siem/scripts/pull_ios_logs.sh 192.168.1.23
```

## Buscar palabras de spyware en logs

```bash
sudo nano /opt/siem/scripts/watch_logs.sh
```

Pega esto:

```bash
#!/bin/bash

LOGDIR="/opt/siem/ios_logs"
ALERTS="/opt/siem/alerts"

mkdir -p $ALERTS

grep -rEi "spy|track|mirror|record|stalker|surveil|remote access" $LOGDIR > $ALERTS/suspicious.log

echo "Términos sospechosos encontrados. Revisa $ALERTS/suspicious.log"
```

Hazlo ejecutable:

```bash
chmod +x /opt/siem/scripts/watch_logs.sh
```

## Recoger archivos de memorias USB

```bash
sudo nano /opt/siem/scripts/usb_intake.sh
```

Pega esto:

```bash
#!/bin/bash

MOUNT="/media/usb"
DEST="/opt/siem/manual_uploads/$(date +%F_%H%M)"
mkdir -p $DEST

cp -r $MOUNT/* $DEST

echo "Archivos copiados a $DEST"
```

Hazlo ejecutable:

```bash
chmod +x /opt/siem/scripts/usb_intake.sh
```

## Ejecutar todo

```bash
sudo nano /opt/siem/scripts/full_check.sh
```

Pega esto:

```bash
#!/bin/bash

/opt/siem/scripts/usb_intake.sh
/opt/siem/scripts/watch_logs.sh
```

Hazlo ejecutable:

```bash
chmod +x /opt/siem/scripts/full_check.sh
```
