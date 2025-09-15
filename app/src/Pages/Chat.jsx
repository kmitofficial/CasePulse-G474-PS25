import React from 'react'; 
import ChatBox from "../components/ui/ChatBox.jsx";
import AssistantBall from "../components/Sidebar.jsx";
import ModelSelector from "../components/ModelSelecter.jsx";
import FloatingDockDemo from "@/components/ui/FloatingDockDemo.jsx";
// import LaserFlow from "../components/LaserFlow.jsx";
import RotatingText from "../components/ui/RotatingText.jsx";
import ElasticSlider from "../components/ui/ElasticSlider.jsx"

export default function Chat() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Text Section */}
      <div className="container mx-auto px-4 py-8 relative z-10 text-center">
        
        {/* Main Title */}
        <h1 className="text-6xl font-extrabold text-indigo-500 mb-4 tracking-wide">
          CaseBridge
        </h1>

        {/* Subtitle */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-300 flex justify-center items-center gap-2">
          Legal
          <RotatingText
            texts={['Indian', 'US']}
            mainClassName="px-3 bg-indigo-600 text-white text-2xl sm:text-3xl font-bold rounded-lg inline-flex items-center"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
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
          position: 'relative', 
          zIndex: 70, 
          filter: 'brightness(1.5) contrast(1.2)' 
        }} 
      />

      {/* Model selector */}
      <ModelSelector />

      {/* Floating dock */}
      <FloatingDockDemo />
    </main>
  );
}