import { useEffect, useState } from "react";
import { GitBranch, Star, GitFork, Code2, Users, UserPlus, Activity, Clock, ExternalLink } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";

const GITHUB_USERNAME = "ridu101";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  name: string;
  bio: string;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

interface GitHubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
}

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

const GitHubStats = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [totalStars, setTotalStars] = useState(0);
  const [totalForks, setTotalForks] = useState(0);
  const [languages, setLanguages] = useState<{ name: string; pct: number }[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`),
        ]);

        const userData: GitHubUser = await userRes.json();
        const reposData: GitHubRepo[] = await reposRes.json();
        const eventsData: GitHubEvent[] = await eventsRes.json();

        setUser(userData);
        setEvents(Array.isArray(eventsData) ? eventsData.slice(0, 5) : []);

        let stars = 0, forks = 0;
        const langCount: Record<string, number> = {};

        reposData.forEach((repo) => {
          stars += repo.stargazers_count;
          forks += repo.forks_count;
          if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] || 0) + 1;
          }
        });

        setTotalStars(stars);
        setTotalForks(forks);

        if (reposData.length > 0) {
          setLastUpdated(new Date(reposData[0].updated_at).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
          }));
        }

        const totalLangs = Object.values(langCount).reduce((a, b) => a + b, 0);
        const sorted = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({ name, pct: Math.round((count / totalLangs) * 100) }));
        setLanguages(sorted);
      } catch (err) {
        console.error("Failed to fetch GitHub data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const langColors: Record<string, string> = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-sky-500",
    HTML: "bg-orange-500",
    CSS: "bg-blue-400",
    Python: "bg-green-500",
    Java: "bg-red-500",
  };

  const stats = [
    { icon: GitBranch, label: "Repositories", value: user?.public_repos ?? 0 },
    { icon: Star, label: "Stars Earned", value: totalStars },
    { icon: GitFork, label: "Forks", value: totalForks },
    { icon: Users, label: "Followers", value: user?.followers ?? 0 },
    { icon: UserPlus, label: "Following", value: user?.following ?? 0 },
  ];

  const eventLabel = (type: string) => {
    const map: Record<string, string> = {
      PushEvent: "Pushed to",
      CreateEvent: "Created",
      WatchEvent: "Starred",
      ForkEvent: "Forked",
      PullRequestEvent: "PR on",
      IssuesEvent: "Issue on",
      DeleteEvent: "Deleted in",
    };
    return map[type] || type.replace("Event", "");
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Loading GitHub data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        <ScrollReveal>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-center mb-4">
            GitHub <span className="text-gradient-neon">Stats</span>
          </h1>
          <p className="text-center text-muted-foreground mb-2 max-w-xl mx-auto text-sm">
            Live developer activity fetched from GitHub for{" "}
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              @{GITHUB_USERNAME}
            </a>
          </p>
          {lastUpdated && (
            <p className="text-center text-muted-foreground/60 mb-12 text-xs flex items-center justify-center gap-1">
              <Clock size={12} /> Last updated: {lastUpdated}
            </p>
          )}
        </ScrollReveal>

        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
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

        {/* GitHub Readme Stats widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <ScrollReveal>
            <GlassCard hover={false} className="flex items-center justify-center min-h-[200px]">
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=radical&bg_color=0B0F0C&title_color=00FF9C&text_color=adbac7&icon_color=00FF9C&border_color=1a2e23&hide_border=false`}
                alt="GitHub Stats"
                className="max-w-full"
                loading="lazy"
              />
            </GlassCard>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <GlassCard hover={false} className="flex items-center justify-center min-h-[200px]">
              <img
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=radical&background=0B0F0C&ring=00FF9C&fire=00FF9C&currStreakLabel=00FF9C&border=1a2e23`}
                alt="GitHub Streak"
                className="max-w-full"
                loading="lazy"
              />
            </GlassCard>
          </ScrollReveal>
        </div>

        {/* Languages */}
        <ScrollReveal>
          <GlassCard hover={false} className="max-w-2xl mx-auto mb-12">
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
                      className={`h-full rounded-full ${langColors[lang.name] || "bg-primary"} transition-all duration-1000`}
                      style={{ width: `${lang.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Recent Activity */}
        {events.length > 0 && (
          <ScrollReveal>
            <GlassCard hover={false} className="max-w-2xl mx-auto mb-12">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Activity size={20} className="text-primary" /> Recent Activity
              </h3>
              <div className="space-y-3">
                {events.map((event, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div>
                      <span className="text-muted-foreground">{eventLabel(event.type)}</span>{" "}
                      <span className="text-foreground font-medium">{event.repo.name}</span>
                      <p className="text-xs text-muted-foreground/60 mt-0.5">
                        {new Date(event.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>
        )}

        {/* Contribution Graph */}
        <ScrollReveal>
          <div className="text-center">
            <img
              src={`https://ghchart.rshah.org/00FF9C/${GITHUB_USERNAME}`}
              alt="GitHub Contribution Graph"
              className="mx-auto rounded-lg opacity-80 max-w-full"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default GitHubStats;
