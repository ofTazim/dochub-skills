---
name: dochub-uret
metadata:
  version: "1.1.0"
description: "Koddan DocHub doküman içeriği üretir: tip şablonunu ve zorunlu başlıkları sırayla doldurur, GitBook bloklarını kullanır, kod örneklerini gerçek dosyalardan alır, emin olunmayan yere 'Doğrulanmalı' notu koyar, sonunda doğrular. Kullan: 'dokümanı yaz', 'README'yi doldur', kurulum/mimari/API/güvenlik dokümantasyonu üretimi. Use to generate DocHub documentation content from source code (architecture, deployment, API reference, security, tests), following the type template and writing guide."
---

### Ne zaman kullanılır

* İskelet kurulu (`dochub-iskelet`), bölümler henüz boş ya da "Doğrulanmalı" notlu.
* Kullanıcı belirli bir tipin (ör. 07 · Kurulum) içeriğini koddan yazdırmak istiyor.
* Yeni bir modül/servis eklendi ve alt sayfa yazılacak.

## Ortak ilkeler

* **Gizli bilgi kopyalanmaz.** Parola, token, API anahtarı, bağlantı dizesi, IP adresi ya da özel anahtar içeren dosyalardan içerik almayın. Yapılandırma örneği gerekirse `.env.example` / `appsettings.json` gibi örnek dosyaları kullanın ve değerleri `<ornek-deger>` ile gösterin. Kodda gördüğünüz gerçek bir sır/IP'yi yazmayın; kullanıcıyı uyarın.
* **Künye repo'ya yazılmaz.** Gizlilik, persona, sahip, reviewer, onaylayan bilgisi DocHub'dadır; içeriğe yazmayın.
* **Yalnız kodda görüleni yazın.** Her cümlenin kodda/yapılandırmada bir karşılığı olmalı. Kanıtlayamadığınız yere `{% hint style="warning" %}` bloğu (açılış, metin ve `{% endhint %}` **ayrı satırlarda**; tek satırda yazmayın) içinde "Doğrulanmalı: …" notu koyun; tahmin, varsayım ve "genellikle şöyledir" cümleleri yazmayın.
* **Onaysız dosya oluşturmayın.** Yeni dosya/klasör gerekiyorsa (alt sayfa, `.gitbook/assets`) önce kullanıcıya sorun; `SUMMARY.md` ve `dochub.yaml` değişikliklerini onaylatın.

## Adımlar

### 1. Girdileri yükleyin

1. `dochub.yaml`'ı okuyun; üretilecek beyanı bulun (tip, klasör, `kaynaklar`). Kullanıcı tip belirtmediyse beyan edilenleri listeleyip hangisini istediğini sorun.
2. `../../shared/tipler/<NN>-<slug>.md` dosyasını okuyun: amaç, zorunlu başlıklar, şablon, **koddan üretim ipuçları**.
3. `../dochub-yaz/SKILL.md` ve gerekirse `../dochub-yaz/references/bloklar.md`'yi okuyun; yazım ve blok kuralları bunlardır.
4. Klasördeki mevcut `README.md` ve `SUMMARY.md`'yi okuyun; var olan içeriği koruyun.

### 2. Kaynakları toplayın

* `kaynaklar` glob'larının eşleştiği dosyaları listeleyin (`git ls-files` + desen). Boşsa tipin kod ipuçlarından kendiniz arayın ve bulduklarınızı kullanıcıya bildirin.
* Dosyaları **tamamen** okuyun; yalnız başlığa bakıp çıkarım yapmayın. Çok büyük dosyada ilgili kısımları bulun (`grep`) ve o bölgeyi okuyun.
* Gizli içerikli dosyaları (bkz. ilkeler) atlayın ve atladığınızı not edin.
* Bulgularınızı önce kısa bir notla özetleyin: "Şu dosyalardan şunları çıkardım, şu başlıklar için kanıt yok".

### 3. Bölümleri sırayla doldurun

* Zorunlu `## ` başlıklarını şablondaki **sırayla** ve katalogdaki yazımla bırakın; yeniden adlandırmayın, silmeyin, sıralarını değiştirmeyin. Ek başlıklar zorunluların arasına girebilir.
* README'de `# ` (H1) kullanmayın; sayfa başlığı DocHub'dan gelir. (Tip 18 changelog kökü serbest giriştir; zorunlu başlık aranmaz.) Alt sayfalarda başlık `SUMMARY.md` bağlantı metninden ve ilk `#` satırından gelir (alt sayfalarda `# Başlık` yazılabilir).
* Başlıklarda `/ \ #` karakteri kullanmayın.
* Her bölümde önce bir iki cümlelik özet, sonra ayrıntı yazın. Okuyucu hedefi: ürünü ilk kez gören bir mühendis.
* Ayrıntı fazlaysa alt sayfa açın (kullanıcı onayıyla) ve `SUMMARY.md`'ye ekleyin; ana README kısa ve yönlendirici kalsın.

