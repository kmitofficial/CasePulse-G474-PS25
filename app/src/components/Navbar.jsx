import React from "react"
import { useEffect,useState } from "react";
import { auth } from "../../config/firebase"; // adjust path
import Avatar from "../components/Avatar"
import AvatarDropdown from "../components/AvatarDropdown"; 
import { useNavigate } from "react-router-dom";



export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    }, []);

    function handleDataClick() {
    
    console.log("Clicked")
    navigate("/Datasets");  
  }
    function handleAboutClick() {
    
    console.log("Clicked")
    navigate("/About");  
  }
  function handleClick() {
    navigate("/");
  }
  return (
    <nav className="
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
    ">
      <div className="flex items-center gap-3 pl-2">
        <span className="text-xl text-white tracking-tight">Case Bridge</span>
      </div>
      <div className="flex gap-6 items-center pr-2">
        <span
          className="text-white text-lg cursor-pointer"
          onClick={handleClick}
        >
          Home
        </span>
        <span className=" text-white text-lg cursor-pointer" onClick={handleDataClick}>Datasets</span>
        <span className=" text-white text-lg cursor-pointer" onClick={handleAboutClick}>About</span>
        {/* <span className=" text-white text-lg cursor-pointer">Contact</span>
        <span className=" text-white text-lg cursor-pointer">Login / Sign Up</span> */}
        {user && <AvatarDropdown user={user} />}

      </div>
    </nav>
  )
}
