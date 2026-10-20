# 17 · Kullanım Kılavuzu

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `17-kullanim-kilavuzu.md`.

- **Tip no:** `17` (`dochub.yaml` içinde `tip: "17"`)
- **Varsayılan gizlilik:** Açık (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Son kullanıcının ürünü kullanmasını sağlar: kimler için olduğunu, başlarken adımlarını, görev akışlarını, hata mesajlarını ve sık sorulan soruları anlatır. Teknik tasarım, kurulum ya da yönetici konfigürasyonu içermez; uzun kılavuzlar modül başına alt sayfalara bölünür.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. Kimler için
2. Başlarken
3. Görev akışları
4. Hata mesajları
5. SSS

Başlık eşleşmesi büyük/küçük harf duyarsızdır; başlıklar blok içinde (`{% tab %}`, `{% step %}` vb.) olsa bile sayılır.
Kök `README.md` içinde `# ` (H1) başlığı kullanılmaz; sayfa başlığı DocHub'dan gelir.
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Sürüm künyesi`, `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler`, `## Bilinen sorunlar` kullanılır (hepsi isteğe bağlı).

## Derinlik ve kapsama

- **Derinlik:** Kapsamlı
- **Kapsama kuralı:** Birim: kullanıcının açabildiği her ekran/route (router tanımı, sayfa bileşenleri) ve her ana görev akışı. Her ekran için alt sayfa: amaç ve kim kullanır, nasıl açılır, alanlar tablosu (alan, açıklama, zorunlu mu, kurallar/sınırlar), butonlar ve sonuçları, rol farkları, durumlar ve hata mesajları (koddaki gerçek metinlerle), adım adım en az bir görev akışı, ipuçları. Basit ve genel geçer maddelerde token tüketimini azaltmak amaçlı kapsamı daralt.

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

## Kimler için

## Başlarken

## Görev akışları

## Hata mesajları

## SSS
````

## Koddan üretim ipuçları

Bu tip için repo'da şu dosya ve sinyallere bakın:

Bu tip için ipucu tanımlanmamış; tipin amacına ve zorunlu başlıklarına göre kodda kanıt arayın.
