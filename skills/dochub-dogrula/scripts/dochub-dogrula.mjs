#!/usr/bin/env node
// DocHub repo doğrulama betiği — Node >= 18, bağımlılık yok.
// Kurallar DocHub'ın RepoSozlesmesi (dochub.yaml) ve DokumanKurallari (içerik) sınıflarıyla aynı sonucu verir.
// Kullanım: node dochub-dogrula.mjs [kök] [--json] [--katalog dosya.json]
// Çıkış kodu: 0 = tüm kurallar geçti, 1 = en az bir kural kaldı, 2 = kullanım/katalog hatası.
// Paket sürümü: 1.2.0
import { existsSync, lstatSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Üretici bu yer tutucuyu katalog JSON'u ile değiştirir (bkz. skill-paketi/YER_TUTUCULAR.md).
const GOMULU_KATALOG = {"surum":"1.2.0","dosyaTabanliTipler":["09","10","13","14","15"],"tipler":[{"no":"01","ad":"Modül - Özellik Seti","slug":"modul-ozellik-seti","amac":"Ürünün modüllerini ve her modülün sunduğu özellikleri, bağımlılıklarıyla birlikte ve ürünün neyi yapmadığını da belirterek anlatır; ürün yöneticileri, satış ve ortaklar için hazırlanır. Teknik tasarım, kurulum ya da test ayrıntısı ile künye bilgisi (sahip, persona, gizlilik) içermez.","zorunluBasliklar":["Modül listesi","Modül başına özellik tablosu","Bağımlılıklar","Bu ürün neyi yapmaz"],"varsayilanGizlilik":"IcKullanim","kodIpuclari":""},{"no":"02","ad":"Ürün Geliştirme Dokümanı (FATAD)","slug":"urun-gelistirme-dokumani-fatad","amac":"Özelliğin iş ihtiyacını, gereksinimlerini, kabul kriterlerini ve risklerini yazılımcı, analist ve test mühendisi için toplar. Gereksinimler ID'li (ör. `GRK-01`) ve test edilebilir yazılır; örnek: \"Yanıt süresi 2 saniyenin altında olmalıdır\", \"Sistem hızlı olmalıdır\" değil. Mimari ve künye içermez.","zorunluBasliklar":["İş ihtiyacı","Gereksinimler (ID'li)","İş kuralları","Kabul kriterleri","Riskler ve açık sorular"],"varsayilanGizlilik":"Gizli","kodIpuclari":""},{"no":"03","ad":"Sistem Dizayn Dokümanı","slug":"sistem-dizayn-dokumani","amac":"Sistemin mimarisini, bileşenlerini ve sorumluluklarını, veri modelini, arayüzlerini ve alınan teknik kararları yazılımcı, analist ve test mühendisine anlatır. Gereksinim listesi, kurulum adımı ya da ortam envanteri içermez; bunlar FATAD, Kurulum ve Topoloji dokümanlarında yer alır.","zorunluBasliklar":["Mimari diyagram","Bileşenler ve sorumlulukları","Veri modeli","Arayüzler","Teknik kararlar"],"varsayilanGizlilik":"Gizli","kodIpuclari":"- Modül/katman yapısı: üst düzey klasörler, çözüm (.sln) ve proje dosyaları (.csproj, package.json, pom.xml)\n- Veri modeli: entity/model sınıfları, DbContext, şema dosyaları\n- Migration klasörleri ve veritabanı betikleri\n- Bağımlılıklar: paket yöneticisi dosyaları (csproj, package.json, requirements.txt), servisler arası istemciler"},{"no":"04","ad":"Topoloji","slug":"topoloji","amac":"Ortamları, sunucu ve servis envanterini, port matrisini ve yedeklilik yapısını topoloji diyagramıyla yazılımcı ve mimarlar için gösterir. Kurulum adımı, boyutlandırma rehberi ya da gerçek parola ve IP adresi içermez; künye bilgisi yan panelde tutulur.","zorunluBasliklar":["Ortamlar","Topoloji diyagramı","Sunucu ve servis envanteri","Port matrisi","Yedeklilik"],"varsayilanGizlilik":"Gizli","kodIpuclari":"- Deploy ve Kubernetes tanımları (deploy/, k8s/, manifest dosyaları)\n- Ortam tanımları (appsettings.*.json, .env.example, ortam değişkeni listeleri)\n- Ağ ve port bilgisi: Dockerfile EXPOSE, compose ports, Service/Ingress tanımları"},{"no":"05","ad":"Test Senaryoları","slug":"test-senaryolari","amac":"Test kapsamını, gereksinim ile senaryo eşleşmesini, senaryo tablosunu ve çıkış kriterlerini test mühendisleri için yazar. Gereksinimin kendisini ya da otomasyon kodunun ayrıntısını içermez; her senaryo bir gereksinime bağlanır.","zorunluBasliklar":["Test kapsamı","Gereksinim–senaryo eşleşmesi","Senaryo tablosu","Çıkış kriterleri"],"varsayilanGizlilik":"Gizli","kodIpuclari":""},{"no":"06","ad":"Test Otomasyonu Dokümanları","slug":"test-otomasyonu-dokumanlari","amac":"Otomasyonun kapsamını, repo ve çalıştırma bilgisini, CI/CD bağlantısını, senaryo envanterini ve bakım sahibini test mühendisleri için anlatır. Manuel test senaryolarını ya da gerçek kimlik bilgilerini içermez; gizli değerler için değişken adı veya yer tutucu kullanılır.","zorunluBasliklar":["Otomasyon kapsamı","Repo ve çalıştırma","CI/CD bağlantısı","Senaryo envanteri","Bakım sahibi"],"varsayilanGizlilik":"Gizli","kodIpuclari":"- Test projeleri ve klasörleri (tests/, *.Tests, __tests__, e2e/)\n- Test çatısı yapılandırması (xunit, jest, vitest, playwright, cypress)\n- CI pipeline dosyaları (.github/workflows, azure-pipelines.yml, Jenkinsfile) ve test adımları"},{"no":"07","ad":"Kurulum Dokümanı","slug":"kurulum-dokumani","amac":"Ürünün kurulumunu önkoşullar, sıralı adımlar, parametreler, doğrulama, geri alma ve sık hatalarla DevOps ekibi için anlatır. Gerçek parola, token ve IP adresi yazılmaz; değişken adı ya da yer tutucu kullanılır. Mimari gerekçe ve boyutlandırma Sistem Dizayn ile Kurulum Topolojisi dokümanlarındadır.","zorunluBasliklar":["Önkoşullar","Kurulum adımları","Konfigürasyon parametreleri","Doğrulama","Geri alma","Sık karşılaşılan hatalar"],"varsayilanGizlilik":"Kisitli","kodIpuclari":"- Dockerfile ve docker-compose dosyaları\n- deploy/ ve Kubernetes manifestleri, Helm chart'ları (Chart.yaml, values.yaml)\n- appsettings.json ve .env.example (gerçek .env dosyasını okuma/kopyalama)\n- Kurulum betikleri (scripts/, Makefile)"},{"no":"08","ad":"Kurulum Topolojisi","slug":"kurulum-topolojisi","amac":"Desteklenen dağıtım seçeneklerini, referans diyagramı, bileşen gereksinimlerini, boyutlandırmayı ve ağ ile port gereksinimlerini DevOps ekibi için özetler. Adım adım kurulum talimatı ya da gerçek IP adresi içermez; kurulum adımları Kurulum Dokümanı'ndadır.","zorunluBasliklar":["Dağıtım seçenekleri","Referans diyagram","Bileşen gereksinimleri","Boyutlandırma","Ağ ve port gereksinimleri"],"varsayilanGizlilik":"Kisitli","kodIpuclari":"- docker-compose, Kubernetes ve Helm ile görülen topoloji (servisler, replikalar, bağımlılıklar)\n- Kaynak gereksinimleri: resources.requests/limits, volume ve depolama tanımları\n- Port ve ağ tanımları (Service, Ingress, compose networks)"},{"no":"11","ad":"Güvenlik Dokümanları","slug":"guvenlik-dokumanlari","amac":"Ürünün kimlik ve erişim, veri koruma, loglama, açık yönetim süreci, uyum ve sertifikalar ile sorumluluk paylaşımı konularını güvenlik ekibi ve müşteri güvenlik ekipleri için açıklar. Gerçek parola, anahtar ve IP adresi içermez; tarama raporlarının ayrıntısı DAST ve SAST özetlerinde tutulur.","zorunluBasliklar":["Kimlik ve erişim","Veri koruma","Loglama","Açık yönetim süreci","Uyum ve sertifikalar","Sorumluluk paylaşımı"],"varsayilanGizlilik":"Kisitli","kodIpuclari":"- Kimlik doğrulama / yetkilendirme middleware'leri ve politikaları (auth, JWT, OIDC, rol/policy tanımları)\n- Şifreleme ve anahtar yönetimi (veri koruma, TLS ayarları; anahtar/parola değerlerini yazma)\n- Loglama ve maskeleme ayarları\n- Güvenlik başlıkları, CORS, rate limit yapılandırması"},{"no":"12","ad":"Ürün Roadmapi","slug":"urun-roadmapi","amac":"Ürünün Şimdi, Sıradaki ve Sonra başlıkları altındaki planını ve bu dönem yapılmayacakları ürün yöneticileri ile satış için yazar. Tarih taahhüdü, teknik tasarım ya da sürüm notu içermez; gerçekleşen değişiklikler Release Notları'nda yer alır.","zorunluBasliklar":["Şimdi","Sıradaki","Sonra","Bu dönem yapılmayacaklar"],"varsayilanGizlilik":"Kisitli","kodIpuclari":""},{"no":"16","ad":"Entegrasyon Kılavuzu","slug":"entegrasyon-kilavuzu","amac":"Ürünün API'sine bağlanmak isteyen müşteri geliştiricisi ve partner için hızlı başlangıcı, ortamları ve kimlik doğrulamayı, endpoint tablosunu, hata kodlarını ve sürümlemeyi anlatır. Örneklerde gerçek parola, token ve IP adresi yerine yer tutucu kullanılır; iç mimari ve kurulum ayrıntısı içermez.","zorunluBasliklar":["Hızlı başlangıç","Ortamlar ve kimlik doğrulama","Endpoint tablosu","Hata kodları","Sürümleme"],"varsayilanGizlilik":"Kisitli","kodIpuclari":"- OpenAPI/Swagger tanımları (openapi.json, swagger.yaml)\n- Controller ve endpoint tanımları (route'lar, HTTP metotları)\n- İstemci SDK'ları ve örnek çağrılar\n- Hata kodları ve hata modeli (ProblemDetails, error enum'ları)"},{"no":"17","ad":"Kullanım Kılavuzu","slug":"kullanim-kilavuzu","amac":"Son kullanıcının ürünü kullanmasını sağlar: kimler için olduğunu, başlarken adımlarını, görev akışlarını, hata mesajlarını ve sık sorulan soruları anlatır. Teknik tasarım, kurulum ya da yönetici konfigürasyonu içermez; uzun kılavuzlar modül başına alt sayfalara bölünür.","zorunluBasliklar":["Kimler için","Başlarken","Görev akışları","Hata mesajları","SSS"],"varsayilanGizlilik":"Acik","kodIpuclari":""},{"no":"18","ad":"Release Notları","slug":"release-notlari","amac":"Bir sürümde gelen yenilikleri, düzeltilen sorunları, kırıcı değişiklikleri ve bilinen sorunları müşteri ve satış için duyurur. Plan ya da roadmap maddesi, iç teknik tartışma ve gizli bilgi içermez; her madde kullanıcıya etkisi açısından yazılır.","zorunluBasliklar":["Sürüm künyesi","Yenilikler","Düzeltilen sorunlar","Kırıcı değişiklikler","Bilinen sorunlar"],"varsayilanGizlilik":"Acik","kodIpuclari":"- Git etiketleri (git tag, git describe)\n- Commit geçmişi (son etiketten bu yana)\n- PR başlıkları ve birleştirme commit'leri"}]};

const AZAMI_BAYT = 64 * 1024;
const AZAMI_KAYNAK = 50;

// DokumanKurallari ile aynı düzenli ifadeler. .NET sözcük sınırı Unicode duyarlıdır, JS sınırı ASCII (Türkçe harf bitişikliğinde ayrışır); bu yüzden IP sınırları Unicode bakışlarla yazılır.
const IP = /(?<![\p{L}\p{N}_])(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)(?![\p{L}\p{N}_])/u;
// Hassas bilgi: gizli değer ataması, bilinen token biçimleri, PEM özel anahtar başlığı (DokumanKurallari.HassasTurleri ile aynı).
const GIZLI_ATAMA = /(?:password|passwd|pwd|şifre|sifre|parola|secret|token|api[_-]?key|access[_-]?key|private[_-]?key)[\p{L}\p{N}_-]*["']?[ \t]*[:=][ \t]*["']?([^\s"'`<>]{6,})/giu;
const TOKEN_BICIMI = /gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{50,}|AKIA[0-9A-Z]{16}|eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}|xox[baprs]-[A-Za-z0-9-]{10,}/;
const OZEL_ANAHTAR = /-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----/;
const YER_TUTUCU_DEGER = /^[*xX.\-_]+$/;

function yerTutucuMu(v) {
  return /^[${<%]/.test(v) || YER_TUTUCU_DEGER.test(v) || v.includes('...') || v.includes('…')
    || ['true', 'false', 'null', 'none', 'yok', 'boş'].includes(v.toLowerCase());
}

// Gizli değer: sondaki noktalama atılır; en az 6 karakter, yer tutucu değil ve en az bir harf dışı karakter (rakam/sembol) içerir. Düz sözcükleri ("Parola: zorunludur") eler.
function gizliDegerMi(ham) {
  const v = ham.replace(/[.,;:!?)\]]+$/u, '');
  return v.length >= 6 && !yerTutucuMu(v) && /[^\p{L}]/u.test(v);
}

class YamlHatasi extends Error {}

// ───────────── Küçük YAML ayrıştırıcısı (yalnız dochub.yaml sözleşmesi) ─────────────
// Desteklenen: girintili eşlemeler, `- ` listeleri, tek satırlık [a, b] listeleri, tırnaklı/tırnaksız skalerler, # yorumları.
// Desteklenmeyen (geçersiz YAML sayılır): çok satırlı skaler, çapa/etiket, {…} eşlemeleri, sekme girintisi.

function yorumSil(s) {
  let tirnak = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (tirnak) {
      if (c === '\\' && tirnak === '"') i++;
      else if (c === tirnak) tirnak = null;
    } else if (c === '"' || c === "'") {
      if (i === 0 || /[\s\[,:-]/.test(s[i - 1])) tirnak = c;
    } else if (c === '#' && (i === 0 || /\s/.test(s[i - 1]))) {
      return s.slice(0, i).trimEnd();
    }
  }
  return s.trimEnd();
}

const gecersiz = (satir) => new YamlHatasi(`dochub.yaml: satır ${satir}: geçersiz YAML.`);

function jetonla(metin) {
  const jetonlar = [];
  const satirlar = metin.replace(/^\uFEFF/, '').split('\n');
  for (let i = 0; i < satirlar.length; i++) {
    const ham = satirlar[i].replace(/\r$/, '');
    const s = yorumSil(ham);
    if (s.trim() === '') continue;
    if (s.trim() === '---' && jetonlar.length === 0) continue;
    const girinti = s.length - s.trimStart().length;
    if (/\t/.test(s.slice(0, girinti))) throw gecersiz(i + 1);
    jetonlar.push({ girinti, metin: s.trim(), satir: i + 1 });
  }
  return jetonlar;
}

function skalerCoz(m, satir) {
  if (m.startsWith('"')) {
    if (m.length < 2 || !m.endsWith('"')) throw gecersiz(satir);
    return m.slice(1, -1).replace(/\\(["\\nt])/g, (_, k) => ({ '"': '"', '\\': '\\', n: '\n', t: '\t' }[k]));
  }
  if (m.startsWith("'")) {
    if (m.length < 2 || !m.endsWith("'")) throw gecersiz(satir);
    return m.slice(1, -1).replace(/''/g, "'");
  }
  if (/^[&*!|>{%@`]/.test(m)) throw gecersiz(satir);
  return m;
}

