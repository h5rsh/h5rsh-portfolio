import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import LocalRootImg from "@/assets/LocalRoot.jpg";
import DocScanner from "@/assets/image.png";

const projects = [
  {
    title: "LocalRoot",
    description:
      "A trust based localized E-Commerce platform for small shopkeepers.",
    image: LocalRootImg,
    tags: ["React", "TypeScript", "Node.js","Django", "MongoDB"],
    live: "https://www.localroot.shop",
    github: "#",
  },
  {
    title: "",
    description:
      "A Python notebook-based document scanning and processing tool. Provides features like image capture, edge detection, perspective correction, and export to PDF/image.",
    image: DocScanner,
    tags: ["Python", "OpenCV", "NumPy", "Jupyter Notebook"],
    live: "https://github.com/h5rsh/DocScanner",
    github: "https://github.com/h5rsh/DocScanner",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container max-w-2xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-10"
        >
          Projects
        </motion.h2>

        <div className="grid gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  {project.live && (
                    <a
                      href={project.live}
                      className="p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border text-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      className="p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border text-foreground hover:text-primary transition-colors"
                    >
                      <Github size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-mono rounded-md bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
