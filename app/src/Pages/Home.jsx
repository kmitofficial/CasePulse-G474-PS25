import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Orb from "@/components/Orb";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import BlurText from "@/components/BlurText";
import GradientText from "@/components/GradientText";
import TextType from "@/components/TextType";


const headlines = [
  "Smarter Legal Research, Instantly",
  "AI-Powered Clarity for Every Case",
  "From Search to Insight in Seconds",
  "Your Bridge to Legal Intelligence",
  "Justice, Accelerated by Innovation",
];

const about = "Case Bridge is an intelligent legal research and analysis tool designed to help law students, researchers, and professionals quickly access and understand U.S.federal court cases.By combining advanced retrieval techniques with AI - powered summarization, it provides concise, reliable case briefs, saving time while improving accuracy in legal research."

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navbar />
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden text-center px-4"
        style={{ minHeight: "100vh" }}
      >
        <div className="absolute inset-0 z-5" >
          <Orb hoverIntensity={0.5} rotateOnHover={true} hue={0} forceHoverState={false} />
        </div>
        <div className="relative z-5 flex flex-col items-center justify-center w-full h-full px-4">
          <BlurText
            key={index}
            text={headlines[index]}
            delay={150}
            animateBy="words"
            direction="top"
            className="sm:text-7xl font-semibold mb-6 p-4 text-white"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 p-2">
            CaseBridge uses Dense Retrieval + BM25 Hybrid Search for state-of-the-art case law retrieval
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="flex justify-content-between px-8 py-3 rounded-full hover:bg-black hover:text-white font-semibold text-lg bg-white cursor-pointer">
              Get Started <ArrowRight size={"25"} className="mt-0.5 ml-2" />
            </button>
            <button className="px-8 py-3 rounded-full font-semibold text-lg bg-gray-900 text-gray-500 shadow-xl cursor-pointer">
              Learn More
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-md text-muted-foreground">
            {["Instant Analysis", "Professional Reports"].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" color="green" />
                <span className="text-green-700">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-4 lg:px-6 ">
        <div className="flex flex-col items-center justify-center gap-8">
          <div class="items-center justify-center gap-6">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class sm:text-5xl font-semibold mb-6"
            >About</GradientText>
            <div class="w-100 h-0.5 bg-white"></div>
          </div>
          <TextType text={about} typingSpeed={50} pauseDuration={1000} cursorCharacter="_" cursorClassName="text-white" className="text-center leading-relaxed max-w-3xl text-xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-4 lg:px-6 ">
        <div className="max-w-6xl mx-auto text-center">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class sm:text-5xl font-semibold mb-6"
          >Features</GradientText>
          <p className="text-lg text-muted-foreground mb-12">
            Experience the future of legal research with our advanced AI
            technology.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Analysis",
                desc: "Leverage advanced AI models to retrieve and interpret legal cases with precision.",
              },
              {
                title: "Instant Results",
                desc: "Access relevant case law in seconds, cutting down hours of manual research.",
              },
              {
                title: "Detailed Reports",
                desc: "Generate structured, professional-grade insights for legal decision-making.",
              },
            ].map(({ title, desc }, i) => (
              <Card key={i} className="rounded-sm border-0 custom-gray">
                <CardContent className="p-6">
                  <h3 className="text-2xl text-white font-semibold mb-2">{title}</h3>
                  <p className="text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 sm:px-6 lg:px-8 bg-black text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Case Bridge. All rights reserved.</p>
      </footer>
    </div>
  );
}
