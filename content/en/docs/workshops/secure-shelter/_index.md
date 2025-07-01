---
title: "Secure the shelter build-a-thon"
linkTitle: "Secure the shelter build-a-thon"
weight: 2
_build:
  render: always
description: "A cheerful, tech-positive, hands-dirty build-a-thon for shelter staff. No preaching, no doomscrolling—just teamwork, gadgets, and a healthy respect for mischief managed."
menu:
  sidebar:
    weight: 10
    identifier: "en-secure-shelter"
    parent: "en-docs"
translationKey: "secure-shelter"
---

## Overview

* Name: Secure the Shelter
* Type: Hands-on lab creation workshop
* Audience: Shelter staff, digital volunteers, and anyone with enough curiosity to plug in a USB
* Duration: One long day (6–8 hours) or two half-days (the latter is recommended)
* Outcome: Fully deployed, usable Wazuh + Pirogue tech safety lab

## Objectives

* Build and configure a working Wazuh SIEM instance
* Set up Pirogue/Pithon on bootable USB or Raspberry Pi
* Connect real devices, generate logs, detect fake threats
* Create a shared “first response” flow for tech concerns
* Boost confidence and collaboration through fun, not fear

## Pre-workshop checklist

| What                    | Notes                                                                 |
|-------------------------|-----------------------------------------------------------------------|
| USB sticks (at least 3) | Preloaded with setup.sh, config files, tools                          |
| A host laptop or server | For the Wazuh install – cloud VM, local mini server, or strong laptop |
| Internet access         | For setup and package downloads                                       |
| Projector               | For live walkthroughs and bragging rights                             |
| Cheat sheets            | Printed and laminated – “what to type”, “what not to touch”, etc.     |
| Stickers, badges        | Log Monster, Kernel Gremlin, Red Alert Raccoon… you get the idea      |
| Snacks & coffee         | You’re deploying a SIEM, not surviving boot camp                      |

## Stage 1: Choose your setup (a.k.a. Pick your beast)

*“Which one’s going to be the brain of our digital fortress?”*

### Options:

* Spin up a cloud-based Wazuh server (DigitalOcean, Hetzner, etc.)
* Install Wazuh on a spare shelter laptop or mini-PC
* Bring a Raspberry Pi 4 into the mix (if feeling fancy)

### Activities:

* Teams choose their host machine and give it a name (codename suggestions provided!)
* Run `setup.sh` and follow the install wizard
* Celebrate the moment Kibana opens successfully with a victory dance (or biscuit)

Tip: Every team gets a quick-start folder on USB with:

* A pre-written `setup.sh`
* Default firewall rules
* A team flag (literal, paper flag)

## Stage 2: Agents in the wild (a.k.a. Wazuh unleashed)

*“Let’s teach this thing to sniff out trouble.”*

### Goals:

* Connect 1–2 devices (Windows/macOS test laptops or VMs) to Wazuh
* Trigger logs and watch alerts in real-time

### Activities:

* Install the Wazuh agent on a test machine
* Simulate normal and “suspicious” behaviour: new user accounts, unknown app installs, weird USB use
* Use fake signatures to simulate stalkerware

Mini-challenge:

* Who can get the first “critical” alert on their dashboard?
* Optional: “Most ridiculous alert explanation” contest

Fun learning moments:

* “What is that log even saying?”
* “How to know when it’s just Windows being weird?”

## Stage 3: Plug, boot, scan (a.k.a. Pirogue & play)

*“Now we’re going fishing—for spyware.”*

### Goals:

* Prepare a Pirogue USB or Raspberry Pi
* Boot from it and run a scan on an Android test device or USB stick

### Activities:

* Each team flashes Pirogue to USB (or boots their Pi)
* Plug into test phones with USB-C or OTG adapters
* Generate a report: what’s normal, what’s odd?

Optional games:
* One phone has "mystery spyware" (actually just suspicious test apps)
* Can your team identify it without panicking?

Pro tips:
* Include a printed glossary of scary-sounding-but-harmless app names
* Encourage note-taking: “Weird but harmless”, “Def check this later”, etc.

## Stage 4: Log party (a.k.a. Show and tell & share)

*“Because if you build a fortress and don’t tell your friends, what’s the point?”*

### Activities:

* Each team presents their setup: codename, agents, anything they learned
* Open the floor for “coolest alert”, “weirdest log”, “biggest surprise”
* As a group, draft the Shelter Tech Triage Sheet:

  * “If someone says their phone is acting weird…”
  * “If we see an alert that looks serious…”
  * “If we’re not sure, we do this…”

Output:

* Printed cheat sheet (laminated is ideal)
* First response flow pinned to a wall
* Staff logins or single admin login set up
* USBs handed out for future use

Closing activity: Stickers, Log Monster naming ceremony, team photos with their server names

## Post-workshop leave-behinds

| What                       | Description                                   |
|----------------------------|-----------------------------------------------|
| Tech cheat sheet           | Step-by-step: Wazuh, Pirogue, triage          |
| USB kit                    | Tools, scripts, PDF guides                    |
| Triage checklist           | What to do when tech feels unsafe             |
| Working SIEM + triage tool | With local devices connected and logs flowing |
| Bragging rights            | Earned, not given                             |

---

## Optional follow-ups

* Monthly remote check-in: "What’s new in the logs?"
* Tech buddy system: pair staff with local volunteers or digital allies
* Invite legal support or DV specialists for future joint response planning

## Support and materials to put the event on
