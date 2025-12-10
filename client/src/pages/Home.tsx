import { ArrowRight, Sparkles, Network, Search, Menu } from "lucide-react";
import { SiGithub, SiDiscord } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function InteractiveDemo() {
  return (
    <div className="relative w-full max-w-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path 
          d="M 200 80 Q 280 80 310 140" 
          fill="none" 
          stroke="url(#lineGradient)" 
          strokeWidth="2" 
          strokeDasharray="4 4"
        />
        <path 
          d="M 200 180 Q 280 180 310 140" 
          fill="none" 
          stroke="url(#lineGradient)" 
          strokeWidth="2" 
          strokeDasharray="4 4"
        />
        <path 
          d="M 200 280 Q 280 280 310 180" 
          fill="none" 
          stroke="url(#lineGradient)" 
          strokeWidth="2" 
          strokeDasharray="4 4"
        />
        <path 
          d="M 380 160 Q 440 160 480 160" 
          fill="none" 
          stroke="url(#lineGradient)" 
          strokeWidth="2" 
          strokeDasharray="4 4"
        />
      </svg>

      <div className="relative grid gap-4 p-8" style={{ zIndex: 2 }}>
        <div className="bg-card border border-card-border rounded-xl p-4 shadow-lg w-48">
          <p className="text-xs text-muted-foreground mb-2">device type</p>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
              <Network className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium">Router</span>
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-4 shadow-lg w-48">
          <p className="text-xs text-muted-foreground mb-3">connection</p>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <span className="text-sm">ethernet</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
              <span className="text-sm text-muted-foreground">fiber</span>
            </label>
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-4 shadow-lg w-48">
          <p className="text-xs text-muted-foreground mb-3">zoom level</p>
          <div className="relative">
            <div className="h-1.5 bg-muted rounded-full">
              <div className="h-full w-2/3 bg-gradient-to-r from-primary/50 to-primary rounded-full" />
            </div>
            <div className="absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full shadow-lg" />
          </div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-card border border-card-border rounded-xl p-4 shadow-lg w-40">
          <p className="text-xs text-muted-foreground mb-3">output</p>
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-sm bg-primary transform rotate-12"
                style={{
                  opacity: 0.5 + Math.random() * 0.5,
                  transform: `rotate(${10 + Math.random() * 30}deg) scale(${0.8 + Math.random() * 0.4})`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        }}
      />

      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 grid grid-cols-2 gap-0.5">
                <div className="w-3 h-3 rounded-sm bg-foreground" />
                <div className="w-3 h-3 rounded-sm bg-foreground" />
                <div className="w-3 h-3 rounded-sm bg-foreground" />
                <div className="w-3 h-3 rounded-sm bg-foreground" />
              </div>
              <span className="font-semibold text-foreground">Network Canvas</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {["Learn", "Examples", "Docs", "Showcase"].map((item) => (
                <Button key={item} variant="ghost" size="sm" className="text-muted-foreground">
                  {item}
                </Button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground">
              <SiGithub className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground">
              <SiDiscord className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground"
              data-testid="button-theme-toggle-home"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Link href="/canvas">
              <Button className="hidden sm:flex" data-testid="button-get-started-nav">
                <Sparkles className="w-4 h-4 mr-2" />
                NetVas Pro
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background p-4">
            <nav className="flex flex-col gap-2">
              {["Learn", "Examples", "Docs", "Showcase"].map((item) => (
                <Button key={item} variant="ghost" className="justify-start text-muted-foreground">
                  {item}
                </Button>
              ))}
              <Link href="/canvas">
                <Button className="w-full mt-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  NetVas Pro
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="relative">
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground">Wire your ideas</span>
                <br />
                <span className="text-foreground">with </span>
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  NetVas
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                A customizable React component for building node-based editors and interactive network diagrams.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/canvas">
                  <Button size="lg" className="h-12 px-6 rounded-full gap-2" data-testid="button-start-designing">
                    <Sparkles className="w-4 h-4" />
                    Quickstart
                  </Button>
                </Link>
                <Link href="/canvas">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="h-12 px-6 rounded-full gap-2 border-primary/30 text-primary"
                    data-testid="button-start-now"
                  >
                    <Sparkles className="w-4 h-4" />
                    NetVas Pro
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <InteractiveDemo />
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 lg:hidden">
          <div className="bg-card border border-card-border rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-2">device type</p>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
                    <Network className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium">Router</span>
                </div>
              </div>
              <div className="bg-muted rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-2">connection</p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm">ethernet</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Network Canvas (NetVas) - Visual Network Topology Designer
          </p>
        </div>
      </footer>
    </div>
  );
}
