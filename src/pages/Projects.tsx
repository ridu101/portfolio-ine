import { ExternalLink, Github, Code2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";

const projects = [
  {
    title: "Green Earth – Environmental Awareness Website",
    desc: "A modern environmental awareness website focused on promoting eco-friendly living and sustainability. The project features clean UI design, informative sections about environmental protection, and responsive layouts built using HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Paddy Shop – Agricultural Product E-Commerce",
    desc: "A simple e-commerce style website designed for selling paddy and agricultural products. It includes product listings, pricing sections, and a user-friendly layout optimized for farmers and buyers.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "English Vocabulary Builder App",
    desc: "An interactive vocabulary learning web app designed to help users improve their English words and meanings. The project focuses on simple UI, organized word lists, and beginner-friendly learning features.",
    tags: ["React", "CSS", "JavaScript"],
  },
  {
    title: "Emergency Hotline Directory",
    desc: "A web application that provides quick access to important emergency hotline numbers. It is designed with a simple interface to help users easily find emergency services such as police, ambulance, and fire support.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "MoneyPay – Digital Payment Interface",
    desc: "A mobile-inspired digital payment interface that simulates modern fintech apps. It demonstrates UI components for sending money, viewing balances, and managing transactions.",
    tags: ["React", "Tailwind CSS"],
  },
  {
    title: "Tea House – Restaurant Landing Page",
    desc: "A responsive restaurant landing page designed for a tea house or café business. It includes sections for menu, featured products, testimonials, and a modern visually appealing layout.",
    tags: ["HTML", "CSS", "JavaScript"],
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
                <a href="#" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                  <Github size={14} /> GitHub
                </a>
                <a href="#" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
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
