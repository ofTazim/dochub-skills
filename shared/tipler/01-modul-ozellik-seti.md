# 01 · Modül - Özellik Seti

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `01-modul-ozellik-seti.md`.

- **Tip no:** `01` (`dochub.yaml` içinde `tip: "01"`)
- **Varsayılan gizlilik:** İç Kullanım (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Ürünün modüllerini ve her modülün sunduğu özellikleri, bağımlılıklarıyla birlikte ve ürünün neyi yapmadığını da belirterek anlatır; ürün yöneticileri, satış ve ortaklar için hazırlanır. Teknik tasarım, kurulum ya da test ayrıntısı ile künye bilgisi (sahip, persona, gizlilik) içermez.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. Modül listesi
2. Modül başına özellik tablosu
3. Bağımlılıklar
4. Bu ürün neyi yapmaz

Başlık eşleşmesi büyük/küçük harf duyarsızdır; başlıklar blok içinde (`{% tab %}`, `{% step %}` vb.) olsa bile sayılır.
Kök `README.md` içinde `# ` (H1) başlığı kullanılmaz; sayfa başlığı DocHub'dan gelir.
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Sürüm künyesi`, `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler`, `## Bilinen sorunlar` kullanılır (hepsi isteğe bağlı).

## Derinlik ve kapsama

- **Derinlik:** Standart
- **Kapsama kuralı:** Birim: her modül (proje/paket/ana menü bölümü). Her modül için: özellik tablosu (özellik, kullanıcıya faydası, durum), bağımlılıklar, sınırlar ("bu modül neyi yapmaz").

Derinlik, ne kadar ayrıntı yazılacağını belirler (ölçüt kelime sayısı değil, kapsamadır):

- **Özet:** tek sayfa; yalnız zorunlu başlıklar, her biri kısa ve kanıta dayalı. Alt sayfa açılmaz.
- **Standart:** `README.md` + gerektiğinde alt sayfalar; her zorunlu başlığın altı koddaki somut bilgiyle dolar.
- **Kapsamlı:** önce koddan kapsama kuralındaki birimlerin envanteri çıkarılır ve `<klasör>/.kapsam.yaml` olarak yazılır; her birime karmaşıklığına göre bir seviye verilir (`basit` | `standart` | `ayrintili`). **Her birim** yazılır ama yalnız `ayrintili` birimler kuralın tüm içeriğini alır; `basit` birimler ortak sayfada kısa bölüm ya da tablo satırıdır, `standart` birimlerde yalnız dolu maddeler yazılır (ayrıca onay gerekmez); kendini açıklayan cümle ve ortak bilginin tekrarı yazılmaz; sonda kapsama raporu verilir (kapsanan / eksik / kapsam dışı). Birimi yalnız adıyla anmak, "vb./gibi" ile listeyi kısaltmak ve arayüz metinlerini özetlemek yasaktır; etiket ve mesajlar koddan aynen alınır. README yönlendirir, ayrıntı alt sayfalardadır ve atlanmaz.

Kapsama kuralı yoksa birim tanımı için aşağıdaki "Koddan üretim ipuçları"nı kullanın.

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
