---
title: "Kontakt"
description: "Kontaktieren Sie das PowerOn-Team."
type: "page"
layout: "contact"
translationKey: "contact"
menu:
  main:
    name: "Kontakt"
    weight: 40
---

<div class="container" style="padding-top: 120px; max-width: 800px;">

<p>Sie möchten uns erreichen? Egal, ob Sie einen Workshop organisieren, Unterstützung benötigen oder einfach nur neugierig sind – schreiben Sie uns einfach eine Nachricht unten.</p>

<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field"  action="/danke" netlify>
  <input type="hidden" name="form-name" value="contact" />
  <p class="d-none">
    <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
  </p>

  <div class="form-group">
    <label for="name">Dein Name</label>
    <input class="form-control" type="text" name="name" id="name" required />
  </div>

  <div class="form-group">
    <label for="email">Deine E-Mail</label>
    <input class="form-control" type="email" name="email" id="email" required />
  </div>

  <div class="form-group">
    <label for="message">Nachricht</label>
    <textarea class="form-control" name="message" id="message" rows="5" required></textarea>
  </div>

  <button class="btn btn-primary mt-3" type="submit">Nachricht senden</button>
</form>
</div>