import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const RotatingText = ({
  texts,
  mainClassName,
  staggerFrom,
  initial,
  animate,
  exit,
  staggerDuration,
  splitLevelClassName,
  transition,
  rotationInterval,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, rotationInterval);
    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  const currentText = texts[currentIndex];
  const chars = currentText.split("");

  return (
    <span className={mainClassName}>
      <AnimatePresence mode="wait">
        <motion.span key={currentText} className={splitLevelClassName}>
          {chars.map((char, index) => (
            <motion.span
              key={char + index}
              initial={initial}
              animate={animate}
              exit={exit}
              transition={{
                ...transition,
                delay:
                  staggerFrom === "last"
                    ? (chars.length - 1 - index) * staggerDuration
                    : index * staggerDuration,
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const LoadingWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Lottie animation */}
            <div className="flex items-center justify-center pointer-events-none mb-4">
              <DotLottieReact
                src="/Successlaw.json"
                loop
                autoplay
                style={{ width: '400px', height: '400px' }}
              />
            </div>

            {/* Text below the hammer */}
            {/* <h2 className="text-xl sm:text-2xl font-semibold text-white flex justify-center items-center gap-2">
              Legal
              <RotatingText
                texts={["Indian", "US"]}
                mainClassName="bg-gradient-to-r from-cyan-600 to-cyan-400 text-white text-xl sm:text-2xl font-bold rounded-lg inline-flex items-center px-3"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={1000}
              />
              Jurisdiction
            </h2> */}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`${
          isLoading ? "invisible" : "visible"
        } transition-opacity duration-500`}
      >
        {children}
      </div>
    </div>
  );
};

export default LoadingWrapper;