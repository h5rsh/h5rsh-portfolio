import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const posts = [
  {
    title: "Building Performant React Applications",
    description: "Tips and patterns for keeping your React apps fast and responsive at scale.",
    date: "March 15, 2026",
  },
  {
    title: "The Art of Clean Code Architecture",
    description: "How to structure your codebase for maintainability and developer happiness.",
    date: "February 8, 2026",
  },
  {
    title: "Modern CSS Techniques You Should Know",
    description: "From container queries to cascade layers — the future of CSS is here.",
    date: "January 20, 2026",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-20">
      <div className="container max-w-2xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-10"
        >
          Blog
        </motion.h2>

        <div className="space-y-4">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-border hover:border-primary/30 bg-card hover:bg-card/80 transition-all duration-300"
            >
              <div className="flex-1">
                <h3 className="font-heading text-sm font-semibold group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {post.description}
                </p>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground/70">
                  <Calendar size={12} />
                  {post.date}
                </div>
              </div>
              <ArrowRight
                size={16}
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
