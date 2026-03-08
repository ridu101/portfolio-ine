import { useEffect, useState } from "react";
import { GitBranch, Star, GitFork, Code2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";

const AnimatedCounter = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{count}</span>;
};

const stats = [
  { icon: GitBranch, label: "Repositories", value: 15 },
  { icon: Star, label: "Stars Earned", value: 8 },
  { icon: GitFork, label: "Forks", value: 5 },
  { icon: Code2, label: "Contributions", value: 120 },
];

const languages = [
  { name: "JavaScript", pct: 45, color: "bg-yellow-400" },
  { name: "HTML", pct: 25, color: "bg-orange-500" },
  { name: "CSS", pct: 20, color: "bg-blue-400" },
  { name: "TypeScript", pct: 10, color: "bg-sky-500" },
];

const GitHubStats = () => (
  <div className="pt-24 pb-16">
    <div className="section-container">
      <ScrollReveal>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-center mb-4">
          GitHub <span className="text-gradient-neon">Stats</span>
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto text-sm">
          A snapshot of my developer activity and contributions on GitHub.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((s, i) => (
          <ScrollReveal key={s.label} delay={i * 0.1}>
            <GlassCard className="text-center">
              <s.icon className="mx-auto mb-3 text-primary" size={28} />
              <p className="font-heading text-3xl font-bold text-foreground">
                <AnimatedCounter target={s.value} />
              </p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <GlassCard hover={false} className="max-w-2xl mx-auto">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-6">Most Used Languages</h3>
          <div className="space-y-4">
            {languages.map((lang) => (
              <div key={lang.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{lang.name}</span>
                  <span className="text-muted-foreground">{lang.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className={`h-full rounded-full ${lang.color} transition-all duration-1000`}
                    style={{ width: `${lang.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </ScrollReveal>

      <ScrollReveal>
        <div className="mt-12 text-center">
          <img
            src="https://ghchart.rshah.org/00FF9C/rdiwan"
            alt="GitHub Contribution Graph"
            className="mx-auto rounded-lg opacity-80 max-w-full"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      </ScrollReveal>
    </div>
  </div>
);

export default GitHubStats;
