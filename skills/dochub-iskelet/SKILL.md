---
name: dochub-iskelet
metadata:
  version: "1.3.0"
description: "Onaylanan DocHub doküman tipleri için repo'da klasör, README.md (zorunlu başlıklarla), SUMMARY.md ve changelog klasörünü kurar; var olan dosyaların üzerine yazmaz. Kullan: dokümantasyon iskeleti, 'klasörleri oluştur', 'dochub.yaml yaz', README/SUMMARY kurulumu. Use to scaffold DocHub documentation in a repo: create dochub.yaml, folders, README.md with required headings, SUMMARY.md (GitBook table of contents), changelog folder; idempotent."
---

### Ne zaman kullanılır

* `dochub-kesif` sonrası kullanıcı tip listesini ve klasörleri onayladı.
* Kullanıcı hangi tipleri istediğini zaten biliyor ve iskeletin kurulmasını istiyor.

Girdi: onaylı beyan listesi (tip, klasör, `otomatik`, `kaynaklar`) ve `urun` adı. Bunlardan biri eksikse **önce sorun**, tahmin etmeyin.

## Ortak ilkeler

* **Gizli bilgi kopyalanmaz.** Parola, token, API anahtarı, IP adresi içeren hiçbir şeyi şablona ya da örneğe yazmayın; örnek değerler `<ornek-deger>` biçiminde olsun, kaynak olarak `.env.example` gösterilsin.
* **Künye repo'ya yazılmaz.** Gizlilik, persona, sahip, reviewer, onaylayan bilgisi ne `dochub.yaml`'a ne sayfalara girer.
* **Yalnız kodda görüleni yazın.** İskelet bölümlerinin altına, kanıtlanmamış bilgi yerine `{% hint style="warning" %}` bloğu (açılış, metin ve `{% endhint %}` **ayrı satırlarda**; tek satırda yazmayın) içinde "Doğrulanmalı: bu bölüm henüz doldurulmadı." notu yazın.
* **Onaysız dosya oluşturmayın.** Aşağıdaki "Plan ve onay" adımı atlanamaz.

## Adımlar

### 1. Plan ve onay

Yazmadan önce, oluşturulacak ve **dokunulmayacak** dosyaları listeleyin:

```text
Oluşturulacak:
  dochub.yaml
  dochub/kurulum-dokumani/README.md       (tip 07 şablonu, zorunlu başlıklarla)
  dochub/kurulum-dokumani/SUMMARY.md
  dochub/kurulum-dokumani/.kapsam.yaml    (07 Kapsamlı ise: boş envanter iskeleti)
  dochub/changelog/README.md
  dochub/changelog/SUMMARY.md
Zaten var, dokunulmayacak:
  dochub/sistem-dizayn-dokumani/README.md
```

Varsayılan klasörler `dochub/<tip-slug>` ve `dochub/changelog`'dır; `dochub.yaml` repo kökünde kalır. Repo'daki mevcut `docs/` ve kök `changelog/` klasörlerini yeniden kullanmayın; kullanıcı özellikle başka klasör isterse `dochub/` dışı seçimin `dochub-dogrula`'da `klasor-yeri` uyarısı vereceğini söyleyin.

Kullanıcı açıkça onaylamadan hiçbir şey yazmayın. Var olan bir dosya, kullanıcı o dosya için ayrıca söylemedikçe **hiçbir koşulda ezilmez** (idempotent çalışma).

### 2. `dochub.yaml`

