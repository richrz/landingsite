'use client'

import { motion } from 'framer-motion'

interface CardProps {
  title: string
  icon: string
  children: React.ReactNode
  href?: string
}

const Card = ({ title, icon, children, href }: CardProps) => {
  const cardContent = (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-violet-600/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-violet-600/30 transition-colors">
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="text-white/70 leading-relaxed">
        {children}
      </div>
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {cardContent}
      </a>
    )
  }

  return cardContent
}

export default function AudienceCards() {
  return (
    <section className="py-24 px-6" id="audiences">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
      >
        Built for Everyone in the Ride
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card title="Drivers" icon="🚗" href="/drivers">
            <p className="text-white/70">
              Earn passive income with no extra effort. Just drive — we handle the rest.
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card title="Advertisers" icon="📢" href="/advertisers">
            <p className="text-white/70">
              Reach geo-targeted passengers with engaging content and trackable results.
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card title="Passengers" icon="📶">
            <p className="text-white/70">
              Enjoy free Wi-Fi, infotainment, and perks during your ride.
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card title="Powered by AI" icon="✨">
            <p className="text-white/70">
              Built on open tech like Flowise & n8n — fast, smart, and self-hosted.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  )
} 