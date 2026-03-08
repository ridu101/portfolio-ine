import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="relative border-t border-glass bg-card/30 backdrop-blur-xl">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    <div className="section-container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <span className="font-heading text-xl font-bold neon-text">{"<RA />"}</span>
          <p className="mt-2 text-sm text-muted-foreground">Building the future, one line at a time.</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-foreground mb-1">Quick Links</span>
          {["Home", "Projects", "Experience", "Contact"].map((l) => (
            <Link
              key={l}
              to={l === "Home" ? "/" : `/${l.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {l}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-foreground mb-1">Connect</span>
          <div className="flex gap-4">
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Mail, href: "mailto:ridu116540@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-glass text-muted-foreground hover:text-primary hover:border-glass-hover hover:shadow-neon transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-glass text-center">
        <p className="text-xs text-muted-foreground">© 2026 Rdiwan Ahmed. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
