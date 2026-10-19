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
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler` kullanılır (hepsi isteğe bağlı).

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
