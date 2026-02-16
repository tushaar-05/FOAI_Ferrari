'use client'

import { motion, useTransform, MotionValue } from 'framer-motion'
import { EXPERIENCE_CONTENT } from '@/data/carData'

interface FerrariExperienceProps {
  scrollYProgress: MotionValue<number>
}

export default function FerrariExperience({ scrollYProgress }: FerrariExperienceProps) {
  // Phase 1: Hero (0% - 30%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.30], [1, 1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.30], [0, -50])
  const heroScale = useTransform(scrollYProgress, [0, 0.30], [1, 0.95])
  const heroDisplay = useTransform(scrollYProgress, (v: number) => v < 0.31 ? "flex" : "none")

  // Phase 2: Design (35% - 65%)
  const designOpacity = useTransform(scrollYProgress, [0.35, 0.40, 0.60, 0.65], [0, 1, 1, 0])
  const designY = useTransform(scrollYProgress, [0.35, 0.40], [50, 0])
  const designDisplay = useTransform(scrollYProgress, (v: number) => (v > 0.31 && v < 0.69) ? "flex" : "none")

  // Phase 3: Engine (70% - 100%)
  const engineOpacity = useTransform(scrollYProgress, [0.70, 0.75, 1], [0, 1, 1])
  const engineX = useTransform(scrollYProgress, [0.70, 0.75], [50, 0])
  const engineDisplay = useTransform(scrollYProgress, (v: number) => v > 0.69 ? "flex" : "none")

  return (
    <div className="absolute inset-0 pointer-events-none z-10 w-full h-full overflow-hidden">

      {/* HERO SECTION */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale, display: heroDisplay }}
        className="absolute flex flex-col justify-center h-full left-8 md:left-32 max-w-4xl pt-24"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex items-center space-x-4 mb-8"
        >
          <span className="px-3 py-1 border border-accent-red/50 text-accent-red text-[10px] tracking-[0.3em] font-rajdhani uppercase bg-accent-red/10">
            1 of 499
          </span>
          <span className="text-gray-500 text-xs tracking-[0.2em] font-rajdhani">
            MARANELLO, IT
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col mb-12"
        >
          <span className="text-6xl md:text-[8rem] leading-[0.9] font-black font-orbitron tracking-tighter text-pure-white mix-blend-difference block">
            {EXPERIENCE_CONTENT.hero.title}
          </span>
          <span className="text-transparent stroke-text text-[3.5rem] md:text-[5rem] leading-none font-light tracking-widest opacity-50 block mt-4">
            NERO SPEC
          </span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1.5, ease: "circOut" }}
          className="h-px w-64 bg-gradient-to-r from-accent-red to-transparent mb-12 origin-left"
        />

        {/* Price & CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12"
        >
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 tracking-widest mb-2 font-rajdhani">STARTING AT</span>
            <span className="text-3xl md:text-5xl font-rajdhani font-light text-pure-white tracking-wider">
              {EXPERIENCE_CONTENT.hero.price}
            </span>
          </div>

          <button className="
                pointer-events-auto 
                group relative overflow-hidden
                px-10 py-5
                bg-white/5 border border-white/10
                text-pure-white 
                font-orbitron tracking-[0.2em] text-xs font-bold
                hover:border-accent-red
                transition-all duration-500
                uppercase 
                backdrop-blur-md
            ">
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Configure
            </span>
            <div className="absolute inset-0 bg-pure-white transform -translate-x-full skew-x-12 group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-0 flex items-center space-x-4 animate-pulse"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gray-500 to-transparent" />
          <span className="text-[10px] text-gray-500 tracking-[0.4em] uppercase font-rajdhani rotate-90 origin-left translate-y-4">
            Scroll to Drive
          </span>
        </motion.div>
      </motion.div>

      {/* DESIGN SECTION */}
      <motion.div
        style={{ opacity: designOpacity, y: designY, display: designDisplay }}
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
        style={{ opacity: engineOpacity, x: engineX, display: engineDisplay }}
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
