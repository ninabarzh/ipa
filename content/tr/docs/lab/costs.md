---
title: "Barınak tabanlı güvenlik sistemi için maliyet tahmini"
weight: 5
translationKey: "on-prem-costs"
_build:
  render: always
menu:
  sidebar:
    weight: 25
description: "Bir zarfın arkasına karalanmış."
---

## Barınak sunucusu (Ubuntu 22.04)

* Yenilenmiş masaüstü veya mini PC

  * Özellikler: ≥8 GB RAM, 4+ CPU çekirdeği, 100+ GB SSD  
  * Maliyet: €350–€585

* İsteğe bağlı yükseltmeler:

  * RAM (toplam 16 GB): +€60  
  * SSD (500 GB): +€70

Donanım ara toplamı: €350–€585 (yükseltmeler için +€130)

## Ağ ve depolama

* Yönetilmeyen anahtar (8 portlu): €35  
* Kablolama ve Wi‑Fi erişim noktası: €25  
* USB HDD (1 TB): €60

Ağ ara toplamı: €120

## İsteğe bağlı PiRogue tarayıcı (Raspberry Pi)

* Raspberry Pi 4 (4 GB set): €95  
* Wi‑Fi USB adaptörü / ekler: €25

PiRogue ara toplamı: €120

## Yazılım ve araçlar (ücretsiz)

* Ubuntu, Wazuh, Elasticsearch, Termux, adb, OpenSSH, idevice araçları — €0

## Emek ve kurulum

* Ücretli personel kullanılıyorsa (~€45/saat): Kurulum & test (12 saat): €540  
* Gönüllü temelli ise: €0

### Bakım ve pay bırakma

* Yıllık donanım/yazılım payı: €120  
* Yıllık personel süresi (~10 saat): €450  
* Beklenmeyen durum (10%): ~€65–€160

## 1. yıl özeti

| Kategori               | Düşük (Gönüllü) | Yüksek (Ücretli + Ekstra) |
|------------------------|-----------------|--------------------------:|
| Sunucu donanımı        | €350            |                      €715 |
| Ağ ve depolama         | €120            |                      €120 |
| PiRogue (isteğe bağlı) | €0              |                      €330 |
| Yazılım                | €0              |                        €0 |
| Kurulum işçiliği       | €0              |                      €540 |
| Bakım ve pay           | €120            |                      €160 |
| **Toplam (yaklaşık)**  | **€590**        |                **€1.865** |

## 2. yıl ve sonrası tahmini yıllık giderler

| Kalem                 | Yıllık maliyet |
|-----------------------|---------------:|
| Donanım payı          |           €120 |
| Ücretli destek süresi |           €450 |
| **Yıllık toplam**     |       **€570** |

## Notlar

* Minimum maliyet (~€590), gönüllü emeği ve bağışlanmış ekipman varsayar.  
* Tam özellikli maliyet (~€1.655), yükseltmeleri, PiRogue'u ve personel süresini içerir.  
* İnternet erişimi, fiziksel kilitler ve elektrik maliyetleri dahil değildir.  
* Birden fazla konum kuruyorsanız, merkezi SIEM gibi ortak hizmetler, site başına maliyeti önemli ölçüde azaltabilir.
