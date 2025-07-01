---
title: "Sığınma Evi Tabanlı Güvenlik Sistemi Kurulumu"
weight: 2
translationKey: "on-prem"
_build:
  render: always
menu:
  sidebar:
    weight: 10
description: "SIEM sistemini sığınma evinizde kurma rehberi. Tamamen özel, güçlü ve elinizde – bulut gerekmez."
---

* Üçüncü parti bulut platformları yok
* Veri binanızı terk etmiyor
* Mağdurlarda gizli izleme yok

Bu sistem şunları olan sığınma evleri için tasarlandı:

* Sabit internet bağlantısı (sadece bina içinde bile)
* Küçük ama kararlı bir ekip
* Teknik bilgi gerekmez (her şeyi açıklıyoruz)
* Dijital takip, müdahale veya gözetim belirtilerini tespit ihtiyacı

## Sistemin İşlevleri

Cihazlardan ipuçları toplar (loglar, uyarılar), izleme veya sızma belirtilerini izler ve tehditleri hızlıca görmeniz için görsel pano sunar.

## İhtiyacınız Olanlar

### Sığınma evi sunucusu (komuta merkezi)

**Minimum özellikler:**

* Ubuntu 22.04 LTS (ücretsiz Linux sürümü)
* En az 8 GB RAM
* En az 4 CPU çekirdeği
* En az 100 GB disk alanı
* Sabit bir dahili IP adresi

Kullanılabilecek donanım:

* Kullanılmayan bir PC
* Mini bilgisayar (Intel NUC gibi)
* Varolan bilgisayarda sanal makine

### İzlenecek cihazlar

* Windows laptoplar
* macOS cihazlar
* Android telefonlar (rootlu = daha fazla erişim)
* iPhone'lar (jailbreaksiz kısıtlı veri)

### Yerel ağ (kablolu veya Wi-Fi)

Sadece bina içi cihaz bağlantısı gerekir.

### Opsiyonel: PiRogue cihazı

[Raspberry Pi tabanlı araç seti](/docs/lab/pts.md) - cihazları ağa bağlamadan önce tarar.

## Adım Adım Kurulum

### Sunucu hazırlığı

1. Terminal açın (`Ctrl + Alt + T`)
2. Sistemi güncelleyin:

```bash
sudo apt update && sudo apt install -y curl unzip gnupg
```

### Wazuh kurulumu

Depoyu ekleyin:

```bash
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | sudo gpg --dearmor -o /usr/share/keyrings/wazuh.gpg

echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | sudo tee /etc/apt/sources.list.d/wazuh.list

sudo apt update
```

Wazuh'u kurun:

```bash
sudo apt install -y wazuh-manager wazuh-api elasticsearch kibana
```

Servisleri başlatın:

```bash
sudo systemctl enable --now wazuh-manager elasticsearch kibana
```

### Dashboard erişimi

Sunucuda tarayıcıdan:

```
http://localhost:5601
```

Yerel ağdan:

```
http://192.168.1.10:5601
```

## Cihaz bağlantıları

### Windows/Mac için

**Wazuh Agent** kurulumu:

1. `http://192.168.1.10:5601` adresinden indirin
2. Kurucuyu çalıştırın
3. Sunucu IP'sini girin

### Android (rootlu)

1. Termux uygulamasını [F-Droid](https://f-droid.org/packages/com.termux/)'dan yükleyin
2. Termux'te:

```bash
pkg update && pkg install curl git
curl -s http://192.168.1.10/setup_android.sh | bash
```

### Android (rootsuz)

1. ADB kurun:

```bash
sudo apt install android-tools-adb
```

2. Telefonda USB hata ayıklamayı açın
3. Bağlantıyı kontrol edin:

```bash
adb devices
```

4. Logları kopyalayın:

```bash
adb logcat -d > /opt/logs/android_logcat.txt
adb bugreport > /opt/logs/android_bugreport.zip
```

### iPhone (jailbreakli)

1. Cydia'dan OpenSSH kurun
2. Logları SSH ile aktarın

### iPhone (jailbreaksiz)

1. Araçları kurun:

```bash
sudo apt install libimobiledevice-utils
```

2. Yedek alın:

```bash
idevicebackup2 backup /opt/backups/ios_device/
```

3. Logları analiz edin:

```bash
python3 parse_ios_backup.py /opt/backups/ios_device/
```

### Opsiyonel: PiRogue ile tarama

1. Bağlanın:

```bash
ssh pi@piroguedevice.local
```

2. Tarama başlatın:

```bash
sudo ./start_capture.sh --target 192.168.1.75
```

3. Veriyi aktarın:

```bash
scp capture.pcap user@192.168.1.10:/opt/forensics/
```

## Haftalık bakım

* Panoda yeni uyarıları kontrol edin
* `/var/ossec/logs/` klasörünü yedekleyin
* Sunucuyu ayda bir yeniden başlatın
* Sunucuyu güvenli yerde saklayın
* Şüpheli logları inceleyin

## Özet

Bu açık kaynak çözümle tüm veri sığınma evinde kalır. Temel bilgilerle her ekip üyesi sistemi yönetebilir.
