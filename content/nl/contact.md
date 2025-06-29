---
title: "Contact"
description: "Neem contact op met het PowerOn-team."
type: "page"
layout: "contact"
translationKey: "contact"
menu:
  main:
    name: "Contact"
    weight: 40
---
<div class="container" style="padding-top: 120px; max-width: 800px;">

<p>Wil je ons bereiken? Of je nu een workshop organiseert, ondersteuning nodig hebt of gewoon nieuwsgierig bent – stuur ons gerust een bericht hieronder.</p>

<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/nl/bedankt" netlify>
  <input type="hidden" name="form-name" value="contact" />
  <p class="d-none">
    <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
  </p>

  <div class="form-group">
    <label for="name">Je naam</label>
    <input class="form-control" type="text" name="name" id="name" required />
  </div>

  <div class="form-group">
    <label for="email">Je e-mail</label>
    <input class="form-control" type="email" name="email" id="email" required />
  </div>

  <div class="form-group">
    <label for="message">Bericht</label>
    <textarea class="form-control" name="message" id="message" rows="5" required></textarea>
  </div>

  <button class="btn btn-primary mt-3" type="submit">Bericht versturen</button>
</form>
</div>
