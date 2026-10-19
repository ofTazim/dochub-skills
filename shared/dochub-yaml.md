# `dochub.yaml` başvurusu

Repo kökündeki `dochub.yaml`, hangi klasörün hangi DocHub doküman tipine karşılık geldiğini beyan eder.
DocHub bu dosyayı okur; geçersizse **hiçbir değişiklik uygulamaz** ve hatayı satır numarasıyla bildirir.

## Örnek

```yaml
surum: 1
urun: AirApi
dokumanlar:
  - tip: "07"
    klasor: docs/kurulum
    otomatik: true
    kaynaklar: [Dockerfile, "docker-compose*.yml", "deploy/k8s/**"]
  - tip: "18"
    klasor: changelog
```

## Alanlar

| Alan | Zorunlu | Kural |
|---|---|---|
| `surum` | evet | Değeri `1` olmalıdır. |
| `urun` | evet | DocHub'daki ürün adı; boş olamaz. |
| `dokumanlar` | evet | En az bir kayıt içeren liste. |
| `dokumanlar[].tip` | evet | İki haneli tip numarası, tırnak içinde (`"07"`). Bilinmeyen ve dosya tabanlı tipler reddedilir; bir tip yalnız bir kez beyan edilir. |
| `dokumanlar[].klasor` | evet | Repo içinde göreli yol (`docs/kurulum`). `..`, mutlak yol ve sürücü harfi yok; aynı klasör iki kez beyan edilemez (büyük/küçük harf duyarsız). |
| `dokumanlar[].otomatik` | hayır | `true` ya da `false`. DocHub'da bilgi amaçlıdır; skill'ler "bu tip kod değişince güncellenmeli mi" için kullanır. |
| `dokumanlar[].kaynaklar` | hayır | Glob listesi (en çok 50). Bu doküman hangi kod dosyalarından üretilir; `dochub-guncelle` değişen dosyaları bununla eşler. |

Dosya en çok 64 KB olabilir.

## Klasör düzeni

- `README.md` → tipin kök dokümanı. Zorunlu başlıklar burada aranır; **istisna: tip 18 (Release Notları) kökü** serbest giriş metnidir, zorunlu başlık aranmaz.
- `SUMMARY.md` → alt sayfa ağacı ve sırası. Yoksa klasör yapısı kullanılır. README ilk satırdadır, kardeş sayfalar düz listelenir.
- Görseller klasör düzeyindeki `<klasör>/.gitbook/assets/` ya da depo kökündeki `.gitbook/assets/` altında; tekrar kullanılan içerik klasör düzeyinde `.gitbook/includes/` (klasör README'sinden `{% include ".gitbook/includes/x.md" %}`) ya da kökte (`{% include "../../.gitbook/includes/x.md" %}`, doğru `../` derinliğiyle); değişkenler `.gitbook/vars.yaml` içindedir. Yollar sayfaya görelidir; çözülemeyen include için DocHub klasör düzeyi + kök `.gitbook/includes/` içinde tekil dosya adı eşleşmesi arar.
- Başka bir beyan edilmiş klasördeki sayfaya `[metin](../kurulum/README.md)` ile bağlanılabilir (düz bağlantı, kart ve buton `href` değerleri DocHub bağlantısına çevrilir).
- Repo içeriğinde `{% file %}` ile dosya eki (PDF/ZIP) desteklenmez; SharePoint/URL bağlantısı verin.
- Hint ve diğer çift etiketli bloklar çok satırlı yazılır (açılış, metin, kapanış ayrı satırlarda).
- Künye bilgileri (persona, gizlilik, sahip, reviewer, onaylayan) repo'da tutulmaz.

## Changelog sürüm sayfası (tip 18)

Her sürüm bir `.md` dosyasıdır ve ön madde içerir:

```markdown
---
surum: 1.4.0
tarih: 2026-10-16
etiketler: [yeni, api]
---
# 1.4.0

## Yenilikler

* …

## Düzeltilen sorunlar

* …
```

`surum` zorunlu, `tarih` `YYYY-AA-GG` ve geçerli bir takvim günü olmalıdır, `etiketler` isteğe bağlı listedir. Sayfa başlığı ilk `# ` satırından alınır.

Sürüm sayfası bölümleri tam olarak `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler` başlıklarıdır (her biri isteğe bağlı; boş bölüm yazılmaz). Changelog zaman çizelgesinde yalnız ön maddesinde `surum` olan sayfalar görünür; `SUMMARY.md` grupları sürüm sayılmaz. Changelog klasörünün `README.md` dosyası serbest bir giriş metnidir.

## Desteklenen tipler

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
