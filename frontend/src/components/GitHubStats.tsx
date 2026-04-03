import { motion } from "framer-motion";
import ContributionGraph from "./ContributionGraph";

const GitHubStats = () => {
  return (
    <section id="github" className="py-20">
      <div className="container max-w-3xl mx-auto px-6">
        {/* Contribution graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <ContributionGraph />
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
