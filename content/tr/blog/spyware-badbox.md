---
title: "Badbox ve cihaz değiştirmenin sert gerçeği"
date: 2025-07-28
author: PowerOn
translationKey: "badbox-effects"
tags: ["casus-yazılım", "tedarik-zinciri-güvenliği", "cihaz-değişimi", "güvenli-cihazlar", "play-protect"]
description: "BadBox bize gösteriyor ki bazı cihazlar ilk açılıştan önce ele geçirilmiş olabiliyor. İşte cihaz değiştirme konusunda bunun anlamı."
---

Şüpheli eski bir tableti atıyorsunuz, yepyeni bir "Android telefon" alıyorsunuz ve rahat bir nefes alıyorsunuz. Sorun çözüldü.

Ancak öyle değil.

[BadBox ile tanışın](https://www.humansecurity.com/learn/blog/satori-threat-intelligence-disruption-badbox-2-0/) - Android cihazlara *fabrikadan çıkmadan önce* yerleştirilen geniş çaplı bir siber casusluk operasyonunun neşeli kod adı. Bunlar şüpheli pazar tezgahlarından alınan ürünler değil. Çoğu güvenilir online satıcılar ve büyük platformlar üzerinden satılıyor. Binlercesi Avrupa'ya ulaşmış durumda, genellikle "ucuz" tabletler, telefonlar veya streaming kutuları olarak.

## BadBox'ın cihaz değişimiyle ilişkisi

Kibar ifadeyle **Guerrilla** olarak bilinen bu kötücül yazılım, firmware'in derinliklerine yerleşiyor - çoğu kullanıcının (veya antivirüs yazılımlarının) göremeyeceği bir seviyede. Sessizce uygulama yükleyebiliyor, kullanıcıları gözetleyebiliyor, hedefli phishing yapabiliyor veya cihazınızı tamamen başkasına kiralayabiliyor. Modüler yapıda olduğundan, yeni özellikler her an eklenebilir.

BadBox tek başına bir kötücül yazılım değil, bütün bir suç ekosistemi. SalesTracker, MoYu, Lemon ve LongTV gibi birbirine bağlı gruplar tarafından yönetiliyor ve iş bölümü yapmış durumdalar. Bazıları komuta-kontrol altyapısını yönetirken, diğerleri firmware seviyesindeki arka kapıyı geliştiriyor, bir kısmı da reklam dolandırıcılığı, residential proxy ağları ve otomatik dolandırıcılık yöntemleriyle bulaşmış cihazlardan para kazanıyor. Ortak noktaları ise kötücül yazılımın cihaz kullanıcıya ulaşmadan önce yüklenmiş olması - yani tehlike kutuyu açar açmaz başlıyor.

Şimdiye kadar temel motivasyon para kazanmak oldu, kiralık gözetim değil. Çoğu BadBox enfeksiyonu tıklama sahtekarlığı, sahte reklam gösterimi ve anonim ağ trafiğinin başka aktörlere satılması için kullanıldı. Ancak mimarisi modüler ve bu grupların yeteneklerini kiralamak/satmak gibi kanıtlanmış alışkanlıkları var. Yani: birisi bu platformu takip, hedefli casusluk veya veri hırsızlığı için uyarlamak isterse, tekerleği yeniden icat etmek zorunda kalmadan bunu yapabilir.

İşte bu yüzden BadBox, cihaz değişimi için önemli. Bu gruplar şu anda doğrudan stalkerware saldırıları düzenlemiyor; ancak altyapı ve teknikler çoktan hazır durumda. Yanlış bir alıcı, bunları bir gecede silaha dönüştürebilir. Yeni telefonunuz, tabletiniz veya TV kutunuz, daha giriş yapmadan bir bot, izleme cihazı veya veri sifonu olarak çalışabiliyorsa, 'yeni' demek otomatik olarak 'güvenli' anlamına gelmez.

Fabrika ayarlarına dönmek işe yaramaz. Antivirüs yazılımları işe yaramaz. Kapatıp açmak da bu hayaletleri kovmayacaktır.

## Mağdurlar için anlamı

Partner şiddetinden kurtulanlar için bu, güvenlik rehberini değiştiriyor. *PowerOn*'da deriz ki: *Şüphe duyuyorsanız, cihazı değiştirin*. Bu hala geçerli, ama bir uyarıyla: **Değiştirme cihaz güvenilir olmayan bir kaynaktan geliyorsa, orijinalinden daha kötü olabilir.**

BadBox varsayımları değiştiriyor:

- Kapalı kutu güvenlik kanıtı değildir  
- Düşük fiyat paylaşım için yeşil ışık anlamına gelmez  
- Bugün normal çalışan bir cihaz yarın sizi satabilir

BadBox bulaşmış bir cihaz, etkinleşmeden, güncellenmeden veya *gerçekten* verilerinizi isteyen biri için çalışmaya başlamadan önce haftalar veya aylarca sessiz kalabilir.

Evet, 20€ kadar ucuz olabilirler. Evet, bu cazip. Ama mahremiyet ve özerklik daha değerlidir.

### Mağdurlar için pratik adımlar

- Güvenilir, doğrulanabilir kaynaklardan cihazlar kullanın  
- Mümkünse temiz olduğu bilinen modelleri seçin (aşağıdaki tabloya bakın)  
- Bilinmeyen veya hediye edilen cihazlarda hassas hesaplara giriş yapmaktan kaçının  
- Birden fazla cihazınız varsa, yüksek riskli ve düşük riskli aktiviteleri ayırın

## Sığınma evleri için yanıt

Sığınma evleri iki bağlantılı zorlukla karşı karşıya: tehlikeye girmiş cihazların ortama girmesini engellemek ve sızanları tespit etmek.

### Önleme

- Bağışlanan veya satın alınan cihazların kökenini takip edin ve firmware sürümlerini kontrol edin  
- Paylaşımlı kullanım için ucuza Android cihazlar yerine Linux tabanlı dizüstüler veya Linux yüklenmiş yenilenmiş Chromebook'ları tercih edin  
- Kullanım öncesi cihazları kontrol ve hazırlamak için güvenli bir onboarding istasyonu oluşturun  

### BadBox kabul kontrol listesi

**Amaç:** Sığınma evinde kullanılmadan önce tüm gelen Android cihazlarının BadBox riski açısından taranması.

**1. Temel bilgileri kaydedin**
- Cihaz türü (telefon, tablet, TV kutusu, projektör, araç ünitesi, diğer)
- Marka ve model numarası
- Seri numarası / IMEI
- Kaynak (bağış, satın alma, diğer)
- Alınma tarihi

**2. İlk görsel ve paket kontrolü**
- Orijinal perakende ambalajı? Evet / Hayır  
- Müdahale belirtileri? Evet / Hayır  
- Sıradışı veya jenerik marka? Evet / Hayır  

**3. Risk kategorisi**
- Temiz olduğu bilinen model? (Sığınma evinin iç güvenli listesini kontrol edin) Evet / Hayır  
- Riskli/off-brand bilinen model? Evet / Hayır  
- Bilinmeyen? (Yüksek risk olarak değerlendirin)  

**4. Firmware ve Play Protect kontrolü**
- Açın ve hesap kurulumunu atlayın  
- Play Protect sertifikasını kontrol edin (Ayarlar → Hakkında → Google Play sistem güncellemesi veya Play Store → Ayarlar)  
- Firmware sürümünü not edin  
- Güvenli listeyle karşılaştırın

**5. Ağ davranış testi**
- İzole onboarding Wi-Fi'ına bağlanın (üretim ağına değil)  
- PiRogue, Zeek veya Suricata ile 15-30 dakika izleyin  
- Olağandışı giden bağlantılar veya DNS sorguları arayın

**6. Karar**
- **Geçti** → Envantere güvenli etiketiyle ekleyin  
- **Başarısız** → Karantinaya alın veya sorumlu bir şekilde geri dönüştürün  
- **Belirsiz** → Çevrimdışı tutun, teknik desteğe yönlendirin

*(Her cihaz için imzalı kopyalar saklayın. Sonuçları sığınma evi cihaz günlüğünde depolayın.)*

### Tespit

BadBox kısmen tespit edilebilir, ancak firmware seviyesinde değil ve yalnızca ağ veya işletim sisteminde zaten aktifse.

[SIEM yığını (Wazuh + Zeek + Suricata + Sysmon + opsiyonel PiRogue)](docs/lab/on-prem/) ile tespit mümkündür:

- Komuta-kontrol sunucularına, şüpheli alan adlarına veya kötücül yazılım dağıtım noktalarına bağlantılar gibi ağ seviyesi göstergeler  
- Bilinen BadBox altyapısı için Suricata uyarıları  
- Tekrarlanan beaconing modelleri veya şüpheli DNS sorguları gösteren Zeek kayıtları

Not: Komuta-kontrol altyapısı sık değişir. Tespit, tehdit istihbarat beslemelerinin güncel tutulmasına bağlıdır.

## Ne zaman değiştirmeli ve nasıl

Şu durumlarda değiştirin:

- Bir cihaz açıkça tehlikeye girmişse  
- Stalker yazılım kaldırılamıyorsa  
- Kullanan kişi artık kendini güvende hissetmiyorsa  
- Kullanıma devam etmek yasal risk taşıyorsa

Değiştirme yalnızca yeni cihaz güvenilirse güvenlidir.

Cihazları şu kaynaklardan temin edin:

- İyi iade politikaları olan bilinen perakendeciler  
- Firmware seviyesinde sıfırlama yapan sertifikalı yenileme hizmetleri  
- Gizliliğe saygılı işletim sistemleri önyükleyen organizasyonlar  

Veya bütçe izin veriyorsa, kilitli bootloader'lı ve bilinen BadBox vakası olmayan büyük markaların yeni telefonlarını seçin.

| Cihaz türü                                                      | BadBox riski  | Notlar                                               |
|-----------------------------------------------------------------|---------------|------------------------------------------------------|
| Pixel telefonlar (Play Protect sertifikalı)                     | ✅ Düşük       | Araştırmalarda bilinen BadBox vakası yok             |
| Samsung, OnePlus vb. amiral gemisi Android telefonlar           | ✅ Düşük-orta  | Play Protect sertifikalı olmalı                      |
| Off-brand Android telefonlar veya "yenilenmiş" jenerik modeller | ❌ Yüksek      | Birçok doğrulanmış enfeksiyon                        |
| Android TV kutuları, tabletler, projektörler, araç üniteleri    | ❌ Çok yüksek  | Firmware seviyesinde tehlikeye girmiş çoklu modeller |
| iPhone'lar / Apple cihazları                                    | ✅ Uygulanamaz | Tamamen farklı ekosistem                             |

## Son düşünceler

BadBox sadece bir tedarik zinciri kusuru değil. Ambalaja güvenmenin yeterli olmadığının bir hatırlatıcısı. Saldırganlar önceden düşünür; bizim de öyle yapmamız gerekir.

Bir cihazı değiştirmek hala kontrolü yeniden kazanmada kilit bir adım. Artık biliyoruz ki bazı kutular önceden kaybedilmiş olarak geliyor.
