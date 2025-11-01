import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupFormDemo from "./Pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About";
import Chat from "./Pages/Chat";
import { v4 as uuidv4 } from "uuid";

import Datasets from "./Pages/Datasets"
import ProfilePage from "./Pages/Profile";

// Redirects /chat to /chat/:uuid
function ChatRedirect() {
  const chatId = uuidv4();
  return <Navigate to={`/chat/${chatId}`} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/datasets" element={<Datasets/>} />
        
        <Route path="/signup" element={<SignupFormDemo/>} />
        <Route path="/chat" element={<ChatRedirect />} />
        <Route path="/chat/:chatId" element={<ProtectedRoute><Chat/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
