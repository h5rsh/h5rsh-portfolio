import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Download } from "lucide-react";
import avatarImg from "@/assets/avatar.png";

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://x.com", label: "X/Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
];

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="container max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-start gap-6"
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/10">
              <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary border-2 border-background animate-glow-pulse" />
          </motion.div>

          {/* Name & tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              John Doe
            </h1>
            <p className="mt-2 text-muted-foreground font-mono text-sm">
              Engineer · Creator · Builder
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-foreground/80 font-body leading-relaxed max-w-lg"
          >
            Love to build cool stuff. Full-stack developer passionate about creating beautiful, 
            performant web experiences. Currently exploring the edges of what's possible on the web.
          </motion.p>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className="p-2.5 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <social.icon size={18} />
              </a>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex items-center gap-3 mt-2"
          >
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-medium hover:opacity-90 transition-opacity"
            >
              View Projects
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-mono text-sm font-medium hover:bg-secondary transition-colors"
            >
              <Download size={14} />
              Resume
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
