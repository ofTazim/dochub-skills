# 16 · Entegrasyon Kılavuzu

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `16-entegrasyon-kilavuzu.md`.

- **Tip no:** `16` (`dochub.yaml` içinde `tip: "16"`)
- **Varsayılan gizlilik:** Kısıtlı (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Ürünün API'sine bağlanmak isteyen müşteri geliştiricisi ve partner için hızlı başlangıcı, ortamları ve kimlik doğrulamayı, endpoint tablosunu, hata kodlarını ve sürümlemeyi anlatır. Örneklerde gerçek parola, token ve IP adresi yerine yer tutucu kullanılır; iç mimari ve kurulum ayrıntısı içermez.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. Hızlı başlangıç
2. Ortamlar ve kimlik doğrulama
3. Endpoint tablosu
4. Hata kodları
5. Sürümleme

Başlık eşleşmesi büyük/küçük harf duyarsızdır; başlıklar blok içinde (`{% tab %}`, `{% step %}` vb.) olsa bile sayılır.
Kök `README.md` içinde `# ` (H1) başlığı kullanılmaz; sayfa başlığı DocHub'dan gelir.
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler` kullanılır (hepsi isteğe bağlı).

## Şablon

Aşağıdaki iskeleti başlangıç noktası olarak kullanın; `{{Urun}}` yerine `dochub.yaml` içindeki `urun` değerini yazın.

````markdown
> Bu sayfa [kim] için; [hangi soruya] cevap verir.

## Kapsam dışı

## Hızlı başlangıç

## Ortamlar ve kimlik doğrulama

## Endpoint tablosu

## Hata kodları

## Sürümleme
````

## Koddan üretim ipuçları

Bu tip için repo'da şu dosya ve sinyallere bakın:

- OpenAPI/Swagger tanımları (openapi.json, swagger.yaml)
- Controller ve endpoint tanımları (route'lar, HTTP metotları)
- İstemci SDK'ları ve örnek çağrılar
- Hata kodları ve hata modeli (ProblemDetails, error enum'ları)
