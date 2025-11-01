import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupFormDemo from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home.jsx";
import About from "./pages/About";
import Chat from "./pages/Chat";
import { v4 as uuidv4 } from "uuid";
import LoadingWrapper from "./components/LoadWrapper";

import Datasets from "./pages/Datasets"
import ProfilePage from "./pages/Profile";

// Redirects /chat to /chat/:uuid
function ChatRedirect() {
  const chatId = uuidv4();
  return <Navigate to={`/chat/${chatId}`} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadingWrapper><Home /></LoadingWrapper>} />
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
