import { ArrowRight, Network, MousePointer2, Cable, Layers, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const features = [
  {
    icon: MousePointer2,
    title: "Drag & Drop",
    description: "Easily add network devices by dragging them from the library onto your canvas.",
  },
  {
    icon: Cable,
    title: "Visual Connections",
    description: "Create connections between devices with intuitive click-to-connect interface.",
  },
  {
    icon: Layers,
    title: "Multiple Devices",
    description: "Support for routers, switches, and PCs with more devices coming soon.",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "See your network topology update instantly as you make changes.",
  },
  {
    icon: Shield,
    title: "Easy to Use",
    description: "Designed for both beginners and professionals with an intuitive interface.",
  },
  {
    icon: Network,
    title: "Network Visualization",
    description: "Create professional network diagrams for documentation and planning.",
  },
];

export default function Home() {
  const [isDark, setIsDark] = useState(false);

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
      <header className="sticky top-0 z-50 flex items-center justify-between gap-4 px-4 md:px-8 h-14 bg-card border-b border-card-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-primary">
            <Network className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">Network Canvas</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle-home"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Link href="/canvas">
            <Button data-testid="button-get-started-nav">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center">
        <section className="w-full max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Visual Network Topology Designer
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Network Canvas
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Design and visualize network topologies with ease. Drag and drop routers, switches, and PCs to create professional network diagrams in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/canvas">
              <Button size="lg" className="h-12 px-8 text-lg gap-2" data-testid="button-start-designing">
                Start Designing
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="w-full max-w-6xl mx-auto px-4 md:px-8 pb-16">
          <div className="relative rounded-xl border border-card-border bg-card p-2 md:p-4 shadow-lg overflow-hidden">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
              
              <div className="relative flex flex-col items-center gap-4">
                <div className="flex items-center gap-8 md:gap-16">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-blue-500/20 border-2 border-blue-500/40 flex items-center justify-center">
                      <Network className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-muted-foreground">Router-1</span>
                  </div>
                  
                  <div className="w-12 md:w-24 h-0.5 bg-primary/50" />
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center">
                      <Layers className="w-8 h-8 md:w-10 md:h-10 text-green-500" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-muted-foreground">Switch-1</span>
                  </div>
                </div>
                
                <div className="h-8 md:h-12 w-0.5 bg-primary/50 ml-24 md:ml-48" />
                
                <div className="flex items-center gap-8 md:gap-12 ml-24 md:ml-48">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-purple-500/20 border-2 border-purple-500/40 flex items-center justify-center">
                      <MousePointer2 className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-muted-foreground">PC-1</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-purple-500/20 border-2 border-purple-500/40 flex items-center justify-center">
                      <MousePointer2 className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-muted-foreground">PC-2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            Powerful Features
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Everything you need to create professional network topology diagrams
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-card-border" data-testid={`feature-card-${index}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="w-full max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="rounded-2xl bg-primary/5 border border-primary/20 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to design your network?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Start creating professional network diagrams in minutes. No sign-up required.
            </p>
            <Link href="/canvas">
              <Button size="lg" className="h-12 px-8 text-lg gap-2" data-testid="button-start-now">
                Start Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-card-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Network Canvas (NetVas) - Visual Network Topology Designer
          </p>
        </div>
      </footer>
    </div>
  );
}
