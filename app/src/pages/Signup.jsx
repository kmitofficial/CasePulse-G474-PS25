"use client"
import SignupFormDemo from "../components/signup-form-demo"
import Lanyard from "../components/Lanyard"
import DarkVeil from "../components/DarkVeil"

export default function SignupPage() {
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
