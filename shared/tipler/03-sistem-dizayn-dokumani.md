# 03 · Sistem Dizayn Dokümanı

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `03-sistem-dizayn-dokumani.md`.

- **Tip no:** `03` (`dochub.yaml` içinde `tip: "03"`)
- **Varsayılan gizlilik:** Gizli (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Sistemin mimarisini, bileşenlerini ve sorumluluklarını, veri modelini, arayüzlerini ve alınan teknik kararları yazılımcı, analist ve test mühendisine anlatır. Gereksinim listesi, kurulum adımı ya da ortam envanteri içermez; bunlar FATAD, Kurulum ve Topoloji dokümanlarında yer alır.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. Mimari diyagram
2. Bileşenler ve sorumlulukları
3. Veri modeli
4. Arayüzler
5. Teknik kararlar

Başlık eşleşmesi büyük/küçük harf duyarsızdır; başlıklar blok içinde (`{% tab %}`, `{% step %}` vb.) olsa bile sayılır.
Kök `README.md` içinde `# ` (H1) başlığı kullanılmaz; sayfa başlığı DocHub'dan gelir.
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Sürüm künyesi`, `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler`, `## Bilinen sorunlar` kullanılır (hepsi isteğe bağlı).

## Derinlik ve kapsama

- **Derinlik:** Standart
- **Kapsama kuralı:** Birim: her bileşen/proje/modül ve her kalıcı varlık (entity/tablo). Bileşen için: sorumluluk, bağımlılıklar, arayüzler; varlık için: alanlar, ilişkiler, kısıtlar; teknik kararlar gerekçesiyle.

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

## Mimari diyagram

## Bileşenler ve sorumlulukları

## Veri modeli

## Arayüzler

## Teknik kararlar
````

## Koddan üretim ipuçları

Bu tip için repo'da şu dosya ve sinyallere bakın:

- Modül/katman yapısı: üst düzey klasörler, çözüm (.sln) ve proje dosyaları (.csproj, package.json, pom.xml)
- Veri modeli: entity/model sınıfları, DbContext, şema dosyaları
- Migration klasörleri ve veritabanı betikleri
- Bağımlılıklar: paket yöneticisi dosyaları (csproj, package.json, requirements.txt), servisler arası istemciler
