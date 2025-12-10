import { Network, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MobileSidebar } from "./DeviceSidebar";
import { CanvasToolbar } from "./CanvasToolbar";
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
      className="sticky top-0 z-50 flex items-center justify-between gap-4 px-4 h-14 bg-card border-b border-card-border"
      data-testid="canvas-header"
    >
      <div className="flex items-center gap-2">
        <MobileSidebar />
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-primary">
            <Network className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="hidden sm:block font-semibold text-foreground">NetVas</span>
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <CanvasToolbar />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          data-testid="button-theme-toggle"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>
    </header>
  );
}

export default CanvasHeader;
