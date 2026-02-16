import type { Metadata } from 'next'
import { Orbitron, Rajdhani } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['600', '700'],
  display: 'swap',
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  variable: '--font-rajdhani',
  weight: ['500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ferrari LaFerrari — Nero Spec',
  description: 'The ultimate hybrid hypercar experience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} bg-deep-black text-pure-white antialiased overflow-x-hidden selection:bg-accent-red selection:text-pure-white`}
        style={{ backgroundColor: '#0b0b0d', color: '#f5f5f5' }}
      >
        {children}
      </body>
    </html>
  )
}
