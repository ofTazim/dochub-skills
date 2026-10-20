---
name: dochub-yaz
metadata:
  version: "1.3.0"
description: "DocHub dokümantasyonu yazım kuralları ve desteklenen GitBook blokları başvurusu: hint, tabs, stepper, details, columns, updates, cards, embed, buton, ikon, kod başlığı, include, değişken; başlık ve hassas bilgi kuralları. Kullan: README.md/SUMMARY.md yazarken, blok sözdizimi sorarken, 'nasıl yazmalıyım'. Use when writing or editing documentation pages that DocHub syncs from Git: GitBook markdown blocks, SUMMARY.md grammar, page front matter, writing rules."
---

### Ne zaman kullanılır

Repo'daki bir doküman sayfasını (`README.md`, alt sayfa, `SUMMARY.md`, changelog sayfası) yazarken ya da düzenlerken. Diğer DocHub skill'leri yazım kurallarını bu skill'e başvurarak uygular.

## Ortak ilkeler

* **Gizli bilgi kopyalanmaz.** Parola, token, API anahtarı, bağlantı dizesi, IP adresi içeren dosyaları içeriğe taşımayın; yapılandırma için `.env` yerine `.env.example` kullanın, değerleri `<ornek-deger>` ile gösterin.
* **Künye repo'ya yazılmaz.** Gizlilik, persona, sahip, reviewer, onaylayan DocHub'da yönetilir; sayfa ön maddesine ya da metne yazmayın.
* **Yalnız kodda görüleni yazın.** Teyit edemediğiniz yere `{% hint style="warning" %}` bloğu (açılış, metin ve `{% endhint %}` **ayrı satırlarda**; tek satırda yazmayın) içinde "Doğrulanmalı: …" notu koyun.
* **Onay olmadan dosya oluşturmayın.** Yeni sayfa/klasör ve `SUMMARY.md` değişiklikleri için kullanıcıdan onay alın.

## Hızlı başvuru

### Dosya düzeni

```text
dochub.yaml                 # hangi klasör hangi tip
dochub/
  kurulum-dokumani/
    README.md               # tipin kök dokümanı (zorunlu başlıklar burada)
    SUMMARY.md              # alt sayfa ağacı ve sırası
    ek-sayfa.md
    .kapsam.yaml            # yalnız Kapsamlı tiplerde: kapsama envanteri
    .gitbook/assets/        # yalnız bu klasöre ait görseller (klasör düzeyi)
    .gitbook/includes/      # yalnız bu klasöre ait include'lar
  changelog/
    README.md               # serbest giriş metni; zorunlu başlık yok
    SUMMARY.md
    1.4.0.md                # ön madde: surum, tarih, etiketler
  .gitbook/assets/          # tipler arası ortak görseller
  .gitbook/includes/        # tipler arası ortak include'lar
  .gitbook/vars.yaml        # ortak değişkenler
.gitbook/                   # (eski düzen) depo kökü; hâlâ desteklenir
```

`.gitbook` üç yerde olabilir: **klasör düzeyi** (`<klasör>/.gitbook/…`), **`dochub/.gitbook/`** (ortak; yeni içerik için tercih edin) ve **depo kökü** (`.gitbook/…`). Öncelik klasör düzeyi → `dochub/.gitbook` → kök sırasıdır. Yollar her zaman **sayfaya göredir**; `dochub/kurulum-dokumani/README.md` içinden ortak görsel `../.gitbook/assets/logo.png`, depo kökündeki görsel `../../../.gitbook/assets/logo.png` olur.

`.kapsam.yaml` (Kapsamlı tipler; `dochub-uret` üretir, `dochub-guncelle` günceller) biçimi:

```yaml
# dochub-uret üretir, dochub-guncelle günceller
birimler:
  - ad: Ayarlar ekranı
    kaynak: [web/src/pages/Ayarlar.tsx]
    sayfa: ayarlar.md
    durum: yazildi        # yazildi | eksik | kapsam-disi
    not: ""               # kapsam-disi için gerekçe zorunlu
```
 Başka bir beyan edilmiş klasördeki sayfaya `[metin](../mimari/README.md)` ile bağlanabilirsiniz. Repoda indirilebilir dosya eki (PDF/ZIP) desteklenmez; SharePoint/URL bağlantısı verin.

