import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase"; // adjust path
import Avatar from "../components/Avatar"

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  function handleClick() {
    navigate("/home");
  }

  return (
    <nav
      className="
        absolute left-1/2 top-6
        -translate-x-1/2
        w-[90vw] max-w-[900px] h-[60px]
        flex items-center justify-between
        px-6
        rounded-full
        border border-white/15
        bg-black/35
        backdrop-blur-xl
        z-20
        shadow-md
      "
    >
      {/* Brand */}
      <div className="flex items-center gap-3 pl-2">
        <span className="text-xl text-white tracking-tight">Case Bridge</span>
      </div>

      {/* Links + Profile */}
      <div className="flex gap-6 items-center pr-2">
        <span
          className="text-white text-lg cursor-pointer"
          onClick={handleClick}
        >
          Home
        </span>

        {/* Profile photo */}
        {user && <Avatar user={user} />}
</div>
     
    </nav>
  );
}
