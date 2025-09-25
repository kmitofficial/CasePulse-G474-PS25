// components/Popup.jsx
import React from "react";

export default function MessagePopup({ text, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Transparent backdrop like navbar */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-xl"></div>

      {/* Popup content */}
      <div className="relative rounded-full w-[90%] max-w-sm p-6 flex flex-col items-center border border-white/15 bg-black/35 backdrop-blur-xl shadow-md">
        <p className="text-white text-lg font-semibold text-center">{text}</p>
        <button
          onClick={onClose}
          className="mt-4 text-white font-semibold px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
