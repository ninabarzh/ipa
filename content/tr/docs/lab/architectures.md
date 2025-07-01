---
title: "Mimari Yapılar"
weight: 1
translationKey: "architectures"
_build:
  render: always
menu:
  sidebar:
    weight: 5
description: "Farklı kurumsal bağlamlara ve kaynak seviyelerine göre SIEM yığını dağıtımı için önerilen mimariler. Tümü adli veri toplama, tehdit tespiti ve olay müdahalesini desteklerken, mağdurların mahremiyetini ve yasal uyumu gözetir. Her biri sığınma evleri, savunucu ağları veya merkezi olmayan topluluk dağıtımlarına uyarlanabilir."
---

## Sığınma evi odaklı şirket içi dağıtım (Düşük teknoloji, hepsi bir arada)

En uygun: Güvenilir dahili ağa ve teknik destekçiye sahip sığınma evleri.

* BT ekibi olmayan küçük sığınma evleri için
* Çevrimdışı veya yarı bağlantılı çalışabilir
* İnternet riskliyse USB ile log aktarımı

Mimari: Tek-VM Yerel Dağıtım (Hepsi bir arada)

```text
+-------------------------+             +---------------------------+
|     Sığınma Evi Laptopu|             |    Opsiyonel PiRogue      |
|  (Ubuntu VM veya ana OS)|             |  (Saha Analiz Cihazı)     |
|-------------------------|             |---------------------------|
| - Wazuh Yöneticisi      |             | - PiRogue OS              |
| - Elasticsearch         |             | - Paket yakalama araçları |
| - Kibana                |             | - USB log aktarımı        |
| - setup.sh otomasyonu   |             +---------------------------+
+-------------------------+                       |
        |                                         |
        | Güvenli LAN / USB aktarım               |
        v                                         v
+--------------------------+            +----------------------------+
| Mağdur Cihaz Logları     |            |  Saha Cihazları (örn.     |
| (Windows/macOS/Android)  |            |  takip şüpheli telefon)    |
+--------------------------+            +----------------------------+
```

* Şirket içi fiziksel/sanal IPA-SIEM Sunucusu
  * Wazuh Yöneticisi, Elasticsearch ve Kibana çalıştırır
  * Otomatik komut dosyaları içerir (örn. `quarantine_device.sh`)
* Wazuh ajanları kurulu:
  * Windows/macOS cihazlar (doğrudan veya USB ile)
  * Android (rootlu cihazlarda Termux ile)
  * iOS (jailbreakli veya yedekler)
* Loglar için güvenli dahili ağ
* Opsiyonel PiRogue cihazı saha analizi için

Avantajlar: Veri şirket içinde; mahremiyet kontrolü; Dezavantajlar: Yerel teknik bakım gerektirir

## Özel bulut dağıtımı (Sığınma evi/NGO kontrollü)

En uygun: Çoklu konumdan erişim gerektiren kuruluşlar.

* Çoklu lokasyon için uzaktan erişim
* Güçlü VPN/şifreli yedekleme gerekir
* Düşük yerel risk ama yüksek opsec disiplini

Mimari: Güvenli Bulut SIEM (örn. Hetzner)

```text
+--------------------------------+
|     Şifreli Bulut VM           |
|--------------------------------|
| - Wazuh Yöneticisi             |
| - Elasticsearch                |
| - Kibana                       |
| - HTTPS erişim (VPN opsiyonel) |
+--------------------------------+
        |
        | Şifreli log aktarımı
        v
+--------------------------------+
|  Her Yerden Mağdur Cihazları   |
|  (Wazuh ajanı/ADB/iTunes ile)  |
+--------------------------------+
```

* Bulut VM (Hetzner vb.) üzerinde:
  * Wazuh + Elasticsearch + Kibana
  * Şifreli VPN erişimi
* Cihazlar güvenli tünel ile bağlanır (WireGuard)
* Loglar aktarımdan önce anonimleştirilir

Avantajlar: Merkezi görünürlük; Dezavantajlar: Bulut güvenlik bilgisi gerektirir

## Taşınabilir analiz laboratuvarı (Çevrimdışı öncelikli)

