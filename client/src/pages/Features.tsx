import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import {
  MousePointer2,
  Hand,
  Cable,
  Download,
  Maximize,
  Type,
  Keyboard,
  CheckCircle2,
  ChevronRight,
  Menu,
  X
} from "lucide-react";


const docsSections = [
  { id: "introduction", label: "Introduction" },
  { id: "interface", label: "The Interface" },
  { id: "devices", label: "Adding Devices" },
  { id: "wiring", label: "Wiring & Connections" },
  { id: "editing", label: "Editing & Labels" },
  { id: "export", label: "Exporting" },
  { id: "shortcuts", label: "Keyboard Shortcuts" },
];

export default function Features() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const sections = docsSections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 100;

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

        {}
        <aside className="hidden lg:block w-64 sticky top-14 h-[calc(100vh-3.5rem)] border-r border-border bg-background/50 backdrop-blur-sm">
          <ScrollArea className="h-full py-6 pr-4 pl-8">
            <h4 className="mb-4 text-sm font-bold text-primary tracking-wider uppercase">Contents</h4>
            <div className="flex flex-col gap-1">
              {docsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm text-left px-3 py-2 rounded-md transition-colors ${
                    activeSection === section.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <h4 className="mb-4 text-sm font-bold text-primary tracking-wider uppercase">Resources</h4>
              <Link href="/canvas">
                <Button className="w-full justify-start" size="sm">
                  Open Editor
                  <ChevronRight className="ml-auto w-4 h-4" />
                </Button>
              </Link>
            </div>
          </ScrollArea>
        </aside>

        {}
        <div className="lg:hidden sticky top-14 z-40 w-full bg-background border-b border-border p-4 flex items-center justify-between">
            <span className="font-semibold text-sm">On this page: <span className="text-primary">{docsSections.find(s => s.id === activeSection)?.label}</span></span>
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
        </div>

        {}
        {mobileMenuOpen && (
             <div className="lg:hidden fixed inset-0 z-30 bg-background/95 backdrop-blur-sm pt-28 px-6">
                <div className="flex flex-col gap-2">
                  {docsSections.map((section) => (
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

        {}
        <main className="flex-1 min-w-0 py-8 px-4 md:px-12 lg:py-12">

          {}
          <section id="introduction" className="mb-16 scroll-mt-24">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight lg:text-5xl">NetVas Documentation</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Welcome to NetVas, a professional-grade network topology designer that runs directly in your browser.
                This guide will help you understand the tools and features available to create complex diagrams in minutes.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                 <Badge text="v1.0.0" />
                 <Badge text="Open Source" />
                 <Badge text="Client-side Only" />
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {}
          <section id="interface" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
               <Maximize className="w-8 h-8 text-primary" />
               The Interface
            </h2>
            <p className="mb-6 text-muted-foreground">The NetVas editor is divided into three main areas designed for maximum workspace efficiency.</p>

            <div className="grid md:grid-cols-2 gap-6">
               <div className="border border-border rounded-xl p-6 bg-card">
                  <h3 className="font-bold text-lg mb-2">1. The Canvas</h3>
                  <p className="text-sm text-muted-foreground">
                     The central infinite grid where you build your topology. You can pan (drag) and zoom (scroll) to navigate large networks.
                  </p>
               </div>
               <div className="border border-border rounded-xl p-6 bg-card">
                  <h3 className="font-bold text-lg mb-2">2. Device Library (Left)</h3>
                  <p className="text-sm text-muted-foreground">
                     Contains all available network components organized by category (Infrastructure, Endpoints, Security, etc).
                  </p>
               </div>
               <div className="border border-border rounded-xl p-6 bg-card">
                  <h3 className="font-bold text-lg mb-2">3. Floating Toolbar</h3>
                  <p className="text-sm text-muted-foreground">
                     Located at the top-center, providing quick access to essential tools like Select, Pan, Connect, and Export.
                  </p>
               </div>
            </div>
          </section>

          <Separator className="my-8" />

          {}
          <section id="devices" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Adding Devices</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg mb-4">
                 NetVas uses a simple <strong>Drag & Drop</strong> system. No need to double-click or use complex menus.
              </p>
              <ol className="list-decimal list-inside space-y-4 bg-muted/30 p-6 rounded-2xl border border-border">
                 <li className="pl-2">Open the <strong className="text-foreground">Device Sidebar</strong> on the left.</li>
                 <li className="pl-2">Expand a category (e.g., <em className="text-muted-foreground">Infrastructure</em>).</li>
                 <li className="pl-2">Click and hold on a device (e.g., <em className="text-muted-foreground">Router</em>).</li>
                 <li className="pl-2">Drag it onto the canvas grid and release.</li>
              </ol>
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 p-4 rounded-lg border border-primary/20">
                 <CheckCircle2 className="w-5 h-5 text-primary" />
                 <strong>Pro Tip:</strong> Devices will snap to the nearest grid point for perfect alignment.
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {}
          <section id="wiring" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
               <Cable className="w-8 h-8 text-primary" />
               Wiring & Connections
            </h2>
            <p className="mb-6 text-muted-foreground">
               We use a <strong>"Loose Mode"</strong> connection system, meaning you have complete freedom on how devices are connected.
            </p>

            <div className="bg-card border border-border rounded-2xl overflow-hidden mb-8">
               <div className="bg-muted px-4 py-2 border-b border-border text-xs font-mono text-muted-foreground uppercase">
                  Interactive Demo Preview
               </div>
               <div className="p-8 flex flex-col items-center justify-center gap-8 relative">
                  {}
                  <div className="flex justify-between w-full max-w-md relative">
                     <div className="w-20 h-20 bg-background border-2 border-primary rounded-lg flex flex-col items-center justify-center shadow-sm z-10">
                        <div className="w-2 h-2 bg-primary rounded-full absolute -right-1 top-1/2 -translate-y-1/2" />
                        <span className="font-bold text-xs">PC-1</span>
                     </div>

                     <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                        <path d="M 230 40 L 80 40" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" strokeDasharray="5,5" />
                        <path d="M 80 40 C 150 40, 150 40, 230 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" markerEnd="url(#arrow)" />
                        <defs>
                           <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                              <path d="M0,0 L0,6 L9,3 z" fill="hsl(var(--primary))" />
                           </marker>
                        </defs>
                     </svg>

                     <div className="w-20 h-20 bg-background border-2 border-primary rounded-lg flex flex-col items-center justify-center shadow-sm z-10">
                        <div className="w-2 h-2 bg-primary rounded-full absolute -left-1 top-1/2 -translate-y-1/2" />
                        <span className="font-bold text-xs">Switch-1</span>
                     </div>
                  </div>
                  <p className="text-sm text-center text-muted-foreground italic">
                     Connection lines automatically route orthogonally (90-degree angles) for a clean look.
                  </p>
               </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
               <StepCard
                  step="1"
                  title="Select Connect Tool"
                  desc="Click the Cable icon in the toolbar or press 'C'."
               />
               <StepCard
                  step="2"
                  title="Choose Source Port"
                  desc="Hover over any side of a device (Top, Right, Bottom, Left). A small dot will appear."
               />
               <StepCard
                  step="3"
                  title="Drag to Target"
                  desc="Click and drag the cable to another device's port."
               />
               <StepCard
                  step="4"
                  title="Release"
                  desc="Release the mouse to create the link. You can connect multiple cables to a single port."
               />
            </div>
          </section>

          <Separator className="my-8" />

          {}
          <section id="editing" className="mb-16 scroll-mt-24">
             <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
               <Type className="w-8 h-8 text-primary" />
               Editing & Text Labels
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
               Customize your topology with specific names and floating text annotations.
            </p>
            <ul className="space-y-4">
               <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                     <MousePointer2 className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="font-bold">Selection</h4>
                     <p className="text-muted-foreground text-sm">Click any device or cable to select it. Hold <kbd className="bg-muted px-1 rounded text-xs border">Shift</kbd> to select multiple items.</p>
                  </div>
               </li>
               <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center shrink-0">
                     <Type className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="font-bold">Text Labels</h4>
                     <p className="text-muted-foreground text-sm">Drag the "Text" tool from the sidebar to add free-floating text. Double-click any label (on devices or free text) to rename it.</p>
                  </div>
               </li>
            </ul>
          </section>

          <Separator className="my-8" />

          {}
          <section id="export" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
               <Download className="w-8 h-8 text-primary" />
               Exporting
            </h2>
            <p className="mb-6 text-muted-foreground">
               NetVas allows you to take your work outside the browser. Look for the export buttons in the toolbar.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
               <div className="p-6 border border-border rounded-xl">
                  <h4 className="font-bold mb-2">Download PNG</h4>
                  <p className="text-sm text-muted-foreground mb-4">Creates a high-resolution raster image. The background is transparent by default unless grid is active.</p>
                  <Button variant="outline" size="sm" disabled>Download PNG</Button>
               </div>
               <div className="p-6 border border-border rounded-xl">
                  <h4 className="font-bold mb-2">Download PDF</h4>
                  <p className="text-sm text-muted-foreground mb-4">Generates a vector-quality PDF document, ideal for printing or including in formal reports.</p>
                  <Button variant="outline" size="sm" disabled>Download PDF</Button>
               </div>
            </div>
          </section>

          <Separator className="my-8" />

          {}
          <section id="shortcuts" className="mb-24 scroll-mt-24">
             <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
               <Keyboard className="w-8 h-8 text-primary" />
               Keyboard Shortcuts
            </h2>
            <div className="border border-border rounded-xl overflow-hidden">
               <table className="w-full text-left text-sm">
                  <thead className="bg-muted text-muted-foreground font-medium border-b border-border">
                     <tr>
                        <th className="p-4">Action</th>
                        <th className="p-4">Shortcut</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                     <ShortcutRow action="Select Tool" keys={["V"]} />
                     <ShortcutRow action="Pan Tool" keys={["H"]} />
                     <ShortcutRow action="Connect Tool" keys={["C"]} />
                     <ShortcutRow action="Delete Selected" keys={["Del", "Backspace"]} />
                     <ShortcutRow action="Multi-Select" keys={["Shift", "Click"]} />
                     <ShortcutRow action="Zoom In/Out" keys={["Ctrl", "Scroll"]} />
                  </tbody>
               </table>
            </div>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  );
}



function Badge({ text }: { text: string }) {
   return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
         {text}
      </span>
   );
}

function StepCard({ step, title, desc }: { step: string, title: string, desc: string }) {
   return (
      <div className="flex flex-col gap-2 p-4 rounded-xl border border-border bg-card/50">
         <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mb-2">
            {step}
         </div>
         <h4 className="font-bold">{title}</h4>
         <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
   );
}

function ShortcutRow({ action, keys }: { action: string, keys: string[] }) {
   return (
      <tr className="hover:bg-muted/50 transition-colors">
         <td className="p-4 font-medium">{action}</td>
         <td className="p-4">
            <div className="flex gap-1">
               {keys.map((k, i) => (
                  <span key={i} className="px-2 py-1 rounded bg-muted border border-border font-mono text-xs font-bold text-foreground">
                     {k}
                  </span>
               ))}
            </div>
         </td>
      </tr>
   );
}
