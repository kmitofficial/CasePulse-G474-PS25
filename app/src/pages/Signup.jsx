"use client"
import SignupFormDemo from "../components/signup-form-demo"
import LoginFormDemo from "../components/login"
import DarkVeil from "../components/DarkVeil"
import { useState } from "react"
import ModelViewer from "@/components/ui/ModelViewer"

export default function SignupPage() {
  const [activeForm, setActiveForm] = useState("signup");
  const handleAlreadyUserClick = () => {
    setActiveForm("login");
  };
  const handleNewUserClick = () => {
    setActiveForm("signup");
  };

  return (
    <div className="min-h-screen w-full flex justify-between items-center px-8 relative">
      {/* Background */}
      <div className="absolute inset-0 z-0">
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

      {/* Left side: 3D Lanyard */}
      <div className="flex-1 flex justify-center items-center relative z-10">
       
        <ModelViewer
          url="/statue.glb"
          width={600}
          height={600}
          defaultZoom={1.5}
          defaultRotationX={40}
          defaultRotationY={0}
          minZoomDistance={1}
          maxZoomDistance={10}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      
    
      </div>

      {/* Right side: Forms */}
      <div className="flex-1 flex justify-center items-start relative z-10 space-y-[-200px]">
        {/* Signup Form */}
        <div
          className={`w-full max-w-md rounded-xl overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer ${
            activeForm === "signup" ? "z-20 scale-100 blur-0" : "z-10 scale-95 blur-sm"
          }`}
        >
          <SignupFormDemo onAlreadyUserClick={handleAlreadyUserClick} />
        </div>

        {/* Login Form peeking */}
        <div
          className={`w-full max-w-md rounded-xl overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer -translate-x-40 ${
            activeForm === "login" ? "z-20 scale-100 blur-0" : "z-10 scale-95 blur-sm"
          }`}
        >
          <LoginFormDemo onNewUserClick={handleNewUserClick}/>
        </div>
      </div>
    </div>
  );
}

