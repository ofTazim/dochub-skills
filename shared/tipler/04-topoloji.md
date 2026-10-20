# 04 · Topoloji

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `04-topoloji.md`.

- **Tip no:** `04` (`dochub.yaml` içinde `tip: "04"`)
- **Varsayılan gizlilik:** Gizli (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Ortamları, sunucu ve servis envanterini, port matrisini ve yedeklilik yapısını topoloji diyagramıyla yazılımcı ve mimarlar için gösterir. Kurulum adımı, boyutlandırma rehberi ya da gerçek parola ve IP adresi içermez; künye bilgisi yan panelde tutulur.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. Ortamlar
2. Topoloji diyagramı
3. Sunucu ve servis envanteri
4. Port matrisi
5. Yedeklilik

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
