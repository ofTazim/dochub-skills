---
name: dochub-changelog
metadata:
  version: "1.4.0"
description: "DocHub dokümantasyonu için son sürüm etiketinden bu yana commit ve PR başlıklarından changelog sürüm sayfası yazar (ön madde surum/tarih/etiketler; Yenilikler, Düzeltilen sorunlar, Kırıcı değişiklikler) ve SUMMARY.md'ye ekler. Kullan: 'sürüm notu yaz', 'release notes', changelog, 'yeni sürüm yayınlıyoruz'. Use to write a DocHub documentation changelog / release notes page from git history since the last tag, with front matter (surum, tarih YYYY-MM-DD, etiketler) and SUMMARY.md update."
---

### Ne zaman kullanılır

* Yeni sürüm yayınlanıyor ya da yayınlandı; kullanıcı sürüm notu istiyor.
* `dochub-guncelle` değişikliğin kullanıcıya görünür olduğunu söyledi.
* `dochub.yaml` içinde **tip 18 · Release Notları** beyan edilmiş olmalı; edilmemişse önce `dochub-iskelet` ile eklenmesini önerin.

## Ortak ilkeler

* **Gizli bilgi kopyalanmaz.** Commit mesajlarında geçen parola, token, IP, dahili adres ya da müşteri verisini sürüm notuna taşımayın; ifadeyi genelleştirin. Yapılandırma örneği gerekiyorsa `.env.example` kaynaklı olsun.
* **Künye repo'ya yazılmaz.** Gizlilik, persona, sahip, reviewer bilgisi sürüm sayfasına girmez. Kişi adı/e-postası yazmayın (commit yazarlarını listelemeyin).
* **Yalnız kodda görüleni yazın.** Her madde bir commit/PR/diff'e dayanır. Commit mesajından niyet anlaşılmıyorsa değişikliğe bakın; yine belirsizse `{% hint style="warning" %}` bloğu (açılış, metin ve `{% endhint %}` **ayrı satırlarda**; tek satırda yazmayın) içinde "Doğrulanmalı: …" notu ekleyin ya da maddeyi kullanıcıya sorun.
* **Onaysız dosya oluşturmayın.** Sürüm numarası, tarih ve madde listesi onaylanmadan dosya yazmayın.

## Adımlar

### 1. Aralığı belirleyin

```bash
git describe --tags --abbrev=0        # son etiket
git log --no-merges --format='%h %s' <son-etiket>..HEAD
git log --merges --format='%h %s' <son-etiket>..HEAD   # PR birleştirmeleri
```

* Etiket yoksa kullanıcıya hangi commit/tarihten başlanacağını sorun; tüm geçmişi tahmin etmeyin.
* `gh` varsa birleşen PR başlıklarını da kullanın: `gh pr list --state merged --search "merged:>=<tarih>" --json number,title,labels`.
* Dosya farkına bakın (`git diff --stat <son-etiket>..HEAD`); commit mesajı ile gerçek değişiklik uyuşmuyorsa gerçeği esas alın.

### 2. Sürüm numarası ve tarih

* Sürüm numarasını kullanıcıdan alın (öneri: kırıcı değişiklik varsa ana sürümü, yenilik varsa ikincil sürümü, yalnız düzeltme varsa yama sürümünü artırın; ama karar kullanıcıdadır).
* Changelog zaman çizelgesinde **yalnız ön maddesinde `surum` olan sayfalar** sürüm olarak görünür; `SUMMARY.md` grupları (`## Grup`) hiçbir zaman sürüm sayılmaz. Changelog klasörünün `README.md` dosyası serbest bir giriş metnidir (zorunlu başlık yoktur); sürüm sayfası değildir.
* Tarih `YYYY-AA-GG` ve geçerli bir takvim günü olmalıdır (`2026-10-16`). `15.10.2026` ya da `2026-13-01` gibi geçersiz tarih DocHub'da **reddedilmez, yok sayılır**: sürüm yayın/senkron tarihiyle kaydedilir ve sürüm sıralaması değişir. Doğrulama betiği bunu `changelog-onmadde` hatası olarak bildirir.
* Sayfanın H1 başlığı, `SUMMARY.md`'deki bağlantı metniyle **aynı** olmalıdır; DocHub'da başlık `SUMMARY.md`'den gelir.
* Dosya yolu: `<changelog klasörü>/<surum>.md` (ör. `dochub/changelog/1.4.0.md`). Klasör `dochub.yaml`'daki tip 18 beyanından gelir. Aynı dosya varsa üzerine yazmayın; kullanıcıya sorun.

### 3. Commit'leri sınıflandırın

