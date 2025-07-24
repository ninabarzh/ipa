---
title: "Maliyet tahmini: Güvenli sığınma evi inşa maratonu"
weight: 3
translationKey: "cost-guesstimate-shelter"
_build:
  render: always
menu:
  sidebar:
    weight: 15
description: "Personelin kendi dijital güvenlik laboratuvarını (Wazuh + Pirogue) kurduğu pratik bir günlük atölye için detaylı maliyet tahmini."
---

## Özet tablolar

### Seçenek A: Yerel laboratuvar inşa maratonu

| **Kalem**                    | **Detaylar**                                 | **Tahmini Maliyet (€)** |
|------------------------------|----------------------------------------------|------------------------:|
| Kolaylaştırıcılar (2–3 kişi) | Dijital güvenlik & travma-bilinçli rehberlik |               800–1.200 |
| SIEM yığını                  | Sunucu donanımı, kurulum, ağ                 |               590–1.865 |
| PiRogue cihaz(lar)ı (ops.)   | Raspberry Pi tabanlı ağ monitörü             |                 200–400 |
| USB bellekler/depolama       | Kurulum anahtarları, yedekleme               |                      60 |
| Baskı materyalleri           | Rehberler, çıkartmalar, yönlendirme          |                      80 |
| İkram                        | Öğle yemeği, atıştırmalıklar                 |                 200–300 |
| Seyahat                      | Kolaylaştırıcılar ve ekipman için            |                 100–200 |
| Dekor                        | Aydınlatma, flamalar, rozetler               |                      50 |
| Kontenjan                    | Beklenmedik giderler                         |                     100 |
| **TOPLAM (yaklaşık)**        |                                              |     **2.180 – 4.155 €** |

[Yerel çözüm maliyet detayları](/docs/lab/costs.md).

PiRogue isteğe bağlı ama internetsiz taramalar için faydalı.

### Seçenek B: Bulut tabanlı inşa maratonu

*Uzaktan güvenli kayıt ve sürekli izleme içerir.*

| **Kalem**                | **Detaylar**                 | **Tahmini Maliyet (€)** |
|--------------------------|------------------------------|------------------------:|
| Kolaylaştırıcılar        | Yerel modelle aynı           |               800–1.200 |
| Bulut sunucusu & kurulum | Sertleştirme, VPN, kurulum   |             1.220–1.720 |
| Cihaz ajan kurulumu      | Android/iOS kayıt araçları   |             1.000–1.200 |
| PiRogue (ops.)           | Yerel kurulumla aynı         |                 200–400 |
| Otomatik yedekler        | Kurulum betikleri dahil      |                 144–264 |
| Yıllık bakım             | Tahmini zaman maliyeti       |             2.880–4.320 |
| Baskı materyalleri       | Rehberler, çıkartmalar       |                      80 |
| İkram                    | Öğle yemeği, atıştırmalıklar |                 200–300 |
| Seyahat                  | Kolaylaştırıcılar ve ekipman |                 100–200 |
| Dekor                    | Aydınlatma, flamalar         |                      50 |
| Kontenjan                | Her zaman gerekli            |                     100 |
| **TOPLAM (yaklaşık)**    |                              |     **6.774 – 9.034 €** |

[Bulut çözüm maliyet detayları](/docs/lab/costs-cloud.md).

Bulut becerili personel gerektirir. Tam gizlilik ve fiziksel kontrol isteyen sığınma evleri için Seçenek A daha iyi bir [seçimdir](/docs/lab/architectures.md).

## Elde edecekleriniz

* Çalışan SIEM laboratuvarı (Wazuh, Kibana)
* Kurulu PiRogue kiti tarama için
* Temel dijital adliye eğitimi almış personel
* Basılı rehberler ve kaynaklar
* Ekip çalışmasına dayalı keyifli bir gün

## Tasarruf önerileri

* Mevcut donanımı yeniden kullanın
* Yerel tech gruplarından bağışlanan Raspberry Pi isteyin
* Gönüllü veya dahili tech destekçilerinden yardım alın
* Diğer etkinliklerle ikram paylaşımı yapın
