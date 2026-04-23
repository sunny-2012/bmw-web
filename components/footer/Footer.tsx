'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const modelLinks = ['1 Series', '3 Series', '5 Series', '7 Series', 'X Models', 'M Models']
const companyLinks = ['About BMW', 'Careers', 'Sustainability', 'Newsroom', 'Investors']

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#090909' }}
    >
      {/* Ambient BMW watermark */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="text-white font-black"
          style={{
            fontSize: 'clamp(120px, 18vw, 300px)',
            fontWeight: 900,
            opacity: 0.025,
            letterSpacing: '-0.05em',
            lineHeight: 1,
            userSelect: 'none',
            transform: 'translateY(15%)',
          }}
        >
          BMW
        </span>
      </div>

      {/* Curtain reveal animation */}
      <motion.div
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="relative z-10"
      >
        {/* Top: Display heading */}
        <div
          className="px-8 md:px-16 pt-20 pb-16"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <h2
            className="text-white font-bold"
            style={{
              fontSize: 'clamp(42px, 7vw, 85px)',
              fontWeight: 800,
              letterSpacing: '-0.05em',
              lineHeight: 0.92,
            }}
          >
            Drive the Future
          </h2>
        </div>

        {/* Middle: 4-column grid */}
        <div className="px-8 md:px-16 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand */}
          <div>
            <div
              className="text-white font-black tracking-widest mb-4"
              style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '0.12em' }}
            >
              BMW
            </div>
            <p
              className="text-bmw-silver"
              style={{ fontSize: '13px', fontWeight: 300, letterSpacing: '0.04em', lineHeight: 1.6 }}
            >
              The Ultimate Driving Machine
            </p>
          </div>

          {/* Col 2: Models */}
          <div>
            <h4
              className="text-white mb-6"
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Models
            </h4>
            <ul className="space-y-3">
              {modelLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-bmw-silver hover:text-white transition-colors duration-200"
                    style={{ fontSize: '14px', letterSpacing: '-0.01em' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4
              className="text-white mb-6"
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-bmw-silver hover:text-white transition-colors duration-200"
                    style={{ fontSize: '14px', letterSpacing: '-0.01em' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4
              className="text-white mb-6"
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Connect
            </h4>
            <p
              className="text-bmw-silver mb-5"
              style={{ fontSize: '13px', lineHeight: 1.6 }}
            >
              Stay ahead of every innovation.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg text-white placeholder-white/30 outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '14px',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,107,0,0.5)'
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,107,0,0.2)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
              <button
                className="w-full py-3 rounded-full text-black font-semibold transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{ fontSize: '14px', background: '#FF6B00', borderRadius: '100px' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="px-8 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <span className="text-bmw-silver" style={{ fontSize: '12px' }}>
            © 2025 BMW AG. All rights reserved.
          </span>
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
            {['Privacy Policy', 'Cookies', 'Legal Notice', 'Imprint'].map((link, i) => (
              <span key={link} className="flex items-center gap-2">
                <a
                  href="#"
                  className="text-bmw-silver hover:text-white transition-colors duration-200"
                  style={{ fontSize: '12px' }}
                >
                  {link}
                </a>
                {i < 3 && (
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
