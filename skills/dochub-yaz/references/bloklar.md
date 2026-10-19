# DocHub'ın desteklediği GitBook blokları

DocHub, GitHub'dan senkronize ettiği sayfalarda aşağıdaki GitBook bloklarını çizer ve editörde korur. Blok sözdizimi arama metninden ayıklanır; blok içindeki `## ` başlıkları ve metin DocHub kontrollerine (zorunlu başlık, hassas bilgi) dahildir.

**Kural:** Her bloğu doğru kapatın ve açılış/kapanış etiketlerini eşleştirin. Listede olmayan blok ya da HTML kullanmayın.

## Hint (not kutusu)

Stiller: `info`, `warning`, `danger`, `success`. Ek bilgi, uyarı, tehlike, başarı notları için.

```markdown
{% hint style="info" %}
Bu ayar yalnız üretim ortamında geçerlidir.
{% endhint %}

{% hint style="warning" %}
Doğrulanmalı: Yedekleme sıklığı repo'da bulunamadı.
{% endhint %}

{% hint style="danger" %}
Bu işlem geri alınamaz; önce yedek alın.
{% endhint %}

{% hint style="success" %}
Kurulum tamamlandı.
{% endhint %}
```

"Doğrulanmalı" notu için `warning` kullanın.

**Her zaman çok satırlı yazın:** açılış, metin ve kapanış **ayrı satırlarda** olsun. Açılış, metin ve kapanışı tek satıra sığdıran biçim (`{% hint %}metin{% endhint %}`) DocHub'da çizilir ama tercih edilmez; diğer araçlarda ve editörde sorun çıkarabilir. Aynı kural `tabs`, `stepper`, `code` gibi çift etiketli tüm bloklar için geçerlidir.

## Tabs (sekmeler)

Alternatifler için: farklı işletim sistemi, dil, ortam.

````markdown
{% tabs %}
{% tab title="Linux" %}
```bash
./kur.sh
```
{% endtab %}

{% tab title="Windows" %}
```powershell
.\kur.ps1
```
{% endtab %}
{% endtabs %}
````

## Stepper (adımlar)

Sıra önemli olduğunda: kurulum, yükseltme, geri alma.

```markdown
{% stepper %}
{% step %}
### Bağımlılıkları kurun

`docker compose pull` ile imajları indirin.
{% endstep %}

{% step %}
### Servisi başlatın

`docker compose up -d` komutunu çalıştırın.
{% endstep %}
{% endstepper %}
```

Adım başlığı için `### ` kullanın: `## ` başlıkları zorunlu başlık sayımına girer ve sırayı bozabilir.

## Genişletilebilir bölüm (details)

İsteğe bağlı, uzun ayrıntı için.

````markdown
<details>
<summary>Gelişmiş yapılandırma</summary>

Çoğu kurulumda gerekmeyen ayrıntılar.

```yaml
ayar: <ornek-deger>
```
</details>
````

## Columns (sütunlar)

Yan yana karşılaştırma; **en çok iki sütun**.

```markdown
{% columns %}
{% column %}
### Önce

Eski yaklaşım.
{% endcolumn %}

{% column %}
### Sonra

Yeni yaklaşım.
{% endcolumn %}
{% endcolumns %}
```

## Updates (güncelleme zaman çizelgesi)

Tarihli duyurular, kısa sürüm notları. Tam sürüm sayfası için changelog sürüm sayfası (`dochub-changelog`) kullanılır; `updates` bunun yerine geçmez.

```markdown
{% updates format="full" %}
{% update date="2026-10-16" tags="api" %}
# Bilet iptal ucu

`POST /bilet/{id}/iptal` eklendi.
{% endupdate %}

{% update date="2026-10-01" %}
# Saat dilimi düzeltmesi

Dönüşüm hatası giderildi.
{% endupdate %}
{% endupdates %}
```

`date` `YYYY-AA-GG` biçimindedir; `tags` virgülle ayrılır (isteğe bağlı).

## Cards (kart tablosu)

Gezinme kartları; HTML tablo olarak yazılır.

```markdown
<table data-view="cards">
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th data-hidden data-card-target data-type="content-ref"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Kurulum</strong></td>
      <td>İlk kurulumu beş adımda tamamlayın.</td>
      <td><a href="kurulum.md">kurulum</a></td>
    </tr>
    <tr>
      <td><strong>API başvurusu</strong></td>
      <td>Uçlar ve şemalar.</td>
      <td><a href="api.md">api</a></td>
    </tr>
  </tbody>
</table>
```

Kart hedefleri var olan sayfalara göreli bağlanmalıdır.

## Embed (gömülü içerik)

```markdown
{% embed url="https://www.youtube.com/watch?v=ornek" %}
```

DocHub gömmeyi `iframe` olarak **çizmez**; bağlantı olarak gösterir. Bu yüzden anlatımı gömmeye bırakmayın; kısa açıklama yazın.

## File (dosya eki): repo içeriğinde DESTEKLENMEZ

`{% file %}` bloğu ile repodaki PDF/ZIP/Office gibi dosya ekleri DocHub'a **aktarılmaz**; blok çizilmez ve dosya indirilemez. Repo içeriğinde `{% file %}` kullanmayın ve `.gitbook/assets/` altına indirilebilir ek koymayın. Bunun yerine dosyanın durduğu yere (SharePoint, sürüm sayfası, yapı çıktısı vb.) **bağlantı** verin:

