'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const FIRST_COUNT = 120
const MID_COUNT = 120
const LAST_COUNT = 120
const TOTAL_FRAMES = FIRST_COUNT + MID_COUNT + LAST_COUNT // 360

function getFramePath(index: number): string {
  if (index < FIRST_COUNT) {
    return `/frames/first/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`
  } else if (index < FIRST_COUNT + MID_COUNT) {
    return `/frames/mid/ezgif-frame-${String(index - FIRST_COUNT + 1).padStart(3, '0')}.jpg`
  } else {
    return `/frames/last/ezgif-frame-${String(index - FIRST_COUNT - MID_COUNT + 1).padStart(3, '0')}.jpg`
  }
}

export default function HeroScroll() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null))
  const currentFrameRef = useRef(0)
  const [isReady, setIsReady] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    function getLogicalSize() {
      return {
        W: window.innerWidth,
        H: window.innerHeight,
        dpr: window.devicePixelRatio || 1,
      }
    }

    function drawFrame(frameIndex: number) {
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const { W, H, dpr } = getLogicalSize()
      const LW = canvas.width / dpr
      const LH = canvas.height / dpr

      const img = imagesRef.current[frameIndex]
      if (!img) return

      ctx.clearRect(0, 0, LW, LH)

      // Object-cover image draw
      const imgRatio = img.naturalWidth / img.naturalHeight
      const canvasRatio = LW / LH
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight
      if (imgRatio > canvasRatio) {
        sw = img.naturalHeight * canvasRatio
        sx = (img.naturalWidth - sw) / 2
      } else {
        sh = img.naturalWidth / canvasRatio
        sy = (img.naturalHeight - sh) / 2
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, LW, LH)

      // Radial vignette
      const cx = LW / 2
      const cy = LH / 2
      const grad = ctx.createRadialGradient(cx, cy, cy * 0.25, cx, cy, cy * 1.5)
      grad.addColorStop(0, 'rgba(0,0,0,0)')
      grad.addColorStop(0.6, 'rgba(0,0,0,0.2)')
      grad.addColorStop(1, 'rgba(0,0,0,0.72)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, LW, LH)

      // Left gradient for text legibility
      const leftGrad = ctx.createLinearGradient(0, 0, LW * 0.55, 0)
      leftGrad.addColorStop(0, 'rgba(0,0,0,0.55)')
      leftGrad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = leftGrad
      ctx.fillRect(0, 0, LW, LH)
    }

    function setupCanvas() {
      if (!canvas) return
      const { W, H, dpr } = getLogicalSize()
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      canvas.width = W * dpr
      canvas.height = H * dpr
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.scale(dpr, dpr)
      }
      drawFrame(currentFrameRef.current)
    }

    setupCanvas()
    window.addEventListener('resize', setupCanvas)

    let loaded = 0
    let cancelled = false

    function loadImage(index: number): Promise<void> {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          if (!cancelled) {
            imagesRef.current[index] = img
            loaded++
            setLoadProgress(loaded / TOTAL_FRAMES)
            if (loaded === 1) {
              setupCanvas()
            }
          }
          resolve()
        }
        img.onerror = () => resolve()
        img.src = getFramePath(index)
      })
    }

    async function loadAllFrames() {
      // Priority batch: first 60 frames (covers ~66% of scroll space for first phase)
      const priority = Array.from({ length: 60 }, (_, i) => loadImage(i))
      await Promise.all(priority)
      if (!cancelled) {
        setIsReady(true)
        drawFrame(0)
      }

      // Background: load remaining frames in 30-frame batches
      const BATCH = 30
      for (let i = 60; i < TOTAL_FRAMES; i += BATCH) {
        if (cancelled) break
        const end = Math.min(i + BATCH, TOTAL_FRAMES)
        const batch = Array.from({ length: end - i }, (_, j) => loadImage(i + j))
        await Promise.all(batch)
        // Yield to main thread between batches
        await new Promise((r) => setTimeout(r, 16))
      }
    }

    loadAllFrames()

    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const scrollY = window.scrollY
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight - window.innerHeight
      const progress = Math.min(Math.max((scrollY - sectionTop) / sectionHeight, 0), 1)

      setScrollProgress(progress)

      const frameIndex = Math.round(progress * (TOTAL_FRAMES - 1))
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex
        drawFrame(frameIndex)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelled = true
      window.removeEventListener('resize', setupCanvas)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const phase = scrollProgress < 0.33 ? 0 : scrollProgress < 0.66 ? 1 : 2

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading screen */}
        {!isReady && (
          <div className="absolute inset-0 z-30 bg-black flex flex-col items-center justify-center gap-6">
            <div
              className="font-black text-white"
              style={{ fontSize: '72px', fontWeight: 900, letterSpacing: '-0.06em', opacity: 0.08 }}
            >
              BMW
            </div>
            <div
              className="text-bmw-silver uppercase tracking-[0.2em]"
              style={{ fontSize: '11px', fontWeight: 300 }}
            >
              Loading Experience
            </div>
            <div
              className="relative overflow-hidden"
              style={{ width: '200px', height: '1px', background: 'rgba(255,255,255,0.1)' }}
            >
              <div
                className="absolute inset-y-0 left-0 transition-all duration-300"
                style={{ width: `${loadProgress * 100}%`, background: '#FF6B00' }}
              />
            </div>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 block"
          style={{ display: 'block' }}
        />

        {/* Hero overlay — pointer-events-none except buttons */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Ambient label top-left */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute top-24 left-8 text-bmw-silver uppercase"
            style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.2em' }}
          >
            The Ultimate Driving Machine
          </motion.div>

          {/* Main headline block — left side */}
          <div className="absolute left-[8%] top-1/2 -translate-y-1/2">
            {(['Pure', 'Precision', 'Engineered'] as const).map((word, i) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + i * 0.3,
                  duration: 0.9,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  fontSize: 'clamp(48px, 6.5vw, 88px)',
                  fontWeight: 800,
                  letterSpacing: '-0.05em',
                  lineHeight: 0.88,
                  display: 'block',
                  color: i === 1 ? 'transparent' : 'white',
                  WebkitTextStroke: i === 1 ? '1.5px rgba(255,107,0,0.75)' : undefined,
                }}
              >
                {word}
              </motion.div>
            ))}

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-6 text-bmw-silver"
              style={{ fontSize: '18px', fontWeight: 400, lineHeight: 1.65, maxWidth: '420px' }}
            >
              Zero compromise. Every detail refined for those who demand perfection.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="mt-8 flex gap-4 pointer-events-auto"
            >
              <motion.button
                className="text-black font-semibold"
                style={{
                  fontSize: '15px',
                  background: '#FF6B00',
                  borderRadius: '100px',
                  padding: '14px 28px',
                }}
                whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}
                whileTap={{ scale: 0.97 }}
              >
                Configure Your BMW
              </motion.button>
              <motion.button
                className="text-white flex items-center gap-2"
                style={{
                  fontSize: '15px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '100px',
                  padding: '14px 28px',
                  backdropFilter: 'blur(8px)',
                }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.18)' } as never}
                whileTap={{ scale: 0.97 }}
              >
                <PlayIcon />
                Watch Film
              </motion.button>
            </motion.div>
          </div>

          {/* Scroll indicator — bottom center */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <div
              className="relative overflow-hidden"
              style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.15)' }}
            >
              <motion.div
                className="absolute inset-x-0 top-0"
                style={{ height: '100%', background: '#FF6B00', originY: 0 }}
                animate={{ scaleY: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <span
              className="text-bmw-silver uppercase tracking-widest"
              style={{ fontSize: '9px' }}
            >
              Scroll
            </span>
          </div>

          {/* BMW / M4 — right side */}
          <div className="absolute right-[8%] top-1/2 -translate-y-1/2 text-right">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                fontSize: 'clamp(48px, 6.5vw, 88px)',
                fontWeight: 800,
                letterSpacing: '-0.05em',
                lineHeight: 0.88,
                color: 'white',
              }}
            >
              BMW
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                fontSize: 'clamp(48px, 6.5vw, 88px)',
                fontWeight: 800,
                letterSpacing: '-0.05em',
                lineHeight: 0.88,
                color: '#FF6B00',
              }}
            >
              M4
            </motion.div>
          </div>

          {/* Progress dots — right side */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 items-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  width: phase === i ? 8 : 4,
                  height: phase === i ? 8 : 4,
                  backgroundColor: phase === i ? '#FF6B00' : 'rgba(255,255,255,0.3)',
                }}
                className="rounded-full"
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M2.5 1.5L10.5 6.5L2.5 11.5V1.5Z" fill="white" />
    </svg>
  )
}
