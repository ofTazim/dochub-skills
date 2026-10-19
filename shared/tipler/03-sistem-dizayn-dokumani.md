# 03 · Sistem Dizayn Dokümanı

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `03-sistem-dizayn-dokumani.md`.

- **Tip no:** `03` (`dochub.yaml` içinde `tip: "03"`)
- **Varsayılan gizlilik:** Gizli (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Sistem Dizayn Dokümanı dokümanı.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. Mimari diyagram
2. Bileşenler ve sorumlulukları
3. Veri modeli
4. Arayüzler
5. Teknik kararlar

Başlık eşleşmesi büyük/küçük harf duyarsızdır; başlıklar blok içinde (`{% tab %}`, `{% step %}` vb.) olsa bile sayılır.
Kök `README.md` içinde `# ` (H1) başlığı kullanılmaz; sayfa başlığı DocHub'dan gelir.
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler` kullanılır (hepsi isteğe bağlı).

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
