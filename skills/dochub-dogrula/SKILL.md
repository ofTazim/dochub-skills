---
name: dochub-dogrula
metadata:
  version: "1.1.0"
description: "DocHub doküman repo'sunu bağımlılıksız Node betiğiyle doğrular: dochub.yaml sözleşmesi, README ve zorunlu başlıklar, SUMMARY.md bağlantıları, başlık karakterleri, changelog ön maddesi ve Kısıtlı/Açık tiplerde hassas bilgi (IP, password/şifre/token). yaml, başlıklar, hassas bilgi ve başlık karakteri kurallarında DocHub ile aynı sonucu verir; CI'da kullanılır. Kullan: dokümantasyonu doğrula, 'dochub kontrolleri', CI şablonu. Use to validate DocHub documentation in a repo (dochub.yaml, required headings, SUMMARY links, changelog front matter, sensitive data) with a Node script."
---

### Ne zaman kullanılır

* `dochub-iskelet`, `dochub-uret`, `dochub-guncelle` ve `dochub-changelog` işlerinden sonra **her zaman**.
* Commit/PR öncesi ve CI'da.
* Kullanıcı "DocHub bunu kabul eder mi?" diye soruyor.

## Ortak ilkeler

* **Gizli bilgi kopyalanmaz.** Betik raporlarken bulunan gizli değeri değil, yalnız türünü ("IP adresi") söyler; siz de çıktıdan bir değer alıp başka yere yazmayın.
* **Künye repo'ya yazılmaz.** Betik künyeyi (persona, gizlilik, sahip) kontrol etmez; çünkü repo'da tutulmaz.
* **Yalnız kodda görüleni yazın.** Hata düzeltirken kanıtı olmayan içerik uydurmayın; `{% hint style="warning" %}` bloğu (açılış, metin ve `{% endhint %}` **ayrı satırlarda**; tek satırda yazmayın) içinde "Doğrulanmalı: …" notu kullanın.
* **Onay olmadan dosya oluşturmayın.** Betik hiçbir dosya yazmaz; düzeltmeler için yeni dosya/klasör gerekiyorsa kullanıcıdan onay alın.

## Çalıştırma

```bash
node skills/dochub-dogrula/scripts/dochub-dogrula.mjs [kök] [--json]
```

* `kök`: repo kökü (varsayılan `.`; `dochub.yaml` burada aranır).
* `--json`: makine okunur çıktı.
* `--katalog dosya.json`: gömülü katalog yerine verilen kataloğu kullanır (genellikle gerekmez).
* Gereksinim: Node 18+. Bağımlılık yok, ağ erişimi yok, dosya yazmaz.
* Betik skill klasöründedir. Claude Code eklentisinde bu `SKILL.md`'nin yanındaki `scripts/` klasörüdür; Copilot kopyasında `.github/skills/dochub-dogrula/scripts/dochub-dogrula.mjs`. Yol bulunamazsa `find . -name dochub-dogrula.mjs` ile arayın.
* **Çıkış kodu:** `0` tüm kurallar geçti, `1` en az bir kural kaldı, `2` kullanım/katalog hatası.

Örnek çıktı:

```text
[OK]    yaml               dochub.yaml
[OK]    readme             docs/kurulum/README.md
[HATA]  basliklar          docs/mimari/README.md  Eksik başlık: Veri modeli
[HATA]  hassas             docs/mimari/api.md  Hassas bilgi şüphesi: IP adresi

2 kural kaldı, 18 geçti.
```

## Kurallar ve nasıl düzeltilir

