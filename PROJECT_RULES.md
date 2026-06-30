# DAVIData — Proje Kuralları ve Uyumluluk Rehberi

Bu doküman projeye katkı sağlayan herkesin uyması gereken kuralları ve otomatik kontrolleri açıklar.

---

## Git Hook'ları

Projeye katkı vermeden önce hook'ları kur:

```powershell
# Windows PowerShell
.\hooks\install-hooks.ps1
```

### Hangi Hook Ne Yapar?

| Hook | Ne Zaman Çalışır | Ne Kontrol Eder |
|------|-----------------|-----------------|
| `pre-commit` | `git commit` öncesi | TypeScript, ESLint, hassas veri, console.log |
| `commit-msg` | Commit mesajı yazılınca | Conventional Commits formatı |
| `pre-push` | `git push` öncesi | Full build, uncommitted değişiklik, kritik dosya varlığı |

---

## Commit Mesajı Formatı

[Conventional Commits](https://www.conventionalcommits.org/) standardı zorunludur.

```
<tip>: <açıklama>
```

### Geçerli Tipler

| Tip | Kullanım Amacı |
|-----|----------------|
| `feat` | Yeni özellik |
| `fix` | Hata düzeltme |
| `docs` | Sadece dokümantasyon |
| `style` | Kod formatı (mantık değişmez) |
| `refactor` | Yeniden yapılandırma |
| `perf` | Performans iyileştirmesi |
| `test` | Test ekleme/düzenleme |
| `chore` | Build, araç, bağımlılık güncellemeleri |

### Örnekler

```bash
# DOĞRU
feat: yatırım tablosuna not kolonu eklendi
fix: pie chart boş veri durumunda hata veriyordu
docs: README kurulum adımları güncellendi
refactor: calculations.ts fonksiyonları ayrı dosyalara taşındı
chore: recharts 3.9.1 sürümüne güncellendi

# YANLIŞ
git push yaptım
düzeltme
wip
update
```

---

## Kod Standartları

### TypeScript
- `any` tipi **yasaktır** — her zaman açık tip tanımla
- Her fonksiyon dönüş tipini belirt
- `interface` yerine genel olarak `type` kullan (store hariç)

```ts
// ✗ Yanlış
function calc(data: any) { ... }

// ✓ Doğru
function calc(data: Transaction[]): number { ... }
```

### Bileşenler
- Her bileşen kendi dosyasında olacak (`src/components/`)
- Client bileşenler `"use client"` direktifi ile başlamalı
- Props tipi bileşenin hemen üstünde `interface Props` olarak tanımlanmalı

```tsx
// ✓ Doğru
interface Props {
  tracker: InvestmentTracker;
}

export default function TrackerPanel({ tracker }: Props) { ... }
```

### Stiller
- Inline style: `style={{ ... }}` — CSS custom property kullan (`var(--green)`)
- Tailwind class kullanımı: sadece utility class, custom değer yok
- `!important` yasaktır
- Renk değerleri hard-coded yazılmaz, design token kullanılır:

```tsx
// ✗ Yanlış
color: "#4ade80"

// ✓ Doğru
color: "var(--green)"
```

### Veri ve State
- Store dışında `localStorage` doğrudan kullanılmaz
- `useFinanceStore` hook'u her zaman `(s) => s.property` selector ile kullanılır:

```ts
// ✓ Doğru — sadece gerekli parçayı seç
const transactions = useFinanceStore((s) => s.transactions);

// ✗ Yanlış — tüm store'u çekme
const store = useFinanceStore();
```

---

## Dosya Organizasyonu

```
src/
├── app/          ← Sadece sayfa (route) dosyaları
├── components/   ← Yeniden kullanılabilir UI bileşenleri
└── lib/
    ├── store.ts          ← State tanımları ve aksiyonlar
    └── calculations.ts   ← Saf (pure) hesaplama fonksiyonları
```

**Kurallar:**
- `app/` altındaki dosyalar yalnızca sayfayı birleştirir, iş mantığı içermez
- İş mantığı `lib/calculations.ts` içinde pure function olarak yazılır
- API çağrısı gelirse `lib/api.ts` olarak ayrılır

---

## Güvenlik

### Kesinlikle Commit Edilemeyecekler
- `.env` ve `.env.local` dosyaları
- API anahtarları, token, şifre
- `node_modules/` klasörü
- `.next/` build çıktısı

### Pre-commit Hook Otomatik Engeller
Şu pattern'ler kod içinde tespit edilirse commit otomatik engellenir:

```
api_key = "..."
API_KEY = "..."
secret  = "..."
password = "..."
token = "..."
private_key = "..."
```

---

## Push Öncesi Kontrol Listesi

Pre-push hook otomatik kontrol etse de manuel olarak da doğrula:

- [ ] `npm run build` hatasız tamamlandı
- [ ] TypeScript hatası yok (`npx tsc --noEmit`)
- [ ] ESLint temiz (`npm run lint`)
- [ ] Commit mesajları Conventional Commits formatında
- [ ] Hassas veri yok
- [ ] `console.log` ifadeleri temizlendi

---

## Bağımlılık Güncelleme Politikası

- Minor/patch güncellemeler: PR açmadan main'e merge edilebilir
- Major güncellemeler: Ayrı branch + test zorunlu
- Yeni bağımlılık eklemek için: `package.json`'a ekle + bu dokümana ekle

### Mevcut Bağımlılıklar

| Paket | Versiyon | Amaç |
|-------|---------|------|
| next | 16.x | Framework |
| react | 19.x | UI |
| recharts | 3.x | Grafikler |
| zustand | 5.x | State yönetimi |
| lucide-react | 1.x | İkonlar |
| date-fns | 4.x | Tarih işlemleri |
| tailwindcss | 4.x | Stil sistemi |
