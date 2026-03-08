import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Code2, Database, Globe, Layout, Terminal, Braces,
  GitBranch, Star, Briefcase, GraduationCap, Mail, Cpu, Zap, Shield
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";

const roles = [
  "MERN Stack Developer",
  "Front-End Developer",
  "React Developer",
  "Creative Web Developer",
];

const skills = [
  { name: "HTML", icon: Globe },
  { name: "CSS", icon: Layout },
  { name: "JavaScript", icon: Braces },
  { name: "React", icon: Code2 },
  { name: "Node.js", icon: Terminal },
  { name: "Express.js", icon: Terminal },
  { name: "MongoDB", icon: Database },
  { name: "Tailwind CSS", icon: Layout },
  { name: "Git", icon: Code2 },
  { name: "GitHub", icon: Code2 },
];

const featuredProjects = [
  { title: "Green Earth", desc: "Environmental awareness website promoting eco-friendly living and sustainability.", tags: ["HTML", "CSS", "JavaScript"], live: "https://ridu101.github.io/Green-Earth-Full-Project/" },
  { title: "MoneyPay", desc: "Mobile-inspired digital payment interface simulating modern fintech apps.", tags: ["React", "Tailwind"], live: "https://ridu101.github.io/MoneyPayApp/" },
  { title: "Tea House", desc: "Responsive restaurant landing page for a café business.", tags: ["HTML", "CSS", "JS"], live: "https://ridu101.github.io/tea-house-resources/" },
];

const experiencePreview = [
  { role: "MERN Stack Developer", org: "Freelance / Self-Employed", duration: "2024 – Present" },
  { role: "Front-End Developer", org: "Personal Projects", duration: "2023 – 2024" },
];

const educationPreview = [
  { level: "University", institution: "University of Studies", subject: "Computer Science & Engineering", year: "2024 – Present" },
  { level: "College", institution: "Higher Secondary College", subject: "Science Group", year: "2022 – 2024" },
];

/* ─── Neon Divider ─── */
const NeonDivider = () => (
  <div className="relative py-1">
    <div className="neon-divider" />
    <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rounded-full bg-primary/30 shadow-neon" />
  </div>
);

/* ─── Section Link ─── */
const ViewMoreLink = ({ to, label }: { to: string; label?: string }) => (
  <div className="text-center mt-10">
    <Link to={to} className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1 group">
      {label || "View More"} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
    </Link>
  </div>
);

/* ─── Hero ─── */
const Hero = () => {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 animated-grid opacity-40" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      {/* Extra radial glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      {/* Data stream columns */}
      <div className="absolute inset-0 data-stream opacity-30" />

      <div className="section-container relative z-10 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex items-center justify-center gap-2 mb-6">
          <span className="h-px w-8 bg-primary/30" />
          <Cpu size={14} className="text-primary/50" />
          <span className="text-[10px] font-heading text-primary/50 tracking-[0.3em] uppercase">System Online</span>
          <Cpu size={14} className="text-primary/50" />
          <span className="h-px w-8 bg-primary/30" />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-sm text-muted-foreground tracking-widest uppercase mb-4">
          {"// Welcome to my portfolio"}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="font-heading text-5xl sm:text-7xl font-bold mb-4">
          {"Hi, I'm ".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          <span className="text-gradient-neon">
            {"Rdiwan Ahmed".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.06, type: "spring", stiffness: 200, damping: 15 }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <div className="h-10 overflow-hidden mb-8">
          <motion.div key={roleIdx} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ duration: 0.5 }} className="text-xl sm:text-2xl font-heading text-primary font-medium">
            {roles[roleIdx]}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/projects" className="group inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-heading font-semibold text-sm gradient-neon text-primary-foreground transition-all duration-300 hover:shadow-neon-strong hover:scale-105">
            View Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-heading font-semibold text-sm border border-primary/30 text-primary hover:bg-primary/10 hover:shadow-neon transition-all duration-300 hover:scale-105">
            Let's Connect
          </Link>
        </motion.div>

        {/* Floating tech icons */}
        {[Code2, Terminal, Database, Braces, Shield, Zap].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/15 hidden md:block"
            style={{
              top: `${15 + (i * 14) % 70}%`,
              left: i % 2 === 0 ? `${5 + i * 3}%` : undefined,
              right: i % 2 !== 0 ? `${5 + i * 3}%` : undefined,
            }}
            animate={{ y: [0, -20, 0], rotate: [0, i % 2 === 0 ? 10 : -10, 0] }}
            transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon size={24 + i * 4} />
          </motion.div>
        ))}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-heading text-muted-foreground tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-4 h-7 rounded-full border border-primary/30 flex justify-center pt-1"
          >
            <div className="w-1 h-2 rounded-full bg-primary/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── About ─── */
