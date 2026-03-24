import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Currency Exchange Rates',
  description: 'Free currency converter. Check live foreign currency exchange rates.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
