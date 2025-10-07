import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { useNavigate } from "react-router-dom";


import { History, ArrowRight } from "lucide-react";

const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, triggerOnce: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      className="mb-4 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

const AnimatedList = ({
  items = [],
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  displayScrollbar = true,
  initialSelectedIndex = -1,
  maxHeight = '400px', // can be passed dynamically
  historyList = false 
}) => {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);
  const navigate = useNavigate();

  const handleScroll = e => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
  };

  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = e => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          if (onItemSelect) onItemSelect(items[selectedIndex], selectedIndex);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`);
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;

      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth'
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  return (
     <div className={`relative w-full ${className}`}>
      <div
        ref={listRef}
        className={`overflow-y-auto p-4 ${displayScrollbar
          ? '[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-[#060010] [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-thumb]:rounded-[4px]'
          : 'scrollbar-hide'
        }`}
        style={{ maxHeight, scrollbarWidth: displayScrollbar ? 'thin' : 'none', scrollbarColor: '#222 #060010' }}
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <AnimatedItem
            key={index}
            delay={0.1}
            index={index}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => {
              setSelectedIndex(index);
              if (onItemSelect) onItemSelect(item, index);
            }}
          >
            {historyList ? (
  <span
    className={`inline-flex items-center justify-between w-full p-3 rounded-lg cursor-pointer ${
      selectedIndex === index ? 'bg-[#3949AB]' : 'bg-[#237BA0]'
    } ${itemClassName}`}
    style={{ fontSize: '0.75rem', lineHeight: '1rem', marginBottom: '0.25rem' }}
  >
    {/* Left icon */}
    <History className="w-5 h-5 text-purple-300 mr-2 flex-none" />

    {/* Title + timestamp */}
    <span className="flex-1 min-w-0">
      <span className="block text-white truncate">{item.title}</span>
      <span className="block text-xs text-gray-200 truncate">
        {item.updatedAt ? new Date(item.updatedAt).toLocaleString() : ''}
      </span>
    </span>

    {/* Open button */}
    <button
      className="flex items-center justify-center bg-[#181847] p-1.5 rounded-full hover:bg-[#2d397a] transition ml-2 flex-none"
      title="View Conversation"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/chat/${item.id}`)
      }}
    >
      <ArrowRight className="w-4 h-4 text-white" />
    </button>
  </span>
) : 
(
              // Default style for other lists
              <div
                className={`p-3 bg-[#237BA0] rounded-lg ${selectedIndex === index ? 'bg-[#3949AB]' : ''} ${itemClassName}`}
                style={{ fontSize: '0.75rem', lineHeight: '1rem', marginBottom: '0.25rem' }}
              >
                <p className="text-white m-0">{item}</p>
              </div>
            )}
          </AnimatedItem>
))}

      </div>

      {showGradients && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-[50px] bg-gradient-to-b from-[#060010] to-transparent pointer-events-none transition-opacity duration-300 ease"
            style={{ opacity: topGradientOpacity }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#060010] to-transparent pointer-events-none transition-opacity duration-300 ease"
            style={{ opacity: bottomGradientOpacity }}
          />
        </>
      )}
    </div>
  );
};

export default AnimatedList;
