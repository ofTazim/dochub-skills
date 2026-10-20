---
name: dochub-uret
metadata:
  version: "1.4.0"
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
* **Onaysız dosya oluşturmayın.** Yeni dosya/klasör gerekiyorsa (`dochub/.gitbook/assets` gibi) önce kullanıcıya sorun; `SUMMARY.md` ve `dochub.yaml` değişikliklerini onaylatın. İstisna: Kapsamlı tipte envanter birimleri için alt sayfa ve `.kapsam.yaml` yazmak üretim onayının parçasıdır.

## Adımlar

### 1. Girdileri yükleyin

1. `dochub.yaml`'ı okuyun; üretilecek beyanı bulun (tip, klasör, `kaynaklar`). Kullanıcı tip belirtmediyse beyan edilenleri listeleyip hangisini istediğini sorun.
2. `../../shared/tipler/<NN>-<slug>.md` dosyasını okuyun: amaç, zorunlu başlıklar, şablon, **derinlik ve kapsama kuralı**, **koddan üretim ipuçları**.
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
* Ayrıntı fazlaysa alt sayfa açın ve `SUMMARY.md`'ye ekleyin. README okuyucuyu yönlendirir (genel bakış, bölümlere ve alt sayfalara bağlantı); ayrıntı alt sayfalarda yazılır ve **atlanmaz**. "Kısa kalsın" diye ayrıntıyı düşürmek yasaktır; derinlik düzeyi için aşağıdaki "Derinlik" bölümüne bakın.

### Derinlik

Tipin dosyasındaki (`../../shared/tipler/<NN>-<slug>.md`) "Derinlik ve kapsama" bölümü hangi düzeyde yazacağınızı ve kapsama kuralını verir. Düzeye göre ilerleyin:

* **Özet:** tek sayfa; yalnız zorunlu başlıklar, her biri kısa ve kanıta dayalı. Alt sayfa açmayın.
* **Standart:** `README.md` + gerektiğinde alt sayfalar. Her zorunlu başlığın altı kodda bulduğunuz somut bilgiyle dolar; konu büyükse alt sayfaya taşınır. Aşağıdaki "Ekonomi" kuralları Standart ve Özet için de geçerlidir.
* **Kapsamlı:** aşağıdaki envanter akışını izleyin. Zorunlu başlıklar yetmez; kapsama kuralındaki **her birim** yazılır, ama her birim aynı ağırlıkta yazılmaz: derinlik birimin karmaşıklığına göre ayarlanır (aşağıda "Birim seviyesi").

**Kapsamlı akış:**

1. **Envanter önce.** Yazmaya başlamadan, kapsama kuralındaki birim tanımına göre (ekran/route, endpoint, parametre, bileşen, varlık, gereksinim vb.) kodu tarayıp birim listesini çıkarın (`git ls-files` + route/endpoint/yapılandırma tanımlarını arama). Listeyi kullanıcıya birim sayısıyla özetleyin.
2. **`.kapsam.yaml` yazın.** `<klasör>/.kapsam.yaml` dosyasına her birimi `kaynak` (birimi tanımlayan kod dosyaları), `seviye` (aşağıda), planlanan `sayfa` ve `durum: eksik` ile ekleyin. Biçim: `../../shared/dochub-yaml.md` "Kapsam envanteri".
3. **Her birimi seviyesine göre yazın.** `ayrintili` birimde kapsama kuralının istediği tüm içeriği, `standart` ve `basit` birimde yalnız o birim için anlamlı olan maddeleri yazın. Bölüm ya da alt sayfa açmak için ayrıca onay gerekmez: iskelet/üretim onayı bunu kapsar (yine de `SUMMARY.md` değişikliğini bildirin). Birim yazıldıkça `.kapsam.yaml`'da `durum: yazildi` yapın. Bir birimi bilerek yazmıyorsanız `durum: kapsam-disi` ve `not` içinde gerekçe yazın; sessizce atlamayın.
4. **Kapsama raporu verin.** Sonda şunu listeleyin: toplam birim; **kapsanan** (`yazildi`), **eksik** (`eksik`) ve **kapsam dışı** (`kapsam-disi`) sayıları; eksik ve kapsam dışı birimlerin adları ve nedenleri. Eksik birim varsa bunun yazılmadığını açıkça söyleyin.

Büyük envanterde (onlarca birim) işi parçalara bölün (ör. ekran grubu başına) ve her parçadan sonra `.kapsam.yaml`'ı güncelleyin; bağlam dolsa bile hangi birimlerin kaldığı dosyada görünsün.

**Birim seviyesi (Kapsamlı tipte, envanterde her birime verilir):**

