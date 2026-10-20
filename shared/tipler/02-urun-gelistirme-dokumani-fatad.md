# 02 · Ürün Geliştirme Dokümanı (FATAD)

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `02-urun-gelistirme-dokumani-fatad.md`.

- **Tip no:** `02` (`dochub.yaml` içinde `tip: "02"`)
- **Varsayılan gizlilik:** Gizli (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Özelliğin iş ihtiyacını, gereksinimlerini, kabul kriterlerini ve risklerini yazılımcı, analist ve test mühendisi için toplar. Gereksinimler ID'li (ör. `GRK-01`) ve test edilebilir yazılır; örnek: "Yanıt süresi 2 saniyenin altında olmalıdır", "Sistem hızlı olmalıdır" değil. Mimari ve künye içermez.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. İş ihtiyacı
2. Gereksinimler (ID'li)
3. İş kuralları
4. Kabul kriterleri
5. Riskler ve açık sorular

Başlık eşleşmesi büyük/küçük harf duyarsızdır; başlıklar blok içinde (`{% tab %}`, `{% step %}` vb.) olsa bile sayılır.
Kök `README.md` içinde `# ` (H1) başlığı kullanılmaz; sayfa başlığı DocHub'dan gelir.
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Sürüm künyesi`, `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler`, `## Bilinen sorunlar` kullanılır (hepsi isteğe bağlı).

## Derinlik ve kapsama

- **Derinlik:** Standart
- **Kapsama kuralı:** Bu tip için kapsama kuralı tanımlı değil.

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

## İş ihtiyacı

## Gereksinimler (ID'li)

## İş kuralları

## Kabul kriterleri

## Riskler ve açık sorular
````

## Koddan üretim ipuçları

Bu tip için repo'da şu dosya ve sinyallere bakın:

Bu tip için ipucu tanımlanmamış; tipin amacına ve zorunlu başlıklarına göre kodda kanıt arayın.
