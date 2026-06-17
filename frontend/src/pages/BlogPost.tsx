import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogs } from "@/data/blogs";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <Link to="/" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pt-24">
      <Navbar />
      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 container max-w-3xl mx-auto px-6 py-12"
      >
        <Link 
          to="/blogs" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blogs
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4 text-foreground leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={14} />
            <time>{post.date}</time>
          </div>
        </header>

        <div className="max-w-none text-foreground/90 font-body">
          {post.content}
        </div>
      </motion.article>
      <Footer />
    </div>
  );
};

export default BlogPost;
