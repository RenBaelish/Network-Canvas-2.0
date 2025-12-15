import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import {
  Router,
  Network,
  MonitorSmartphone,
  Server,
  Cloud,
  ShieldCheck,
  Wifi,
  Laptop,
  Database,
  Globe,
  ChevronRight,
  Menu,
  X,
  BookOpen,
  Cable,
  Zap
} from "lucide-react";

// --- DATA NAVIGASI SIDEBAR ---
const guideSections = [
  { id: "intro", label: "Network Basics" },
  { id: "router", label: "Router" },
  { id: "switch", label: "Switch" },
  { id: "ap", label: "Access Point" },
  { id: "endpoints", label: "PC & Laptops" },
  { id: "server", label: "Server" },
  { id: "firewall", label: "Firewall" },
  { id: "cloud", label: "Cloud & Internet" },
];

export default function Guide() {
  const [activeSection, setActiveSection] = useState("intro");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll Spy Logic (Mendeteksi bagian yang sedang dibaca)
  useEffect(() => {
    const handleScroll = () => {
      const sections = guideSections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 120; // Offset sedikit

      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full flex items-start relative">

        {/* --- SIDEBAR (Desktop) --- */}
        <aside className="hidden lg:block w-64 sticky top-14 h-[calc(100vh-3.5rem)] border-r border-border bg-background/50 backdrop-blur-sm">
          <ScrollArea className="h-full py-6 pr-4 pl-8">
            <h4 className="mb-4 text-xs font-bold text-primary tracking-wider uppercase flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Device Theory
            </h4>
            <div className="flex flex-col gap-1 border-l border-border ml-2 pl-2">
              {guideSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm text-left px-3 py-2 rounded-md transition-colors ${
                    activeSection === section.id
                      ? "bg-primary/10 text-primary font-medium border-l-2 border-primary -ml-[11px]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <h4 className="mb-4 text-xs font-bold text-muted-foreground tracking-wider uppercase">Ready to practice?</h4>
              <Link href="/canvas">
                <Button className="w-full justify-start shadow-sm" size="sm">
                  Go to Canvas
                  <ChevronRight className="ml-auto w-4 h-4" />
                </Button>
              </Link>
            </div>
          </ScrollArea>
        </aside>

        {/* --- MOBILE HEADER --- */}
        <div className="lg:hidden sticky top-14 z-40 w-full bg-background border-b border-border p-4 flex items-center justify-between">
            <span className="font-semibold text-sm">Topic: <span className="text-primary">{guideSections.find(s => s.id === activeSection)?.label}</span></span>
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
        </div>

        {/* --- MOBILE DRAWER --- */}
        {mobileMenuOpen && (
             <div className="lg:hidden fixed inset-0 z-30 bg-background/95 backdrop-blur-sm pt-28 px-6 overflow-y-auto">
                <div className="flex flex-col gap-2 pb-10">
                  <h3 className="text-muted-foreground uppercase text-xs font-bold mb-2">Navigation</h3>
                  {guideSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="text-lg font-medium text-left py-3 border-b border-border"
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
             </div>
        )}

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 min-w-0 py-8 px-4 md:px-12 lg:py-12">

          {/* 1. INTRO */}
          <section id="intro" className="mb-16 scroll-mt-24">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium border border-blue-500/20">
                <BookOpen className="w-3 h-3" />
                Knowledge Base
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight lg:text-5xl">Network Device Guide</h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                A complete theoretical guide to understanding the hardware available in NetVas. Learn what each device does, how it works in real life, and how to wire them correctly.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* 2. ROUTER */}
          <DeviceSection
            id="router"
            icon={Router}
            title="Router"
            color="text-blue-600"
            bgColor="bg-blue-500/10"
            definition="Perangkat jaringan yang bekerja pada Layer 3 (Network Layer) dari model OSI. Router bertugas menghubungkan dua atau lebih jaringan yang berbeda (misalnya LAN ke Internet/WAN) dan mengarahkan paket data ke tujuan yang tepat berdasarkan alamat IP."
            functions={[
              "Menghubungkan jaringan lokal (LAN) ke Internet (WAN).",
              "Melakukan routing (pemilihan jalur terbaik) untuk paket data.",
              "Memberikan layanan DHCP (membagikan IP Address otomatis) di jaringan kecil.",
              "Fitur keamanan dasar (NAT/Firewall) untuk menyembunyikan IP lokal dari publik."
            ]}
            realWorld="Di rumah, router adalah alat yang diberikan oleh provider internet (Indihome/Biznet) yang menghubungkan HP/Laptop kamu ke internet global. Di kantor, router menghubungkan jaringan kantor pusat dengan kantor cabang."
            cabling="Kabel Ethernet (UTP Cat5e/Cat6) dengan konektor RJ45. Biasanya port 'WAN' router dicolok ke modem, dan port 'LAN' dicolok ke Switch atau PC."
          />

          <Separator className="my-12" />

          {/* 3. SWITCH */}
          <DeviceSection
            id="switch"
            icon={Network}
            title="Switch"
            color="text-indigo-600"
            bgColor="bg-indigo-500/10"
            definition="Perangkat Layer 2 (Data Link) yang berfungsi sebagai titik pertemuan kabel dari banyak perangkat dalam satu jaringan lokal (LAN). Switch menggunakan MAC Address untuk mengirim data hanya ke perangkat yang dituju (berbeda dengan Hub yang mengirim ke semua)."
            functions={[
              "Menghubungkan banyak PC, Printer, dan AP dalam satu ruangan/gedung.",
              "Mencegah tabrakan data (collision) agar jaringan lebih cepat.",
              "VLAN (Virtual LAN) support untuk memisahkan departemen dalam satu kabel fisik yang sama."
            ]}
            realWorld="Di warnet atau lab komputer, switch adalah kotak dengan banyak lampu kedap-kedip tempat semua kabel komputer berkumpul. Ini memungkinkan PC-1 bisa mengirim file ke PC-2 dengan sangat cepat."
            cabling="Kabel Straight-through (UTP Cat5e/6). Port switch dihubungkan ke Router (untuk akses internet) dan ke PC/Laptop (untuk klien)."
          />

          <Separator className="my-12" />

          {/* 4. ACCESS POINT */}
          <DeviceSection
            id="ap"
            icon={Wifi}
            title="Access Point (AP)"
            color="text-sky-600"
            bgColor="bg-sky-500/10"
            definition="Perangkat yang memancarkan sinyal Wi-Fi (Wireless Fidelity). AP bertugas mengubah koneksi kabel (wired) menjadi sinyal nirkabel (wireless) agar HP dan Laptop bisa terkoneksi tanpa kabel."
            functions={[
              "Memperluas jangkauan jaringan menggunakan gelombang radio.",
              "Mendukung mobilitas user (bisa pindah-pindah tempat).",
              "Bisa mendukung ratusan user sekaligus (tergantung spesifikasi)."
            ]}
            realWorld="Benda kotak putih atau bulat yang sering ditempel di langit-langit kafe, kampus, atau kantor. Seringkali orang awam menyebutnya 'Wi-Fi', padahal nama alatnya adalah Access Point."
            cabling="Menggunakan kabel Ethernet ke Switch. Sering menggunakan teknologi PoE (Power over Ethernet), artinya listriknya mengalir lewat kabel LAN, jadi tidak perlu colokan listrik di plafon."
          />

          <Separator className="my-12" />

          {/* 5. ENDPOINTS */}
          <section id="endpoints" className="scroll-mt-24">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                   <MonitorSmartphone className="w-6 h-6" />
                </div>
                <div>
                   <h2 className="text-3xl font-bold">PC & Laptops (End Devices)</h2>
                   <p className="text-muted-foreground">User equipment / Client.</p>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-border p-6 rounded-xl">
                   <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <MonitorSmartphone className="w-4 h-4" /> PC / Workstation
                   </h3>
                   <p className="text-sm text-muted-foreground mb-4">
                      Perangkat komputer desktop. Biasanya tidak bergerak dan membutuhkan koneksi kabel yang stabil.
                   </p>
                   <div className="bg-muted p-3 rounded text-xs">
                      <strong>Koneksi:</strong> Kabel LAN (Ethernet) ke Switch atau Wall Jack.
                   </div>
                </div>
                <div className="bg-card border border-border p-6 rounded-xl">
                   <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <Laptop className="w-4 h-4" /> Laptop
                   </h3>
                   <p className="text-sm text-muted-foreground mb-4">
                      Komputer portabel. Sering berpindah tempat dan memprioritaskan koneksi nirkabel.
                   </p>
                   <div className="bg-muted p-3 rounded text-xs">
                      <strong>Koneksi:</strong> Wi-Fi ke Access Point (atau kabel LAN jika tersedia).
                   </div>
                </div>
             </div>
          </section>

          <Separator className="my-12" />

          {/* 6. SERVER */}
          <DeviceSection
            id="server"
            icon={Server}
            title="Server"
            color="text-emerald-600"
            bgColor="bg-emerald-500/10"
            definition="Komputer dengan spesifikasi tinggi yang bertugas 'melayani' (serve) permintaan dari klien. Server bekerja 24 jam nonstop untuk menyediakan data, aplikasi, atau layanan jaringan."
            functions={[
              "Web Server: Menyimpan file website.",
              "Database Server: Menyimpan data pengguna/transaksi.",
              "File Server: Tempat penyimpanan file bersama kantor.",
              "DHCP/DNS Server: Mengatur alamat IP dan nama domain."
            ]}
            realWorld="Biasanya berbentuk rak besi (rackmount) yang disimpan di ruangan dingin khusus (Data Center). Suaranya bising karena kipas pendingin."
            cabling="Biasanya menggunakan koneksi ganda (Redundant) ke Core Switch menggunakan kabel Fiber Optik atau Ethernet kecepatan tinggi (10Gbps) untuk menangani banyak trafik."
          />

          <Separator className="my-12" />

          {/* 7. FIREWALL */}
          <DeviceSection
            id="firewall"
            icon={ShieldCheck}
            title="Firewall"
            color="text-orange-600"
            bgColor="bg-orange-500/10"
            definition="Perangkat keamanan jaringan yang memonitor dan mengontrol lalu lintas data masuk dan keluar berdasarkan aturan keamanan (security rules). Firewall bertindak sebagai 'satpam' jaringan."
            functions={[
              "Memblokir akses dari hacker atau virus.",
              "Mencegah karyawan membuka situs terlarang (Filtering).",
              "VPN Gateway: Mengizinkan akses aman dari luar kantor."
            ]}
            realWorld="Biasanya dipasang tepat di belakang Router internet. Semua data dari internet harus diperiksa dulu oleh Firewall sebelum boleh masuk ke jaringan kantor."
            cabling="Memiliki dua sisi interface: 'Untrusted' (ke arah Internet/Router) dan 'Trusted' (ke arah Switch/LAN Internal)."
          />

          <Separator className="my-12" />

          {/* 8. CLOUD & INTERNET */}
          <DeviceSection
            id="cloud"
            icon={Cloud}
            title="Cloud & Internet"
            color="text-slate-600"
            bgColor="bg-slate-500/10"
            definition="Simbol yang menggambarkan jaringan luas di luar kendali kita (WAN / Wide Area Network). 'Cloud' merepresentasikan internet atau sekumpulan server yang diakses secara remote."
            functions={[
              "Internet: Akses ke Google, YouTube, dll.",
              "Cloud: Server AWS, Google Cloud, atau Azure.",
              "Database: Simbol penyimpanan data terpusat."
            ]}
            realWorld="Kabel Fiber Optik bawah laut atau menara BTS yang menghubungkan kota dan negara. Dalam diagram, ini adalah ujung 'keluar' dari jaringan kita."
            cabling="Koneksi WAN (Wide Area Network). Biasanya menggunakan Fiber Optik dari ISP (Internet Service Provider) yang masuk ke Modem/Router utama."
          />

        </main>
      </div>

      <Footer />
    </div>
  );
}

// --- REUSABLE COMPONENT FOR DEVICE SECTION ---

interface DeviceSectionProps {
  id: string;
  icon: any;
  title: string;
  color: string;
  bgColor: string;
  definition: string;
  functions: string[];
  realWorld: string;
  cabling: string;
}

function DeviceSection({ id, icon: Icon, title, color, bgColor, definition, functions, realWorld, cabling }: DeviceSectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-12 h-12 rounded-xl ${bgColor} ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      <div className="space-y-6">
        {/* Definition */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed font-medium">
            {definition}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
           {/* Fungsi */}
           <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                 <Zap className="w-4 h-4 text-yellow-500" /> Fungsi Utama
              </h3>
              <ul className="space-y-2">
                 {functions.map((fn, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                       <span className="text-primary font-bold">•</span>
                       {fn}
                    </li>
                 ))}
              </ul>
           </div>

           {/* Real World & Cabling */}
           <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                 <h3 className="font-bold text-base mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-500" /> Real World Context
                 </h3>
                 <p className="text-sm text-muted-foreground">
                    {realWorld}
                 </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                 <h3 className="font-bold text-base mb-2 flex items-center gap-2">
                    <Cable className="w-4 h-4 text-green-500" /> Wiring / Cabling
                 </h3>
                 <p className="text-sm text-muted-foreground">
                    {cabling}
                 </p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
