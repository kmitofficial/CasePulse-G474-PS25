// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { useEffect } from "react";
import LoadingWrapper from "./LoadWrapper";

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      console.log("✅ Logged in as:", user.displayName || user.email);
    } else {
      console.log("❌ No user logged in");
    }
  }, [user]);

  if (loading) {
    return <LoadingWrapper/>;
  }

  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  return children;
}
