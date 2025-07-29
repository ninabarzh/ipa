---
title: "How to make deepfake video clips for training"
linkTitle: "Make deepfake videos"
slug: "make-deepfake-vids"
weight: 6
_build:
  render: always
description: "Step-by-step instructions for creating example real and deepfaked video clips for the 'Spot the Fake' activity, using both Windows and Linux — with free tools or browser-based generators."
menu:
  sidebar:
    weight: 30
    identifier: "en-make-deepfake"
    parent: "en-docs"
translationKey: "make-deepfake"
---

This guide walks you through how to create short **real** and **deepfaked** video clips for training activities in shelters or workshops. These clips are meant for educational use only — not for social media pranks, political mayhem, or triggering your neighbour.

You can do this on:

- A **Windows** machine, using free downloadable tools or browser-based services
- A **Linux** machine, with command-line or GUI options
- Both online and offline workflows, depending on your threat model and available time

## Key principles

- Keep clips under **30 seconds**
- Use **neutral, non-triggering content** (e.g. “Hello, I’m X. Welcome to the shelter.”)
- **Always disclose** to participants what is fake, and how it was made
- Never use real survivor, staff, or client identities in fake videos
- Store and delete responsibly

## Real video recording

You will need:

- A phone or webcam (even 720p is fine)
- A quiet space with decent lighting
- Someone willing to say a short script
- No editing needed unless you want to trim the clip

Suggested free trimming tools:
- **Windows**: Use the built-in Photos app → Edit → Trim
- **Linux**: Use `Shotcut`, `Kdenlive`, or run:
  
```bash
ffmpeg -i input.mp4 -ss 00:00:01 -to 00:00:29 -c copy trimmed.mp4
```

## Creating deepfake versions

You can either use **online AI tools** (fast, no install) or **offline tools** (more control, privacy).

### Windows: Using online tools

**Easiest for most users**, only good if you do not mind uploading footage to the cloud.

#### Option 1: DeepBrain AI Studios

* GoTo [DeepBrain AI Studios](https://www.aistudios.com/)
* Create a free account (limited usage)
* Upload a script and pick a face (or create a clone)
* Generate a clip — usually under a minute
* Download the video (MP4)

#### Option 2: HeyGen

* GoTo [HeyGen](https://www.heygen.com/)
* Choose a presenter or upload your own photo
* Add a text script
* Supports multiple languages and accents
* Free trial with watermark

#### Option 3: Synthesia.io

* GoTo [Synthesia.io](https://www.synthesia.io/)
* Polished avatars, very slick UX
* Requires account
* Free trial includes a few videos

*All online platforms **store your clips**. Use only generic content and consider using burner emails.*

### Windows: Using free offline tools

#### Option 1: Avatarify (open-source, real-time deepfake)

* Install [avatarify](https://avatarify.ai/) with:

```bash
pip install avatarify
```

* Use with a webcam + script reader
* Overlay a celebrity or stock face in real time

#### Option 2: DeepFaceLab

* Download from [GitHub](https://github.com/iperov/DeepFaceLab)
* Requires strong GPU and patience
* Best for realism, but setup is advanced

### Linux: Using free tools

#### Option 1: First-order Motion Model (FOMM)

* Use [pre-trained models from Aliaksandr Siarohin](https://github.com/AliaksandrSiarohin/first-order-model).

```bash
git clone https://github.com/AliaksandrSiarohin/first-order-model
cd first-order-model
pip install -r requirements.txt
```

* Feed it:

  * A still image (face)
  * A driving video (you or actor reading script)

- Outputs animated video

#### Option 2: DeepFaceLive (Linux-native build)

There *is* a Linux-native build, although it is far less documented and requires a bit more fiddling with dependencies 
like `dlib`, `onnxruntime`, and specific versions of `ffmpeg`. But it works:

* Clone the project: `git clone https://github.com/iperov/DeepFaceLive.git`
* Follow the [Linux setup instructions](https://github.com/iperov/DeepFaceLive#linux) (not as polished, but workable):

  * Install dependencies like Python 3.8–3.10, `onnxruntime`, `torch`, `opencv`, and `dlib`.
  * Use virtualenv to keep things tidy.
  * Expect to troubleshoot a bit—especially with CUDA if you want GPU acceleration. It is rather system heavy.

- Good for generating video output with voice + face overlay.
- Less real-time smooth than on Windows, but usable with some patience.

## What to prepare

* **3 to 4 real clips** with simple introductions
* **3 to 4 fake clips**, generated from same or similar scripts
* Optional: **One blended clip** where only part is altered (e.g. voice vs face)

Use consistent lighting and tone so the difference is subtle — it makes the spotting game harder (and more fun).

## Privacy and ethics

Do:

* Get informed consent from real speakers
* Use made-up names and harmless scripts
* Explain how and why the fake was made

Do not:

* Use videos of real survivors, children, or sensitive stories
* Use deepfake generators without checking their terms
* Forget to delete cached or leftover training data

