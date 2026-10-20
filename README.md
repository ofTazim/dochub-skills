# DocHub skill paketi

Ürün repo'nuzda **DocHub uyumlu dokümantasyonu** üreten ve güncel tutan skill'ler. Claude Code ve GitHub Copilot ile çalışır.
Bu repo DocHub tarafından üretilir ve yayınlanır; dosyaları elle düzenlemeyin, yapılandırmayı DocHub'dan değiştirin.

- Paket sürümü: `1.4.0`
- Yapılandırma özeti: `d6799594edab12509d85ec5c3685d48f263093b6acf6667b90fcae9b9300f743`
- Kapsanan doküman tipi sayısı: 13

## Nasıl çalışır?

DocHub, repo'nuzun kökündeki `dochub.yaml` dosyasını okur; beyan edilen her klasör bir doküman tipinin kök dokümanıdır
(`README.md`), alt sayfa ağacı `SUMMARY.md` ile belirlenir.
Skill'ler içeriği `dochub/<tip-slug>/` ve `dochub/changelog/` altına yazar (mevcut `docs/` ve diğer doküman araçlarıyla çakışmaz); `dochub.yaml` repo kökünde kalır, ortak görsel ve include'lar `dochub/.gitbook/` altındadır. Her tipin bir **derinliği** vardır (Özet, Standart, Kapsamlı); Kapsamlı tiplerde (ör. Kullanım Kılavuzu) skill'ler önce koddan bir kapsama envanteri (`.kapsam.yaml`) çıkarır, her birimi yazar ve sonunda kapsama raporu verir. Skill'ler bu yapıyı kurar, koddan içerik üretir ve değişiklikten sonra güncel tutar.
Künye bilgileri (persona, gizlilik, sahip, reviewer, onaylayan) repo'da tutulmaz; DocHub'da yönetilir.

## Skill'ler

| Skill | Ne zaman kullanılır |
|---|---|
| `dochub-kesif` | Repo'dan hangi doküman tiplerinin üretilebileceğini kanıt dosyalarıyla ve derinliğiyle bulur, `dochub.yaml` önerir (`dochub/<tip-slug>` klasörleriyle). |
| `dochub-iskelet` | Onaylanan tipler için `dochub/` altında klasör, `README.md` (zorunlu başlıklarla), `SUMMARY.md`, changelog klasörünü ve Kapsamlı tiplerde `.kapsam.yaml` iskeletini kurar. |
| `dochub-uret` | Koddan doküman içeriği üretir; şablona, yazım rehberine ve tipin derinliğine uyar (Kapsamlı tipte envanter + kapsama raporu). |
| `dochub-guncelle` | Commit/PR farkına göre etkilenen dokümanları bulur ve yalnız ilgili bölümleri günceller; `.kapsam.yaml` envanterini sürdürür. |
| `dochub-changelog` | Son sürümden bu yana yapılan değişikliklerden sürüm sayfası yazar. |
| `dochub-yaz` | Yazım kuralları ve DocHub'ın desteklediği GitBook blokları başvurusu. |
| `dochub-dogrula` | `dochub.yaml`, zorunlu başlıklar, SUMMARY tutarlılığı, hassas bilgi, include/görsel/bağlantı hedefleri, blok dengesini, kapsama envanterini (`kapsam`) ve klasör konumunu (`klasor-yeri`) denetler. |

Önerilen akış: `dochub-kesif` → `dochub-iskelet` → `dochub-uret` → (her değişiklikte) `dochub-guncelle` ve sürümlerde `dochub-changelog`.
Her üretim ve güncelleme `dochub-dogrula` ile biter.

## Başlarken (ürün ekibi)

1. Plugin'i kurun (aşağıdaki **Kurulum**; ekip için `.claude/settings.json` önerilir).
2. Repo'da Claude Code'a "dokümantasyona başlayalım" deyin: `dochub-kesif` önerisini (tip, derinlik, `dochub/<tip-slug>` klasörleri) onaylayın, `dochub-iskelet` ve `dochub-uret` dokümanları `dochub/` altına yazar. Kapsamlı tiplerde `dochub-uret` önce envanteri çıkarır; sonunda kapsama raporuna (kapsanan / eksik / kapsam dışı) bakın.
3. `dochub.yaml` içindeki `urun` adının DocHub'daki ürün adıyla birebir aynı olduğunu kontrol edin, değişikliği PR ile ana dala alın.
4. DocHub yöneticisinden repo'nun GitHub App kurulumuna eklenmesini ve ürün sayfasında **GitHub bağlantısı**nın açılmasını isteyin. Dokümanlar taslak olarak gelir; künyeyi DocHub'da doldurup onaya gönderin.

## Dokümanları güncel tutma

Ürün repo'nuzun kökündeki `CLAUDE.md` dosyasına (Copilot için `.github/copilot-instructions.md`) şu kuralı ekleyin; asistan her işte dokümanları kodla birlikte günceller:

