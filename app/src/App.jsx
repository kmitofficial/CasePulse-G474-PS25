import { useState } from 'react';

import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignupFormDemo from "./pages/Signup"
import Settings from "./pages/Settings"



import Home from "./pages/Home.jsx"
import Chat from "./pages/Chat"
import LoadingWrapper from "./components/LoadWrapper"




export default function App() {

  return (
    <BrowserRouter>
    
      <Routes>
        {/* Signup Page */}
        <Route path="/signup" element={<LoadingWrapper><SignupFormDemo/></LoadingWrapper>} />
        {/* Chat Page */}
        <Route path="/Chat" element={<LoadingWrapper><Chat/></LoadingWrapper> } />
        {/* Home Page  */}
        <Route path="/home" element={<LoadingWrapper><Home /></LoadingWrapper>} />
        <Route path="/settings" element={<LoadingWrapper><Settings/></LoadingWrapper>}/>
      </Routes>
    </BrowserRouter>
  );
}

