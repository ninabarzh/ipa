---
title: "Configuración de contenedores seguros para SIEM"
linkTitle: "Contenedores SIEM stack"
weight: 4
_build:
  render: always
description: "Esta guía cubre el proceso paso a paso para configurar y utilizar nuestros contenedores predefinidos, endurecidos y listos para producción, adecuados para implementaciones locales y en la nube."
menu:
  sidebar:
    weight: 20
    identifier: "es-containers"
    parent: "es-lab"
translationKey: "containers"
---

Un stack SIEM listo para usar y reforzado para refugios y centros de crisis: Monitorea la red y los dispositivos en 
busca de intrusiones, stalkerware y otro software malicioso, con paneles preconfigurados y actualizaciones diarias de 
inteligencia de amenazas. 

---  

## Características 

- Stack SIEM con Wazuh + Elasticsearch + Kibana  
- Monitoreo de red con Zeek & Suricata y reglas personalizadas para stalkerware  
- Acceso exclusivo por VPN (WireGuard)  
- TLS entre todos los servicios  
- Cuentas RBAC predefinidas (admin, viewer)  
- Actualizaciones diarias de reglas e inteligencia de amenazas  
- Copias de seguridad nocturnas cifradas en disco local de 500 GB  
- Paneles de Kibana preconfigurados para:  
  - Resumen de amenazas  
  - Lista de vigilancia de stalkerware  
  - Anomalías de red  
  - Dispositivos de alto riesgo  

---  

## Requisitos

**Sistema anfitrión:**  
- Servidor Linux (probado en Debian 12, Ubuntu 22.04 LTS, Rocky Linux 9)  
- Docker + Docker Compose v2  
- **Mínimos recomendados:**  
  - CPU: 4 núcleos (8+ recomendados)  
  - RAM: 8 GB (16 GB recomendados)  
  - Almacenamiento: 200 GB SSD para datos + **disco adicional de 500 GB** para copias de seguridad  
- **Tarjeta de red dedicada para monitoreo (sniffing):**  
  - Una segunda interfaz de red conectada a la red que se desea monitorear  
  - **No debe tener una dirección IP asignada**  
  - Ejemplo: `eth1` en Linux  
  - Puede ser un adaptador USB 3.0 Gigabit Ethernet si no hay ranuras PCIe disponibles  
- Conexión a Internet (para actualizaciones de reglas, a menos que se use un feed offline)  

**Dispositivos cliente (para acceso VPN):**  
- Cliente WireGuard instalado (Windows, macOS, Linux, iOS o Android)

---

## ## Configuración inicial

### 1. Clonar el repositorio

```bash
git clone https://github.com/ninabarzh/secure-shelter-siem-stack.git
cd secure-shelter-siem-stack
```

### 2. Copiar y editar variables de entorno

```bash
cp .env.example .env
nano .env
```

Establecer contraseñas seguras para:

* `ELASTIC_PASSWORD`
* `KIBANA_PASSWORD`
* `WAZUH_PASSWORD`

### 3. Iniciar la VPN WireGuard (requerido)

Todo el acceso a Kibana, Elasticsearch y Wazuh es **a través de la VPN** — nada está expuesto a internet público.

Desde la raíz del repositorio:

```bash
docker-compose up -d vpn
```

El servidor VPN escucha en UDP/51820.
La puerta de enlace predeterminada de la subred VPN es `10.13.13.1`.

### 4. Añadir pares VPN (personal, respondedores, agentes remotos)

Para añadir un nuevo par:

```bash
./vpn/add-peer.sh <nombre-del-par>
```

Ejemplo:

```bash
./vpn/add-peer.sh alicia
```

Esto hará:

* Creará un par WireGuard llamado `alicia`
* Le asignará una IP en la subred VPN
* Guardará la configuración en `vpn/alicia.conf`

**Enviar `alicia.conf` de forma segura** al usuario — puede importarlo en el cliente WireGuard en Windows, macOS, Linux, Android o iOS.

### 5. Generar certificados TLS para Elasticsearch

Ejecutar:

```bash
./scripts/gen-certs.sh
```

Crea:

```
config/elasticsearch/certs/elastic-stack-ca.p12
config/elasticsearch/certs/elastic-certificates.p12
```

