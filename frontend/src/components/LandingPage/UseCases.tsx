import React from "react";
import { motion } from "framer-motion";
import { Rocket, Building2, Briefcase, GraduationCap } from "lucide-react";

const useCases = [
  {
    title: "Startups & MVPs",
    description:
      "Quickly prototype and validate ideas with production-ready code.",
    icon: <Rocket className="h-8 w-8 text-cyan-400" />,
  },
  {
    title: "Enterprise Teams",
    description: "Maintain consistency across multiple projects and teams.",
    icon: <Building2 className="h-8 w-8 text-indigo-400" />,
  },
  {
    title: "Freelancers",
    description:
      "Deliver projects faster with standardized, high-quality setups.",
    icon: <Briefcase className="h-8 w-8 text-green-400" />,
  },
  {
    title: "Learning & Education",
    description: "Perfect for students and developers learning new frameworks.",
    icon: <GraduationCap className="h-8 w-8 text-amber-400" />,
  },
];

const UseCases = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // This creates the staggered effect
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-black antialiased">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Perfect For
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Whether you're building an MVP or a large-scale application,
            CodeSmith adapts to your workflow.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              className="bg-zinc-900 rounded-xl p-6 text-center border border-zinc-800 transition-all group hover:-translate-y-2 hover:border-blue-500/50"
              variants={itemVariants}
            >
              <div className="mb-6 inline-block p-4 bg-zinc-800 rounded-full border border-zinc-700 group-hover:bg-blue-900/20 group-hover:border-blue-500/30 transition-colors">
                {useCase.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {useCase.title}
              </h3>
              <p className="text-gray-400">{useCase.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
