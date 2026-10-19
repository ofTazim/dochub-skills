# 01 · Modül - Özellik Seti

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `01-modul-ozellik-seti.md`.

- **Tip no:** `01` (`dochub.yaml` içinde `tip: "01"`)
- **Varsayılan gizlilik:** İç Kullanım (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Modül - Özellik Seti dokümanı.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. Modül listesi
2. Modül başına özellik tablosu
3. Bağımlılıklar
4. Bu ürün neyi yapmaz

Başlık eşleşmesi büyük/küçük harf duyarsızdır; başlıklar blok içinde (`{% tab %}`, `{% step %}` vb.) olsa bile sayılır.
Kök `README.md` içinde `# ` (H1) başlığı kullanılmaz; sayfa başlığı DocHub'dan gelir.
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler` kullanılır (hepsi isteğe bağlı).

## Şablon

Aşağıdaki iskeleti başlangıç noktası olarak kullanın; `{{Urun}}` yerine `dochub.yaml` içindeki `urun` değerini yazın.

````markdown
> Bu sayfa [kim] için; [hangi soruya] cevap verir.

## Kapsam dışı

## Modül listesi

## Modül başına özellik tablosu

## Bağımlılıklar

## Bu ürün neyi yapmaz
````

## Koddan üretim ipuçları

Bu tip için repo'da şu dosya ve sinyallere bakın:

Bu tip için ipucu tanımlanmamış; tipin amacına ve zorunlu başlıklarına göre kodda kanıt arayın.
