# DESIGN.md — Prinsip Desain Website Materi CAD

## Prinsip Utama

1. **Akademik & Profesional** — bukan landing page, bukan template AI
2. **Hierarki jelas** — judul → subjudul → isi → detail
3. **Kontras kuat** — teks mudah dibaca di semua device
4. **Responsif** — mobile-first, nyaman di HP dan laptop
5. **Minimal animasi** — hanya fade-in ringan, tidak mengganggu

## Palet Warna

| Token | Warna | Penggunaan |
|-------|-------|------------|
| Background | `#ffffff` (white) | Latar utama |
| Surface | `#f8fafc` (slate-50) | Card background alternatif |
| Text Primary | `#0f172a` (slate-900) | Judul, heading |
| Text Body | `#334155` (slate-700) | Paragraf, isi |
| Text Muted | `#64748b` (slate-500) | Label, meta info |
| Border | `#e2e8f0` (slate-200) | Garis pemisah, border card |
| Accent Blue | `#2563eb` (blue-600) | Link, badge, icon box |
| Accent Cyan | `#0891b2` (cyan-600) | Aksen sekunder |
| Success | `#059669` (emerald-600) | Checklist, completed |

## Typography

- **Font:** System UI (`font-sans`) — native di semua OS, load instan
- **Heading:** `font-bold tracking-tight`
- **Body:** `text-base leading-relaxed` (16px desktop, 15px mobile)
- **Label:** `text-sm font-medium`
- **Ukuran:** Tidak di bawah 14px untuk teks utama

## Layout

- **Max width:** `max-w-4xl` (896px) untuk konten utama
- **Spacing section:** `py-16 sm:py-20 space-y-20`
- **Padding horizontal:** `px-6`
- **Grid:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- **Navbar:** Sticky top, height ~52px

## Komponen yang Digunakan (shadcn/ui)

| Komponen | Fungsi |
|----------|--------|
| Card | Materi topik, ringkasan |
| Badge | Label, tag, kategori |
| Accordion | FAQ, detail expandable |
| Alert | Callout, pesan penting |
| Separator | Garis pemisah antar section |

## Yang Dihindari

- ❌ Gradient ungu/biru/pink berlebihan
- ❌ Glassmorphism
- ❌ Shadow tebal (max `shadow-sm`)
- ❌ Card tanpa fungsi jelas
- ❌ Icon tile berulang-ulang
- ❌ Teks abu-abu terlalu pucat (min contrast ratio 4.5:1)
- ❌ Animasi bounce/spin/scale berlebihan
- ❌ Layout terlalu ramai
- ❌ Border radius > `rounded-xl` untuk card
