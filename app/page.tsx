'use client'

import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import Navbar from '@/components/Navbar'
import FerrariScrollCanvas from '@/components/FerrariScrollCanvas'
import FerrariExperience from '@/components/FerrariExperience'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Configuration
  const TOTAL_FRAMES = 240
  const IMG_FOLDER = '/images/FerrariFrames'

  return (
    <main className="bg-deep-black min-h-screen text-pure-white selection:bg-accent-red selection:text-pure-white">
      <Navbar />

      {/* Master Scroll Container - 500vh height for long scroll interaction */}
      <section ref={containerRef} className="h-[500vh] relative">

        {/* Sticky Viewport - The "Screen" that stays fixed */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-deep-black">

          {/* Layer 1: The Canvas (Background) */}
          <div className="absolute inset-0 z-0">
            <FerrariScrollCanvas
              scrollYProgress={scrollYProgress}
              totalFrames={TOTAL_FRAMES}
              imageFolderPath={IMG_FOLDER}
            />
          </div>

          {/* Layer 2: The Experience (HUD Overlay) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <FerrariExperience scrollYProgress={scrollYProgress} />
          </div>

          {/* Optional: Vignette or Gradient Overlays */}
          <div className="absolute inset-0 z-20 pointer-events-none bg-radial-gradient from-transparent to-black/40" />
        </div>

      </section>

      {/* Post-Scroll Content (Footer / Detailed Specs) */}
      <div className="relative z-30 bg-deep-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-16 text-center">TECHNICAL SPECIFICATIONS</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              { label: "Engine Type", value: "65° V12" },
              { label: "Displacement", value: "6262 cc" },
              { label: "Max Power", value: "800 cv @ 9000 rpm" },
              { label: "Max Torque", value: "700 Nm @ 6750 rpm" },
              { label: "Hybrid System", value: "HY-KERS" },
              { label: "Total Power", value: "963 cv" },
              { label: "Max Speed", value: "> 350 km/h" },
              { label: "0-100 km/h", value: "< 3 sec" },
              { label: "0-200 km/h", value: "< 7 sec" },
            ].map((item, i) => (
              <div key={i} className="bg-deep-black p-12 hover:bg-white/5 transition-colors group">
                <span className="block text-accent-red text-xs tracking-widest uppercase mb-2 font-rajdhani">{item.label}</span>
                <span className="block text-2xl font-orbitron font-medium group-hover:text-white transition-colors text-gray-300">{item.value}</span>
              </div>
            ))}
          </div>

          <footer className="mt-32 border-t border-white/5 pt-12 text-center text-gray-600 font-rajdhani text-sm uppercase tracking-widest">
            Ferrari LaFerrari Nero Spec Concept © 2026. Not affiliated with Ferrari S.p.A.
          </footer>
        </div>
      </div>
    </main>
  )
}
