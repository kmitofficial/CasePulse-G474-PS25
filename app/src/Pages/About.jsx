import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
function About(){
  return(
    <div className="font-sans text-gray-100 bg-gray-950 scroll-smooth">
      <Navbar className="relative z-20" />

      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[url('/court1.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-gray-950/90"></div>
        <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1}} className="relative z-10 text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">Case Bridge</h1>
          <p className="text-xl mt-4 text-gray-300">Where Artificial Intelligence meets the Law</p>
          <motion.button whileHover={{scale:1.05,boxShadow:"0 0 20px rgba(59,130,246,0.6)"}} className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 px-10 rounded-full text-lg font-medium transition-all">Get Started</motion.button>
        </motion.div>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8,duration:1.2}} className="absolute bottom-10 w-full text-center text-gray-400 text-sm tracking-widest">Scroll Down ↓</motion.div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-gray-950 to-gray-900 text-center">
        <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">About Case Bridge</motion.h2>
        <motion.p initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}} className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300">
          Case Bridge redefines how you access legal intelligence. Our AI maps your queries to the most relevant case laws and delivers concise, context-aware summaries. We empower lawyers, students, and citizens to understand the law faster and smarter.
        </motion.p>
      </section>

      <section className="relative py-32 bg-[url('/court2.jpg')] bg-fixed bg-center bg-cover overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/90 to-black/70 backdrop-blur-[2px]"></div>
        <div className="relative z-10 grid md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
          {["Smart Search","Legal Summaries","AI Insights"].map((title,i)=>(
            <motion.div key={i} initial={{opacity:0,y:50}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:i*0.2}} className="p-8 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xl hover:bg-white/15 transition-all hover:scale-[1.03]">
              <h3 className="text-2xl font-semibold text-blue-300 mb-3">{title}</h3>
              <p className="text-gray-300">Harness the power of AI to retrieve, analyze, and summarize case laws efficiently — transforming how justice research works.</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-950 text-center">
        <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Our Vision</motion.h2>
        <motion.p initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}} className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed">
          We believe in a future where technology ensures fairness, clarity, and speed in the legal system — bridging every gap between human insight and machine precision.
        </motion.p>
      </section>

      <section className="relative h-[90vh] flex items-center justify-center bg-fixed bg-cover bg-center" style={{backgroundImage:"url('/court3.jpeg')"}}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-gray-950"></div>
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} transition={{duration:1}} className="relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl">Step Into the Future of Law</h2>
          <motion.button whileHover={{scale:1.08,boxShadow:"0 0 25px rgba(59,130,246,0.7)"}} className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-3 px-12 rounded-full text-lg font-semibold shadow-lg transition-all">
            Explore Case Bridge
          </motion.button>
        </motion.div>
      </section>

      <footer className="py-8 text-center bg-gray-950 text-gray-500 border-t border-gray-800 text-sm">
        <p>© {new Date().getFullYear()} Case Bridge — Reimagining Legal Intelligence.</p>
      </footer>
    </div>
  );
}

export default About;