---
title: "Technical countermeasures"
weight: 5
translationKey: "counter"
_build:
  render: always
menu:
  sidebar:  # Adds to Docsy's auto-generated sidebar
    weight: 25
description: "Practical ways to lock things down without tipping anyone off."
---

Sometimes you *can’t* out-tech your way out of abuse. But smart digital hygiene and quiet interventions can tip the balance back in your favour.

This guide is for anyone ready to start locking things down—without flashing red lights or provoking suspicion. You don’t have to do it all. Just start with what feels possible.

## Device audits (without tripping alarms)

Surveillance tools often live on phones or laptops. They can hide as system apps, parental controls, or remote admin tools.

What to do:

- Check device settings for:
  - Unfamiliar apps with high permissions  
  - Admin access, VPNs, profiles (especially on iPhones: *Settings > General > VPN & Device Management*)  
  - Unexpected battery drain or high data use

- Safe audit tips:
  - Use a second device (friend’s phone, public computer) to *research suspicious apps*  
  - Keep logs and screenshots *offline or off-device*  
  - Don’t uninstall anything yet—some spyware triggers alerts when removed

Need a clean start? See below: [Clean-slate strategies →](#clean-slate-strategies-when-to-start-again)

## Account hardening (without setting off panic)

Most digital control flows through account access: email, cloud, banking, messaging.

Key countermeasures:

- Change passwords only on a clean device  
  (If your phone might be monitored, use a library computer or new SIM-only phone.)

- Set up 2FA  
  - Use an *authenticator app* (not SMS) like Aegis, Google Authenticator, or Authy  
  - Store backup codes *offline*

- Update recovery details:  
  - Remove old email addresses and phone numbers  
  - Use an alias address (e.g. name+secure@proton.me) for sensitive sites

- Check app connections and access logs:  
  - Google: [Security Checkup](https://myaccount.google.com/security-checkup)  
  - Apple: [Manage Devices](https://support.apple.com/en-gb/HT204074)  
  - Revoke anything you don’t recognise

## Locking down cloud syncing and backups
 
Shared clouds = shared eyes. Even “deleted” files or photos may still sync.

What to do:

- Check if cloud is syncing: Google Drive, iCloud, Dropbox, OneDrive—go into settings and look at *linked devices* and *shared folders*
- Turn off auto-upload: Camera roll, WhatsApp backups, Notes apps often sync silently
- Revoke access from other devices: If unsure, change password *first*—then sign out sessions remotely
- Shared calendars and albums: These are frequently used to track routines. Remove collaborators quietly.

## Tracking trackers: AirTags, Google activity, rogue apps

If someone knows where you’ve been, you may be leaking your location—even if you think you’ve turned it off.

Check for trackers:

- AirTags and Bluetooth trackers:  
  - iPhone: built-in alerts  
  - Android: use [Tracker Detect](https://play.google.com/store/apps/details?id=com.apple.trackerdetect)  
  - Look for them in bags, cars, jackets, pet collars

- Google activity:
  - https://myactivity.google.com → see searches, voice commands, maps activity  
  - Pause location history and voice/audio saving

- App permissions:
  - Review every app with location, mic, camera, or background data access  
  - On Android: Settings > Privacy > Permission Manager  
  - On iPhone: Settings > Privacy > Location Services

- Rogue apps:  
  Apps like “System Services”, “Device Monitor”, or “WiFi Debugger” may be spyware in disguise  
  If you don’t know what it is, assume caution, and investigate using a safe device

## Clean-slate strategies: when to start again

Sometimes it’s too messy to clean up safely. A fresh digital life may be the most secure option.

Clean start checklist:

1. New device: Ideally second-hand, bought with cash or from a safe contact

2. New accounts:  
   - Use a new email with no links to old usernames  
   - Don’t sync contacts or restore backups yet

3. Minimal app install:  
   - Start with basics: messaging, banking, 2FA, secure storage  
   - Only install from official stores

4. New phone number (if possible):  
   - Use for verification only—don’t share widely  
   - Keep your old number for appearances if needed

5. Avoid linking to compromised devices/accounts: Don’t sign into old Google/Apple accounts just to “check something”

This is a big step. It’s not always possible. But when it is, it can be liberating.

## A word on this section

Technical fixes are tools—not salvation. They work best when paired with support, boundaries, and emotional safety.  
You don’t have to become an IT expert. Just aim for clarity, calm, and control.

Next up: [What to check first →](/docs/take-back-power/what) or [Who to talk to (and when) →](/docs/take-back-power/who)
