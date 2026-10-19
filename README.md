# DocHub skill paketi

Ürün repo'nuzda **DocHub uyumlu dokümantasyonu** üreten ve güncel tutan skill'ler. Claude Code ve GitHub Copilot ile çalışır.
Bu repo DocHub tarafından üretilir ve yayınlanır; dosyaları elle düzenlemeyin, yapılandırmayı DocHub'dan değiştirin.

- Paket sürümü: `1.1.0`
- Yapılandırma özeti: `494bb6544d50ac6f5c369014fd8ed9a998c6ced94d8a167fd681c2c0afa03df5`
- Kapsanan doküman tipi sayısı: 13

## Nasıl çalışır?

DocHub, repo'nuzun kökündeki `dochub.yaml` dosyasını okur; beyan edilen her klasör bir doküman tipinin kök dokümanıdır
(`README.md`), alt sayfa ağacı `SUMMARY.md` ile belirlenir. Skill'ler bu yapıyı kurar, koddan içerik üretir ve değişiklikten sonra güncel tutar.
Künye bilgileri (persona, gizlilik, sahip, reviewer, onaylayan) repo'da tutulmaz; DocHub'da yönetilir.

## Skill'ler

| Skill | Ne zaman kullanılır |
|---|---|
| `dochub-kesif` | Repo'dan hangi doküman tiplerinin üretilebileceğini kanıt dosyalarıyla bulur, `dochub.yaml` önerir. |
| `dochub-iskelet` | Onaylanan tipler için klasör, `README.md` (zorunlu başlıklarla), `SUMMARY.md` ve changelog klasörünü kurar. |
| `dochub-uret` | Koddan doküman içeriği üretir; şablona ve yazım rehberine uyar. |
| `dochub-guncelle` | Commit/PR farkına göre etkilenen dokümanları bulur ve yalnız ilgili bölümleri günceller. |
| `dochub-changelog` | Son sürümden bu yana yapılan değişikliklerden sürüm sayfası yazar. |
| `dochub-yaz` | Yazım kuralları ve DocHub'ın desteklediği GitBook blokları başvurusu. |
| `dochub-dogrula` | `dochub.yaml`, zorunlu başlıklar, SUMMARY tutarlılığı, hassas bilgi, include/görsel/bağlantı hedefleri ve blok dengesini denetler. |

Önerilen akış: `dochub-kesif` → `dochub-iskelet` → `dochub-uret` → (her değişiklikte) `dochub-guncelle` ve sürümlerde `dochub-changelog`.
Her üretim ve güncelleme `dochub-dogrula` ile biter.

## Kurulum

### Claude Code

```text
/plugin marketplace add ofTazim/dochub-skills
/plugin install dochub@dochub-skills
```

Güncelleme: `/plugin marketplace update dochub-skills`.

### GitHub Copilot

1. `copilot/dochub-skills-guncelle.yml` dosyasını ürün repo'nuzda `.github/workflows/dochub-skills-guncelle.yml` olarak kaydedin.
2. Organizasyon secret'ı `DOCHUB_SKILLS_TOKEN` oluşturun: `ofTazim/dochub-skills` repo'sunu okuyabilen, yalnız "Contents: Read-only" izinli token.
3. Actions'ı elle çalıştırın (`Run workflow`). Action skill'leri `.github/skills/<skill>/` ve ortak dosyaları `.github/shared/` altına kopyalayıp PR açar; sonraki güncellemeler haftalık gelir.

Not: Copilot'un skill klasörünü okuduğu yol (`.github/skills/`) kullandığınız Copilot sürümünde doğrulanmalıdır.

## Doğrulama betiği

```bash
node skills/dochub-dogrula/scripts/dochub-dogrula.mjs .        # insan okunur çıktı
node skills/dochub-dogrula/scripts/dochub-dogrula.mjs . --json # makine okunur çıktı
```

Node 18 veya üstü gerekir; bağımlılık yoktur. Copilot kopyasında yol `.github/skills/dochub-dogrula/scripts/dochub-dogrula.mjs` olur.
Çıkış kodu 0 ise tüm kurallar geçmiştir; CI'da doğrudan kullanılabilir.

## Doküman tipleri

