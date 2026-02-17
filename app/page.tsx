'use client'

import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import Navbar from '@/components/Navbar'
import FerrariScrollCanvas from '@/components/FerrariScrollCanvas'
import FerrariExperience from '@/components/FerrariExperience'
import TechnicalSpecifications from '@/components/TechnicalSpecifications'

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
        <TechnicalSpecifications />
      </div>
    </main>
  )
}
