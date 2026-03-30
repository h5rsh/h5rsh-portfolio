import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Star, GitFork, Users, BookOpen, ExternalLink } from "lucide-react";
import ContributionGraph from "./ContributionGraph";

const GITHUB_USERNAME = "h5rsh";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  language: string | null;
  updated_at: string;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Ruby: "#701516",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  PHP: "#4F5D95",
};

const GitHubStats = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`),
        ]);

        if (userRes.ok && reposRes.ok) {
          const userData: GitHubUser = await userRes.json();
          const reposData: GitHubRepo[] = await reposRes.json();

          setUser(userData);
          setRepos(reposData.slice(0, 6));
          setTotalStars(reposData.reduce((sum, r) => sum + r.stargazers_count, 0));
        }
      } catch (err) {
        console.error("Failed to fetch GitHub data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="github" className="py-20">
        <div className="container max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-10">GitHub</h2>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-xl border border-border bg-card animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!user) return null;

  const stats = [
    { icon: BookOpen, label: "Repositories", value: user.public_repos },
    { icon: Star, label: "Stars", value: totalStars },
    { icon: Users, label: "Followers", value: user.followers },
    { icon: GitFork, label: "Following", value: user.following },
  ];

  return (
    <section id="github" className="py-20">
      <div className="container max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-10"
        >
          <h2 className="text-2xl font-bold">GitHub</h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={16} />
            @{GITHUB_USERNAME}
            <ExternalLink size={12} />
          </a>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              className="flex flex-col items-center gap-1.5 p-4 rounded-xl border border-border bg-card"
            >
              <stat.icon size={16} className="text-muted-foreground" />
              <span className="text-xl font-heading font-bold">{stat.value}</span>
              <span className="text-xs font-mono text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Contribution graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <ContributionGraph />
        </motion.div>

        {/* Recent repos */}
        <div className="grid gap-3">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
              className="group flex items-start justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:border-foreground/20 transition-all duration-300"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-sm font-semibold group-hover:text-foreground transition-colors truncate">
                  {repo.name}
                </h3>
                {repo.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {repo.description}
                  </p>
                )}
                <div className="flex items-center gap-3 mt-2">
                  {repo.language && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: languageColors[repo.language] || "#8b8b8b" }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star size={11} />
                      {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <GitFork size={11} />
                      {repo.forks_count}
                    </span>
                  )}
                </div>
              </div>
              <ExternalLink
                size={14}
                className="text-muted-foreground/50 group-hover:text-foreground shrink-0 mt-1 transition-colors"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
