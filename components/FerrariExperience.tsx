'use client'

import { motion, useTransform, MotionValue } from 'framer-motion'
import { EXPERIENCE_CONTENT } from '@/data/carData'

interface FerrariExperienceProps {
  scrollYProgress: MotionValue<number>
}

export default function FerrariExperience({ scrollYProgress }: FerrariExperienceProps) {
  // Phase 1: Hero (0% - 33%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.33], [0, -50])
  const heroScale = useTransform(scrollYProgress, [0, 0.33], [1, 0.95])

  // Phase 2: Design (33% - 66%)
  const designOpacity = useTransform(scrollYProgress, [0.33, 0.4, 0.6, 0.66], [0, 1, 1, 0])
  const designY = useTransform(scrollYProgress, [0.33, 0.4], [50, 0])

  // Phase 3: Engine (66% - 100%)
  const engineOpacity = useTransform(scrollYProgress, [0.66, 0.75, 1], [0, 1, 1])
  const engineX = useTransform(scrollYProgress, [0.66, 0.75], [50, 0])

  return (
    <div className="absolute inset-0 pointer-events-none z-10 w-full h-full overflow-hidden">

      {/* HERO SECTION */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
        className="absolute flex flex-col justify-center h-full left-8 md:left-24 max-w-2xl"
      >
        <h1 className="text-6xl md:text-[8rem] leading-none font-black font-orbitron tracking-tighter mb-6 text-pure-white drop-shadow-2xl">
          {EXPERIENCE_CONTENT.hero.title}
        </h1>
        <div className="h-px w-32 bg-accent-red mb-8 origin-left" />
        <div className="flex items-center space-x-8">
          <span className="text-2xl md:text-3xl font-rajdhani font-light tracking-widest text-gray-400">
            {EXPERIENCE_CONTENT.hero.price}
          </span>
          <button className="pointer-events-auto px-8 py-3 border border-white/20 text-pure-white font-rajdhani tracking-[0.2em] text-sm hover:bg-accent-red hover:border-accent-red transition-all duration-300 uppercase backdrop-blur-sm">
            {EXPERIENCE_CONTENT.hero.cta}
          </button>
        </div>
      </motion.div>

      {/* DESIGN SECTION */}
      <motion.div
        style={{ opacity: designOpacity, y: designY }}
        className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-32 max-w-4xl"
      >
        <span className="text-accent-red font-rajdhani tracking-widest text-sm mb-4 uppercase">Architecture</span>
        <h2 className="text-5xl md:text-7xl font-bold font-orbitron mb-10 text-pure-white">
          {EXPERIENCE_CONTENT.design.title}
        </h2>
        <div className="border-l border-white/10 pl-8 space-y-6">
          <p className="text-xl md:text-3xl font-rajdhani font-light text-gray-200 leading-relaxed">
            {EXPERIENCE_CONTENT.design.text1}
          </p>
          <p className="text-xl md:text-3xl font-rajdhani font-light text-gray-400 leading-relaxed">
            {EXPERIENCE_CONTENT.design.text2}
          </p>
        </div>
      </motion.div>

      {/* ENGINE SECTION */}
      <motion.div
        style={{ opacity: engineOpacity, x: engineX }}
        className="absolute inset-0 flex flex-col justify-center items-end px-8 md:px-32 pointer-events-none"
      >
        <div className="text-right">
          <span className="text-accent-red font-rajdhani tracking-widest text-sm mb-4 uppercase block">Performance</span>
          <h2 className="text-5xl md:text-7xl font-bold font-orbitron mb-12 text-pure-white">
            {EXPERIENCE_CONTENT.engine.title}
          </h2>

          <div className="flex flex-col space-y-12 items-end">
            {EXPERIENCE_CONTENT.engine.specs.map((spec, i) => (
              <div key={i} className="flex flex-col items-end">
                <span className="text-sm font-rajdhani text-gray-500 tracking-[0.2em] mb-2 uppercase">{spec.label}</span>
                <span className="text-4xl md:text-6xl font-orbitron font-bold text-pure-white tracking-tight border-b border-transparent hover:border-accent-red transition-colors duration-300">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  )
}
