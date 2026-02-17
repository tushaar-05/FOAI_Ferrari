'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

/* 
  Detailed Technical Specifications 
  Source: Official Ferrari LaFerrari technical sheet & reputable automotive databases.
*/
const categories = {
  engine: {
    title: "V12 Hybrid PowerUnit",
    items: [
      { label: "Check", value: "System OK", detail: "Status" }, // Decorative
      { label: "Engine Type", value: "65° V12", detail: "Naturally Aspirated" },
      { label: "Displacement", value: "6262 cc", detail: "Compression 13.5:1" },
      { label: "Max Power (ICE)", value: "800 cv", detail: "@ 9000 rpm" },
      { label: "Max Power (Hybrid)", value: "163 cv", detail: "F1 KERS System" },
      { label: "Total Power", value: "963 cv", detail: "Combined Output" },
      { label: "Max Torque", value: "> 900 Nm", detail: "Combined System" },
      { label: "Rev Limit", value: "9250 rpm", detail: "Redline" },
    ]
  },
  performance: {
    title: "Track Performance",
    items: [
      { label: "Max Speed", value: "> 350 km/h", detail: "Top Speed" },
      { label: "0-100 km/h", value: "< 3.0 sec", detail: "Acceleration" },
      { label: "0-200 km/h", value: "< 7.0 sec", detail: "Acceleration" },
      { label: "0-300 km/h", value: "15.0 sec", detail: "Acceleration" },
      { label: "Fiorano Lap", value: "1'19\"70", detail: "Track Record" },
      { label: "Braking 100-0", value: "30 m", detail: "Stopping Distance" },
      { label: "Braking 200-0", value: "115 m", detail: "Stopping Distance" },
      { label: "Aerodynamics", value: "Active", detail: "Drag Coefficient 0.30" },
    ]
  },
  dimensions: {
    title: "Dimensions & Weight",
    items: [
      { label: "Length", value: "4702 mm", detail: "Overall Length" },
      { label: "Width", value: "1992 mm", detail: "Mirror to Mirror" },
      { label: "Height", value: "1116 mm", detail: "Overall Height" },
      { label: "Wheelbase", value: "2650 mm", detail: "Axle to Axle" },
      { label: "Dry Weight", value: "1255 kg", detail: "Lightweight Config" },
      { label: "Distribution", value: "41% - 59%", detail: "Front - Rear" },
      { label: "Fuel Tank", value: "86 Liters", detail: "Capacity" },
      { label: "Boot Capacity", value: "40 Liters", detail: "Storage" },
    ]
  },
  chassis: {
    title: "Chassis & Systems",
    items: [
      { label: "Chassis", value: "Carbon Fiber", detail: "T800 / T1000 Monocoque" },
      { label: "Suspension", value: "Magnetorheological", detail: "SCM-E Frs Damping" },
      { label: "Brakes (Front)", value: "398 mm", detail: "Carbon Ceramic" },
      { label: "Brakes (Rear)", value: "380 mm", detail: "Carbon Ceramic" },
      { label: "Tyres (Front)", value: "265/30 ZR19", detail: "Pirelli P-Zero" },
      { label: "Tyres (Rear)", value: "345/30 ZR20", detail: "Pirelli P-Zero" },
      { label: "Electronics", value: "EF1-Trac", detail: "F1 Traction Control" },
      { label: "Transmission", value: "7-Speed F1 DCT", detail: "Dual Clutch" },
    ]
  }
}

type CategoryKey = keyof typeof categories

export default function TechnicalSpecifications() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('engine')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-32 bg-deep-black overflow-hidden select-none min-h-screen flex flex-col justify-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 via-deep-black to-deep-black pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8"
        >
          <div>
            <h2 className="text-4xl md:text-7xl font-orbitron font-bold tracking-tighter text-white mb-2">
              TECHNICAL <span className="text-accent-red">DATA</span>
            </h2>
            <p className="text-white/40 font-rajdhani tracking-[0.2em] uppercase text-sm md:text-base">
              System Analysis • {categories[activeCategory].title}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 md:mt-0">
            {(Object.keys(categories) as CategoryKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`relative px-6 py-3 font-orbitron text-sm tracking-widest uppercase transition-all duration-300 border border-transparent
                  ${activeCategory === key
                    ? 'text-accent-red border-accent-red/50 bg-accent-red/10'
                    : 'text-white/40 hover:text-white hover:border-white/20'
                  }`}
              >
                {key}
                {activeCategory === key && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-red shadow-[0_0_10px_rgba(255,30,30,0.8)]"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Specs Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {categories[activeCategory].items.map((item, i) => (
              <motion.div
                key={`${activeCategory}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative p-6 h-40 border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden hover:bg-white/[0.04] transition-colors duration-300"
              >
                {/* Decoration: Corner Markers */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-accent-red/50 transition-colors" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-accent-red/50 transition-colors" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 group-hover:border-accent-red/50 transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-accent-red/50 transition-colors" />

                {/* Content */}
                <div className="h-full flex flex-col justify-between relative z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-rajdhani font-bold text-accent-red tracking-widest uppercase opacity-80">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-white/20 font-mono">
                      0{i + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl md:text-3xl font-orbitron font-medium text-white group-hover:text-accent-red transition-colors duration-300">
                      {item.value}
                    </h3>
                  </div>

                  <div className="w-full h-px bg-white/10 mt-auto mb-2 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-accent-red w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out`} />
                  </div>

                  <p className="text-white/30 text-xs font-rajdhani tracking-wider uppercase group-hover:text-white/60 transition-colors">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-between items-center text-white/20 font-rajdhani text-xs uppercase tracking-wider border-t border-white/5 pt-6"
        >
          <p>Scuderia Ferrari Technology Transfer</p>
          <p>Specification Sheet v.2026</p>
        </motion.div>

      </div>
    </section>
  )
}
