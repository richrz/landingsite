'use client'

import { motion } from 'framer-motion'

export default function TechStack() {
  return (
    <section className="py-24 px-6" id="tech">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-white text-center mb-6"
      >
        Trusted Tech. Built to Scale.
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-white/70 max-w-2xl mx-auto text-center mb-12 text-lg leading-relaxed"
      >
        PassengerOS runs on industry-proven platforms — ensuring speed, privacy, and long-term scalability.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <img src="/logos/openai.svg" alt="OpenAI" className="h-10 mb-4" />
          <h3 className="text-white font-semibold text-lg mb-2">OpenAI</h3>
          <p className="text-white/70 text-sm">State-of-the-art AI models that power intelligent passenger interaction.</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <img src="/logos/google.svg" alt="Google" className="h-10 mb-4" />
          <h3 className="text-white font-semibold text-lg mb-2">Google</h3>
          <p className="text-white/70 text-sm">Gemini AI and Android help us deliver seamless onboard experiences.</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <img src="/logos/cloudflare.svg" alt="Cloudflare" className="h-10 mb-4" />
          <h3 className="text-white font-semibold text-lg mb-2">Cloudflare</h3>
          <p className="text-white/70 text-sm">Global edge delivery and network protection you can trust.</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <img src="/logos/vercel.svg" alt="Vercel" className="h-8 mb-4" />
          <h3 className="text-white font-semibold text-lg mb-2">Vercel</h3>
          <p className="text-white/70 text-sm">Our website and web apps are built for speed with Vercel's frontend platform.</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <img src="/logos/android.svg" alt="Android" className="h-10 mb-4" />
          <h3 className="text-white font-semibold text-lg mb-2">Android</h3>
          <p className="text-white/70 text-sm">The backbone of our in-car experience, optimized for reliability and scale.</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <img src="/logos/opensource.svg" alt="Open Source" className="h-10 mb-4" />
          <h3 className="text-white font-semibold text-lg mb-2">Open Source</h3>
          <p className="text-white/70 text-sm">Transparency, extensibility, and community-driven development — built in.</p>
        </motion.div>
      </motion.div>
    </section>
  )
} 