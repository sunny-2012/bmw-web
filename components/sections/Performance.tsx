'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

const stats = [
  { sublabel: '0 – 100 km/h', value: 3.9, unit: 's', label: 'Acceleration', decimals: 1 },
  { sublabel: 'Limited', value: 250, unit: ' km/h', label: 'Top Speed', decimals: 0 },
  { sublabel: 'M5 Competition', value: 530, unit: ' hp', label: 'Power Output', decimals: 0 },
  { sublabel: 'Peak Torque', value: 750, unit: ' Nm', label: 'Torque', decimals: 0 },
]

function StatCounter({
  value,
  unit,
  decimals,
  isInView,
}: {
  value: number
  unit: string
  decimals: number
  isInView: boolean
}) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(parseFloat(v.toFixed(decimals))),
    })
    return () => controls.stop()
  }, [isInView, value, decimals])

  return (
    <span>
      {decimals > 0 ? display.toFixed(decimals) : Math.round(display)}
      {unit}
    </span>
  )
}

export default function Performance() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section headline */}
        <div ref={ref} className="mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-bmw-orange uppercase"
            style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em' }}
          >
            Performance
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-white mt-4"
            style={{
              fontSize: 'clamp(48px, 6vw, 85px)',
              fontWeight: 800,
              letterSpacing: '-0.045em',
              lineHeight: 1.0,
            }}
          >
            Built for<br />Those Who Push
          </motion.h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
              className="rounded-xl p-8"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,107,0,0.15)',
              }}
            >
              {/* Orange accent line */}
              <div
                className="mb-6"
                style={{ width: '40px', height: '2px', background: '#FF6B00' }}
              />
              {/* Sublabel */}
              <div
                className="text-bmw-silver mb-3"
                style={{
                  fontSize: '11px',
                  fontWeight: 300,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {stat.sublabel}
              </div>
              {/* Counter */}
              <div
                className="text-white font-bold"
                style={{
                  fontSize: 'clamp(40px, 4vw, 52px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                <StatCounter
                  value={stat.value}
                  unit={stat.unit}
                  decimals={stat.decimals}
                  isInView={isInView}
                />
              </div>
              {/* Label */}
              <div
                className="text-bmw-silver mt-3"
                style={{ fontSize: '14px', letterSpacing: '-0.01em' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
