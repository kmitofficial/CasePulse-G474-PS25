"use client"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

import { auth, googleProvider } from "../../config/firebase"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useState } from "react"

export default function LoginFormDemo({ onNewUserClick }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleNewUser = () => {
    if (onNewUserClick) onNewUserClick(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in as:", userCredential.user.email);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.message);
    }
  };

  const SignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Sign-In:", result.user.email);
      navigate("/");
    } catch (err) {
      console.error("❌ Google Sign-In error:", err.message);
    }
  };

  return (
    <div className="flex justify-end items-center px-8 h-auto w-auto">
      <div className="w-full max-w-sm rounded-2xl p-6 border border-gray-700 bg-transparent">
        <h2 className="text-xl text-white font-semibold mb-2 font-sans">Welcome Back</h2>
        <p className="mb-6 text-sm text-gray-200">
          Log in to continue to Case Bridge
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="you@example.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>

          {/* Password */}
          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInputContainer>

          {/* Submit */}
          <button
            type="submit"
            className="group/btn relative w-full rounded-md bg-gradient-to-r from-[#9C43FE] via-[#4CCCEB] to-[#10149A] font-medium text-white shadow-lg hover:from-[#A05BFF] hover:via-[#5CD5F0] hover:to-[#2B2FAF] transition-all duration-200 h-10"
          >
            Log In →
            <BottomGradient />
          </button>

          <p
            className="text-white cursor-pointer"
            onClick={() => onNewUserClick?.(true)}
          >
            Create an account?
          </p>

          <div className="my-4 h-[1px] w-full bg-white/20" />

          {/* Social Logins */}
          <div className="flex flex-col space-y-3">
            <button
              type="button"
              className="group/btn flex h-10 w-full items-center justify-start space-x-2 rounded-md border border-gray-700 px-4 font-medium text-white shadow transition-colors hover:bg-gray-800 bg-transparent"
            >
              <IconBrandGithub className="h-4 w-4 text-white/80" />
              <span>GitHub</span>
              <BottomGradient />
            </button>

            <button
              onClick={SignInWithGoogle}
              type="button"
              className="group/btn flex h-10 w-full items-center justify-start space-x-2 rounded-md border border-gray-700 px-4 font-medium text-white shadow transition-colors hover:bg-gray-800 bg-transparent"
            >
              <IconBrandGoogle className="h-4 w-4 text-white/80" />
              <span>Google</span>
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
)

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
)
