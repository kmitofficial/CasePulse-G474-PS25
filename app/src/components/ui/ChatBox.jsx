"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../../config/firebase"
import ChatDisplay from "../Conversation"
import RotatingText from "./RotatingText"

export default function ChatBox({ chatId, userEmail }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingMessages, setIsFetchingMessages] = useState(false) // Add loading state for message fetching

  // Load existing chat messages when chatId/userEmail changes
  useEffect(() => {
    async function fetchChatMessages() {
      if (!chatId || !userEmail) {
        setMessages([])
        return
      }
      
      console.log("Loading messages for chatId:", chatId) // Debug log
      setIsFetchingMessages(true) // Show loading state
      setMessages([]) // Clear current messages immediately
      
      try {
        const chatDocRef = doc(db, "chats", userEmail, "conversations", chatId)
        const snapshot = await getDoc(chatDocRef)
        
        if (snapshot.exists()) {
          const chatData = snapshot.data()
          const loadedMessages = chatData.messages || []
          console.log("Loaded messages:", loadedMessages.length) // Debug log
          setMessages(loadedMessages)
        } else {
          console.log("No conversation found for chatId:", chatId) // Debug log
          setMessages([])
        }
      } catch (error) {
        console.error("Error loading chat messages:", error)
        setMessages([])
      } finally {
        setIsFetchingMessages(false)
      }
    }
    
    fetchChatMessages()
  }, [chatId, userEmail])

  const handleSend = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("http://localhost:5000/submit_query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      })
      if (!res.ok) throw new Error("API not found")
      const data = await res.json()
      setMessages([...newMessages, { role: "assistant", content: data.reply }])
    } catch (e) {
      const fakeReply = `🤖 Synthetic reply: You asked about "${input}". Since no server is running, I'm giving you a placeholder response.`
      setMessages([...newMessages, { role: "assistant", content: fakeReply }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Show loading state while fetching messages
  if (isFetchingMessages) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: "#000000" }}>
        <div className="text-white">Loading conversation...</div>
      </div>
    )
  }

  return (
    <>
      <div className="h-screen" style={{ background: "#000000" }}></div>

      <ChatDisplay
        messages={messages}
        isLoading={isLoading}
        chatId={chatId}
        userEmail={userEmail}
      />

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 flex flex-col items-center">
        <div className="relative z-20 w-full flex items-center rounded-2xl border border-gray-900 bg-black/80 backdrop-blur-md shadow-2xl transition-all duration-500">
          <textarea
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your legal question here..."
            className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
            disabled={isLoading}
          />

          <button
            onClick={handleSend}
            disabled={isLoading}
            className={`m-2 rounded-xl px-4 py-2 text-white transition-colors duration-200 ${
              isLoading ? "bg-gradient-to-r from-cyan-600 to-cyan-400 cursor-not-allowed" : "bg-gradient-to-r from-cyan-600 to-cyan-400 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "..." : "Ask!"}
          </button>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        body {
          overflow-x: hidden;
        }
        body::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}
