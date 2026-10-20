# 11 · Güvenlik Dokümanları

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `11-guvenlik-dokumanlari.md`.

- **Tip no:** `11` (`dochub.yaml` içinde `tip: "11"`)
- **Varsayılan gizlilik:** Kısıtlı (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Ürünün kimlik ve erişim, veri koruma, loglama, açık yönetim süreci, uyum ve sertifikalar ile sorumluluk paylaşımı konularını güvenlik ekibi ve müşteri güvenlik ekipleri için açıklar. Gerçek parola, anahtar ve IP adresi içermez; tarama raporlarının ayrıntısı DAST ve SAST özetlerinde tutulur.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. Kimlik ve erişim
2. Veri koruma
3. Loglama
4. Açık yönetim süreci
5. Uyum ve sertifikalar
6. Sorumluluk paylaşımı

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

## Kimlik ve erişim

## Veri koruma

## Loglama

## Açık yönetim süreci

## Uyum ve sertifikalar

## Sorumluluk paylaşımı
````

## Koddan üretim ipuçları

Bu tip için repo'da şu dosya ve sinyallere bakın:

- Kimlik doğrulama / yetkilendirme middleware'leri ve politikaları (auth, JWT, OIDC, rol/policy tanımları)
- Şifreleme ve anahtar yönetimi (veri koruma, TLS ayarları; anahtar/parola değerlerini yazma)
- Loglama ve maskeleme ayarları
- Güvenlik başlıkları, CORS, rate limit yapılandırması
