import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Star, GitFork, Code2, Users, UserPlus, Activity, Clock, ExternalLink, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";
import GlitchTitle from "@/components/GlitchTitle";

const GITHUB_USERNAME = "ridu101";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const ContributionGraph = ({ username, year }: { username: string; year: number }) => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`)
      .then(res => res.json())
      .then(data => {
        if (data.contributions) {
          const days: ContributionDay[] = data.contributions.map((d: any) => ({
            date: d.date,
            count: d.count,
            level: d.level,
          }));
          setContributions(days);
          setTotalContributions(data.total?.[year] || days.reduce((s: number, d: ContributionDay) => s + d.count, 0));
        }
      })
      .catch(() => setContributions([]))
      .finally(() => setLoading(false));
  }, [username, year]);

  const weeks = useMemo(() => {
    if (!contributions.length) return [];
    const result: ContributionDay[][] = [];
    let week: ContributionDay[] = [];
    const firstDay = new Date(contributions[0].date).getDay();
    for (let i = 0; i < firstDay; i++) {
      week.push({ date: "", count: -1, level: -1 });
    }
    contributions.forEach(day => {
      week.push(day);
      if (week.length === 7) {
        result.push(week);
        week = [];
      }
    });
    if (week.length) result.push(week);
    return result;
  }, [contributions]);

  const levelColors = [
    "bg-primary/5",
    "bg-primary/20",
    "bg-primary/40",
    "bg-primary/60",
    "bg-primary/90",
  ];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto pb-2">
        <div className="flex flex-col gap-0.5 w-full">
          {/* Month labels */}
          <div className="flex gap-[3px] ml-8 mb-1">
            {weeks.map((week, wi) => {
              if (wi === 0) return <div key={wi} className="flex-1 min-w-0" />;
              const firstValid = week.find(d => d.level >= 0);
              if (firstValid) {
                const m = new Date(firstValid.date).getMonth();
                const prevWeek = weeks[wi - 1];
                const prevValid = prevWeek?.find(d => d.level >= 0);
                const prevM = prevValid ? new Date(prevValid.date).getMonth() : -1;
                if (m !== prevM) {
                  return <span key={wi} className="flex-1 min-w-0 text-[9px] text-muted-foreground">{months[m]}</span>;
                }
              }
              return <div key={wi} className="flex-1 min-w-0" />;
            })}
          </div>
          {/* Grid rows */}
          {["Sun", "", "Tue", "", "Thu", "", "Sat"].map((dayLabel, dayIndex) => (
            <div key={dayIndex} className="flex items-center gap-[3px]">
              <span className="w-7 text-[9px] text-muted-foreground text-right pr-1 flex-shrink-0">{dayLabel}</span>
              {weeks.map((week, wi) => {
                const day = week[dayIndex];
                if (!day || day.level < 0) return <div key={wi} className="flex-1 aspect-square min-w-0 max-w-[14px]" />;
                return (
                  <div
                    key={wi}
                    className={`flex-1 aspect-square min-w-0 max-w-[14px] rounded-[2px] ${levelColors[day.level]} transition-all hover:ring-1 hover:ring-primary/50 hover:scale-150`}
                    title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
        <span><span className="text-primary font-semibold">{totalContributions.toLocaleString()}</span> contributions in {year}</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {levelColors.map((c, i) => <div key={i} className={`w-[11px] h-[11px] rounded-[2px] ${c}`} />)}
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
const REPOS_PER_PAGE = 9;

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  name: string;
  bio: string;
  created_at: string;
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
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [repoPage, setRepoPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

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
        setRepos(Array.isArray(reposData) ? reposData : []);

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

  // Pagination
  const totalPages = Math.ceil(repos.length / REPOS_PER_PAGE);
  const paginatedRepos = repos.slice((repoPage - 1) * REPOS_PER_PAGE, repoPage * REPOS_PER_PAGE);

  // Year options for contribution graph
  const availableYears = useMemo(() => {
    const joinYear = user?.created_at ? new Date(user.created_at).getFullYear() : 2023;
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let y = currentYear; y >= joinYear; y--) {
      years.push(y);
    }
    return years;
  }, [user]);

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
            GitHub <GlitchTitle>Stats</GlitchTitle>
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

        {/* Repositories with Pagination */}
        {repos.length > 0 && (
          <div className="mb-12">
            <ScrollReveal>
              <h3 className="font-heading text-2xl font-bold text-center mb-8 mt-4">
                All <GlitchTitle>Repositories</GlitchTitle>
              </h3>
            </ScrollReveal>

            <AnimatePresence mode="wait">
              <motion.div
                key={repoPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
              >
                {paginatedRepos.map((repo) => (
                  <GlassCard key={repo.name} className="h-full flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-heading text-sm font-semibold text-foreground truncate flex-1 mr-2">{repo.name}</h4>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 flex-shrink-0">
                        <ExternalLink size={14} />
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 flex-1 line-clamp-2">
                      {repo.description || "No description"}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${langColors[repo.language] || "bg-primary"}`} />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1"><Star size={10} /> {repo.stargazers_count}</span>
                      <span className="flex items-center gap-1"><GitFork size={10} /> {repo.forks_count}</span>
                    </div>
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-2 inline-flex items-center gap-1">
                        Live Demo <ExternalLink size={10} />
                      </a>
                    )}
                  </GlassCard>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setRepoPage((p) => Math.max(1, p - 1))}
                  disabled={repoPage === 1}
                  className="w-10 h-10 rounded-lg border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/10 hover:shadow-neon transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setRepoPage(page)}
                    className={`w-10 h-10 rounded-lg border text-sm font-heading font-semibold transition-all ${
                      page === repoPage
                        ? "gradient-neon text-primary-foreground border-primary shadow-neon"
                        : "border-primary/20 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:shadow-neon"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setRepoPage((p) => Math.min(totalPages, p + 1))}
                  disabled={repoPage === totalPages}
                  className="w-10 h-10 rounded-lg border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/10 hover:shadow-neon transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Contribution Graph — Year-wise */}
        <ScrollReveal>
          <GlassCard hover={false} className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
                <Calendar size={20} className="text-primary" />
                Contribution <GlitchTitle>Graph</GlitchTitle>
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                {availableYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all ${
                      year === selectedYear
                        ? "gradient-neon text-primary-foreground shadow-neon"
                        : "border border-primary/20 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:shadow-neon"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Contribution grid visualization */}
            <div className="relative overflow-hidden rounded-lg bg-secondary/30 border border-primary/10 p-4">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedYear}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <ContributionGraph username={GITHUB_USERNAME} year={selectedYear} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Year stats footer */}
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground border-t border-primary/10 pt-4">
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
                Showing contributions for <span className="text-primary font-semibold">{selectedYear}</span>
              </span>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                View on GitHub <ExternalLink size={10} />
              </a>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default GitHubStats;
