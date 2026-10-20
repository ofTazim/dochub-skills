---
name: dochub-guncelle
metadata:
  version: "1.3.0"
description: "Commit/PR farkına (git diff) göre dochub.yaml kaynaklar eşlemesiyle etkilenen DocHub dokümanlarını bulur ve yalnız ilgili bölümleri günceller; gerekirse changelog önerir, sonunda doğrular. Kullan: 'kod değişti dokümanı güncelle', PR sonrası dokümantasyon bakımı, drift kontrolü. Use to keep DocHub documentation up to date after code changes: map git diff to documents via dochub.yaml sources globs, update only affected sections, suggest changelog entry, validate."
---

### Ne zaman kullanılır

* Bir commit/PR birleşti ya da hazırlanıyor; ilgili dokümanlar eskimiş olabilir.
* Kullanıcı "son değişikliklerden etkilenen dokümanlar hangileri?" diye soruyor.
* Periyodik bakım: son etiketten bu yana yapılan değişikliklerle dokümanları karşılaştırmak.

## Ortak ilkeler

* **Gizli bilgi kopyalanmaz.** Fark içinde parola, token, anahtar ya da IP görürseniz dokümana taşımayın; kullanıcıya bildirin. Yapılandırma örnekleri `.env.example` benzeri dosyalardan alınır.
* **Künye repo'ya yazılmaz.** Gizlilik, persona, sahip, reviewer, onaylayan bilgisini içeriğe eklemeyin ve değiştirmeyin.
* **Yalnız kodda görüleni yazın.** Farkın niyetini tahmin etmeyin; commit mesajı belirsizse kodu okuyun, yine de emin olamazsanız `{% hint style="warning" %}` bloğu (açılış, metin ve `{% endhint %}` **ayrı satırlarda**; tek satırda yazmayın) içinde "Doğrulanmalı: …" notu ekleyin.
* **Onay olmadan genişletmeyin.** Yalnız etkilenen bölümleri değiştirin; yeni dosya/klasör, `dochub.yaml` ya da `SUMMARY.md` değişikliği için önce kullanıcıdan onay alın.

## Adımlar

### 1. Farkı belirleyin

Kullanıcının verdiği aralığı kullanın; vermediyse sorun ya da şu sırayla seçin:

| Durum | Komut |
|---|---|
| Son commit | `git diff --name-status HEAD~1 HEAD` |
| PR tabanına göre | `git diff --name-status origin/<taban>...HEAD` |
| Son etiketten beri | `git diff --name-status $(git describe --tags --abbrev=0)..HEAD` |
| Verilen aralık | `git diff --name-status <a>..<b>` |

Yalnız dosya adlarıyla yetinmeyin; etkilenen dosyalar için `git diff <aralık> -- <dosya>` ile içeriğe bakın. Eklenen/silinen/yeniden adlandırılan dosyaları ayrı not edin. Gizli içerikli dosyaların (bkz. ilkeler) farkını okumayın.

### 2. Dosyaları dokümanlara eşleyin

1. `dochub.yaml`'daki her beyan için `kaynaklar` glob'larını değişen dosyalara uygulayın (`**` alt klasörleri kapsar; `docker-compose*.yml` gibi desenleri dikkate alın).
2. Hiçbir `kaynaklar` ile eşleşmeyen ama tipin kod ipuçlarına uyan dosyalar için `../../shared/tipler/<NN>-<slug>.md` içindeki "Koddan üretim ipuçları"na bakın.
3. Hiçbir beyanla ilgisiz değişiklikleri (yalnız test düzeltmesi, biçimlendirme) "etkisiz" diye listeleyin.
4. `otomatik: false` olan beyanları **güncellemeyin**, yalnız "etkilenmiş olabilir" diye raporlayın.

Çıktı olarak tablo verin:

| Doküman (klasör) | Değişen kaynak dosyalar | Etkilenen bölümler | Eylem |
|---|---|---|---|
| `dochub/kurulum-dokumani` | `Dockerfile` | Kurulum, Yapılandırma | Güncelle |
| `dochub/sistem-dizayn-dokumani` | `src/Data/Migrations/…` | Veri Modeli | Güncelle |

### 3. Onay

