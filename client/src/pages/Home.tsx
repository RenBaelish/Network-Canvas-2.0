import { Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (

    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 overflow-x-hidden">

      <Navbar />

      {}
      <main className="flex-1 flex flex-col justify-center items-center relative w-full min-h-[calc(100vh-3.5rem)]">

        {}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
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

        {}
        <section className="relative z-10 w-full max-w-5xl px-4 sm:px-6 md:px-8 text-center flex flex-col items-center justify-center">

          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              <span className="text-foreground">Wire your ideas</span>
              <br className="block sm:hidden" />
              <span className="text-foreground"> with </span>
              <span className="text-primary whitespace-nowrap">NetVas</span>
            </h1>

            {}
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-lg md:max-w-2xl mx-auto leading-relaxed px-2">
              A professional-grade, browser-based network topology designer. Visualize your infrastructure with speed directly in your browser.
            </p>

            {}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 w-full sm:w-auto px-4">

              {}
              <Link href="/canvas" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-8 rounded-full gap-2 text-base shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-300 group">
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Quickstart
                </Button>
              </Link>

              {}
              <a
                href="https://github.com/RenBaelish"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-12 sm:h-14 px-8 rounded-full gap-2 text-base border-primary/20 hover:bg-primary/5 transition-all duration-300"
                >
                  <SiGithub className="w-5 h-5" />
                  Star on GitHub
                </Button>
              </a>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
