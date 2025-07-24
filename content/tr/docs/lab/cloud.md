---
title: "Özel bulut güvenlik sistemi nasıl kurulur"
weight: 6
translationKey: "cloud"
_build:
  render: always
menu:
  sidebar:
    weight: 30
description: "Bu rehber, SIEM yığını özel bir bulutta nasıl konuşlandıracağınızı adım adım anlatır—birden fazla konumda faaliyet gösteren sığınaklar veya savunuculuk kuruluşları için idealdir. Uzaktan erişim, merkezi izleme ve aynı gözetim tespit araçlarını elde edeceksiniz—büyük teknoloji şirketlerine veri kontrolünü kaptırmadan."
---

Bulut sunucunuza temel yönetici erişiminiz olduğunu veya bunu sağlayabilecek dost canlısı bir teknisyeniniz olduğunu varsayıyoruz.

## İhtiyacınız olanlar

### Güvenli bir bulut sunucusu

* Sağlayıcı örnekleri: Hetzner, Netcup, 1984 Hosting (yasal zorunluluk yoksa AWS/Azure/Google’dan kaçının)
* Tavsiye edilen özellikler:

  * 8+ GB RAM  
  * 4 CPU çekirdeği  
  * 100 GB SSD  
  * Ubuntu 22.04 LTS

* Güçlendirilmiş:

  * Fail2ban  
  * Otomatik güncellemeler  
  * UFW (güvenlik duvarı)

### VPN erişimi

* Tüm sığınaklar bulut sunucusuna güvenli VPN tünelleri ile bağlanmalıdır.  
* WireGuard veya OpenVPN uygun seçeneklerdir.

### Mağdur cihazları

Yerel versiyondaki gibi: Windows, macOS, Android (tercihen rootlu), iOS (jailbreak’li veya yedekli)

### İsteğe bağlı: PiRogue araç seti

Klinikler veya uydu ofislerde yerel cihaz taramaları için kullanılır.

## Adım adım kurulum

### Bulut sunucunuzu güçlendirin

```bash
# Sunucuyu güncelle
sudo apt update && sudo apt upgrade -y

# Temel güvenliği kur
sudo apt install fail2ban ufw unattended-upgrades -y
sudo ufw allow ssh
sudo ufw enable
````

### SIEM yığını kurun

Yereldeki kurulumla aynı:

```bash
# Wazuh deposunu ekle
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | sudo gpg --dearmor -o /usr/share/keyrings/wazuh.gpg
echo \"deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main\" | sudo tee /etc/apt/sources.list.d/wazuh.list
sudo apt update

# Bileşenleri kur
sudo apt install -y wazuh-manager wazuh-api elasticsearch kibana

# Servisleri başlat
sudo systemctl enable --now wazuh-manager elasticsearch kibana
```

### Güvenli erişimi etkinleştir

#### VPN ayarla (WireGuard örneği)

```bash
sudo apt install wireguard -y
# (Anahtarları oluştur, her site ile paylaş. 51820 portunu kullan.)
```

#### Wazuh paneline eriş

* Kibana’yı `https://your-cloud-ip:5601` adresinden aç
* Mümkünse Let’s Encrypt ile HTTPS ayarla

## Uzaktaki sığınak cihazlarını bağla

### Windows/macOS

* Uzaktaki sığınaklarda ajanları indir ve kur
* Ajanı VPN üzerinden bulut IP’sine bağlanacak şekilde yapılandır

### Android (rootlu, Termux üzerinden)

```bash
pkg update && pkg install curl git
curl -s https://your-cloud-ip/setup_android.sh | bash
```

### Android (rootlu değil)

Doğrudan izleme sınırlıdır, ancak manuel veri toplama ve güvenli yükleme yapılabilir.

#### Seçenek 1: ADB (Android Debug Bridge) kullan

1. **Bilgisayarını hazırla**:

```bash
sudo apt install android-tools-adb
```

2. **Android’de USB hata ayıklamayı aç**

   * Ayarlar > Telefon Hakkında
   * Yapı numarasına 7 kez dokun
   * Geliştirici seçeneklerinden USB hata ayıklamayı etkinleştir

3. **Telefonu USB ile bağla**

4. **Logları topla**:

```bash
adb devices
adb logcat -d > android_logcat.txt
adb shell dumpsys > android_dumpsys.txt
adb shell pm list packages -f > installed_packages.txt
```

5. **Logları güvenli şekilde yükle**:

```bash
scp android_*.txt youruser@your-siem.cloud:/opt/forensics/android_logs/
```

6. **(İsteğe bağlı) Yüklemeden önce şifrele**

```bash
gpg -c android_logcat.txt
```

#### Seçenek 2: Sığınak Tablet Toplayıcı

1. Android’de **Dosyalar** veya **CX File Explorer** kullanarak:

   * `/Download`, `/WhatsApp/`, `/DCIM/` dizinlerine git
   * Logları, ekran görüntülerini ve şüpheli medyayı kopyala

2. USB veya SD kart ile tablet cihazına aktar

3. SIEM bulut sunucusuna güvenli şekilde yükle (`scp` veya güvenli yükleme betiği kullanarak)

### iOS (jailbreakli veya yedek yoluyla)

```bash
# İstemci makinede yedek al
idevicebackup2 backup /tmp/device_backup
# Bulut sunucusuna güvenli gönder
scp /tmp/device_backup user@your-cloud-ip:/opt/backups/
```

## PiRogue ile ön eleme (isteğe bağlı)

* PiRogue’u uzak sitelerde konuşlandır
* Şüpheli pcap veya logları güvenli şekilde gönder:

```bash
scp suspicious.pcap user@your-cloud-ip:/opt/forensics/
```

* `tshark` veya Kibana panelleri ile analiz et

## Sürekli bakım

* WireGuard anahtarlarını her 90 günde bir değiştir
* Günlük log yedekleri oluştur:

```bash
tar -czf /opt/backup/siem_logs_$(date +%F).tar.gz /var/ossec/logs/
```

* GPG veya age ile şifrele:

```bash
gpg -c /opt/backup/siem_logs_*.tar.gz
```

* Log ayrıştırma ve otomatik uyarılar için cron işleri ayarla

## Özet

Bu kurulum, üçüncü taraf bulut araçlarına bağımlı olmadan çoklu konumlarda güvenli, merkezi tehdit tespiti sağlar. Tüm veriler sizin kontrolünüzde, şifrelenmiş ve güvende kalır.

Sürekli bakım gerektirse de (VPN yönetimi, kullanıcı kontrolü), yerel riskleri önemli ölçüde azaltır ve mağdurların gizliliğini korur. Biraz eğitimle, teknik bilgisi olan personel günlük işleri yürütebilir, uzmanlar ise uzaktan yükseltme ve derinlemesine adli analiz sağlar.
