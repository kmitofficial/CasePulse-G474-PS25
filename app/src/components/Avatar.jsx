// components/Avatar.jsx
import React from "react";

export default function Avatar({ user }) {
  const char = user.displayName
    ? user.displayName.charAt(0)
    : user.email.charAt(0);

  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
      {char.toUpperCase()}
    </div>
  );
}
