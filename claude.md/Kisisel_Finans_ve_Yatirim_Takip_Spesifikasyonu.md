# Kişisel Finans ve Yatırım Takip Uygulaması Geliştirme Dokümanı (Claude Code İçin)

Bu doküman, yerel (local) ortamda çalışacak, yüksek kaliteli bir arayüz tasarımına sahip ve modern teknolojilerle donatılmış bir **Kişisel Finans ve Yatırım Takip Uygulaması** oluşturulması için rehber ve talimat setidir.

---

## 1. Proje Genel Bakışı ve Amaç
Kullanıcıların gelir, gider, harcama ve yatırımlarını tek bir panel üzerinden yönetebilecekleri, verileri grafiksel olarak analiz edebilecekleri yerel bir web/masaüstü uygulaması geliştirilecektir. 

### Temel Odak Noktaları:
- **Yerel Çalışma (Local Development):** Uygulama tamamen yerel ortamda kurulabilir, çalıştırılabilir ve veri saklama işlemlerini lokalde (örn. SQLite, LocalStorage veya JSON file) gerçekleştirecektir.
- **Yüksek Kaliteli Arayüz (Premium UI/UX):** Modern, estetik, kullanıcı dostu ve göz yormayan bir renk paleti (örneğin; Koyu Slate Grey arka plan, Soft Mint yeşili ve Pastel Mavi vurgular).
- **Veri Görselleştirme:** Harcamaların ve gelirlerin pasta grafikleri (Pie Chart) ile dinamik gösterimi.
- **Yatırım ve Bileşik Faiz Modülü:** Aylık düzenli yatırımların bileşik faiz/getiri hesaplamalarıyla geleceğe dönük projeksiyonunun ve mevcut kâr durumunun takibi.

---

## 2. Mimari ve Teknoloji Seçimi
*Geliştirici (Claude Code) platform ve dil seçiminde esfnektir ancak aşağıdaki modern yığının (stack) kullanılması tavsiye edilir:*
- **Frontend:** React.js / Next.js (App Router) veya Vue.js + Tailwind CSS + Shadcn UI / Radix UI (Premium ve temiz bir arayüz için).
- **Grafik Kütüphanesi:** Recharts veya Chart.js (Dinamik ve interaktif pasta grafikleri için).
- **State Yönetimi & Veri Saklama:** React Context API / Zustand + Yerel veri saklama (Zustand-persist ile LocalStorage veya yerel bir SQLite/JSON tabanlı hafif bir mimari).

---

## 3. Fonksiyonel Gereksinimler & Özellikler

### A. Gelir ve Gider Takip Modülü
- Kullanıcı gelir kaynaklarını (Maaş, Ek Gelir vb.) ve giderlerini (Kira, Fatura, Market, Girişim/İş Harcamaları vb.) sisteme ekleyebilmelidir.
- Eklenen her harcama/gelir için: **Miktar, Kategori, Tarih ve Açıklama** alanları bulunmalıdır.
- **Dinamik Pasta Grafik (Pie Chart):** Girişim harcamaları, kişisel harcamalar ve kategorisel dağılımlar anlık olarak pasta grafik üzerinde filtrelenebilir ve görsel olarak izlenebilir olmalıdır.

### B. "DAVIData" Yönetim Paneli (Dashboard)
- Uygulamanın ana ekranı bir kontrol paneli (Dashboard) olacak ve bu panel **DAVIData** adını taşıyacaktır.
- **DAVIData Paneli İçeriği:**
  - Toplam Varlık / Net Worth (Gelirler - Giderler + Güncel Yatırım Değeri).
  - Aylık Toplam Gelir ve Toplam Gider kartları (KPI metrikleri).
  - Harcama dağılımını gösteren ana pasta grafik.
  - Yatırım özet kutusu.

### C. Yatırım Takip & Bileşik Faiz Modülü (Yeni Özellik)
- Kullanıcının aylık düzenli olarak yaptığı yatırımları takip edebileceği özel bir bölüm.
- **Parametre Girişleri:**
  - Başlangıç Sermayesi (Anapara)
  - Aylık Düzenli Yatırılan Tutar ($M$)
  - Yıllık / Aylık Ortalama Getiri Oranı ($r$)
  - Yatırım Süresi (Ay veya Yıl bazında)
- **Hesaplama ve Takip Fonksiyonu:**
  - Uygulama, bileşik faiz formülünü kullanarak kullanıcının toplam biriken parasını ve bu yatırımdan elde ettiği **aylık ortalama net kârı ($x$)** hesaplamalıdır.
  - Formül Temeli: $A = P(1 + r)^n + PMT 	imes rac{(1 + r)^n - 1}{r}$ tarzı veya aylık periyotlarla döngüsel hesaplama yapılarak anlık grafik sunulmalıdır.
  - Kullanıcı "Aylık ortalama $x$ tutarında kâr yapıyorum" diyebilmeli ve bunu bir trend çizgisi veya büyüme grafiği ile görebilmelidir.

---

## 4. Arayüz ve Tasarım Standartları
- **Tema:** Dark Mode öncelikli modern tasarım (Koyu arka plan, yüksek kontrastlı okunabilir metinler).
- **Bileşenler:** Kenarları yumuşatılmış kart tasarımları (`rounded-xl` veya `rounded-2xl`), mikro animasyonlar (hover efektleri), temiz font tercihleri (Inter, Plus Jakarta Sans veya Geist).
- **Düzen (Layout):** Sol tarafta sabit bir navigasyon menüsü (DAVIData Dashboard, Gelir/Gider, Yatırım Takibi, Ayarlar) ve sağ tarafta dinamik içerik alanı.

---

## 5. Claude Code İçin Kurulum ve Geliştirme Adımları
1. **Proje Yapısını Oluştur:** Next.js veya React tabanlı, Tailwind CSS entegreli temiz bir proje dizini hazırla.
2. **DAVIData Panelini Tasarla:** Üst menü veya yan menüde DAVIData ibaresini konumlandır, ana metrik kartlarını yerleştir.
3. **Grafik Bileşenini Entegre Et:** Recharts kullanarak gelir/gider pasta grafiğini oluştur ve dummy datalarla test et.
4. **Yatırım Hesaplayıcıyı Kodla:** Bileşik faiz motorunu yaz, aylık ortalama kâr metriklerini arayüze yansıt.
5. **Lokal Veri Bağlantısını Yap:** Kullanıcının girdiği verilerin sayfa yenilendiğinde kaybolmaması için LocalStorage veya local state persist yapısını kur.
6. **Cila (Polishing):** Renk uyumlarını kontrol et, butonların ve form alanlarının premium hissettirmesini sağla.

---
*Lütfen yukarıdaki spesifikasyonlara sadık kalarak, kod kalitesi yüksek, modüler ve performansı optimize edilmiş bir uygulama iskeleti oluştur.*