### 4. Blokları ve örnekleri kullanın

* Sıralı kurulum adımları → `{% stepper %}`; alternatifler (ortam, dil) → `{% tabs %}`; uyarılar → `{% hint %}`; uzun/isteğe bağlı ayrıntı → `<details>`. Tüm sözdizimi `../dochub-yaz/references/bloklar.md` içindedir. Yalnız DocHub'ın desteklediği blokları kullanın.
* **Kod örnekleri gerçek dosyalardan** alınır: komutu `Dockerfile`, `package.json` betikleri, `Makefile`, CI dosyası vb.'den kopyalayın; uydurmayın. Başlıklı kod bloğu kullanın (`{% code title="docker-compose.yml" %}`).
* Yapılandırma anahtarı tablosu için kaynak: `appsettings.json`, `.env.example`, şema dosyaları. Gerçek değer yerine `<ornek-deger>`.
* Mimari/akış anlatımında önce metin yazın; diyagram gerekiyorsa Mermaid yerine adım listesi ya da tablo tercih edin (DocHub bloğu bunlardır).
* OpenAPI/Swagger bloğu DocHub'da bağlantı kartına dönüşür; yöntem sayfası kopyalamak yerine spesifikasyon dosyasına/adresine bağlanın ve önemli uçları kısa tabloyla özetleyin.
* Görseller `.gitbook/assets/` altından (klasör düzeyi ya da depo kökü) sayfaya göre göreli yolla; alt metin zorunlu. Repo'da indirilebilir dosya eki (`{% file %}`, PDF/ZIP) desteklenmez; SharePoint/URL bağlantısı verin. Başka bir beyan edilmiş klasördeki sayfaya `[metin](../mimari/README.md)` ile bağlanabilirsiniz.

### 5. Belirsizlik ve boşluklar

* Kanıt yoksa bölümü boş bırakmayın, silmeyin; şunu yazın:

  ```markdown
  {% hint style="warning" %}
  Doğrulanmalı: Ölçekleme ayarları repo'da bulunamadı; dağıtım ekibiyle teyit edin.
  {% endhint %}
  ```
* Kodda çelişen iki bilgi varsa ikisini de kaynak dosya yoluyla belirtin ve "Doğrulanmalı" ekleyin.
* Eskiyen/çürümüş görünen yapılandırmayı (kullanılmayan servis vb.) sessizce atlamayın; not düşün.

### 6. Hassas bilgi taraması (elle)

Yazdığınız metinde şunlar **olmamalıdır**: IPv4 adresleri (`10.0.0.5`) ve gerçek gizli değerler: `password`, `şifre`, `token`, `secret` gibi bir anahtara atanmış değer, bilinen token biçimleri, PEM özel anahtar başlığı (özellikle Kısıtlı/Açık gizlilikli tiplerde DocHub bunları hata sayar). Sözcükleri ve değişken adlarını (`SMTP_SIFRE`) serbestçe yazabilirsiniz; değer gerekiyorsa yer tutucu kullanın (`SMTP_SIFRE=${SMTP_SIFRE}`), sunucu adresi için ortam değişkeni (`DB_HOST`).

### 7. Doğrulayın

`../dochub-dogrula/SKILL.md`'deki komutu çalıştırın. Çıkan hataları düzeltin ve **yeşil olana kadar** tekrarlayın. Kullanıcıya şunu raporlayın: hangi dosyalar yazıldı, hangi bölümler kanıta dayalı, hangileri "Doğrulanmalı" bıraktı. Commit atmadan önce onay alın.

## Sık yapılan hatalar

* Zorunlu başlığı yeniden adlandırmak ya da sırasını değiştirmek (DocHub kontrolü kalır).
* Koddan teyit etmeden "genellikle", "muhtemelen" cümleleri yazmak.
* Gerçek IP, parola, token ya da bağlantı dizesi örneği vermek.
* Komut ve yapılandırma örneğini kaynak dosyalara bakmadan uydurmak.
* Desteklenmeyen blok/HTML (iframe, özel script) kullanmak.
* Künye bilgisi (sahip, persona, gizlilik) yazmak.
* Doğrulamayı atlamak.
