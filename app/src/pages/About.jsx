import React from "react"
import Beams from "../components/ui/Beams"
import Navbar from "@/components/Navbar"
import GradientText from "@/components/GradientText"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin } from "lucide-react"
import DarkVeil from "@/components/DarkVeil"

const team = [
  {
    name: "B CHARAN REDDY",
    src:"../contribtrs/a5.png",
    role: "Founder & Lead Engineer",
    bio: "Drives product vision and architecture, ensuring performance, accessibility, and reliability.",
    links: { github: "#", linkedin: "#" },
  },
  {
    name: "Nampally Mahesh",
    src:"../contribtrs/b9.png",
    role: "ML Engineer",
    bio: "Builds retrieval and summarization pipelines, focusing on evaluation and model quality.",
    links: { github: "#", linkedin: "#" },
  },
  {
    name: "Nikhilesh Nilagiri ",
    src:"../contribtrs/ba.png",
    role: "Frontend Engineer",
    bio: "Owns the UI system and design consistency across the app for a cohesive experience.",
    links: { github: "#", linkedin: "#" },
  },
  {
    name: "P Hrithik Raj",
    src:"../contribtrs/bb.png",
    role: "Data Engineer",
    bio: "Handles data pipelines and ensures reliable ingestion and processing of case law datasets.",
    links: { github: "#", linkedin: "#" },
  },
  {
    name: "Tankasala Akshaya",
    src:"../contribtrs/bk.png",
    role: "Research Analyst",
    bio: "Analyzes legal data and helps improve model accuracy and retrieval strategies.",
    links: { github: "#", linkedin: "#" },
  },
]

const contributors = ["Contributor A", "Contributor B", "Contributor C", "Contributor D"]

export default function About() {
  return (
    <div className="relative min-h-screen bg-black text-white">

      {/* Navbar */}
      <Navbar className="relative z-20" />

      {/* Background Beams */}
      {/* <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="from-cyan-600 to-cyan-400"
          speed={5}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={1}
        />
      </div> */}
      <div className="fixed inset-0 z-0">
              <DarkVeil
                hueShift={40}
                noiseIntensity={0.05}
                scanlineIntensity={0.2}
                scanlineFrequency={5}
                warpAmount={0.1}
                speed={0.5}
                resolutionScale={1}
              />
              
            </div>

      {/* Main Content */}
      <main className="relative z-10 px-4 pt-24 sm:pt-32 pb-12">
        <section className="max-w-7xl mx-auto rounded-lg border border-gray-800 bg-transparent backdrop-blur-sm p-6 md:p-10">
          <div className="mb-8 text-center">
            <GradientText
              colors={["white", "#4079ff", "#40ffaa", "#4079ff", "cyan"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class sm:text-6xl font-bold"
            >
              About Us
            </GradientText>
            <p className="mt-4 text-xl md:text-2xl text-white">
              We’re a small, focused team dedicated to building clear, fast, and trustworthy tools. Our work is
              collaborative and pragmatic—every improvement is driven by real user needs and measurable outcomes.
            </p>
          </div>

          <div className="h-px w-full bg-gray-800 my-8" />

          {/* Team Section */}
          <section aria-labelledby="core-team" className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <Card
                  key={i}
                  className="rounded-md border-gray-800 bg-black/50 hover:bg-black/60 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border border-gray-800">
                      <img
                        src={`${member.src}`}
                        alt={`${member.name} avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-white text-2xl font-semibold leading-tight">{member.name}</h3>
                    <p className="text-lg text-white">{member.role}</p>

                    <p className="mt-3 text-base leading-relaxed text-white">{member.bio}</p>

                    <div className="mt-4 flex items-center gap-4">
                      <a
                        href={member.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-base text-white hover:text-foreground transition-colors"
                      >
                        <Github size={20} />
                        <span>GitHub</span>
                      </a>
                      <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-base text-white hover:text-foreground transition-colors"
                      >
                        <Linkedin size={20} />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="h-px w-full bg-gray-800 my-6" />

          {/* Contributors */}
          <section aria-labelledby="contributors">
            <div className="mb-4">
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="custom-class sm:text-4xl font-semibold"
              >
                Contributors
              </GradientText>
              <p className="mt-2 text-base text-white">
                Thank you to everyone who has helped improve this project.
              </p>
            </div>

            <ul className="flex flex-wrap gap-4">
              {contributors.map((name, i) => (
                <li
                  key={i}
                  className="px-4 py-2 rounded-full border border-gray-800 bg-black/50 text-base text-white hover:text-foreground hover:bg-black/60 transition-colors"
                >
                  {name}
                </li>
              ))}
            </ul>
          </section>
        </section>
      </main>

      <footer className="relative z-10 py-6 text-center text-white text-base">
        <p>&copy; {new Date().getFullYear()} Case Bridge. All rights reserved.</p>
      </footer>
    </div>
  )
}