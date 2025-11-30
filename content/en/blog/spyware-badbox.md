---
title: "BadBox and the hard truth about replacing devices"
date: 2025-07-28
author: PowerOn
translationKey: "badbox-effects"
tags: ["spyware", "supply-chain-security", "device-replacement", "secure-devices", "play-protect"]
description: "BadBox shows us that some devices are compromised before you ever turn them on. Here is what it means for replacing devices."
---

You throw away a dodgy old tablet, buy a shiny “new” Android phone, and breathe a sigh of relief. Problem solved.

Except it is not.

[Meet BadBox](https://www.humansecurity.com/learn/blog/satori-threat-intelligence-disruption-badbox-2-0/), the cheerful codename for a sprawling cyber‑espionage operation that bakes malware directly into 
Android devices *before they leave the factory*. These are not suspicious market‑stall specials. Many are sold 
through trusted online retailers and big‑name platforms. Thousands have arrived in Europe, usually as “budget” 
tablets, phones, or streaming boxes.

## Why BadBox is relevant to device replacement

The malware, politely known as **Guerrilla**, sits deep in the firmware,  below the level where most people (or 
antivirus software) can even see it. It can install apps silently, spy on users, serve targeted phishing, or rent 
your device out to someone else entirely. It is modular, so more capabilities can be added at any time.

BadBox is not a single piece of malware but an entire criminal ecosystem. It is run by several interlinked groups,  
including SalesTracker, MoYu, Lemon, and LongTV, who have carved up the work between them. Some run the 
command‑and‑control infrastructure, others develop the firmware‑level backdoor itself, while others monetise 
infected devices through ad fraud, residential proxy networks, and automated scams. What unites them is that the 
malware is baked in before the device reaches the user, meaning the compromise starts the moment you open the box.

So far, the primary driver has been money, not surveillance-for-hire. Most BadBox infections are exploited for click 
fraud, fake ad impressions, and selling anonymous network traffic to other actors. But the architecture is modular, 
and the groups involved have a proven habit of renting or selling capabilities. In other words: if someone wanted to 
adapt this platform for stalking, targeted spying, or data theft, they could, without having to reinvent the wheel.

That is why BadBox matters to device replacement. It is not that survivors are being directly targeted by these groups 
today; it is that the infrastructure and techniques are already in place, and the wrong buyer could weaponise them 
overnight. When your replacement phone, tablet, or TV box could already be acting as a bot, beacon, or data siphon 
before you even log in, “new” does not automatically mean “safe”.

A factory reset will not help. Antivirus will not help. And turning it off and on again will not banish the ghosts.

## What this means for survivors

For survivors of intimate partner abuse, this changes the safety playbook. In *PowerOn*, we say: *if in doubt, replace 
the device*. That is still true, but with a warning: **If the replacement comes from an untrusted source, it might be 
worse than the original.**

BadBox changes the assumptions:

- A sealed box is not proof of safety  
- Low cost is not a green light for sharing  
- A device that behaves normally today may betray you tomorrow

A BadBox‑infected device may sit quietly for weeks or months before it activates, updates, or starts working for someone who *really* wants your data.

Yes, they can be as cheap as €20. Yes, that is tempting. But privacy and autonomy are worth more.

### Practical steps for survivors

- Use devices from trusted, verifiable sources  
- If possible, choose models known to be clean (see table below)  
- Avoid logging into sensitive accounts on unknown or gifted devices  
- Keep high‑risk and low‑risk activity on separate devices if you have more than one

## Shelter response

Shelters face two linked challenges: preventing compromised devices from entering the environment, and detecting any that slip through.

### Prevention

- Track the origins of donated or purchased devices and check firmware versions  
- For shared use, consider Linux‑based laptops or refurbished Chromebooks flashed with Linux rather than bargain‑bin Androids  
- Have a secure onboarding station to check and prepare devices before use  

### BadBox intake checklist

**Purpose:** Ensure all incoming Android devices are screened for BadBox risk before entering shelter use.

**1. Record basic details**
- Device type (phone, tablet, TV box, projector, car unit, other)
- Brand and model number
- Serial number / IMEI
- Source (donation, purchase, other)
- Date received

**2. Initial visual and packaging check**
- Sealed retail packaging? Yes / No  
- Signs of tampering? Yes / No  
- Unusual or generic branding? Yes / No  

**3. Risk category**
- Known clean model? (Check shelter’s internal safe list) Yes / No  
- Known risky/off‑brand model? Yes / No  
- Unknown? (Treat as high risk)  

**4. Firmware and Play Protect check**
- Power on and skip account setup  
- Check Play Protect certification (Settings → About → Google Play system update or Play Store → Settings)  
- Note firmware version  
- Compare to safe list

**5. Network behaviour test**
- Connect to isolated onboarding Wi‑Fi (not production network)  
- Monitor with PiRogue, Zeek, or Suricata for 15–30 minutes  
- Look for unusual outbound connections or DNS queries

**6. Decision**
- **Pass** → Add to inventory with safe tag  
- **Fail** → Quarantine or recycle responsibly  
- **Uncertain** → Keep offline, escalate to tech support

*(Keep signed copies for each device. Store results in shelter device log.)*

### Detection

BadBox can be detected in part, but not at the firmware level, and only if it is already active on the network or operating system.

With a [SIEM stack (Wazuh + Zeek + Suricata + Sysmon + optional PiRogue)](docs/lab/on-prem/), detection is possible through:

- Network‑level indicators such as connections to command‑and‑control servers, shady domains, or malware delivery points  
- Suricata alerts for known BadBox infrastructure  
- Zeek logs showing repeated beaconing patterns or suspicious DNS queries

Note that command‑and‑control infrastructure changes often. Detection depends on keeping threat intelligence feeds updated.

## When to replace, and how

Replace when:

- A device is clearly compromised  
- Stalkerware cannot be removed  
- The person using it no longer feels safe  
- Continuing to use it carries legal risk

Replacement is safe only if the replacement itself can be trusted.

Source devices through:

- Known retailers with good return policies  
- Certified refurbishers who reset at the firmware level  
- Organisations that pre‑install privacy‑respecting operating systems  

Or, if budget allows, choose new phones from major brands with locked bootloaders and no known BadBox cases.

| Device type                                              | BadBox risk        | Notes                                            |
|----------------------------------------------------------|--------------------|--------------------------------------------------|
| Pixel phones (Play Protect certified)                    | ✅ Low              | No known BadBox cases in research                |
| Flagship Android phones from Samsung, OnePlus, etc.      | ✅ Low to moderate  | Must be Play Protect certified                   |
| Off‑brand Android phones or “refurbished” generic models | ❌ High             | Many confirmed infected                          |
| Android TV boxes, tablets, projectors, car units         | ❌ Very high        | Multiple models compromised at firmware level    |
| iPhones / Apple devices                                  | ✅ N/A              | Different ecosystem entirely                     |

## Final thoughts

BadBox is not just a supply‑chain flaw. It is a reminder that trusting the packaging is not enough. Attackers think ahead; so must we.

Replacing a device is still a key step in regaining control. Now we just know that some boxes arrive pre‑lost.

