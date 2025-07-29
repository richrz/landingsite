'use client'

import { motion } from 'framer-motion'

export default function FooterCTA() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-[#1f2937] to-[#0f172a] text-center text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 via-transparent to-violet-600/5"></div>
      
      <div className="relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold mb-2"
        >
          Live Beta Launch: Winter 2025
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/70 text-lg max-w-xl mx-auto mb-4 leading-relaxed"
        >
          We're launching in Los Angeles, Seattle, Tampa, and Colorado Springs. Join early and get exclusive bonuses and swag.
        </motion.p>
        
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-violet-600 text-white font-semibold rounded-full shadow-lg shadow-violet-600/50 hover:bg-violet-500 transition-all duration-300 drop-shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:drop-shadow-[0_0_30px_rgba(139,92,246,0.8)] text-lg"
        >
          Join the Beta
        </motion.button>
      </div>
    </section>
  )
} 