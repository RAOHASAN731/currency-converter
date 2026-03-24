'use client'

import { useEffect, useMemo, useState } from 'react'
import Navbar from '@/components/Navbar'
import CurrencyConverter from '@/components/CurrencyConverter'
import LiveRatesTable from '@/components/LiveRatesTable'

type ExchangeData = {
  base: string
  rates: Record<string, number>
  date?: string
}

export default function HomePage() {
  const [data, setData] = useState<ExchangeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/exchange?base=USD')
      .then((r) => r.json())
      .then((d: ExchangeData) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const currencyList = useMemo(() => {
    if (!data?.rates) return []
    return Object.keys(data.rates).sort()
  }, [data])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero / converter */}
        <section className="bg-black">
          <div className="mx-auto max-w-7xl px-4 pt-10 pb-16">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Currency Exchange Rates
              </h1>
              <p className="mt-3 text-white/60 text-sm md:text-base">
                Live mid-market rates for 100+ currencies
              </p>
            </div>
            <div className="mx-auto max-w-4xl">
              <CurrencyConverter
                loading={loading}
                currencyList={currencyList}
                rates={data?.rates ?? {}}
                base={data?.base ?? 'USD'}
                date={data?.date}
              />
            </div>
          </div>
        </section>

        {/* Live rates table */}
        <LiveRatesTable base={data?.base ?? 'USD'} rates={data?.rates ?? {}} />
      </main>

      <footer className="bg-black py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} FXRate · Mid-market rates for informational purposes only
      </footer>
    </div>
  )
}
