---
title: "Hakkında Yığın"
weight: 1
translationKey: "ipa-siem-stack"
_build:
  render: always
menu:
  sidebar:
    weight: 5
---

IPA‑SIEM Yığını, Wazuh üzerine kurulmuş, samimi partner şiddeti (IPA) yaşayan bireyler için gizli dijital gözetimi tespit edip müdahale etmeye yardımcı olmak amacıyla tasarlanmış açık kaynaklı bir SIEM/XDR siber güvenlik aracıdır. Bu, izinsiz telefon takibi, casus yazılım ve cihaz erişimi gibi tehditleri kapsar. Sistem, savunmasız bireyler için kapsamlı bir dijital koruma yaklaşımı sunar.

## IPA‑SIEM yığınının temel amaçları

Sistem dört ana işlevi yerine getirir. İlk olarak, Windows, macOS, Android ve iOS platformlarındaki cihazlardan adli veri toplayarak potansiyel güvenlik ihlallerini belirlemek üzere günlükler ve artefaktlar elde edilmesini sağlar. İkincisi, tehdit algılama yeteneği, ticari casus yazılımlar (mSpy, FlexiSPY), keylogger'lar ve uzaktan erişim araçları gibi yaygın gözetim araçlarını tanımlamak için önceden yapılandırılmış kuralları kullanır.

Olay müdahalesi için yığın; izole etme, dijital kanıt toplama ve savunucuların güvenli teknolojiye geçişine yardım etmek için otomatik betikler ve net yönergeler sunar. Son olarak, platform, GDPR ve Birleşik Krallık Veri Koruma Yasası ile uyumlu gizlilik merkezli bir tasarımı sürdürerek tüm kullanıcı verilerinin şifrelenmiş ve anonim kalmasını sağlar.

## Sistem nasıl çalışır

IPA‑SIEM Yığını, merkezi bir mimari ile işler. Dedicated bir sunucu veya bulut VM bu yapının temelini oluşturur ve birkaç ana unsuru çalıştırır. Wazuh modülü bağlı cihazları sürekli olarak şüpheli etkinliklere karşı izler; Elasticsearch ve Kibana ise casus yazılım süreçleri veya konum izleme denemeleri gibi güvenlik günlüklerini depolamak ve görselleştirmek için birlikte çalışır. Kurulum, tüm bağımlılıkları ve yapılandırmayı yöneten otomatik `setup.sh` betiği ile kolaylaştırılmıştır.

Cihaz entegrasyonu platforma göre farklılık gösterir. Windows ve macOS sistemler, günlükleri otomatik olarak merkezi sunucuya ileten Wazuh ajanlarını kurabilir. Android cihazlarda, root erişime sahip sistemler Termux üzerinden ajan kurabilir, root’suz cihazlar ise ADB ile manuel günlük toplama gerektirir. iOS desteği şu anda yalnızca Cydia kullanan jailbreak’li cihazlara veya iTunes üzerinden manuel günlük çıkarımına sınırlıdır.

Algılama sistemi, mSpy süreçleri veya yetkisiz konum erişimi denemeleri gibi bilinen tehditleri tanımlayan önceden oluşturulmuş kuralları kullanır. Bu uyarılar Kibana panosunda görüntülenir ve cihazı izole etmek veya GPS ayarlarını sıfırlamak gibi önerilen eylemlerle birlikte sunulur. Tehdit algılandığında olay müdahale protokolleri devreye girer. `quarantine_device.sh` gibi otomatik betikler tehditleri engellemeye yardımcı olurken, kapsamlı rehberler kanıt koruma, yasal raporlama süreçleri ve daha güvenli cihazlara geçiş konusunda destek olur.

## Önemi ve uygulama alanları

Bu çözüm, birkaç nedenle önemlidir. Sığınaklar ve destek kuruluşları için ileri düzey güvenlik araçlarını derin siber güvenlik bilgisi gerektirmeden sunarak teknik olmayan savunucuları güçlendirir. Sistem, güçlü şifreleme, veri anonimleştirme uygulamaları ve delillendirme gereksinimleri ile gizliliği dengeleyen 90 günlük günlük saklama politikası sayesinde yasal ve etik uyumu korur. Wazuh ve Elasticsearch gibi ücretsiz, açık kaynak araçlar üzerine kurulmuş olması, siber güvenlik bütçesi sınırlı kuruluşlar için maliyet açısından etkilidir.

Platform, dijital gözetimden korunması gereken şiddet mağdurları için sığınaklar, kanıt toplamada yardım sağlayan adli destek savunucuları ve koruma/emir davaları hazırlayan hukuk yardımı kuruluşları için idealdir. Proje GPLv3 lisansı altında açık kaynaklıdır ve topluluk katkılarını bekler, ancak kullanıcılar bazı sınırlamalar olduğunu bilmelidir. Android ve iOS desteği, root'suz/jailbreak’li cihazlar için hâlâ sınırlıdır; ancak bu durum ileride değişebilir.
