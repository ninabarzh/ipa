---
title: "Güvenli sığınak inşa maratonu"
linkTitle: "Güvenli sığınak inşa maratonu"
weight: 2
_build:
  render: always
description: "Sığınak personeli için neşeli, teknoloji dostu, pratik bir etkinlik. Vaaz yok, karamsarlık yok—sadece takım çalışması, cihazlar ve baş edilen sorunlara saygı."
menu:
  sidebar:
    weight: 10
    identifier: "tr-secure-shelter"
    parent: "tr-docs"
translationKey: "secure-shelter"
---

## Genel bakış

* İsim: Secure the Shelter  
* Tür: Uygulamalı laboratuvar kurulum atölyesi  
* Hedef kitle: Sığınak çalışanları, dijital gönüllüler ve USB takacak kadar meraklı herkes  
* Süre: Bir tam gün (6–8 saat) veya iki yarım gün (tavsiye edilen)  
* Sonuç: Tam fonksiyonel Wazuh + Pirogue güvenlik laboratuvarı  

## Amaçlar

* Çalışan bir Wazuh SIEM örneği kurmak  
* Pirogue/Pithon'u bootable USB veya Raspberry Pi'ye kurmak  
* Gerçek cihazları bağlamak, log üretmek, sahte tehditleri tespit etmek  
* Teknik sorunlar için ortak "ilk müdahale" akışı oluşturmak  
* Korku yerine eğlenceyle güven ve işbirliği sağlamak  

## Ön hazırlık listesi

| Malzeme                | Notlar                                                                 |
|------------------------|------------------------------------------------------------------------|
| USB bellek (en az 3)   | Önceden setup.sh, config dosyaları ve araçlarla yüklü                  |
| Ana bilgisayar/sunucu  | Wazuh kurulumu için – cloud VM, mini sunucu veya güçlü laptop          |
| İnternet erişimi       | Kurulum ve paket indirmeleri için                                      |
| Projeksiyon            | Canlı gösterimler için                                                 |
| Kılavuzlar             | Lamine edilmiş – "ne yazılacak", "dokunulmayacak şeyler" vb.           |
| Stickerlar, rozetler   | Log Canavarı, Çekirdek Cini, Alarm Rakunu... anladınız siz             |
| Atıştırmalık & kahve   | Bir SIEM kuruyorsunuz, asker eğitimi değil                             |

## Aşama 1: Kurulum seçimi (a.k.a Canavarı seç)

*"Dijital kalemizin beyni ne olacak?"*

### Seçenekler:

* Bulut tabanlı Wazuh sunucusu (DigitalOcean, Hetzner vb.)  
* Sığınaktaki yedek laptop veya mini-PC'ye Wazuh kurmak  
* Raspberry Pi 4 kullanmak (cesaret ister)  

### Aktiviteler:

* Takımlar ana makineyi seçip isim verir (kod adı önerileri var!)  
* `setup.sh` çalıştırıp kurulum sihirbazını takip etmek  
* Kibana açıldığında kutlama yapmak (zafer dansı veya kurabiye)  

İpucu: Her takım USB'de hızlı başlangıç klasörü alır:  

* Hazır `setup.sh`  
* Varsayılan güvenlik duvarı kuralları  
* Takım bayrağı (gerçek kağıt bayrak)  

## Aşama 2: Ajanlar sahada (a.k.a Wazuh serbest)

*"Bu şeye belayı koklamayı öğretelim."*

### Hedefler:

* 1–2 cihazı (Windows/macOS test laptop veya VM) bağlamak  
* Log tetikleyip gerçek zamanlı uyarıları izlemek  

### Aktiviteler:

* Test makinesine Wazuh ajanı kurmak  
* Normal ve "şüpheli" davranış simüle etmek: yeni kullanıcılar, bilinmeyen uygulamalar, tuhaf USB kullanımı  
* Sahte imzalarla stalkerware simülasyonu  

Mini meydan okuma:  

* İlk "kritik" uyarıyı kim alacak?  
* Opsiyonel: "En saçma uyarı açıklaması" yarışması  

Öğrenme anları:  

* "Bu log ne diyor?"  
* "Windows'un tuhaf davrandığını nasıl anlarız?"  

## Aşama 3: Tak, başlat, tara (a.k.a Pirogue & oyna)

*"Şimdi casus yazılım avına çıkıyoruz."*

### Amaçlar:

* Pirogue USB veya Raspberry Pi hazırlamak  
* Android test cihazı veya USB'yi taramak  

### Aktiviteler:

* Her takım Pirogue'yu USB'ye yazar (veya Pi'yi başlatır)  
* USB-C/OTG adaptörlerle test telefonlarına bağlanmak  
* Rapor oluşturmak: normal olan ne, tuhaf olan ne?  

Oyun seçeneği:  
* Bir telefonda "gizemli casus yazılım" var (aslında test uygulamaları)  
* Takımınız panik yapmadan tespit edebilecek mi?  

Uzman ipuçları:  
* Korkutucu ama zararsız uygulama isimleri sözlüğü ekleyin  
* Not almayı teşvik edin: "Tuhaf ama güvenli", "Sonra kontrol et", vb.  

## Aşama 4: Log partisi (a.k.a Göster ve anlat)

*"Bir kale inşa edip kimseye söylemezsen, ne anlamı var?"*

### Aktiviteler:

* Her takım kurulumunu sunar: kod adı, ajanlar, öğrenilenler  
* "En havalı uyarı", "en tuhaf log", "en büyük sürpriz" paylaşımı  
* Birlikte Sığınak Teknik Triaj Çizelgesi oluşturmak:  

  * "Biri telefonunun tuhaf davrandığını söylerse..."  
  * "Ciddi görünen bir uyarı görürsek..."  
  * "Emin değilsek şunu yaparız..."  

Çıktılar:  

* Basılı kılavuz (lamineli ideal)  
* İlk müdahale akışı duvara asılır  
* Giriş bilgileri ayarlanır  
* Gelecekte kullanım için USB'ler dağıtılır  

Kapanış: Stickerlar, Log Canavarı isim töreni, takım fotoğrafları  

## Etkinlik sonrası materyaller

| Malzeme                    | Açıklama                                         |
|----------------------------|--------------------------------------------------|
| Teknik kılavuz             | Adım adım: Wazuh, Pirogue, triaj                 |
| USB seti                   | Araçlar, scriptler, PDF rehberler                |
| Triaj kontrol listesi      | Teknoloji güvensiz hissettirdiğinde yapılacaklar |
| Çalışan SIEM + triaj aracı | Bağlı cihazlar ve aktif loglarla                 |
| Övünme hakkı               | Hak edilmiş, verilmemiş                          |

---

## Opsiyonel takip etkinlikleri

* Aylık uzaktan kontrol: "Loglarda neler yeni?"  
* Teknoloji eşleştirme: personel ve gönüllüleri eşleştirin  
* Hukuki destek veya uzmanları ortak planlama için davet edin  

## Etkinlik desteği ve materyaller
