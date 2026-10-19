---
name: dochub-kesif
metadata:
  version: "1.2.0"
description: "Repo'yu tarayıp koddan üretilebilecek DocHub doküman tiplerini kanıt dosyalarıyla listeler ve dochub.yaml önerir; onay olmadan dosya yazmaz. Kullan: dokümantasyona yeni başlarken, 'hangi dokümanları yazabiliriz', 'repo'yu incele', 'dochub.yaml oluştur' denince. Use for DocHub documentation discovery: scan a repository, detect which document types (architecture, deployment, security, API, tests, release notes) can be generated from code, propose dochub.yaml."
---

### Ne zaman kullanılır

* Repo'da henüz `dochub.yaml` yok ve hangi dokümanların koddan çıkarılabileceği bilinmiyor.
* Var olan `dochub.yaml` eskidi; repo büyüdü, yeni tipler eklenebilir mi bakılacak.
* Kullanıcı "bu repo için dokümantasyon planı" istiyor.

Bu skill **yalnız okur ve önerir**. Dosya yazmak `dochub-iskelet` skill'inin işidir ve kullanıcı onayı gerektirir.

## Ortak ilkeler

* **Gizli bilgi kopyalanmaz.** Parola, token, API anahtarı, IP adresi veya özel anahtar içeren dosyaları (`.env`, `*.pem`, `secrets.*`, `appsettings.Production.json`) kanıt olarak okuyup içeriğini rapora taşımayın; `.env.example` gibi örnek dosyaları kanıt gösterin.
* **Künye repo'ya yazılmaz.** Gizlilik, persona, sahip, reviewer ve onaylayan bilgisi DocHub'da yönetilir; öneride de yer almaz.
* **Yalnız kodda görüleni yazın.** Kanıt yoksa tipi önermeyin; belirsiz yere `{% hint style="warning" %}` bloğu (açılış, metin ve `{% endhint %}` **ayrı satırlarda**; tek satırda yazmayın) içinde "Doğrulanmalı: …" notu notu düşülür.
* **Onaysız dosya oluşturmayın.** Önce planı gösterin, kullanıcı açıkça onaylamadan hiçbir dosya ya da klasör yazmayın.

## Adımlar

### 1. Katalog ve mevcut durum

