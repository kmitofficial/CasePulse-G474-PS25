import ChatBox from "../components/ui/ChatBox.jsx"
import AssistantBall from "../components/Sidebar.jsx"
import FloatingDockDemo from "@/components/ui/FloatingDockDemo.jsx"
// import LaserFlow from "../components/LaserFlow.jsx";
import RotatingText from "../components/ui/RotatingText.jsx"
//import ElasticSlider from "../components/ui/ElasticSlider.jsx"
import DarkVeil from "../components/DarkVeil.jsx"
import Navbar from "../components/Navbar-g.jsx"


export default function Chat() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar/>
      {/* DarkVeil full-page background */}
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
      {/* Add some content to enable scrolling */}
        {/* <div className="space-y-8 pb-32">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="bg-slate-800 p-6 rounded-lg">
              <p className="text-gray-300">Sample content block {i + 1}</p>
            </div>
          ))}
        </div> */}
      


     
      

      {/* Text Section */}
      {/*<div className="container mx-auto px-4 py-8 relative z-10 text-center">
        {/* Main Title */}
        {/*<h1 className="text-2xl font-extrabold text-indigo-500 mb-4 tracking-wide"></h1>

        {/* Subtitle */}
        {/*<h2 className="text-xl sm:text-2xl font-semibold text-gray-300 flex justify-center items-center gap-2">
          Legal
          <RotatingText
            texts={["Indian", "US"]}
            mainClassName="px-3 bg-indigo-600 text-white text-xl sm:text-2xl font-bold rounded-lg inline-flex items-center"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
          Jurisdiction
        </h2>
      </div>

      {/* Assistant floating ball */}
      <AssistantBall />

      {/* Chat input */}
      <ChatBox
        style={{
          position: "relative",
          zIndex: 70,
          filter: "brightness(1.5) contrast(1.2)",
        }}
      />

      {/* Floating dock */}
      {/* <div className="fixed bottom-4 right-4 group">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FloatingDockDemo />
        </div>
      </div> */}
    </main>
  )
}
