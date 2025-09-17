"use client"

import { useEffect, useRef } from "react"

export default function ChatDisplay({ messages }) {
  const messagesEndRef = useRef(null)
  const containerRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (!messages || messages.length === 0) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[85vw] max-w-4xl px-6 max-h-[60vh] overflow-y-auto scrollbar-hide"
      style={{
        background: "transparent",
        zIndex: 15,
      }}
    >
      <div className="flex flex-col gap-5 pb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-md lg:max-w-xl px-5 py-3.5 rounded-2xl backdrop-blur-md shadow-lg transition-all duration-300 ${
                message.role === "user"
                  ? "bg-blue-600/80 text-white ml-auto"
                  : "bg-gray-800/80 text-gray-100 mr-auto border border-gray-700/50"
              }`}
            >
              <p className="text-[15px] leading-relaxed break-words">
                {message.content}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
