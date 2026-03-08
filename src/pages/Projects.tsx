import { ExternalLink, Github, Code2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";

const projects = [
  {
    title: "Green Earth – Environmental Awareness Website",
    desc: "A modern environmental awareness website promoting eco-friendly living and sustainability with clean UI and responsive design.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://ridu101.github.io/Green-Earth-Full-Project/",
    github: "https://github.com/ridu101/Green-Earth-Full-Project",
  },
  {
    title: "Paddy Shop – Agricultural Product E-Commerce",
    desc: "A simple e-commerce style website for selling paddy and agricultural products with product listings and a user-friendly layout.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://ridu101.github.io/Paddy-Shop/",
    github: "https://github.com/ridu101/Paddy-Shop",
  },
  {
    title: "English Vocabulary Builder App",
    desc: "An interactive web application designed to help users learn English vocabulary with a simple and organized interface.",
    tags: ["React", "CSS", "JavaScript"],
    live: "https://ridu101.github.io/English-Vocabulary-Project/",
    github: "https://github.com/ridu101/English-Vocabulary-Project",
  },
  {
    title: "Emergency Hotline Directory",
    desc: "A quick-access web app listing important emergency hotline numbers such as police, ambulance, and fire services.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://ridu101.github.io/Emergency-Hotline/",
    github: "https://github.com/ridu101/Emergency-Hotline",
  },
  {
    title: "MoneyPay – Digital Payment Interface",
    desc: "A fintech-style payment interface demonstrating digital wallet UI components and transaction features.",
    tags: ["React", "Tailwind CSS"],
    live: "https://ridu101.github.io/MoneyPayApp/",
    github: "https://github.com/ridu101/MoneyPayApp",
  },
  {
    title: "Tea House – Restaurant Landing Page",
    desc: "A modern responsive restaurant landing page for a tea house or café with menu sections and an attractive layout.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://ridu101.github.io/tea-house-resources/",
    github: "https://github.com/ridu101/tea-house-resources",
  },
];

const Projects = () => (
  <div className="pt-24 pb-16">
    <div className="section-container">
      <ScrollReveal>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-center mb-4">
          My <span className="text-gradient-neon">Projects</span>
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto text-sm">
          A collection of projects that showcase my skills and passion for web development.
        </p>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <ScrollReveal key={p.title} delay={i * 0.08}>
            <GlassCard className="h-full flex flex-col">
              <div className="h-36 rounded-lg bg-secondary/50 mb-4 flex items-center justify-center">
                <Code2 className="text-primary/30" size={48} />
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
              <div className="flex gap-4">
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                  <Github size={14} /> GitHub
                </a>
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                  <ExternalLink size={14} /> Live Demo
                </a>
              </div>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </div>
);

export default Projects;
