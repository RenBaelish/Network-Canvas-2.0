import { Moon, Sun, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MobileSidebar } from "./DeviceSidebar";
import { useEffect, useState } from "react";

export function CanvasHeader() {
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
    <header
      className="sticky top-0 z-50 flex items-center justify-between gap-4 px-4 h-14 bg-background border-b border-border shadow-sm"
      data-testid="canvas-header"
    >
      <div className="flex items-center gap-2">
        <MobileSidebar />

        {}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          {}
          <img
            src="/logo2.png"
            alt="NetVas Logo"
            className="h-9 w-auto object-contain" 
          />

          {}
          <div className="font-bold text-lg tracking-tight hidden sm:block">
            <span className="text-primary">Network</span>
            <span className="text-foreground ml-1.5">Canvas</span>
          </div>
        </Link>
      </div>

      {}
      <div className="flex-1" />

      <div className="flex items-center gap-2">
        {}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-muted-foreground hover:text-foreground rounded-full"
          data-testid="button-theme-toggle"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        {}
        <Link href="/">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary">
                <ChevronLeft className="w-4 h-4" />
                Exit
            </Button>
        </Link>
      </div>
    </header>
  );
}

export default CanvasHeader;