| No | Ad | Amaç | Zorunlu başlıklar | Dosya |
|---|---|---|---|---|
| 01 | Modül - Özellik Seti | Modül - Özellik Seti dokümanı. | Modül listesi, Modül başına özellik tablosu, Bağımlılıklar, Bu ürün neyi yapmaz | shared/tipler/01-modul-ozellik-seti.md |
| 02 | Ürün Geliştirme Dokümanı (FATAD) | Ürün Geliştirme Dokümanı (FATAD) dokümanı. | İş ihtiyacı, Gereksinimler (ID'li), İş kuralları, Kabul kriterleri, Riskler ve açık sorular | shared/tipler/02-urun-gelistirme-dokumani-fatad.md |
| 03 | Sistem Dizayn Dokümanı | Sistem Dizayn Dokümanı dokümanı. | Mimari diyagram, Bileşenler ve sorumlulukları, Veri modeli, Arayüzler, Teknik kararlar | shared/tipler/03-sistem-dizayn-dokumani.md |
| 04 | Topoloji | Topoloji dokümanı. | Ortamlar, Topoloji diyagramı, Sunucu ve servis envanteri, Port matrisi, Yedeklilik | shared/tipler/04-topoloji.md |
| 05 | Test Senaryoları | Test Senaryoları dokümanı. | Test kapsamı, Gereksinim–senaryo eşleşmesi, Senaryo tablosu, Çıkış kriterleri | shared/tipler/05-test-senaryolari.md |
| 06 | Test Otomasyonu Dokümanları | Test Otomasyonu Dokümanları dokümanı. | Otomasyon kapsamı, Repo ve çalıştırma, CI/CD bağlantısı, Senaryo envanteri, Bakım sahibi | shared/tipler/06-test-otomasyonu-dokumanlari.md |
| 07 | Kurulum Dokümanı | Kurulum Dokümanı dokümanı. | Önkoşullar, Kurulum adımları, Konfigürasyon parametreleri, Doğrulama, Geri alma, Sık karşılaşılan hatalar | shared/tipler/07-kurulum-dokumani.md |
| 08 | Kurulum Topolojisi | Kurulum Topolojisi dokümanı. | Dağıtım seçenekleri, Referans diyagram, Bileşen gereksinimleri, Boyutlandırma, Ağ ve port gereksinimleri | shared/tipler/08-kurulum-topolojisi.md |
| 11 | Güvenlik Dokümanları | Güvenlik Dokümanları dokümanı. | Kimlik ve erişim, Veri koruma, Loglama, Açık yönetim süreci, Uyum ve sertifikalar, Sorumluluk paylaşımı | shared/tipler/11-guvenlik-dokumanlari.md |
| 12 | Ürün Roadmapi | Ürün Roadmapi dokümanı. | Şimdi, Sıradaki, Sonra, Bu dönem yapılmayacaklar | shared/tipler/12-urun-roadmapi.md |
| 16 | Entegrasyon Kılavuzu | Entegrasyon Kılavuzu dokümanı. | Hızlı başlangıç, Ortamlar ve kimlik doğrulama, Endpoint tablosu, Hata kodları, Sürümleme | shared/tipler/16-entegrasyon-kilavuzu.md |
| 17 | Kullanım Kılavuzu | Kullanım Kılavuzu dokümanı. | Kimler için, Başlarken, Görev akışları, Hata mesajları, SSS | shared/tipler/17-kullanim-kilavuzu.md |
| 18 | Release Notları | Release Notları dokümanı. | Sürüm künyesi, Yenilikler, Düzeltilen sorunlar, Kırıcı değişiklikler, Bilinen sorunlar | shared/tipler/18-release-notlari.md |

Ayrıntılar: `shared/tipler/`. `dochub.yaml` sözleşmesi: `shared/dochub-yaml.md`.

## Ortak ilkeler

- Gizli bilgi, IP adresi, parola veya token içeren dosyalar içeriğe kopyalanmaz (`.env` yerine `.env.example`).
- Gizlilik, persona, sahip ve reviewer bilgisi repo'ya yazılmaz.
- Yalnız kodda görülen yazılır; emin olunmayan yere `{% hint style="warning" %}` bloğu (açılış, metin ve `{% endhint %}` **ayrı satırlarda**; tek satırda yazmayın) içinde "Doğrulanmalı…" notu konur.
- `dochub.yaml` ve klasörler kullanıcı onayı olmadan oluşturulmaz.
