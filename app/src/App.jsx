import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupFormDemo from "./pages/Signup";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home.jsx";
import About from "./pages/About";
import Chat from "./pages/Chat";
import LoadingWrapper from "./components/LoadWrapper";
import { v4 as uuidv4 } from "uuid";
import ConversationList from "./components/ConversationList"
import LadyJusticeSTLPage from "./components/hammer";

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
        {/* Signup Page */}
        <Route path="/signup" element={<LoadingWrapper><SignupFormDemo/></LoadingWrapper>} />
        {/* Chat Page "entry" redirects to chat/:chatId */}
        <Route path="/chat" element={<LoadingWrapper><ChatRedirect /></LoadingWrapper>} />
        <Route path="/s" element={<LadyJusticeSTLPage/>} />
        {/* Chat Page with chatId */}
        <Route path="/chat/:chatId" element={<LoadingWrapper><Chat /></LoadingWrapper>} />
        {/* Home Page */}
        <Route path="/" element={<ProtectedRoute><LoadingWrapper><Home /></LoadingWrapper></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><LoadingWrapper><Settings/></LoadingWrapper></ProtectedRoute>} />
        <Route path="/datasets" element={<ProtectedRoute><LoadingWrapper><Datasets/></LoadingWrapper></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><LoadingWrapper><ProfilePage/></LoadingWrapper></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
