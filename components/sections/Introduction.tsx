'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const items = [
  { type: 'label' as const, text: 'Established 1916' },
  { type: 'heading' as const, text: 'A Century of\nDriving Excellence' },
  {
    type: 'body' as const,
    text: 'Born from a relentless pursuit of perfection, every BMW is a testament to engineering mastery. From the first spark to the final detail, we build machines that transcend transportation and become extensions of the driver\'s will.',
  },
]

export default function Introduction() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden py-32">
      {/* Ambient background watermark */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          className="text-white font-black"
          style={{
            fontSize: 'clamp(180px, 30vw, 400px)',
            fontWeight: 900,
            opacity: 0.04,
            letterSpacing: '-0.06em',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          BMW
        </span>
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 text-center max-w-4xl px-6 mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: i * 0.15,
              duration: 0.9,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={i < items.length - 1 ? 'mb-8' : ''}
          >
            {item.type === 'label' && (
              <span
                className="text-bmw-orange uppercase"
                style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em' }}
              >
                {item.text}
              </span>
            )}
            {item.type === 'heading' && (
              <h2
                className="text-white"
                style={{
                  fontSize: 'clamp(48px, 6vw, 85px)',
                  fontWeight: 700,
                  letterSpacing: '-0.045em',
                  lineHeight: 1.05,
                  whiteSpace: 'pre-line',
                }}
              >
                {item.text}
              </h2>
            )}
            {item.type === 'body' && (
              <p
                className="text-bmw-silver mx-auto"
                style={{
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  maxWidth: '42rem',
                }}
              >
                {item.text}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
