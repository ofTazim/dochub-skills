# 07 · Kurulum Dokümanı

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `07-kurulum-dokumani.md`.

- **Tip no:** `07` (`dochub.yaml` içinde `tip: "07"`)
- **Varsayılan gizlilik:** Kısıtlı (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Ürünün kurulumunu önkoşullar, sıralı adımlar, parametreler, doğrulama, geri alma ve sık hatalarla DevOps ekibi için anlatır. Gerçek parola, token ve IP adresi yazılmaz; değişken adı ya da yer tutucu kullanılır. Mimari gerekçe ve boyutlandırma Sistem Dizayn ile Kurulum Topolojisi dokümanlarındadır.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. Önkoşullar
2. Kurulum adımları
3. Konfigürasyon parametreleri
4. Doğrulama
5. Geri alma
6. Sık karşılaşılan hatalar

Başlık eşleşmesi büyük/küçük harf duyarsızdır; başlıklar blok içinde (`{% tab %}`, `{% step %}` vb.) olsa bile sayılır.
Kök `README.md` içinde `# ` (H1) başlığı kullanılmaz; sayfa başlığı DocHub'dan gelir.
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Sürüm künyesi`, `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler`, `## Bilinen sorunlar` kullanılır (hepsi isteğe bağlı).

## Derinlik ve kapsama

- **Derinlik:** Kapsamlı
- **Kapsama kuralı:** Birim: her konfigürasyon parametresi (ortam değişkeni, appsettings anahtarı) ve her kurulum bileşeni/adımı. Parametre için: ad, açıklama, varsayılan, zorunlu mu, örnek (gerçek değer değil), etkisi. Adım için: komut, doğrulama, sık hata ve çözümü.

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

## Önkoşullar

## Kurulum adımları

## Konfigürasyon parametreleri

## Doğrulama

## Geri alma

## Sık karşılaşılan hatalar
````

## Koddan üretim ipuçları

Bu tip için repo'da şu dosya ve sinyallere bakın:

- Dockerfile ve docker-compose dosyaları
- deploy/ ve Kubernetes manifestleri, Helm chart'ları (Chart.yaml, values.yaml)
- appsettings.json ve .env.example (gerçek .env dosyasını okuma/kopyalama)
- Kurulum betikleri (scripts/, Makefile)
