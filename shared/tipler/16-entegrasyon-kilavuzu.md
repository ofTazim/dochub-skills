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
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Sürüm künyesi`, `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler`, `## Bilinen sorunlar` kullanılır (hepsi isteğe bağlı).

## Derinlik ve kapsama

- **Derinlik:** Kapsamlı
- **Kapsama kuralı:** Birim: her dış API endpoint'i (route tanımları/OpenAPI) ve her entegrasyon sözleşmesi (webhook, dosya biçimi). Her endpoint için: yöntem ve yol, yetki, parametreler/gövde alanları tablosu, örnek istek ve yanıt, hata kodları, sınırlar. Alan bazında gruplanmış alt sayfalar.

Derinlik, ne kadar ayrıntı yazılacağını belirler (ölçüt kelime sayısı değil, kapsamadır):

- **Özet:** tek sayfa; yalnız zorunlu başlıklar, her biri kısa ve kanıta dayalı. Alt sayfa açılmaz.
- **Standart:** `README.md` + gerektiğinde alt sayfalar; her zorunlu başlığın altı koddaki somut bilgiyle dolar.
- **Kapsamlı:** önce koddan kapsama kuralındaki birimlerin envanteri çıkarılır ve `<klasör>/.kapsam.yaml` olarak yazılır; **her birim** için kuralın istediği içerik bölüm ya da alt sayfa olarak yazılır (ayrıca onay gerekmez); sonda kapsama raporu verilir (kapsanan / eksik / kapsam dışı). Birimi yalnız adıyla anmak, "vb./gibi" ile listeyi kısaltmak ve arayüz metinlerini özetlemek yasaktır; etiket ve mesajlar koddan aynen alınır. README yönlendirir, ayrıntı alt sayfalardadır ve atlanmaz.

Kapsama kuralı yoksa birim tanımı için aşağıdaki "Koddan üretim ipuçları"nı kullanın.

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