| Bölüm | Neler girer |
|---|---|
| **Yenilikler** | Yeni özellik, yeni uç/ayar, iyileştirme (`feat`, "ekle", "destek") |
| **Düzeltilen sorunlar** | Hata düzeltmeleri (`fix`, "düzelt") |
| **Kırıcı değişiklikler** | Geriye uyumsuz değişiklik: kaldırılan uç/alan/ayar, davranış değişikliği (`!`, `BREAKING`) ve **ne yapılması gerektiği** |

* **Önerilen başlıklar** `Yenilikler`, `Düzeltilen sorunlar`, `Kırıcı değişiklikler` (üçü de isteğe bağlı); `Sürüm künyesi` ve `Bilinen sorunlar` da isteğe bağlı olarak kullanılabilir. Başka `## ` başlığı hata değildir ama `dochub-dogrula` uyarı verir. **Boş bölüm yazılmaz:** hiç düzeltme yoksa "Düzeltilen sorunlar" başlığı olmaz.
* İç işler (yalnız test, biçimlendirme, bağımlılık güncellemesi, CI) kullanıcıyı ilgilendirmiyorsa atlayın; güvenlik açısından önemli bağımlılık güncellemesi ise "Düzeltilen sorunlar"a girer.
* Maddeleri kullanıcı diliyle, geniş zamanda ya da yalın fiille yazın: "Bilet iptal ucu eklendi." Commit karmasını, PR numarasını ve yazar adını maddeye eklemeyin (isterseniz PR numarası parantez içinde olabilir: `(#142)`).
* Kırıcı maddede geçiş adımını verin: "`/v1/bilet` ucu kaldırıldı; `/v2/bilet` kullanın."

### 4. Sürüm sayfasını yazın

```markdown
---
surum: 1.4.0
tarih: 2026-10-16
etiketler: [yeni, api]
---
# 1.4.0

Kısa özet cümlesi (isteğe bağlı): Bu sürüm bilet iptalini ve saat dilimi düzeltmelerini getirir.

## Yenilikler

* Bilet iptal ucu eklendi.

## Düzeltilen sorunlar

* Saat dilimi dönüşümü düzeltildi.

## Kırıcı değişiklikler

* `/v1/bilet` ucu kaldırıldı; `/v2/bilet` kullanın.
```

* Ön madde **dosyanın en başında** durur; `surum` zorunlu, `tarih` zorunlu ve biçimli, `etiketler` isteğe bağlıdır (`[yeni, duzeltme, kirici]` gibi kısa, küçük harfli sözcükler).
* Başlık ilk `# ` satırıdır ve `/ \ #` karakteri içermez (DocHub kuralı); genellikle sürüm numarasıdır.
* Gizli bilgi taraması geçerli olabilir (Açık gizlilik): IP adresi ve gerçek gizli değer (örn. `password: <değer>`, token, özel anahtar) yazmayın; sözcüklerin kendisi serbesttir.
* İstenirse zengin biçim: önemli bir sürümde `{% hint style="warning" %}` ile geçiş uyarısı.

### 5. `SUMMARY.md`

Sürümü listenin **en üstüne** (README satırından hemen sonra) ekleyin; en yeni sürüm en üstte durur:

```markdown
# Table of contents

* [Sürüm notları](README.md)
* [1.4.0](1.4.0.md)
* [1.3.0](1.3.0.md)
```

Mevcut sıralamayı bozmayın; `SUMMARY.md` yoksa oluşturmak için onay isteyin.

### 6. Onay, doğrulama

1. Taslağı (sürüm, tarih, maddeler) kullanıcıya gösterin; onaydan sonra dosyaları yazın.
2. `../dochub-dogrula/SKILL.md`'deki komutla doğrulayın (`changelog-onmadde`, `changelog-baslik`, `baslik-karakter`, `summary` kuralları).
3. Commit/etiket atmadan önce onay alın; etiketi kendiniz oluşturmayın.

## Sık yapılan hatalar

* Tarihi `GG.AA.YYYY` ya da geçersiz gün olarak yazmak (sıralama bozulur).
* H1 başlığını SUMMARY bağlantı metninden farklı yazmak.
* Ön maddeyi dosyanın başından başka yere koymak, `surum` alanını unutmak.
* Boş bölüm bırakmak ya da başlığı "Düzeltmeler" gibi standart dışı yazmak (önerilen: Yenilikler, Düzeltilen sorunlar, Kırıcı değişiklikler).
* Commit mesajlarını olduğu gibi yapıştırmak (karma, yazar, iç jargon, gizli bilgi).
* `SUMMARY.md`'de yeni sürümü en alta eklemek.
* Kırıcı değişikliği geçiş adımı vermeden yazmak.
