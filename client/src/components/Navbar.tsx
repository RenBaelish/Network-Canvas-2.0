import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun } from "lucide-react";

export function Navbar() {
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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-4">

        {}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            {}
            <img
              src="/logo2.png"
              alt="NetVas Logo"
              className="h-10 w-auto object-contain"
            />

            {}
            <div className="font-bold text-xl tracking-tight hidden sm:block">
              <span className="text-primary">Network</span>
              <span className="text-foreground ml-1.5">Canvas</span>
            </div>
          </Link>
        </div>

        {}
        <div className="flex items-center gap-2">

          {}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {}
          <Link href="/canvas">
            <Button className="hidden sm:flex font-semibold shadow-sm" data-testid="button-get-started-nav">
              Get Started
            </Button>
          </Link>

          {}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-border bg-background p-4 absolute w-full z-50 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-2">
            <Link href="/canvas">
              <Button className="w-full mt-2" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
