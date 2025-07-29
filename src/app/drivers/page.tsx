'use client'

import { motion } from 'framer-motion'
import PlasmaWave from '../../components/PlasmaWave'

interface CardProps {
  title: string
  icon: string
  children: React.ReactNode
}

const Card = ({ title, icon, children }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-violet-600/20 rounded-xl flex items-center justify-center mr-4">
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="text-white/70 leading-relaxed">{children}</div>
    </motion.div>
  )
}

export default function DriversPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Purple radial gradient glow */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Plasma Wave Background Effect */}
      <div className="absolute inset-0 z-0">
        <PlasmaWave />
      </div>

      {/* Section 1: Hero Header */}
      <section className="pt-64 pb-24 px-6 text-center text-white relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Drive Once. Get Paid Twice.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          You drive. We handle the rest. PassengerOS adds a second income stream to your rides — no pitching, no hustle.
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-4 bg-violet-600 text-white font-semibold rounded-full shadow-lg shadow-violet-600/50 hover:bg-violet-500 transition-all duration-300 drop-shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:drop-shadow-[0_0_30px_rgba(139,92,246,0.8)] text-lg"
        >
          Become a Beta Driver
        </motion.button>
      </section>

      {/* Section 2: Explainer Cards */}
      <section className="py-20 px-6 bg-white/5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card title="Extra Income" icon="">
            <div>Earn $200–$300/month in passive income from in-car ads and content. No extra work.</div>
          </Card>

          <Card title="Zero Hassle" icon="⚡">
            <div>Set it and forget it. Our AI handles passenger questions while you focus on driving.</div>
          </Card>

          <Card title="Better Ratings" icon="⭐">
            <div>Happy passengers = better reviews. Riders love the interactive content and perks.</div>
          </Card>

          <Card title="No Contracts" icon="">
            <div>Join for free, opt out anytime. We provide the tablet and support during beta.</div>
          </Card>
        </div>
      </section>

      {/* Section 3: Smart Tip Nudges (for Introverts) */}
      <section className="py-20 px-6 bg-white/5 text-white text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Introvert? Let Our AI Do the Talking.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/70 text-lg max-w-2xl mx-auto"
        >
          Hate awkwardly asking for tips? Same. That's why PassengerOS occasionally drops a light, funny AI message like:
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="italic text-white mt-4 text-lg max-w-xl mx-auto"
        >
          "Don't forget — your driver has excellent taste in music <em>and</em> accepts tips!"
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/70 text-lg max-w-2xl mx-auto mt-6"
        >
          Our research shows drivers see up to a <span className="text-white font-semibold">38% increase in tips</span> when this feature is enabled — all without saying a word.
        </motion.p>
      </section>

      {/* Section 4: Beta City Callout */}
      <section className="py-16 px-6 text-center text-white relative z-10">
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
          Apply to Join the Beta
        </motion.button>
      </section>

      {/* Section 5: Driver Testimonials */}
      <section className="py-20 px-6 bg-white/5 text-white text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-8"
        >
          What Drivers Are Saying
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/15 transition-all duration-300"
          >
            <div className="text-white/80 text-lg italic leading-relaxed">
              "I didn't change a thing — just kept driving, and now I'm making an extra $250 a month. My dog has a better life than me."
            </div>
            <footer className="mt-4 text-white/50 font-medium">– Marcus B., Seattle</footer>
          </motion.blockquote>

          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/15 transition-all duration-300"
          >
            <div className="text-white/80 text-lg italic leading-relaxed">
              "My passengers love the little trivia game. One lady tipped me $20 just because she won a coupon for coffee. I love this thing."
            </div>
            <footer className="mt-4 text-white/50 font-medium">– Tanya L., Tampa</footer>
          </motion.blockquote>

          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/15 transition-all duration-300"
          >
            <div className="text-white/80 text-lg italic leading-relaxed">
              "No installs, no selling, no weird crypto. Just easy money on top of what I already earn. Finally, tech that respects my hustle."
            </div>
            <footer className="mt-4 text-white/50 font-medium">– Rafael M., Los Angeles</footer>
          </motion.blockquote>
        </div>
      </section>
    </div>
  )
} 