Tabloyu kullanıcıya gösterin ve güncellemeye başlamadan onay alın. Kullanıcı bazı satırları çıkarabilir.

### 4. Yalnız ilgili bölümleri güncelleyin

* Etkilenen **bölümü** (`## ` başlığı altındaki metni) bulun; yalnız onu düzenleyin. Dokümanın geri kalanını, başlık sırasını ve bölüm adlarını olduğu gibi bırakın.
* Eski ifadeyi silmeden önce kodda gerçekten kalktığını doğrulayın; kaldırılan özelliği "kaldırıldı" diye değil, dokümandan çıkararak ve gerekiyorsa changelog'a yazarak yansıtın.
* Yeni bir bileşen eklendiyse ilgili bölüme ekleyin; bölüm yoksa zorunlu başlık değildir, kullanıcıya yeni başlık/alt sayfa açmayı önerin.
* Kod örneklerini yeniden gerçek dosyalardan alın (`../dochub-yaz/SKILL.md` kuralları).
* Zorunlu başlıkları silmeyin; kanıt kaybolduysa bölümü "Doğrulanmalı" notuyla işaretleyin.
* Güncellemeyi bilgi güncelliği için de kontrol edin: sürüm numaraları, port, komut, ortam değişkeni adı.

#### Kapsamlı tiplerde `.kapsam.yaml` bakımı

Tipin dosyasındaki "Derinlik ve kapsama" bölümü **Kapsamlı** ise (envanter biçimi: `../../shared/dochub-yaml.md` "Kapsam envanteri"), bölüm güncellemesine ek olarak klasördeki `.kapsam.yaml`'ı da güncelleyin:

* **Yeni ya da değişen kaynak** kapsama kuralındaki birim tanımına uyuyorsa (yeni ekran/route, endpoint, parametre, bileşen, varlık vb.) envantere birim ekleyin (`kaynak`, `sayfa`) ve **o birimin içeriğini tipin derinliğinde** yazın: kapsama kuralının istediği tüm içerik, gerçek etiket/mesaj metinleri, tam listeler. Sadece `.kapsam.yaml`'a satır ekleyip sayfayı boş bırakmayın (`durum: eksik` yalnız bilerek ertelenen birimler içindir).
* **Mevcut birimin kaynağı** değiştiyse sayfayı güncelleyin, taşındı/yeniden adlandırıldıysa `kaynak` yolunu düzeltin.
* **Silinen ya da taşınan kaynak:** birimin başka kaynağı kalmadıysa birimi `durum: kapsam-disi` + `not: "Kaynak kaldırıldı: <yol>"` ile işaretleyin ya da sayfasıyla birlikte kaldırmayı kullanıcıya önerin; sessizce silmeyin.
* Güncelleme sonunda `.kapsam.yaml` ile sayfaları karşılaştırın: `sayfa`'sı olmayan ya da `kaynak`'ı artık var olmayan birim bırakmayın.

### 5. Changelog gereksinimi

Değişiklik kullanıcıya görünür davranışı etkiliyorsa (yeni özellik, düzeltme, kırıcı değişiklik) `../dochub-changelog/SKILL.md` ile sürüm notu yazmayı **önerin** (kendiniz başlatmayın, sürüm sayfası için kullanıcıdan sürüm numarasını alın).

### 6. Doğrulayın ve raporlayın

1. `../dochub-dogrula/SKILL.md`'deki komutu çalıştırın; hataları düzeltin.
2. Kullanıcıya: hangi dokümanlar/bölümler güncellendi, hangileri `otomatik: false` olduğu için atlandı, hangileri "Doğrulanmalı" bıraktı.
3. Commit atmadan önce onay alın; mesajda hangi dokümanların güncellendiğini yazın.

## Sık yapılan hatalar

* Farkın tamamına bakmadan dosya adından çıkarım yapmak.
* Etkilenmeyen bölümleri "iyileştirme" amacıyla yeniden yazmak.
* Zorunlu başlığı silmek ya da yeniden adlandırmak.
* `otomatik: false` beyanı otomatik güncellemek.
* Kaldırılan bir şeyi koddan teyit etmeden dokümandan silmek.
* Fark içinde gördüğü gizli bilgiyi dokümana taşımak.
