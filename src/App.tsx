import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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
  ChevronUp,
  Calendar,
  ClipboardList,
  FileCheck,
  Monitor,
  Copy,
  Check,
  ArrowUp,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import "./index.css"

/* ========================================================================== */
/*  DATA — RPS                                                                */
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
    title: "Tanggung Jawab Mandiri",
    desc: "Bertanggung jawab dalam membuat gambar komponen mesin secara mandiri sesuai standar industri.",
  },
  {
    id: "CPMK-2",
    title: "Prinsip Gambar Teknik",
    desc: "Menguasai prinsip dasar gambar teknik mesin dan menerapkannya dalam gambar kerja manufacturing drawing.",
  },
  {
    id: "CPMK-3",
    title: "Rancangan Manufaktur",
    desc: "Membuat rancangan gambar manufaktur yang memenuhi standar produksi dan proses pemesinan.",
  },
  {
    id: "CPMK-4",
    title: "Gambar Kerja Produksi",
    desc: "Membuat rancangan gambar kerja manufaktur untuk pemesinan, pengecoran, dan fabrikasi.",
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

function SectionHeading({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{children}</h2>
    </div>
  )
}

function ProgressBar({ value, color = "blue" }: { value: number; color?: "blue" | "emerald" }) {
  const c = color === "emerald" ? "bg-emerald-500" : "bg-blue-600"
  return (
    <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
      <div className={`h-full rounded-full ${c} transition-all duration-1000`} style={{ width: `${value}%` }} />
    </div>
  )
}

/* ========================================================================== */
/*  APP                                                                        */
/* ========================================================================== */

export default function App() {
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set())
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
    <div className="min-h-screen bg-white text-slate-700 font-sans antialiased scroll-smooth">

      {/* ================================================================ */}
      {/*  NAVBAR                                                          */}
      {/* ================================================================ */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-700 text-white">
              <Cog className="h-4 w-4" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-slate-900 leading-tight">Gambar Mesin — CAD SolidWorks</div>
              <div className="text-xs text-slate-500 leading-tight">MES6214 · 2 SKS · PTM Unimed</div>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-xs sm:text-sm">
            <a href="#identitas" className="text-slate-600 hover:text-blue-700 transition-colors hidden md:inline">Identitas</a>
            <a href="#cpmk" className="text-slate-600 hover:text-blue-700 transition-colors hidden md:inline">CPMK</a>
            <a href="#roadmap" className="text-slate-600 hover:text-blue-700 transition-colors">Roadmap</a>
            <a href="#penilaian" className="text-slate-600 hover:text-blue-700 transition-colors hidden md:inline">Penilaian</a>
            <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-0 text-xs">MES6214</Badge>
          </nav>
        </div>
      </header>

      {/* ================================================================ */}
      {/*  1. HERO                                                         */}
      {/* ================================================================ */}

      <section className="relative bg-slate-900 overflow-hidden">
        {/* Blueprint grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />

        <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-32 text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge className="bg-blue-600/30 text-blue-200 border-0 text-xs">MES6214</Badge>
            <Badge className="bg-blue-600/20 text-blue-200 border-0 text-xs">2 SKS Praktik</Badge>
            <Badge className="bg-blue-600/20 text-blue-200 border-0 text-xs">Semester 3</Badge>
            <Badge className="bg-blue-600/20 text-blue-200 border-0 text-xs">SolidWorks</Badge>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
            Gambar Mesin Berbasis CAD{" "}
            <span className="block text-blue-400">dengan SolidWorks</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-slate-300">
            Website materi perkuliahan untuk membantu mahasiswa Pendidikan Teknik Mesin
            memahami gambar kerja manufaktur, pemodelan CAD, penyajian gambar teknik,
            dan proyek gambar kerja berbasis SolidWorks.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#roadmap" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
              <Calendar className="h-4 w-4" />
              Lihat Alur Pertemuan
            </a>
            <a href="#penilaian" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-600 text-slate-200 text-sm font-medium hover:border-slate-500 hover:bg-slate-800 transition-colors">
              <Award className="h-4 w-4" />
              Lihat Sistem Penilaian
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  MAIN CONTENT                                                    */}
      {/* ================================================================ */}

      <main className="mx-auto max-w-4xl px-6 py-16 space-y-20">

        {/* ============================================================ */}
        {/*  2. IDENTITAS MATA KULIAH                                     */}
        {/* ============================================================ */}

        <motion.section id="identitas"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
        >
          <SectionHeading icon={BookOpen}>Identitas Mata Kuliah</SectionHeading>
          <Card className="border-slate-200 shadow-none bg-slate-50/50">
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {identitasMK.map((item, i) => (
                  <div key={i} className={item.label === "Dosen Pengampu" ? "sm:col-span-2" : ""}>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div className="text-sm text-slate-900 font-medium whitespace-pre-line">{item.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* ============================================================ */}
        {/*  3. DESKRIPSI MATA KULIAH                                     */}
        {/* ============================================================ */}

        <motion.section
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
        >
          <SectionHeading icon={ClipboardList}>Deskripsi Mata Kuliah</SectionHeading>
          <Card className="border-slate-200 shadow-none">
            <CardContent className="pt-6">
              <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                Mata kuliah <strong className="text-slate-900">Gambar Mesin (MES6214)</strong>{" "}
                merupakan mata kuliah praktik 2 SKS yang membekali mahasiswa Pendidikan
                Teknik Mesin dengan kemampuan membaca dan membuat{" "}
                <strong className="text-slate-900">gambar kerja manufaktur</strong>{" "}
                (manufacturing drawing) sesuai standar industri. Mahasiswa akan belajar:
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Membaca dan membuat gambar kerja sesuai standar gambar teknik mesin",
                  "Menentukan dimensi, toleransi, dan simbol pengerjaan",
                  "Membuat gambar komponen tunggal (part drawing)",
                  "Menyusun gambar assembly/rakitan",
                  "Membuat gambar sheet metal dan bukaan",
                  "Menghasilkan gambar kerja siap produksi untuk pemesinan, pengecoran, dan fabrikasi",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Praktik menggambar dilakukan menggunakan{" "}
                <strong className="text-blue-700">SolidWorks</strong> sebagai
                perangkat lunak CAD utama, mencakup sketch 2D, part modeling, assembly,
                drawing, section view, dimensioning, dan manufacturing drawing.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* ============================================================ */}
        {/*  4. CPMK                                                        */}
        {/* ============================================================ */}

        <motion.section id="cpmk"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
        >
          <SectionHeading icon={Target}>Capaian Pembelajaran (CPMK)</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            {cpmkList.map((item, i) => (
              <Card key={i} className="border-slate-200 shadow-none hover:border-blue-200 transition-colors">
                <CardHeader className="pb-2">
                  <Badge className="bg-blue-50 text-blue-700 border-0 text-xs mb-2 w-fit">{item.id}</Badge>
                  <CardTitle className="text-base font-semibold text-slate-900">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/*  5. ROADMAP 1 SEMESTER                                        */}
        {/* ============================================================ */}

        <motion.section id="roadmap"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
        >
          <SectionHeading icon={Calendar}>Roadmap 1 Semester</SectionHeading>
          <p className="text-sm text-slate-500 -mt-6 mb-6">16 pertemuan — klik untuk detail</p>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-3 bottom-3 w-px bg-slate-200" />

            <div className="space-y-2">
              {roadmap.map((item, i) => {
                const isExpanded = expandedWeeks.has(item.week)
                const isExam = item.isExam

                return (
                  <div key={i} className="relative pl-12">
                    {/* Dot */}
                    <div className={`absolute left-[12px] top-4 w-4 h-4 rounded-full border-2 z-10 ${
                      isExam ? "bg-amber-100 border-amber-400" : "bg-white border-blue-300"
                    }`} />

                    <Card className={`border-slate-200 shadow-none transition-all ${
                      isExam ? "bg-amber-50/50 border-amber-200" : "hover:border-blue-200"
                    }`}>
                      <button
                        onClick={() => toggleWeek(item.week)}
                        className="w-full text-left p-4 flex items-start justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={`text-xs shrink-0 ${
                              isExam ? "bg-amber-100 text-amber-800 border-0" : "bg-slate-100 text-slate-700 border-0"
                            }`}>{item.week}</Badge>
                            <h3 className="text-sm font-semibold text-slate-900 truncate">{item.title}</h3>
                          </div>
                          <p className="text-xs text-slate-500 flex items-center gap-1.5">
                            <Monitor className="h-3 w-3 text-blue-400 shrink-0" />
                            <span className="truncate">{item.sw}</span>
                          </p>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 shrink-0 text-slate-400 mt-1" />
                        ) : (
                          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 mt-1" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 border-t border-slate-100">
                          <div className="grid gap-3 pt-3 text-xs sm:text-sm">
                            <div className="flex gap-2">
                              <Target className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
                              <div>
                                <span className="font-medium text-slate-700">Tujuan: </span>
                                <span className="text-slate-600">{item.tujuan}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Users className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
                              <div>
                                <span className="font-medium text-slate-700">Aktivitas: </span>
                                <span className="text-slate-600">{item.aktivitas}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <FileCheck className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
                              <div>
                                <span className="font-medium text-slate-700">Output: </span>
                                <span className="text-slate-600">{item.output}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Award className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
                              <div>
                                <span className="font-medium text-slate-700">Penilaian: </span>
                                <span className="text-slate-600">{item.penilaian}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Clock className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
                              <div>
                                <span className="font-medium text-slate-700">Waktu: </span>
                                <span className="text-slate-600">2 × 50 menit</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <BookOpen className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
                              <div>
                                <span className="font-medium text-slate-700">Referensi: </span>
                                <span className="text-slate-500">{item.ref}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/*  6. SISTEM PENILAIAN                                          */}
        {/* ============================================================ */}

        <motion.section id="penilaian"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
        >
          <SectionHeading icon={Award}>Sistem Penilaian</SectionHeading>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Kognitif */}
            <Card className="border-slate-200 shadow-none">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-600" />
                  Kognitif — 50%
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {penilaianKognitif.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700">{item.item}</span>
                      <span className="font-medium text-slate-900">{item.bobot}%</span>
                    </div>
                    <ProgressBar value={item.bobot * 2} color="blue" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Partisipatif */}
            <Card className="border-slate-200 shadow-none">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  Partisipatif — 50%
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {penilaianPartisipatif.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700">{item.item}</span>
                      <span className="font-medium text-slate-900">{item.bobot}%</span>
                    </div>
                    <ProgressBar value={item.bobot * 2} color="emerald" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/*  7. REFERENSI                                                 */}
        {/* ============================================================ */}

        <motion.section
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
        >
          <SectionHeading icon={BookOpen}>Referensi</SectionHeading>
          <div className="space-y-3">
            {referensiList.map((item, i) => (
              <Card key={i} className="border-slate-200 shadow-none">
                <CardContent className="pt-4 pb-4 flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-700 text-xs font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500">{item.author}</p>
                    <p className="text-xs text-slate-400">{item.publisher}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/*  8. CARA MENGGUNAKAN                                          */}
        {/* ============================================================ */}

        <motion.section
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
        >
          <SectionHeading icon={Lightbulb}>Cara Menggunakan Website Ini</SectionHeading>
          <Card className="border-slate-200 shadow-none bg-slate-50/50">
            <CardContent className="pt-6">
              <ol className="space-y-3">
                {caraMenggunakan.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold mt-0.5">
                      {i + 1}
                    </div>
                    <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
              <Separator className="my-4" />
              <button
                onClick={copyLink}
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Link Disalin!" : "Salin Link Materi"}
              </button>
            </CardContent>
          </Card>
        </motion.section>

        {/* ============================================================ */}
        {/*  9. FOOTER                                                     */}
        {/* ============================================================ */}

        <footer className="border-t border-slate-200 pt-8">
          <div className="flex flex-col items-center text-center space-y-1.5">
            <p className="text-sm font-semibold text-slate-900">
              Defris Hanindya Edwiyan Pradana, S.Pd., M.Pd.
            </p>
            <p className="text-xs text-slate-500">Dosen Pendidikan Teknik Mesin</p>
            <p className="text-xs text-slate-500">Universitas Negeri Medan</p>
            <Separator className="my-3 max-w-xs" />
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Cog className="h-3 w-3" />
              <span>Gambar Mesin · MES6214 · 2025</span>
            </div>
          </div>
        </footer>

      </main>

      {/* ================================================================ */}
      {/*  BACK TO TOP                                                     */}
      {/* ================================================================ */}

      {showBackTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
