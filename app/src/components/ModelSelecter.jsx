"use client"

import { useState } from "react"

export default function ModelSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState("LegalBert")

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
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-transparent border-2 border-dashed border-gray-500 text-white rounded-lg hover:border-gray-400 transition-colors"
      >
        {selectedModel}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Select Model</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white text-2xl">
                ×
              </button>
            </div>

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
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600 hover:border-gray-500 bg-gray-800/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{model.icon}</div>
                    <div>
                      <h3 className="text-white font-semibold">{model.name}</h3>
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
