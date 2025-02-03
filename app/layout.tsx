import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FrameUp - AI Tiny Home Build Coach',
  description: 'Your personal build assistant for tiny homes, vans, trailers, buses, and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark" data-sync-scrollbar="true" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}

