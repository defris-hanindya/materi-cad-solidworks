import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Cog,
  BookOpen,
  Target,
  CheckCircle2,
  Lightbulb,
  Clock,
  Users,
  Award,
  ChevronDown,
  Calendar,
  ClipboardList,
  FileCheck,
  Monitor,
  Copy,
  Check,
  ArrowUp,
  GraduationCap,
  Zap,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import "./index.css"

/* ========================================================================== */
/*  DATA                                                                       */
/* ========================================================================== */

const identitasMK = [
  { label: "Program Studi", value: "Pendidikan Teknik Mesin — S1" },
  { label: "Mata Kuliah", value: "Gambar Mesin" },
  { label: "Kode MK", value: "MES6214" },
  { label: "Jumlah SKS", value: "2 SKS (Praktik)" },
  { label: "Semester", value: "3 (Ganjil)" },
  { label: "Tahun Akademik", value: "2025" },
  { label: "Dosen Pengampu", value: "Nur Basuki, S.Pd., M.Pd., M.Pd.T\nDefris Hanindya Edwiyan Pradana, S.Pd., M.Pd." },
]

const cpmkList = [
  {
    id: "CPMK-1",
    icon: Award,
    title: "Tanggung Jawab Mandiri",
    desc: "Bertanggung jawab dalam membuat gambar komponen mesin secara mandiri sesuai standar industri.",
    color: "blue",
  },
  {
    id: "CPMK-2",
    icon: Target,
    title: "Prinsip Gambar Teknik",
    desc: "Menguasai prinsip dasar gambar teknik mesin dan menerapkannya dalam gambar kerja manufacturing drawing.",
    color: "cyan",
  },
  {
    id: "CPMK-3",
    icon: Cog,
    title: "Rancangan Manufaktur",
    desc: "Membuat rancangan gambar manufaktur yang memenuhi standar produksi dan proses pemesinan.",
    color: "emerald",
  },
  {
    id: "CPMK-4",
    icon: FileCheck,
    title: "Gambar Kerja Produksi",
    desc: "Membuat rancangan gambar kerja manufaktur untuk pemesinan, pengecoran, dan fabrikasi.",
    color: "violet",
  },
]