| Kural (`kod`) | Ne denetler | Düzeltme |
|---|---|---|
| `yaml` | `dochub.yaml` sözleşmesi: `surum: 1`, `urun`, `dokumanlar`, iki haneli bilinen tip, dosya tabanlı tip yok, tekil tip ve klasör, göreli klasör (`..` yok), `otomatik`, `kaynaklar` (≤50) | Mesajdaki `satır N`'e gidin; alanı düzeltin. Bir hata görürseniz diğer kurallar çalışmaz; düzeltip yeniden çalıştırın. |
| `readme` | Beyan edilen her klasörde `README.md` var mı | `dochub-iskelet` ile oluşturun ya da klasör adını düzeltin. |
| `basliklar` | Tipin zorunlu `## ` başlıkları kök `README.md`'de **sırayla** var mı (büyük/küçük harf duyarsız; blok içleri dahil; `{% include %}` ve değişkenler önce çözülür). **Tip 18 (Release Notları) kök README'si muaftır:** serbest giriştir, bu kural aranmaz | Eksik başlığı ekleyin; "sırası hatalı" ise başlıkları şablon sırasına dizin. Başlığı yeniden adlandırmayın. |
| `summary` | `SUMMARY.md` bağlantıları var olan dosyalara işaret ediyor mu (dış bağlantılar atlanır) | Dosyayı oluşturun ya da bağlantıyı kaldırın/düzeltin. |
| `baslik-karakter` | `SUMMARY.md` bağlantı başlıklarında ve changelog sayfası başlığında `/`, `\`, `#` yok | Başlıktaki karakteri çıkarın ("Api / Veri" → "Api ve Veri"). |
| `hassas` | Varsayılan gizliliği **Kısıtlı** ya da **Açık** olan tiplerde IP adresi ve gerçek gizli değerler: `password`, `şifre`, `token`, `secret`, `api key` vb. adlı bir anahtara atanmış ≥6 karakterlik değer (`SMTP_SIFRE=...`), bilinen token biçimleri (GitHub, AWS, JWT, Slack) ve PEM özel anahtar başlığı. Sözcüğün kendisi, tablo hücresi ya da `${DEGISKEN}`, `***`, `<...>` gibi yer tutucular bulgu değildir | Değeri kaldırın; ortam değişkeni adını yazın (`SMTP_SIFRE=${SMTP_SIFRE}`), IP yerine ana makine adı değişkeni kullanın. Diğer gizlilik düzeylerinde tarama atlanır. |
| `changelog-onmadde` | Tip 18 sürüm sayfalarında ön madde: `surum` dolu, `tarih` `YYYY-AA-GG` ve geçerli gün, `etiketler` liste | Ön maddeyi dosyanın başına koyun, tarihi düzeltin. |
| `changelog-baslik` | Tip 18 sürüm sayfalarındaki `## ` başlıkları `Sürüm künyesi`, `Yenilikler`, `Düzeltilen sorunlar`, `Kırıcı değişiklikler`, `Bilinen sorunlar` kümesinden olmalı (hepsi isteğe bağlı). Başka başlık **uyarı** üretir (`[UYARI]`, JSON'da `"seviye": "uyari"`; çıkış kodunu etkilemez) | Başlığı önerilen adla yeniden yazın ya da yok sayın. |
| `include-hedef` | Sayfadaki her `{% include "…" %}` çözülüyor mu: sayfaya göre yol (klasör düzeyi `.gitbook/includes/` ya da kök) ya da klasör düzeyi + kök `.gitbook/includes/` içinde **tek** dosya adı eşleşmesi; birden çok eşleşme "belirsiz" | Yolu düzeltin (kök için doğru `../` derinliği) ya da dosyayı `.gitbook/includes/` altına koyun/adını benzersiz yapın. |
| `gorsel-hedef` | `![](…)` ve `<img src>` ile verilen yerel görseller depoda var mı (dış URL ve `data:` atlanır) | Görseli ekleyin (`.gitbook/assets/` klasör düzeyi ya da kök) ya da yolu düzeltin. |
| `baglanti-hedef` | Yerel `.md` bağlantıları (`[..](x.md)` ve `<a href="x.md">`, başka beyan edilmiş klasördekiler dahil) depoda var mı | Yolu düzeltin ya da bağlantıyı kaldırın. |
| `gitbook-blok` | `{% hint %}`, `{% tabs %}`, `{% stepper %}`, `{% code %}`… açılış/kapanışları eşleşiyor mu (tek satırlı hint de dengeli sayılır); yerel dosyaya işaret eden `{% file %}` desteklenmez | Eksik kapanışı ekleyin; dosya ekini SharePoint/URL bağlantısıyla değiştirin. |

Notlar:

* `yaml`, `basliklar`, `hassas` ve `baslik-karakter` kurallarında betik DocHub ile **aynı sonucu** verir; `hassas` ve `basliklar` için betik, DocHub gibi önce `{% include %}` ve `.gitbook/vars.yaml` / sayfa `vars` değişkenlerini çözer. `summary`, `changelog-onmadde`, `changelog-baslik`, `include-hedef`, `gorsel-hedef`, `baglanti-hedef`, `gitbook-blok` ve `readme` betiğe özgü yerel ek kontrollerdir (DocHub'ın senkron adımına karşılık gelir, birebir aynı değildir). Ayrıca künye (persona, sahip) ve alt sayfa kuralları DocHub tarafındadır. Betik yeşil olsa da DocHub'da künye uyarıları görülebilir.
* Zorunlu başlık ve gizlilik kuralları tipe özeldir; tipin ayrıntısı için `../../shared/tipler/` altındaki dosyaya bakın.
* Hassas bilgi bulgusunda içeriğin değerini başka yere kopyalamayın; yalnız metni düzeltin.

## CI kullanımı

GitHub Actions örneği (ürün repo'su, Copilot kopyası kuruluysa):

```yaml
name: DocHub doğrula
on:
  pull_request:
    paths: ["docs/**", "changelog/**", "dochub.yaml"]
jobs:
  dogrula:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: node .github/skills/dochub-dogrula/scripts/dochub-dogrula.mjs .
```

Betik 1 ile çıkarsa iş kırılır. `--json` çıktısı `{ "gecti": bool, "sonuclar": [{ "kod", "yol", "gecti", "mesaj" }] }` biçimindedir; başka araçlara aktarılabilir.

## Ajan akışı

1. Betiği çalıştırın (önce `--json` olmadan; hızlı okunur).
2. Başarısız satırları kümeleyin (dosya ve kural).
3. Yukarıdaki tabloya göre düzeltin; **kanıt gerektiren içeriği uydurmayın**.
4. Yeşil olana kadar tekrarlayın; kullanıcıya kalan ve düzeltilemeyen bulguları ("Doğrulanmalı" bırakılanlar) bildirin.
