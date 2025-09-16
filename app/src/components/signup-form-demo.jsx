"use client"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom";

export default function SignupFormDemo() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    navigate("/home")
    e.preventDefault()
    console.log("Form submitted")
  }

  return (
    <div className="min-h-screen w-full flex justify-end items-center px-8">
      <div className="shadow-input w-full max-w-sm rounded-2xl p-6 border border-gray-700 bg-transparent">
        <h2 className="text-xl text-white font-semibold mb-2 font-sans">Welcome to Case Bridge</h2>
        <p className="mb-6 text-sm text-gray-200">
          Join Case Bridge to access advanced legal research tools
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">First Name</Label>
              <Input id="firstname" placeholder="Tyler" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last Name</Label>
              <Input id="lastname" placeholder="Durden" type="text" />
            </LabelInputContainer>
          </div>

          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" />
          </LabelInputContainer>

          <button
            type="submit"
            className="group/btn relative w-full rounded-md bg-gradient-to-r from-[#9C43FE] via-[#4CCCEB] to-[#10149A] font-medium text-white shadow-lg hover:from-[#A05BFF] hover:via-[#5CD5F0] hover:to-[#2B2FAF] transition-all duration-200 h-10"
          >
            Sign Up →
            <BottomGradient />
          </button>

          <div className="my-4 h-[1px] w-full bg-white/20" />

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
