import React from "react";

type Props = {};

const CTA = (props: Props) => {
  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Supercharge Your Development?
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of developers who are already using CodeSmith to
            write better code faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/30"
            >
              Get Started Free
            </a>
            <a
              href="#demo"
              className="px-8 py-4 bg-gray-800 border border-gray-700 text-gray-200 font-medium rounded-lg hover:bg-gray-750 transition-all duration-300"
            >
              Watch Demo
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            No credit card required. Start generating code in seconds.
          </p>
        </div>
      </section>
    </>
  );
};

export default CTA;
