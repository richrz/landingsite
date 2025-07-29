"use client";
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollPosition from '@/hooks/use-scroll-position';

export const NAV_ITEMS = [
  {
    name: "Drivers",
    items: [
      { name: "Overview", href: "/drivers" },
      { name: "Join the Beta", href: "/signup" },
      { name: "FAQ", href: "/drivers#faq" }
    ]
  },
  {
    name: "Advertisers",
    items: [
      { name: "How It Works", href: "/advertisers" },
      { name: "Pilot Campaigns", href: "/signup" },
      { name: "Targeting & Metrics", href: "/advertisers#targeting" }
    ]
  },
  {
    name: "Investors",
    items: [
      { name: "Market Opportunity", href: "/investors" },
      { name: "Product Traction", href: "/investors#traction" },
      { name: "Contact", href: "/contact" }
    ]
  },
  {
    name: "About",
    items: [
      { name: "Vision", href: "/" },
      { name: "Technology", href: "/#tech" },
      { name: "Beta Cities", href: "/#cities" }
    ]
  },
  {
    name: "Join Waitlist",
    href: "/signup",
    variant: "button"
  }
];

const navItems = [
  { id: 'drivers', name: 'Drivers' },
  { id: 'advertisers', name: 'Advertisers' },
  { id: 'investors', name: 'Investors' },
  { id: 'about', name: 'About' },
];

