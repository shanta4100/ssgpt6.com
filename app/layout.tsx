import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Getting Started with Vercel Web Analytics - SSGPT6',
  description: 'Complete guide to setting up Vercel Web Analytics on your project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
