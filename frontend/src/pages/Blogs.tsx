import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogs } from "@/data/blogs";

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogs.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pt-24">
      <Navbar />
      <main className="flex-1 container max-w-3xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group font-mono"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-foreground tracking-tight">
            Blogs
          </h1>
          <p className="text-muted-foreground font-body text-base max-w-lg">
            Thoughts, tutorials, and learnings on software development, AI/ML, and tech.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative mb-10"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm shadow-sm"
          />
        </motion.div>

        {/* Blog List */}
        {filteredBlogs.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {filteredBlogs.map((post) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-border hover:border-primary/30 bg-card hover:bg-card/85 transition-all duration-300 shadow-sm"
                >
                  <div className="flex-1">
                    <h2 className="font-heading text-base font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground/70 font-mono">
                      <Calendar size={12} />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end shrink-0">
                    <div className="p-2 rounded-full border border-border group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-primary transition-all duration-300">
                      <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-muted-foreground font-body text-sm"
          >
            No posts match your search query. Try another search!
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;
