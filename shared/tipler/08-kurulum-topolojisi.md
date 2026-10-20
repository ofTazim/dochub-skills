# 08 · Kurulum Topolojisi

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `08-kurulum-topolojisi.md`.

- **Tip no:** `08` (`dochub.yaml` içinde `tip: "08"`)
- **Varsayılan gizlilik:** Kısıtlı (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Desteklenen dağıtım seçeneklerini, referans diyagramı, bileşen gereksinimlerini, boyutlandırmayı ve ağ ile port gereksinimlerini DevOps ekibi için özetler. Adım adım kurulum talimatı ya da gerçek IP adresi içermez; kurulum adımları Kurulum Dokümanı'ndadır.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. Dağıtım seçenekleri
2. Referans diyagram
3. Bileşen gereksinimleri
4. Boyutlandırma
5. Ağ ve port gereksinimleri

Başlık eşleşmesi büyük/küçük harf duyarsızdır; başlıklar blok içinde (`{% tab %}`, `{% step %}` vb.) olsa bile sayılır.
Kök `README.md` içinde `# ` (H1) başlığı kullanılmaz; sayfa başlığı DocHub'dan gelir.
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Sürüm künyesi`, `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler`, `## Bilinen sorunlar` kullanılır (hepsi isteğe bağlı).

## Derinlik ve kapsama

- **Derinlik:** Standart
- **Kapsama kuralı:** Bu tip için kapsama kuralı tanımlı değil.

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

## Dağıtım seçenekleri

## Referans diyagram

## Bileşen gereksinimleri

## Boyutlandırma

## Ağ ve port gereksinimleri
````

## Koddan üretim ipuçları

Bu tip için repo'da şu dosya ve sinyallere bakın:

- docker-compose, Kubernetes ve Helm ile görülen topoloji (servisler, replikalar, bağımlılıklar)
- Kaynak gereksinimleri: resources.requests/limits, volume ve depolama tanımları
- Port ve ağ tanımları (Service, Ingress, compose networks)
