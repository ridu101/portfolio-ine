import { GraduationCap } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const education = [
  {
    level: "City University",
    institution: "City University",
    subject: "Computer Science & Engineering",
    result: "Ongoing",
    year: "2021 – Present",
  },
  {
    level: "Savar Government College",
    institution: "Savar Govt College",
    subject: "Group:Science",
    result: "GPA 4.67",
    year: "2019 – 2021",
  },
  {
    level: "Suapur Nannar High School & College",
    institution: "",
    subject: "Group: Science",
    result: "GPA 4.67",
    year: "2013 – 2019",
  },
  {
    level: "Islam Nagar Government Primary School",
    institution: "",
    subject: "General Education",
    result: "GPA 4.83",
    year: "2011 – 2013",
  },
];

const Education = () => (
  <div className="pt-24 pb-16">
    <div className="section-container">
      <ScrollReveal>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-center mb-4">
          My <span className="text-gradient-neon">Education</span>
        </h1>
        <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto text-sm">
          My academic journey and qualifications are given below
        </p>
      </ScrollReveal>

      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

        {education.map((edu, i) => (
          <ScrollReveal key={i} delay={i * 0.15}>
            <div className={`relative flex mb-12 ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full gradient-neon shadow-neon z-10 mt-6" />
              <div className={`ml-12 md:ml-0 md:w-[45%] ${i % 2 !== 0 ? "md:ml-auto" : ""}`}>
                <div className="glass-card-hover p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="text-primary" size={18} />
                    <span className="text-xs text-primary font-medium">{edu.year}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{edu.level}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.subject}</p>
                  <p className="text-sm text-primary font-medium mt-2">{edu.result}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </div>
);

export default Education;
