'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function DesignPhilosophy() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(textRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section ref={sectionRef} className="bg-black py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          {/* Left: Text 40% */}
          <div ref={textRef} className="w-full md:w-2/5">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-bmw-orange uppercase"
              style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em' }}
            >
              Design DNA
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-white mt-4 mb-6"
              style={{
                fontSize: 'clamp(36px, 4vw, 52px)',
                fontWeight: 800,
                letterSpacing: '-0.045em',
                lineHeight: 1.05,
              }}
            >
              Form Follows<br />Force
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-bmw-silver mb-10"
              style={{ fontSize: '18px', fontWeight: 400, lineHeight: 1.7 }}
            >
              Every curve is calculated. Every surface serves a purpose. The BMW design language is
              not decoration — it is aerodynamic truth rendered in steel and light.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex items-center gap-2 text-white transition-colors duration-300"
              style={{
                fontSize: '15px',
                letterSpacing: '-0.01em',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '100px',
                padding: '12px 24px',
              }}
              whileHover={{
                x: 4,
                borderColor: 'rgba(255,107,0,0.6)',
                color: '#FF6B00',
              } as never}
            >
              Explore Design
              <span aria-hidden>→</span>
            </motion.button>
          </div>

          {/* Right: Visual 60% */}
          <div className="w-full md:w-3/5">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                boxShadow:
                  '0 0 0 1px rgba(255,107,0,0.2), 0 0 60px rgba(255,107,0,0.04), 0 30px 80px rgba(0,0,0,0.6)',
              }}
            >
              <motion.div style={{ y: imageY }}>
                <Image
                  src="/images/bmw-side.jpeg"
                  alt="BMW aerodynamic design"
                  width={900}
                  height={560}
                  className="w-full object-cover block"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
