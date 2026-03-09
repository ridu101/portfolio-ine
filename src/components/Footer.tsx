import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Terminal, Facebook, Heart, ArrowUp, Code2, Zap } from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative border-t border-glass bg-card/40 backdrop-blur-2xl overflow-hidden">
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-border-trace" />

      {/* Background effects */}
      <div className="absolute inset-0 animated-grid opacity-[0.06]" />
      <div className="absolute inset-0 hex-grid opacity-20" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[300px] h-[200px] rounded-full bg-primary/3 blur-[80px] pointer-events-none" />

      <div className="section-container py-16 relative z-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand section */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative p-2 rounded-lg border border-glass bg-card/60">
<<<<<<< HEAD
                <Zap size={20} className="text-primary" />
=======
                <Terminal size={20} className="text-primary" />
>>>>>>> 25c1b5df84b33a5b5b3c414c97965cab600afefa
                <div className="absolute inset-0 rounded-lg bg-primary/5 animate-glow-pulse" />
              </div>
              <div>
                <span className="font-heading text-2xl font-bold neon-text tracking-tight">Ridwan Ahmed</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] text-primary/60 font-heading tracking-[0.2em] uppercase">Available for work</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mt-4">
              Passionate MERN stack developer crafting modern, performant web experiences. Building the future, one commit at a time.
            </p>

            {/* Mini stats */}
            <div className="flex gap-4 mt-6">
              {[
                { label: "Projects", value: "6+" },
                { label: "Technologies", value: "10+" },
                { label: "Commits", value: "100+" },
              ].map((stat) => (
                <div key={stat.label} className="group px-3 py-2 rounded-lg border border-glass bg-card/40 hover:border-glass-hover hover:shadow-neon transition-all duration-300 cursor-default">
                  <div className="text-lg font-heading font-bold text-primary">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <span className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
              <Code2 size={14} className="text-primary/60" />
              <span>Navigation</span>
            </span>
            <div className="flex flex-col gap-1.5 mt-2">
              {[
                { label: "Home", path: "/" },
                { label: "Projects", path: "/projects" },
                { label: "Experience", path: "/experience" },
                { label: "Education", path: "/education" },
                { label: "GitHub Stats", path: "/github" },
                { label: "Contact", path: "/contact" },
              ].map((l) => (
                <Link
                  key={l.label}
                  to={l.path}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all duration-300 py-1"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{l.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Connect section */}
          <div className="md:col-span-4">
            <span className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap size={14} className="text-primary/60" />
              <span>Connect</span>
            </span>

            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { icon: Github, href: "https://github.com/ridu101", label: "GitHub", handle: "@ridu101" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", handle: "Connect" },
                { icon: Mail, href: "mailto:ridu116540@gmail.com", label: "Email", handle: "Mail me" },
                { icon: Facebook, href: "https://www.facebook.com/ridwan.ahmed.116540", label: "Facebook", handle: "Follow" },
              ].map(({ icon: Icon, href, label, handle }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-xl border border-glass bg-card/30 hover:border-glass-hover hover:shadow-neon hover:bg-card/60 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500" />
                  <div className="relative z-10 p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon size={16} className="text-primary/70 group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <div className="relative z-10">
                    <div className="text-xs font-heading font-medium text-foreground/80 group-hover:text-foreground transition-colors">{label}</div>
                    <div className="text-[10px] text-muted-foreground">{handle}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Email CTA */}
            <a
              href="mailto:ridu116540@gmail.com"
              className="group mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
            >
              <Mail size={14} className="text-primary" />
              <span className="text-xs font-heading text-primary/80 group-hover:text-primary transition-colors">ridu116540@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Neon divider */}
        <div className="neon-divider mt-12 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
<<<<<<< HEAD
          <div className="w-full flex justify-center">
            <p className="text-xs text-muted-foreground font-heading tracking-wider flex items-center gap-1.5 justify-center text-center mx-auto">
              © 2026 Ridwan Ahmed
              <span className="text-primary/30">•</span>
              Built with <Heart size={10} className="text-primary/60 inline" /> & Code
              <span className="text-primary/30">•</span>
              <span className="text-primary/50">v2.0</span>
            </p>
          </div>
=======
          <p className="text-xs text-muted-foreground font-heading tracking-wider flex items-center gap-1.5">
            © 2026 Ridwan Ahmed
            <span className="text-primary/30">•</span>
            Built with <Heart size={10} className="text-primary/60 inline" /> & Code
            <span className="text-primary/30">•</span>
            <span className="text-primary/50">v2.0</span>
          </p>

>>>>>>> 25c1b5df84b33a5b5b3c414c97965cab600afefa
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground/60 font-heading tracking-widest uppercase">
            <span className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-primary/40 animate-pulse" />
              System Online
            </span>
          </div>
        </div>
      </div>

      {/* Back to top */}
      {showTop && (
        <button
<<<<<<< HEAD
          aria-label="Scroll to top"
=======
>>>>>>> 25c1b5df84b33a5b5b3c414c97965cab600afefa
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full border border-glass bg-card/80 backdrop-blur-xl text-primary hover:border-glass-hover hover:shadow-neon-strong transition-all duration-300 animate-fade-in-up"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
