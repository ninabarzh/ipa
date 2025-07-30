---
title: "Takip yazılımlarını tespit etmek için PiRogue toolkit kurulum rehberi"
weight: 3
translationKey: "pts"
_build:
  render: always
menu:
  sidebar:
    weight: 15
    identifier: "tr-pts"
    parent: "tr-lab"
description: "Bu adım adım rehber, teknik geçmişi olmayan sığınma evi çalışanları için tasarlanmıştır. Tacizciler tarafından kullanılan gizli takip yazılımlarını kontrol edebilen basit bir cihaz kurmanıza yardımcı olacaktır."
---

## İhtiyacınız olanlar

Başlamadan önce şu malzemeleri temin edin (çoğu elektronik mağazasında bulunur):

1. [Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) (2GB RAM yeterli)  
2. Orijinal güç kaynağı (micro-USB)  
3. 32GB micro SD kart (Class 10 hız)  
4. Ethernet kablosu (basit bir model yeterli)  
5. HDMI girişli yedek bir monitör/TV (ilk kurulum için)  

*Bütçe notu: WESNET gibi bazı yardım kuruluşları indirimli kitler sağlıyor – yerel şiddet destek ağlarınıza danışın.*

## Adım 1: PiRogue yazılımının hazırlanması  

### Sistemin indirilmesi  

1. Herhangi bir bilgisayarda [PiRogue'un resmi sitesine](https://pts-project.org) gidin  
2. "İndir" butonuna tıklayıp Raspberry Pi 4 için en son sürümü seçin   
3. Dosyayı kaydedin (`.img.xz` uzantılı olacak) – bu, tüm işletim sistemini içerir  

### SD karta yazma

1. **Balena Etcher**'ı (ücretsiz yazılım) [etcher.io](https://www.balena.io/etcher/) adresinden indirin  
2. Micro SD kartınızı bilgisayara takın (gerekiyorsa adaptör kullanın)  
3. Etcher'ı açın, indirdiğiniz PiRogue görüntüsünü seçin, SD kartınızı seçip "Yaz!" butonuna basın  
4. "Yazma Tamamlandı" yazısını görene kadar bekleyin (yaklaşık 10 dakika)

## Adım 2: Donanım kurulumu  

1. **SD kartı** Raspberry Pi'nin altındaki yuvasına yerleştirin  
2. **Ethernet kablosunu** Pi'den sığınma evinin router'ına bağlayın  
3. **HDMI'ı** monitör/TV'ye bağlayın  
4. **Güç kaynağını en son takın** – Pi otomatik olarak açılacaktır  

*İlk açılış ipucu:* Sistemin açılması 5 dakika sürebilir. İlk başta renkli bir ekran normaldir.

## Adım 3: Başlangıç ayarları  

1. İstenirse şu bilgilerle giriş yapın:  
   - Kullanıcı adı: `pi`  
   - Şifre: `raspberry` (sonradan değiştireceksiniz)  

2. Ekrandaki talimatları izleyerek:  
   - Yeni güvenli bir şifre belirleyin (güvenli bir yere not alın)  
   - Saat diliminizi onaylayın (loglar için önemli)  
   - Süper kullanıcı olmayanların trafik yakalamasına izin verin ("Y" yazıp Enter'a basın)   

3. Sistem kendini güncelleyecektir – yeniden başlayana kadar bekleyin (yaklaşık 15 dakika)

## Adım 4: Kontrol edilecek cihazların bağlanması  

### Telefonlar için

1. PiRogue ekranında WiFi ağ adını (örn. "PiRogue-123") ve şifresini not alın  
2. Mağdurun telefonunda:  
   - WiFi ayarlarına gidin  
   - PiRogue ağına bağlanın ("internet yok" uyarılarını görmezden gelin)  
   - Telefonu 5 dakika normal kullanın – PiRogue arka planda trafiği analiz edecektir   

### Bilgisayarlar için

1. Bilgisayarı PiRogue'a Ethernet kablosuyla bağlayın  
2. Herhangi bir tarayıcıda şu adrese gidin: `https://pirogue.local/dashboard`  
   - Kullanıcı adı: `admin`  
   - Şifre: Otomatik oluşturulan şifre için PiRogue ekranına bakın

## Adım 5: Sonuçların okunması  

Gösterge panelinde basit renk kodları görünür:

- **Yeşil:** Takip yazılımı tespit edilmedi  
- **Sarı:** Şüpheli aktivite (örn. bilinmeyen konum takibi)  
- **Kırmızı:** Onaylanmış takip yazılımı (örn. Cerberus, FlexiSpy)   

*Kırmızı görünürse ne yapmalı:*

1. Gösterilen kötü amaçlı yazılım adını not alın  
2. Hemen cihazın bağlantısını kesin  
3. Yerel teknoloji güvenliği ortağınıza başvurun ([stopstalkerware.org](https://stopstalkerware.org/resources/#find-support) listesinden)

## Güvenlik ve bakım  

1. **Her kullanımdan sonra:**  
   - PiRogue'u doğru şekilde kapatın (ekranda `sudo shutdown now` yazın)  
   - SD kartı silin, örneğin Windows'ta DiskGenius kullanarak: SD kartı biçimlendirmek sadece dosya referanslarını siler – veriler PhotoRec 7 gibi araçlarla kurtarılabilir. Silme işlemi verilerin üzerine yazarak kurtarılmasını engeller. Bu şunlar için kritiktir:
      - Takip yazılımı veya kötü amaçlı yazılım izlerini kaldırmak.
      - Kartlar yeniden kullanılırsa mağdurun mahremiyetini korumak.
      - PiRogue'un adli araçları için temiz kurulum sağlamak.
   - Silme sonrası kartı doğrulayın: Yeniden takın → "Boş" olarak göründüğünü kontrol edin.

2. **Aylık kontroller:**  
   - SD karta PiRogue'un en son sürümünü yeniden yazın (güncellemeler yeni takip yazılımı kuralları içerir)   

3. **Hassas vakalar için:**  
   - Mağdurların yaşam alanlarından ayrı bir odada kullanın  
   - Bulguları yasal delil için belgeleyin (gösterge panelinin ekran görüntülerini alın)

## Yardım almak  

- PiRogue'un **Discord sunucusuna** katılın (https://discord.gg/pts-project) anlık destek için  
- AB Teknoloji Güvenliği Destek Hattı: https://www.accessnow.org/help/ *(çok dilli 7/24 destek)*
- İngiltere'deki sığınma evleri **Women's Aid** teknoloji güvenliği kliniğini arayabilir (+44 0808 802 0300)   
- Acil tehlikede her zaman dijital kontrollerden önce fiziksel güvenliği önceliklendirin

## Notlar

Bu kurulum bir saatten az sürer ve 80 €'dan daha az maliyetlidir. Mağdurların dijital güvenliğini geri kazanmalarına yardımcı olmanın güçlü bir yoludur.

Bu araç profesyonel adli analizin yerine geçmez, ancak mağdurlar cihazlarını sığınma evinize getirdiğinde iyi bir ilk kontroldür. Tüm kurulum yaklaşık 45 dakika sürer ve 70 €'dan az maliyetlidir – birinin dijital mahremiyetini geri kazanmasına yardım etmek için küçük bir bedel.
