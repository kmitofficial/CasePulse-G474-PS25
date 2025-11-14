"use client"

import { useState, useRef, useEffect } from "react"
import MagicBento from "./MagicBento"
import { HiOutlineSparkles } from "react-icons/hi" // example icon

export default function AssistantBall({ isUS,
  setIsUS,
  selectedSearchMethod,
  setSelectedSearchMethod,selectedModel,setSelectedModel}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 24, y: 24 })
  const ballRef = useRef(null)
  const expandedRef = useRef(null)
  const dragOffset = useRef({ x: 0, y: 0 })


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
    if (e.button !== 0) return
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

    const newX = window.innerWidth - (e.clientX - dragOffset.current.x + 40)
    const newY = window.innerHeight - (e.clientY - dragOffset.current.y + 40)

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

  const toggleExpanded = () => {
    if (!isDragging) {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <>
      {/* Floating Assistive Ball */}
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
          className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center text-cyan-500 text-xl"
        >
          <HiOutlineSparkles /> {/* Custom icon */}
        </button>
      </div>

      {/* Expanded Bento Box */}
      {isExpanded && (
        <div
          ref={expandedRef}
          className="fixed z-40"
          style={{
            right: `${position.x}px`,
            bottom: `${position.y + 60}px`,
          }}
        >
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="99, 102, 241"
            backgroundColor="rgba(15, 15, 35, 0.9)"
            borderColor="rgba(99, 102, 241, 0.5)" // ✅ Pass lifted state as props
        isUS={isUS}
            setIsUS={setIsUS}
            selectedSearchMethod={selectedSearchMethod}
            setSelectedSearchMethod={setSelectedSearchMethod}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
      />
        </div>
      )}
    </>
  )
}
