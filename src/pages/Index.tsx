import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Code2, Database, Globe, Layout, Terminal, Braces,
  GitBranch, Star, Briefcase, GraduationCap, Mail
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

      <div className="section-container relative z-10 text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-sm text-muted-foreground tracking-widest uppercase mb-4">
          {"// Welcome to my portfolio"}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="font-heading text-5xl sm:text-7xl font-bold mb-4">
          Hi, I'm <span className="text-gradient-neon">Rdiwan Ahmed</span>
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

        {[Code2, Terminal, Database, Braces].map((Icon, i) => (
          <motion.div key={i} className="absolute text-primary/20 hidden md:block" style={{ top: `${20 + i * 18}%`, left: i % 2 === 0 ? `${8 + i * 3}%` : undefined, right: i % 2 !== 0 ? `${8 + i * 3}%` : undefined }} animate={{ y: [0, -15, 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}>
            <Icon size={28 + i * 6} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ─── About ─── */
const About = () => (
  <section className="py-24 relative">
    <div className="absolute inset-0 animated-grid opacity-20" />
    <div className="section-container relative z-10">
      <ScrollReveal>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-16">
          {"<"}<span className="text-gradient-neon">About</span>{" />"} <span className="text-muted-foreground text-lg font-normal ml-2">// who_am_i</span>
        </h2>
      </ScrollReveal>
      <div className="flex flex-col md:flex-row items-center gap-16">
        <ScrollReveal className="flex-shrink-0">
          <div className="relative group cursor-pointer">
            {/* Outer rotating ring */}
            <div className="absolute -inset-4 rounded-full border border-dashed border-primary/20 group-hover:border-primary/50 group-hover:animate-spin transition-all duration-700" />
            {/* Pulsing glow on hover */}
            <div className="absolute -inset-2 rounded-full bg-primary/0 group-hover:bg-primary/10 blur-xl transition-all duration-700" />
            {/* Main avatar */}
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative w-52 h-52 rounded-full border-2 border-primary/30 flex items-center justify-center bg-secondary/80 backdrop-blur-sm group-hover:border-primary group-hover:shadow-neon-strong transition-all duration-500 overflow-hidden"
            >
              {/* Scan line effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent top-0 group-hover:animate-[scan_2s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary/40 group-hover:border-primary transition-colors duration-500 rounded-tl-sm" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary/40 group-hover:border-primary transition-colors duration-500 rounded-tr-sm" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary/40 group-hover:border-primary transition-colors duration-500 rounded-bl-sm" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary/40 group-hover:border-primary transition-colors duration-500 rounded-br-sm" />
              {/* Initials */}
              <span className="font-heading text-5xl font-bold text-gradient-neon group-hover:scale-110 transition-transform duration-500">RA</span>
            </motion.div>
            {/* Status indicator */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-card/80 border border-primary/30 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-heading text-primary tracking-wider uppercase">Online</span>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="space-y-4">
            <div className="glass-card p-5 rounded-lg border border-primary/10">
              <p className="text-xs text-primary/60 font-heading mb-2">{"// developer.bio"}</p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                I am <span className="text-foreground font-medium">Rdiwan Ahmed</span>, a passionate MERN Stack Developer who enjoys building modern, scalable, and user-friendly web applications. I specialize in creating responsive interfaces using <span className="text-primary">React</span> and building powerful backend systems using <span className="text-primary">Node.js</span>, <span className="text-primary">Express</span>, and <span className="text-primary">MongoDB</span>.
              </p>
            </div>
            <div className="glass-card p-5 rounded-lg border border-primary/10">
              <p className="text-xs text-primary/60 font-heading mb-2">{"// developer.focus"}</p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                My focus is writing <span className="text-foreground font-medium">clean code</span>, optimizing performance, and delivering intuitive digital experiences that combine strong functionality with beautiful UI design.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

/* ─── Skills ─── */
const Skills = () => (
  <section className="py-24 relative">
    <div className="section-container">
      <ScrollReveal>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12">Tech <span className="text-gradient-neon">Stack</span></h2>
      </ScrollReveal>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {skills.map((skill, i) => (
          <ScrollReveal key={skill.name} delay={i * 0.05}>
            <GlassCard className="text-center">
              <skill.icon className="mx-auto mb-3 text-primary" size={28} />
              <p className="text-sm font-medium text-foreground">{skill.name}</p>
            </GlassCard>
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
      <div className="section-container">
        <ScrollReveal>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12">GitHub <span className="text-gradient-neon">Overview</span></h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1}>
              <GlassCard className="text-center py-8">
                <s.icon className="mx-auto mb-3 text-primary" size={28} />
                <p className="font-heading text-3xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </GlassCard>
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
    <div className="section-container">
      <ScrollReveal>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12">Featured <span className="text-gradient-neon">Projects</span></h2>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProjects.map((p, i) => (
          <ScrollReveal key={p.title} delay={i * 0.1}>
            <GlassCard className="h-full flex flex-col">
              <div className="h-32 rounded-lg bg-secondary/50 mb-4 flex items-center justify-center">
                <Code2 className="text-primary/40" size={40} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((t) => (
                  <span key={t} className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20">{t}</span>
                ))}
              </div>
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">Live Demo</a>
            </GlassCard>
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
    <div className="section-container">
      <ScrollReveal>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12">My <span className="text-gradient-neon">Experience</span></h2>
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {experiencePreview.map((exp, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <GlassCard className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full gradient-neon flex items-center justify-center flex-shrink-0 mt-1">
                <Briefcase size={18} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold text-foreground">{exp.role}</h3>
                <p className="text-xs text-muted-foreground">{exp.org}</p>
                <p className="text-xs text-primary mt-1">{exp.duration}</p>
              </div>
            </GlassCard>
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
    <div className="section-container">
      <ScrollReveal>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12">My <span className="text-gradient-neon">Education</span></h2>
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {educationPreview.map((edu, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <GlassCard className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full gradient-neon flex items-center justify-center flex-shrink-0 mt-1">
                <GraduationCap size={18} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold text-foreground">{edu.level}</h3>
                <p className="text-xs text-muted-foreground">{edu.institution}</p>
                <p className="text-xs text-primary mt-1">{edu.year}</p>
              </div>
            </GlassCard>
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
    <div className="section-container text-center">
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
    <About />
    <Skills />
    <GitHubPreview />
    <FeaturedProjects />
    <ExperiencePreview />
    <EducationPreview />
    <ContactPreview />
    <ConnectCTA />
  </>
);

export default Index;
