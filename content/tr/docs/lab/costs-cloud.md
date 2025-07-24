---
title: "Bulut tabanlı güvenlik sistemi maliyet tahmini"
weight: 7
translationKey: "cloud-costs"
_build:
  render: always
menu:
  sidebar:
    weight: 35
description: "Kendi altyapınızı çalıştırmak gerçek maliyetler getirir—özellikle zaman ve uzmanlık açısından."
---

## Özel bulut sunucusu

Avrupa merkezli bir sağlayıcıdan orta seviye VPS (örn. Hetzner, Netcup, 1984 Hosting).

* **Özellikler**: 4 vCPU, 8–16 GB RAM, 100 GB SSD, Ubuntu 22.04
* Aylık maliyet: **15–30 €**
* Yıllık: **~300 €**

*En az 8 GB RAM şart. SIEM yazılımları hafif değildir.*

## Temel güvenlik

* Fail2ban, UFW, otomatik güncellemeler = ücretsiz
* Kurulum zamanı: 4 saat × 60 €/saat = **240 €**

## SIEM kurulumu (Wazuh)

* Wazuh Manager, API, Elasticsearch, Kibana
* Yazılım: **0 €** (açık kaynak)
* İlk ayarlar: 1–2 gün uzman = **500–1.000 €**

*Gönüllü teknik personel mümkün—ama yedek bütçe ayırın.*

## VPN (WireGuard/OpenVPN)

* Yazılım: ücretsiz
* Kurulum: 3 saat = **180 €**
* Bakım: anahtar rotasyonu, destek

## Agent kurulumu

* Windows/macOS (10–20 cihaz):
  Cihaz başı 30 dk → 10 saat = **600 €**

* Android/iOS log toplama:
  Manuel veya otomatik
  Maliyet: **400–600 €**

## Opsiyonel: PiRogue kiti

* Donanım: ~150 € + kargo
* Kurulum: 3 saat = **180 €**

## Yedekleme & şifreleme

* Sunucu SSD'sini kullanın
* Ek depolama: 2 €/ay → **24 €/yıl**
* Şifreleme araçları: ücretsiz
* Otomasyon: 2–4 saat = **120–240 €**

## Sürekli bakım

* Anahtar rotasyonu, log yönetimi, uyarılar
* Aylık: 4–6 saat × 60 € = **240–360 €/ay**
* Yıllık: **2.880–4.320 €**

## Beklenmedik & eğitim

* Beklenmedik giderler: **500 €**
* İç eğitimler: **300 €**

## Toplam maliyet (1. Yıl)

| Kalem                  | Tahmini Maliyet (€) |
|------------------------|--------------------:|
| Özel bulut sunucusu    |                €300 |
| Temel güvenlik         |                €240 |
| SIEM kurulumu          |         €500–€1.000 |
| VPN                    |                €180 |
| Agentler (10–20 cihaz) |                €600 |
| Mobil log toplama      |           €400–€600 |
| PiRogue (opsiyonel)    |                €330 |
| Yedeklemeler           |           €144–€264 |
| Bakım                  |       €2.880–€4.320 |
| Eğitim & beklenmedik   |                €800 |
| **Toplam (1. Yıl)**    |   **€6.374–€8.634** |

## Sonraki yıllar

* Sunucu: 300 €/yıl
* Bakım: 3.000–4.000 €
* Arıza giderme

**Yıllık tahmin: ~3.500–4.500 €**

## Bütçe notları

* Maliyet cihaz sayısına göre değişir
* Gönüllüler maliyeti düşürür ama koordinasyon gerekir
* Hibe başvurularında personel zamanını unutmayın
* Sistem VPN ile kurumlar arası paylaşılabilir