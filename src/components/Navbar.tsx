'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const subLinks = [
  { label: 'Currency Converter', href: '/' },
  { label: 'Currency Charts', href: '/charts' },
  { label: 'Rate Alerts', href: '/alerts' },
  { label: 'Historical Rates', href: '/history' },
  { label: 'IBAN Calculator', href: '/iban' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight text-white">FXRate</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
              {['Personal', 'Business', 'Platform'].map((item) => (
                <a key={item} href="#" className="px-3 py-2 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="lg:hidden p-2 rounded hover:bg-white/10"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {/* Sub-nav */}
        <div className="hidden lg:flex h-10 items-center gap-1 border-t border-white/10 text-xs font-medium">
          {subLinks.map(({ label, href }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  active ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 px-4 py-3 flex flex-col gap-1 text-sm">
          {subLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`py-2 px-2 rounded transition-colors ${
                pathname === href ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