function anahtarBol(metin) {
  let tirnak = null;
  for (let i = 0; i < metin.length; i++) {
    const c = metin[i];
    if (tirnak) {
      if (c === '\\' && tirnak === '"') i++;
      else if (c === tirnak) tirnak = null;
    } else if ((c === '"' || c === "'") && i === 0) tirnak = c;
    else if (c === ':' && (i === metin.length - 1 || metin[i + 1] === ' ')) {
      return { anahtar: skalerCoz(metin.slice(0, i).trim(), 0), deger: metin.slice(i + 1).trim() };
    }
  }
  return null;
}

function degerAyristir(rest, satir) {
  if (rest === '') return { t: 'skaler', satir, deger: '' };
  if (rest.startsWith('[')) {
    if (!rest.endsWith(']')) throw gecersiz(satir);
    const ic = rest.slice(1, -1);
    const ogeler = [];
    let tirnak = null;
    let bas = 0;
    const ekle = (parca) => {
      const p = parca.trim();
      if (p === '') return;
      if (/^[\[{]/.test(p)) throw gecersiz(satir);
      ogeler.push({ t: 'skaler', satir, deger: skalerCoz(p, satir) });
    };
    for (let i = 0; i < ic.length; i++) {
      const c = ic[i];
      if (tirnak) {
        if (c === '\\' && tirnak === '"') i++;
        else if (c === tirnak) tirnak = null;
      } else if (c === '"' || c === "'") tirnak = c;
      else if (c === ',') {
        ekle(ic.slice(bas, i));
        bas = i + 1;
      }
    }
    ekle(ic.slice(bas));
    return { t: 'liste', satir, ogeler };
  }
  return { t: 'skaler', satir, deger: skalerCoz(rest, satir) };
}

const listeSatiri = (metin) => /^-(\s|$)/.test(metin);

function blokAyristir(st, girinti) {
  return listeSatiri(st.j[st.i].metin) ? listeAyristir(st, girinti) : esleme(st, girinti);
}

function esleme(st, girinti) {
  const dugum = { t: 'esleme', satir: st.j[st.i].satir, alanlar: new Map() };
  while (st.i < st.j.length && st.j[st.i].girinti === girinti) {
    const t = st.j[st.i];
    if (listeSatiri(t.metin)) throw gecersiz(t.satir);
    const b = anahtarBol(t.metin);
    if (!b) throw gecersiz(t.satir);
    st.i++;
    let deger;
    const sonraki = st.j[st.i];
    if (b.deger === '') {
      if (sonraki && sonraki.girinti > girinti) deger = blokAyristir(st, sonraki.girinti);
      else if (sonraki && sonraki.girinti === girinti && listeSatiri(sonraki.metin)) deger = listeAyristir(st, girinti);
      else deger = { t: 'skaler', satir: t.satir, deger: '' };
    } else {
      deger = degerAyristir(b.deger, t.satir);
      if (sonraki && sonraki.girinti > girinti) throw gecersiz(sonraki.satir);
    }
    if (dugum.alanlar.has(b.anahtar)) throw new YamlHatasi('dochub.yaml: aynı anahtar birden fazla kez yazılmış.');
    dugum.alanlar.set(b.anahtar, deger);
  }
  const s = st.j[st.i];
  if (s && s.girinti > girinti) throw gecersiz(s.satir);
  return dugum;
}

function listeAyristir(st, girinti) {
  const dugum = { t: 'liste', satir: st.j[st.i].satir, ogeler: [] };
  while (st.i < st.j.length && st.j[st.i].girinti === girinti && listeSatiri(st.j[st.i].metin)) {
    const t = st.j[st.i];
    const kalan = t.metin.replace(/^-\s*/, '');
    const kolon = girinti + (t.metin.length - kalan.length);
    if (kalan === '') {
      st.i++;
      const s = st.j[st.i];
      if (s && s.girinti > girinti) dugum.ogeler.push(blokAyristir(st, s.girinti));
      else dugum.ogeler.push({ t: 'skaler', satir: t.satir, deger: '' });
    } else if (listeSatiri(kalan)) {
      throw gecersiz(t.satir);
    } else if (anahtarBol(kalan)) {
      st.j[st.i] = { girinti: kolon, metin: kalan, satir: t.satir };
      dugum.ogeler.push(esleme(st, kolon));
    } else {
      st.i++;
      dugum.ogeler.push(degerAyristir(kalan, t.satir));
    }
  }
  const s = st.j[st.i];
  if (s && s.girinti > girinti) throw gecersiz(s.satir);
  return dugum;
}

function yamlAyristir(metin) {
  const j = jetonla(metin);
  if (j.length === 0) return null;
  const st = { j, i: 0 };
  const kok = blokAyristir(st, j[0].girinti);
  if (st.i < j.length) throw gecersiz(j[st.i].satir);
  return kok;
}

// ───────────── dochub.yaml doğrulaması (RepoSozlesmesi.Ayristir aynası) ─────────────

const hata = (n, m) => new YamlHatasi(`dochub.yaml: satır ${n.satir}: ${m}`);

function gerekli(a, ad, kap) {
  const d = a.alanlar.get(ad);
  if (d === undefined) throw hata(kap, `\`${ad}\` zorunlu.`);
  return d;
}

function skaler(n, ad) {
  if (n.t !== 'skaler') throw hata(n, `\`${ad}\` tek bir değer olmalı.`);
  return n;
}

function yolTemizle(yol) {
  yol = yol.replaceAll('\\', '/');
  while (yol.startsWith('./')) yol = yol.slice(2);
  if (yol.startsWith('/') || /^[A-Za-z]:/.test(yol)) return null;
  const parcalar = yol.split('/').filter((p) => p.length > 0 && p !== '.');
  if (parcalar.length === 0 || parcalar.includes('..')) return null;
  return parcalar.join('/');
}

function klasorTemizle(k) {
  if (k == null || k.trim() === '') return null;
  return yolTemizle(k.trim().replaceAll('\\', '/').replace(/\/+$/, ''));
}

export function sozlesmeAyristir(yaml, gecerliTipler, dosyaTabanliTipler) {
  if (yaml.trim() === '') throw new YamlHatasi('dochub.yaml boş.');
  if (yaml.length > AZAMI_BAYT) throw new YamlHatasi('dochub.yaml çok büyük.');
  const kok = yamlAyristir(yaml);
  if (kok === null || kok.t !== 'esleme') throw new YamlHatasi('dochub.yaml: satır 1: kök bir anahtar-değer listesi olmalı.');

  const surum = skaler(gerekli(kok, 'surum', kok), 'surum');
  if (surum.deger !== '1') throw hata(surum, '`surum: 1` olmalı.');
  const urun = skaler(gerekli(kok, 'urun', kok), 'urun');
  if (urun.deger.trim() === '') throw hata(urun, '`urun` boş olamaz.');
  const dizi = gerekli(kok, 'dokumanlar', kok);
  if (dizi.t !== 'liste') throw hata(dizi, '`dokumanlar` bir liste olmalı.');
  if (dizi.ogeler.length === 0) throw hata(dizi, '`dokumanlar` en az bir kayıt içermeli.');

  const beyanlar = [];
  const tipler = new Set();
  const klasorler = new Set();
  for (const oge of dizi.ogeler) {
    if (oge.t !== 'esleme') throw hata(oge, 'Her doküman kaydı anahtar-değer listesi olmalı.');
    const tipD = skaler(gerekli(oge, 'tip', oge), 'tip');
    const tip = tipD.deger;
    if (tip.length !== 2 || !/^[0-9]{2}$/.test(tip)) throw hata(tipD, `\`tip\` iki haneli olmalı ("${tip}").`);
    if (!gecerliTipler.has(tip)) throw hata(tipD, `Bilinmeyen doküman tipi: ${tip}.`);
    if (dosyaTabanliTipler.has(tip)) throw hata(tipD, `${tip} dosya tabanlı bir tiptir; repo'dan senkronize edilemez.`);
    if (tipler.has(tip)) throw hata(tipD, `${tip} tipi birden fazla kez beyan edilmiş.`);
    tipler.add(tip);

    const klasorD = skaler(gerekli(oge, 'klasor', oge), 'klasor');
    const klasor = klasorTemizle(klasorD.deger);
    if (klasor === null) throw hata(klasorD, '`klasor` repo içinde göreli bir yol olmalı (`..` ve mutlak yol yok).');
    const klasorAnahtar = klasor.toUpperCase();
    if (klasorler.has(klasorAnahtar)) throw hata(klasorD, `\`${klasor}\` klasörü birden fazla kez beyan edilmiş.`);
    klasorler.add(klasorAnahtar);

    let otomatik = false;
    if (oge.alanlar.has('otomatik')) {
      const s = skaler(oge.alanlar.get('otomatik'), 'otomatik');
      if (s.deger === 'true' || s.deger === 'True') otomatik = true;
      else if (s.deger !== 'false' && s.deger !== 'False') throw hata(s, '`otomatik` true ya da false olmalı.');
    }

    const kaynaklar = [];
    if (oge.alanlar.has('kaynaklar')) {
      const ks = oge.alanlar.get('kaynaklar');
      if (ks.t !== 'liste') throw hata(ks, '`kaynaklar` bir glob listesi olmalı.');
      if (ks.ogeler.length > AZAMI_KAYNAK) throw hata(ks, `\`kaynaklar\` en çok ${AZAMI_KAYNAK} öğe içerebilir.`);
      for (const k of ks.ogeler) {
        const g = skaler(k, 'kaynaklar');
        if (g.deger.trim() === '') throw hata(g, '`kaynaklar` öğesi boş olamaz.');
        kaynaklar.push(g.deger.trim());
      }
    }
    beyanlar.push({ tip, klasor, otomatik, kaynaklar });
  }
  return { urun: urun.deger.trim(), dokumanlar: beyanlar };
}

// ───────────── İçerik kuralları (DokumanKurallari aynası) ─────────────

const esit = (a, b) => a.trim().toUpperCase() === b.trim().toUpperCase();

function basliklariKontrolEt(icerik, gerekliBasliklar) {
  const basliklar = icerik
    .split('\n')
    .map((l) => l.replace(/\r$/, ''))
    .filter((l) => l.startsWith('## '))
    .map((l) => l.slice(3).trim());
  const eksik = [];
  let sirasiz = false;
  let pos = -1;
  for (const g of gerekliBasliklar) {
    let i = -1;
    for (let k = pos + 1; k < basliklar.length; k++) {
      if (esit(basliklar[k], g)) { i = k; break; }
    }
    if (i >= 0) pos = i;
    else if (basliklar.some((h) => esit(h, g))) sirasiz = true;
    else eksik.push(g);
  }
  if (eksik.length > 0) return { kod: 'basliklar', gecti: false, mesaj: `Eksik başlık: ${eksik.join(', ')}` };
  if (sirasiz) return { kod: 'basliklar', gecti: false, mesaj: 'Zorunlu başlıkların sırası hatalı' };
  return { kod: 'basliklar', gecti: true, mesaj: 'Zorunlu başlıklar eksiksiz ve sırasıyla' };
}

function hassasKontrolEt(icerik, gizlilik) {
  if (gizlilik !== 'Kisitli' && gizlilik !== 'Acik') {
    return { kod: 'hassas', gecti: true, mesaj: 'Bu gizlilik düzeyinde hassas veri taraması gerekmez' };
  }
  const bulunan = [];
  if (IP.test(icerik)) bulunan.push('IP adresi');
  if ([...icerik.matchAll(GIZLI_ATAMA)].some((m) => gizliDegerMi(m[1]))) bulunan.push('gizli değer ataması');
  if (TOKEN_BICIMI.test(icerik)) bulunan.push('token biçimi');
  if (OZEL_ANAHTAR.test(icerik)) bulunan.push('özel anahtar');
  return bulunan.length === 0
    ? { kod: 'hassas', gecti: true, mesaj: 'Hassas bilgi bulunmadı' }
    : { kod: 'hassas', gecti: false, mesaj: `Hassas bilgi şüphesi: ${bulunan.join(', ')}` };
}

function baslikKarakterKontrolEt(basliklar) {
  const kotu = basliklar.filter((b) => /[/\\#]/.test(b));
  return kotu.length > 0
    ? { kod: 'baslik-karakter', gecti: false, mesaj: 'Başlıkta / \\ # karakteri olamaz', ayrinti: kotu }
    : { kod: 'baslik-karakter', gecti: true, mesaj: 'Başlıkta yasaklı karakter yok' };
}

// ───────────── Dosya yardımcıları ─────────────

const oku = (p) => readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
// lstat: sembolik bağlantılar izlenmez (repo dışını okumayı önler); dosya sayılmaz.
const dosyaMi = (p) => existsSync(p) && lstatSync(p).isFile();
const sirala = (a) => a.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));

function markdownDosyalari(dizin, goreli = '') {
  const sonuc = [];
  for (const ad of sirala(readdirSync(path.join(dizin, goreli)))) {
    if (ad.startsWith('.') || ad === 'node_modules') continue;
    const g = goreli ? `${goreli}/${ad}` : ad;
    const st = lstatSync(path.join(dizin, g));
    if (st.isSymbolicLink()) continue;
    if (st.isDirectory()) sonuc.push(...markdownDosyalari(dizin, g));
    else if (ad.toLowerCase().endsWith('.md')) sonuc.push(g);
  }
  return sonuc;
}

/** Ön maddeyi ayırır: { onMadde: {anahtar: değer | [değer]} | null, govde } */
export function onMaddeAyir(metin) {
  const satirlar = metin.split('\n').map((l) => l.replace(/\r$/, ''));
  if (satirlar[0]?.trim() !== '---') return { onMadde: null, govde: metin };
  let bitis = -1;
  for (let i = 1; i < satirlar.length; i++) {
    if (satirlar[i].trim() === '---') { bitis = i; break; }
  }
  if (bitis < 0) return { onMadde: null, govde: metin };
  const om = {};
  let son = null;
  for (const s of satirlar.slice(1, bitis)) {
    const l = yorumSil(s);
    if (l.trim() === '') continue;
    const oge = /^\s+-\s+(.*)$/.exec(l);
    if (oge && son && Array.isArray(om[son])) { om[son].push(skalerCoz(oge[1].trim(), 0)); continue; }
    // Girintili `anahtar: değer` satırları (ör. `vars:` altındaki sayfa değişkenleri) bir önceki anahtarın alt eşlemesidir.
    if (/^\s+\S/.test(l) && son) {
      const alt = anahtarBol(l.trim());
      if (alt && ((Array.isArray(om[son]) && om[son].length === 0) || (om[son] && typeof om[son] === 'object' && !Array.isArray(om[son])))) {
        if (Array.isArray(om[son])) om[son] = {};
        om[son][alt.anahtar] = alt.deger === '' ? '' : skalerCoz(alt.deger, 0);
        continue;
      }
    }
    const b = anahtarBol(l.trim());
    if (!b) continue;
    son = b.anahtar;
    if (b.deger === '') om[son] = [];
    else if (b.deger.startsWith('[') && b.deger.endsWith(']')) {
      om[son] = b.deger.slice(1, -1).split(',').map((x) => x.trim()).filter(Boolean).map((x) => skalerCoz(x, 0));
    } else om[son] = skalerCoz(b.deger, 0);
  }
  return { onMadde: om, govde: satirlar.slice(bitis + 1).join('\n') };
}

function ozetBaglantilari(metin) {
  const baglantilar = [];
  let kod = false;
  for (const l of metin.split('\n')) {
    if (/^\s*(```|~~~)/.test(l)) { kod = !kod; continue; }
    if (kod) continue;
    for (const m of l.matchAll(/\[([^\]]*)\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)/g)) baglantilar.push({ baslik: m[1], hedef: m[2] });
  }
  return baglantilar;
}

function tarihGecerli(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s ?? '');
  if (!m) return false;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return d.getUTCFullYear() === +m[1] && d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3];
}

// ───────────── Include, değişken, görsel ve bağlantı çözümleme ─────────────

const INCLUDE = /\{%-?[ \t]*include[ \t]+["']([^"'\n]{1,500})["'][ \t]*-?%\}/gi;
const DEGISKEN = /<code\s+class="expression"\s*>\s*(space|page)\.vars\.([A-Za-z0-9_-]+)\s*<\/code>/g;
const URL_BASI = /^(?:[a-zA-Z][a-zA-Z0-9+.-]*:|\/|#)/;   // şema (http:, mailto:, data:…), kök-göreli (/…) ve bağlantı çapası: yerel dosya sayılmaz
const AZAMI_INCLUDE_DERINLIK = 5;

/** Tüm dosyaları (nokta klasörleri dahil; sembolik bağlantılar ve node_modules hariç) mutlak yol olarak listeler. */
function tumDosyalar(dizin) {
  const sonuc = [];
  if (!existsSync(dizin) || !lstatSync(dizin).isDirectory()) return sonuc;
  for (const ad of sirala(readdirSync(dizin))) {
    if (ad === 'node_modules') continue;
    const t = path.join(dizin, ad);
    const st = lstatSync(t);
    if (st.isSymbolicLink()) continue;
    if (st.isDirectory()) sonuc.push(...tumDosyalar(t));
    else sonuc.push(t);
  }
  return sonuc;
}

/** Yerel dosya hedefi: dış bağlantı/çapa ise null; `#`/`?` kırpılır, yüzde kodlaması çözülür. */
function yerelHedef(h) {
  h = h.trim().replace(/^<|>$/g, '');
  if (h === '' || URL_BASI.test(h)) return null;
  h = h.split('#')[0].split('?')[0];
  try { h = decodeURIComponent(h); } catch { /* olduğu gibi */ }
  return h === '' ? null : h;
}

const depodaMi = (kok, tam) => {
  const g = path.relative(path.resolve(kok), tam);
  return g !== '' && !path.isAbsolute(g) && !g.split(/[\\/]/).includes('..');
};

/** Kod çitleri ve satır içi kod dışındaki metin (başvuru taramaları için). */
function kodsuz(metin) {
  const satirlar = [];
  let cit = false;
  for (const l of metin.split('\n')) {
    if (/^\s*(```|~~~)/.test(l)) { cit = !cit; continue; }
    if (!cit) satirlar.push(l.replace(/`[^`\n]*`/g, ''));
  }
  return satirlar.join('\n');
}

/** Sayfadaki yerel başvurular: görseller, .md bağlantıları, include hedefleri. */
export function basvurular(metin) {
  const m = kodsuz(metin);
  const gorseller = [];
  const baglantilar = [];
  const includelar = [];
  for (const x of m.matchAll(/(!?)\[[^\]]*\]\(\s*(<[^>]+>|[^)\s]+)(?:\s+"[^"]*")?\s*\)/g)) {
    const h = yerelHedef(x[2]);
    if (h === null) continue;
    if (x[1] === '!') gorseller.push({ ham: x[2], h });
    else if (/\.md$/i.test(h)) baglantilar.push({ ham: x[2], h });
  }
  for (const x of m.matchAll(/<img\b[^>]*?\bsrc\s*=\s*["']([^"']+)["']/gi)) {
    const h = yerelHedef(x[1]);
    if (h !== null) gorseller.push({ ham: x[1], h });
  }
  for (const x of m.matchAll(/<a\b[^>]*?\bhref\s*=\s*["']([^"']+)["']/gi)) {
    const h = yerelHedef(x[1]);
    if (h !== null && /\.md$/i.test(h)) baglantilar.push({ ham: x[1], h });
  }
  for (const x of m.matchAll(INCLUDE)) includelar.push({ ham: x[1], h: x[1].trim() });
  return { gorseller, baglantilar, includelar };
}

/**
 * Include hedefi (D2): sayfaya göre çözülür; sayfanın klasörünün içinde ya da kökteki `.gitbook/includes/` altında var olmalı.
 * Yoksa (veya bildirilen klasörün dışına çıkıyorsa) klasör düzeyi ve kök `.gitbook/includes/` içinde TEK bir dosya adı eşleşmesine düşülür.
 * Döner: { tam } | { yok: true } | { belirsiz: true }.
 */
export function includeBul(hedef, sayfaTam, adaylar) {
  const tam = path.resolve(path.dirname(sayfaTam), hedef);
  if (adaylar.includes(tam)) return { tam };
  const ad = path.basename(hedef).toLowerCase();
  const es = adaylar.filter((a) => path.basename(a).toLowerCase() === ad);
  if (es.length === 1) return { tam: es[0] };
  return es.length > 1 ? { belirsiz: true } : { yok: true };
}

/** Include'ları (iç içe, derinlik sınırlı) yerine koyar; çözülemeyenleri `sorunlar`a yazar. */
function includeGenislet(metin, sayfaTam, adaylar, sorunlar, derinlik = 0, yigin = []) {
  return metin.replace(INCLUDE, (tum, hedef) => {
    const h = hedef.trim();
    const r = includeBul(h, sayfaTam, adaylar);
    if (r.belirsiz) { sorunlar.push(`${h} (belirsiz: aynı adlı birden çok include var)`); return ''; }
    if (r.yok) { sorunlar.push(`${h} (bulunamadı)`); return ''; }
    if (derinlik >= AZAMI_INCLUDE_DERINLIK || yigin.includes(r.tam)) { sorunlar.push(`${h} (döngü ya da çok derin)`); return ''; }
    return includeGenislet(oku(r.tam), r.tam, adaylar, sorunlar, derinlik + 1, [...yigin, r.tam]);
  });
}

/** `.gitbook/vars.yaml`: düz `anahtar: değer` eşlemesi (DocHub'ın yaptığı gibi yalnız skaler değerler). */
function degiskenOku(dosya) {
  const tablo = {};
  if (!dosyaMi(dosya)) return tablo;
  for (const s of oku(dosya).split('\n')) {
    const l = yorumSil(s.replace(/\r$/, ''));
    if (l.trim() === '' || /^\s/.test(l)) continue;
    const b = anahtarBol(l.trim());
    if (b && b.deger !== '' && !/^[\[{]/.test(b.deger)) {
      try { tablo[b.anahtar] = skalerCoz(b.deger, 0); } catch { /* geçersiz satır atlanır */ }
    }
  }
  return tablo;
}

function degiskenCoz(metin, uzay, sayfa) {
  return metin.replace(DEGISKEN, (tum, kapsam, ad) => {
    const tablo = kapsam === 'space' ? uzay : sayfa;
    return Object.hasOwn(tablo, ad) && typeof tablo[ad] === 'string' ? tablo[ad] : tum;
  });
}

// GitBook blok etiketleri: çift gerektirenler (açılış/kapanış aynı satırda da olabilir — D1) ve tek başına duranlar.
const CIFT_ETIKET = new Set(['hint', 'tabs', 'tab', 'stepper', 'step', 'code', 'file', 'columns', 'column']);

/** Etiket dengesi ve desteklenmeyen `{% file %}` (yerel dosya) kullanımı. Döner: null (etiket yok) | { gecti, mesaj }. */
function blokKontrolEt(metin) {
  const m = kodsuz(metin);
  const etiketler = [...m.matchAll(/\{%-?\s*(end)?([a-z][a-z-]*)([^%]*?)-?%\}/gi)];
  if (etiketler.length === 0) return null;
  const sorunlar = [];
  const yigin = [];
  for (const [, son, ad0, govde] of etiketler) {
    const ad = ad0.toLowerCase();
    if (!CIFT_ETIKET.has(ad)) continue;
    if (!son) {
      yigin.push(ad);
      if (ad === 'file') {
        const src = /\bsrc\s*=\s*["']([^"']*)["']/.exec(govde)?.[1] ?? '';
        if (!/^https?:\/\//i.test(src)) sorunlar.push('`{% file %}` yalnız http(s) bağlantısıyla desteklenir; repodaki dosya ekleri desteklenmez, SharePoint/URL bağlantısı verin');
      }
    } else if (yigin.at(-1) === ad) yigin.pop();
    else sorunlar.push(`\`{% end${ad} %}\` eşleşen bir açılış etiketi olmadan kapanıyor`);
  }
  for (const a of yigin) sorunlar.push(`\`{% ${a} %}\` kapatılmamış (\`{% end${a} %}\` yok)`);
  return sorunlar.length === 0 ? { gecti: true, mesaj: 'GitBook blok etiketleri dengeli' } : { gecti: false, mesaj: sorunlar.join('; ') };
}

const SURUM_BASLIKLARI = ['Sürüm künyesi', 'Yenilikler', 'Düzeltilen sorunlar', 'Kırıcı değişiklikler', 'Bilinen sorunlar'];

/** Sürüm sayfası `## ` başlıkları tohum tip 18 kümesinden olmalı (hepsi isteğe bağlı); başka başlık yalnız UYARI üretir (hata değil). */
function surumBasliklariKontrolEt(govde) {
  const kotu = govde.split('\n').map((l) => l.replace(/\r$/, '')).filter((l) => l.startsWith('## ')).map((l) => l.slice(3).trim())
    .filter((h) => !SURUM_BASLIKLARI.some((g) => esit(g, h)));
  return kotu.length === 0
    ? { gecti: true, mesaj: 'Sürüm sayfası başlıkları tanınıyor' }
    : { gecti: true, seviye: 'uyari', mesaj: `Tanınmayan sürüm başlığı: ${kotu.join(', ')} (kullanılabilir: ${SURUM_BASLIKLARI.join(', ')})` };
}

// ───────────── Ana doğrulama ─────────────

export function dogrula(kok, katalog) {
  const sonuclar = [];
  const ekle = (yol, r) => sonuclar.push({ kod: r.kod, yol, gecti: r.gecti, mesaj: r.mesaj, ...(r.seviye ? { seviye: r.seviye } : {}), ...(r.ayrinti ? { ayrinti: r.ayrinti } : {}) });

  const tipler = new Map(katalog.tipler.map((t) => [t.no, t]));
  const dosyaTabanli = new Set(katalog.dosyaTabanliTipler ?? []);
  const gecerli = new Set([...tipler.keys(), ...dosyaTabanli]);

  const yamlYolu = path.join(kok, 'dochub.yaml');
  if (!dosyaMi(yamlYolu)) {
    ekle('dochub.yaml', { kod: 'yaml', gecti: false, mesaj: 'dochub.yaml bulunamadı.' });
    return sonuclar;
  }
  let sozlesme;
  try {
    sozlesme = sozlesmeAyristir(oku(yamlYolu), gecerli, dosyaTabanli);
    ekle('dochub.yaml', { kod: 'yaml', gecti: true, mesaj: 'dochub.yaml geçerli' });
  } catch (e) {
    if (!(e instanceof YamlHatasi)) throw e;
    ekle('dochub.yaml', { kod: 'yaml', gecti: false, mesaj: e.message });
    return sonuclar;
  }

  const uzayDegiskenleri = degiskenOku(path.join(kok, '.gitbook', 'vars.yaml'));
  const kokIncludeDizini = path.join(kok, '.gitbook', 'includes');

  for (const b of sozlesme.dokumanlar) {
    const tip = tipler.get(b.tip);
    const klasorDizini = path.join(kok, ...b.klasor.split('/'));
    const uzay = { ...uzayDegiskenleri, ...degiskenOku(path.join(klasorDizini, '.gitbook', 'vars.yaml')) };
    const adaylar = [...new Set([...tumDosyalar(path.join(klasorDizini, '.gitbook', 'includes')), ...tumDosyalar(kokIncludeDizini)])];
    /** Sayfanın DocHub'ın gördüğü içeriği: include'lar yerinde, değişkenler çözülmüş (hassas/başlık kuralları bunu tarar). */
    const sayfaOku = (tam) => {
      const { onMadde, govde } = onMaddeAyir(oku(tam));
      const sorunlar = [];
      const icerik = degiskenCoz(includeGenislet(govde, tam, adaylar, sorunlar), uzay, onMadde?.vars && typeof onMadde.vars === 'object' ? onMadde.vars : {});
      return { onMadde, govde, icerik, sorunlar };
    };
    const readmeYol = `${b.klasor}/README.md`;
    const readmeTam = path.join(klasorDizini, 'README.md');

    if (!dosyaMi(readmeTam)) {
      ekle(readmeYol, { kod: 'readme', gecti: false, mesaj: `${b.tip} · ${tip.ad}: ${readmeYol} bulunamadı` });
    } else {
      ekle(readmeYol, { kod: 'readme', gecti: true, mesaj: `${readmeYol} var` });
      // D4: GitHub kaynaklı Release Notları (18) kök sayfası serbest bir giriştir; zorunlu başlık aranmaz.
      ekle(readmeYol, b.tip === '18'
        ? { kod: 'basliklar', gecti: true, mesaj: 'Release Notları kök sayfasında zorunlu başlık aranmaz' }
        : basliklariKontrolEt(sayfaOku(readmeTam).icerik, tip.zorunluBasliklar));
    }

    // SUMMARY.md: bağlantılar var olan dosyalara işaret etmeli; başlıklarda / \ # olmamalı.
    const summaryYol = `${b.klasor}/SUMMARY.md`;
    const summaryTam = path.join(klasorDizini, 'SUMMARY.md');
    if (dosyaMi(summaryTam)) {
      const baglantilar = ozetBaglantilari(oku(summaryTam));
      const eksik = [];
      for (const { hedef } of baglantilar) {
        if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(hedef) || hedef.startsWith('#')) continue;
        let h = hedef.split('#')[0].split('?')[0];
        try { h = decodeURIComponent(h); } catch { /* olduğu gibi */ }
        if (h === '') continue;
        const tam = path.resolve(klasorDizini, h);
        const goreli = path.relative(path.resolve(kok), tam);
        if (goreli.split(path.sep === '/' ? '/' : /[\\/]/).includes('..') || path.isAbsolute(goreli) || !dosyaMi(tam)) eksik.push(hedef);
      }
      ekle(summaryYol, eksik.length === 0
        ? { kod: 'summary', gecti: true, mesaj: 'SUMMARY.md bağlantıları var olan dosyalara işaret ediyor' }
        : { kod: 'summary', gecti: false, mesaj: `SUMMARY.md var olmayan dosyalara bağlanıyor: ${eksik.join(', ')}` });
      ekle(summaryYol, baslikKarakterKontrolEt(baglantilar.map((x) => x.baslik)));
    }

    // Hassas bilgi taraması + changelog ön maddesi: klasördeki tüm sayfalar (SUMMARY.md hariç).
    if (!existsSync(klasorDizini) || !statSync(klasorDizini).isDirectory()) continue;
    for (const g of markdownDosyalari(klasorDizini)) {
      if (g.toLowerCase() === 'summary.md') continue;
      const yol = `${b.klasor}/${g}`;
      const sayfaTam = path.join(klasorDizini, g);
      const { onMadde, govde, icerik, sorunlar: includeSorunlari } = sayfaOku(sayfaTam);
      ekle(yol, hassasKontrolEt(icerik, tip.varsayilanGizlilik));

      // Başvuru hedefleri (D2/D5): include, görsel ve .md bağlantıları var olmalı. Yalnız başvuru olan sayfalar için sonuç üretilir.
      const bv = basvurular(govde);
      const eksikDosya = (liste) => liste.filter(({ h }) => {
        const tam = path.resolve(path.dirname(sayfaTam), h);
        return !depodaMi(kok, tam) || !dosyaMi(tam);
      }).map(({ ham }) => ham);
      const bildir = (kod, adlar, eksik, tamam, hata) => {
        if (adlar.length === 0 && eksik.length === 0) return;
        ekle(yol, eksik.length === 0 ? { kod, gecti: true, mesaj: tamam } : { kod, gecti: false, mesaj: `${hata}: ${eksik.join(', ')}` });
      };
      bildir('include-hedef', bv.includelar, includeSorunlari, 'Include hedefleri bulundu', 'Include çözülemedi');
      const gEksik = eksikDosya(bv.gorseller);
      bildir('gorsel-hedef', bv.gorseller, gEksik, 'Görseller var olan dosyalara işaret ediyor', 'Var olmayan görsel');
      const bEksik = eksikDosya(bv.baglantilar);
      bildir('baglanti-hedef', bv.baglantilar, bEksik, '.md bağlantıları var olan dosyalara işaret ediyor', 'Var olmayan .md bağlantısı');
      const blok = blokKontrolEt(govde);
      if (blok) ekle(yol, { kod: 'gitbook-blok', ...blok });

      if (b.tip === '18' && g.toLowerCase() !== 'readme.md') {
        const sorunlar = [];
        if (!onMadde) sorunlar.push('Ön madde (--- ile çevrili) bulunamadı.');
        else {
          if (typeof onMadde.surum !== 'string' || onMadde.surum.trim() === '') sorunlar.push('Ön maddede `surum` zorunlu.');
          if (!tarihGecerli(onMadde.tarih)) sorunlar.push(`\`tarih\` YYYY-AA-GG biçiminde geçerli bir tarih olmalı ("${onMadde.tarih ?? ''}").`);
          if (onMadde.etiketler !== undefined && !Array.isArray(onMadde.etiketler)) sorunlar.push('`etiketler` bir liste olmalı.');
        }
        ekle(yol, sorunlar.length === 0
          ? { kod: 'changelog-onmadde', gecti: true, mesaj: 'Changelog ön maddesi geçerli' }
          : { kod: 'changelog-onmadde', gecti: false, mesaj: sorunlar.join(' ') });
        if (g.toLowerCase() !== 'readme.md') ekle(yol, { kod: 'changelog-baslik', ...surumBasliklariKontrolEt(govde) });
        const h1 = govde.split('\n').map((l) => l.replace(/\r$/, '')).find((l) => /^# /.test(l));
        if (!h1) ekle(yol, { kod: 'baslik-karakter', gecti: false, mesaj: 'Sürüm sayfasında ilk `#` başlığı gerekli' });
        else ekle(yol, baslikKarakterKontrolEt([h1.slice(2).trim()]));
      }
    }
  }
  return sonuclar.sort((a, b) => (a.yol < b.yol ? -1 : a.yol > b.yol ? 1 : a.kod < b.kod ? -1 : a.kod > b.kod ? 1 : 0));
}

// ───────────── Komut satırı ─────────────

function main(argv) {
  let kok = '.';
  let json = false;
  let katalogDosyasi = null;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--json') json = true;
    else if (a === '--katalog') katalogDosyasi = argv[++i];
    else if (a === '--yardim' || a === '-h') {
      console.log('Kullanım: node dochub-dogrula.mjs [kök] [--json] [--katalog dosya.json]');
      return 0;
    } else kok = a;
  }
  let katalog;
  try {
    katalog = katalogDosyasi ? JSON.parse(oku(katalogDosyasi)) : GOMULU_KATALOG;
    if (!Array.isArray(katalog?.tipler)) throw new Error('katalogda `tipler` listesi yok');
  } catch (e) {
    console.error(`Katalog okunamadı: ${e.message}`);
    return 2;
  }
  if (!existsSync(kok) || !statSync(kok).isDirectory()) {
    console.error(`Klasör bulunamadı: ${kok}`);
    return 2;
  }
  const sonuclar = dogrula(path.resolve(kok), katalog);
  const gecti = sonuclar.every((s) => s.gecti);
  if (json) {
    console.log(JSON.stringify({ gecti, sonuclar }, null, 2));
  } else {
    for (const s of sonuclar) {
      console.log(`${s.seviye === 'uyari' ? '[UYARI]' : s.gecti ? '[OK]   ' : '[HATA] '} ${s.kod.padEnd(18)} ${s.yol}  ${s.gecti && s.seviye !== 'uyari' ? '' : s.mesaj}`.trimEnd());
    }
    const kalan = sonuclar.filter((s) => !s.gecti).length;
    console.log(kalan === 0 ? `\nTüm kurallar geçti (${sonuclar.length}).` : `\n${kalan} kural kaldı, ${sonuclar.length - kalan} geçti.`);
  }
  return gecti ? 0 : 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  process.exitCode = main(process.argv.slice(2));
}