const roadmap = [
  {
    week: "Minggu 1",
    title: "Orientasi & Review Gambar Teknik",
    sw: "Persiapan lingkungan kerja SolidWorks, pengenalan output gambar kerja, standar awal.",
    tujuan: "Memahami kontrak perkuliahan, RPS, dan mereview dasar gambar teknik.",
    aktivitas: "Diskusi RPS, review materi Gambar Teknik, setup SolidWorks.",
    output: "Dokumentasi setup SolidWorks.",
    penilaian: "Partisipasi",
    ref: "Modul Gambar Teknik",
  },
  {
    week: "Minggu 2",
    title: "Manufacturing Drawing — Komponen Tunggal",
    sw: "Membuat model poros transmisi sederhana dan drawing awal.",
    tujuan: "Memahami pengertian gambar kerja/manufacturing drawing dan praktik gambar kerja komponen tunggal.",
    aktivitas: "Praktik model poros transmisi, drawing view dasar.",
    output: "File part poros + drawing awal.",
    penilaian: "Tugas 1",
    ref: "Takeshi Sato, Menggambar Mesin Standar ISO",
  },
  {
    week: "Minggu 3",
    title: "Standar Gambar Industri & Dimensi",
    sw: "Dimensi, toleransi dasar, title block, skala, penyajian drawing.",
    tujuan: "Penguatan konsep gambar kerja komponen tunggal dan penerapan standar gambar industri.",
    aktivitas: "Latihan dimensioning, toleransi, title block.",
    output: "Drawing dengan dimensi dan toleransi.",
    penilaian: "Tugas 2",
    ref: "Sirod Hantoro, Menggambar Mesin",
  },
  {
    week: "Minggu 4",
    title: "Section View & Multi-View Drawing",
    sw: "Section view, multi-view drawing, dimensi proses pemesinan.",
    tujuan: "Membuat gambar kerja proses pemesinan dengan pandangan potongan untuk komponen silinder.",
    aktivitas: "Praktik section view pada komponen relay cylinder.",
    output: "Drawing multi-view dengan section view.",
    penilaian: "Tugas 3",
    ref: "Hewit, Advanced Geometrical and Engineering Drawing",
  },
  {
    week: "Minggu 5",
    title: "Penyempurnaan Section View & Toleransi",
    sw: "Penyempurnaan section view, toleransi, simbol pengerjaan, revisi drawing.",
    tujuan: "Lanjutan dan penguatan materi minggu 4.",
    aktivitas: "Revisi drawing, penambahan simbol pengerjaan, fine-tuning toleransi.",
    output: "Drawing final dengan section view dan toleransi.",
    penilaian: "Kuis 1",
    ref: "Pardjono, Menggambar dan Perencanaan Mesin Praktis",
  },
  {
    week: "Minggu 6",
    title: "Sheet Metal Work Basic",
    sw: "Sheet metal basic, flat pattern, bend line, gambar bukaan.",
    tujuan: "Membuat gambar kerja sheet metal: pipa, kerucut, dan komponen transformasi.",
    aktivitas: "Praktik sheet metal modeling dan drawing.",
    output: "Drawing sheet metal dengan flat pattern.",
    penilaian: "Tugas 4",
    ref: "Gambar Teknik Basis, ITB Press",
  },
  {
    week: "Minggu 7",
    title: "Filing Paper — Sheet Metal 0,5 mm",
    sw: "Desain filing paper, hitung kebutuhan bahan, bending allowance, drawing manufaktur.",
    tujuan: "Membuat gambar kerja manufaktur filing paper dari sheet metal.",
    aktivitas: "Kalkulasi material, bending allowance, drawing.",
    output: "Drawing manufaktur filing paper.",
    penilaian: "Tugas 5",
    ref: "Takeshi Sato, Menggambar Mesin Standar ISO",
  },
  {
    week: "UTS",
    title: "Ujian Tengah Semester",
    sw: "Evaluasi pemahaman gambar kerja, standar gambar, dan praktik CAD.",
    tujuan: "Mengukur pemahaman mahasiswa terhadap materi minggu 1–7.",
    aktivitas: "Ujian tertulis dan/atau praktik CAD.",
    output: "Lembar jawaban UTS.",
    penilaian: "UTS (10%)",
    ref: "Semua referensi",
    isExam: true,
  },
  {
    week: "Minggu 9",
    title: "Assembly & Exploded View",
    sw: "Assembly sederhana, exploded view, bill of materials, detail drawing.",
    tujuan: "Praktik merancang gambar kerja rakitan dan gambar komponen untuk manufaktur.",
    aktivitas: "Assembly modeling, exploded view, BOM.",
    output: "Assembly drawing + BOM.",
    penilaian: "Tugas 6",
    ref: "Sirod Hantoro, Menggambar Mesin",
  },
  {
    week: "Minggu 10",
    title: "Kajian Gambar Kerja TA Vokasi",
    sw: "Review, critique, dan evaluasi kualitas drawing.",
    tujuan: "Menilai kualitas dan kebenaran gambar kerja TA mahasiswa vokasi/D4 menurut standar manufaktur.",
    aktivitas: "Studi kasus, diskusi, critique drawing.",
    output: "Laporan evaluasi drawing.",
    penilaian: "Studi Kasus 1 (10%)",
    ref: "Drawing samples",
  },
  {
    week: "Minggu 11",
    title: "Studi Kasus Gambar Industri",
    sw: "Membaca gambar otentik industri, evaluasi, analisis, problem solving.",
    tujuan: "Menganalisis gambar kerja manufaktur dari industri permesinan.",
    aktivitas: "Diskusi kasus, analisis drawing industri, problem solving.",
    output: "Laporan analisis.",
    penilaian: "Studi Kasus 2 (10%)",
    ref: "Drawing industri",
  },
  {
    week: "Minggu 12",
    title: "Alat Non-Mesin — Pegas, Sekrup, Roda Gigi",
    sw: "Part detail, assembly, komponen standar, drawing rakitan.",
    tujuan: "Membuat gambar kerja alat non-mesin tanpa prime mover.",
    aktivitas: "Praktik assembly dengan pegas, sekrup, roda gigi.",
    output: "Assembly drawing alat non-mesin.",
    penilaian: "Tugas 7",
    ref: "Pardjono, Menggambar dan Perencanaan Mesin Praktis",
  },
  {
    week: "Minggu 13",
    title: "Mesin Sederhana — Poros, Roda Gigi, Puli",
    sw: "Gear, pulley, shaft, bearing layout, drawing manufaktur.",
    tujuan: "Membuat gambar kerja manufaktur mesin sederhana dengan prime mover.",
    aktivitas: "Praktik gear, pulley, shaft, bearing.",
    output: "Assembly drawing mesin sederhana.",
    penilaian: "Tugas 8",
    ref: "Hewit, Advanced Geometrical and Engineering Drawing",
  },
  {
    week: "Minggu 14",
    title: "Penyempurnaan Gambar Kerja Mesin",
    sw: "Penyempurnaan gambar kerja, detail komponen, assembly, revisi teknis.",
    tujuan: "Lanjutan minggu 13 — finalisasi drawing.",
    aktivitas: "Revisi, fine-tuning, detail komponen.",
    output: "Drawing final mesin sederhana.",
    penilaian: "Kuis 2",
    ref: "Semua referensi",
  },
  {
    week: "Minggu 15",
    title: "Integrasi & Team Based Project",
    sw: "Final project, redesign komponen, laporan, presentasi, komunikasi teknis.",
    tujuan: "Integrasi semua pengetahuan: gambar teknik, pemesinan, ilmu bahan, pengukuran.",
    aktivitas: "Team project, redesign, presentasi.",
    output: "Final project + laporan + presentasi.",
    penilaian: "Team Based Project (30%)",
    ref: "Semua referensi",
  },
  {
    week: "UAS",
    title: "Ujian Akhir Semester / Proyek Akhir",
    sw: "Evaluasi akhir sesuai RPS.",
    tujuan: "Mengukur capaian pembelajaran akhir mahasiswa.",
    aktivitas: "Ujian atau presentasi proyek akhir.",
    output: "Lembar jawaban/proyek UAS.",
    penilaian: "UAS (10%)",
    ref: "Semua referensi",
    isExam: true,
  },
]

