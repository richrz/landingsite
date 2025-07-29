"use client";
import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const problemItems = [
  { name: 'Data Silos', path: '/problem/silos' },
  { name: 'Manual Processes', path: '/problem/manual' },
  { name: 'Compliance Gaps', path: '/problem/compliance' },
  { name: 'Cost Inefficiency', path: '/problem/cost' },
];

const CARROT_WIDTH = 16; // 8px left + 8px right

const ProblemFlyout: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const [carrotY, setCarrotY] = useState(0);
  const [shouldFlash, setShouldFlash] = useState(false);
  const [selectedStroke, setSelectedStroke] = useState<number | null>(null);

  // Carrot follows hovered item if present, else active (but no carrot if nothing selected)
  const carrotTargetIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;

  useLayoutEffect(() => {
    // Only position carrot if there's a target (hovered or selected item)
    if (carrotTargetIdx !== null) {
      const item = itemRefs.current[carrotTargetIdx];
      const menu = menuRef.current;
      if (item && menu) {
        const { top: itemTop, height: itemHeight } = item.getBoundingClientRect();
        const { top: menuTop } = menu.getBoundingClientRect();
        const arrowHeight = 16; // px, matches the arrow's height
        const newY = itemTop - menuTop + (itemHeight - arrowHeight) / 2;
        setCarrotY(newY);
      }
    }
  }, [carrotTargetIdx]);

  return (
    <div
      ref={menuRef}
      className="w-max"
      onMouseLeave={() => setHoveredIdx(null)}
    >
      <div className="relative">
        {/* Carrot indicator with flash effect (vertical, left of item) */}
        <AnimatePresence>
          {carrotTargetIdx !== null && (
            <motion.div
              key="carrot"
              layout
              initial={false}
              animate={{
                y: carrotY,
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 35,
                duration: 0.3
              }}
              className="pointer-events-none absolute -left-4 z-30"
              style={{ width: CARROT_WIDTH, height: 16 }}
              onAnimationComplete={() => {
                // No flash on movement - only flash when item is selected
              }}
            >
              <motion.div
                className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8"
                animate={{
                  borderLeftColor: shouldFlash ? '#e4e4e7' : '#8b5cf6',
                  filter: shouldFlash 
                    ? 'drop-shadow(0 0 8px rgba(228, 228, 231, 0.8))' 
                    : 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.4))'
                }}
                transition={{ 
                  duration: shouldFlash ? 0.2 : 0.1,
                  ease: "easeInOut"
                }}
                style={{ 
                  borderLeftColor: '#8b5cf6', 
                  borderLeftWidth: 8, 
                  borderLeftStyle: 'solid',
                  filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.4))'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <ul className="flex flex-col gap-0.5 relative z-10">
          {problemItems.map((item, idx) => (
            <li
              key={item.name}
              ref={(el: HTMLLIElement | null) => { itemRefs.current[idx] = el; }}
              className="relative"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <button
                className="w-full text-left flex items-center px-4 py-3 rounded-full font-medium text-sm transition-all duration-200 cursor-pointer"
                onClick={() => {
                  setActiveIdx(idx);
                  // Flash carrot when item is selected/clicked
                  setShouldFlash(true);
                  setTimeout(() => setShouldFlash(false), 200);
                  // White stroke effect on selection
                  setSelectedStroke(idx);
                  setTimeout(() => setSelectedStroke(null), 300);
                }}
                tabIndex={0}
                type="button"
                style={{ 
                  border: '1px solid transparent',
                  borderColor: selectedStroke === idx 
                    ? 'rgba(255, 255, 255, 0.8)' 
                    : (hoveredIdx === idx || activeIdx === idx) 
                      ? 'rgba(109, 40, 217, 0.5)' 
                      : 'transparent',
                  backgroundColor: (hoveredIdx === idx || activeIdx === idx)
                    ? 'rgba(109, 40, 217, 0.15)'
                    : 'transparent',
                  color: (hoveredIdx === idx || activeIdx === idx)
                    ? 'white'
                    : '#b3b3b3',
                  minHeight: '44px',
                  width: '180px',
                  minWidth: '180px',
                  boxShadow: selectedStroke === idx 
                    ? '0 0 0 1px rgba(255, 255, 255, 0.6)' 
                    : 'none'
                }}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProblemFlyout;
