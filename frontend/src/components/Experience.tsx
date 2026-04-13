import { motion } from "framer-motion";

const experiences = [
  {
    company: "Freelance",
    role: "FullStack Developer",
    period: "Nov 2023 – Present",
    location: "Remote",
    status: "Working",
  },
  {
    company: "IBM",
    role: "Frontend Engineer",
    period: "Jun 2023 – Dec 2024",
    location: "Remote",
  },
  {
    company: "Dev Studio",
    role: "Full Stack Developer Intern",
    period: "Jan 2023 – May 2023",
    location: "New York, NY",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container max-w-2xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-10"
        >
          Experience
        </motion.h2>

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-8 border-b border-border last:border-0"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    {exp.company}
                  </h3>
                  {exp.status && (
                    <span className="flex items-center gap-1.5 text-xs font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-glow-pulse" />
                      {exp.status}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{exp.role}</p>
              </div>
              <div className="text-right sm:text-right">
                <p className="text-sm text-muted-foreground font-mono">{exp.period}</p>
                <p className="text-xs text-muted-foreground/70 mt-0.5">{exp.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
