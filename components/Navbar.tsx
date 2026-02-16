'use client'

import { useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !scrolled) setScrolled(true)
    if (latest <= 50 && scrolled) setScrolled(false)
  })

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out flex justify-between items-center px-6 md:px-12 py-6 ${scrolled ? 'backdrop-blur-md bg-deep-black/30 border-b border-white/5' : 'bg-transparent'}`}>

      {/* Logo */}
      <div className="text-pure-white font-orbitron tracking-[0.2em] text-lg font-bold select-none cursor-pointer">
        FERRARI
      </div>

      {/* Action */}
      <button className="
        px-8 py-2 
        border border-accent-red 
        text-pure-white 
        font-rajdhani font-medium tracking-widest text-sm 
        hover:bg-accent-red hover:text-white 
        transition-all duration-300
        uppercase
      ">
        Inquire
      </button>
    </nav>
  )
}