const penilaianKognitif = [
  { item: "Kehadiran", bobot: 5 },
  { item: "Kuis", bobot: 10 },
  { item: "Tugas", bobot: 15 },
  { item: "UTS", bobot: 10 },
  { item: "UAS", bobot: 10 },
]

const penilaianPartisipatif = [
  { item: "Studi Kasus", bobot: 20 },
  { item: "Team Based Project", bobot: 30 },
]

const referensiList = [
  {
    title: "Menggambar Mesin: Standar ISO",
    author: "Takeshi Sato dan Sugiyarto, 2000",
    publisher: "Pradnya Paramita Press, Jakarta",
  },
  {
    title: "Menggambar Mesin",
    author: "Sirod Hantoro dan Pardjono, 2002",
    publisher: "Adicita Karya Nusa, Yogyakarta",
  },
  {
    title: "Menggambar dan Perencanaan Mesin Praktis",
    author: "Pardjono dan Sirod Hantoro, 1989",
    publisher: "Liberty, Yogyakarta",
  },
  {
    title: "Advanced Geometrical and Engineering Drawing",
    author: "T. H. Hewit, 2005",
    publisher: "The English Universities Press, London",
  },
  {
    title: "Gambar Teknik Basis",
    author: "Anonim, 2003",
    publisher: "Swiss ITB Bandung Press, Bandung",
  },
]

const caraMenggunakan = [
  "Baca roadmap pertemuan sebelum kelas dimulai.",
  "Buka detail pertemuan sesuai minggu berjalan.",
  "Ikuti instruksi praktik SolidWorks pada setiap pertemuan.",
  "Kerjakan tugas sesuai output yang diminta.",
  "Gunakan referensi untuk memperkuat pemahaman gambar kerja.",
]

/* ========================================================================== */
/*  COMPONENTS                                                                 */
/* ========================================================================== */

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-200",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  violet: "bg-violet-50 text-violet-700 border-violet-200",
}

