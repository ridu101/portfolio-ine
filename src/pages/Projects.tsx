import { ExternalLink, Github } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";
import greenEarth from "@/assets/greenEarth.png";
import paddyShop from "@/assets/paddyShop.png";
import money from "@/assets/money.png";
import teaHouse from "@/assets/teaHouse.png";
import emergency from "@/assets/emergency.png";
import english from "@/assets/english.png";
import deshiAhar from "@/assets/deshiAhar.png"
import clothifyShop from "@/assets/clothifyShop.png"

const projects = [
  
  {
    title: "Deshi Ahar - A Banglai Resturent with English Vibe",
    desc: "Deshi Ahar is a restaurant management web app that helps streamline order processing, menu handling, and customer management. ",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://deshi-ahar.vercel.app/",
    github: "https://github.com/ridu101/Deshi-Ahar",
    image: deshiAhar,
  },
  {
    title: "Clothify Shop - A modern Full Stack E-Commerce Application",
    desc: "Clothify Shop is a modern full-stack e-commerce web application designed to deliver a seamless and scalable online shopping experience for fashion and clothing products. ",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://as-brand-future-fashion.vercel.app/",
    github: "https://github.com/ridu101/as-brand-future-fashion",
    image: clothifyShop,
  },
  {
    title: "Paddy Shop – Agricultural Product E-Commerce",
    desc: "A simple e-commerce style website for selling paddy and agricultural products with product listings and a user-friendly layout.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://ridu101.github.io/Paddy-Shop/",
    github: "https://github.com/ridu101/Paddy-Shop",
    image: paddyShop,
  },
  {
    title: "English Vocabulary Builder App",
    desc: "An interactive web application designed to help users learn English vocabulary with a simple and organized interface.",
    tags: ["React", "CSS", "JavaScript"],
    live: "https://ridu101.github.io/English-Vocabulary-Project/",
    github: "https://github.com/ridu101/English-Vocabulary-Project",
    image: english,
  },
  {
    title: "Emergency Hotline Directory",
    desc: "A quick-access web app listing important emergency hotline numbers such as police, ambulance, and fire services.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://ridu101.github.io/Emergency-Hotline/",
    github: "https://github.com/ridu101/Emergency-Hotline",
    image: emergency,
  },
  {
    title: "MoneyPay – Digital Payment Interface",
    desc: "A fintech-style payment interface demonstrating digital wallet UI components and transaction features.",
    tags: ["React", "Tailwind CSS"],
    live: "https://ridu101.github.io/MoneyPayApp/",
    github: "https://github.com/ridu101/MoneyPayApp",
    image: money,
  },
  {
    title: "Tea House – Restaurant Landing Page",
    desc: "A modern responsive restaurant landing page for a tea house or café with menu sections and an attractive layout.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://ridu101.github.io/tea-house-resources/",
    github: "https://github.com/ridu101/tea-house-resources",
    image: teaHouse,
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
              <div className="h-36 rounded-lg bg-secondary/50 mb-4 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
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
