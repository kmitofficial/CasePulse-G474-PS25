import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupFormDemo from "./pages/Signup";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat";
import LoadingWrapper from "./components/LoadWrapper";
import { v4 as uuidv4 } from "uuid";
import ConversationList from "./components/ConversationList"

// Redirects /chat to /chat/:uuid
function ChatRedirect() {
  const chatId = uuidv4();
  return <Navigate to={`/chat/${chatId}`} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Signup Page */}
        <Route path="/signup" element={<LoadingWrapper><SignupFormDemo/></LoadingWrapper>} />
        {/* Chat Page "entry" redirects to chat/:chatId */}
        <Route path="/chat" element={<ChatRedirect />} />
        <Route path="/s" element={<ConversationList/>} />
        {/* Chat Page with chatId */}
        <Route path="/chat/:chatId" element={<Chat />} />
        {/* Home Page */}
        <Route path="/" element={<ProtectedRoute><LoadingWrapper><Home /></LoadingWrapper></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><LoadingWrapper><Settings/></LoadingWrapper></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
