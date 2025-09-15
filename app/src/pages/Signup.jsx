"use client"
import SignupFormDemo from "../components/signup-form-demo"
import Lanyard from "../components/Lanyard"

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full flex justify-between items-center px-8 bg-black text-white">
      {/* Left side: 3D Lanyard Canvas */}
      <div className="flex-1 flex justify-center items-center">
       <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>

      {/* Right side: Signup Form */}
      <div className="flex-1 flex justify-center items-center">
        <SignupFormDemo />
      </div>
    </div>
  )
}
