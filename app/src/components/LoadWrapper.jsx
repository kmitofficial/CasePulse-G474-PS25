// components/LoaderWrapper.jsx
import React, { useEffect, useState } from "react";
import { LoaderOverlay } from "./testing";

export const LoaderWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoaderOverlay show={loading} />
      {children}
    </>
  );
};


export default LoaderWrapper;
