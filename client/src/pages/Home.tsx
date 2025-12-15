import {
  Sparkles,
  Network,
  Zap,
  Share2,
  Layers,
  MousePointer2,
  FileJson,
  Settings,
  ArrowRight
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Data Features
// PERBAIKAN 1: Hapus 'text-primary' dari className ikon di sini
const features = [
  { icon: <MousePointer2 className="w-6 h-6" />, title: "Intuitive Drag & Drop", description: "Easily design network topologies by dragging devices onto the canvas and connecting them seamlessly." },
  { icon: <FileJson className="w-6 h-6" />, title: "JSON Import/Export", description: "Save your work as JSON to edit later, or export your topology data for use in other applications." },
  { icon: <Layers className="w-6 h-6" />, title: "Layered Visualization", description: "Organize complex networks with grouping features and distinct visual layers for better clarity." },
  { icon: <Settings className="w-6 h-6" />, title: "Custom Properties", description: "Configure IP addresses, interfaces, and device names directly within the visual editor." },
  { icon: <Zap className="w-6 h-6" />, title: "Fast Performance", description: "Built with Vite and React for a lightning-fast experience even with large network diagrams." },
  { icon: <Share2 className="w-6 h-6" />, title: "Easy Sharing", description: "Export your diagrams as high-quality images to share with your team or include in documentation." }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20">
      <Navbar />

      {/* Grid Pattern Background - Fixed */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{
          zIndex: 0,
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          opacity: 0.3
        }}
      />

      <main className="relative flex-1">

        {/* HERO SECTION - CENTERED */}
        <section className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 pt-20 pb-24 md:pt-32 md:pb-40 text-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span className="text-foreground">Wire your ideas</span>
              <br />
              <span className="text-foreground">with </span>
              <span className="text-primary">NetVas</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A professional-grade, browser-based network topology designer. Visualize your infrastructure with speed and precision directly in your browser.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/canvas">
                <Button size="lg" className="h-14 px-10 rounded-full gap-2 text-base shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-300 group" data-testid="button-start-designing">
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Quickstart
                </Button>
              </Link>
              <Link href="/canvas">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-10 rounded-full gap-2 text-base border-primary/20 hover:bg-primary/5 transition-all duration-300"
                >
                  <SiGithub className="w-5 h-5" />
                  Star on GitHub
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col items-center justify-center gap-3 pt-8 opacity-80">
              <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold shadow-sm">
                      U{i}
                    </div>
                  ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Trusted by <span className="font-bold text-foreground">1,000+</span> Network Engineers
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section className="relative z-10 py-24 bg-card/30 border-y border-border/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 view-timeline-name:--entry">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to design</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built for developers and network engineers who need a lightweight, powerful, and beautiful topology tool.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-background/80 border border-border p-8 rounded-3xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1"
                >
                  {/* PERBAIKAN 2: Tambahkan 'text-primary' di parent div ini */}
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORKFLOW SECTION */}
        <section className="relative z-10 py-32 max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1 animate-in fade-in slide-in-from-left-8 duration-700">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8">Streamlined Workflow</h2>
                  <div className="space-y-10">
                    {[
                        { step: 1, title: "Add Devices", desc: "Select from a library of routers, switches, and end devices. Drag them onto your infinite canvas." },
                        { step: 2, title: "Connect Interfaces", desc: "Draw cables between ports. Choose between Ethernet, Fiber, or Serial connections instantly." },
                        { step: 3, title: "Export Topology", desc: "Download your diagram as a clean PNG image or save the JSON structure for future editing." }
                    ].map((item) => (
                        <div key={item.step} className="flex gap-6 group">
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                                    {item.step}
                                </div>
                                {item.step !== 3 && <div className="w-0.5 h-full bg-gradient-to-b from-primary to-transparent mt-4 opacity-30" />}
                            </div>
                            <div className="pb-8">
                                <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                  </div>
                </div>

                {/* Visual Representation of Workflow - Animated */}
                <div className="order-1 md:order-2 relative bg-gradient-to-br from-muted/50 to-muted/10 rounded-[2.5rem] p-10 border border-border animate-in fade-in slide-in-from-right-8 duration-700">
                   <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full animate-pulse" />
                   <div className="relative space-y-6">
                      <div className="bg-card p-6 rounded-2xl border border-border flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                         <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500"><Network /></div>
                         <div className="h-3 w-32 bg-muted rounded animate-pulse" />
                         <ArrowRight className="ml-auto text-muted-foreground w-5 h-5" />
                      </div>
                      <div className="bg-card p-6 rounded-2xl border border-border flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow ml-12">
                         <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500"><Settings /></div>
                         <div className="h-3 w-40 bg-muted rounded animate-pulse" />
                         <ArrowRight className="ml-auto text-muted-foreground w-5 h-5" />
                      </div>
                      <div className="bg-card p-6 rounded-2xl border border-border flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                         <div className="p-3 bg-green-500/10 rounded-lg text-green-500"><Share2 /></div>
                         <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                         <div className="ml-auto text-xs bg-green-500/10 text-green-600 font-bold px-3 py-1.5 rounded-full">Done</div>
                      </div>
                   </div>
                </div>
            </div>
        </section>

        {/* CTA BOTTOM */}
        <section className="relative z-10 py-24 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 bg-primary/20 blur-[120px] rounded-full pointer-events-none group-hover:bg-primary/30 transition-colors duration-1000" />

            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to map your network?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
              Start creating professional network diagrams directly in your browser. No registration required.
            </p>
            <Link href="/canvas">
              <Button size="lg" className="rounded-full h-16 px-10 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform duration-300">
                Launch NetVas Canvas
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
