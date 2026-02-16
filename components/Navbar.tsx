'use client'

import { useScroll, useMotionValueEvent, motion } from 'framer-motion'
import { useState } from 'react'

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !scrolled) setScrolled(true)
    if (latest <= 50 && scrolled) setScrolled(false)
  })

  const navLinks = ["Model", "Racing", "Sustainability", "Configurator"]

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out 
      ${scrolled ? 'backdrop-blur-xl bg-deep-black/60 border-b border-white/5 py-4' : 'bg-transparent py-8'}`}
    >
      <div className="max-w-[1920px] mx-auto px-8 md:px-16 flex justify-between items-center">

        {/* Left: Branding & Menu */}
        <div className="flex items-center space-x-12">
          {/* Logo */}
          <div className="text-pure-white font-orbitron tracking-[0.2em] text-xl font-bold select-none cursor-pointer flex items-center space-x-3 group">
            <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center group-hover:border-accent-red transition-colors duration-500">
              <div className="w-1 h-1 bg-accent-red rounded-full" />
            </div>
            <span>FERRARI</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-400 font-rajdhani text-sm uppercase tracking-widest hover:text-white transition-colors duration-300 relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-red transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex items-center space-x-2 text-xs font-rajdhani text-gray-500 tracking-widest">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>SYSTEM ACTIVE</span>
          </div>

          <button className="
            relative overflow-hidden group
            px-8 py-2.5 
            border border-white/20
            text-pure-white 
            font-rajdhani font-semibold tracking-[0.2em] text-xs 
            hover:border-accent-red
            transition-all duration-500
            uppercase
            backdrop-blur-sm
          ">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Inquire Now</span>
            <div className="absolute inset-0 bg-accent-red transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
          </button>
        </div>

      </div>
    </nav>
  )
}
