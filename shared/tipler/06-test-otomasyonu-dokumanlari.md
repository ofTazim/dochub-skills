# 06 · Test Otomasyonu Dokümanları

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `06-test-otomasyonu-dokumanlari.md`.

- **Tip no:** `06` (`dochub.yaml` içinde `tip: "06"`)
- **Varsayılan gizlilik:** Gizli (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Test Otomasyonu Dokümanları dokümanı.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. Otomasyon kapsamı
2. Repo ve çalıştırma
3. CI/CD bağlantısı
4. Senaryo envanteri
5. Bakım sahibi

Başlık eşleşmesi büyük/küçük harf duyarsızdır; başlıklar blok içinde (`{% tab %}`, `{% step %}` vb.) olsa bile sayılır.
Kök `README.md` içinde `# ` (H1) başlığı kullanılmaz; sayfa başlığı DocHub'dan gelir.
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler` kullanılır (hepsi isteğe bağlı).

## Şablon

Aşağıdaki iskeleti başlangıç noktası olarak kullanın; `{{Urun}}` yerine `dochub.yaml` içindeki `urun` değerini yazın.

````markdown
> Bu sayfa [kim] için; [hangi soruya] cevap verir.

## Kapsam dışı

## Otomasyon kapsamı

## Repo ve çalıştırma

## CI/CD bağlantısı

## Senaryo envanteri

## Bakım sahibi
````

## Koddan üretim ipuçları

Bu tip için repo'da şu dosya ve sinyallere bakın:

- Test projeleri ve klasörleri (tests/, *.Tests, __tests__, e2e/)
- Test çatısı yapılandırması (xunit, jest, vitest, playwright, cypress)
- CI pipeline dosyaları (.github/workflows, azure-pipelines.yml, Jenkinsfile) ve test adımları
