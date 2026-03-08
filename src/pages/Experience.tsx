import ScrollReveal from "@/components/ScrollReveal";
import GlitchTitle from "@/components/GlitchTitle";

const experiences = [
  {
    role: "MERN Stack Developer",
    org: "Freelance / Self-Employed",
    duration: "2024 – Present",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
  },
  {
    role: "Front-End Developer",
    org: "Personal Projects",
    duration: "2023 – 2024",
    tech: ["HTML", "CSS", "JavaScript", "React", "Git"],
  },
  {
    role: "Web Development Intern",
    org: "Online Training Program",
    duration: "2023",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
  },
];

const Experience = () => (
  <div className="pt-24 pb-16">
    <div className="section-container">
      <ScrollReveal>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-center mb-4">
          My <GlitchTitle>Experience</GlitchTitle>
        </h1>
        <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto text-sm">
          A timeline of my professional journey in web development.
        </p>
      </ScrollReveal>

      <div className="relative max-w-2xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

        {experiences.map((exp, i) => (
          <ScrollReveal key={i} delay={i * 0.15}>
            <div className={`relative flex mb-12 ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
              {/* Node */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full gradient-neon shadow-neon z-10 mt-6" />

              <div className={`ml-12 md:ml-0 md:w-[45%] ${i % 2 !== 0 ? "md:ml-auto" : ""}`}>
                <div className="glass-card-hover p-6">
                  <span className="text-xs text-primary font-medium">{exp.duration}</span>
                  <h3 className="font-heading text-lg font-semibold text-foreground mt-1">{exp.role}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{exp.org}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.tech.map((t) => (
                      <span key={t} className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </div>
);

export default Experience;
