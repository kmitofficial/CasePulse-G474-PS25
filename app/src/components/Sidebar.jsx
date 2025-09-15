"use client"

import { useState, useRef, useEffect } from "react"

export default function AssistantBall() {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 24, y: 24 }) // bottom-6 right-6 equivalent
  const ballRef = useRef(null)
  const expandedRef = useRef(null)
  const dragOffset = useRef({ x: 0, y: 0 })

  const retrievedDocs = [
    {
      id: 1,
      title: "Contract Law Fundamentals",
      relevance: 95,
      preview: "A contract is a legally binding agreement between two or more parties...",
    },
    {
      id: 2,
      title: "Breach of Contract Remedies",
      relevance: 92,
      preview: "When a party fails to perform their contractual obligations...",
    },
    {
      id: 3,
      title: "Commercial Law Guidelines",
      relevance: 88,
      preview: "Commercial contracts often include specific clauses for breach...",
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isExpanded &&
        ballRef.current &&
        !ballRef.current.contains(event.target) &&
        expandedRef.current &&
        !expandedRef.current.contains(event.target)
      ) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isExpanded])

  const handleMouseDown = (e) => {
    if (e.button !== 0) return // Only left mouse button
    setIsDragging(true)
    const rect = ballRef.current.getBoundingClientRect()
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    e.preventDefault()
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const newX = window.innerWidth - (e.clientX - dragOffset.current.x + 40) // 40 is ball width
    const newY = window.innerHeight - (e.clientY - dragOffset.current.y + 40) // 40 is ball height

    // Keep within bounds
    const boundedX = Math.max(8, Math.min(newX, window.innerWidth - 48))
    const boundedY = Math.max(8, Math.min(newY, window.innerHeight - 48))

    setPosition({ x: boundedX, y: boundedY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging])

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const toggleExpanded = () => {
    if (!isDragging) {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <>
      <div
        ref={ballRef}
        className="fixed z-50"
        style={{
          right: `${position.x}px`,
          bottom: `${position.y}px`,
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <button
          onClick={toggleExpanded}
          onMouseDown={handleMouseDown}
          className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        ></button>
      </div>

      {isExpanded && (
        <div
          ref={expandedRef}
          className="fixed z-40"
          style={{
            right: `${position.x}px`,
            bottom: `${position.y + 50}px`, // Position above the ball
          }}
        >
      
          <div className="bg-black/90 backdrop-blur-md rounded-2xl border border-gray-800/50 p-6 w-80 h-96 overflow-y-auto scrollbar-hide shadow-2xl">
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Upload Documents
              </h3>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-gray-500 transition-colors">
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-gray-400 text-sm mb-2">Drop files here</p>
                <p className="text-gray-500 text-xs">PDF, DOC, DOCX, TXT</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Choose Files
                </label>
              </div>

              {/* Display uploaded files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-white text-sm font-medium mb-2">Uploaded Files:</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                        <span className="text-gray-300 text-xs truncate">{file.name}</span>
                        <button
                          onClick={() => setUploadedFiles((prev) => prev.filter((_, i) => i !== index))}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            

            {/* Top 3 Retrieved Documents Section */}
            <div className="mt-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Top Documents
              </h3>
              
              <div className="space-y-3">
                {retrievedDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-lg bg-gray-900/50 border border-gray-700/50 hover:bg-gray-800/50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white text-sm font-medium">{doc.title}</h4>
                      <span className="text-blue-400 text-xs font-bold">{doc.relevance}%</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{doc.preview}</p>
                  </div>
                ))}
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
            .line-clamp-2 {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          `}</style>
        </div>
      )}
    </>
  )
}
