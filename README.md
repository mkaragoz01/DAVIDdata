# DAVIData — Kişisel Finans & Yatırım Takip Uygulaması

> Gelir, gider ve yatırımlarınızı tek panelden yönetin. Yerel ortamda çalışır, verileriniz tarayıcınızda kalır.

---

## Özellikler

### Dashboard
- Net Varlık (Gelir − Gider + Yatırım Toplamı) KPI kartı
- Aylık gelir / gider metrikleri
- Kategori bazlı pasta grafikler (Donut Chart)
- Son işlemler ve yatırım planları özet paneli

### Gelir / Gider Takibi
- Gelir ve gider girişi (miktar, kategori, tarih, not)
- Arama ve tür filtresi (Tümü / Gelir / Gider)
- Kategori bazlı dağılım grafikleri
- Anlık silme işlemi

### Yatırım Takibi — Excel Formatı
Aylık **değişken katkılarla** çalışan, sektöre özgü senaryo karşılaştırma tablosu:

| Ay | Mevcut Para | Eklenen Para | Toplam Para | %10 Artarsa | %15 Artarsa | %20 Artarsa |
|----|-------------|-------------|-------------|-------------|-------------|-------------|
| Ay 1 | 34.545 | 5.000 | 39.545 | 43.499 | 45.476 | 47.454 |
| Ay 2 | 39.545 | 14.000 | 53.545 | 58.899 | 61.576 | 64.254 |
| ... | ... | ... | ... | ... | ... | ... |

- Senaryo oranları özelleştirilebilir (varsayılan: %10, %15, %20)
- Çok eksenli büyüme grafiği (gerçek toplam vs. senaryo çizgileri)
- Son ayı geri alma butonu

### Ayarlar
- JSON olarak veri yedekleme ve geri yükleme
- Tek tıkla tüm veri silme

---

## Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| Framework | Next.js 16 (App Router) |
| Dil | TypeScript |
| Stil | Tailwind CSS v4 |
| Grafikler | Recharts |
| State | Zustand + persist (LocalStorage) |
| İkonlar | Lucide React |

---

## Kurulum

```bash
# Depoyu klonla
git clone https://github.com/mkaragoz.01/davidata.git
cd davidata

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini aç.

```bash
# Production build
npm run build
npm run start
```

---

## Proje Yapısı

```
src/
├── app/
│   ├── page.tsx              # Dashboard
│   ├── transactions/         # Gelir/Gider sayfası
│   ├── investments/          # Yatırım takip sayfası
│   ├── settings/             # Ayarlar sayfası
│   └── globals.css           # Design tokens & global stiller
├── components/
│   ├── Sidebar.tsx           # Responsive nav (mobile drawer)
│   ├── MobileHeader.tsx      # Mobil hamburger header
│   ├── KpiCard.tsx           # Metrik kartı
│   ├── ExpensePieChart.tsx   # Donut grafik
│   ├── TransactionForm.tsx   # İşlem ekleme formu
│   ├── TransactionList.tsx   # Filtrelenebilir işlem listesi
│   ├── CreateTrackerForm.tsx # Yeni yatırım planı formu
│   ├── TrackerPanel.tsx      # Yatırım paneli (tablo + grafik)
│   ├── TrackerTable.tsx      # Excel-format senaryo tablosu
│   └── TrackerChart.tsx      # Büyüme çizgi grafiği
└── lib/
    ├── store.ts              # Zustand store (LocalStorage persist)
    └── calculations.ts       # Finansal hesaplama fonksiyonları
```

---

## Veri Saklama

Tüm veriler tarayıcının **LocalStorage** alanına kaydedilir (`davidata-storage-v2`). Sunucu gerekmez, internet bağlantısı gerekmez.

**Yedekleme:** Ayarlar sayfasından JSON olarak dışa aktarılabilir ve geri yüklenebilir.

---

## Ekran Görüntüleri

> _Dashboard, Gelir/Gider ve Yatırım Takibi sayfaları dark-mode tasarıma sahiptir._

---

## Lisans

MIT
