# Hermes Web Workflow

> **Workflow permanen** — setiap kali Pak Defris memberi materi kuliah, Hermes mengubahnya
> menjadi halaman web akademik modern otomatis.

---

## 📁 Folder yang Diizinkan

| Folder | Fungsi |
|--------|--------|
| `/mnt/d/AAA-Hermes-Web/` | Source code & project web (React + Vite) |
| `/mnt/d/AAA-Hermes-Materi/` | Materi mentah dari Pak Defris (markdown, txt, PDF, teks) |
| `/mnt/d/AAA-Hermes-Output/` | Output final (HTML statis, PDF, screenshot) |

> ❌ **JANGAN akses folder di luar ketiga folder di atas.**

---

## 🔄 Alur Kerja

### 1. Baca Materi

```
Baca file materi dari /mnt/d/AAA-Hermes-Materi/
Format yang didukung: .md, .txt, teks langsung dari chat Discord
```

### 2. Ubah Menjadi Halaman Web

Project target: `/mnt/d/AAA-Hermes-Web/materi-desain/`

**Stack wajib:**
- React 19 + TypeScript 6
- Tailwind CSS v4
- shadcn/ui (Nova preset, Slate base color)

**Komponen shadcn/ui yang tersedia:**
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`
- `Badge`
- `Accordion`, `AccordionContent`, `AccordionItem`, `AccordionTrigger`
- `Alert`, `AlertTitle`, `AlertDescription`
- `Tabs`, `TabsContent`, `TabsList`, `TabsTrigger`
- `Separator`
- `Button`, `Input`, `Textarea`, `Dialog`, `Sheet`, `Table`, `Progress`, `ScrollArea`

**Library pendukung:**
- `lucide-react` — icon (gunakan yang relevan dengan konten)
- `framer-motion` — animasi ringan (fadeUp, fadeIn, whileInView)
- `recharts` — grafik & chart (jika materi mengandung data numerik)
- `mermaid` — diagram (jika materi mengandung alur/proses)

### 3. Prinsip Desain

| Prinsip | Detail |
|---------|--------|
| **Tema** | Light — `bg-white`, slate text, blue accent (`blue-600`) |
| **Gaya** | Modern, akademik, tidak ramai, spacing lega |
| **Responsif** | Mobile-first — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| **Tipografi** | `tracking-tight`, `leading-relaxed` |
| **Spacing** | Section `py-16 sm:py-24`, gap `space-y-24` antar section |
| **Animasi** | `framer-motion` hanya `fadeUp` + `whileInView` — jangan berlebihan |

**Struktur halaman standar (sesuaikan dengan materi):**
1. Navbar sticky — `GraduationCap` icon + Badge topik
2. Hero — gradient blue, judul materi, subtitle, wave divider
3. Ringkasan — Card dengan paragraf naratif
4. Konsep Inti — grid Card (2-4 item)
5. Detail / Manfaat — grid Card dengan icon
6. Bagian Interaktif — Accordion atau Tabs (jika relevan)
7. Kesimpulan — Card bg-slate-50
8. Callout — Alert dengan pesan penting
9. Footer — Separator + credit

### 4. Validasi Build

```bash
cd /mnt/d/AAA-Hermes-Web/materi-desain
pnpm run build
```

**Jika build gagal:**
- Baca error, perbaiki, retry build
- Jangan tinggalkan sampai build sukses

**Error umum & solusi:**
| Error | Solusi |
|-------|--------|
| `TS17004: Cannot use JSX` | Tambah `"jsx": "react-jsx"` di `tsconfig.json` |
| `Cannot find module 'radix-ui'` | `pnpm add radix-ui` |
| `Can't resolve 'tw-animate-css'` | Ganti `@import` → `@plugin "tailwindcss-animate"` |
| Unused imports | Hapus import yang tidak dipakai |
| `baseUrl` deprecated | Tambah `"ignoreDeprecations": "6.0"` |

### 5. Preview

| Aturan | Detail |
|--------|--------|
| **JANGAN** jalankan `pnpm run dev` baru | Server sudah ada di background |
| **JANGAN** matikan server yang aktif | Cek dulu dengan `ss -ltnp \| grep 5173` |
| Jika server mati | Jalankan ulang sebagai **background process** (lihat di bawah) |
| URL preview | `http://localhost:5173/` |

**Restart server jika mati:**
```bash
cd /mnt/d/AAA-Hermes-Web/materi-desain
# kill proses lama jika ada
ss -ltnp | grep 5173 && kill $(ss -ltnp | grep 5173 | grep -oP 'pid=\K[0-9]+')
# start background
nohup pnpm exec vite --host 0.0.0.0 --port 5173 > vite.log 2>&1 & echo $! > vite.pid
sleep 5 && cat vite.log
```

### 6. Output Final (Opsional)

Jika diminta, generate output ke:
```
/mnt/d/AAA-Hermes-Output/
```

Format: HTML statis, screenshot, atau PDF.

---

## 🎯 Contoh Prompt Efektif

```
Hermes, baca materi dari /mnt/d/AAA-Hermes-Materi/metodologi-penelitian.md
lalu ubah menjadi halaman web akademik di materi-desain.
```

```
Hermes, saya kirim materi tentang "Etika AI dalam Pendidikan".
Buat halaman web dengan struktur: ringkasan, 4 pilar etika, studi kasus (accordion), kesimpulan.
```

---

## 📋 Checklist Sebelum Selesai

- [ ] `pnpm run build` **SUKSES** (tsc + vite)
- [ ] Semua section menggunakan komponen shadcn/ui yang sesuai
- [ ] Ikon lucide-react relevan dengan konten
- [ ] Animasi framer-motion ringan (tidak mengganggu)
- [ ] Responsif di laptop dan HP
- [ ] Tidak ada server baru yang dijalankan
- [ ] Hanya akses folder: `AAA-Hermes-Web`, `AAA-Hermes-Materi`, `AAA-Hermes-Output`

---

> **Dibuat:** 12 Juni 2026 · **Untuk:** Pak Defris — Dosen PTM Unimed
