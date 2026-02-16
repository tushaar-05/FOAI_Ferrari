'use client'

import { useRef, useEffect, useState } from 'react'
import { useMotionValueEvent, MotionValue } from 'framer-motion'

interface FerrariScrollCanvasProps {
  scrollYProgress: MotionValue<number>
  totalFrames: number
  imageFolderPath: string
}

export default function FerrariScrollCanvas({
  scrollYProgress,
  totalFrames,
  imageFolderPath,
}: FerrariScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [loaded, setLoaded] = useState(false)
  const currentFrameRef = useRef(0)

  // 1. Preload Images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = []
    let loadedCount = 0

    // Load all frames
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image()
      const frameNumber = String(i + 1).padStart(3, '0') // 1-indexed naming
      img.src = `${imageFolderPath}/ezgif-frame-${frameNumber}.jpg`

      img.onload = () => {
        loadedImages[i] = img
        loadedCount++
        if (loadedCount === totalFrames) {
          setImages(loadedImages)
          setLoaded(true)
        }
      }
    }
  }, [totalFrames, imageFolderPath])

  // 2. Handle Drawing Logic
  const drawFrame = (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate Scale (Contain)
    const hRatio = canvas.width / img.width
    const vRatio = canvas.height / img.height
    const ratio = Math.min(hRatio, vRatio) // Contain logic

    // If you want to use COVER to fill screen, use Math.max(hRatio, vRatio)
    // The user asked for "Contain logic", but also "Center the car".
    // 50KB JPEGs might look pixelated on 4K if scaled up too much with "Cover".
    // "Contain" is safer for sharpness.

    const centerShift_x = (canvas.width - img.width * ratio) / 2
    const centerShift_y = (canvas.height - img.height * ratio) / 2

    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    )
  }

  // 3. Render Loop synced to Scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!loaded || !canvasRef.current || images.length === 0) return

    // Map 0-1 to 0-(totalFrames-1)
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.floor(latest * totalFrames)
    )

    // Only redraw if frame changes
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex
      const img = images[frameIndex]
      if (img) drawFrame(canvasRef.current, img)
    }
  })

  // 4. Handle Resize & Retina Display
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // Set canvas internal resolution to match device pixel ratio for sharpness
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio

        // Force redraw current frame after resize
        if (loaded && images[currentFrameRef.current]) {
          drawFrame(canvasRef.current, images[currentFrameRef.current])
        }
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [loaded, images])

  // Draw first frame when loaded
  useEffect(() => {
    if (loaded && images[0] && canvasRef.current) {
      drawFrame(canvasRef.current, images[0])
    }
  }, [loaded, images])

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full object-contain transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
