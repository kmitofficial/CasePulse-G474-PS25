"use client"

import { useState, useEffect } from "react"
import { User, Lock, Settings, LogOut, Menu, X } from "lucide-react"
import GradientText from "@/components/GradientText"
import DarkVeil from "@/components/DarkVeil"
import Navbar from "@/components/Navbar"
import { auth } from "../../config/firebase"
import Avatar from "@/components/Avatar";


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    bio: "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Fetch user info directly from Firebase Auth
  useEffect(() => {
    if (auth.currentUser) {
      const user = auth.currentUser
      setFormData({
        username: user.displayName || user.email.split("@")[0],
        email: user.email || "",
        fullName: user.displayName || "",
        bio: "", // bio not available from Firebase Auth by default
      })
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    console.log("Profile saved:", formData)
    // Optional: save displayName to Firebase Auth if changed
    if (auth.currentUser) {
      auth.currentUser.updateProfile({ displayName: formData.fullName })
        .then(() => console.log("Firebase Auth profile updated"))
        .catch((err) => console.error("Error updating profile:", err))
    }
  }

  const handleSavePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    console.log("Password updated")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    // Optional: use auth.currentUser.updatePassword() after re-authentication
  }

  const handleLogout = async () => {
    try {
      await auth.signOut()
      console.log("Signed out successfully")
      window.location.href = "/signup"
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account Settings", icon: Settings },
    { id: "security", label: "Security", icon: Lock },
  ]

  return (
    <div className="min-h-screen text-white bg-black pt-30">
      <Navbar className="relative z-20" />
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

      <div className="flex gap-6 px-6">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-0"
          } transition-all duration-300 overflow-hidden border border-gray-700/50 rounded-xl backdrop-blur-sm`}
        >
          <div className="p-6 space-y-8 flex flex-col items-center">
  <div className="space-y-4 flex flex-col items-center">
    <Avatar user={auth.currentUser} size="w-28 h-28 text-4xl" />

    <div className="text-center">
      <h2 className="text-2xl font-bold text-white">{formData.fullName}</h2>
      <p className="text-sm text-gray-400">{formData.username}</p>
    </div>
  </div>


            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? "text-cyan-400 border border-cyan-500/50 backdrop-blur-sm"
                        : "text-gray-400 hover:text-cyan-400 hover:border hover:border-cyan-500/50 hover:backdrop-blur-sm"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </nav>

            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-cyan-400 hover:border hover:border-cyan-500/50 hover:backdrop-blur-sm transition-all duration-200 mt-8"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 border border-gray-700/50 rounded-xl backdrop-blur-sm overflow-hidden">
          <div className="border-b border-gray-700/50 p-6 flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:border hover:border-gray-600/50 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="text-3xl font-bold"
            >
              Profile
            </GradientText>
            <div className="w-10" />
          </div>

          <div className="p-8 max-w-4xl space-y-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-8">
                <div className="border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-6 text-white">Profile Information</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                        rows="4"
                        placeholder="Tell us about yourself"
                      />
                    </div>

                    <button
                      onClick={handleSaveProfile}
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-600 text-white font-semibold hover:from-cyan-500 hover:to-cyan-700 transition-all duration-200 hover:scale-105"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === "account" && (
              <div className="space-y-8">
                <div className="border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-6 text-white">Account Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                        placeholder="Enter username"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                        placeholder="Enter email"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        We will use this email to communicate with you and for authentication.
                      </p>
                    </div>

                    <button
                      onClick={handleSaveProfile}
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-600 text-white font-semibold hover:from-cyan-500 hover:to-cyan-700 transition-all duration-200 hover:scale-105"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-8">
                <div className="border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-6 text-white">Change Password</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <button
                      onClick={handleSavePassword}
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-600 text-white font-semibold hover:from-cyan-500 hover:to-cyan-700 transition-all duration-200 hover:scale-105"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