La contraseña se establece en `.env` — cámbiela si lo desea.

### 6. Actualizar reglas de detección

Obtener las últimas reglas de Suricata:

```bash
./scripts/update-rules.sh
```

Fuentes:

* Emerging Threats (v7.0.3)
* Lista negra SSL de AbuseCH
* `custom.rules` local para detección de stalkerware

### 7. Desplegar el stack SIEM

```bash
./scripts/deploy.sh
```

Inicia:

* Elasticsearch con TLS
* Kibana (importa paneles desde `config/dashboards/`)
* Wazuh Manager
* Suricata & Zeek
* Filebeat con TLS a Elasticsearch

### 8. Acceder a los paneles (via VPN)

Conéctese a la VPN con su configuración de par, luego abra:

```
http://10.13.13.1:5601
```

Inicio de sesión:

* **Usuario:** `kibana_system` (de `.env`)
* **Contraseña:** su `KIBANA_PASSWORD`

Paneles disponibles:

* **Resumen de Amenazas**: alertas de todas las fuentes
* **Dispositivos de Alto Riesgo**: endpoints con detecciones repetidas
* **Anomalías de Red**: patrones de tráfico sospechosos
* **Lista de Stalkerware**: detecciones para BadBox, mFly, FlexiSpy, Spynger

### 9. Desplegar agentes Wazuh

En un endpoint monitoreado (dentro de la VPN o red local):

```bash
curl -so wazuh-agent.deb https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_4.12.0-1_amd64.deb \
 && sudo WAZUH_MANAGER='10.13.13.1' dpkg -i ./wazuh-agent.deb \
 && sudo systemctl enable wazuh-agent --now
```

### 10. Requisitos de interfaz de red

Si usa Suricata/Zeek en modo captura de paquetes:

* Establezca `SNIFFING_INTERFACE` en `.env` (ej. `eth1`)
* Poner la interfaz en modo promiscuo:

```bash
sudo ip link set eth1 promisc on
```

Listo para monitorear, detectar y defender.

---

## Paneles 

Tras el primer inicio de sesión, verá:  

* **Resumen de amenazas:** Resumen de todas las alertas  
* **Lista de stalkerware:** Detecciones de BadBox, BadBox2, mFly, FlexiSpy, Spynger y otros  
* **Anomalías de red:** Eventos de Suricata/Zeek fuera de patrones normales  
* **Dispositivos de alto riesgo:** Endpoints con múltiples indicadores de stalkerware  

---  

## Copias de seguridad 

* Se ejecutan cada noche a las 02:00  
* Cifradas con GPG  
* Almacenadas en `/mnt/secure-backup` (disco de 500 GB)  
* En el primer uso, genera `config/backup/backup-key.gpg`  
* **Copie la clave a un USB y guárdela bajo llave** – sin ella, no se pueden restaurar las copias  

### Restaurar  

```bash
gpg --import config/backup/backup-key.gpg
gpg --decrypt /mnt/secure-backup/shelter-siem-YYYY-MM-DD_HH-MM.tar.gz.gpg | tar -xz -C data/
```  

---  

## Mantenimiento

* **Detener stack**: `./scripts/stop.sh`
* **Respaldar datos**: se ejecuta cada noche en `/mnt/secure-backup`
* **Restaurar respaldo**: `./scripts/restore-backup.sh`

### Actualizar reglas manualmente  

```bash
./scripts/update-rules.sh
docker compose restart suricata zeek
```  

### Actualizar stack  

```bash
docker compose pull && docker compose up -d
```  

---  

## Notas de seguridad  

* Cambie todas las contraseñas predeterminadas en `.env` antes del despliegue
* Almacene configuraciones de pares VPN de forma segura
* Mantenga los certificados TLS de Elasticsearch privados
* Monitoree uso de disco (`./data/elasticsearch`) — pode índices antiguos cuando sea necesario
* Todo el acceso es mediante VPN – nunca exponga los puertos 9200, 5601 o 55000 a Internet  
* Mantenga el disco de backups en un lugar físicamente seguro  
* Pruebe regularmente las configuraciones VPN y las copias de seguridad  
