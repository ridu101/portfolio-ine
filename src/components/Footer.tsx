import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Terminal, Facebook } from "lucide-react";

const Footer = () => (
  <footer className="relative border-t border-glass bg-card/30 backdrop-blur-xl overflow-hidden">
    {/* Top neon line */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    {/* Background effects */}
    <div className="absolute inset-0 animated-grid opacity-10" />
    <div className="absolute bottom-0 left-1/4 w-[300px] h-[200px] rounded-full bg-primary/5 blur-[80px] pointer-events-none" />

    <div className="section-container py-12 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Terminal size={14} className="text-primary/50" />
            <span className="font-heading text-xl font-bold neon-text">Ridwan Ahmed</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Building the future, one line at a time.</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] text-primary/60 font-heading tracking-widest uppercase">System Active</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            Quick Links
          </span>
          {["Home", "Projects", "Experience", "Contact"].map((l) => (
            <Link
              key={l}
              to={l === "Home" ? "/" : `/${l.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-300"
            >
              {`> ${l}`}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            Connect
          </span>
          <div className="flex gap-4">
            {[
              { icon: Github, href: "https://github.com/ridu101", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Mail, href: "mailto:ridu116540@gmail.com", label: "Email" },
              { icon: Facebook, href: "https://www.facebook.com/ridwan.ahmed.116540", label: "Facebook" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2.5 rounded-lg border border-glass text-muted-foreground hover:text-primary hover:border-glass-hover hover:shadow-neon transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-300" />
                <Icon size={18} className="relative z-10" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-glass text-center">
        <p className="text-xs text-muted-foreground font-heading tracking-wider">© 2026 Rdiwan Ahmed <span className="text-primary/40">|</span> All Rights Reserved <span className="text-primary/40">|</span> <span className="text-primary/60">v2.0</span></p>
      </div>
    </div>
  </footer>
);

export default Footer;
