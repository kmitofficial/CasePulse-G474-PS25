"use client"

import { useState } from "react"

export default function Sidebar() {
  const [uploadedFiles, setUploadedFiles] = useState([])

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
    {
      id: 4,
      title: "Legal Precedents Database",
      relevance: 85,
      preview: "Historical cases show that breach of contract can result in...",
    },
    {
      id: 5,
      title: "Contract Enforcement Rules",
      relevance: 82,
      preview: "Courts typically award damages based on the actual loss suffered...",
    },
  ]

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setUploadedFiles((prev) => [...prev, ...files])
  }

  return (
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 w-96 h-3/5 z-10 hidden lg:block">
      <div className="bg-black/70 backdrop-blur-md rounded-2xl border border-gray-800/50 p-8 h-full overflow-y-auto scrollbar-hide">
        {/* Top 5 Retrieved Documents Section */}
        <div className="mb-8">
          <h3 className="text-white font-bold text-xl mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                clipRule="evenodd"
              />
            </svg>
            Top 5 Retrieved Documents
          </h3>
          <div className="space-y-4">
            {retrievedDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-lg bg-gray-900/50 border border-gray-700/50 hover:bg-gray-800/50 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-white text-base font-medium">{doc.title}</h4>
                  <span className="text-blue-400 text-sm font-bold">{doc.relevance}%</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{doc.preview}</p>
              </div>
            ))}
          </div>
        </div>

        {/* File Upload Section */}
        <div>
          <h3 className="text-white font-bold text-xl mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Upload Documents
          </h3>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
            <svg className="w-10 h-10 mx-auto mb-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-400 text-base mb-3">Drop files here or click to upload</p>
            <p className="text-gray-500 text-sm">PDF, DOC, DOCX, TXT files supported</p>
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
              className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white text-base rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Choose Files
            </label>
          </div>

          {/* Display uploaded files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <h4 className="text-white text-base font-medium mb-3">Uploaded Files:</h4>
              <div className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                    <span className="text-gray-300 text-sm truncate">{file.name}</span>
                    <button
                      onClick={() => setUploadedFiles((prev) => prev.filter((_, i) => i !== index))}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
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
      `}</style>
    </div>
  )
}
