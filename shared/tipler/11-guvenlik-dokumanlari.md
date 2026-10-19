# 11 · Güvenlik Dokümanları

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `11-guvenlik-dokumanlari.md`.

- **Tip no:** `11` (`dochub.yaml` içinde `tip: "11"`)
- **Varsayılan gizlilik:** Kısıtlı (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Güvenlik Dokümanları dokümanı.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. Kimlik ve erişim
2. Veri koruma
3. Loglama
4. Açık yönetim süreci
5. Uyum ve sertifikalar
6. Sorumluluk paylaşımı

Başlık eşleşmesi büyük/küçük harf duyarsızdır; başlıklar blok içinde (`{% tab %}`, `{% step %}` vb.) olsa bile sayılır.
Kök `README.md` içinde `# ` (H1) başlığı kullanılmaz; sayfa başlığı DocHub'dan gelir.
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler` kullanılır (hepsi isteğe bağlı).

## Şablon

Aşağıdaki iskeleti başlangıç noktası olarak kullanın; `{{Urun}}` yerine `dochub.yaml` içindeki `urun` değerini yazın.

````markdown
> Bu sayfa [kim] için; [hangi soruya] cevap verir.

## Kapsam dışı

## Kimlik ve erişim

## Veri koruma

## Loglama

## Açık yönetim süreci

## Uyum ve sertifikalar

## Sorumluluk paylaşımı
````

## Koddan üretim ipuçları

Bu tip için repo'da şu dosya ve sinyallere bakın:

- Kimlik doğrulama / yetkilendirme middleware'leri ve politikaları (auth, JWT, OIDC, rol/policy tanımları)
- Şifreleme ve anahtar yönetimi (veri koruma, TLS ayarları; anahtar/parola değerlerini yazma)
- Loglama ve maskeleme ayarları
- Güvenlik başlıkları, CORS, rate limit yapılandırması
