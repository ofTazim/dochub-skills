# 18 · Release Notları

Bu dosya DocHub yapılandırmasından üretilir; elle düzenlemeyin. Dosya adı: `18-release-notlari.md`.

- **Tip no:** `18` (`dochub.yaml` içinde `tip: "18"`)
- **Varsayılan gizlilik:** Açık (DocHub'da ayarlanır; repo'ya yazılmaz)

## Amaç

Bir sürümde gelen yenilikleri, düzeltilen sorunları, kırıcı değişiklikleri ve bilinen sorunları müşteri ve satış için duyurur. Plan ya da roadmap maddesi, iç teknik tartışma ve gizli bilgi içermez; her madde kullanıcıya etkisi açısından yazılır.

## Zorunlu başlıklar

Kök `README.md` içinde şu `## ` başlıkları **bu sırayla** bulunmalıdır (başka başlıklar araya girebilir):

1. Sürüm künyesi
2. Yenilikler
3. Düzeltilen sorunlar
4. Kırıcı değişiklikler
5. Bilinen sorunlar

Başlık eşleşmesi büyük/küçük harf duyarsızdır; başlıklar blok içinde (`{% tab %}`, `{% step %}` vb.) olsa bile sayılır.
Kök `README.md` içinde `# ` (H1) başlığı kullanılmaz; sayfa başlığı DocHub'dan gelir.
İstisna: tip 18 (Release Notları) için kök `README.md` serbest bir giriş metnidir ve zorunlu başlık aranmaz; sürüm sayfalarında yalnız `## Yenilikler`, `## Düzeltilen sorunlar`, `## Kırıcı değişiklikler` kullanılır (hepsi isteğe bağlı).

## Şablon

Aşağıdaki iskeleti başlangıç noktası olarak kullanın; `{{Urun}}` yerine `dochub.yaml` içindeki `urun` değerini yazın.

````markdown
> Bu sayfa [kim] için; [hangi soruya] cevap verir.

## Kapsam dışı

## Sürüm künyesi

## Yenilikler

## Düzeltilen sorunlar

## Kırıcı değişiklikler

## Bilinen sorunlar
````

## Koddan üretim ipuçları

Bu tip için repo'da şu dosya ve sinyallere bakın:

- Git etiketleri (git tag, git describe)
- Commit geçmişi (son etiketten bu yana)
- PR başlıkları ve birleştirme commit'leri
