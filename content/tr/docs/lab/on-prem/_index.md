---
title: "Sığınma Evi Tabanlı Güvenlik Sistemi Kurulumu"
weight: 2
translationKey: "on-prem"
_build:
  render: always
menu:
  sidebar:
    weight: 10
    identifier: "tr-on-prem"
    parent: "tr-lab"
description: "SIEM sistemini sığınma evinizde kurma rehberi. Tamamen özel, güçlü ve elinizde – bulut gerekmez."
---

## Uyarı: Aktif geliştirme aşamasında olan sistem

PowerOn şirket içi SIEM yığını şu anda aktif geliştirme aşamasındadır. Bu, her şeyin hızla değişebileceği anlamına gelir – özellikler değişebilir, entegrasyonlar bozulabilir ve bazı yapılandırmalar üretim ortamlarında hala deneysel veya test edilmemiş durumdadır.

Burada verilen rehberlik, pilot sistemler veya test dağıtımları oluşturan teknik kullanıcılar için tasarlanmıştır. Bu yığını savunmasız insanları korumak için dağıtıyorsanız, aşırı dikkatli olun. Her bileşeni kendi ortamınızda doğrulayın ve hiçbir şeyin kutudan çıktığı gibi kusursuz olmadığını varsayın.

Zeek, Suricata, Sysmon ve Linux uç noktaları arasında belgelemeyi genişletmeye, örnek yapılandırmalar eklemeye ve log korelasyon stratejilerini iyileştirmeye aktif olarak devam ediyoruz. Katkılar, düzeltmeler ve sahada test edilmiş iyileştirmeler memnuniyetle karşılanır.

Kararlı olarak ilan edilene kadar, bu yığını canlı bir sistem olarak ele alın: bazı alanlarda kırılgan, diğerlerinde umut vaat eden ve her zaman revizyona tabi.

## Tasarım seçimleri

* Üçüncü taraf bulut platformları yok
* Verilerinizin binanızdan çıkması yok
* Mağdurlar üzerinde gizli gözetim yok

Şu özelliklere sahip sığınma evleri için tasarlanmıştır:

* Kararlı bir internet bağlantısı (sadece bina içinde olsa bile)
* Küçük ama kararlı bir ekip
* Dijital geçmiş yok (her şeyi açıklayacağız)
* Dijital takip, tahrifat veya gözetim belirtilerini tespit etme ihtiyacı

## Bu sistemin yapması gerekenler

Cihazlardan ipuçları toplar (loglar, uyarılar ve garip davranışlar gibi), takip veya izinsiz giriş belirtilerini izler ve tehditleri hızlıca tespit edip harekete geçebilmeniz için görsel bir pano sunar.

## İhtiyacınız olanlar

### Bir sığınma evi sunucusu (komuta merkeziniz)

Her şeyi çalıştıracak olan makine.

**Minimum özellikler:**

* Ubuntu 22.04 LTS (ücretsiz bir Linux sürümü – gerekirse nasıl yükleneceğini açıklayacağız)
* En az 8 GB RAM (bellek)
* En az 4 CPU çekirdeği (işlem gücü)
* En az 100 GB disk alanı
* **Sabit** bir dahili IP adresi (böylece diğer cihazlar onu her zaman bulabilir)

*Emin değilseniz, IT gönüllünüzden `192.168.1.10` gibi sabit bir IP ayarlamasını isteyin.*

Şunları kullanabilirsiniz:

* Yedek bir PC
* Mini bir PC (Intel NUC gibi)
* Mevcut yönetici bilgisayarınızda bir sanal makine (yeterince güçlüyse)

### İzlenecek cihazlar

Bu sistemin hizmet verebileceği cihazlar:

