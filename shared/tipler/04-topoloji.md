# 04 · Topoloji

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `04-topoloji.md`.

- **Tip no:** `04` (`dochub.yaml` içinde `tip: "04"`)
- **Varsayılan gizlilik:** Gizli (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Topoloji dokümanı.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. Ortamlar
2. Topoloji diyagramı
3. Sunucu ve servis envanteri
4. Port matrisi
5. Yedeklilik

Başlık eşleşmesi büyük/küçük harf duyarsızdır; başlıklar blok içinde (`{% tab %}`, `{% step %}` vb.) olsa bile sayılır.
Kök `README.md` içinde `# ` (H1) başlığı kullanılmaz; sayfa başlığı DocHub'dan gelir.
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler` kullanılır (hepsi isteğe bağlı).

## Şablon

Aşağıdaki iskeleti başlangıç noktası olarak kullanın; `{{Urun}}` yerine `dochub.yaml` içindeki `urun` değerini yazın.

````markdown
> Bu sayfa [kim] için; [hangi soruya] cevap verir.

## Kapsam dışı

## Ortamlar

## Topoloji diyagramı

## Sunucu ve servis envanteri

## Port matrisi

## Yedeklilik
````

## Koddan üretim ipuçları

Bu tip için repo'da şu dosya ve sinyallere bakın:

- Deploy ve Kubernetes tanımları (deploy/, k8s/, manifest dosyaları)
- Ortam tanımları (appsettings.*.json, .env.example, ortam değişkeni listeleri)
- Ağ ve port bilgisi: Dockerfile EXPOSE, compose ports, Service/Ingress tanımları
