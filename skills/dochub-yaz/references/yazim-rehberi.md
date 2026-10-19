# Yazım rehberi

Bu rehber DocHub yönetim ekibinin "Nasıl yazılır" ayarıdır; yapılandırmadan üretilir. Tüm doküman tiplerinde geçerlidir.

## Temel ilkeler

Her doküman **tek bir okuyucu kitlesine** (persona) hitap eder.

- Kısa ve aktif cümleler kurun.
- Bir paragrafta tek fikir anlatın.
- Kurum içi kısaltmaları ilk kullanımda açın.

## Başlık ve bölüm yapısı

1. Başlık `NN · Doküman Adı — Ürün` biçimindedir; `/`, `\` ve `#` kullanılmaz.
2. Künye (Persona · Gizlilik · Sahip · Güncelleme) sayfanın yan panelinde tutulur; içeriğe yazılmaz.
3. Zorunlu başlıklar tipin şablonundaki sırayla yer alır. Başlığı içerikte H1 olarak tekrarlamayın; sayfa başlığı zaten görünür.

Değişiklik geçmişi sayfanın Geçmiş bölümünde otomatik tutulur.

## Gereksinim yazımı

Her gereksinim **test edilebilir** olmalıdır.

- Doğru: *Yanıt süresi 2 saniyenin altında olmalıdır.*
- Yanlış: *Sistem hızlı olmalıdır.*

Gereksinimleri ID'li yazın (ör. `GRK-01`).

## Gizlilik sınıfları

- **Açık:** müşteriyle paylaşılabilir; yetkisi olan müşteri firmaları portalda görür.
- **İç Kullanım:** tüm çalışanlar okuyabilir.
- **Kısıtlı:** IP adresi, parola, token gibi bilgiler içeremez.
- **Gizli:** yalnızca ürün ekibi ve yetkili roller.

## Onay ve yayın

Taslak tamamlandığında tüm kontroller geçince **İncelemeye gönder** ile Reviewer ve Onaylayan seçilir. Reviewer onayından sonra Onaylayan 4 maddelik kontrol listesini işaretleyerek onay verir; ret gerekçesi zorunludur ve doküman Taslak'a döner. Onaylanan doküman **Yayınla** ile yayına alınır.