const colorMapDot: Record<string, string> = {
  blue: "bg-blue-600",
  cyan: "bg-cyan-600",
  emerald: "bg-emerald-600",
  violet: "bg-violet-600",
}

function SectionHeading({ icon: Icon, children, accent = "blue" }: { icon: React.ElementType; children: React.ReactNode; accent?: string }) {
  const dot = colorMapDot[accent] || "bg-blue-600"
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="relative">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colorMap[accent].split(" ")[0]} ${colorMap[accent].split(" ")[1]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ${dot} ring-2 ring-white`} />
      </div>
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{children}</h2>
    </div>
  )
}

function ProgressBar({ value, color = "blue" }: { value: number; color?: "blue" | "emerald" }) {
  const c = color === "emerald" ? "from-emerald-400 to-emerald-600" : "from-blue-400 to-blue-600"
  return (
    <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden shadow-inner">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${c} transition-all duration-1000 relative overflow-hidden`}
        style={{ width: `${value}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </div>
  )
}

/* ========================================================================== */
/*  APP                                                                        */
/* ========================================================================== */

export default function App() {
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set(["Minggu 1"]))
  const [copied, setCopied] = useState(false)
  const [showBackTop, setShowBackTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 600)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toggleWeek = (week: string) => {
    setExpandedWeeks(prev => {
      const next = new Set(prev)
      next.has(week) ? next.delete(week) : next.add(week)
      return next
    })
  }

  const copyLink = () => {
    navigator.clipboard.writeText("https://defris-hanindya.github.io/materi-cad-solidworks/")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white text-slate-700 font-sans antialiased scroll-smooth selection:bg-blue-100 selection:text-blue-900">

      {/* ================================================================ */}
      {/*  NAVBAR                                                          */}
      {/* ================================================================ */}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-md shadow-blue-200">
              <Cog className="h-4.5 w-4.5" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-slate-900 leading-tight">Gambar Mesin</div>
              <div className="text-xs text-slate-500 leading-tight">CAD SolidWorks · PTM Unimed</div>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-xs font-medium sm:text-sm">
            <a href="#identitas" className="text-slate-600 hover:text-blue-700 transition-colors hidden md:inline">Identitas</a>
            <a href="#cpmk" className="text-slate-600 hover:text-blue-700 transition-colors hidden md:inline">CPMK</a>
            <a href="#roadmap" className="text-slate-600 hover:text-blue-700 transition-colors">Roadmap</a>
            <a href="#penilaian" className="text-slate-600 hover:text-blue-700 transition-colors hidden md:inline">Penilaian</a>
            <Badge className="bg-blue-600 text-white hover:bg-blue-700 border-0 text-xs shadow-sm">MES6214</Badge>
          </nav>
        </div>
      </header>

      {/* ================================================================ */}
      {/*  1. HERO  — BOLD & PREMIUM                                       */}
      {/* ================================================================ */}

      <section className="relative bg-slate-950 overflow-hidden">
        {/* Dramatic background layers */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_70%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] opacity-60" />
        <div className="absolute top-20 right-0 w-[300px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] opacity-50" />
        <div className="absolute bottom-0 left-0 w-[250px] h-[300px] bg-blue-400/10 rounded-full blur-[80px] opacity-40" />

        {/* Geometric accent lines */}
        <svg className="absolute top-0 right-0 w-64 h-64 opacity-10 text-blue-400" viewBox="0 0 256 256">
          <circle cx="200" cy="56" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="56" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="200" cy="56" r="120" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <line x1="56" y1="200" x2="200" y2="56" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="200" x2="144" y2="56" stroke="currentColor" strokeWidth="0.3" />
        </svg>

        <div className="relative mx-auto max-w-4xl px-6 py-24 sm:py-36 text-center">
          {/* Floating badge cluster */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {["MES6214", "2 SKS Praktik", "Semester 3", "SolidWorks"].map((b, i) => (
              <Badge key={i}
                className={`text-xs font-medium border-0 px-3.5 py-1.5 ${
                  i === 0 ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "bg-white/10 text-blue-100 backdrop-blur-sm"
                }`}
              >
                {b}
              </Badge>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.05]"
          >
            Gambar Mesin{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              SolidWorks
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 max-w-2xl mx-auto text-base sm:text-xl leading-relaxed text-slate-300 font-medium"
          >
            Website materi perkuliahan untuk mahasiswa{" "}
            <span className="text-white font-semibold">Pendidikan Teknik Mesin</span> —
            memahami gambar kerja manufaktur, pemodelan CAD, dan proyek gambar teknik
            berbasis SolidWorks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <a href="#roadmap"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Calendar className="h-4.5 w-4.5" />
              Lihat Alur Pertemuan
              <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a href="#penilaian"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border-2 border-white/20 text-white text-sm font-semibold hover:border-white/40 hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Award className="h-4.5 w-4.5" />
              Sistem Penilaian
            </a>
          </motion.div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
            <path d="M0 80V40C240 8 480 0 720 30C960 60 1200 60 1440 30V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  MAIN CONTENT                                                    */}
      {/* ================================================================ */}

      <main className="mx-auto max-w-4xl px-6 pt-12 pb-16 space-y-24">

        {/* ============================================================ */}
        {/*  2. IDENTITAS MATA KULIAH — ELEVATED CARDS                    */}
        {/* ============================================================ */}

        <motion.section id="identitas"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <SectionHeading icon={BookOpen} accent="blue">Identitas Mata Kuliah</SectionHeading>
          <Card className="border-slate-200 shadow-lg shadow-slate-100 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
            <CardContent className="pt-8">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {identitasMK.map((item, i) => (
                  <div key={i} className={item.label === "Dosen Pengampu" ? "sm:col-span-2 lg:col-span-4" : ""}>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1.5">{item.label}</div>
                    <div className="text-sm text-slate-800 font-semibold whitespace-pre-line leading-relaxed">{item.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* ============================================================ */}
        {/*  3. DESKRIPSI + CPMK — SIDE BY SIDE (DESKTOP)                */}
        {/* ============================================================ */}

        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <SectionHeading icon={ClipboardList} accent="cyan">Deskripsi Mata Kuliah</SectionHeading>
          <Card className="border-slate-200 shadow-lg shadow-slate-100 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
            <CardContent className="pt-8">
              <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                <strong className="text-slate-900">Gambar Mesin (MES6214)</strong>{" "}
                adalah mata kuliah praktik 2 SKS yang membekali mahasiswa{" "}
                <strong className="text-slate-900">Pendidikan Teknik Mesin</strong>{" "}
                dengan kemampuan profesional dalam membaca dan membuat{" "}
                <strong className="text-blue-700">gambar kerja manufaktur</strong> sesuai
                standar industri. Mahasiswa menguasai alur kerja lengkap:
              </p>
              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {[
                  "Membaca & membuat gambar kerja standar teknik mesin",
                  "Dimensi, toleransi, dan simbol pengerjaan",
                  "Gambar komponen tunggal (part drawing)",
                  "Gambar assembly / rakitan",
                  "Sheet metal & gambar bukaan",
                  "Gambar kerja siap produksi untuk pemesinan & fabrikasi",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-lg px-4 py-2.5 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-base leading-relaxed text-slate-600">
                Software utama:{" "}
                <strong className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">SolidWorks</strong>{" "}
                — mencakup sketch 2D, part modeling, assembly, drawing, section view, dimensioning,
                dan manufacturing drawing.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* ============================================================ */}
        {/*  4. CPMK — PREMIUM CARDS                                      */}
        {/* ============================================================ */}

        <motion.section id="cpmk"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <SectionHeading icon={Target} accent="violet">Capaian Pembelajaran (CPMK)</SectionHeading>
          <div className="grid gap-5 sm:grid-cols-2">
            {cpmkList.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className={`h-full border-slate-200 shadow-lg shadow-slate-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden`}>
                  <div className={`absolute top-0 left-0 w-1.5 h-full ${colorMapDot[item.color]}`} />
                  <CardHeader className="pb-3 pl-7">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${colorMap[item.color].split(" ")[0]} ${colorMap[item.color].split(" ")[1]}`}>
                        <item.icon className="h-5.5 w-5.5" />
                      </div>
                      <Badge className={`text-xs border-0 font-bold ${colorMap[item.color].split(" ")[0]} ${colorMap[item.color].split(" ")[1]}`}>
                        {item.id}
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-bold text-slate-900">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-7">
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/*  5. ROADMAP — PREMIUM TIMELINE                                */}
        {/* ============================================================ */}

        <motion.section id="roadmap"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <SectionHeading icon={Calendar} accent="blue">Roadmap 1 Semester</SectionHeading>
          <p className="text-sm text-slate-400 font-medium -mt-8 mb-8">16 Pertemuan — klik untuk detail lengkap</p>

          <div className="relative">
            {/* Timeline spine */}
            <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-100" />

            <div className="space-y-3">
              {roadmap.map((item, i) => {
                const isExpanded = expandedWeeks.has(item.week)
                const isExam = item.isExam

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.03 }}
                    className="relative pl-14"
                  >
                    {/* Timeline node */}
                    <div className={`absolute left-[15px] top-5 w-[17px] h-[17px] rounded-full border-[3px] z-10 transition-all duration-300 ${
                      isExpanded
                        ? (isExam ? "border-amber-400 bg-amber-100 scale-125" : "border-blue-500 bg-blue-100 scale-125")
                        : (isExam ? "border-amber-300 bg-amber-50" : "border-slate-300 bg-white")
                    }`}>
                      {isExpanded && <div className={`absolute inset-1 rounded-full ${isExam ? "bg-amber-400" : "bg-blue-500"}`} />}
                    </div>

                    <Card className={`border transition-all duration-300 ${
                      isExam
                        ? "border-amber-200 bg-amber-50/40 shadow-md"
                        : isExpanded
                          ? "border-blue-200 shadow-lg shadow-blue-50"
                          : "border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-md"
                    }`}>
                      <button
                        onClick={() => toggleWeek(item.week)}
                        className="w-full text-left p-4 flex items-start gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2.5 mb-1.5">
                            <Badge className={`text-[11px] font-bold shrink-0 px-2.5 py-0.5 border-0 ${
                              isExam
                                ? "bg-amber-400 text-amber-900"
                                : isExpanded
                                  ? "bg-blue-600 text-white"
                                  : "bg-slate-100 text-slate-600"
                            }`}>
                              {item.week}
                            </Badge>
                            <h3 className={`text-sm font-bold truncate ${isExpanded ? "text-blue-900" : "text-slate-800"}`}>
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-500 flex items-center gap-1.5">
                            <Monitor className="h-3 w-3 text-blue-400 shrink-0" />
                            <span className="truncate">{item.sw}</span>
                          </p>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className={`shrink-0 mt-1.5 ${isExpanded ? "text-blue-500" : "text-slate-400"}`}
                        >
                          <ChevronDown className="h-5 w-5" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-5 border-t border-slate-100">
                              <div className="grid gap-3.5 pt-4">
                                {[
                                  { icon: Target, label: "Tujuan", value: item.tujuan },
                                  { icon: Users, label: "Aktivitas", value: item.aktivitas },
                                  { icon: FileCheck, label: "Output", value: item.output },
                                  { icon: Award, label: "Penilaian", value: item.penilaian },
                                  { icon: Clock, label: "Waktu", value: "2 × 50 menit" },
                                  { icon: BookOpen, label: "Referensi", value: item.ref },
                                ].map((r, j) => (
                                  <div key={j} className="flex gap-3 text-sm">
                                    <r.icon className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
                                    <div>
                                      <span className="font-semibold text-slate-700">{r.label}</span>
                                      <span className="text-slate-500"> — {r.value}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/*  6. PENILAIAN — IMPACTFUL VISUALS                             */}
        {/* ============================================================ */}

        <motion.section id="penilaian"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <SectionHeading icon={Award} accent="emerald">Sistem Penilaian</SectionHeading>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Kognitif Card */}
            <Card className="border-slate-200 shadow-lg shadow-slate-100 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-300" />
              <CardHeader className="pb-2 pt-7">
                <CardTitle className="text-lg font-bold flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 text-xl font-black">50</div>
                  <div>
                    <div className="text-base text-slate-900">Kognitif</div>
                    <div className="text-xs text-slate-400 font-medium">50% dari total nilai</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                {penilaianKognitif.map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-sm font-semibold text-slate-700">{item.item}</span>
                      <span className="text-lg font-black text-blue-700 tabular-nums">{item.bobot}%</span>
                    </div>
                    <ProgressBar value={item.bobot * 2} color="blue" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Partisipatif Card */}
            <Card className="border-slate-200 shadow-lg shadow-slate-100 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300" />
              <CardHeader className="pb-2 pt-7">
                <CardTitle className="text-lg font-bold flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 text-xl font-black">50</div>
                  <div>
                    <div className="text-base text-slate-900">Partisipatif</div>
                    <div className="text-xs text-slate-400 font-medium">50% dari total nilai</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                {penilaianPartisipatif.map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-sm font-semibold text-slate-700">{item.item}</span>
                      <span className="text-lg font-black text-emerald-700 tabular-nums">{item.bobot}%</span>
                    </div>
                    <ProgressBar value={item.bobot * 2} color="emerald" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Total bar */}
          <Card className="mt-5 border-slate-200 shadow-sm bg-gradient-to-r from-blue-50 to-emerald-50">
            <CardContent className="py-4 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700">Total</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  <span className="text-xs text-slate-500">Kognitif 50%</span>
                </div>
                <span className="text-slate-300">+</span>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-500">Partisipatif 50%</span>
                </div>
                <Separator orientation="vertical" className="h-5 mx-1" />
                <span className="text-lg font-black text-slate-900">100%</span>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* ============================================================ */}
        {/*  7. REFERENSI                                                 */}
        {/* ============================================================ */}

        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <SectionHeading icon={BookOpen} accent="blue">Referensi</SectionHeading>
          <div className="space-y-3">
            {referensiList.map((item, i) => (
              <Card key={i} className="border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200">
                <CardContent className="pt-4 pb-4 flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 text-sm font-black border border-blue-100">
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{item.author}</p>
                    <p className="text-[11px] text-slate-400">{item.publisher}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/*  8. CARA MENGGUNAKAN + COPY LINK                              */}
        {/* ============================================================ */}

        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <SectionHeading icon={Lightbulb} accent="cyan">Cara Menggunakan</SectionHeading>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="border-slate-200 shadow-lg shadow-slate-100 bg-slate-50/50">
              <CardContent className="pt-6">
                <ol className="space-y-3">
                  {caraMenggunakan.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-black mt-0.5 shadow-sm">
                        {i + 1}
                      </div>
                      <span className="text-sm text-slate-700 leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-lg shadow-slate-100 bg-gradient-to-br from-blue-50 to-white flex flex-col justify-center">
              <CardContent className="pt-6 pb-6 text-center">
                <GraduationCap className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <p className="text-sm text-slate-500 mb-4">Bagikan halaman ini ke mahasiswa</p>
                <button
                  onClick={copyLink}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    copied
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                      : "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Link Disalin!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Salin Link Materi
                    </>
                  )}
                </button>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/*  9. FOOTER                                                     */}
        {/* ============================================================ */}

        <footer className="border-t-2 border-slate-100 pt-10">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-md mb-2">
              <Cog className="h-5 w-5" />
            </div>
            <p className="text-base font-bold text-slate-900">
              Defris Hanindya Edwiyan Pradana, S.Pd., M.Pd.
            </p>
            <p className="text-sm text-slate-500">Dosen Pendidikan Teknik Mesin</p>
            <p className="text-sm text-slate-500">Universitas Negeri Medan</p>
            <Separator className="my-4 max-w-xs" />
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Zap className="h-3 w-3" />
              <span>Gambar Mesin · MES6214 · 2025</span>
            </div>
          </div>
        </footer>

      </main>

      {/* ================================================================ */}
      {/*  BACK TO TOP                                                     */}
      {/* ================================================================ */}

      <AnimatePresence>
        {showBackTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900 text-white shadow-xl hover:bg-blue-600 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
