import React, { useState } from "react";

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for individual developers",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        "5 projects per month",
        "Basic templates",
        "Standard AI generation",
        "Community support",
        "50MB storage",
      ],
      limitations: ["No priority generation", "Limited frameworks"],
      popular: false,
      gradient: "from-gray-600 to-gray-700",
      buttonStyle: "bg-gray-700 hover:bg-gray-600 border-2 border-transparent",
      selectedStyle: "border-blue-500 shadow-lg shadow-blue-500/20",
    },
    {
      id: "pro",
      name: "Pro",
      description: "For professional developers",
      monthlyPrice: 19,
      annualPrice: 15,
      features: [
        "Unlimited projects",
        "Advanced AI models",
        "All frameworks",
        "Priority generation",
        "Private projects",
        "GitHub integration",
        "5GB storage",
        "Email support",
      ],
      limitations: [],
      popular: true,
      gradient: "from-blue-500 to-purple-600",
      buttonStyle:
        "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-2 border-transparent",
      selectedStyle: "border-blue-400 shadow-2xl shadow-blue-500/30",
    },
    {
      id: "team",
      name: "Team",
      description: "For teams and organizations",
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Advanced analytics",
        "Custom AI training",
        "SSO & SAML",
        "Priority support",
        "Unlimited storage",
        "API access",
      ],
      limitations: [],
      popular: false,
      gradient: "from-green-500 to-blue-600",
      buttonStyle:
        "bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 border-2 border-transparent",
      selectedStyle: "border-green-400 shadow-2xl shadow-green-500/30",
    },
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "All paid plans come with a 14-day free trial. No credit card required to start.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and for annual plans we also support bank transfers.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes, you can cancel anytime. If you cancel, you'll keep access to paid features until the end of your billing period.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
      {/* Header */}
      <div className="pt-28 pb-12 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Pricing
            </span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your development needs. All plans
            include core features.
          </p>

          {/* Billing Toggle - Enhanced */}
          <div className="inline-flex items-center bg-gray-800 rounded-lg p-1 mb-8 border border-gray-700">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-3 text-sm rounded-md font-medium transition-all duration-200 transform ${
                billingPeriod === "monthly"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-6 py-3 text-sm rounded-md font-medium transition-all duration-200 transform relative ${
                billingPeriod === "annual"
                  ? "bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg shadow-green-500/25 scale-105"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              Annual
              <span
                className={`absolute -top-2 -right-2 text-xs text-white px-2 py-1 rounded-full transition-all duration-200 ${
                  billingPeriod === "annual"
                    ? "bg-green-500 shadow-lg shadow-green-500/50"
                    : "bg-gray-600"
                }`}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards - Enhanced Selection States */}
      <div className="py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative rounded-xl border-2 cursor-pointer transition-all duration-300 transform ${
                  selectedPlan === plan.id
                    ? `${plan.selectedStyle} scale-105 z-10`
                    : "border-gray-700 bg-gray-800/30"
                } ${
                  hoveredPlan === plan.id && selectedPlan !== plan.id
                    ? "border-gray-500 scale-102 shadow-lg"
                    : ""
                } p-6 flex flex-col h-full backdrop-blur-sm`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg shadow-blue-500/30">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Selection Indicator */}
                <div
                  className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0"
                  }`}
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {plan.description}
                  </p>

                  <div className="mb-2">
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                      $
                      {billingPeriod === "monthly"
                        ? plan.monthlyPrice
                        : plan.annualPrice}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {plan.monthlyPrice === 0
                        ? ""
                        : `/${billingPeriod === "monthly" ? "mo" : "mo"}`}
                    </span>
                  </div>

                  {plan.monthlyPrice > 0 && billingPeriod === "annual" && (
                    <p className="text-green-400 text-xs font-medium">
                      Billed annually (${plan.annualPrice * 12} total)
                    </p>
                  )}
                </div>

                <div className="flex-grow mb-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start group">
                        <svg
                          className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
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
                        <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-200">
                          {feature}
                        </span>
                      </div>
                    ))}

                    {plan.limitations.map((limitation, index) => (
                      <div
                        key={index}
                        className="flex items-start opacity-50 group"
                      >
                        <svg
                          className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span className="text-gray-400 text-sm">
                          {limitation}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className={`w-full py-3 text-sm rounded-lg font-medium text-white transition-all duration-200 transform ${
                    selectedPlan === plan.id
                      ? "shadow-lg hover:shadow-xl hover:scale-105"
                      : "hover:scale-102"
                  } ${plan.buttonStyle}`}
                >
                  {plan.monthlyPrice === 0
                    ? "Get Started Free"
                    : "Start Free Trial"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Plan Summary */}
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-2">
              Selected:{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                {plans.find((p) => p.id === selectedPlan)?.name} Plan
              </span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              $
              {billingPeriod === "monthly"
                ? plans.find((p) => p.id === selectedPlan)?.monthlyPrice
                : plans.find((p) => p.id === selectedPlan)?.annualPrice}{" "}
              per month
              {billingPeriod === "annual" && " (billed annually)"}
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/30">
              Continue with {plans.find((p) => p.id === selectedPlan)?.name}{" "}
              Plan
            </button>
          </div>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="py-16 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">Compare Plans</h2>
          <p className="text-lg text-gray-400 text-center mb-8 max-w-xl mx-auto">
            Detailed feature comparison to help you choose
          </p>

          <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden backdrop-blur-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="p-4 font-semibold text-center">Starter</th>
                  <th className="p-4 font-semibold text-center">Pro</th>
                  <th className="p-4 font-semibold text-center">Team</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Projects per month",
                    starter: "5",
                    pro: "Unlimited",
                    team: "Unlimited",
                  },
                  {
                    feature: "AI Generation Speed",
                    starter: "Standard",
                    pro: "Priority",
                    team: "Highest",
                  },
                  {
                    feature: "Framework Support",
                    starter: "Basic",
                    pro: "All",
                    team: "All + Custom",
                  },
                  {
                    feature: "Storage",
                    starter: "50MB",
                    pro: "5GB",
                    team: "Unlimited",
                  },
                  {
                    feature: "Private Projects",
                    starter: "❌",
                    pro: "✅",
                    team: "✅",
                  },
                  {
                    feature: "GitHub Integration",
                    starter: "❌",
                    pro: "✅",
                    team: "✅",
                  },
                  {
                    feature: "Team Collaboration",
                    starter: "❌",
                    pro: "❌",
                    team: "✅",
                  },
                  {
                    feature: "API Access",
                    starter: "❌",
                    pro: "❌",
                    team: "✅",
                  },
                ].map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors duration-200"
                  >
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td
                      className={`p-4 text-center transition-all duration-200 ${
                        selectedPlan === "starter"
                          ? "text-blue-400 font-semibold"
                          : "text-gray-300"
                      }`}
                    >
                      {row.starter}
                    </td>
                    <td
                      className={`p-4 text-center transition-all duration-200 ${
                        selectedPlan === "pro"
                          ? "text-blue-400 font-semibold"
                          : "text-gray-300"
                      }`}
                    >
                      {row.pro}
                    </td>
                    <td
                      className={`p-4 text-center transition-all duration-200 ${
                        selectedPlan === "team"
                          ? "text-blue-400 font-semibold"
                          : "text-gray-300"
                      }`}
                    >
                      {row.team}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800/30 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg backdrop-blur-sm group cursor-pointer"
              >
                <h3 className="font-semibold mb-3 group-hover:text-blue-400 transition-colors duration-200">
                  {faq.question}
                </h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-200">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Boost Your Development?
          </h2>
          <p className="text-lg text-gray-300 mb-6 max-w-xl mx-auto">
            Join developers building faster with AI-powered code generation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/30">
              Start Free Trial
            </button>
            <button className="px-8 py-3 bg-gray-800 rounded-lg font-medium hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 border border-gray-700">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
