import React from "react";
import { motion } from "framer-motion";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4 py-12 overflow-hidden pt-24">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-900 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-800 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4"
          >
            AI-Powered Development
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              CodeSmith
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl md:text-2xl text-cyan-100 font-light mb-6"
          >
            Your AI-Powered Dev Assistant
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-lg text-gray-300 mb-8 leading-relaxed"
          >
            Turn prompts into production-ready boilerplate code in seconds.
            Supercharge your development workflow with AI that understands your
            stack.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/30">
              Get Started Free
            </button>
            <button className="px-8 py-3.5 bg-gray-800 border border-gray-700 text-gray-200 font-medium rounded-lg hover:bg-gray-750 transition-all duration-300">
              View Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-10 flex items-center space-x-6 text-gray-400"
          >
            <div className="flex items-center">
              <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span>Set up in minutes</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Image Content - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/30 to-purple-600/30 rounded-2xl blur-xl opacity-50"></div>
          <div className="relative bg-gray-800 rounded-xl p-2 border border-gray-700 shadow-2xl">
            <img
              src="/images/hero-img.png"
              alt="CodeSmith AI Developer Assistant Interface"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