* Yoksa oluşturun; varsa yalnız eksik beyanları ekleyin, mevcut girdilerin sırasına ve değerlerine dokunmayın.
* Kurallar (`../../shared/dochub-yaml.md`): `surum: 1`, boş olmayan `urun`, tip numarası tırnaklı iki hane, göreli klasör (`..` yok), bir tip/bir klasör yalnız bir kez, dosya tabanlı tip yok.
* Yazdıktan sonra `dochub-dogrula` çalıştırın (README'ler henüz yoksa yalnız `readme` kuralları kalır; bu beklenen bir durumdur).

### 3. Her beyan için klasör ve `README.md`

1. `../../shared/tipler/<NN>-<slug>.md` dosyasını okuyun; "Şablon" bölümündeki iskeleti alın.
2. `{{Urun}}` yer tutucusunu `urun` değeriyle değiştirin.
3. Klasör yoksa oluşturun; `README.md` yoksa şablonla yazın. Var ise **dokunmayın**; yalnız zorunlu başlıkları eksikse, eksik başlıkları dosyanın sonuna değil, sıraya uygun yere eklemeyi **önerin** ve onay isteyin.
4. Kurallar:
   * Zorunlu `## ` başlıkları şablondaki sırayla yer alır; başlık metni katalogdaki ile aynıdır.
   * Dosyada `# ` (H1) başlığı olmaz; sayfa başlığı DocHub'dan gelir.
   * Her bölümün altı doldurulmamışsa kısa bir "Doğrulanmalı" uyarısı taşır; bunu `dochub-uret` dolduracaktır.
   * Künye alanı (persona, gizlilik, sahip) yazılmaz.

#### Kapsamlı tipler için `.kapsam.yaml`

Tipin dosyasındaki "Derinlik ve kapsama" bölümü **Kapsamlı** ise klasörün içine `.kapsam.yaml` iskeletini yazın (yoksa; varsa dokunmayın). Birimleri `dochub-uret` koddan çıkarıp doldurur; iskelet yalnız başlığı taşır:

```yaml
# dochub-uret üretir, dochub-guncelle günceller
birimler: []
```

Biçim ve alanlar için `../../shared/dochub-yaml.md` "Kapsam envanteri" bölümüne bakın.

### 4. `SUMMARY.md`

GitBook gramerine uyun:

```markdown
# Table of contents

* [Mimari](README.md)
* [Bileşenler](bilesenler.md)

## Veri

* [Veri modeli](veri/model.md)
```

* İlk içerik satırı `README.md` bağlantısıdır; kardeş sayfalar **düz** listelenir, hepsi README'nin altına girintilenmez.
* `## Grup adı` başlıkları gruplar açar; grup adlarını kullanıcıdan alın, klasör adından türetmeyin.
* Her madde tek bağlantıdır; kalın yazı, açıklama, `/ \ #` karakteri içeren başlık olmaz (DocHub başlık kuralı).
* Yalnız **var olan** dosyalara bağlanın. Henüz yazılmamış sayfayı SUMMARY'ye koymayın (`dochub-dogrula` kırık bağlantıyı yakalar).
* Başlangıçta alt sayfa yoksa yalnız `* [Başlık](README.md)` satırı yeterlidir. Alt sayfa gerekiyorsa kullanıcıyla ağaç şeklini önceden netleştirin.
* `SUMMARY.md` zaten varsa üzerine yazmayın; eksik bağlantıları önerin.

### 5. Changelog klasörü (tip 18 beyan edildiyse)

* `README.md`: bu sayfanın sürüm notlarını listelediğini söyleyen kısa bir giriş paragrafı. Changelog kökü **serbest bir giriştir; zorunlu başlık eklemeyin** (tipin katalog başlıkları burada aranmaz).
* `SUMMARY.md`: yalnız `* [Sürüm notları](README.md)`.
* Sürüm sayfaları burada oluşturulmaz; onlar `dochub-changelog` skill'inin işidir.

### 6. Görseller ve ortak içerik (gerekirse)

* Birden çok tipin kullandığı görsel ve include'lar **`dochub/.gitbook/`** altına konur (`dochub/.gitbook/assets/`, `dochub/.gitbook/includes/`, `dochub/.gitbook/vars.yaml`) ve **sayfaya göre** göreli yolla bağlanır: `dochub/kurulum-dokumani/README.md` içinden `../.gitbook/assets/logo.png`. Yalnız tek klasöre ait olanlar `<klasör>/.gitbook/assets/` altında kalır. Depo kökündeki `.gitbook/` hâlâ desteklenir ama yeni içerik için `dochub/.gitbook/` tercih edilir. Çözüm önceliği: klasör düzeyi → `dochub/.gitbook` → kök `.gitbook`.
* Tekrar eden metin için `dochub/.gitbook/includes/<ad>.md` ve sayfadan `{% include "../.gitbook/includes/<ad>.md" %}` (sayfanın derinliğine göre `../`); yalnız tek klasörde kullanılıyorsa `<klasör>/.gitbook/includes/<ad>.md` ve `{% include ".gitbook/includes/<ad>.md" %}`. Değişkenler ilgili `.gitbook/vars.yaml` içinde. Bunları yalnız gerçekten ihtiyaç varsa oluşturun.
* Repo'da indirilebilir dosya eki (`{% file %}`, PDF/ZIP) desteklenmez; SharePoint/URL bağlantısı verin.
* Klasörler arası sayfa bağlantısı (`[Kurulum](../kurulum/README.md)`) desteklenir.

### 7. Doğrula ve raporla

1. `dochub-dogrula` skill'indeki komutu çalıştırın.
2. Kullanıcıya oluşturulan/atlanan dosyaları ve kalan `readme`/`basliklar` bulgularını (varsa) özetleyin.
3. Sonraki adım olarak `dochub-uret` ile içerik üretimini önerin. Commit atmadan önce kullanıcıdan onay alın.

## Sık yapılan hatalar

* Var olan `README.md` ya da `SUMMARY.md`'nin üzerine yazmak.
* README'ye `# Başlık` (H1) eklemek.
* Zorunlu başlıkları şablondan farklı sırada ya da farklı yazımla koymak.
* SUMMARY'de bütün sayfaları README'nin altına girintilemek.
* Henüz var olmayan sayfaya SUMMARY'den bağlanmak.
* Künye bilgisini iskelete yazmak.
