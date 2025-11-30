---
title: "Contact"
description: "Get in touch with the PowerOn team."
type: "page"
layout: "contact"
translationKey: "contact"
menu:
  main:
    name: "Contact"
    weight: 40
---
<div class="container" style="padding-top: 120px; max-width: 800px;">

<p>Need to reach us? Whether you’re organising a workshop, seeking support, or just curious, drop us a line below.</p>

<form name="contact-en" method="POST" data-netlify="true" netlify-honeypot="bot-field"  action="/en/thank-you" netlify>
  <input type="hidden" name="form-name" value="contact-en" />
  <p class="d-none">
    <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
  </p>

  <div class="form-group">
    <label for="name">Your name</label>
    <input class="form-control" type="text" name="name" id="name" required />
  </div>

  <div class="form-group">
    <label for="email">Your email</label>
    <input class="form-control" type="email" name="email" id="email" required />
  </div>

  <div class="form-group">
    <label for="message">Message</label>
    <textarea class="form-control" name="message" id="message" rows="5" required></textarea>
  </div>

  <button class="btn btn-primary mt-3" type="submit">Send message</button>
</form>
</div>
