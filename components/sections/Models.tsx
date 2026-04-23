'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const models = [
  {
    tag: "The Driver's Car",
    name: '3 Series',
    price: 'Starting ₹46,90,000',
    image: '/images/bmw-3series.jpeg',
    featured: false,
    badge: null,
    cta: 'Discover More',
  },
  {
    tag: 'Most Powerful',
    name: 'M5',
    price: 'Starting ₹1,69,00,000',
    image: '/images/bmw-m5.jpg',
    featured: true,
    badge: 'New Model',
    cta: 'Discover More',
  },
  {
    tag: 'Fully Electric',
    name: 'iX',
    price: 'Starting ₹1,21,90,000',
    image: '/images/bmw-ix.jpeg',
    featured: false,
    badge: null,
    cta: 'Discover More',
  },
]

export default function Models() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section style={{ background: '#090909' }} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div ref={ref} className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-bmw-orange uppercase"
            style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em' }}
          >
            Our Lineup
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-white mt-4"
            style={{
              fontSize: 'clamp(42px, 5vw, 72px)',
              fontWeight: 800,
              letterSpacing: '-0.045em',
              lineHeight: 1.0,
            }}
          >
            Choose Your Series
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.8 }}
              whileHover={{ y: -8 }}
              style={{
                background: '#090909',
                borderRadius: '16px',
                boxShadow: model.featured
                  ? '0 0 0 1px rgba(255,107,0,0.4)'
                  : '0 0 0 1px rgba(255,107,0,0.15)',
                overflow: 'hidden',
                cursor: 'pointer',
                marginTop: model.featured ? '-8px' : '0',
                transition: 'box-shadow 0.3s ease',
              }}
              className="group"
            >
              {/* Header */}
              <div className="p-6 pb-0 flex items-start justify-between">
                <span
                  className="text-bmw-silver uppercase"
                  style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.12em' }}
                >
                  {model.tag}
                </span>
                {model.badge && (
                  <span
                    className="text-black font-bold uppercase"
                    style={{
                      fontSize: '9px',
                      letterSpacing: '0.05em',
                      background: '#FF6B00',
                      borderRadius: '100px',
                      padding: '4px 10px',
                    }}
                  >
                    {model.badge}
                  </span>
                )}
              </div>

              {/* Image */}
              <div
                className="mx-4 mt-4 rounded-xl overflow-hidden"
                style={{ height: '200px', background: '#111' }}
              >
                {/* Using img tag since these are frame images */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-white font-bold mb-1"
                  style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.03em' }}
                >
                  {model.name}
                </h3>
                <p
                  className="text-bmw-silver mb-6"
                  style={{ fontSize: '15px', letterSpacing: '-0.01em' }}
                >
                  {model.price}
                </p>
                <motion.button
                  className="flex items-center gap-2 text-white transition-all duration-300"
                  style={{
                    fontSize: '13px',
                    letterSpacing: '-0.01em',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '100px',
                    padding: '10px 20px',
                  }}
                  whileHover={{
                    x: 4,
                    borderColor: 'rgba(255,107,0,0.5)',
                    color: '#FF6B00',
                  } as never}
                >
                  {model.cta} →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