### Başlık kuralları

* Kök `README.md`'de `# ` (H1) kullanmayın; sayfa başlığı DocHub'dan gelir. Bölümler `## ` ile başlar, alt bölümler `### `.
* Tipin **zorunlu `## ` başlıkları** katalogdaki yazımla ve sırayla bulunmalıdır (`../../shared/tipler/<NN>-<slug>.md`). Blok içindeki `## ` başlıkları (ör. `{% step %}` içinde) da sayılır; bu yüzden zorunlu başlıkla çakışan bir blok başlığı kullanmayın.
* Başlıklarda `/`, `\` ve `#` karakteri olmaz (DocHub reddeder). `SUMMARY.md` bağlantı metinleri ve sürüm sayfası başlığı için de geçerlidir.
* Başlıklar kısa, ad tamlamasıdır: "Kurulum", "Veri modeli". Soru ya da cümle olmaz.
* **İstisna (tip 18, Release Notları):** kök `README.md` serbest bir giriş metnidir; zorunlu başlık aranmaz. Sürüm sayfalarında yalnız `## Sürüm künyesi`, `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler`, `## Bilinen sorunlar` başlıkları kullanılır (her biri isteğe bağlı, boşsa yazılmaz; başka başlık uyarı verir).

### Hassas bilgi kuralı

Varsayılan gizliliği Kısıtlı ya da Açık olan tiplerde DocHub şunları hata sayar: IPv4 adresi (`10.20.30.40`); `password`, `şifre`, `token`, `secret`, `api key` gibi bir anahtar adına atanmış, rakam ya da sembol içeren ≥6 karakterlik değer (`SMTP_SIFRE=...`, `password: ...`), bilinen token biçimleri (GitHub, AWS, JWT, Slack) ve PEM özel anahtar başlığı. Sözcüklerin kendisi serbesttir; "Şifre en az 8 karakter olmalı" ya da tablodaki `SMTP_SIFRE` satırı bulgu değildir. Metinde:

* IP yerine rol/ortam adı: "veritabanı sunucusu (`DB_HOST`)".
* Değişken adını yazın, değeri değil: `SMTP_SIFRE=${SMTP_SIFRE}`, `password: "***"`.
* Gerçek değer asla yazılmaz; örnek gerekiyorsa `<ornek-deger>`.

### Sayfa ön maddesi

Sıradan sayfalarda ön madde gerekmez. Gerekirse yalnız şunlar kullanılır:

```markdown
---
description: "Sayfanın kısa açıklaması"
---
```

* `description` değerini `:` ya da `#` içeriyorsa tırnak içine alın.
* **Changelog sürüm sayfalarında** ön madde zorunludur: `surum`, `tarih` (`YYYY-AA-GG`), isteğe bağlı `etiketler`. Ayrıntı: `../dochub-changelog/SKILL.md`.
* Ön madde dosyanın en başında olmalıdır.
* Künye alanları (persona, gizlilik, sahip, reviewer) ön maddeye yazılmaz.

### `SUMMARY.md` grameri

```markdown
# Table of contents

* [Giriş](README.md)
* [Sayfa A](sayfa-a.md)

## Grup adı

* [Gruptaki sayfa](grup/sayfa.md)
```

* `README.md` ilk satırda, **kardeş** olarak yer alır; diğer sayfalar onun altına girintilenmez.
* `## Grup adı` bir grup açar; grup altındaki sayfalar düz listedir.
* Bir madde tek bağlantıdır; kalın yazı ve açıklama olmaz. Aynı dosya iki kez listelenmez.
* Bir sayfanın başlığını değiştirdiğinizde `SUMMARY.md`'deki bağlantı metnini de güncelleyin.
* Bağlantılar var olan dosyalara göreli yolla işaret eder; olmayan sayfaya bağlanmayın.
* OpenAPI için SUMMARY'de özel blok kullanmayın; bir sayfada spesifikasyon bağlantısı verin (aşağıya bakın).

### Hangi blok ne zaman

