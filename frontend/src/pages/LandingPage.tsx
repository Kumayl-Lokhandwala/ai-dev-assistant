import Footer from "@/components/Footer/Footer";
import CTA from "@/components/LandingPage/CTA";
import Features from "@/components/LandingPage/Features";
import Hero from "@/components/LandingPage/Hero";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import UseCases from "@/components/LandingPage/UseCases";
import React from "react";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black">
      <Hero />
      <Features />
      <HowItWorks />
      <UseCases />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