En uygun: Acil triaj, gezici destek ekipleri.

* İnternet gerektirmez
* Export sonrası veri silinebilir
* Kompakt kurulum

Mimari: Taşınabilir "Çanta" SIEM (Raspberry Pi veya laptop)

```text
+-----------------------------+
|   Taşınabilir Analiz Cihazı |
| (Linux laptop veya Pi 4)    |
|-----------------------------|
| - Wazuh Yöneticisi          |
| - Kibana (sadece yerel)     |
| - setup.sh taşınabilir mod  |
+-----------------------------+
        |
        | USB/Wi-Fi log aktarımı
        v
+-----------------------------+
|  Mağdur Cihazı (çevrimdışı) |
+-----------------------------+
```

* Sağlam laptop veya Pi tabanlı iş istasyonu:
  * Önceden yüklenmiş SIEM yazılımı
  * Veri sızıntısına karşı izole
* USB araçlarıyla veri toplama
* Raporlar şifreli depoda
* Sonradan manuel senkronizasyon

Avantajlar: İnternetsiz çalışır; Dezavantajlar: Depolama sınırlaması

## Merkezi olmayan destek birimleri

En uygun: Küçük kuruluş ağları.

* Çoklu sığınma evi anonim veri paylaşır
* Merkezi triaj desteği
* Teknik ortakla daha verimli

Mimari: Dağıtılmış Ortak Yapı

```text
+--------------------------+     +--------------------------+
|  Sığınma Evi A           |     |  Sığınma Evi B           |
|--------------------------|     |--------------------------|
| - Wazuh Ajanı/Toplayıcı  | --> | - Wazuh Ajanı/Toplayıcı  |
+--------------------------+     +--------------------------+
         \                           /
          \                         /
           v                       v
           +--------------------------+
           |  Merkezi SIEM Analist VM |
           |--------------------------|
           | - Wazuh Yöneticisi       |
           | - Elasticsearch + Kibana |
           +--------------------------+
```

* Hafif SIEM düğümleri (Raspberry Pi 5) ile:
  * Aynı anda 1-2 cihaz işleme
  * Önceden yüklenmiş kurallarla analiz
* Periyodik merkezi senkronizasyon

Avantajlar: Düşük maliyet, dayanıklı; Dezavantajlar: Merkezi görünürlük sınırlı

## Hibrit topluluk ağı

En uygun: Dönüşümlü personelli büyük ağlar.

* Eğitim veya hukuki klinikler için
* Taklit stalkerware izleri kullanabilir
* Tamamen izole sandbox ortamı

Mimari: Eğitim/Araştırma Ortamı

```text
+----------------------------+
|      Araştırma VM(leri)    |
|----------------------------|
| - Wazuh Yöneticisi         |
| - Enfekte VM görüntüleri   |
| - Log tekrarı özelliği     |
+----------------------------+
        |
        | Temizlenmiş delil exportu
        v
+----------------------------+
| Arşiv / Yasal Deliller     |
+----------------------------+
```

* Katmanlı sistem:
  * Koordinasyon için merkezi bulut SIEM
  * Önceden yapılandırılmış saha birimleri
  * Manuel yükleme için web arayüzü

Avantajlar: İki dünyanın da en iyisini birleştirir - merkezi güvenlik ile yerel eylem;  
Dezavantajlar: Katmanlar arasında iyi koordinasyon ve erişim kontrolleri gerektirir

## Tasarım Hususları

* **Veri Gizliliği**: Tüm düğümlerde tam disk şifreleme kullanın. Loglar açık onay alınmadıkça varsayılan olarak anonimleştirilmelidir.
* **Denetim Kayıtları**: Tüm adli eylemler, yasal geçerliliği desteklemek için değiştirilemez loglar oluşturmalıdır.
* **Güncellemeler**: Tespit doğruluğunu korumak için düzenli olarak komut dosyası tabanlı güncellemeler (Git veya USB senkronizasyonu ile) gönderilmelidir.
* **Tehdit İmzaları**: IPA gözetim modellerine özel paylaşılan, güncellenmiş kural paketleri (örn. "Hesap Makinesi+" zararlı yazılımı, SIM sahteciliği logları).

