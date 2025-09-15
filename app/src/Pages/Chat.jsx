import React from 'react';
import ChatBox from "../components/ui/ChatBox.jsx";
import AssistantBall from "../components/Sidebar.jsx";
import ModelSelector from "../components/ModelSelecter.jsx";
import FloatingDockDemo from "@/components/ui/FloatingDockDemo.jsx";
import LaserFlow from "../components/LaserFlow.jsx";

export default function Chat() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* LaserFlow overlay with height */}
      <div 
        style={{ height: '1300px', position: 'absolute', top: 0, left: 0, overflow: 'hidden' }} 
        className="z-50 pointer-events-none"
      >
        <LaserFlow />
      </div>

      {/* Text */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            CASE BRIDGE
          </h1>
        </div>
      </div>

      {/* Assistant floating ball */}
      <AssistantBall />

      {/* Chat input area with higher z-index and brightness */}
      <ChatBox 
        style={{ 
          position: 'relative', 
          zIndex: 70,   // higher than LaserFlow z-50
          filter: 'brightness(1.5) contrast(1.2)'  // makes it visually brighter
        }} 
      />

      {/* Model selector */}
      <ModelSelector />

      {/* Floating dock */}
      <FloatingDockDemo />
    </main>
  );
}
