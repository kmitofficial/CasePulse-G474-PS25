"use client"

import { useState } from "react"

export default function ModelSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState("Select Model")

  const models = [
    {
      id: "legalbert",
      name: "LegalBert",
      description: "Specialized for legal queries and document analysis",
      icon: "⚖️",
    },
    {
      id: "generalbert",
      name: "GeneralBert",
      description: "General purpose AI model for various tasks",
      icon: "🤖",
    },
  ]

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 px-6 py-3 
                   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                   text-white text-lg font-extrabold tracking-wide
                   rounded-xl shadow-lg
                   hover:scale-105 hover:shadow-indigo-500/50
                   transition-all"
      >
        {selectedModel}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 tracking-wide">
                Select Model
              </h2>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-white text-3xl"
              >
                ×
              </button>
            </div>

            {/* Models */}
            <div className="space-y-4">
              {models.map((model) => (
                <div
                  key={model.id}
                  onClick={() => {
                    setSelectedModel(model.name)
                    setIsOpen(false)
                  }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedModel === model.name
                      ? "border-indigo-500 bg-indigo-500/10 shadow-md shadow-indigo-500/30"
                      : "border-gray-600 hover:border-gray-500 bg-gray-800/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{model.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-indigo-400">{model.name}</h3>
                      <p className="text-gray-400 text-sm">{model.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  )
}
