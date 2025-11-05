import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState, useCallback } from "react";
import "../../../globals.css"

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className
}) => {
  const [open, setOpen] = useState(false);
  
  const handleToggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
            style={{ pointerEvents: 'auto' }} // Ensure pointer events work
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                style={{ pointerEvents: 'auto' }}
              >
                <a
                  href={item.href}
                  key={item.title}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900 hover:scale-110 transition-transform duration-200"
                  style={{ pointerEvents: 'auto' }}
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={handleToggle}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800 hover:scale-110 transition-transform duration-200 relative z-50"
        style={{ pointerEvents: 'auto' }}
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({ items, className }) => {
  const mouseY = useMotionValue(Infinity);

  // Optimize mouse tracking with throttling
  const handleMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      mouseY.set(e.pageY);
    });
  }, [mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseY.set(Infinity);
  }, [mouseY]);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "mx-auto hidden flex-col items-center gap-4 p-0 md:flex relative z-50",
        className
      )}
      style={{ 
        pointerEvents: 'auto',
        willChange: 'transform' // Optimize for animations
      }}
    >
      {items.map((item) => (
        <IconContainerVertical mouseY={mouseY} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainerVertical({
  mouseY,
  title,
  icon,
  href
}) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Optimize distance calculation
  const distance = useTransform(mouseY, (val) => {
    if (!ref.current) return val;
    const bounds = ref.current.getBoundingClientRect();
    return val - bounds.y - bounds.height / 2;
  });

  const sizeTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const iconSizeTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  // Optimize spring animations
  const size = useSpring(sizeTransform, { 
    mass: 0.1, 
    stiffness: 150, 
    damping: 12,
    restDelta: 0.01
  });
  const iconSize = useSpring(iconSizeTransform, { 
    mass: 0.1, 
    stiffness: 150, 
    damping: 12,
    restDelta: 0.01
  });

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <a href={href} style={{ pointerEvents: 'auto' }}>
      <motion.div
        ref={ref}
        style={{ 
          width: size, 
          height: size,
          willChange: 'width, height' // Optimize for size changes
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800 cursor-pointer"
      >
        <AnimatePresence mode="wait">
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -2, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              className="absolute right-full mr-2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white z-60"
              style={{ pointerEvents: 'none' }} // Prevent tooltip from interfering
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          style={{ 
            width: iconSize, 
            height: iconSize,
            willChange: 'width, height'
          }} 
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}