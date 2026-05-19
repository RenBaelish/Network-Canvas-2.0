import { SiGithub, SiX, SiLinkedin } from "react-icons/si";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto relative z-10 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          {}
          <p className="text-sm text-muted-foreground text-center md:text-left order-2 md:order-1">
            © 2025 Network Canvas. Made by Team Six.
          </p>

          {}
          <div className="flex items-center gap-4 order-1 md:order-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full"
            >
              <SiGithub className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full"
            >
              <SiX className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full"
            >
              <SiLinkedin className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
