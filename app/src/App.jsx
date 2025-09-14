import { useState } from 'react';
import ChatBox from "./components/ui/ChatBox.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ModelSelector from "./components/ModelSelecter.jsx"
import FloatingDockDemo from "./components/ui/FloatingDockDemo.jsx"
import { BackgroundBeams } from "./components/ui/background-beams";



export default function App() {
  return (
    <main className="min-h-screen bg-black text-white">
  
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Legal Case Assistant</h1>
           
          <p className="text-gray-400 text-sm mt-2">Scroll down to see your history</p>
        </div>
      </div>

      <Sidebar />
      <ChatBox />
      
      <ModelSelector />
       <FloatingDockDemo />
       
      
    </main>
  )
}


