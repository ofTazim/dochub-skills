# 12 · Ürün Roadmapi

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `12-urun-roadmapi.md`.

- **Tip no:** `12` (`dochub.yaml` içinde `tip: "12"`)
- **Varsayılan gizlilik:** Kısıtlı (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Ürünün Şimdi, Sıradaki ve Sonra başlıkları altındaki planını ve bu dönem yapılmayacakları ürün yöneticileri ile satış için yazar. Tarih taahhüdü, teknik tasarım ya da sürüm notu içermez; gerçekleşen değişiklikler Release Notları'nda yer alır.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. Şimdi
2. Sıradaki
3. Sonra
4. Bu dönem yapılmayacaklar

Başlık eşleşmesi büyük/küçük harf duyarsızdır; başlıklar blok içinde (`{% tab %}`, `{% step %}` vb.) olsa bile sayılır.
Kök `README.md` içinde `# ` (H1) başlığı kullanılmaz; sayfa başlığı DocHub'dan gelir.
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler` kullanılır (hepsi isteğe bağlı).

## Şablon

Aşağıdaki iskeleti başlangıç noktası olarak kullanın; `{{Urun}}` yerine `dochub.yaml` içindeki `urun` değerini yazın.

````markdown
> Bu sayfa [kim] için; [hangi soruya] cevap verir.

## Kapsam dışı

## Şimdi

## Sıradaki

## Sonra

## Bu dönem yapılmayacaklar
````

## Koddan üretim ipuçları

Bu tip için repo'da şu dosya ve sinyallere bakın:

Bu tip için ipucu tanımlanmamış; tipin amacına ve zorunlu başlıklarına göre kodda kanıt arayın.
