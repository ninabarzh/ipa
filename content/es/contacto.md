---
title: "Contacto"
description: "Ponte en contacto con el equipo de PowerOn."
type: "page"
layout: "contact"
translationKey: "contact"
menu:
  main:
    name: "Contacto"
    weight: 40
---
<div class="container" style="padding-top: 120px; max-width: 800px;">

<p>¿Necesitas comunicarte con nosotros? Ya sea que estés organizando un taller, buscando soporte o simplemente tengas curiosidad, escríbenos un mensaje a continuación.</p>

<form name="contact-es" method="POST" data-netlify="true" netlify-honeypot="bot-field"  action="/es/gracias" netlify>
  <input type="hidden" name="form-name" value="contact-es" />
  <p class="d-none">
    <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
  </p>

  <div class="form-group">
    <label for="name">Tu nombre</label>
    <input class="form-control" type="text" name="name" id="name" required />
  </div>

  <div class="form-group">
    <label for="email">Tu correo electrónico</label>
    <input class="form-control" type="email" name="email" id="email" required />
  </div>

  <div class="form-group">
    <label for="message">Mensaje</label>
    <textarea class="form-control" name="message" id="message" rows="5" required></textarea>
  </div>

  <button class="btn btn-primary mt-3" type="submit">Enviar mensaje</button>
</form>
</div>
