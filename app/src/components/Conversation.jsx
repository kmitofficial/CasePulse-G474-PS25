// Conversation.jsx
"use client";
import { useEffect, useRef } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase"; // Adjust as needed
import RotatingText from "./ui/RotatingText";

export default function ChatDisplay({ messages, isLoading, chatId, userEmail }) {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // === Auto-scroll to bottom ===
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // === Save conversation in Firestore ===
  useEffect(() => {
    if (!userEmail || !chatId || !messages?.length) return;

    const firstUserMessage = messages.find((msg) => msg.role === "user");
    const title = firstUserMessage
      ? firstUserMessage.content.slice(0, 40)
      : "Untitled";

    setDoc(
      doc(db, "chats", userEmail, "conversations", chatId),
      {
        messages,
        title,
        updatedAt: Date.now(),
      },
      { merge: true }
    ).catch((e) => console.error("Error saving chat:", e));
  }, [userEmail, chatId, messages]);

  // === Message formatter (regex-based) ===
  function formatMessageContent(content) {
    if (!content) return "";

    // Highlight section titles like "Query:", "Conclusion:", etc.
    content = content.replace(
      /(\b(Query|Conclusion|Relevant Legal Principles|Authorized Sending Parties|Unauthorized Sending Parties|Calculation of Fees)\b:)/gi,
      "<strong class='text-cyan-400'>$1</strong>"
    );

    // Highlight numbered points like "1. ", "2. "
    content = content.replace(
      /(^|\n)(\d+\.\s+)/g,
      "<br/><span class='text-cyan-300 font-semibold'>$2</span>"
    );

    // Highlight retrieved JSONL file info
    content = content.replace(
      /Retrieved JSONL file content from job (\w+):/g,
      "<br/><strong class='text-amber-400'>📄 Retrieved file (job ID: $1)</strong><br/>"
    );

    // Highlight JSON objects for readability
    content = content.replace(
      /({.*?})/gs,
      "<code class='bg-gray-900 text-green-300 rounded p-1 block whitespace-pre-wrap'>$1</code>"
    );

    // Replace "---" with a clean divider
    content = content.replace(/---+/g, "<hr class='border-gray-600 my-3'/>");

    // Preserve line breaks
    content = content.replace(/\n/g, "<br/>");

    return content.trim();
  }

  if (!messages || messages.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[85vw] max-w-4xl px-6 max-h-[80vh] overflow-y-auto scrollbar-hide"
      style={{ background: "transparent", zIndex: 15 }}
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
                  ? "bg-gradient-to-r from-cyan-400 to-cyan-600 text-black ml-auto"
                  : "bg-gray-800/80 text-gray-100 mr-auto border border-gray-700/50"
              }`}
            >
              <p
                className="text-[15px] leading-relaxed break-words"
                dangerouslySetInnerHTML={{
                  __html: formatMessageContent(message.content),
                }}
              />
            </div>
          </div>
        ))}

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
