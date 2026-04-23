import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/providers/LenisProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'BMW — The Ultimate Driving Machine',
  description:
    'Pure. Precision. Engineered. Experience the pinnacle of automotive engineering.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