```markdown
Kurulum rehberi (PDF): [SharePoint'te aç](https://ornek.sharepoint.com/sites/urun/kurulum-rehberi.pdf)
```

Yalnızca dış `http(s)` adresine işaret eden bir `{% file src="https://…" %}` bloğu DocHub'da dosya kartı olarak görünür; yine de düz bağlantı daha güvenlidir. `dochub-dogrula` betiği yerel dosyaya işaret eden `{% file %}` kullanımını `gitbook-blok` kuralıyla hata sayar.

## Buton

```markdown
<a href="https://ornek.com/indir" class="button primary">İndir</a>
<a href="kurulum.md" class="button secondary">Kurulum adımları</a>
```

## İkon

Font Awesome adlarıyla (`fa-` önekiyle):

```markdown
<i class="fa-check">check</i> Etkin
<i class="fa-triangle-exclamation">warning</i> Yapılandırma gerekir
```

## Başlıklı kod bloğu

````markdown
{% code title="docker-compose.yml" %}
```yaml
services:
  api:
    image: ornek/api:1.4.0
```
{% endcode %}
````

Kod bloklarında dil adı yazın (`bash`, `yaml`, `json`, `csharp`, `typescript`…). Komut çıktısı ve örnek değerlerde gerçek sır/IP kullanmayın; `<ornek-deger>` yazın.

## OpenAPI

`{% openapi … %}` bloğu ve SUMMARY'de `builtin:openapi` DocHub'da **bağlantı kartına** döner (tam OpenAPI desteği yoktur). Bunun yerine:

```markdown
API sözleşmesi: [openapi.yaml](../api/openapi.yaml)

| Yöntem | Yol | Açıklama |
|---|---|---|
| `POST` | `/bilet` | Bilet oluşturur |
| `GET` | `/bilet/{id}` | Bilet getirir |
```

## Tekrar kullanılan içerik (include)

Include dosyaları bir `.gitbook/includes/` klasöründe durur ve yalnız oradaki dosyalar include edilebilir. Yol **çağıran sayfaya göredir**:

```markdown
<!-- Klasör düzeyi include: docs/kurulum/.gitbook/includes/uyari.md, docs/kurulum/README.md içinden -->
{% include ".gitbook/includes/uyari.md" %}

<!-- Depo kökündeki include: .gitbook/includes/ortak.md, docs/kurulum/README.md içinden (doğru ../ derinliği) -->
{% include "../../.gitbook/includes/ortak.md" %}
```

* Klasör düzeyi (`<klasör>/.gitbook/includes/`) ve kök (`.gitbook/includes/`) include'ları birlikte desteklenir.
* Yol çözülemezse (klasörün dışına çıkıyor ya da dosya yok) DocHub, **tekil** dosya adı eşleşmesi arar: klasör düzeyi ve kök `.gitbook/includes/` içinde aynı adlı tek bir dosya varsa o kullanılır. Aynı ad birden çok yerdeyse include **belirsiz** sayılır ve atlanır; bu yüzden tam yolu yazın ve dosya adlarını benzersiz tutun.
* `{% include %}` yalnız kendi satırında durmalıdır. `dochub-dogrula` çözülemeyen include'ları `include-hedef` kuralıyla bildirir.

## Değişkenler

Ürün genelinde tekrar eden değerler `.gitbook/vars.yaml` içinde tutulur; sayfa içinde:

```markdown
Sürüm: <code class="expression">space.vars.surum</code>
```

Yalnız bir sayfaya özel değişken, sayfa ön maddesindeki `vars:` altında tanımlanır ve `page.vars.ad` ile okunur. Değişkenlere gizli değer koymayın.

## Standart markdown

Listeler, tablolar, bağlantılar, görseller (`![alt metin](.gitbook/assets/sema.png)`), kalın/italik, satır içi kod ve dil etiketli kod blokları serbesttir. Görseller klasör düzeyindeki `<klasör>/.gitbook/assets/` ya da depo kökündeki `.gitbook/assets/` altında durabilir; yol sayfaya göredir (kök için `../../.gitbook/assets/logo.png` gibi doğru `../` derinliği). Bağlantılar:

* Aynı klasör: `[Kurulum](kurulum.md)`; üst klasör: `[Mimari](../mimari/README.md)`.
* **Başka bir beyan edilmiş klasördeki** sayfa: `[Kurulum](../kurulum/README.md)`. Aynı repo içindeki `.md` bağlantıları (düz bağlantı, kart ve buton `href` değerleri dahil) DocHub doküman bağlantılarına çevrilir; hedef dosya var olmalıdır (`baglanti-hedef`).
* Dış bağlantı: `[Docker](https://docs.docker.com)`.

## Bloklarda sık yapılan hatalar

* `{% endhint %}`, `{% endtab %}`, `{% endstep %}` kapanışlarını unutmak ya da yanlış yazmak.
* Hint'i tek satırda (`{% hint %}metin{% endhint %}`) yazmak; açılış/metin/kapanışı ayrı satırlara koyun.
* `{% file %}` ile repo dosyası eklemek (desteklenmez; bağlantı verin).
* `{% tabs %}` dışında `{% tab %}` kullanmak.
* İkiden çok `{% column %}`.
* `{% step %}` içinde zorunlu başlıkla aynı adı `## ` ile yazmak.
* Desteklenmeyen iframe/HTML/OpenAPI bloğu eklemek.
* Kod bloğuna gerçek parola, token, IP ya da bağlantı dizesi yazmak.
