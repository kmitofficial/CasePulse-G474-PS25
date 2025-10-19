import React, { useState, useEffect } from "react";
import Orb from "@/components/Orb";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Database, Code, FileText, ExternalLink } from "lucide-react";
import BlurText from "@/components/BlurText";
import GradientText from "@/components/GradientText";
import TextType from "@/components/TextType";
import FloatingDockDemo from "@/components/ui/FloatingDockDemo.jsx";
import ExpandableCardDemoGrid from "@/components/expandable-card-demo-grid";
import "../../globals.css";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const headlines = [
  "Smarter Legal Research, Instantly",
  "AI-Powered Clarity for Every Case",
  "From Search to Insight in Seconds",
  "Your Bridge to Legal Intelligence",
  "Justice, Accelerated by Innovation",
];

const about = "Case Bridge is an intelligent legal research and analysis tool designed to help law students, researchers, and professionals quickly access and understand U.S.federal court cases. By combining advanced retrieval techniques with AI-powered summarization, it provides concise, reliable case briefs, saving time while improving accuracy in legal research.";

const achievements = [
  {
    id: 1,
    title: "Indian Case Law Evaluation Corpus (ICLEC)",
    category: "ML Dataset",
    description: "A comprehensive dataset for machine learning tasks focused on Indian case law evaluation and analysis.",
    icon: <Database className="w-6 h-6" />,
    link: "https://www.kaggle.com/datasets/hrithikraj2537/indian-case-law-evaluation-corpus-iclec",
    platform: "Kaggle",
    details: "This dataset contains structured Indian legal case information designed for training and evaluating machine learning models in the legal domain. It includes case metadata, judgments, and annotations for various NLP tasks.",
    tags: ["Machine Learning", "Legal Tech", "Dataset"]
  },
  {
    id: 2,
    title: "ICLEC - NLP Ready Dataset",
    category: "NLP Dataset",
    description: "Preprocessed and optimized Indian case law corpus specifically designed for natural language processing tasks.",
    icon: <FileText className="w-6 h-6" />,
    link: "https://huggingface.co/datasets/HRITHIKRAJ2537H/ICLEC",
    platform: "HuggingFace",
    details: "Tokenized and formatted legal text corpus ready for transformer models and NLP experiments. Includes embeddings-ready formats and pre-split training/validation sets for legal language understanding tasks.",
    tags: ["NLP", "Transformers", "Legal AI"]
  },
  {
    id: 3,
    title: "BM25 CLERC Index Files",
    category: "Search Index",
    description: "Pre-built BM25 index using Pyserini for efficient case law retrieval and hybrid search implementation.",
    icon: <Code className="w-6 h-6" />,
    link: "https://huggingface.co/HRITHIKRAJ2537H/bm25-clerc-pyserini",
    platform: "HuggingFace",
    details: "Optimized BM25 sparse retrieval index built with Pyserini, enabling fast keyword-based search over the legal corpus. Essential component of our hybrid dense-sparse retrieval architecture.",
    tags: ["Information Retrieval", "BM25", "Search"]
  },
  {
    id: 4,
    title: "CasePulse GitHub Repository",
    category: "Open Source",
    description: "Complete source code and documentation for the CaseBridge legal research platform.",
    icon: <Code className="w-6 h-6" />,
    link: "https://github.com/kmitofficial/CasePulse-G474-PS25.git",
    platform: "GitHub",
    details: "Full-stack implementation featuring React frontend, Python backend with FastAPI, hybrid search system combining dense retrieval and BM25, and AI-powered summarization pipeline. Includes setup instructions, API documentation, and deployment guides.",
    tags: ["Full Stack", "React", "Python", "AI"]
  }
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navbar/>

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden text-center px-4"
        style={{ minHeight: "100vh" }}
      >
        <div 
          className="absolute inset-0 z-0" 
          style={{ pointerEvents: 'none' }}
        >
          <Orb 
            hoverIntensity={0.5}
            rotateOnHover={true} 
            hue={0} 
            forceHoverState={false} 
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
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
            <button onClick={() => navigate("/Chat")} 
            className="flex justify-content-between px-8 py-3 rounded-full hover:bg-black hover:text-white font-semibold text-lg bg-white cursor-pointer transition-all duration-200 hover:scale-105">
              Get Started <ArrowRight size={"25"} className="mt-0.5 ml-2" />
            </button>
            <button className="px-8 py-3 rounded-full font-semibold text-lg bg-gray-900 text-gray-500 shadow-xl cursor-pointer transition-all duration-200 hover:scale-105">
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

      {/* About Section */}
      <section className="py-16 px-4 sm:px-4 lg:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="items-center justify-center gap-6">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class sm:text-5xl font-semibold mb-6"
            >About</GradientText>
            <div className="w-100 h-0.5 bg-white"></div>
          </div>
          <TextType 
            text={about} 
            typingSpeed={50} 
            pauseDuration={1000} 
            cursorCharacter="_" 
            cursorClassName="text-white" 
            className="text-center leading-relaxed max-w-3xl text-xl" 
          />
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 px-4 sm:px-4 lg:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class sm:text-5xl font-semibold mb-6"
            >Our Achievements</GradientText>
            <p className="text-lg text-muted-foreground">
              Explore our contributions to the legal AI research community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id}
                className={`rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm cursor-pointer transition-all duration-300 ${
                  expandedCard === achievement.id 
                    ? 'md:col-span-2 scale-100' 
                    : 'hover:scale-105 hover:border-gray-700'
                }`}
                onClick={() => setExpandedCard(expandedCard === achievement.id ? null : achievement.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20 text-green-400">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-blue-400 font-medium">
                            {achievement.category} • {achievement.platform}
                          </p>
                        </div>
                        <a
                          href={achievement.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                      
                      <p className="text-gray-300 mb-3">
                        {achievement.description}
                      </p>

                      {expandedCard === achievement.id && (
                        <div className="mt-4 space-y-4 animate-in fade-in duration-300">
                          <p className="text-gray-400 leading-relaxed">
                            {achievement.details}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {achievement.tags.map((tag, idx) => (
                              <span 
                                key={idx}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-gray-800 text-gray-300 border border-gray-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <a
                            href={achievement.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium hover:from-green-600 hover:to-blue-600 transition-all"
                          >
                            Visit {achievement.platform}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}

                      {!expandedCard && (
                        <div className="mt-3 text-sm text-gray-500">
                          Click to expand
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-4 lg:px-6 relative z-10">
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
              <Card key={i} className="rounded-sm border-0 custom-gray hover:scale-105 transition-transform duration-200">
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
      <footer className="py-6 px-4 sm:px-6 lg:px-8 bg-black text-center text-muted-foreground relative z-10">
        <p>&copy; {new Date().getFullYear()} Case Bridge. All rights reserved.</p>
      </footer>
    </div>
  );
}