1. `../../shared/katalog.json` dosyasını okuyun: `tipler` listesi koddan üretilebilen (repo'ya uygun) tiplerin numarasını, adını, amacını, zorunlu başlıklarını ve `kodIpuclari` alanını verir. `dosyaTabanliTipler` listesindeki tipler repo'dan beslenemez; **bunları asla önermeyin**.
2. Repo kökünde `dochub.yaml` var mı bakın. Varsa içeriğini okuyun ve 5. adımdaki fark akışını izleyin.
3. `git rev-parse --show-toplevel` ile repo kökünü doğrulayın; alt klasörde çalışıyorsanız kullanıcıya hangi kökün esas alınacağını söyleyin.

### 2. Dil ve çatı tespiti

Kök ve ilk iki seviyedeki dosyalara bakın; bulduklarınızı kısa bir listeyle özetleyin.

| Sinyal | Çıkarım |
|---|---|
| `*.sln`, `*.csproj`, `Directory.Build.props` | .NET; proje yapısı ve bağımlılıklar |
| `package.json`, `tsconfig.json`, `vite.config.*`, `next.config.*` | Node/TypeScript; betikler ve bağımlılıklar |
| `pom.xml`, `build.gradle*` | Java/Kotlin |
| `pyproject.toml`, `requirements*.txt` | Python |
| `go.mod`, `Cargo.toml` | Go, Rust |
| `Dockerfile`, `docker-compose*.yml`, `deploy/`, `k8s/`, `charts/` | Konteyner ve dağıtım |
| `.github/workflows/`, `azure-pipelines.yml`, `.gitlab-ci.yml` | CI/CD |
| `openapi.*`, `swagger.*` | API sözleşmesi |

Büyük repo'larda (`node_modules`, `bin`, `obj`, `dist`, `vendor`, `.git` hariç) tüm ağacı okumayın; önce dosya adı deseniyle arayın (`git ls-files` ile), sonra yalnız eşleşenlerin başına bakın.

### 3. Her tip için kanıt arama

Katalogdaki **her tip için** `kodIpuclari` metnini okuyun ve repo'da karşılığını arayın. Başlangıç noktaları:

* Dockerfile/compose/k8s/Helm → kurulum ve dağıtım, altyapı topolojisi
* OpenAPI/controller/endpoint tanımları → API başvurusu
* Modül yapısı, veri modeli, migration'lar → mimari ve tasarım
* Kimlik doğrulama, yetkilendirme, loglama, şifreleme → güvenlik
* Test projeleri, CI pipeline → test
* Git etiketleri ve commit geçmişi → release notları (changelog)

Her tip için güveni şöyle belirleyin:

* **Yüksek:** ipuçlarının çoğu için somut dosya var ve zorunlu başlıkların büyük kısmı bu dosyalardan doldurulabilir.
* **Orta:** bazı sinyaller var, bazı başlıklar için kanıt yok (bunlar "Doğrulanmalı" olarak kalır).
* **Düşük:** yalnız dolaylı sinyal var. Düşük güvenli tipleri tabloda gösterin ama `dochub.yaml` önerisine **varsayılan olarak almayın**; kullanıcı isterse eklenir.

Hiç kanıt bulunamayan tipi listelemeyin (isterseniz tablonun altında tek satırda "kanıt bulunamadı: …" diye sayın).

### 4. Rapor ve öneri

Önce şu tabloyu verin:

| Tip | Ad | Güven | Kanıt dosyaları | Önerilen klasör |
|---|---|---|---|---|
| 07 | … | Yüksek | `Dockerfile`, `docker-compose.yml` | `docs/kurulum` |

Kurallar:

* Klasör önerileri repo'nun mevcut düzenine uysun (zaten `docs/` varsa onu kullanın); yol göreli olmalı, `..` ve mutlak yol olmamalı, aynı klasör iki tipe verilmemeli.
* Bir tip yalnız bir klasörden beslenir; aynı tipi iki kez önermeyin.
* Changelog (tip 18) için git etiketi ya da sürüm geçmişi varsa `changelog` klasörünü önerin.
* Her satırda kanıt dosyalarını **yol olarak** yazın; dosya içeriğini (özellikle yapılandırma dosyalarını) rapora kopyalamayın.

Ardından önerilen `dochub.yaml` taslağını verin:

```yaml
surum: 1
urun: <Ürün adı>
dokumanlar:
  - tip: "07"
    klasor: docs/kurulum
    otomatik: true
    kaynaklar: [Dockerfile, "docker-compose*.yml", "deploy/k8s/**"]
```

* `urun` değerini kullanıcıya sorun; tahmin etmeyin (DocHub'daki ürün adıyla birebir eşleşmesi gerekir).
* `kaynaklar`, tipin kanıt dosyalarından türetilen glob listesidir (en çok 50 öğe). `otomatik: true`, kod değişince bu dokümanın güncellenmesi beklenen tipler içindir.
* Tip numaraları tırnak içinde yazılır (`"07"`).

### 5. Var olan `dochub.yaml` varsa fark önerisi

Dosyayı sıfırdan yazmayın; farkı gösterin:

* **Eklenebilecek tipler:** repo'da kanıtı olup beyanda olmayanlar.
* **Dikkat edilecekler:** beyan edilmiş ama klasörü/`README.md`'si olmayan tipler; `kaynaklar` glob'ları artık hiçbir dosyayla eşleşmeyenler.
* **Dokunulmayacaklar:** kullanıcının elle seçtiği klasör adları ve `otomatik` değerleri.

### 6. Onay kapısı

Raporun sonunda şunu sorun ve **cevabı bekleyin**:

> Bu öneriyle devam edelim mi? Hangi tipleri alalım/çıkaralım, klasör adlarını değiştirmek ister misiniz, `urun` adı doğru mu?

* Kullanıcı onaylamadan `dochub.yaml` ya da klasör **yazmayın**.
* Onay gelince `dochub-iskelet` skill'ine geçin; onaylanan listeyi ona aktarın.
* Çıktıyı doğrulamak için taslağı geçici olarak yazmak gerekirse, bunu da kullanıcıya söyleyip onay alın ve `dochub-dogrula` ile denetleyin.

## Sık yapılan hatalar

* Dosya tabanlı tipi (katalogdaki `dosyaTabanliTipler`) önermek.
* Kanıt göstermeden tip önermek ya da kanıt dosyasının içeriğini rapora yapıştırmak.
* `.env`, anahtar dosyaları ve üretim yapılandırmalarını kanıt diye açmak.
* Künye bilgisini (gizlilik, persona, sahip) öneriye eklemek.
* Onay beklemeden `dochub.yaml` yazmak.

## Başvurular

* Tip ayrıntıları: `../../shared/tipler/`
* `dochub.yaml` sözleşmesi: `../../shared/dochub-yaml.md`
* Sonraki adım: `../dochub-iskelet/SKILL.md`
