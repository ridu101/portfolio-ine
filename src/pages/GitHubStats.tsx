import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Star, GitFork, Code2, Users, UserPlus, Activity, Clock, ExternalLink, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import GlassCard from "@/components/GlassCard";

const GITHUB_USERNAME = "ridu101";
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
                All <span className="text-gradient-neon">Repositories</span>
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
                Activity <span className="text-gradient-neon">Timeline</span>
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

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedYear}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Year summary stats */}
                {(() => {
                  const yearRepos = repos.filter(
                    (r) => new Date(r.updated_at).getFullYear() === selectedYear
                  );
                  const yearLangs: Record<string, number> = {};
                  let yearStars = 0;
                  let yearForks = 0;
                  yearRepos.forEach((r) => {
                    yearStars += r.stargazers_count;
                    yearForks += r.forks_count;
                    if (r.language) yearLangs[r.language] = (yearLangs[r.language] || 0) + 1;
                  });
                  const topLangs = Object.entries(yearLangs)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5);
                  const totalLangCount = topLangs.reduce((s, [, c]) => s + c, 0);

                  return (
                    <div className="space-y-6">
                      {/* Mini stat row */}
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { label: "Repos Active", value: yearRepos.length, icon: GitBranch },
                          { label: "Stars", value: yearStars, icon: Star },
                          { label: "Forks", value: yearForks, icon: GitFork },
                        ].map((s) => (
                          <div key={s.label} className="rounded-lg bg-secondary/40 border border-primary/10 p-4 text-center">
                            <s.icon size={16} className="mx-auto mb-2 text-primary" />
                            <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
                            <p className="text-[10px] text-muted-foreground mt-1">{s.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Languages breakdown for that year */}
                      {topLangs.length > 0 ? (
                        <div>
                          <p className="text-xs text-muted-foreground mb-3">Languages used in {selectedYear}</p>
                          <div className="space-y-2">
                            {topLangs.map(([name, count]) => {
                              const pct = Math.round((count / totalLangCount) * 100);
                              return (
                                <div key={name}>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-foreground flex items-center gap-1.5">
                                      <span className={`w-2 h-2 rounded-full ${langColors[name] || "bg-primary"}`} />
                                      {name}
                                    </span>
                                    <span className="text-muted-foreground">{pct}%</span>
                                  </div>
                                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${pct}%` }}
                                      transition={{ duration: 0.8, delay: 0.2 }}
                                      className={`h-full rounded-full ${langColors[name] || "bg-primary"}`}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">No repository activity found for {selectedYear}</p>
                      )}

                      {/* Recent repos for that year */}
                      {yearRepos.length > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-3">Recently active repositories</p>
                          <div className="space-y-2">
                            {yearRepos.slice(0, 5).map((r) => (
                              <a
                                key={r.name}
                                href={r.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-primary/5 hover:border-primary/20 hover:bg-secondary/50 transition-all group"
                              >
                                <div className="flex items-center gap-3">
                                  <Code2 size={14} className="text-primary" />
                                  <span className="text-sm text-foreground font-medium">{r.name}</span>
                                  {r.language && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                      {r.language}
                                    </span>
                                  )}
                                </div>
                                <ExternalLink size={12} className="text-muted-foreground group-hover:text-primary transition-colors" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground border-t border-primary/10 pt-4">
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
                Showing activity for <span className="text-primary font-semibold">{selectedYear}</span>
              </span>
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
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