```markdown
## Dokümantasyon (DocHub)

Kod değiştiren her iş PR açılmadan önce:
1. `dochub-guncelle` ile dalın ana dala göre farkından etkilenen dokümanları güncelle.
2. Kullanıcıya görünür değişiklikse `dochub-changelog` ile sürüm sayfası ekle.
3. `dochub-dogrula` hatasız geçmeli (`kapsam` ve `klasor-yeri` uyarılarına da bakın); doküman değişiklikleri kodla aynı PR'a girer.
```

## Kurulum

### Claude Code

```text
/plugin marketplace add ofTazim/dochub-skills
/plugin install dochub@dochub-skills
```

Güncelleme: `/plugin marketplace update dochub-skills`.

**Ekip için önerilen:** aşağıdaki dosyayı ürün repo'nuza `.claude/settings.json` olarak bir kez commit'leyin. Repo'yu Claude Code'da açan herkese plugin'i kurması önerilir; kimsenin komut çalıştırması gerekmez.

```json
{
  "extraKnownMarketplaces": {
    "dochub-skills": { "source": { "source": "github", "repo": "ofTazim/dochub-skills" } }
  },
  "enabledPlugins": { "dochub@dochub-skills": true }
}
```

Plugin, `ofTazim/dochub-skills` repo'sunu okuyabilen her geliştiricinin kendi git kimliğiyle indirilir.

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
Çıkış kodu 0 ise tüm kurallar geçmiştir; CI'da doğrudan kullanılabilir. Uyarılar (`[UYARI]`: `kapsam`, `klasor-yeri`, `changelog-baslik`) çıkış kodunu etkilemez.

## Doküman tipleri

