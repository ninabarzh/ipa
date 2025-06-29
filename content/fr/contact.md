---
title: "Contact"
description: "Contactez l’équipe PowerOn."
type: "page"
layout: "contact"
translationKey: "contact"
menu:
  main:
    name: "Contact"
    weight: 40
---
<div class="container" style="padding-top: 120px; max-width: 800px;">

<p>Vous souhaitez nous contacter ? Que vous organisiez un atelier, ayez besoin d’aide où soyez simplement curieux, envoyez-nous un message ci-dessous.</p>

<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/fr/merci" netlify>
  <input type="hidden" name="form-name" value="contact" />
  <p class="d-none">
    <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
  </p>

  <div class="form-group">
    <label for="name">Votre nom</label>
    <input class="form-control" type="text" name="name" id="name" required />
  </div>

  <div class="form-group">
    <label for="email">Votre email</label>
    <input class="form-control" type="email" name="email" id="email" required />
  </div>

  <div class="form-group">
    <label for="message">Message</label>
    <textarea class="form-control" name="message" id="message" rows="5" required></textarea>
  </div>

  <button class="btn btn-primary mt-3" type="submit">Envoyer le message</button>
</form>
</div>
