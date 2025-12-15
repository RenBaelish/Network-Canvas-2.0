import { Link } from "wouter";
import { SiGithub, SiX, SiLinkedin } from "react-icons/si"; // Menggunakan ikon sosial media standar
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto relative z-10 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">

        {/* --- TOP SECTION (Grid Links) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Column 1: Branding & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity w-fit">
              <img
                src="/logo2.png"
                alt="NetVas Logo"
                className="h-8 w-auto object-contain"
              />
              <div className="font-bold text-lg tracking-tight">
                <span className="text-primary">Network</span>
                <span className="text-foreground ml-1.5">Canvas</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              A professional, browser-based tool for designing and visualizing network topologies with speed and precision. Open source and free to use.
            </p>
          </div>

          {/* Column 2: Product */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm tracking-wider uppercase">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/canvas" className="hover:text-primary transition-colors">Visual Editor</Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-primary transition-colors">Features</Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-primary transition-colors">Templates</Link>
              </li>
              <li>
                <span className="flex items-center gap-2">
                  <span className="opacity-50 cursor-not-allowed">Team Collaboration</span>
                  <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">Soon</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm tracking-wider uppercase">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/guide" className="hover:text-primary transition-colors">User Guide</Link>
              </li>
              <li>
                <Link href="/guide#router" className="hover:text-primary transition-colors">Device Documentation</Link>
              </li>
              <li>
                <a href="https://github.com/username/repo" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Changelog</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm tracking-wider uppercase">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <a href="mailto:support@netvas.com" className="hover:text-primary transition-colors">Contact Support</a>
              </li>
            </ul>
          </div>
        </div>

        {/* --- BOTTOM SECTION (Copyright & Socials) --- */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1 text-center md:text-left">
            © 2024 Network Canvas. Made by Team Six.
          </p>

          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full">
              <SiGithub className="w-4 h-4" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full">
              <SiX className="w-4 h-4" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full">
              <SiLinkedin className="w-4 h-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
