# Yazım rehberi

Bu rehber DocHub yönetim ekibinin "Nasıl yazılır" ayarıdır; yapılandırmadan üretilir. Tüm doküman tiplerinde geçerlidir.

## Temel ilkeler

- Her doküman **tek bir okuyucu kitlesine** (persona) yazılır.
- Yalnız doğrulanmış bilgiyi yazın; teyit edemediğiniz yere "Doğrulanmalı: …" uyarı notu koyun.
- Kısa, aktif cümleler kurun; bir paragrafta tek fikir anlatın; kısaltmaları ilk kullanımda açın.
- Gerçek parola, token veya IP adresi yazılmaz; değişken adını ya da `<ornek-deger>` yer tutucusunu kullanın.

## Başlık ve bölüm yapısı

- Sayfa başlığı DocHub'dan gelir; içerikte H1 (`#`) kullanmayın. Bölümler `##`, alt bölümler `###` ile başlar.
- Tipin zorunlu başlıkları şablondaki yazımla ve sırayla bulunur.
- Başlıklar kısa ad tamlamasıdır ("Kurulum adımları"); soru ya da cümle olmaz; `/`, `\` ve `#` içermez.
- Künye (persona, gizlilik, sahip, onaylayanlar) yan panelde tutulur; içeriğe yazılmaz. Değişiklik geçmişi otomatik tutulur.
- Uzun içeriği alt sayfalara bölün; her alt sayfa tek konuyu anlatır.

## Bloklar

| İhtiyaç | Blok |
|---|---|
| Sıralı adımlar | Adımlar (stepper) |
| Alternatifler (ortam, dil) | Sekmeler |
| Uyarı, ipucu, not | İpucu (bilgi, uyarı, tehlike, başarı) |
| Uzun ya da isteğe bağlı ayrıntı, SSS | Genişletilebilir |
| Başka sayfaya geçiş | Düz bağlantı |

Editörde `/` ile blok ekleyin. Dosya ekleri (PDF/ZIP) yerine SharePoint bağlantısı verin.

## Gizlilik sınıfları

- **Açık:** müşteriyle paylaşılabilir; yetkisi olan müşteri firmaları portalda görür.
- **İç Kullanım:** tüm çalışanlar okuyabilir.
- **Kısıtlı:** gerçek parola/token değeri ve IP adresi içeremez (değişken adı ve yer tutucu serbesttir).
- **Gizli:** yalnızca ürün ekibi ve yetkili roller.

## Onay ve yayın

Taslak tamamlandığında tüm kontroller geçince **İncelemeye gönder** ile Reviewer ve Onaylayan seçilir. Reviewer onayından sonra Onaylayan 4 maddelik kontrol listesini işaretleyerek onay verir; ret gerekçesi zorunludur ve doküman Taslak'a döner. Onaylanan doküman **Yayınla** ile yayına alınır.
