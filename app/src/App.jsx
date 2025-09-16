import { useState } from 'react';

import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignupFormDemo from "./pages/Signup"




import Home from "./pages/Home.jsx"
import Chat from "./pages/Chat"
import CircleLoaderComponent from "./components/LoadWrapper"




export default function App() {

  return (
    <BrowserRouter>
    
      <Routes>
        {/* Signup Page */}
        <Route path="/signup" element={<CircleLoaderComponent><SignupFormDemo/></CircleLoaderComponent>} />
        {/* Chat Page */}
        <Route path="/Chat" element={ <CircleLoaderComponent><Chat/></CircleLoaderComponent> } />
        {/* Home Page  */}
        <Route path="/home" element={<CircleLoaderComponent><Home /></CircleLoaderComponent>} />
      </Routes>
    </BrowserRouter>
  );
}

