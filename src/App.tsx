import { motion } from "framer-motion"
import {
  Cog,
  BookOpen,
  Target,
  CheckCircle2,
  Lightbulb,
  GraduationCap,
  FileText,
  Ruler,
  PenTool,
  Layers,
  Puzzle,
  FileCheck,
  GitBranch,
  ClipboardList,
  ExternalLink,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

import "./index.css"

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const capaianPembelajaran = [
  "Memahami konsep dasar gambar teknik berbasis CAD",
  "Mengenali antarmuka dan fitur utama SolidWorks",
  "Membuat sketsa 2D sederhana dengan dimensi dan relasi geometri",
  "Mengubah sketsa 2D menjadi model 3D menggunakan fitur extrude dan revolve",
  "Membaca dan menyusun gambar kerja (drawing) sederhana dari model 3D",
]

const materiPerkuliahan = [
  {
    icon: BookOpen,
    title: "Pengenalan CAD dan SolidWorks",
    desc: "Definisi Computer-Aided Design, sejarah singkat, peran CAD dalam industri manufaktur dan pendidikan teknik mesin.",
  },
  {
    icon: Ruler,
    title: "Prinsip Gambar Teknik",
    desc: "Standar proyeksi, jenis garis, skala, etiket gambar, toleransi, dan simbol gambar teknik sesuai ISO/SNI.",
  },
  {
    icon: PenTool,
    title: "Sketch 2D",
    desc: "Membuat geometri dasar: garis, lingkaran, persegi, busur. Pemberian dimensi dan relasi geometri (horizontal, vertical, tangent).",
  },
  {
    icon: Layers,
    title: "Part Modeling",
    desc: "Mengubah sketch 2D menjadi model 3D dengan extrude, revolve, sweep, loft. Penambahan fitur: fillet, chamfer, hole, pattern.",
  },
  {
    icon: Puzzle,
    title: "Assembly",
    desc: "Menggabungkan beberapa part menjadi satu mekanisme. Pengaturan hubungan antar komponen menggunakan mate constraints.",
  },
  {
    icon: FileCheck,
    title: "Drawing",
    desc: "Membuat gambar kerja 2D dari model 3D. Tampak depan, atas, samping, potongan, dimensi, dan anotasi teknis.",
  },
  {
    icon: FileText,
    title: "Export & Dokumentasi",
    desc: "Menyimpan file dalam format SLDPRT, SLDASM, SLDDRW. Export ke PDF, STEP, IGES, dan format gambar untuk dokumentasi.",
  },
]

const alurBelajar = [
  { step: "01", title: "Pahami Konsep", desc: "Pelajari teori gambar teknik dan prinsip CAD melalui materi dan demonstrasi." },
  { step: "02", title: "Ikuti Demonstrasi", desc: "Saksikan demo langsung penggunaan tools SolidWorks oleh dosen." },
  { step: "03", title: "Praktik Mandiri", desc: "Kerjakan latihan terbimbing di lab komputer menggunakan SolidWorks." },
  { step: "04", title: "Kumpulkan Tugas", desc: "Submit file part, assembly, drawing, dan PDF gambar kerja." },
  { step: "05", title: "Dapatkan Umpan Balik", desc: "Terima review dan saran perbaikan dari dosen untuk peningkatan." },
]

const tugasMahasiswa = [
  "Membuat sketsa 2D sederhana (rectangle + circle) dengan dimensi lengkap",
  "Membuat model 3D part sederhana dari sketsa menggunakan extrude",
  "Menambahkan fitur lubang, fillet, dan chamfer pada model",
  "Membuat gambar kerja (drawing) dari model 3D",
  "Mengumpulkan file SolidWorks (.SLDPRT, .SLDDRW) dan PDF gambar kerja",
]

const referensi = [
  { title: "Buku Gambar Teknik Mesin", type: "Buku", desc: "Referensi utama standar gambar teknik sesuai kurikulum PTM." },
  { title: "Modul Praktikum SolidWorks", type: "Modul", desc: "Panduan langkah demi langkah praktik CAD di laboratorium." },
  { title: "Dokumentasi Resmi SolidWorks", type: "Online", desc: "Tutorial, help guide, dan knowledge base dari Dassault Systèmes." },
  { title: "Video Tutorial CAD", type: "Video", desc: "Kanal YouTube edukasi teknik mesin untuk pembelajaran mandiri." },
]

/* -------------------------------------------------------------------------- */
/*  Components                                                                 */
/* -------------------------------------------------------------------------- */

function SectionHeading({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {children}
      </h2>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  App                                                                        */
/* -------------------------------------------------------------------------- */

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-700 font-sans antialiased">

      {/* ================================================================ */}
      {/*  1. NAVBAR                                                       */}
      {/* ================================================================ */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-800 text-white">
              <Cog className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 leading-tight">Menggambar Mesin</div>
              <div className="text-xs text-slate-500 leading-tight">CAD / SolidWorks</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#ringkasan" className="text-slate-600 hover:text-blue-700 transition-colors">Ringkasan</a>
            <a href="#capaian" className="text-slate-600 hover:text-blue-700 transition-colors">Capaian</a>
            <a href="#materi" className="text-slate-600 hover:text-blue-700 transition-colors">Materi</a>
            <a href="#tugas" className="text-slate-600 hover:text-blue-700 transition-colors">Tugas</a>
            <a href="#referensi" className="text-slate-600 hover:text-blue-700 transition-colors">Referensi</a>
          </nav>
          <Badge className="hidden sm:inline-flex bg-blue-50 text-blue-700 hover:bg-blue-100 border-0 text-xs font-medium">
            Pendidikan Teknik Mesin
          </Badge>
        </div>
      </header>

      {/* ================================================================ */}
      {/*  2. HERO                                                         */}
      {/* ================================================================ */}

      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
          <div className="mb-6">
            <Badge className="bg-blue-600/30 text-blue-200 hover:bg-blue-600/40 border-0 text-sm px-4 py-1.5 mb-4">
              <GraduationCap className="mr-1.5 h-3.5 w-3.5" />
              Materi Perkuliahan · Pendidikan Teknik Mesin
            </Badge>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="outline" className="border-slate-700 text-slate-300 text-xs">CAD</Badge>
              <Badge variant="outline" className="border-slate-700 text-slate-300 text-xs">SolidWorks</Badge>
              <Badge variant="outline" className="border-slate-700 text-slate-300 text-xs">Gambar Teknik</Badge>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
            Menggambar Mesin{" "}
            <span className="block text-blue-400">Menggunakan CAD SolidWorks</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300">
            Materi pembelajaran untuk mahasiswa Pendidikan Teknik Mesin dalam
            memahami dasar perancangan, gambar teknik, dan pemodelan 3D berbasis CAD.
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  MAIN CONTENT                                                    */}
      {/* ================================================================ */}

      <main className="mx-auto max-w-4xl px-6 py-16 space-y-20">

        {/* ============================================================ */}
        {/*  3. RINGKASAN MATERI                                          */}
        {/* ============================================================ */}

        <motion.section
          id="ringkasan"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <SectionHeading icon={BookOpen}>Ringkasan Materi</SectionHeading>
          <Card className="border-slate-200 shadow-none">
            <CardContent className="pt-6">
              <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                <strong className="text-slate-900">Computer-Aided Design (CAD)</strong>{" "}
                adalah teknologi berbantuan komputer yang merevolusi proses menggambar
                teknik di industri manufaktur dan pendidikan.{" "}
                <strong className="text-slate-900">SolidWorks</strong>, sebagai
                perangkat lunak CAD 3D berbasis parametric modeling, memungkinkan
                mahasiswa membuat sketsa 2D, model 3D, assembly, dan gambar kerja
                secara terintegrasi. Materi ini dirancang untuk membekali mahasiswa
                Pendidikan Teknik Mesin dengan keterampilan dasar CAD yang aplikatif
                dan sesuai standar industri.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* ============================================================ */}
        {/*  4. CAPAIAN PEMBELAJARAN                                      */}
        {/* ============================================================ */}

        <motion.section
          id="capaian"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <SectionHeading icon={Target}>Capaian Pembelajaran</SectionHeading>
          <Card className="border-slate-200 shadow-none">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500 mb-5">
                Setelah mengikuti materi ini, mahasiswa diharapkan:
              </p>
              <ul className="space-y-3">
                {capaianPembelajaran.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 mt-0.5">
                      <span className="text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-slate-700 leading-relaxed pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.section>

        {/* ============================================================ */}
        {/*  5. MATERI PERKULIAHAN                                        */}
        {/* ============================================================ */}

        <motion.section
          id="materi"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <SectionHeading icon={Layers}>Materi Perkuliahan</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            {materiPerkuliahan.map((item, i) => (
              <Card key={i} className="border-slate-200 shadow-none hover:border-blue-200 transition-colors duration-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                      <item.icon className="h-4.5 w-4.5" />
                    </div>
                    <CardTitle className="text-base font-semibold text-slate-900">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/*  6. ALUR BELAJAR                                              */}
        {/* ============================================================ */}

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <SectionHeading icon={GitBranch}>Alur Belajar Mahasiswa</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-5">
            {alurBelajar.map((item, i) => (
              <Card key={i} className="border-slate-200 shadow-none text-center">
                <CardContent className="pt-5 pb-4">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{item.step}</div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/*  7. TUGAS MAHASISWA                                           */}
        {/* ============================================================ */}

        <motion.section
          id="tugas"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <SectionHeading icon={ClipboardList}>Tugas Mahasiswa</SectionHeading>
          <Card className="border-slate-200 shadow-none">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Cog className="h-5 w-5 text-blue-600" />
                Praktik Menggambar Mesin dengan SolidWorks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tugasMahasiswa.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                    <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-5" />
              <p className="text-xs text-slate-500">
                Format penamaan file: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs text-slate-700">NIM_Nama_CAD01</code>
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* ============================================================ */}
        {/*  8. REFERENSI                                                 */}
        {/* ============================================================ */}

        <motion.section
          id="referensi"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <SectionHeading icon={ExternalLink}>Referensi</SectionHeading>
          <div className="grid gap-3 sm:grid-cols-2">
            {referensi.map((item, i) => (
              <Card key={i} className="border-slate-200 shadow-none">
                <CardContent className="pt-5 pb-4">
                  <div className="flex items-start justify-between mb-1.5">
                    <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                    <Badge variant="secondary" className="text-xs shrink-0 ml-2">{item.type}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/*  CALL TO ACTION                                               */}
        {/* ============================================================ */}

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Alert className="border-blue-200 bg-blue-50/60">
            <Lightbulb className="h-5 w-5 text-blue-700" />
            <AlertTitle className="text-blue-900 font-semibold">
              Mulai dari Dasar, Bangun Secara Bertahap
            </AlertTitle>
            <AlertDescription className="text-blue-800/80 leading-relaxed mt-1">
              Kuasai sketch 2D sebelum ke part modeling. Pahami part sebelum ke assembly.
              Keterampilan CAD adalah fondasi karir teknik mesin Anda — bangun dengan
              teliti, sistematis, dan sesuai standar.
            </AlertDescription>
          </Alert>
        </motion.section>

      </main>

      {/* ================================================================ */}
      {/*  9. FOOTER                                                       */}
      {/* ================================================================ */}

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <div className="flex flex-col items-center text-center space-y-2">
            <p className="text-sm font-semibold text-slate-900">
              Defris Hanindya Edwiyan Pradana, S.Pd., M.Pd.
            </p>
            <p className="text-xs text-slate-500">
              Dosen Pendidikan Teknik Mesin
            </p>
            <p className="text-xs text-slate-500">
              Universitas Negeri Medan
            </p>
            <Separator className="my-3 max-w-xs" />
            <p className="text-xs text-slate-400">
              © 2026 · Materi Perkuliahan CAD SolidWorks
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
