"use client"
import SignupFormDemo from "../components/signup-form-demo"
import Lanyard from "../components/Lanyard"
import DarkVeil from "../components/DarkVeil"
import { useLocation } from "react-router-dom";
import MessagePopup from "../components/Popup";
import { useState,useEffect } from "react";

export default function SignupPage() {
  const location = useLocation();
//   const [showPopup, setShowPopup] = useState(false);
//    useEffect(() => {
//   console.log("SignupPage location.state:", location.state);
//   if (location.state?.showLogoutPopup) {
//     setShowPopup(true);

//     const timer = setTimeout(() => setShowPopup(false), 3000);
//     return () => clearTimeout(timer);
//   }
// }, [location]);

  return (
    <div className="min-h-screen w-full flex justify-between items-center px-8 relative">
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
      {/* {showPopup && (
        <MessagePopup
          text="You have successfully logged out!"
          onClose={() => setShowPopup(false)}
        />
      )} */}

      {/* Left side: 3D Lanyard Canvas */}
      <div className="flex-1 flex justify-center items-center relative z-10">
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>

      {/* Right side: Signup Form */}
      <div className="flex-1 flex justify-center items-center relative z-10">
        <SignupFormDemo />
      </div>
    </div>
  )
}
