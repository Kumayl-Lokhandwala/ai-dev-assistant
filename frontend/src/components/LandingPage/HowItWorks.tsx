import React from "react";
import { FileText, Wand2, Download } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FileText size={40} className="text-blue-400" />,
      title: "1. Describe Your Project",
      description:
        "Start by writing a simple prompt describing the application you want to build and the technology stack you want to use.",
    },
    {
      icon: <Wand2 size={40} className="text-purple-400" />,
      title: "2. Generate the Code",
      description:
        "Our AI analyzes your request, understands the context, and generates a complete, production-ready boilerplate in seconds.",
    },
    {
      icon: <Download size={40} className="text-green-400" />,
      title: "3. Download & Develop",
      description:
        "Receive a downloadable zip of your project. Unzip it, install dependencies, and start building your features immediately.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            From Idea to Code in 3 Easy Steps
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Our process is designed to be simple, fast, and intuitive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-6 border border-zinc-700">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