const Navbar = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [flyoutOpen, setFlyoutOpen] = useState<string | null>(null);
  const [activeId] = useState('drivers');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFlyout, setActiveFlyout] = useState<string | null>(null);
  const [selectedMobileItem, setSelectedMobileItem] = useState<string | null>(null);
  const triggerRef = useRef<HTMLLIElement | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const alignBoxRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const navTextRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const isScrolled = useScrollPosition(50);

  // Logo entrance animation state
  const [hasEntered, setHasEntered] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  const startEntrance = () => {
    if (hasEntered || !logoRef.current) return;
    
    setHasEntered(true);
    
    // Ensure logo starts completely hidden
    logoRef.current.style.transform = 'translateX(-200px) rotateZ(0deg)';
    logoRef.current.style.transition = 'none';
    logoRef.current.style.opacity = '1';
    
    // Force a reflow to ensure the initial state is applied
    logoRef.current.offsetHeight;
    
    // Animate in with crash effect
    setTimeout(() => {
      if (logoRef.current) {
        logoRef.current.style.transform = 'translateX(0px) rotateZ(15deg)';
        logoRef.current.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      }
    }, 50);
    
    // Settle after impact
    setTimeout(() => {
      if (logoRef.current) {
        logoRef.current.style.transform = 'translateX(0px) rotateZ(0deg)';
        logoRef.current.style.transition = 'transform 0.3s ease-out';
      }
    }, 900);
  };

  // Auto-start entrance animation on mount
  useEffect(() => {
    const timer = setTimeout(() => startEntrance(), 1000);
    return () => clearTimeout(timer);
  }, []);

  const pillVariants = {
    top: {
      backgroundColor: 'rgba(17, 24, 39, 0.3)',
      backdropFilter: 'blur(18px)',
      borderColor: 'rgba(35, 34, 58, 0.6)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
    },
    scrolled: {
      backgroundColor: 'rgba(17, 24, 39, 0.3)',
      backdropFilter: 'blur(18px)',
      borderColor: 'rgba(35, 34, 58, 0.6)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
    },
  };

  // Carrot always follows hovered nav item, falls back to active
  const carrotTargetId = hoveredId || activeId;

  // Flyout dynamic positioning
  const [flyoutPos, setFlyoutPos] = useState({ top: 0, left: 0 });
  useLayoutEffect(() => {
    if (flyoutOpen && triggerRef.current) {
      const activeText = navTextRefs.current[flyoutOpen];
      if (activeText) {
        const textRect = activeText.getBoundingClientRect();
        const pillRect = triggerRef.current?.parentElement?.parentElement?.getBoundingClientRect();
        if (pillRect) {
          setFlyoutPos({ top: pillRect.bottom + 16, left: textRect.left });
        }
      }
    }
  }, [flyoutOpen]);

  // Clear any pending timeouts
  const clearHoverTimeout = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = undefined;
    }
  };

  // Nav item handlers with improved timing
  const handleNavItemEnter = (itemId: string) => {
    console.log('Hover enter:', itemId);
    clearHoverTimeout();
    setHoveredId(itemId);
    setFlyoutOpen(itemId);
  };

  const handleNavItemLeave = () => {
    console.log('Hover leave');
    hoverTimeout.current = setTimeout(() => {
      setFlyoutOpen(null);
      setHoveredId(null);
    }, 150);
  };

  // Flyout handlers
  const handleFlyoutEnter = () => {
    clearHoverTimeout();
  };

  const handleFlyoutLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setFlyoutOpen(null);
      setHoveredId(null);
    }, 100);
  };

  // Helper function to get items for a specific menu
  const getMenuItems = (menuId: string) => {
    const menuItem = NAV_ITEMS.find(item => item.name.toLowerCase() === menuId);
    return menuItem?.items || [];
  };

  return (
    <>
      <header
        className="fixed top-4 inset-x-0 h-16 z-50 max-w-7xl mx-auto px-4 md:px-8"
        style={{
          transform: 'none',
          filter: 'none',
          isolation: 'auto'
        }}
      >
        {/* Logo on the far left with crash animation */}
        <motion.div 
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2"
          animate={{
            scale: mobileMenuOpen ? 0.7 : 1,
            y: mobileMenuOpen ? -8 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <a href="/" className="block">
            <div
              ref={logoRef}
              className={`cursor-pointer select-none ${mobileMenuOpen ? 'cursor-pointer' : 'cursor-default'} md:cursor-pointer`}
              onClick={() => {
                startEntrance();
                mobileMenuOpen && setMobileMenuOpen(false);
              }}
              style={{
                transformOrigin: 'right bottom',
                transform: 'translateX(-200px) rotateZ(0deg)',
                transition: 'none',
                opacity: '0'
              }}
            >
              <Image 
                src="/PassengerOS_Logo_site.PNG" 
                alt="PassengerOS Logo" 
                width={160} 
                height={40} 
                priority 
                className="select-none" 
              />
            </div>
          </a>
          
          {/* Mobile menu indicator */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ delay: 0.2, duration: 0.2 }}
                className="md:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-violet-300 font-medium"
              >
                tap to close
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="relative flex items-center gap-6 rounded-full px-8 py-3 border"
            variants={pillVariants}
            animate={isScrolled ? 'scrolled' : 'top'}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ul className="flex items-center relative z-10 min-h-[48px]">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  ref={el => {
                    alignBoxRefs.current[item.id] = el;
                    if (!triggerRef.current) triggerRef.current = el;
                  }}
                  className="relative flex items-center justify-center"
                  style={{ minWidth: 80, minHeight: 44 }}
                >
                  <button
                    className={`relative z-10 transition-all duration-200 font-medium flex items-center justify-center text-lg w-full h-full ${
                      activeId === item.id 
                        ? 'text-white drop-shadow-[0_0_15px_rgba(139,92,246,0.7)] hover:text-white hover:drop-shadow-[0_0_30px_rgba(255,255,255,1)] hover:font-bold hover:bg-red-500/50 hover:rounded-lg' 
                        : 'text-[#b3b3b3] hover:text-white hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                    }`}
                    type="button"
                    onMouseEnter={() => handleNavItemEnter(item.id)}
                    onMouseLeave={() => handleNavItemLeave()}
                    style={{
                      lineHeight: 1.2,
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '12px 20px'
                    }}
                    tabIndex={0}
                  >
                    <span
                      ref={el => { navTextRefs.current[item.id] = el; }}
                      className="nav-text"
                      style={{display: 'inline-block'}}
                    >
                      {item.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {/* Clean Carrot indicator */}
            <AnimatePresence>
              {carrotTargetId && (
                <motion.div
                  key="carrot"
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    x: (() => {
                      const alignBox = navTextRefs.current[carrotTargetId];
                      const pill = triggerRef.current?.parentElement?.parentElement;
                      if (alignBox && pill) {
                        const { left: boxLeft, width: boxWidth } = alignBox.getBoundingClientRect();
                        const { left: pillLeft } = pill.getBoundingClientRect();
                        return boxLeft - pillLeft + boxWidth / 2 - 8;
                      } else if (pill) {
                        return pill.offsetWidth / 2 - 8;
                      }
                      return 0;
                    })(),
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 35,
                    duration: 0.3
                  }}
                  className="pointer-events-none absolute"
                  style={{ zIndex: 20, top: '100%', left: 0, marginTop: 2 }}
                  onAnimationComplete={() => {
                    // No flash on arrival - removed completely
                  }}
                >
                  <motion.div
                    animate={{
                      borderBottomColor: '#8b5cf6',
                      filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.4))'
                    }}
                    transition={{ 
                      duration: 0.1,
                      ease: "easeInOut"
                    }}
                    className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8"
                    style={{ 
                      borderBottomColor: '#8b5cf6',
                      filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.4))'
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </nav>

        {/* Mobile Hamburger Menu with enhanced animations */}
        <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2">
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-violet-300 transition-colors relative"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <motion.span 
                className="block h-0.5 w-6 bg-current origin-center"
                animate={{
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 1 : -3
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.span 
                className="block h-0.5 w-6 bg-current origin-center"
                animate={{
                  opacity: mobileMenuOpen ? 0 : 1,
                  scale: mobileMenuOpen ? 0 : 1
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="block h-0.5 w-6 bg-current origin-center"
                animate={{
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -1 : 3
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </motion.button>
        </div>

        {/* Desktop Join Waitlist Button */}
        <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2">
          <button className="px-6 py-3 bg-violet-600 text-white font-semibold shadow-lg shadow-violet-600/50 hover:bg-violet-500 rounded-full text-base transition-colors drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]">
            Join Waitlist
          </button>
        </div>
      </header>
      {/* Flyout rendered outside the navbar's stacking context */}
      <AnimatePresence>
        {flyoutOpen && (
          <>
            {/* Invisible bridge to prevent gaps */}
            <div
              className="fixed pointer-events-auto"
              style={{
                left: `calc(${flyoutPos.left}px - 3rem)`,
                top: flyoutPos.top - 20,
                width: '8rem',
                height: '20px',
                zIndex: 9998,
              }}
              onMouseEnter={handleFlyoutEnter}
              onMouseLeave={handleFlyoutLeave}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.22 }}
              className="rounded-[2rem] px-6 py-4 shadow-lg shadow-black/20 border border-[#23223a]/60 backdrop-blur-2xl bg-[#111827]/30"
              style={{
                boxShadow: 'inset 0 1.5px 8px 0 rgba(120,120,180,0.10)',
                position: 'fixed',
                left: `calc(${flyoutPos.left}px - 2.5rem)`,
                top: flyoutPos.top,
                transform: 'none',
                backdropFilter: 'blur(18px)',
                zIndex: 9999,
                minWidth: '200px'
              }}
              onMouseEnter={handleFlyoutEnter}
              onMouseLeave={handleFlyoutLeave}
            >
              <div className="space-y-3">
                {getMenuItems(flyoutOpen).map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-white hover:text-violet-300 transition-colors py-2 px-3 rounded-lg hover:bg-violet-500/10"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex flex-col items-center justify-center min-h-screen px-6"
              onClick={e => e.stopPropagation()}
            >
              {/* Mobile Navigation Items */}
              <nav className="w-full max-w-sm">
                <ul className="space-y-8">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                      className="text-center"
                    >
                      <button
                        onClick={() => {
                          setActiveFlyout(activeFlyout === item.id ? null : item.id);
                        }}
                        className="w-full py-4 px-6 text-xl font-medium text-white hover:text-violet-300 transition-colors rounded-lg border-2 border-violet-500/20 hover:border-violet-500/50 hover:bg-violet-500/10"
                      >
                        {item.name}
                      </button>
                      
                      {/* Mobile Flyout Content */}
                      <AnimatePresence>
                        {activeFlyout === item.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 overflow-hidden"
                          >
                            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-violet-500/20">
                              <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white mb-4">{item.name}</h3>
                                <div className="grid gap-3">
                                  {getMenuItems(item.id).map((subItem) => (
                                    <a
                                      key={subItem.name}
                                      href={subItem.href}
                                      className="w-full text-left py-3 px-4 rounded-lg border-2 border-violet-500/30 text-gray-300 hover:border-violet-500 hover:text-white hover:bg-violet-500/10 transition-all duration-200"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {subItem.name}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Join Waitlist Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="mt-12 w-full max-w-sm"
              >
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-4 px-6 bg-violet-600 text-white font-semibold rounded-lg shadow-lg shadow-violet-600/30 hover:bg-violet-500 transition-colors text-lg"
                >
                  Join Waitlist
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
