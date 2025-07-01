---
title: "Build-a-thon para refugios seguros"
linkTitle: "Build-a-thon para refugios seguros"
weight: 2
_build:
  render: always
description: "Un taller práctico y positivo sobre tecnología para personal de refugios. Sin sermones, sin noticias alarmantes—solo trabajo en equipo, dispositivos y un saludable respeto por el caos controlado."
menu:
  sidebar:
    weight: 10
    identifier: "es-secure-shelter"
    parent: "es-docs"
translationKey: "secure-shelter"
---

## Resumen

* Nombre: Secure the Shelter  
* Tipo: Taller práctico de creación de laboratorio  
* Público: Personal de refugios, voluntarios técnicos y cualquiera con curiosidad para conectar un USB  
* Duración: Un día largo (6–8 horas) o dos medias jornadas (recomendado)  
* Resultado: Laboratorio de seguridad funcional con Wazuh + Pirogue  

## Objetivos

* Configurar instancia funcional de Wazuh SIEM  
* Preparar Pirogue/Pithon en USB booteable o Raspberry Pi  
* Conectar dispositivos reales, generar logs, detectar amenazas simuladas  
* Crear flujo compartido de "primeros auxilios" para problemas técnicos  
* Fomentar confianza y colaboración mediante diversión, no miedo  

## Checklist previo

| Materiales                  | Notas                                                                 |
|-----------------------------|-----------------------------------------------------------------------|
| USBs (mínimo 3)             | Con setup.sh, archivos de configuración y herramientas preinstaladas  |
| Ordenador anfitrión         | Para instalar Wazuh – VM en la nube, mini servidor o portátil potente |
| Internet                    | Para descargas e instalación                                          |
| Proyector                   | Para demostraciones en vivo                                           |
| Guías rápidas               | Impresas y laminadas – "qué escribir", "qué no tocar" etc.            |
| Pegatinas, identificaciones | Monstruo de Logs, Duende del Kernel, Mapache en Alerta... ya sabes    |
| Snacks & café               | Estás instalando un SIEM, no sobreviviendo al campo de entrenamiento  |

## Etapa 1: Elegir configuración (a.k.a. Escoge tu bestia)

*"¿Qué será el cerebro de nuestra fortaleza digital?"*

### Opciones:

* Servidor Wazuh en la nube (DigitalOcean, Hetzner, etc.)  
* Instalar Wazuh en portátil o mini-PC del refugio  
* Usar Raspberry Pi 4 (para valientes)  

### Actividades:

* Equipos eligen su máquina y le ponen nombre (¡sugerencias incluidas!)  
* Ejecutar `setup.sh` y seguir el asistente  
* Celebrar cuando Kibana se abra correctamente (con baile victorioso o galleta)  

Consejo: Cada equipo recibe carpeta de inicio rápido en USB con:  

* `setup.sh` preescrito  
* Reglas de firewall predeterminadas  
* Bandera de equipo (de papel)  

## Etapa 2: Agentes en acción (a.k.a. Wazuh desatado)

*"Enseñemos a esto a olfatear problemas."*

### Metas:

* Conectar 1–2 dispositivos (portátiles Windows/macOS o VMs de prueba)  
* Generar logs y ver alertas en tiempo real  

### Actividades:

* Instalar agente Wazuh en máquina de prueba  
* Simular comportamiento normal y "sospechoso": nuevas cuentas, apps desconocidas, uso raro de USB  
* Usar firmas falsas para simular stalkerware  

Mini-reto:  

* ¿Quién consigue la primera alerta "crítica"?  
* Opcional: Concurso "explicación más ridícula de alerta"  

Momentos de aprendizaje:  

* "¿Qué significa este log?"  
* "¿Cómo saber si es solo Windows siendo raro?"  

## Etapa 3: Conectar, bootear, escanear (a.k.a. Pirogue y jugar)

*"Ahora vamos de pesca—de spyware."*

### Objetivos:

* Preparar USB booteable o Raspberry Pi con Pirogue  
* Escanear dispositivo Android o USB de prueba  

### Actividades:

* Cada equipo crea USB booteable (o inicia su Pi)  
* Conectar a teléfonos de prueba con adaptadores USB-C/OTG  
* Generar informe: ¿qué es normal? ¿qué es raro?  

Juegos opcionales:  
* Un teléfono tiene "spyware misterioso" (en realidad apps de prueba)  
* ¿Puede tu equipo identificarlo sin entrar en pánico?  

Consejos:  
* Incluir glosario de nombres de apps alarmantes pero inofensivas  
* Fomentar notas: "Raro pero seguro", "Revisar luego", etc.  

## Etapa 4: Fiesta de logs (a.k.a. Mostrar y compartir)

*"Porque si construyes una fortaleza y no lo cuentas, ¿de qué sirve?"*

### Actividades:

* Cada equipo presenta su configuración: nombre, agentes, aprendizajes  
* Ronda de "alerta más cool", "log más raro", "sorpresa mayor"  
* Crear juntos la Hoja de Triaje Técnico del Refugio:  

  * "Si alguien dice que su teléfono actúa raro..."  
  * "Si vemos una alerta que parece seria..."  
  * "Si no estamos seguros, hacemos esto..."  

Resultados:  

* Guía rápida impresa (ideal laminada)  
* Flujo de primeros auxilios en la pared  
* Credenciales de acceso configuradas  
* USBs repartidos para uso futuro  

Actividad final: Pegatinas, bautizo del Monstruo de Logs, fotos de equipo  

## Materiales posteriores

| Material            | Descripción                                    |
|---------------------|------------------------------------------------|
| Guía técnica        | Paso a paso: Wazuh, Pirogue, triaje            |
| Kit USB             | Herramientas, scripts, guías PDF               |
| Checklist de triaje | Qué hacer cuando la tecnología parece insegura |
| SIEM funcional      | Con dispositivos conectados y logs activos     |
| Derechos a presumir | Ganados, no regalados                          |

---

## Seguimientos opcionales

* Reunión mensual remota: "¿Qué hay de nuevo en los logs?"  
* Sistema de compañeros: emparejar personal con voluntarios técnicos  
* Invitar a asesoría legal o especialistas para planificación conjunta  

## Soporte y materiales para el evento
