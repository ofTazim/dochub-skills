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
