---
title: "Eğitimler için deepfake videolar oluşturma"
linkTitle: "Deepfake videolar yap"
slug: "deepfake-videolar-yap"
weight: 6
_build:
  render: always
description: "'Sahteyi Bul' etkinliği için gerçek ve sahte video klipleri oluşturma rehberi — Windows ve Linux'ta ücretsiz araçlarla."
menu:
  sidebar:
    weight: 30
    identifier: "tr-make-deepfake"
    parent: "tr-docs"
translationKey: "make-deepfake"
---

Bu kılavuz, sığınma evlerinde eğitimler için kısa **gerçek** ve **sahte** videolar oluşturmayı anlatır. Sadece eğitim amaçlıdır.

Şunlarla yapabilirsiniz:

- **Windows** (ücretsiz araçlar veya online)
- **Linux** (terminal veya arayüz)
- Online/offline seçenekler

## Temel ilkeler

- Klipleri **30 saniye** altında tut
- **Nötr içerik** kullan ("Merhaba, ben X. Sığınma evine hoş geldiniz.")
- Katılımcılara neyin sahte olduğunu **açıkla**
- Gerçek kimlikler kullanma
- Güvenli saklama/silme

## Gerçek video çekimi

İhtiyacınız:

- Telefon/web kamerası (720p yeterli)
- Aydınlık ve sessiz ortam
- Kısa metin okuyacak biri
- Kırpma dışında düzenleme gerekmez

Ücretsiz kırpma araçları:
- **Windows**: Fotoğraflar uygulaması → Düzenle → Kırp
- **Linux**: `Shotcut`, `Kdenlive` veya:

```bash
ffmpeg -i input.mp4 -ss 00:00:01 -to 00:00:29 -c copy kirpilmis.mp4
```

## Deepfake versiyonları oluşturma

### Windows: Çevrimiçi araçlar kullanma

**Çoğu kullanıcı için en kolay yol**, sadece buluta yükleme sorun değilse.

#### Seçenek 1: DeepBrain AI Studios

* [DeepBrain AI Studios](https://www.aistudios.com/) sitesine git
* Ücretsiz hesap oluştur (sınırlı kullanım)
* Senaryo yükle ve bir yüz seç (veya klon oluştur)
* Klip oluştur — genellikle bir dakikadan az
* Videoyu indir (MP4)

#### Seçenek 2: HeyGen

* [HeyGen](https://www.heygen.com/) sitesine git
* Bir sunucu seç veya kendi fotoğrafını yükle
* Metin senaryosu ekle
* Çoklu dil ve aksan desteği
* Ücretsiz deneme sürümü (filigranlı)

#### Seçenek 3: Synthesia.io

* [Synthesia.io](https://www.synthesia.io/) sitesine git
* Profesyonel avatarlar, çok kullanıcı dostu
* Hesap gerektirir
* Ücretsiz deneme birkaç video içerir

*Tüm çevrimiçi platformlar videolarınızı saklar. Sadece genel içerik kullanın ve geçici e-postalar düşünün.*

### Windows: Ücretsiz çevrimdışı araçlar

#### Seçenek 1: Avatarify (açık kaynak, gerçek zamanlı deepfake)

* [Avatarify](https://avatarify.ai/)'ı kur

```bash
pip install avatarify
```

* Web kamerası + senaryo okuyucu ile kullan
* Ünlü veya stok yüzleri gerçek zamanlı yerleştir

#### Seçenek 2: DeepFaceLab

* [GitHub](https://github.com/iperov/DeepFaceLab)'dan indir
* Güçlü GPU ve sabır gerektirir
* En gerçekçi sonuçlar için, ancak kurulumu ileri seviye

### Linux: Ücretsiz araçlar kullanma

#### Seçenek 1: First-order Motion Model (FOMM)

* [Aliaksandr Siarohin'in önceden eğitilmiş modellerini](https://github.com/AliaksandrSiarohin/first-order-model) kullan

```bash
git clone https://github.com/AliaksandrSiarohin/first-order-model
cd first-order-model
pip install -r requirements.txt
```

* Şunları sağla:
  * Sabit bir görüntü (yüz)
  * Sürücü videosu (senaryo okuyan sen veya bir aktör)
- Animasyonlu video çıktısı verir

#### Seçenek 2: DeepFaceLive (Linux-native build)

Bir *Linux-native build* var, ancak çok daha az dokümante edilmiş ve `dlib`, `onnxruntime` ve belirli `ffmpeg` sürümleri gibi bağımlılıklarla uğraşmak gerekiyor. Ama çalışıyor:

* Projeyi klonla: `git clone https://github.com/iperov/DeepFaceLive.git`
* [Linux kurulum talimatlarını](https://github.com/iperov/DeepFaceLive#linux) takip et (daha az cilalı ama çalışıyor):

  * Python 3.8–3.10, `onnxruntime`, `torch`, `opencv` ve `dlib` kur
  * virtualenv kullanarak düzenli tut
  * Özellikle GPU hızlandırma için CUDA'yla biraz uğraş

- Ses + yüz bindirme ile video çıktısı oluşturmak için iyi
- Windows'tan daha az akıcı, ama sabırla kullanılabilir

## Hazırlık

* **3-4 gerçek klip** (basit tanıtımlar)
* **3-4 sahte klip** (aynı/benzer senaryolardan)
* İsteğe bağlı: **Karma klip** (sadece bir kısmı değiştirilmiş)

Farkın ince olması için tutarlı aydınlatma ve ton kullan — bu tespit oyununu zorlaştırır (ve eğlenceli yapar).

## Gizlilik ve etik

Yap:

* Gerçek konuşmacılardan bilinçli onay al
* Uydurma isimler ve zararsız senaryolar kullan
* Sahtenin nasıl ve neden yapıldığını açıkla

Yapma:

* Gerçek mağdurların, çocukların veya hassas hikayelerin videolarını kullanma
* Deepfake üreticilerinin şartlarını kontrol etmeden kullanma
* Önbelleklenmiş veya artık eğitim verilerini silmeyi unutma
