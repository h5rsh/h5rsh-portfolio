import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Star, Users, BookOpen, ExternalLink } from "lucide-react";
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



const GitHubStats = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
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
          const reposData = await reposRes.json();

          setUser(userData);
          setTotalStars(reposData.reduce((sum: number, r: { stargazers_count: number }) => sum + r.stargazers_count, 0));
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
    { icon: Users, label: "Following", value: user.following },
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
      </div>
    </section>
  );
};

export default GitHubStats;
