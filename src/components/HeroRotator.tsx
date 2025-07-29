'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const heroContent = [
  {
    headline: 'Drive Once. Get Paid Twice.',
    subtitle: 'PassengerOS turns idle rides into a second income stream — hands-free, fully automated, and powered by AI.'
  },
  {
    headline: 'While You Drive, We Hustle.',
    subtitle: 'Your car becomes a revenue-generating asset. We handle the advertising, you collect the earnings.'
  },
  {
    headline: 'The Operating System for the Passenger Economy',
    subtitle: 'Join the future of transportation where every ride pays dividends.'
  },
]

export default function HeroRotator() {
  const [index, setIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640)
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  useEffect(() => {
    // Always run the carousel, regardless of mobile/desktop
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroContent.length)
    }, 8000)
    
    return () => clearInterval(interval)
  }, []) // Empty dependency array so it runs once on mount

  const currentContent = heroContent[index]

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="relative mb-8">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentContent.headline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: isMobile ? 0.3 : 0.5, 
              ease: "easeInOut" 
            }}
            className="text-white text-4xl sm:text-5xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight"
          >
            {currentContent.headline}
          </motion.h1>
        </AnimatePresence>
      </div>

      <div className="relative mb-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentContent.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: isMobile ? 0.3 : 0.5, 
              ease: "easeInOut", 
              delay: isMobile ? 0 : 0.1 
            }}
            className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            {currentContent.subtitle}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button className="px-6 sm:px-8 py-3 sm:py-4 bg-violet-600 text-white font-semibold rounded-full shadow-lg shadow-violet-600/50 hover:bg-violet-500 transition-colors drop-shadow-[0_0_20px_rgba(139,92,246,0.6)] text-sm sm:text-base">
          Join the Beta
        </button>
        <button className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all text-sm sm:text-base">
          I'm a Brand
        </button>
      </div>
    </section>
  )
} 