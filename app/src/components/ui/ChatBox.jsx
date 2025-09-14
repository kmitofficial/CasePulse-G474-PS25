"use client"

import { useEffect, useState } from "react"
import { Button } from "../ui/moving-border";

export default function ChatBox() {
  const [scrollY, setScrollY] = useState(0)
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      // Show history when scrolled down more than 100px
      if (currentScrollY > 100) {
        setShowHistory(true)
      } else {
        setShowHistory(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const lastPromptText = "Explain Kruskal's algorithm in simple words"
  const historyItems = showHistory
    ? [
        { id: 0, text: lastPromptText, time: "Just now" },
        { id: 1, text: "What are the benefits of renewable energy?", time: "2 hours ago" },
        { id: 2, text: "Explain quantum computing in simple terms", time: "1 day ago" },
        { id: 3, text: "How does machine learning work?", time: "2 days ago" },
        { id: 4, text: "What is blockchain technology?", time: "3 days ago" },
        { id: 5, text: "Explain artificial intelligence", time: "1 week ago" },
      ]
    : []

  return (
    <>
      <div
        className="h-screen"
        style={{
          background: "#000000",
        }}
      ></div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 flex flex-col items-center">
        {/* Input Box */}
        <div
          className="relative z-20 w-full flex items-center rounded-2xl border border-gray-900 bg-black/80 backdrop-blur-md shadow-2xl transition-all duration-500"
          style={{
            transform: showHistory ? "translateY(-320px)" : "translateY(0)",
          }}
        >
          <input
            type="text"
            placeholder="Type your legal question here..."
            className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
          />
          <button className="m-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors duration-200">
            Ask!
          </button>
        </div>

        {!showHistory && (
          <div
            id="lastPrompt"
            className="relative z-10 -mt-6 w-[95%] flex justify-between items-center rounded-2xl border border-gray-900 bg-transparent backdrop-blur-sm shadow-md text-white text-sm px-4 py-3 transition-all duration-500 origin-center font-bold"
          >
            <span id="lastPromptText" className="opacity-20 font-bold">
              {lastPromptText}
            </span>
            <button
              id="copyBtn"
              className="ml-3 px-2 py-1 rounded-md bg-gray-800 text-white text-xs hover:bg-gray-700 opacity-50"
              onClick={() => {
                navigator.clipboard.writeText(lastPromptText).then(() => {
                  const btn = document.getElementById("copyBtn")
                  btn.innerText = "Copied!"
                  setTimeout(() => {
                    btn.innerText = "Copy"
                  }, 1500)
                })
              }}
            >
              Copy
            </button>
          </div>
        )}

        <div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 transition-all duration-500 ease-out"
          style={{
            transform: showHistory ? "translateY(0)" : "translateY(100%)",
            opacity: showHistory ? 1 : 0,
          }}
        >
          <div className="bg-black/90 backdrop-blur-md rounded-t-2xl border-t border-l border-r border-gray-800 p-6 max-h-80 overflow-y-auto scrollbar-hide">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              Recent History
            </h3>
            <div className="space-y-3">
              {historyItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex justify-between items-start p-3 rounded-lg transition-colors duration-200 cursor-pointer group ${
                    index === 0 ? "bg-gray-800/50 border border-gray-700" : "bg-gray-900/50 hover:bg-gray-800/50"
                  }`}
                >
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium group-hover:text-white transition-colors ${
                        index === 0 ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {item.text}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">{item.time}</p>
                  </div>
                  <button className="ml-3 px-2 py-1 rounded-md bg-gray-800 text-gray-300 text-xs hover:bg-gray-700 hover:text-white transition-colors">
                    Use
                  </button>
                </div>
              ))}
            </div>
          </div>
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