* Windows dizüstü bilgisayarlar
* macOS cihazlar (ör. MacBook'lar)
* Android telefonlar (rootlu = daha fazla erişim, ancak gerekli değil)
* iPhone'lar (jailbreak yapılmadıysa sadece kısmi veri)

### Sığınma evi ağı (kablolu veya Wi-Fi)

Sadece tüm cihazların bina **içinde** bağlanması gerekir. Sistem kurulduktan sonra internet erişimine ihtiyaç duymaz.

### Opsiyonel: PiRogue cihazı

Sığınma evi ağına katılmadan önce cihazları şüpheli davranışlar açısından kontrol eden [küçük bir araç seti (Raspberry Pi tabanlı)](/docs/lab/pts.md). Kabul görüşmeleri veya saha çalışmaları sırasında idealdir.

## Sunucu kurulumu adım adım

Tüm güvenlik araçlarınız burada olacak.

1. Bir terminal penceresi açın (Ubuntu sunucunuzda `Ctrl + Alt + T` tuşlarına basın)
2. Sisteminizi güncelleyin ve sunucunuzun güncel olduğundan ve paketleri güvenli bir şekilde indirebildiğinden emin olmak için bazı temel araçları yükleyin:

```bash
sudo apt update && sudo apt install -y curl unzip gnupg
```

3. Java'yı yükleyin (bazı ELK bileşenleri için gereklidir):

```bash
sudo apt install -y openjdk-11-jdk
```

### Wazuh'u yükleyin (temel güvenlik sisteminiz)

Wazuh, cihazları izleyen, sorunları arayan ve size uyarılar ve bir pano sunan açık kaynaklı bir sistemdir. Şunları içerir:
* Wazuh Manager (uyarıları ve eylemleri yönetir)
* Wazuh API (panel ile sistem arasında iletişim sağlar)
* Elasticsearch (loglar ve verileri depolar)
* Kibana (görsel panonuz)

1. Wazuh yazılım kaynağını ekleyin:

```bash
curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | sudo gpg --dearmor -o /usr/share/keyrings/wazuh.gpg

echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | sudo tee /etc/apt/sources.list.d/wazuh.list

sudo apt update
```

2. Wazuh ve destek araçlarını yükleyin:

```bash
sudo apt install -y wazuh-manager wazuh-api elasticsearch kibana
```

3. Hizmetleri şimdi ve sunucuyu her yeniden başlattığınızda çalışacak şekilde başlatın:

```bash
sudo systemctl enable --now wazuh-manager elasticsearch kibana
```

### Wazuh panosunu ayarlayın

Her şey çalışır durumdayken, sunucunuzda bir tarayıcı açın ve ana kontrol odanıza gidin. Giriş yapacak ve uyarılar, cihaz bilgileri ve daha fazlasını göreceksiniz:

```
http://localhost:5601
```

Veya aynı ağdaki başka bir cihazdan:

```
http://192.168.1.10:5601
```

### Zeek'i yükleyin (ağ izleme sisteminiz)

Zeek (eski adıyla Bro), tüm ağ trafiğini izleyen ve bağlantılar, dosyalar ve protokoller hakkında detaylı loglar oluşturan güçlü bir ağ analiz çerçevesidir. Şunları içerir:

* Gerçek zamanlı trafik analizi
* Protokol tespiti (HTTP, DNS, SSL vb.)
* Dosya çıkarma yetenekleri
* Tehdit tespiti için özel betikler

1. Zeek'i Ubuntu depolarından yükleyin:

```bash
sudo apt install -y zeek
```

Eğer Zeek Ubuntu sürümünüzde mevcut değilse (veya daha yeni özelliklere ihtiyacınız varsa), kaynak kodundan derleyin:

```bash
# Derleme bağımlılıklarını yükleyin
sudo apt install -y cmake make gcc g++ flex bison libpcap-dev libssl-dev python3 python3-dev zlib1g-dev

# Zeek'i indirin ve derleyin (X.X.X yerine en son sürümü yazın)
wget https://download.zeek.org/zeek-X.X.X.tar.gz
tar xzf zeek-X.X.X.tar.gz
cd zeek-X.X.X
./configure
make
sudo make install
```

2. Zeek'i ağ arayüzünüzü izleyecek şekilde yapılandırın (`ip link show` ile arayüzünüzü bulun):

```bash
sudo nano /etc/zeek/node.cfg
```

Arayüzünüzü belirtmek için değiştirin (genellikle `eth0` veya `ens33`):
```ini
[zeek]
type=standalone
host=localhost
interface=eth0   # Bunu gerçek arayüzünüzle değiştirin
```

3. Özel casus yazılım tespit betikleri ekleyin

* Tespit betiğinizi (ör. `poweron-spyware.zeek`) `/opt/zeek/share/zeek/site/` veya `/opt/zeek/poweron-spyware.zeek` konumuna kaydedin.
* `/opt/zeek/local.zeek` dosyasını düzenleyin ve şunu ekleyin:

```zeek
@load ./poweron-spyware.zeek
```

4. İzinleri ayarlayın:

* Zeek, log dizinlerine (`/opt/zeek/logs/current/`) **okuma** ve **yazma** erişimine sahip olmalıdır.
* Zeek'i root olmayan bir kullanıcı olarak çalıştırıyorsanız, bu kullanıcının uygun gruplarda olduğundan veya log dizinlerinin sahibi olduğundan emin olun:

```bash
sudo chown -R zeekuser:zeekgroup /opt/zeek/logs
sudo chmod -R 750 /opt/zeek/logs
```

5. Zeek hizmetini başlatın:

```bash
sudo systemctl enable --now zeek
sudo zeekctl deploy  # İlk dağıtım
```

6. Zeek'in çalıştığını doğrulayın:

```bash
zeekctl status
```

### Suricata'yı yükleyin (sızma tespit sisteminiz)

Suricata, şunları yapan yüksek performanslı bir sızma tespit sistemidir (IDS):
* Ağ trafiğini kötü niyetli kalıplar için tarar
* Bilinen saldırı imzalarını tespit eder
* Güvenlik uyarıları oluşturur
* Tehdit istihbarat beslemeleriyle entegre olur

1. Suricata ve bağımlılıklarını yükleyin:

```bash
sudo apt install -y suricata jq
```

2. Suricata'yı ağ arayüzünüzü izleyecek şekilde yapılandırın:

```bash
sudo nano /etc/suricata/suricata.yaml
```

`af-packet` arayüzünü ayarlayın:

```yaml
af-packet:
  - interface: eth0   # Arayüzünüzle değiştirin
    threads: auto
    cluster-id: 99
    cluster-type: cluster_flow
    defrag: yes
```

Log gönderimi için EVE JSON çıktısını etkinleştirin:

```yaml
outputs:
  - eve-log:
      enabled: yes
      filetype: regular
      filename: /var/log/suricata/eve.json
      types:
        - alert
        - dns
        - http
        - tls
        - flow
```

3. Suricata kurallarını güncelleyin (yeni tehditler dahil):

```bash
sudo suricata-update
sudo suricata-update update-sources
sudo systemctl restart suricata
```

4. İzinleri ayarlayın

Suricata'nın `/var/log/suricata/` dizinine yazabildiğinden emin olun:

```bash
sudo chown -R suricata:suricata /var/log/suricata
sudo chmod -R 750 /var/log/suricata
```

5. Suricata'yı etkinleştirin ve başlatın

```bash
sudo systemctl enable suricata
sudo systemctl start suricata
```

6. Suricata'nın çalıştığını doğrulayın:

```bash
sudo systemctl status suricata
```

7. Son uyarıları kontrol edin (tehdit tespit edilmediyse boş bir dizi \[] göstermelidir):

```bash
jq '.event_type' /var/log/suricata/eve.json | grep alert | wc -l
```

### Zeek ve Suricata'yı önyüklemede başlayacak şekilde ayarlayın

Her iki hizmetin de otomatik olarak yeniden başlayacağından emin olun:

```bash
sudo systemctl enable zeek
sudo systemctl enable suricata
```

### Panelinizle entegrasyonu doğrulayın

Yaklaşık 5 dakika sonra, Wazuh panelinizi `http://192.168.1.10:5601` adresinde kontrol edin:
1. Zeek ağ logları "Güvenlik Olayları" altında
2. Suricata uyarıları "Tehdit Tespiti" bölümünde

Sorun giderme için logları şu komutlarla kontrol edin:
```bash
journalctl -u zeek -f
journalctl -u suricata -f
```

## Mağdur cihazlarını bağlayın

Her cihazdan yararlı log ve uyarıları bu şekilde toplarsınız.

### Windows veya Mac için

Bu cihazlar logları sunucunuza göndermek için **Wazuh Aracısı** adlı bir program kullanır.

*Wazuh Aracısı nedir?* Arka planda çalışan, oturum açma girişimleri, garip uygulama davranışları veya ayar değişiklikleri gibi güvenlikle ilgili bilgileri toplayan küçük bir uygulamadır. Bu verileri güvenli bir şekilde sunucunuza gönderir.

**Seçenek 1: Aracıyı doğrudan tarayıcıdan yükleyin**

1. Cihazda bir web tarayıcısı açın.
2. Şu adrese gidin: `http://192.168.1.10:5601`
3. Windows veya macOS için aracıyı indirin.
4. Yükleyiciyi çalıştırın.
5. Sunucu IP'si istendiğinde, sunucunuzun sabit IP'sini girin (ör. `192.168.1.10`)

**Seçenek 2: USB üzerinden yükleyin (cihazda internet yoksa)**

1. Sunucuda:

```bash
wget https://packages.wazuh.com/4.x/agents/wazuh-agent_x.x.x.msi
cp wazuh-agent_x.x.x.msi /media/usb
```

2. USB'yi mağdurun cihazına takın.
3. Yükleyiciyi manuel olarak çalıştırın.

### Android (rootlu)

**Rootlu**, telefonun dahili sistemine tam erişim anlamına gelir. Rootlu değilse, sonraki bölüme bakın.

1. Termux'u yükleyin (bir Linux terminal uygulaması): [F-Droid](https://f-droid.org/packages/com.termux/)'dan indirin.
2. Termux'u açın ve şunu yazın:

```bash
pkg update && pkg install curl git
curl -s http://192.168.1.10/setup_android.sh | bash
```

([Bu betik sunucunuzda hazırlanmalıdır](/docs/lab/on-prem-scripts.md).)

### Android (rootlu değil)

Logları `adb` kullanarak manuel olarak çıkaracaksınız.

*`adb` nedir?* ADB (Android Debug Bridge), Android telefonlarla bir bilgisayardan iletişim kurmanızı sağlayan bir araçtır. Sistem bilgilerini ve logları kopyalamak için kullanacaksınız.

1. Ubuntu sunucunuza adb'yi yükleyin:

```bash
sudo apt install android-tools-adb
```

2. Telefonda USB hata ayıklamayı etkinleştirin:

   * **Ayarlar → Telefon hakkında**'ya gidin
   * **Yapı numarası**'na 7 kez dokunarak geliştirici seçeneklerini açın
   * **Geliştirici seçenekleri**'ne gidin, **USB hata ayıklama**'yı etkinleştirin

3. Telefonu sunucuya USB kablosuyla bağlayın.
4. Tanındığını kontrol edin:

```bash
adb devices
```

Bir cihaz ID'si listelenmelidir. Değilse, USB kablosunu ve izinleri kontrol edin.

5. Logları telefondan kopyalayın:

```bash
adb logcat -d > /opt/logs/android_logcat.txt
adb bugreport > /opt/logs/android_bugreport.zip
```

6. İsteğe bağlı: Uygulama listesini ve proxy ayarlarını çıkarın

```bash
adb shell pm list packages -f > /opt/logs/android_apps.txt
adb shell settings get global http_proxy
```

### Jailbreak'li iPhone'lar (tam erişim)

1. Cydia (jailbreak uygulama mağazası) üzerinden OpenSSH yükleyin
2. Logları sunucunuza SSH üzerinden aktarmak için [güvenli betikler](on-prem-scripts.md) kullanın

### Jailbreak **yapılmamış** iPhone'lar

Uygulama verilerini çıkarmak için yerel yedekleme kullanın.

1. Sunucuya araçları yükleyin:

```bash
sudo apt install libimobiledevice-utils
```

2. iPhone'un yedeğini alın:

```bash
idevicebackup2 backup /opt/backups/ios_device/
```

3. Bir [ayrıştırma betiği](on-prem-scripts.md) çalıştırın (yardım isteyebilirsiniz):

```bash
python3 parse_ios_backup.py /opt/backups/ios_device/
```

Şunları arayın:

* Bilinmeyen uygulamalar
* Konum logları
* Yansıtma yazılımları

### Sysmon kurulumu (Windows uç noktaları)

Sysmon (System Monitor), şunları kaydeden bir Windows sistem hizmetidir:  

* Komut satırlarıyla birlikte işlem oluşturmaları  
* Ağ bağlantıları  
* Dosya oluşturma zaman damgaları  
* Sürücü yüklemeleri  
* Standart Windows loglarından daha ayrıntılı izleme  

Sysmon'u **Wazuh aracılarını** dağıttıktan **sonra** ancak gelişmiş izleme kurallarını yapılandırmadan **önce** yükleyin.

1. Sysmon'u Microsoft'tan indirin [https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon):

```powershell
Invoke-WebRequest -Uri "https://download.sysinternals.com/files/Sysmon.zip" -OutFile "$env:TEMP\Sysmon.zip"
Expand-Archive -Path "$env:TEMP\Sysmon.zip" -DestinationPath "C:\Program Files\Sysmon"
```

2. Yapılandırma dosyası oluşturun  

Casus yazılım odaklı minimal bir yapılandırma kullanın (`poweron-sysmon-config.xml` olarak kaydedin):

```xml
<Sysmon schemaversion="4.70">
  <EventFiltering>
    <ProcessCreate onmatch="include" />
    <NetworkConnect onmatch="include" />
    <ImageLoad onmatch="include" />
    <ProcessAccess onmatch="include" />
    <CreateRemoteThread onmatch="include" />
    <RegistryEvent onmatch="include" />
    <Exclude>
      <Image condition="is">C:\Windows\System32\svchost.exe</Image>
      <Image condition="is">C:\Windows\System32\services.exe</Image>
      <Image condition="is">C:\Windows\System32\lsass.exe</Image>
    </Exclude>
  </EventFiltering>
</Sysmon>
```

3. Yapılandırmayla yükleyin

Yönetici olarak PowerShell'i açın ve çalıştırın:

```powershell
cd "C:\Program Files\Sysmon"
.\Sysmon64.exe -i poweron-sysmon-config.xml -accepteula
```

4. Olay Görüntüleyici'de doğrulayın  

Açın: **Olay Görüntüleyici > Uygulama ve Hizmet Logları > Microsoft > Windows > Sysmon > Operational** 

Burada yeni işlem/ağ olayları gösterilmelidir.

5. Bunu Wazuh aracısının `ossec.conf` dosyasına ekleyin:  

```xml
<localfile>
  <log_format>eventchannel</log_format>
  <location>Microsoft-Windows-Sysmon/Operational</location>
</localfile>
```

### Linux uç nokta izleme ayarları

* Sysmon yalnızca Windows'ta çalıştığından, Linux uç noktaları için:

  * İşlem ve dosya sistemi izleme için `auditd` kullanmayı düşünün.
  * Ağ sensörlerinde Zeek ve Suricata kullanın.
  * Linux makinelerde Wazuh aracıları dağıtarak syslog, auditd logları ve özel logları toplayın.
  * Wazuh aracılarını ayrıntılı Linux olay toplama için yapılandırın.

### Opsiyonel: Bağlanmadan önce cihazları taramak için PiRogue kullanın

[Bir PiRogue cihazı](../pts/_index), ağ ile bir telefon/dizüstü bilgisayar arasında durur ve tüm trafiği izler.

1. PiRogue'a bağlanın:

```bash
ssh pi@piroguedevice.local
```

2. Bir ağ taraması başlatın:

```bash
sudo ./start_capture.sh --target 192.168.1.75
```

3. Tarama bittikten sonra, verileri sunucunuza gönderin:

```bash
scp capture.pcap user@192.168.1.10:/opt/forensics/
```

4. Bu komutla inceleyin:

```bash
tshark -r /opt/forensics/capture.pcap
```

## Logları SIEM'e gönderme

### Sensor makinelerde Filebeat ile Zeek loglarını gönderme

1. Filebeat'i yükleyin:

```bash
sudo apt install -y filebeat
```

2. `/etc/filebeat/filebeat.yml` dosyasını yapılandırın:

```yaml
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /opt/zeek/logs/current/conn.log
      - /opt/zeek/logs/current/dns.log
      - /opt/zeek/logs/current/http.log
    json.keys_under_root: true
    json.add_error_key: true
    fields:
      source: zeek
    fields_under_root: true

output.logstash:
  hosts: ["your-wazuh-manager:5044"]
```

3. Zeek modülünü etkinleştirin (isteğe bağlı, modül kullanıyorsanız):

```bash
sudo filebeat modules enable zeek
```

4. Filebeat'i başlatın ve etkinleştirin:

```bash
sudo systemctl start filebeat
sudo systemctl enable filebeat
```

### Filebeat ile Suricata loglarını gönderme

1. `/etc/filebeat/filebeat.yml` dosyasına şunu ekleyin:

```yaml
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /var/log/suricata/eve.json
    json.keys_under_root: true
    json.add_error_key: true
    fields:
      source: suricata
    fields_under_root: true

output.logstash:
  hosts: ["your-wazuh-manager:5044"]
```

2. Suricata modülünü etkinleştirin (isteğe bağlı):

```bash
sudo filebeat modules enable suricata
```

3. Uygulamak için Filebeat'i yeniden başlatın:

```bash
sudo systemctl restart filebeat
```

### Windows uç noktalardan Sysmon loglarını gönderme

* Windows'ta Wazuh aracısını (tercih edilen) veya Filebeat'i yükleyin.
* Wazuh aracısı için, Sysmon olay kanalı loglarını toplayacak şekilde yapılandırın (aşağıya bakın).
* Filebeat kullanıyorsanız, Sysmon olay loglarını okumak ve doğrudan Wazuh veya Elasticsearch'e göndermek için yapılandırın.

## Wazuh için log alma yapılandırması

### Zeek loglarını ekleme

Wazuh yöneticisi veya aracı yapılandırmasında (`ossec.conf`), şunu ekleyin:

```xml
<localfile>
  <log_format>json</log_format>
  <location>/opt/zeek/logs/current/conn.log</location>
</localfile>
<localfile>
  <log_format>json</log_format>
  <location>/opt/zeek/logs/current/dns.log</location>
</localfile>
<localfile>
  <log_format>json</log_format>
  <location>/opt/zeek/logs/current/http.log</location>
</localfile>
```

### Suricata loglarını ekleme

`ossec.conf` dosyasına şunu ekleyin:

```xml
<localfile>
  <log_format>json</log_format>
  <location>/var/log/suricata/eve.json</location>
</localfile>
```

### Sysmon loglarını ekleme

Windows aracısının `ossec.conf` dosyasında:

```xml
<localfile>
  <log_format>eventchannel</log_format>
  <location>Microsoft-Windows-Sysmon/Operational</location>
</localfile>
```

## Wazuh için dekoder ve kural seti kurulumu

### Zeek dekoder ve kural seti yapılandırması

Zeek loglarının Wazuh'ta anlamlı olması için doğru dekoderlerin ve kuralların etkinleştirilmesi gerekir. Hazır olarak Wazuh, Zeek loglarını nasıl okuyacağını söylenmediği sürece anlamaz. İşte bunu çözme yolu:

1. Zeek dekoderini etkinleştirin

Wazuh yöneticinizin `etc/decoders/zeek-decoder.xml` dosyasını kontrol edin. Eğer zaten yoksa, şununla oluşturun:

```xml
<decoder name="zeek">
  <program_name>zeek</program_name>
  <type>json</type>
</decoder>
```

Eğer `program_name` alanı olmadan JSON loglarını alıyorsanız, `uid`, `id.orig_h`, `proto` gibi belirli Zeek alanlarında tetiklenen özel kurallar ekleyin.

2. Zeek için kural dosyalarını yükleyin

Wazuh'un Zeek loglarının yapısını ve anlamını anlayan kurallara ihtiyacı vardır. Şunlardan birini yapın:

* Wazuh'un [topluluk tarafından sağlanan Zeek kurallarını](https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/ruleset.html) kullanın, veya
* Şu gibi girişlerle bir `rules/zeek_rules.xml` dosyası oluşturun:

```xml
<group name="zeek,">
  <rule id="100200" level="5">
    <decoded_as>json</decoded_as>
    <field name="proto">tcp</field>
    <description>Zeek TCP bağlantısı tespit edildi</description>
  </rule>
</group>
```

Bu, Zeek içeriğine dayalı olarak bayrak koymanıza, ilişkilendirmenize veya yükseltmenize izin verir.

3. Loglar başka bir makineden gönderiliyorsa...

Zeek bir sensörde çalışıyor ve logları SIEM makinesine gönderiyorsa:

* **İzinler**: Filebeat'in (veya senkronizasyon sürecinizin) Zeek loglarını okuma izni olduğundan ve bunların alınmadan önce döndürülmediğinden emin olun. `chmod o+r` veya özel bir grup kullanın.

* **Bütünlük**: Şunlarla tahrif veya kesinti önleyin:

  * `rsync -a --checksum` veya
  * Şifreli taşıma (örn. SSH tünelleri, TLS üzerinden Filebeat)

* **Zaman damgaları**: Saat dilimlerini kontrol edin ve Zeek loglarından doğrudan `ts` alanlarını kullanın – dosya değiştirme zamanına güvenmeyin.

4. Her şeyin bağlı olduğunu doğrulayın

* Bir Zeek log satırıyla `wazuh-logtest` çalıştırarak eşleşmeyi test edin
* `/var/ossec/logs/ossec.log` dosyasını dekoder hataları veya uyarıları için izleyin
* Kuralların beklendiği gibi tetiklendiğini onaylamak için `alerts.json` veya Kibana'nın Discover sekmesini kullanın

### Suricata dekoderlerini etkinleştirin

Wazuh'un varsayılan Suricata dekoderlerini ve kurallarını veya topluluk katkılarını kullanın.

### Sysmon dekoderlerini etkinleştirin

Wazuh varsayılan olarak Sysmon dekoderlerini ve kurallarını içerir. Etkin olduklarından emin olun.

## Test ve doğrulama

* Filebeat'i başlatmadan önce `filebeat test config -c filebeat.yml` çalıştırın
* Logların 30 saniye içinde dizininizde veya yöneticinizde göründüğünü onaylayın
* Alım gizemli bir şekilde başarısız olursa, Zeek JSON'unu manuel olarak doğrulamak için `jq` kullanın

1. Çalıştırın:

```bash
filebeat test config -c /etc/filebeat/filebeat.yml
```

2. Wazuh dekoderlerini şununla test edin:

```bash
wazuh-logtest
```

3. Wazuh yönetici loglarını (`/var/ossec/logs/ossec.log`) dekoder hataları için izleyin.
4. Gelen loglar ve uyarılar için Elasticsearch/Kibana'yı kontrol edin.

## Güvenlik ve bütünlük hususları

* Uzak log gönderimi için şunları sağlayın:
  * Dosya izinleri Filebeat/Wazuh'un logları okumasına izin veriyor.
  * Loglar alınmadan önce döndürülmüyor.
  * Şifreli taşıma kanalları kullanın (TLS, SSH tünelleri).
  * Log bütünlüğünü ve zaman damgası doğruluğunu düzenli olarak doğrulayın.

## Otomasyon betikleri ekleyin

[Bkz. (Kontrol ve yanıtları otomatikleştirmek için yardımcı betikler)](on-prem-scripts.md)

## Haftalık bakım

* Yeni uyarılar için panoyu kontrol edin
* `/var/ossec/logs/` klasörünü bir USB veya harici sürücüye yedekleyin
* Belleği temizlemek için sunucuyu ayda bir yeniden başlatın
* Sunucuyu güvenli bir yerde kilitleyin
* Uyarı loglarını gözden geçirin (`/opt/siem/alerts/suspicious.log` eğer betik kullanıyorsanız)

## Özet

| Bileşen        | Kurulum yeri           | Ana yapılandırma dosyaları         | Log yolları                      | İzinler                  |
|----------------|------------------------|------------------------------------|----------------------------------|--------------------------|
| Zeek           | Ubuntu sunucu/sensor   | `/etc/zeek/node.cfg`, `local.zeek` | `/opt/zeek/logs/current/*.log`   | loglarda `chmod/chown`   |
| Suricata       | Ubuntu sunucu/sensor   | `/etc/suricata/suricata.yaml`      | `/var/log/suricata/eve.json`     | loglarda `chmod/chown`   |
| Sysmon         | Windows uç noktalar    | `poweron-sysmon-config.xml`        | Windows Olay Logu (Sysmon kanalı) | Olay iletme yapılandırın |
| Filebeat (Linux)| Ubuntu sunucu/sensor  | `/etc/filebeat/filebeat.yml`       | Zeek/Suricata loglarını okur     | Loglara okuma erişimi    |
| Filebeat (Win) | Windows uç noktalar    | `filebeat.yml`                     | Sysmon `.evtx` loglarını okur    | Loglara okuma erişimi    |
| Wazuh Yönetici | Ubuntu sunucu          | `/var/ossec/etc/ossec.conf`        | Tüm logları aracılar üzerinden alır | N/A                      |

Tüm tehditleri engellemez, ancak onları **görmenizi** sağlar ve bu savaşın yarısıdır. Ek destek için güvenilir bir yerel dijital haklar grubuna ulaşın – şifreli sohbet veya telefon üzerinden size uzaktan rehberlik edebilirler.

Açık kaynak araçlara dayalı bu kurulumla, her şey uygun maliyetli ve çatınızın altında kalıyor – bulut yok, üçüncü taraf maruziyeti yok. Bu, stalker yazılımı veya tahrifat için sessizce göz kulak olan özel radarınızdır. Sistemin gücü basit uygulamalardan gelir: logları düzenli olarak kontrol edin, uyarılara yanıt verin ve fiziksel erişimi koruyun. Temel rehberlikle, sığınma evindeki herkes bu sistemi çalıştırmayı ve anlamayı öğrenebilir.

## Casus yazılım tespiti için Kibana panoları ve Wazuh uyarıları oluşturma

1. Tercih ettiğiniz web tarayıcısını açın.

2. Kibana URL'nizi girin, genellikle şöyle görünür:

```
http://kibana-sunucunuz:5601
```

3. Kullanıcı adınız ve şifrenizle giriş yapın.

## Kibana'da indeks desenleri oluşturma

İndeks desenleri Kibana'ya hangi verilere bakacağını söyler.

1. Sol kenar çubuğunda, **Yığın Yönetimi**'ne (veya Kibana sürümünüze bağlı olarak sadece **Yönetim**) tıklayın.

2. **Kibana** altında, **İndeks Desenleri**'ni seçin.

3. **İndeks deseni oluştur**'a tıklayın.

4. Log verilerinizle eşleşen indeks deseninin adını girin:

   * Zeek logları için `zeek-*` yazın
   * Suricata logları için `suricata-*` yazın
   * Sysmon logları için `sysmon-*` yazın
   * Wazuh uyarıları için `wazuh-alerts-*` yazın

5. **Sonraki adım**'a tıklayın.

6. İndeks deseniniz için **zaman alanını** seçin, genellikle `@timestamp`.

7. **İndeks deseni oluştur**'a tıklayın.

Her veri kaynağı için tekrarlayın.

## Kibana'da görselleştirmeler oluşturma

Casus yazılımla ilgili etkinliği izlemek için çeşitli görselleştirmeler oluşturacaksınız.

### Casus yazılım domainlerine ve IP adreslerine bağlantıları görselleştirme

**Amaç:** Bilinen casus yazılım domainlerine veya şüpheli IP'lere ağ trafiğini görün.

1. Sol kenar çubuğunda, **Analitik** → **Görselleştirme Kitaplığı**'na tıklayın.

2. **Görselleştirme oluştur**'a tıklayın.

3. **Lens**'i seçin.

4. `zeek-*` veya `suricata-*` indeks desenini seçin.

5. Sağ panelde, `hedef.ip` veya `dns.rrname` (istenen domain adı) alanını bulun.

6. `hedef.ip`'yi ana çalışma alanına sürükleyin.

7. `kaynak.ip`'yi yanına sürükleyin veya **Bölmeye göre** olarak ekleyin.

8. Casus yazılımla ilgili domainler veya IP'ler için filtre uygulamak için:

   * Çalışma alanının üstünde **Filtre ekle**'ye tıklayın.
   * İlgili alanı seçin (`dns.rrname` veya `hedef.ip`).
   * **Şunlardan biri**'ni seçin.
   * Virgüllerle ayrılmış bilinen casus yazılım domainlerinizi veya IP adreslerinizi girin.
   * **Kaydet**'e tıklayın.

9. Görselleştirme türünü istediğiniz gibi ayarlayın (örn. Çubuk grafik, Tablo).

10. Üstte **Kaydet**'e tıklayın, **Casus yazılım ağ bağlantıları** olarak adlandırın ve kaydedin.

### Şüpheli DNS sorgularını görselleştirme

**Amaç:** Şüpheli domainlere yapılan DNS sorgularını tanımlayın.

1. Yukarıdaki gibi yeni bir görselleştirme oluşturun.

2. `zeek-*` veya `suricata-*` indeks desenini seçin.

3. `dns.rrname` veya `dns.query` alanını ana alana sürükleyin.

4. Toplama olarak **En yüksek değerler**'i ayarlayın ve boyutu 10 veya 20 gibi makul bir değere ayarlayın.

5. Filtreler ekleyin:

   * Sadece şüpheli domainleri dahil etmek için, casus yazılım domainler listeniz için `dns.rrname` üzerine bir filtre ekleyin.

   * Alternatif olarak, yaygın popüler domainleri hariç tutun:

     * `dns.rrname` için **şunlardan biri değil** filtresi ekleyin ve yaygın domainleri (google.com, microsoft.com vb.) listeleyin.

6. **Kaydet**'e tıklayın, **Şüpheli DNS sorguları** olarak adlandırın.

### İkaz verme (beaconing) modellerini görselleştirme

**Amaç:** Casus yazılımların tipik periyodik ağ çağrılarını gösteren tekrarlayan modelleri tespit edin.

1. **Lens** veya **Çizgi grafik** kullanarak yeni bir görselleştirme oluşturun.

2. `zeek-*` veya `suricata-*` indeks desenini seçin.

3. X eksenini `@timestamp`'e dayalı **Tarih Histogramı** olarak ayarlayın.

4. Log hacminize bağlı olarak aralığı 1 dakika veya 5 dakika olarak ayarlayın.

5. Y eksenini olayların **Sayısı** olarak ayarlayın.

6. Şüpheli etkinliği daraltmak için:

   * Casus yazılım IP'leri veya domainleri için `hedef.ip` veya `dns.rrname` üzerine bir filtre ekleyin.

7. İsteğe bağlı olarak, hangi hostların ikaz verdiğini görmek için **Bölmeye göre** `kaynak.ip` ekleyin.

8. **İkaz verme etkinliği** olarak kaydedin.

### Şüpheli Sysmon süreçleri ve ağ bağlantılarını görselleştirme

**Amaç:** Windows uç noktalarından şüpheli süreç oluşturmaları ve ağ bağlantılarını görüntüleyin.

1. Yeni bir görselleştirme oluşturun.

2. `sysmon-*` indeks desenini seçin.

3. Süreç oluşturmaları için:

   * `event_id` = 1 (Sysmon süreç oluşturma) filtreleyin.

   * `process_name` veya `image` alanını çalışma alanına sürükleyin.

   * En yüksek değerlere göre toplayın.

4. Ağ bağlantıları için:

   * `event_id` = 3 filtreleyin.

   * `hedef_ip` veya `hedef_port`'u sürükleyin.

5. Bilinen şüpheli süreç adları veya portlar için filtreler uygulayın.

6. Görselleştirmeyi **Sysmon şüpheli etkinlik** olarak kaydedin.

## Kibana panosu oluşturma

1. Sol kenar çubuğunda, **Pano**'ya tıklayın.

2. **Yeni pano oluştur**'a tıklayın.

3. **Ekle**'ye tıklayın ve kaydettiğiniz görselleştirmeleri seçin:

   * Casus yazılım ağ bağlantıları
   * Şüpheli DNS sorguları
   * İkaz verme etkinliği
   * Sysmon şüpheli etkinlik

4. Görselleştirmeleri hızlı izleme için mantıklı bir şekilde düzenleyin.

5. **Kaydet**'e tıklayın, panonuza örneğin **Casus yazılım izleme genel bakış** adını verin.

## Host adı veya IP'ye göre uç nokta ve ağ loglarını ilişkilendirme

Bu, şüpheli ağ etkinliğini belirli uç noktalara bağlamaya yardımcı olur.

1. Loglarınızın tutarlı tanımlayıcılara sahip olduğundan emin olun:

   * Zeek ve Suricata logları: `kaynak.ip`, `hedef.ip`

   * Sysmon logları: `hostname` veya `bilgisayar_adı`

2. Kibana'da ilişkilendirmek için: Zeek/Suricata'dan `kaynak.ip` ile Sysmon loglarındaki `hostname`'i eşleştirmek için **Lens** veya **Tuval** kullanarak birleştirilmiş görselleştirmeler oluşturun.

3. Örnek: Aynı IP/host adından gelen ağ ikaz verme etkinliğini ve şüpheli süreçleri gösteren bir zaman serisi grafiği oluşturun.

## Birleşik şüpheli olaylar için Wazuh'ta uyarılar oluşturma

### Özel korelasyon kuralları yazma

1. Wazuh yöneticinize (Ubuntu sunucusu) bağlanın.

2. Özel kurallar dosyasını açın:

```bash
sudo nano /var/ossec/etc/rules/local_rules.xml
```

3. Birden fazla şüpheli olay birlikte gerçekleşirse tetiklenecek bir kural yazın. Örneğin:

```xml
<rule id="100500" level="12">
  <if_sid>100200</if_sid>  <!-- Zeek şüpheli bağlantı -->
  <if_sid>200300</if_sid>  <!-- Suricata casus yazılım uyarısı -->
  <if_sid>300400</if_sid>  <!-- Sysmon şüpheli süreç -->
  <frequency>3</frequency>
  <timeframe>600</timeframe> <!-- 10 dakika -->
  <description>Ağ ve uç nokta genelinde casus yazılım etkinliği tespit edildi</description>
</rule>
```

4. Kaydedin ve çıkın.

### Kuralları uygulamak için Wazuh yöneticisini yeniden başlatın

```bash
sudo systemctl restart wazuh-manager
```

## Uyarı eylemlerini yapılandırma

Şüpheli etkinlik olduğunda Wazuh'un sizi bilgilendirmesini istersiniz.

1. Wazuh yapılandırmasını düzenleyin:

```bash
sudo nano /var/ossec/etc/ossec.conf
```

2. E-posta uyarıları, Slack webhook'u veya diğer bildirim yöntemlerini `<global>` ve `<alerts>` bölümlerinin içinde yapılandırın.

3. Kaydedin ve Wazuh yöneticisini yeniden başlatın:

```bash
sudo systemctl restart wazuh-manager
```

## Panoları ve uyarıları test etme

1. Test olayları oluşturun:

   * Casus yazılım domainlerine DNS sorguları simüle edin.
   * Bilinen şüpheli IP'lere ağ bağlantıları tetikleyin.
   * Windows uç noktalarında şüpheli süreçler başlatın.

2. Logların Kibana görselleştirmelerinde göründüğünü onaylayın.

3. Uyarıların Wazuh'ta tetiklendiğini ve bildirim aldığınızı onaylayın.

## Wazuh ve Kibana korelasyon ipuçları

* Zeek (`conn.log`, `dns.log`, `http.log`) loglarını Filebeat veya yerel alım ile gönderin.
* Suricata `eve.json` çıktısını alın ve `alert.signature`'ı panolara eşleyin.
* Sysmon loglarını Wazuh aracısı ile iletin; olay filtreleme için varsayılan kural setini kullanın.

### Pano fikirleri

* Zaman içinde casus yazılımla ilgili domainler/IP'ler
* Uç noktaya göre ikaz verme davranışı
* Host'a göre Suricata uyarı sıklığı
* Aynı host için birleşik tespitler: süreç + ağ + DNS

### Otomasyon ipucu

Şu durumda bir Wazuh uyarısı tetikleyin:

* Şüpheli bir komut satırıyla bir süreç başlatılır, **ve**
* Aynı hosttan 10 dakika içinde bir ikaz verme imzası tetiklenir

Yüksek güvenilirlikli eşleşmeler için e-posta veya webhook üzerinden bildirimler ayarlayın.

# Özet

Bu kılavuz, sizi sıfırdan ağ ve uç nokta loglarını kapsayan birleşik casus yazılım göstergeleri üzerinde uyarı veren işlevsel bir Kibana izleme panosuna götürdü.

Artık şunlara sahipsiniz:

* Zeek, Suricata, Sysmon ve Wazuh uyarıları için özel indeks desenleri
* Casus yazılım domain bağlantılarını, DNS sorgularını, ikaz vermeyi ve şüpheli Sysmon olaylarını izleyen görselleştirmeler
* Her şeyi bir araya getiren kapsamlı bir pano
* Şüpheli çoklu kaynak etkinliğinde tetiklenen Wazuh korelasyon kuralları
* Harekete geçirilebilir uyarılar için bildirim ayarları

Önceden bilgi gerektirmez, sadece yazıldığı gibi her adımı takip edin. Sığınma evinizin dijital savunmaları artık çok daha uyanık.


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
