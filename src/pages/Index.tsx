import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Database, Globe, Layout, Terminal, Braces } from "lucide-react";
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
  { title: "Green Earth", desc: "Environmental awareness website promoting eco-friendly living and sustainability.", tags: ["HTML", "CSS", "JavaScript"] },
  { title: "MoneyPay", desc: "Mobile-inspired digital payment interface simulating modern fintech apps.", tags: ["React", "Tailwind"] },
  { title: "Tea House", desc: "Responsive restaurant landing page for a café business.", tags: ["HTML", "CSS", "JS"] },
];

const Hero = () => {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Grid overlay */}
      <div className="absolute inset-0 animated-grid opacity-40" />
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-muted-foreground tracking-widest uppercase mb-4"
        >
          {"// Welcome to my portfolio"}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-heading text-5xl sm:text-7xl font-bold mb-4"
        >
          Hi, I'm{" "}
          <span className="text-gradient-neon">Rdiwan Ahmed</span>
        </motion.h1>

        <div className="h-10 overflow-hidden mb-8">
          <motion.div
            key={roleIdx}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl font-heading text-primary font-medium"
          >
            {roles[roleIdx]}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/projects"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-heading font-semibold text-sm gradient-neon text-primary-foreground transition-all duration-300 hover:shadow-neon-strong hover:scale-105"
          >
            View Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-heading font-semibold text-sm border border-primary/30 text-primary hover:bg-primary/10 hover:shadow-neon transition-all duration-300 hover:scale-105"
          >
            Let's Connect
          </Link>
        </motion.div>

        {/* Floating icons */}
        {[Code2, Terminal, Database, Braces].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/20 hidden md:block"
            style={{
              top: `${20 + i * 18}%`,
              left: i % 2 === 0 ? `${8 + i * 3}%` : undefined,
              right: i % 2 !== 0 ? `${8 + i * 3}%` : undefined,
            }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon size={28 + i * 6} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const About = () => (
  <section className="py-24 relative">
    <div className="section-container">
      <ScrollReveal>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12">
          About <span className="text-gradient-neon">Me</span>
        </h2>
      </ScrollReveal>
      <div className="flex flex-col md:flex-row items-center gap-12">
        <ScrollReveal className="flex-shrink-0">
          <div className="relative group">
            <div className="w-48 h-48 rounded-full border-2 border-primary/30 flex items-center justify-center bg-secondary group-hover:border-primary/60 transition-all duration-700">
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-spin-slow" />
              <span className="font-heading text-5xl font-bold text-gradient-neon">RA</span>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            I am Rdiwan Ahmed, a passionate MERN Stack Developer who enjoys building modern, scalable, and user-friendly web applications. I specialize in creating responsive interfaces using React and building powerful backend systems using Node.js, Express, and MongoDB. My focus is writing clean code, optimizing performance, and delivering intuitive digital experiences that combine strong functionality with beautiful UI design.
          </p>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section className="py-24 relative">
    <div className="section-container">
      <ScrollReveal>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12">
          Tech <span className="text-gradient-neon">Stack</span>
        </h2>
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

const FeaturedProjects = () => (
  <section className="py-24 relative">
    <div className="section-container">
      <ScrollReveal>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12">
          Featured <span className="text-gradient-neon">Projects</span>
        </h2>
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
                  <span key={t} className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <span className="text-xs text-primary hover:underline cursor-pointer">GitHub</span>
                <span className="text-xs text-primary hover:underline cursor-pointer">Live Demo</span>
              </div>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/projects" className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1">
          View All Projects <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  </section>
);

const ConnectCTA = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
    <div className="section-container relative z-10 text-center">
      <ScrollReveal>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold mb-6">
          Let's Build Something{" "}
          <span className="text-gradient-neon">Amazing</span> Together
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-heading font-semibold text-sm gradient-neon text-primary-foreground hover:shadow-neon-strong hover:scale-105 transition-all duration-300"
          >
            Get In Touch <ArrowRight size={16} />
          </Link>
          <a
            href="mailto:ridu116540@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-heading font-semibold text-sm border border-primary/30 text-primary hover:bg-primary/10 hover:shadow-neon transition-all duration-300"
          >
            ridu116540@gmail.com
          </a>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Index = () => (
  <>
    <Hero />
    <About />
    <Skills />
    <FeaturedProjects />
    <ConnectCTA />
  </>
);

export default Index;
