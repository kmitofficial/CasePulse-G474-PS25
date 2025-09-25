// components/AvatarDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import MessagePopup from "../components/Popup";

export default function AvatarDropdown({ user }) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();
  const navigate = useNavigate();

  const char = user.displayName ? user.displayName.charAt(0) : user.email.charAt(0);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
  try {
    await auth.signOut();
    console.log("Signed out successfully");

    // Navigate to signup and pass state
    navigate("/signup", { state: { showLogoutPopup: true } });
  } catch (err) {
    console.error("Logout error:", err);
  }
}





  function handleProfile() {
    navigate("/profile");
    setOpen(false);
  }

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center text-white font-bold text-lg cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {char.toUpperCase()}
        </div>

        {/* Dropdown menu */}
        {open && (
          <div
            className="absolute right-0 mt-2 w-36 rounded-lg bg-black/35 backdrop-blur-xl shadow-md flex flex-col"
            style={{ fontFamily: "inherit", fontWeight: 600 }}
          >
            <button
              onClick={handleProfile}
              className="px-4 py-3 text-white text-left hover:bg-white/10 transition-colors rounded-t-lg"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-3 text-white text-left hover:bg-white/10 transition-colors rounded-b-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>



    </>
  );
}