| İhtiyaç | Blok | Neden |
|---|---|---|
| Sıralı adımlar | `{% stepper %}` | Adım sırası net |
| Alternatifler (ortam, dil, işletim sistemi) | `{% tabs %}` | Okuyucu seçer, sayfa kalabalıklaşmaz |
| İsteğe bağlı/uzun ayrıntı, SSS | `<details>` | Sayfa taranabilir kalır |
| Uyarı, ipucu, not | `{% hint %}` | `info`, `warning`, `danger`, `success` |
| Yan yana karşılaştırma | `{% columns %}` | En çok iki sütun |
| Tarihli güncellemeler | `{% updates %}` | Zaman çizelgesi |
| Görsel gezinme kartları | `<table data-view="cards">` | Tıklanabilir kart ızgarası |
| Dosya/PDF paylaşımı | Düz bağlantı (SharePoint/URL) | `{% file %}` ile repo eki desteklenmez |
| Eylem çağrısı | `<a class="button">` | Birincil/ikincil düğme |
| Tekrar eden içerik | `{% include %}` | Tek kaynak |
| Dinamik değer | `<code class="expression">` | Değişken değeri |

Tam sözdizimi ve örnekler: `references/bloklar.md`. **Orada olmayan blok ya da HTML kullanmayın.**

### Desteklenmeyenler ve karşılıkları

| İstenen | DocHub'da | Ne yapılır |
|---|---|---|
| `{% openapi %}` bloğu / SUMMARY'de `builtin:openapi` | Bağlantı kartına döner | Spesifikasyon adresine/dosyasına bağlanın; önemli uçları kısa tabloyla özetleyin |
| `<iframe>` ile gömme | Çizilmez | `{% embed url="…" %}` (bağlantı olarak görünür) ya da düz bağlantı |
| Özel HTML/script/stil | Temizlenir | Standart markdown ve listelenen bloklar |
| `{% include %}` ile `.gitbook/includes/` dışı yollar | Çözülmez (yalnız tek ad eşleşmesi aranır) | Yalnız klasör düzeyi, `dochub/.gitbook/includes/` veya kök `.gitbook/includes/` altı; tam yol yazın |
| `{% file %}` ile repo içi PDF/ZIP eki | Aktarılmaz | SharePoint/URL bağlantısı verin |
| Tek satırda `{% hint %}…{% endhint %}` | Çizilir ama önerilmez | Açılış, metin, kapanış ayrı satırlarda |

### Genel yazım ilkeleri

* Okuyucuyu bilin: ürünü ilk kez gören bir mühendis. Önce ne olduğunu/neden gerektiğini, sonra nasılını yazın.
* Kısa paragraflar; aktif cümleler; bir bölüm tek konu.
* Komut ve yol gibi değişmez metinleri `` `kod` `` içinde yazın; çalıştırılacak komutları başlıklı kod bloğuna koyun.
* Bağlantı metni anlamlı olsun ("buraya tıklayın" değil, "Kurulum adımları").
* Görsellere alt metin ekleyin; görselleri `.gitbook/assets/` altında (klasör düzeyi, `dochub/.gitbook/` ya da kök) tutun.
* Tarihler `YYYY-AA-GG`; sürümler `1.4.0` biçiminde; tutarlı terim kullanın.
* Kodda görmediğinizi yazmayın; tahmini bilgi yerine "Doğrulanmalı" hint'i kullanın.

### Tipe özel yazım rehberi

DocHub yönetim ekibinin yazım rehberi: `references/yazim-rehberi.md`. Tipe özel zorunlu başlıklar ve şablonlar: `../../shared/tipler/`.

## Başvuru dosyaları

* `references/bloklar.md` — DocHub'ın desteklediği her bloğun sözdizimi ve örneği. Sayfa yazarken açın.
* `references/yazim-rehberi.md` — DocHub "nasıl yazılır" rehberi.
* `../../shared/dochub-yaml.md` — `dochub.yaml` sözleşmesi ve changelog ön maddesi.

## Sık yapılan hatalar

* Kök README'ye `# Başlık` yazmak.
* Başlıkta `/` ya da `#` kullanmak ("CI/CD" yerine "CI ve CD" ya da "Sürekli Tümleştirme").
* Blokları kapatmayı unutmak (`{% endhint %}`, `{% endtab %}` …).
* Zorunlu başlıkla aynı adı blok içinde yeniden kullanıp sırayı bozmak.
* Gerçek IP/parola/token örneği yazmak.
* Desteklenmeyen bloğu (iframe, OpenAPI bloğu, repo `{% file %}` eki) kullanmak.
