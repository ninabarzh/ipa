---
title: "Cómo crear clips de video deepfake para capacitaciones"
linkTitle: "Crear videos deepfake"
slug: "crear-videos-deepfake"
weight: 6
_build:
  render: always
description: "Instrucciones paso a paso para crear ejemplos de clips reales y alterados para la actividad 'Identifica el Falso', usando herramientas gratuitas para Windows y Linux."
menu:
  sidebar:
    weight: 30
    identifier: "es-make-deepfake"
    parent: "es-docs"
translationKey: "make-deepfake"
---

Esta guía explica cómo crear clips **reales** y **falsificados** para actividades de capacitación en refugios o talleres. Solo para uso educativo,  no para bromas en redes, caos político o molestar vecinos.

Puedes hacerlo en:

- **Windows**, con herramientas gratuitas o generadores web
- **Linux**, con opciones de terminal o interfaz gráfica
- Flujos de trabajo online u offline según tu modelo de amenazas y tiempo

## Principios clave

- Mantén clips bajo **30 segundos**
- Usa **contenido neutral** (ej: "Hola, soy X. Bienvenida al refugio.")
- **Siempre revela** qué es falso y cómo se hizo
- Nunca uses identidades reales de sobrevivientes o personal
- Almacena y elimina responsablemente

## Grabación real

Necesitarás:

- Teléfono o webcam (720p basta)
- Espacio tranquilo con buena luz
- Alguien que lea un guión corto
- No requiere edición (salvo recortar)

Herramientas gratuitas para recortar:
- **Windows**: App Fotos → Editar → Recortar
- **Linux**: `Shotcut`, `Kdenlive` o:

```bash
ffmpeg -i input.mp4 -ss 00:00:01 -to 00:00:29 -c copy recortado.mp4
```

## Creación de versiones deepfake

### Windows: Usando herramientas en línea

**La opción más fácil para la mayoría de usuarios**, solo si no te importa subir material a la nube.

#### Opción 1: DeepBrain AI Studios

* Ve a [DeepBrain AI Studios](https://www.aistudios.com/)
* Crea una cuenta gratuita (uso limitado)
* Sube un guión y elige un rostro (o crea un clon)
* Genera un clip,  normalmente en menos de un minuto
* Descarga el video (MP4)

#### Opción 2: HeyGen

* Ve a [HeyGen](https://www.heygen.com/)
* Elige un presentador o sube tu propia foto
* Añade un guión de texto
* Soporta múltiples idiomas y acentos
* Versión de prueba con marca de agua

#### Opción 3: Synthesia.io

* Ve a [Synthesia.io](https://www.synthesia.io/)
* Avatares pulidos, interfaz muy intuitiva
* Requiere cuenta
* La prueba gratuita incluye algunos videos

*Todas las plataformas en línea almacenan tus clips. Usa solo contenido genérico y considera usar correos desechables.*

### Windows: Usando herramientas gratuitas offline

#### Opción 1: Avatarify (código abierto, deepfake en tiempo real)

* Instala [Avatarify](https://avatarify.ai/)

```bash
pip install avatarify
```

* Usa con una webcam + lector de guiones
* Superpone un rostro famoso o genérico en tiempo real

#### Opción 2: DeepFaceLab

* Descarga desde [GitHub](https://github.com/iperov/DeepFaceLab)
* Requiere una GPU potente y paciencia
* Lo mejor para realismo, pero la configuración es avanzada

### Linux: Usando herramientas gratuitas

#### Opción 1: First-order Motion Model (FOMM)

* Usa [modelos pre-entrenados de Aliaksandr Siarohin](https://github.com/AliaksandrSiarohin/first-order-model)

```bash
git clone https://github.com/AliaksandrSiarohin/first-order-model
cd first-order-model
pip install -r requirements.txt
```

* Proporciónale:
  * Una imagen estática (rostro)
  * Un video de referencia (tú o un actor leyendo el guión)
- Genera videos animados

#### Opción 2: DeepFaceLive (compilación nativa para Linux)

Existe una versión para Linux, aunque está menos documentada y requiere más ajustes con dependencias como `dlib`, `onnxruntime` y versiones específicas de `ffmpeg`. Pero funciona:

* Clona el proyecto: `git clone https://github.com/iperov/DeepFaceLive.git`
* Sigue las [instrucciones para Linux](https://github.com/iperov/DeepFaceLive#linux) (menos pulidas pero funcionales):
  * Instala dependencias como Python 3.8–3.10, `onnxruntime`, `torch`, `opencv` y `dlib`
  * Usa virtualenv para mantener el orden
  * Prepárate para resolver problemas, especialmente con CUDA si quieres aceleración por GPU

- Bueno para generar videos con voz + rostro superpuesto
- Menos fluido que en Windows, pero utilizable con paciencia

## Qué preparar

* **3 a 4 clips reales** con introducciones simples
* **3 a 4 clips falsos**, generados de los mismos o similares guiones
* Opcional: **Un clip combinado** donde solo parte está alterada (ej. voz vs rostro)

Usa iluminación y tono consistentes para que las diferencias sean sutiles,  esto hace el juego de detección más desafiante (y divertido).

## Privacidad y ética

Haz:

* Obtén consentimiento informado de los hablantes reales
* Usa nombres inventados y guiones inofensivos
* Explica cómo y por qué se hizo el fake

No hagas:

* Uses videos de sobrevivientes reales, niños o historias sensibles
* Uses generadores deepfake sin revisar sus términos
* Olvides borrar datos en caché o sobrantes del entrenamiento

