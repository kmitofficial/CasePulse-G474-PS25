import { useState } from 'react';

import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignupFormDemo from "./pages/Signup"
import Settings from "./pages/Settings"
import ProtectedRoute from './components/ProtectedRoute';



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
        <Route path="/Chat" element={<ProtectedRoute><LoadingWrapper><Chat/></LoadingWrapper></ProtectedRoute>} />
        {/* Home Page  */}
        <Route path="/home" element={<ProtectedRoute><LoadingWrapper><Home /></LoadingWrapper></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><LoadingWrapper><Settings/></LoadingWrapper></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

