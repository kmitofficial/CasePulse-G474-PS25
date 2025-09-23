import { useEffect, useRef } from "react";
import RotatingText from "./ui/RotatingText";

export default function ChatDisplay({ messages, isLoading }) {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (!messages || messages.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[85vw] max-w-4xl px-6 max-h-[60vh] overflow-y-auto scrollbar-hide"
      style={{ background: "transparent", zIndex: 15 }}
    >
      <div className="flex flex-col gap-5 pb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-md lg:max-w-xl px-5 py-3.5 rounded-2xl backdrop-blur-md shadow-lg transition-all duration-300 ${
                message.role === "user"
                  ? "bg-gradient-to-r from-cyan-400 to-cyan-600 text-black ml-auto"
                  : "bg-gray-800/80 text-gray-100 mr-auto border border-gray-700/50"
              }`}
            >
              <p className="text-[15px] leading-relaxed break-words">{message.content}</p>
            </div>
          </div>
        ))}

        {/* Rotating loader as assistant message */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-md lg:max-w-xl px-5 py-3.5 rounded-2xl backdrop-blur-md shadow-lg bg-gradient-to-r from-cyan-600 to-cyan-400 text-gray-100 mr-auto border border-gray-700/50">
              <RotatingText
                texts={[
                  "Thinking...",
                  "Analyzing your question...",
                  "Searching for insights...",
                  "Generating response...",
                ]}
                mainClassName="px-2 sm:px-2 md:px-3 bg-gradient-to-r from-cyan-600 to-cyan-400 text-black overflow-hidden py-1 rounded-lg inline-flex justify-center text-sm sm:text-base"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
