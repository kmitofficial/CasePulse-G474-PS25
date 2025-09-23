import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// RotatingText component that rotates through an array of text strings.
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
  rotationInterval
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set up the interval for text rotation.
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, rotationInterval);

    // Clean up the interval on component unmount.
    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  const currentText = texts[currentIndex];
  // Split the current text into individual characters for animation.
  const chars = currentText.split('');

  return (
    <span className={mainClassName}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentText}
          className={splitLevelClassName}
        >
          {chars.map((char, index) => (
            <motion.span
              key={char + index}
              initial={initial}
              animate={animate}
              exit={exit}
              transition={{
                ...transition,
                delay: staggerFrom === "last" ? (chars.length - 1 - index) * staggerDuration : index * staggerDuration,
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

// LoadingWrapper component that shows a loading screen for a set duration.
// It blurs the content behind it until the loading is complete.
const LoadingWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide the loading screen after 5 seconds.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Clean up the timer.
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-white flex justify-center items-center gap-2">
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
              </h2>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`${isLoading ? 'invisible' : 'visible'} transition-opacity duration-500`}>
        {children}
      </div>
    </div>
  );
};

export default LoadingWrapper