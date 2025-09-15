import { useState } from 'react';

import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignupFormDemo from "./pages/Signup"

import Home from './pages/Home.jsx';
import Chat from "./pages/Chat.jsx"





export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        {/* Signup Page */}
        <Route path="/signup" element={<SignupFormDemo/>} />
        {/* Chat Page */}
        <Route path="/Chat" element={<Chat/>} />
        {/* Home Page  */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

