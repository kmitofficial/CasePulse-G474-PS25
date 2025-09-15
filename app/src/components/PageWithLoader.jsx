import { useState, useEffect } from "react";
import BoxesLoaderComponent from "./ui/BoxesLoaderComponent"

export const PageWithLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-black">
        <BoxesLoaderComponent />
      </div>
    );
  }

  return <>{children}</>;
};

export default PageWithLoader;