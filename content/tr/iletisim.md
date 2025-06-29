---
title: "İletişim"
description: "PowerOn ekibiyle iletişime geçin."
type: "page"
layout: "contact"
translationKey: "contact"
menu:
  main:
    name: "İletişim"
    weight: 40
---
<div class="container" style="padding-top: 120px; max-width: 800px;">

<p>Bize ulaşmak mı istiyorsunuz? Bir atölye düzenliyor, destek arıyor ya da sadece merak ediyor olun – bize aşağıdan bir mesaj bırakın.</p>

<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/tesekkurler" netlify>
  <input type="hidden" name="form-name" value="contact" />
  <p class="d-none">
    <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
  </p>

  <div class="form-group">
    <label for="name">Adınız</label>
    <input class="form-control" type="text" name="name" id="name" required />
  </div>

  <div class="form-group">
    <label for="email">E-posta adresiniz</label>
    <input class="form-control" type="email" name="email" id="email" required />
  </div>

  <div class="form-group">
    <label for="message">Mesaj</label>
    <textarea class="form-control" name="message" id="message" rows="5" required></textarea>
  </div>

  <button class="btn btn-primary mt-3" type="submit">Mesajı gönder</button>
</form>
</div>
