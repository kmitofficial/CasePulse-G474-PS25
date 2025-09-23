"use client"

import { useState } from "react"
import ChatDisplay from "../Conversation"
import RotatingText from "./RotatingText"

export default function ChatBox() {
  const [temperature, setTemperature] = useState(1.0) // kept in case you want slider later
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)


    
    // setMessages([...newMessages, loadingMessage])

    try {
      const res = await fetch("http://localhost:5000/submit_query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ query: input }), // <-- put messages here
      // query_id is optional, backend will auto-generate if omitted
    
      })

      if (!res.ok) throw new Error("API not found")

      const data = await res.json()
      setMessages([...newMessages, { role: "assistant", content: data.reply }])
    } catch (e) {
      console.warn("No server found, using synthetic response.")

      const fakeReply = `🤖 Synthetic reply: You asked about "${input}". Since no server is running, I'm giving you a placeholder response.`

      setMessages([...newMessages, { role: "assistant", content: fakeReply }])
    } finally {
      setIsLoading(false)   // <-- release loading state
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <div className="h-screen" style={{ background: "#000000" }}></div>

      <ChatDisplay messages={messages} isLoading={isLoading} />


      

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 flex flex-col items-center">

        {/* Input Box */}
        <div className="relative z-20 w-full flex items-center rounded-2xl border border-gray-900 bg-black/80 backdrop-blur-md shadow-2xl transition-all duration-500">
          <input
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
