import { useState } from 'react';
import ChatBox from "./components/ui/ChatBox.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ModelSelector from "./components/ModelSelecter.jsx"
import FloatingDockDemo from "./components/ui/FloatingDockDemo.jsx"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignupFormDemo from "./pages/Signup.jsx"
import Home from './Pages/Home.jsx';




export default function App() {
  return (
    
    
      <BrowserRouter>
      <div>
    {/*<main className="min-h-screen bg-black text-white">
        <Routes>
          {/* Signup Page */}
          <Route path="/signup" element={<SignupFormDemo />} />

          {/* Default Layout */}
          <Route
            path="/"
            element={
              <>
                <div className="container mx-auto px-4 py-8">
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                      Legal Case Assistant
                    </h1>
                    <p className="text-gray-400 text-sm mt-2">
                      Scroll down to see your history
                    </p>
                  </div>
                </div>

                <Sidebar />
                <ChatBox />
                <ModelSelector />
                <FloatingDockDemo />
              </>
            }
          />
        </Routes>
      </main>*/}
    <Home></Home></div>
    </BrowserRouter>
  )
}


