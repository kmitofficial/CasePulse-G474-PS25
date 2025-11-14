import ChatBox from "../components/ui/ChatBox.jsx"
import AssistantBall from "../components/Sidebar.jsx"
import DarkVeil from "../components/DarkVeil.jsx"
import Navbar from "../components/Navbar-g.jsx"

import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../config/firebase.js"
import { Navigate } from "react-router-dom"

export default function Chat() {

  const [isUS, setIsUS] = useState(true); // false = Indian, true = US
  const [selectedModel,setSelectedModel]=useState("llama");
  const [selectedSearchMethod, setSelectedSearchMethod] = useState("bm25");
  const { chatId } = useParams()
  const [user, loading, error] = useAuthState(auth)
    useEffect(() => {
    console.log("isUS changed:", isUS);
  }, [isUS]);

  useEffect(() => {
    console.log("selectedSearchMethod changed:", selectedSearchMethod);
  }, [selectedSearchMethod]);

  if (loading) return <div>Loading auth...</div>
  if (error) return <div>Authentication error: {error.message}</div>
 if (!chatId) return <div>No chat ID in route.</div>
 if (!user?.email) return  <Navigate to="/signup" replace />;

 
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
      
      <AssistantBall isUS={isUS}
        setIsUS={setIsUS}
        selectedSearchMethod={selectedSearchMethod}
        setSelectedSearchMethod={setSelectedSearchMethod}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}

        />

      <ChatBox
        key={chatId}
        style={{
          position: "relative",
          zIndex: 70,
          filter: "brightness(1.5) contrast(1.2)",
        }}
        chatId={chatId}
        userEmail={user.email}
        isUS={isUS}
        selectedSearchMethod={selectedSearchMethod}
        selectedModel={selectedModel}    

      />
      

    

     
    </main>
  )
}