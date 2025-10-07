import ChatBox from "../components/ui/ChatBox.jsx"
import AssistantBall from "../components/Sidebar.jsx"
import FloatingDockDemo from "@/components/ui/FloatingDockDemo.jsx"
// import LaserFlow from "../components/LaserFlow.jsx";
import RotatingText from "../components/ui/RotatingText.jsx"
//import ElasticSlider from "../components/ui/ElasticSlider.jsx"
import DarkVeil from "../components/DarkVeil.jsx"
import Navbar from "../components/Navbar-g.jsx"

import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../config/firebase.js"

export default function Chat() {
 
  
  const items = [
    "Item 1","Item 2","Item 3","Item 4","Item 5",
    "Item 6","Item 7","Item 8","Item 9","Item 10"
  ]
   const { chatId } = useParams()
  const [user, loading, error] = useAuthState(auth)

  if (loading) return <div>Loading auth...</div>
  if (error) return <div>Authentication error: {error.message}</div>
 if (!chatId) return <div>No chat ID in route.</div>
if (!user?.email) return <div>Please log in to chat.</div>

 
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar/>
      
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

      <AssistantBall />

      <ChatBox
  style={{
    position: "relative",
    zIndex: 70,
    filter: "brightness(1.5) contrast(1.2)",
  }}
  chatId={chatId}
  userEmail={user.email}
/>

    

     
    </main>
  )
}