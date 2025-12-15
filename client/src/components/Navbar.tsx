import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, Menu, Moon, Sun, Play } from "lucide-react";
import { SiGithub } from "react-icons/si";

export function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  // Menu Navigasi
  const navItems = [
    { label: "Features", href: "/features" },
    { label: "Guide", href: "/guide" },
    { label: "Templates", href: "/templates" },
    { label: "About", href: "/about" },
  ];

  // Logika Theme
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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-4">

        {/* --- LOGO SECTION (UPDATED) --- */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            {/* 1. Logo Image (Icon Only) */}
            <img
              src="/logo2.png"
              alt="NetVas Logo"
              className="h-10 w-auto object-contain"
            />

            {/* 2. Logo Text (Network Canvas) */}
            <div className="font-bold text-xl tracking-tight hidden sm:block">
              {/* Kata 'Network' warna Primary (Merah/Pink) */}
              <span className="text-primary">Network</span>
              {/* Kata 'Canvas' warna standar + spasi dikit */}
              <span className="text-foreground ml-1.5">Canvas</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <Button
                  variant={location === item.href ? "secondary" : "ghost"}
                  size="sm"
                  className={`text-sm ${location === item.href ? "font-medium" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-foreground">
            <Search className="w-4 h-4" />
          </Button>

          <Link href="https://github.com/username/repo" target="_blank">
            <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-foreground">
              <SiGithub className="w-4 h-4" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Link href="/canvas">
            <Button className="hidden sm:flex font-semibold shadow-sm" data-testid="button-get-started-nav">

              Get Started
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
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

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 absolute w-full z-50 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <Button
                  variant={location === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start text-muted-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="my-2 border-t border-border" />
            <Link href="/canvas">
              <Button className="w-full mt-2" onClick={() => setMobileMenuOpen(false)}>
                <Play className="w-3 h-3 mr-2 fill-current" />
                Start Designing
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
