---
title: "Güvenli SIEM yığın konteynerlerinin kurulumu"
linkTitle: "SIEM yığın konteynerleri"
weight: 4
_build:
  render: always
description: "Bu kılavuz, şirket içi ve bulut dağıtımları için uygun olan önceden hazırlanmış, sertleştirilmiş ve üretime hazır konteynerlerimizin kurulumunu ve kullanımını adım adım anlatmaktadır."
menu:
  sidebar:
    weight: 20
    identifier: "tr-containers"
    parent: "tr-lab"
translationKey: "containers"
---

Sığınma evleri ve kriz merkezleri için hazır kullanıma uygun, güçlendirilmiş SIEM çözümü: Ağ ve uç noktaları izleyerek sızma girişimlerini, stalkerware (takip yazılımları) ve diğer kötü amaçlı yazılımları tespit eder — önceden oluşturulmuş panolar ve günlük tehdit istihbaratı güncellemeleriyle birlikte."  

---  

## Özellikler

- Wazuh + Elasticsearch + Kibana SIEM yığını  
- Özel stalkerware kurallarıyla Zeek & Suricata ağ izleme  
- Yalnızca VPN erişimi (WireGuard) 
- Tüm servisler arasında TLS şifreleme  
- Önceden ayarlanmış RBAC hesapları (admin, viewer)  
- Günlük kural ve tehdit istihbaratı güncellemeleri  
- Yerel 500 GB diske şifreli gece yedeklemeleri  
- Hazır Kibana panoları:  
  - Tehdit genel görünümü  
  - Stalkerware izleme listesi  
  - Ağ anomalileri  
  - Yüksek riskli cihazlar  

---  

## Gereksinimler

**Ana sistem:**  
- Linux sunucu (Debian 12, Ubuntu 22.04 LTS, Rocky Linux 9 ile test edilmiştir)  
- Docker + Docker Compose v2  
- **Minimum sistem gereksinimleri:**  
  - İşlemci: 4 çekirdek (8+ önerilir)  
  - RAM: 8 GB (16 GB önerilir)  
  - Depolama: Veriler için 200 GB SSD + yedekler için **ayrı 500 GB disk**  
- **Özel ağ izleme (sniffing) NIC:**  
  - İzlemek istediğiniz ağa bağlı ikinci bir ağ arayüz kartı  
  - **IP adresi atanmamış olmalıdır**  
  - Örnek: Linux'ta `eth1`  
  - Boş PCIe yuvası yoksa USB 3.0 Gigabit Ethernet adaptör kullanılabilir  
- İnternet bağlantısı (kural güncellemeleri için, çevrimdışı besleme kullanılmadığı sürece)  

**İstemci cihazlar (VPN erişimi için):**  
- WireGuard istemcisi yüklü (Windows, macOS, Linux, iOS veya Android)  

---

## ## İlk Kurulum

### 1. Depoyu klonlayın

```bash
git clone https://github.com/ninabarzh/secure-shelter-siem-stack.git
cd secure-shelter-siem-stack
```

### 2. Ortam değişkenlerini kopyalayıp düzenleyin

```bash
cp .env.example .env
nano .env
```

Aşağıdakiler için güvenli şifreler belirleyin:

* `ELASTIC_PASSWORD`
* `KIBANA_PASSWORD`
* `WAZUH_PASSWORD`

### 3. WireGuard VPN'i başlatın (zorunlu)

Kibana, Elasticsearch ve Wazuh'a tüm erişim **VPN üzerinden** sağlanır - hiçbir şey genel internete açık değildir.

Depo kök dizininden:

```bash
docker-compose up -d vpn
```

VPN sunucusu UDP/51820 portunu dinler.
Varsayılan VPN alt ağ geçidi `10.13.13.1`'dir.

### 4. VPN eşleri ekleyin (personel, müdahale ekipleri, uzak ajanlar)

Yeni bir eş eklemek için:

```bash
./vpn/add-peer.sh <eş-adı>
```

Örnek:

```bash
./vpn/add-peer.sh alice
```

Bu işlem:

* `alice` adında bir WireGuard eşi oluşturur
* VPN alt ağında bir IP atar
* Yapılandırmayı `vpn/alice.conf` dosyasına kaydeder

**`alice.conf` dosyasını güvenli bir şekilde gönderin** - kullanıcı bu dosyayı Windows, macOS, Linux, Android veya iOS'taki WireGuard istemcisine aktarabilir.

### 5. Elasticsearch için TLS sertifikaları oluşturun

Çalıştırın:

```bash
./scripts/gen-certs.sh
```

Aşağıdaki dosyaları oluşturur:

