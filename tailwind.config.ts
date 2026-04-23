import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bmw: {
          black: '#000000',
          orange: '#FF6B00',
          silver: '#a6a6a6',
          glass: 'rgba(255,255,255,0.06)',
          glow: 'rgba(255,107,0,0.15)',
        },
      },
      fontFamily: {
        inter: ['var(--font-inter)', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
