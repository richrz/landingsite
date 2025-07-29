'use client'

import PlasmaWave from '../components/PlasmaWave';
import HeroRotator from '../components/HeroRotator';
import AudienceCards from '../components/AudienceCards';
import BetaCityBanner from '../components/BetaCityBanner';
import TechStack from '../components/TechStack';
import FooterCTA from '../components/FooterCTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
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
      
      {/* Hero Rotator */}
      <div className="relative z-10">
        <HeroRotator />
      </div>

      {/* Audience Cards */}
      <div className="relative z-10">
        <AudienceCards />
      </div>

      {/* Beta City Banner */}
      <div className="relative z-10">
        <BetaCityBanner />
      </div>

      {/* Tech Stack */}
      <div className="relative z-10">
        <TechStack />
      </div>

      {/* Footer CTA */}
      <div className="relative z-10">
        <FooterCTA />
      </div>
    </div>
  )
} 