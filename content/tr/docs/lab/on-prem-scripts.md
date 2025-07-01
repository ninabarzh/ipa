---
title: "Kontrolleri ve yanıtları otomatikleştirmek için kullanışlı betikler"
weight: 4
translationKey: "on-prem-scripts"
_build:
  render: always
menu:
  sidebar:
    weight: 20
description: "Betikler, bir kez oluşturduğunuz ve arka planda sessizce önemli işler yapan küçük araçlardır—casus yazılım belirtileri aramak, şüpheli cihazları engellemek veya telefonlardan günlükleri kopyalamak gibi."
---

Programlama bilmenize gerek yok. Pişirmek gibi düşünün: tarifi tam olarak uygulayın ve kek (yani betik) işini yapacaktır.

## Betiklerinizi nereye koymalısınız

Tüm özel betiklerinizi tek bir güvenli, tahmin edilebilir yerde tutmak isteyeceksiniz. İşte bunu nasıl yapacağınız.

1. Terminali açın: Sunucunuzda (Linux) bir terminal penceresi açın.
2. `scripts` klasörünü oluşturun. Betikleriniz burada yaşayacak:

```bash
sudo mkdir -p /opt/siem/scripts
```

3. Bu klasöre gidin

```bash
cd /opt/siem/scripts
```

4. Kilitleyin (sadece yönetici kullanıcılar dokunabilmeli)

```bash
sudo chmod 700 /opt/siem/scripts
```

## Bir cihazı ağdan kes

**Ne yapar:** Ağdaki bir telefon veya dizüstü bilgisayar şüpheli davranıyorsa—belki casus yazılım veya izleme belirtileri gösteriyor—bu betikle hemen bağlantısını kesebilirsiniz.

**Neden önemli:** Hızlı yanıt çok önemlidir. Bu, bir cihazın internete bir şey göndermesini engeller.

### Oluşturmak için adım adım

1. Hala `/opt/siem/scripts` içindeyken, betik dosyasını oluşturun:

```bash
sudo nano quarantine_device.sh
```

2. Bunu yapıştırın:

```bash
#!/bin/bash

echo "$1 ağdan kesiliyor..."
sudo iptables -A OUTPUT -s $1 -j DROP
```

3. Kaydedin ve çıkın:

* `Ctrl + O`, sonra `Enter` tuşlarına basın
* `Ctrl + X` tuşlarına basın

4. Çalıştırılabilir yapın:

```bash
sudo chmod +x quarantine_device.sh
```

### Kullanımı

Şüpheli cihazın IP'si `192.168.1.50` ise:

```bash
sudo /opt/siem/scripts/quarantine_device.sh 192.168.1.50
```

Bir daha geçitlerden geçemez.

## Wazuh günlüklerinde şüpheli şeyler arayın

**Ne yapar:** Wazuh ajanınızın günlüklerini tarar ve "şüpheli" olarak işaretlenen her şeyi çıkarır.

**Neden önemli:** Ham günlükleri okumak zahmetlidir. Bu size sadece uyarıları içeren küçük bir dosya verir.

### Adım adım

1. Dosyayı oluşturun:

```bash
sudo nano parse_logs.sh
```

2. Bunu yapıştırın:

```bash
#!/bin/bash

mkdir -p /opt/siem/alerts
journalctl -u wazuh-agent | grep -i suspicious > /opt/siem/alerts/suspicious.log
```

3. Kaydedin ve çıkın (`Ctrl + O`, `Enter`, `Ctrl + X`)

4. Çalıştırılabilir yapın:

```bash
sudo chmod +x parse_logs.sh
```

### Her saat otomatikleştirin

```bash
crontab -e
```

Altına ekleyin:

```
0 * * * * /opt/siem/scripts/parse_logs.sh
```

Artık her saat günlükleri kontrol edecek ve alarm verici her şeyi şuraya kaydedecek:

```
/opt/siem/alerts/suspicious.log
```

### Sonuçları şifreleyin (isteğe bağlı, ama önerilir)

Sadece güvenilir kişilerin okuyabilmesini sağlayın:

```bash
gpg -c /opt/siem/alerts/suspicious.log
```

