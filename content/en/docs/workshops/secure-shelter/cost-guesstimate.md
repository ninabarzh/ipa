---
title: "Cost estimate secure the shelter build-a-thon"
weight: 3
translationKey: "cost-guesstimate-shelter"
_build:
  render: always
menu:
  sidebar:  # Adds to Docsy's auto-generated sidebar
    weight: 15
description: "A detailed cost guesstimate for running the Secure the shelter build-a-thon, a hands-on, full-day workshop where shelter staff set up their own working digital safety lab (Wazuh + Pirogue), with help from facilitators."
---

## Summary tables

### Option A: In-shelter lab build-a-thon (local, private setup)

| **Item**                     | **Details**                                        | **Estimated Cost (€)** |
|------------------------------|----------------------------------------------------|-----------------------:|
| Facilitators (2–3 people)    | Digital security & trauma-aware facilitation       |              800–1,200 |
| SIEM stack setup             | Includes server hardware, setup labour, networking |              590–1,865 |
| PiRogue device(s) (optional) | Raspberry Pi-based network monitor                 |                200–400 |
| USB drives / storage         | Setup keys, backup, export                         |                     60 |
| Printed materials & signage  | Setup guides, stickers, signage                    |                     80 |
| Catering                     | Lunch, snacks, drinks                              |                200–300 |
| Travel + transport           | For facilitators & equipment                       |                100–200 |
| Decor / fun                  | Lighting, bunting, badges                          |                     50 |
| Contingency                  | Just in case                                       |                    100 |
| **TOTAL (approx)**           |                                                    |     **€2,180 – 4,155** |

[Estimated costs in-shelter solution included](/docs/lab/costs.md).

PiRogue is optional but useful in both cases for scanning phones privately without needing internet access.

### Option B: Cloud-based lab build-a-thon

*Includes secure remote logging, mobile support, and ongoing monitoring.*

| **Item**                        | **Details**                             | **Estimated Cost (€)** |
|---------------------------------|-----------------------------------------|-----------------------:|
| Facilitators (2–3 people)       | Same as local model                     |              800–1,200 |
| Cloud server & setup            | Hardening, VPN, install, tuning         |            1,220–1,720 |
| Device agent setup              | Android/iOS log tooling, desktop agents |            1,000–1,200 |
| PiRogue device(s) (optional)    | As in local build                       |                200–400 |
| Secure backup automation        | Including setup scripts                 |                144–264 |
| Ongoing admin/maintenance (1yr) | Estimated time cost                     |            2,880–4,320 |
| Printed materials & signage     | Setup guides, stickers, signage         |                     80 |
| Catering                        | Lunch, snacks, drinks                   |                200–300 |
| Travel + transport              | For facilitators & equipment            |                100–200 |
| Decor / fun                     | Lighting, bunting, badges               |                     50 |
| Contingency                     | Always sensible                         |                    100 |
| **TOTAL (approx)**              |                                         |     **€6,774 – 9,034** |

[Estimated costs cloud solution included](/docs/lab/costs-cloud.md). 

This build-a-thon-in-a-day works only if you employ or hire cloud-skilled staff, which brings more cost. We do our best to 
prepare this solution in a repo, but cloud requires sufficient staff for participating in setting it up and 
maintaining it later. And if you are a shelter wanting full privacy, no internet reliance, and better physical control 
over the system, then option A is the better [choice](/docs/lab/architectures.md) anyway.

## What you get

* A functioning SIEM lab server (Wazuh, Kibana, log monitoring)
* Pirogue kit installed and tested for device check-ups
* Staff trained in basic digital forensics, threat detection, and safe use
* Printable guides and follow-up resources for use with survivors
* A lively, team-based, *build-it-together* day that doesn't feel like training

## Cost-saving ideas

* Reuse existing hardware (old laptop/server instead of new box)
* Ask for donated Pi hardware from local tech groups
* Use volunteer or in-house tech allies as co-facilitators
* Shared catering with other in-house events