| No | Ad | Amaç | Zorunlu başlıklar | Dosya |
|---|---|---|---|---|
| 01 | Modül - Özellik Seti | Ürünün modüllerini ve her modülün sunduğu özellikleri, bağımlılıklarıyla birlikte ve ürünün neyi yapmadığını da belirterek anlatır; ürün yöneticileri, satış ve ortaklar için hazırlanır. Teknik tasarım, kurulum ya da test ayrıntısı ile künye bilgisi (sahip, persona, gizlilik) içermez. | Modül listesi, Modül başına özellik tablosu, Bağımlılıklar, Bu ürün neyi yapmaz | shared/tipler/01-modul-ozellik-seti.md |
| 02 | Ürün Geliştirme Dokümanı (FATAD) | Özelliğin iş ihtiyacını, gereksinimlerini, kabul kriterlerini ve risklerini yazılımcı, analist ve test mühendisi için toplar. Gereksinimler ID'li (ör. `GRK-01`) ve test edilebilir yazılır; örnek: "Yanıt süresi 2 saniyenin altında olmalıdır", "Sistem hızlı olmalıdır" değil. Mimari ve künye içermez. | İş ihtiyacı, Gereksinimler (ID'li), İş kuralları, Kabul kriterleri, Riskler ve açık sorular | shared/tipler/02-urun-gelistirme-dokumani-fatad.md |
| 03 | Sistem Dizayn Dokümanı | Sistemin mimarisini, bileşenlerini ve sorumluluklarını, veri modelini, arayüzlerini ve alınan teknik kararları yazılımcı, analist ve test mühendisine anlatır. Gereksinim listesi, kurulum adımı ya da ortam envanteri içermez; bunlar FATAD, Kurulum ve Topoloji dokümanlarında yer alır. | Mimari diyagram, Bileşenler ve sorumlulukları, Veri modeli, Arayüzler, Teknik kararlar | shared/tipler/03-sistem-dizayn-dokumani.md |
| 04 | Topoloji | Ortamları, sunucu ve servis envanterini, port matrisini ve yedeklilik yapısını topoloji diyagramıyla yazılımcı ve mimarlar için gösterir. Kurulum adımı, boyutlandırma rehberi ya da gerçek parola ve IP adresi içermez; künye bilgisi yan panelde tutulur. | Ortamlar, Topoloji diyagramı, Sunucu ve servis envanteri, Port matrisi, Yedeklilik | shared/tipler/04-topoloji.md |
| 05 | Test Senaryoları | Test kapsamını, gereksinim ile senaryo eşleşmesini, senaryo tablosunu ve çıkış kriterlerini test mühendisleri için yazar. Gereksinimin kendisini ya da otomasyon kodunun ayrıntısını içermez; her senaryo bir gereksinime bağlanır. | Test kapsamı, Gereksinim–senaryo eşleşmesi, Senaryo tablosu, Çıkış kriterleri | shared/tipler/05-test-senaryolari.md |
| 06 | Test Otomasyonu Dokümanları | Otomasyonun kapsamını, repo ve çalıştırma bilgisini, CI/CD bağlantısını, senaryo envanterini ve bakım sahibini test mühendisleri için anlatır. Manuel test senaryolarını ya da gerçek kimlik bilgilerini içermez; gizli değerler için değişken adı veya yer tutucu kullanılır. | Otomasyon kapsamı, Repo ve çalıştırma, CI/CD bağlantısı, Senaryo envanteri, Bakım sahibi | shared/tipler/06-test-otomasyonu-dokumanlari.md |
| 07 | Kurulum Dokümanı | Ürünün kurulumunu önkoşullar, sıralı adımlar, parametreler, doğrulama, geri alma ve sık hatalarla DevOps ekibi için anlatır. Gerçek parola, token ve IP adresi yazılmaz; değişken adı ya da yer tutucu kullanılır. Mimari gerekçe ve boyutlandırma Sistem Dizayn ile Kurulum Topolojisi dokümanlarındadır. | Önkoşullar, Kurulum adımları, Konfigürasyon parametreleri, Doğrulama, Geri alma, Sık karşılaşılan hatalar | shared/tipler/07-kurulum-dokumani.md |
| 08 | Kurulum Topolojisi | Desteklenen dağıtım seçeneklerini, referans diyagramı, bileşen gereksinimlerini, boyutlandırmayı ve ağ ile port gereksinimlerini DevOps ekibi için özetler. Adım adım kurulum talimatı ya da gerçek IP adresi içermez; kurulum adımları Kurulum Dokümanı'ndadır. | Dağıtım seçenekleri, Referans diyagram, Bileşen gereksinimleri, Boyutlandırma, Ağ ve port gereksinimleri | shared/tipler/08-kurulum-topolojisi.md |
| 11 | Güvenlik Dokümanları | Ürünün kimlik ve erişim, veri koruma, loglama, açık yönetim süreci, uyum ve sertifikalar ile sorumluluk paylaşımı konularını güvenlik ekibi ve müşteri güvenlik ekipleri için açıklar. Gerçek parola, anahtar ve IP adresi içermez; tarama raporlarının ayrıntısı DAST ve SAST özetlerinde tutulur. | Kimlik ve erişim, Veri koruma, Loglama, Açık yönetim süreci, Uyum ve sertifikalar, Sorumluluk paylaşımı | shared/tipler/11-guvenlik-dokumanlari.md |
| 12 | Ürün Roadmapi | Ürünün Şimdi, Sıradaki ve Sonra başlıkları altındaki planını ve bu dönem yapılmayacakları ürün yöneticileri ile satış için yazar. Tarih taahhüdü, teknik tasarım ya da sürüm notu içermez; gerçekleşen değişiklikler Release Notları'nda yer alır. | Şimdi, Sıradaki, Sonra, Bu dönem yapılmayacaklar | shared/tipler/12-urun-roadmapi.md |
| 16 | Entegrasyon Kılavuzu | Ürünün API'sine bağlanmak isteyen müşteri geliştiricisi ve partner için hızlı başlangıcı, ortamları ve kimlik doğrulamayı, endpoint tablosunu, hata kodlarını ve sürümlemeyi anlatır. Örneklerde gerçek parola, token ve IP adresi yerine yer tutucu kullanılır; iç mimari ve kurulum ayrıntısı içermez. | Hızlı başlangıç, Ortamlar ve kimlik doğrulama, Endpoint tablosu, Hata kodları, Sürümleme | shared/tipler/16-entegrasyon-kilavuzu.md |
| 17 | Kullanım Kılavuzu | Son kullanıcının ürünü kullanmasını sağlar: kimler için olduğunu, başlarken adımlarını, görev akışlarını, hata mesajlarını ve sık sorulan soruları anlatır. Teknik tasarım, kurulum ya da yönetici konfigürasyonu içermez; uzun kılavuzlar modül başına alt sayfalara bölünür. | Kimler için, Başlarken, Görev akışları, Hata mesajları, SSS | shared/tipler/17-kullanim-kilavuzu.md |
| 18 | Release Notları | Bir sürümde gelen yenilikleri, düzeltilen sorunları, kırıcı değişiklikleri ve bilinen sorunları müşteri ve satış için duyurur. Plan ya da roadmap maddesi, iç teknik tartışma ve gizli bilgi içermez; her madde kullanıcıya etkisi açısından yazılır. | Sürüm künyesi, Yenilikler, Düzeltilen sorunlar, Kırıcı değişiklikler, Bilinen sorunlar | shared/tipler/18-release-notlari.md |

Ayrıntılar (derinlik ve kapsama kuralı dahil): `shared/tipler/`. `dochub.yaml` sözleşmesi ve `.kapsam.yaml` biçimi: `shared/dochub-yaml.md`.

## Ortak ilkeler

- Gizli bilgi, IP adresi, parola veya token içeren dosyalar içeriğe kopyalanmaz (`.env` yerine `.env.example`).
- Gizlilik, persona, sahip ve reviewer bilgisi repo'ya yazılmaz.
- Yalnız kodda görülen yazılır; emin olunmayan yere `{% hint style="warning" %}` bloğu (açılış, metin ve `{% endhint %}` **ayrı satırlarda**; tek satırda yazmayın) içinde "Doğrulanmalı…" notu konur.
- `dochub.yaml` ve klasörler kullanıcı onayı olmadan oluşturulmaz.
