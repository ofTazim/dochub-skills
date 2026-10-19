# 02 · Ürün Geliştirme Dokümanı (FATAD)

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `02-urun-gelistirme-dokumani-fatad.md`.

- **Tip no:** `02` (`dochub.yaml` içinde `tip: "02"`)
- **Varsayılan gizlilik:** Gizli (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Ürün Geliştirme Dokümanı (FATAD) dokümanı.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. İş ihtiyacı
2. Gereksinimler (ID'li)
3. İş kuralları
4. Kabul kriterleri
5. Riskler ve açık sorular

Başlık eşleşmesi büyük/küçük harf duyarsızdır; başlıklar blok içinde (`{% tab %}`, `{% step %}` vb.) olsa bile sayılır.
Kök `README.md` içinde `# ` (H1) başlığı kullanılmaz; sayfa başlığı DocHub'dan gelir.
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler` kullanılır (hepsi isteğe bağlı).

## Şablon

Aşağıdaki iskeleti başlangıç noktası olarak kullanın; `{{Urun}}` yerine `dochub.yaml` içindeki `urun` değerini yazın.

````markdown
> Bu sayfa [kim] için; [hangi soruya] cevap verir.

## Kapsam dışı

## İş ihtiyacı

## Gereksinimler (ID'li)

## İş kuralları

## Kabul kriterleri

## Riskler ve açık sorular
````

## Koddan üretim ipuçları

Bu tip için repo'da şu dosya ve sinyallere bakın:

Bu tip için ipucu tanımlanmamış; tipin amacına ve zorunlu başlıklarına göre kodda kanıt arayın.
