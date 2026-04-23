'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const navLinks = [
  { label: 'Models',      id: 'models' },
  { label: 'Performance', id: 'performance' },
  { label: 'Design',      id: 'design' },
  { label: 'Experience',  id: 'experience' },
  { label: 'Innovation',  id: 'innovation' },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 64
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled
            ? 'rgba(10, 10, 10, 0.6)'
            : 'rgba(10, 10, 10, 0.2)',
          backdropFilter: 'blur(24px) saturate(200%)',
          WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
          boxShadow: scrolled
            ? '0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 2px 16px rgba(0,0,0,0.2)',
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* BMW Logo PNG */}
          <Image
            src="/images/bmw-logo.png"
            alt="BMW"
            width={54}
            height={54}
            className="object-contain"
            style={{ mixBlendMode: 'screen' }}
            priority
          />

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, id }) => (
              <motion.button
                key={id}
                onClick={() => { setActiveLink(id); scrollToSection(id) }}
                className="relative transition-colors duration-200"
                style={{
                  fontSize: '15px',
                  letterSpacing: '-0.015em',
                  color: activeLink === id ? '#ffffff' : 'rgba(255,255,255,0.58)',
                }}
                whileHover={{ scale: 1.05, color: '#ffffff' } as never}
              >
                {label}
                {activeLink === id && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ background: '#FF6B00' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              style={{
                fontSize: '14px',
                letterSpacing: '-0.01em',
                padding: '8px 20px',
                borderRadius: '100px',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.13)',
                color: '#ffffff',
              }}
              whileHover={{ background: 'rgba(255,255,255,0.14)', borderColor: 'rgba(255,255,255,0.22)' } as never}
              whileTap={{ scale: 0.97 }}
            >
              Configure Yours
            </motion.button>
            <motion.button
              style={{
                fontSize: '14px',
                letterSpacing: '-0.01em',
                padding: '8px 20px',
                borderRadius: '100px',
                background: '#FF6B00',
                color: '#000',
                fontWeight: 600,
              }}
              whileHover={{ scale: 1.03, filter: 'brightness(1.1)' }}
              whileTap={{ scale: 0.97 }}
            >
              Drive Now
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-px bg-white transition-all duration-300"
              style={{ transform: mobileOpen ? 'rotate(45deg) translateY(4px)' : 'none' }} />
            <span className="block w-6 h-px bg-white transition-all duration-300"
              style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span className="block w-6 h-px bg-white transition-all duration-300"
              style={{ transform: mobileOpen ? 'rotate(-45deg) translateY(-4px)' : 'none' }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{
              background: 'rgba(0,0,0,0.88)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map(({ label, id }, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="text-white font-bold"
                  style={{ fontSize: '40px', fontWeight: 800, letterSpacing: '-0.04em' }}
                  onClick={() => { setMobileOpen(false); scrollToSection(id) }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 mt-12"
            >
              <button className="px-6 py-3 rounded-full text-white"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', fontSize: '15px' }}>
                Configure Yours
              </button>
              <button className="px-6 py-3 rounded-full text-black font-semibold"
                style={{ background: '#FF6B00', fontSize: '15px' }}>
                Drive Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