| Seviye | Ne zaman | Nasıl yazılır | Yaklaşık ölçek |
|---|---|---|---|
| `basit` | Az alan/eylem (≈3'e kadar), rol farkı yok, özel doğrulama ya da hata yok, tek adımlık iş (onay penceresi, salt-okunur liste, tek ayar, varsayılanı olan parametre) | Ortak bir sayfada kısa bölüm ya da tablo satırı; alt sayfa açılmaz | 1–3 cümle ya da bir tablo satırı |
| `standart` | Birkaç alan ve eylem, sınırlı kural | Kendi bölümü; yalnız dolu maddeler (ör. alan tablosu + sonuç) | Kısa bölüm |
| `ayrintili` | Çok alanlı form, rol farkları, doğrulama kuralları, çok adımlı akış, sık hata ya da güvenlik/veri etkisi | Kapsama kuralının tüm içeriği; gerekiyorsa alt sayfa | Birim başına bir sayfa |

Kapsama kuralı "her birim için alt sayfa" dese bile `basit` birimler ortak sayfada toplanır. Emin değilseniz düşük seviyeyi seçin; okuyucu sorusu çıkan birim `dochub-guncelle` ile yükseltilir.

**Ekonomi (token ve okuma süresi):**

* Kendini açıklayanı yazmayın: "Kaydet düğmesi değişiklikleri kaydeder", "Ad alanına ad girilir" gibi cümleler yok. Bir maddenin söyleyecek bir şeyi yoksa ("rol farkı yok", "özel hata yok") maddeyi hiç yazmayın.
* Ortak bilgiyi bir kez yazın ve bağlantı verin: roller ve yetkiler, ortak hata mesajları, ortak alanlar (ör. künye), genel gezinme. Her birimde tekrarlamayın.
* Düzyazı yerine tablo ve kısa madde; bir fikir bir cümle. README'de alt sayfadaki ayrıntıyı tekrarlamayın.
* Görev akışını yalnız `ayrintili` birimlerde ve yalnız gerçekten çok adımlıysa yazın.
* Kodu ekonomik okuyun: yalnız birimin `kaynak` dosyalarını açın; etiket ve mesajları dosyayı baştan sona okumak yerine aramayla (`grep`) bulun; aynı dosyayı tekrar okumayın; benzer birimleri (ör. aynı bileşeni kullanan ekranlar) birlikte işleyin.

**Yüzeysellik kalıpları (yasak):**

* Bir ekranı, endpoint'i ya da parametreyi yalnız adıyla anmak (içeriği, alanları, sonucu yazmadan).
* Tam listeyi vermek yerine "vb.", "gibi", "ve benzeri" yazmak. Liste kodda sonluysa tamamını yazın.
* Arayüz metinlerini özetlemek. Etiketleri, buton adlarını, uyarı ve hata mesajlarını koddan (kaynak ya da yerelleştirme dosyası) **aynen** alıp tırnak içinde ya da tabloda verin.
* `ayrintili` bir birimde kapsama kuralının istediği bir alt başlığı (alan tablosu, hata kodları, örnek istek vb.) bilinçsizce atlamak.

### 4. Blokları ve örnekleri kullanın

* Sıralı kurulum adımları → `{% stepper %}`; alternatifler (ortam, dil) → `{% tabs %}`; uyarılar → `{% hint %}`; uzun/isteğe bağlı ayrıntı → `<details>`. Tüm sözdizimi `../dochub-yaz/references/bloklar.md` içindedir. Yalnız DocHub'ın desteklediği blokları kullanın.
* **Kod örnekleri gerçek dosyalardan** alınır: komutu `Dockerfile`, `package.json` betikleri, `Makefile`, CI dosyası vb.'den kopyalayın; uydurmayın. Başlıklı kod bloğu kullanın (`{% code title="docker-compose.yml" %}`).
* Yapılandırma anahtarı tablosu için kaynak: `appsettings.json`, `.env.example`, şema dosyaları. Gerçek değer yerine `<ornek-deger>`.
* Mimari/akış anlatımında önce metin yazın; diyagram gerekiyorsa Mermaid yerine adım listesi ya da tablo tercih edin (DocHub bloğu bunlardır).
* OpenAPI/Swagger bloğu DocHub'da bağlantı kartına dönüşür; yöntem sayfası kopyalamak yerine spesifikasyon dosyasına/adresine bağlanın ve önemli uçları kısa tabloyla özetleyin.
* Görseller `.gitbook/assets/` altından (klasör düzeyi, `dochub/.gitbook/assets/` ya da depo kökü; ör. `dochub/kurulum-dokumani/README.md` içinden `../.gitbook/assets/x.png`) sayfaya göre göreli yolla; alt metin zorunlu. Repo'da indirilebilir dosya eki (`{% file %}`, PDF/ZIP) desteklenmez; SharePoint/URL bağlantısı verin. Başka bir beyan edilmiş klasördeki sayfaya `[metin](../mimari/README.md)` ile bağlanabilirsiniz.

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

`../dochub-dogrula/SKILL.md`'deki komutu çalıştırın. Çıkan hataları düzeltin ve **yeşil olana kadar** tekrarlayın. Kapsamlı tipte `kapsam` uyarılarını da (eksik birim, eksik sayfa, eskimiş kaynak) giderin ya da gerekçesiyle bırakın. Kullanıcıya şunu raporlayın: hangi dosyalar yazıldı, hangi bölümler kanıta dayalı, hangileri "Doğrulanmalı" bıraktı; Kapsamlı tipte kapsama raporu (kapsanan / eksik / kapsam dışı sayıları). Commit atmadan önce onay alın.

## Sık yapılan hatalar

* Zorunlu başlığı yeniden adlandırmak ya da sırasını değiştirmek (DocHub kontrolü kalır).
* Koddan teyit etmeden "genellikle", "muhtemelen" cümleleri yazmak.
* Gerçek IP, parola, token ya da bağlantı dizesi örneği vermek.
* Komut ve yapılandırma örneğini kaynak dosyalara bakmadan uydurmak.
* Desteklenmeyen blok/HTML (iframe, özel script) kullanmak.
* Künye bilgisi (sahip, persona, gizlilik) yazmak.
* Doğrulamayı atlamak.
* Kapsamlı tipte envanter çıkarmadan yazmaya başlamak ya da birimleri adıyla geçip içeriğini yazmamak.
* README'yi "kısa kalsın" diye ayrıntısız bırakıp alt sayfaları hiç yazmamak.
