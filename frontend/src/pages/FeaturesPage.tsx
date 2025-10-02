import React from "react";
import { Link } from "react-router-dom";

const FeaturesPage = () => {
  const features = [
    {
      title: "AI-Powered Code Generation",
      description:
        "Generate complete project structures with intelligent AI that understands your requirements and follows best practices.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      details: [
        "Natural language project descriptions",
        "Multiple framework support",
        "Industry-standard project structure",
        "Best practices and patterns included",
      ],
    },
    {
      title: "Multi-Framework Support",
      description:
        "Generate boilerplate for React, Vue, Angular, Node.js, and all popular frameworks with proper configuration.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      ),
      details: [
        "React with TypeScript/JavaScript",
        "Vue 2 & 3 with composition API",
        "Angular with RxJS integration",
        "Node.js with Express/Fastify",
        "Database integrations included",
      ],
    },
    {
      title: "Smart Project Management",
      description:
        "Organize, save, and manage all your generated projects with version tracking and collaboration features.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      details: [
        "Project history and versions",
        "Team collaboration spaces",
        "Template library",
        "Export to GitHub/GitLab",
        "Project analytics",
      ],
    },
    {
      title: "Customizable Templates",
      description:
        "Create and save your own project templates or customize existing ones for consistent development workflow.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      ),
      details: [
        "Personal template library",
        "Team template sharing",
        "Custom configuration presets",
        "Template marketplace",
        "Import/export templates",
      ],
    },
    {
      title: "Real-time Collaboration",
      description:
        "Work together with your team on projects, share templates, and maintain consistency across your organization.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      details: [
        "Real-time project editing",
        "Team member permissions",
        "Comment and review system",
        "Change tracking",
        "Integration with Slack/Discord",
      ],
    },
    {
      title: "Advanced Export Options",
      description:
        "Export your generated projects in multiple formats with one-click deployment to popular platforms.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      ),
      details: [
        "ZIP download with full structure",
        "Direct GitHub repository creation",
        "Vercel/Netlify deployment",
        "Docker container generation",
        "Custom export configurations",
      ],
    },
  ];

  const frameworks = [
    {
      name: "React",
      icon: "⚛️",
      description: "With TypeScript, JavaScript, or JSX",
    },
    { name: "Vue", icon: "🟢", description: "Vue 2 & 3 with Composition API" },
    { name: "Angular", icon: "🅰️", description: "Complete Angular ecosystem" },
    { name: "Node.js", icon: "⬢", description: "Express, Fastify, and more" },
    { name: "Next.js", icon: "▲", description: "Full-stack React framework" },
    { name: "Nuxt.js", icon: "💚", description: "Vue.js meta-framework" },
    { name: "Svelte", icon: "✨", description: "Svelte and SvelteKit" },
    { name: "Python", icon: "🐍", description: "Django, Flask, FastAPI" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white pt-20">
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Powerful Features for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              Developers
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Everything you need to kickstart your projects and boost
            productivity. Our AI-powered platform handles the boilerplate so you
            can focus on building amazing applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Start Building Free
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-3 bg-gray-800 rounded-lg font-medium hover:bg-gray-700 transition-all duration-200 border border-gray-700"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/30 transition-all duration-300 group hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div className="text-cyan-400 mb-4 group-hover:text-purple-400 transition-colors duration-200">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-sm text-gray-300"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Frameworks Section */}
      <div className="container mx-auto px-4 py-16 bg-gray-800/20 rounded-3xl mx-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Supported Frameworks & Technologies
          </h2>
          <p className="text-xl text-gray-300">
            Generate boilerplate for all major frameworks and technologies with
            proper configuration and best practices.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {frameworks.map((framework, index) => (
            <div
              key={index}
              className="bg-gray-800/30 rounded-lg p-4 text-center border border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group"
            >
              <div className="text-2xl mb-2">{framework.icon}</div>
              <h3 className="font-semibold mb-1">{framework.name}</h3>
              <p className="text-sm text-gray-400">{framework.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Boost Your Productivity?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of developers who are building faster with AI-powered
          code generation.
        </p>
        <Link
          to="/register"
          className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-medium text-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
        >
          Get Started Free
        </Link>
      </div>
    </div>
  );
};

export default FeaturesPage;