```
config/elasticsearch/certs/elastic-stack-ca.p12
config/elasticsearch/certs/elastic-certificates.p12
```

Şifre `.env` dosyasında ayarlanır - isterseniz değiştirebilirsiniz.

### 6. Tespit kurallarını güncelleyin

En son Suricata kurallarını alın:

```bash
./scripts/update-rules.sh
```

Kaynaklar:

* Emerging Threats (v7.0.3)
* AbuseCH SSL kara liste
* Stalkerware tespiti için yerel `custom.rules`

### 7. SIEM yığınını dağıtın

```bash
./scripts/deploy.sh
```

Başlatılan servisler:

* TLS ile Elasticsearch
* Kibana (`config/dashboards/` dizinindeki panoları içe aktarır)
* Wazuh Manager
* Suricata & Zeek
* Elasticsearch'e TLS ile bağlanan Filebeat

### 8. Panolara erişim (VPN üzerinden)

Eş yapılandırmanızla VPN'e bağlanın, ardından açın:

```
http://10.13.13.1:5601
```

Giriş bilgileri:

* **Kullanıcı adı:** `.env` dosyasındaki `kibana_system`
* **Şifre:** `KIBANA_PASSWORD` değeriniz

Mevcut panolar:

* **Tehdit Genel Bakış**: tüm kaynaklardaki uyarılar
* **Yüksek Riskli Cihazlar**: tekrarlanan tespitlerin olduğu uç noktalar
* **Ağ Anomalileri**: şüpheli trafik desenleri
* **Stalkerware İzleme Listesi**: BadBox, mFly, FlexiSpy, Spynger tespitleri

### 9. Wazuh ajanlarını dağıtın

İzlenen bir uç noktada (VPN içinde veya yerel ağda):

```bash
curl -so wazuh-agent.deb https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_4.12.0-1_amd64.deb \
 && sudo WAZUH_MANAGER='10.13.13.1' dpkg -i ./wazuh-agent.deb \
 && sudo systemctl enable wazuh-agent --now
```

### 10. Ağ arayüzü gereksinimleri

Suricata/Zeek'i paket yakalama modunda kullanıyorsanız:

* `.env` dosyasında `SNIFFING_INTERFACE` değerini ayarlayın (ör. `eth1`)
* Arayüzü promiscuous moduna alın:

```bash
sudo ip link set eth1 promisc on
```

İzleme, tespit etme ve savunma yapmaya hazırsınız.

---

## Panolar

İlk girişinizde şunları göreceksiniz:

* **Tehdit Genel Görünümü:** Tüm uyarıların özeti
* **Stalkerware İzleme Listesi:** BadBox, BadBox2, mFly, FlexiSpy, Spynger ve diğerleri için tespitler
* **Ağ Anomalileri:** Normal kalıpların dışındaki Suricata/Zeek olayları
* **Yüksek Riskli Cihazlar:** Birden fazla stalkerware göstergesi olan uç noktalar

---

## Yedeklemeler

* Her gece 02:00'de çalışır
* GPG ile şifrelenmiştir
* `/mnt/secure-backup` üzerinde saklanır (500 GB disk)
* İlk çalıştırmada `config/backup/backup-key.gpg` oluşturur
* **Anahtarı bir USB belleğe kopyalayın ve güvenli bir yerde saklayın** - olmadan yedekler geri yüklenemez

### Geri Yükleme

```bash
gpg --import config/backup/backup-key.gpg
gpg --decrypt /mnt/secure-backup/shelter-siem-YYYY-MM-DD_HH-MM.tar.gz.gpg | tar -xz -C data/
```

---

## Bakım

* **Yığını durdur**: `./scripts/stop.sh`
* **Veri yedekleme**: her gece `/mnt/secure-backup` dizinine çalışır
* **Yedekten geri yükleme**: `./scripts/restore-backup.sh`

### Kuralları manuel güncelleme

```bash
./scripts/update-rules.sh
docker compose restart suricata zeek
```

### Yığını güncelleme

```bash
docker compose pull && docker compose up -d
```

---

## Güvenlik Notları

* Dağıtım öncesinde `.env` dosyasındaki tüm varsayılan şifreleri değiştirin
* VPN eş yapılandırmalarını güvenli bir şekilde saklayın
* Elasticsearch TLS sertifikalarını özel tutun
* Disk kullanımını izleyin (`./data/elasticsearch`) - gerektiğinde eski indeksleri temizleyin
* Tüm erişim VPN üzerinden sağlanır - 9200, 5601, 55000 portlarını asla internete açmayın
* Yedekleme diskini fiziksel olarak güvende tutun
* VPN yapılandırmalarını ve yedekleri düzenli olarak test edin
