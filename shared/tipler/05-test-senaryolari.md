# 05 · Test Senaryoları

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `05-test-senaryolari.md`.

- **Tip no:** `05` (`dochub.yaml` içinde `tip: "05"`)
- **Varsayılan gizlilik:** Gizli (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Test kapsamını, gereksinim ile senaryo eşleşmesini, senaryo tablosunu ve çıkış kriterlerini test mühendisleri için yazar. Gereksinimin kendisini ya da otomasyon kodunun ayrıntısını içermez; her senaryo bir gereksinime bağlanır.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. Test kapsamı
2. Gereksinim–senaryo eşleşmesi
3. Senaryo tablosu
4. Çıkış kriterleri

Başlık eşleşmesi büyük/küçük harf duyarsızdır; başlıklar blok içinde (`{% tab %}`, `{% step %}` vb.) olsa bile sayılır.
Kök `README.md` içinde `# ` (H1) başlığı kullanılmaz; sayfa başlığı DocHub'dan gelir.
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler` kullanılır (hepsi isteğe bağlı).

## Şablon

Aşağıdaki iskeleti başlangıç noktası olarak kullanın; `{{Urun}}` yerine `dochub.yaml` içindeki `urun` değerini yazın.

````markdown
> Bu sayfa [kim] için; [hangi soruya] cevap verir.

## Kapsam dışı

## Test kapsamı

## Gereksinim–senaryo eşleşmesi

## Senaryo tablosu

## Çıkış kriterleri
````

## Koddan üretim ipuçları

Bu tip için repo'da şu dosya ve sinyallere bakın:

Bu tip için ipucu tanımlanmamış; tipin amacına ve zorunlu başlıklarına göre kodda kanıt arayın.