Güçlü bir şifre seçin, güvenli bir yerde saklayın.

## Android'de Termux ile çalıştırın

Bir mağdurun Android cihazı varsa ve ondan yararlı ipuçları toplamak istediğinizde kullanılır.

**Sunucunuzda (başkalarının indirebileceği yerde):**

1. Dosyayı oluşturun:

```bash
sudo nano /opt/siem/scripts/setup_android.sh
```

2. Bunu yapıştırın:

```bash
#!/data/data/com.termux/files/usr/bin/bash

echo "Android ipuçları toplanıyor..."

mkdir -p ~/ipa_siem_logs

pm list packages -f > ~/ipa_siem_logs/apps.txt
settings get global http_proxy > ~/ipa_siem_logs/proxy.txt
cat /data/misc/wifi/wpa_supplicant.conf > ~/ipa_siem_logs/wifi.txt 2>/dev/null
logcat -d > ~/ipa_siem_logs/logcat.txt

echo "✅ Tamamlandı. Dosyalar ~/ipa_siem_logs/ içinde kaydedildi"
```

3. Çalıştırılabilir yapın:

```bash
chmod +x /opt/siem/scripts/setup_android.sh
```

**İndirilebilmesi için barındırın:**

`/opt/siem/scripts` içinden:

```bash
python3 -m http.server 8000
```

**Android cihazda (Termux içinde):**

```bash
pkg update && pkg install curl
curl -s http://192.168.1.10:8000/setup_android.sh | bash
```

## Jailbreak'li iPhone'dan günlük alın

Gerekenler:

* Cydia ile **OpenSSH yüklü** iPhone
* iPhone'un yerel Wi-Fi'daki IP adresini biliyorsunuz

Sunucuda

```bash
sudo nano /opt/siem/scripts/pull_ios_logs.sh
```

Yapıştırın:

```bash
#!/bin/bash

IP=$1
USER=mobile
DATE=$(date +"%Y-%m-%d_%H-%M")

mkdir -p /opt/siem/ios_logs/$DATE

scp -r ${USER}@${IP}:/var/mobile/Library/Logs/CrashReporter /opt/siem/ios_logs/$DATE/
scp ${USER}@${IP}:/var/log/syslog /opt/siem/ios_logs/$DATE/

echo "iPhone günlükleri /opt/siem/ios_logs/$DATE içine kaydedildi"
```

Çalıştırılabilir yapın:

```bash
chmod +x /opt/siem/scripts/pull_ios_logs.sh
```

Şöyle çalıştırın:

```bash
/opt/siem/scripts/pull_ios_logs.sh 192.168.1.23
```

## Günlüklerde casus yazılım kelimeleri bulun

```bash
sudo nano /opt/siem/scripts/watch_logs.sh
```

Yapıştırın:

```bash
#!/bin/bash

LOGDIR="/opt/siem/ios_logs"
ALERTS="/opt/siem/alerts"

mkdir -p $ALERTS

grep -rEi "spy|track|mirror|record|stalker|surveil|remote access" $LOGDIR > $ALERTS/suspicious.log

echo "Şüpheli terimler bulundu. $ALERTS/suspicious.log dosyasını kontrol edin"
```

Çalıştırılabilir yapın:

```bash
chmod +x /opt/siem/scripts/watch_logs.sh
```

## USB belleklerden dosya toplayın

```bash
sudo nano /opt/siem/scripts/usb_intake.sh
```

Yapıştırın:

```bash
#!/bin/bash

MOUNT="/media/usb"
DEST="/opt/siem/manual_uploads/$(date +%F_%H%M)"
mkdir -p $DEST

cp -r $MOUNT/* $DEST

echo "Dosyalar $DEST içine kopyalandı"
```

Çalıştırılabilir yapın:

```bash
chmod +x /opt/siem/scripts/usb_intake.sh
```

## Hepsini çalıştırın

```bash
sudo nano /opt/siem/scripts/full_check.sh
```

Yapıştırın:

```bash
#!/bin/bash

/opt/siem/scripts/usb_intake.sh
/opt/siem/scripts/watch_logs.sh
```

Çalıştırılabilir yapın:

```bash
chmod +x /opt/siem/scripts/full_check.sh
```