const About = () => (
  <section className="py-24 relative">
    <div className="absolute inset-0 animated-grid opacity-20" />
    <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
    <div className="section-container relative z-10">
      <ScrollReveal>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-16">
          {"<"}<span className="text-gradient-neon">About</span>{" />"} <span className="text-muted-foreground text-lg font-normal ml-2">// who_am_i</span>
        </h2>
      </ScrollReveal>
      <div className="flex flex-col md:flex-row items-center gap-16">
        <ScrollReveal className="flex-shrink-0">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-4 rounded-full border border-dashed border-primary/20 group-hover:border-primary/50 group-hover:animate-spin transition-all duration-700" />
            <div className="absolute -inset-2 rounded-full bg-primary/0 group-hover:bg-primary/10 blur-xl transition-all duration-700" />
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative w-52 h-52 rounded-full border-2 border-primary/30 flex items-center justify-center bg-secondary/80 backdrop-blur-sm group-hover:border-primary group-hover:shadow-neon-strong transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent top-0 group-hover:animate-[scan_2s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary/40 group-hover:border-primary transition-colors duration-500 rounded-tl-sm" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary/40 group-hover:border-primary transition-colors duration-500 rounded-tr-sm" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary/40 group-hover:border-primary transition-colors duration-500 rounded-bl-sm" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary/40 group-hover:border-primary transition-colors duration-500 rounded-br-sm" />
              <span className="font-heading text-5xl font-bold text-gradient-neon group-hover:scale-110 transition-transform duration-500">RA</span>
            </motion.div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-card/80 border border-primary/30 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-heading text-primary tracking-wider uppercase">Online</span>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group/card rounded-xl border border-primary/10 bg-card/40 backdrop-blur-md p-5 overflow-hidden cursor-pointer hover:border-primary/40 hover:shadow-[0_0_25px_hsl(var(--primary)/0.15)] transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary/0 group-hover/card:border-primary/60 transition-all duration-500 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary/0 group-hover/card:border-primary/60 transition-all duration-500 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary/0 group-hover/card:border-primary/60 transition-all duration-500 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary/0 group-hover/card:border-primary/60 transition-all duration-500 rounded-br-lg" />
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-x-0 h-px bg-primary/30 top-0 opacity-0 group-hover/card:opacity-100 group-hover/card:animate-[scan_2s_ease-in-out_infinite] transition-opacity" />
              </div>
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-primary/0 group-hover/card:bg-primary/10 blur-2xl transition-all duration-700 pointer-events-none" />
              <p className="text-xs text-primary/60 font-heading mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/card:bg-primary animate-pulse" />
                {"// developer.bio"}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base relative z-10">
                I am <span className="text-foreground font-medium">Rdiwan Ahmed</span>, a passionate MERN Stack Developer who enjoys building modern, scalable, and user-friendly web applications. I specialize in creating responsive interfaces using <span className="text-primary">React</span> and building powerful backend systems using <span className="text-primary">Node.js</span>, <span className="text-primary">Express</span>, and <span className="text-primary">MongoDB</span>.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group/card rounded-xl border border-primary/10 bg-card/40 backdrop-blur-md p-5 overflow-hidden cursor-pointer hover:border-primary/40 hover:shadow-[0_0_25px_hsl(var(--primary)/0.15)] transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary/0 group-hover/card:border-primary/60 transition-all duration-500 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary/0 group-hover/card:border-primary/60 transition-all duration-500 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary/0 group-hover/card:border-primary/60 transition-all duration-500 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary/0 group-hover/card:border-primary/60 transition-all duration-500 rounded-br-lg" />
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-x-0 h-px bg-primary/30 top-0 opacity-0 group-hover/card:opacity-100 group-hover/card:animate-[scan_2s_ease-in-out_infinite] transition-opacity" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-primary/0 group-hover/card:bg-primary/10 blur-2xl transition-all duration-700 pointer-events-none" />
              <p className="text-xs text-primary/60 font-heading mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/card:bg-primary animate-pulse" />
                {"// developer.focus"}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base relative z-10">
                My focus is writing <span className="text-foreground font-medium">clean code</span>, optimizing performance, and delivering intuitive digital experiences that combine strong functionality with beautiful UI design.
              </p>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

/* ─── Skills ─── */
const Skills = () => (
  <section className="py-24 relative">
    <div className="absolute inset-0 data-stream opacity-20" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
    <div className="section-container relative z-10">
      <ScrollReveal>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-4">Tech <span className="text-gradient-neon">Stack</span></h2>
        <p className="text-center text-muted-foreground text-xs mb-12 tracking-widest uppercase">{"// tools_i_use.map()"}</p>
      </ScrollReveal>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {skills.map((skill, i) => (
          <ScrollReveal key={skill.name} delay={i * 0.05}>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group glass-card-hover p-6 text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/0 group-hover:border-primary/50 transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/0 group-hover:border-primary/50 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
              <skill.icon className="mx-auto mb-3 text-primary group-hover:drop-shadow-[0_0_8px_hsl(155,100%,50%,0.5)] transition-all duration-300" size={28} />
              <p className="text-sm font-medium text-foreground">{skill.name}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

/* ─── GitHub Stats Preview ─── */
const GitHubPreview = () => {
  const [repos, setRepos] = useState<number | null>(null);
  const [followers, setFollowers] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/ridu101")
      .then((r) => r.json())
      .then((d) => { setRepos(d.public_repos); setFollowers(d.followers); })
      .catch(() => {});
  }, []);

  const stats = [
    { icon: GitBranch, label: "Repositories", value: repos ?? "—" },
    { icon: Star, label: "Followers", value: followers ?? "—" },
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 animated-grid opacity-15" />
      <div className="section-container relative z-10">
        <ScrollReveal>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12">GitHub <span className="text-gradient-neon">Overview</span></h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-card-hover text-center py-8 px-6 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <s.icon className="mx-auto mb-3 text-primary group-hover:drop-shadow-[0_0_8px_hsl(155,100%,50%,0.5)] transition-all duration-300" size={28} />
                <p className="font-heading text-3xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
        <ViewMoreLink to="/github" label="View Full GitHub Stats" />
      </div>
    </section>
  );
};

/* ─── Featured Projects ─── */
const FeaturedProjects = () => (
  <section className="py-24 relative">
    <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
    <div className="absolute inset-0 hex-grid opacity-30" />
    <div className="section-container relative z-10">
      <ScrollReveal>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-4">Featured <span className="text-gradient-neon">Projects</span></h2>
        <p className="text-center text-muted-foreground text-xs mb-12 tracking-widest uppercase">{"// recent_builds.slice(0, 3)"}</p>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProjects.map((p, i) => (
          <ScrollReveal key={p.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card-hover p-6 h-full flex flex-col relative group overflow-hidden"
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/0 group-hover:border-primary/40 transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/0 group-hover:border-primary/40 transition-all duration-500" />
              {/* Glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/0 group-hover:bg-primary/8 blur-3xl transition-all duration-700 pointer-events-none" />

              <div className="h-32 rounded-lg bg-secondary/50 mb-4 flex items-center justify-center relative overflow-hidden border border-primary/5 group-hover:border-primary/20 transition-all duration-500">
                <div className="absolute inset-0 animated-grid opacity-30" />
                <Code2 className="text-primary/30 group-hover:text-primary/60 group-hover:drop-shadow-[0_0_12px_hsl(155,100%,50%,0.4)] transition-all duration-500" size={40} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((t) => (
                  <span key={t} className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20">{t}</span>
                ))}
              </div>
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                Live Demo <ArrowRight size={12} />
              </a>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
      <ViewMoreLink to="/projects" label="View All Projects" />
    </div>
  </section>
);

/* ─── Experience Preview ─── */
const ExperiencePreview = () => (
  <section className="py-24 relative">
    <div className="absolute inset-0 data-stream opacity-15" />
    <div className="section-container relative z-10">
      <ScrollReveal>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12">My <span className="text-gradient-neon">Experience</span></h2>
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {experiencePreview.map((exp, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card-hover p-6 flex items-start gap-4 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
              <div className="w-10 h-10 rounded-full gradient-neon flex items-center justify-center flex-shrink-0 mt-1 group-hover:shadow-neon transition-all duration-300">
                <Briefcase size={18} className="text-primary-foreground" />
              </div>
              <div className="relative z-10">
                <h3 className="font-heading text-base font-semibold text-foreground">{exp.role}</h3>
                <p className="text-xs text-muted-foreground">{exp.org}</p>
                <p className="text-xs text-primary mt-1">{exp.duration}</p>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
      <ViewMoreLink to="/experience" label="View Full Experience" />
    </div>
  </section>
);

/* ─── Education Preview ─── */
const EducationPreview = () => (
  <section className="py-24 relative">
    <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
    <div className="section-container relative z-10">
      <ScrollReveal>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12">My <span className="text-gradient-neon">Education</span></h2>
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {educationPreview.map((edu, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card-hover p-6 flex items-start gap-4 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
              <div className="w-10 h-10 rounded-full gradient-neon flex items-center justify-center flex-shrink-0 mt-1 group-hover:shadow-neon transition-all duration-300">
                <GraduationCap size={18} className="text-primary-foreground" />
              </div>
              <div className="relative z-10">
                <h3 className="font-heading text-base font-semibold text-foreground">{edu.level}</h3>
                <p className="text-xs text-muted-foreground">{edu.institution}</p>
                <p className="text-xs text-primary mt-1">{edu.year}</p>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
      <ViewMoreLink to="/education" label="View Full Education" />
    </div>
  </section>
);

/* ─── Contact Preview ─── */
const ContactPreview = () => (
  <section className="py-24 relative">
    <div className="absolute inset-0 animated-grid opacity-10" />
    <div className="section-container text-center relative z-10">
      <ScrollReveal>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">Get In <span className="text-gradient-neon">Touch</span></h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm">
          Have a project in mind or want to collaborate? I'd love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="mailto:ridu116540@gmail.com" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <Mail size={16} /> ridu116540@gmail.com
          </a>
        </div>
        <ViewMoreLink to="/contact" label="Open Contact Form" />
      </ScrollReveal>
    </div>
  </section>
);

/* ─── Connect CTA ─── */
const ConnectCTA = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
    <div className="absolute inset-0 hex-grid opacity-20" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/8 blur-[150px] pointer-events-none" />
    <div className="section-container relative z-10 text-center">
      <ScrollReveal>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold mb-6">
          Let's Build Something <span className="text-gradient-neon">Amazing</span> Together
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-heading font-semibold text-sm gradient-neon text-primary-foreground hover:shadow-neon-strong hover:scale-105 transition-all duration-300">
            Get In Touch <ArrowRight size={16} />
          </Link>
          <a href="mailto:ridu116540@gmail.com" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-heading font-semibold text-sm border border-primary/30 text-primary hover:bg-primary/10 hover:shadow-neon transition-all duration-300">
            ridu116540@gmail.com
          </a>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

/* ─── Page ─── */
const Index = () => (
  <>
    <Hero />
    <NeonDivider />
    <About />
    <NeonDivider />
    <Skills />
    <NeonDivider />
    <GitHubPreview />
    <NeonDivider />
    <FeaturedProjects />
    <NeonDivider />
    <ExperiencePreview />
    <NeonDivider />
    <EducationPreview />
    <NeonDivider />
    <ContactPreview />
    <NeonDivider />
    <ConnectCTA />
  </>
);

export default Index;
