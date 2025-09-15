import { useState } from 'react';

import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignupFormDemo from "./pages/Signup.jsx"
import { PageWithLoader } from "./components/PageWithLoader.jsx";
import Home from './pages/Home.jsx';
import Chat from "./pages/Chat.jsx"





export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        {/* Signup Page */}
        <Route path="/signup" element={<PageWithLoader><SignupFormDemo/></PageWithLoader>} />
        {/* Chat Page */}
        <Route path="/Chat" element={<PageWithLoader><Chat/></PageWithLoader>} />
        {/* Home Page  */}
        <Route path="/home" element={<PageWithLoader><Home /></PageWithLoader>} />
      </Routes>
    </BrowserRouter>
  );
}

