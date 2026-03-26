import { motion } from "framer-motion";

const skills = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express",
  "PostgreSQL", "MongoDB", "Redis", "Prisma", "Tailwind CSS", "Framer Motion",
  "Python", "Docker", "Git", "GitHub", "Figma", "REST APIs", "GraphQL", "AWS",
];

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <div className="container max-w-2xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-10"
        >
          Skills
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2"
        >
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-3 py-1.5 rounded-lg text-sm font-mono border border-border bg-card text-foreground/80 hover:border-primary/40 hover:text-primary transition-colors cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
