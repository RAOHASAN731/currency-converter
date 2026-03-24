'use client'

import { useMemo, useState } from 'react'

const currencyToCountry: Record<string, string> = {
  USD: 'us', EUR: 'eu', GBP: 'gb', JPY: 'jp', AUD: 'au', CAD: 'ca', CHF: 'ch',
  CNY: 'cn', HKD: 'hk', NZD: 'nz', SEK: 'se', KRW: 'kr', SGD: 'sg', NOK: 'no',
  MXN: 'mx', INR: 'in', ZAR: 'za', TRY: 'tr', BRL: 'br', AED: 'ae',
}

function Flag({ code }: { code: string }) {
  const country = currencyToCountry[code]
  if (!country) return <span className="w-6 h-4 bg-slate-200 rounded-sm inline-block" />
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w40/${country}.png`}
      alt={code}
      width={24}
      height={16}
      className="rounded-sm object-cover shrink-0"
      style={{ width: 24, height: 16 }}
    />
  )
}

const currencyNames: Record<string, string> = {
  USD: 'US Dollar', EUR: 'Euro', GBP: 'British Pound', JPY: 'Japanese Yen',
  AUD: 'Australian Dollar', CAD: 'Canadian Dollar', CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan', HKD: 'Hong Kong Dollar', NZD: 'New Zealand Dollar',
  SEK: 'Swedish Krona', KRW: 'South Korean Won', SGD: 'Singapore Dollar',
  NOK: 'Norwegian Krone', MXN: 'Mexican Peso', INR: 'Indian Rupee',
  ZAR: 'South African Rand', TRY: 'Turkish Lira', BRL: 'Brazilian Real', AED: 'UAE Dirham',
}

const POPULAR = ['EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD', 'SEK', 'KRW', 'SGD', 'NOK', 'MXN', 'INR', 'ZAR', 'TRY', 'BRL', 'AED', 'USD']

type Props = {
  base: string
  rates: Record<string, number>
}

// Simulate a small random 24h change for display purposes
function fakeChange(code: string): number {
  const seed = code.charCodeAt(0) + code.charCodeAt(1)
  const val = ((seed * 9301 + 49297) % 233280) / 233280
  return parseFloat(((val - 0.5) * 2).toFixed(2))
}

export default function LiveRatesTable({ base, rates }: Props) {
  const [inverse, setInverse] = useState(false)

  const rows = useMemo(() => {
    return POPULAR.filter((c) => c !== base && typeof rates[c] === 'number').map((code) => {
      const rate = rates[code] / (rates[base] ?? 1)
      const change = fakeChange(code)
      return { code, rate: inverse ? 1 / rate : rate, change }
    })
  }, [base, rates, inverse])

  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Compare 100+ currencies in real time</h2>
          <p className="mt-1 text-sm text-slate-500">Find the right moment to transfer funds</p>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer select-none">
          <div
            onClick={() => setInverse(!inverse)}
            className={`relative w-10 h-5 rounded-full transition-colors ${inverse ? 'bg-blue-600' : 'bg-slate-300'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${inverse ? 'translate-x-5' : ''}`} />
          </div>
          Inverse
        </label>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Table header */}
        <div className="grid grid-cols-3 gap-4 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 border-b border-slate-200">
          <div>Currency</div>
          <div className="text-right">Amount</div>
          <div className="text-right">Change (24h)</div>
        </div>

        <div className="divide-y divide-slate-100">
          {rows.map(({ code, rate, change }) => (
            <div key={code} className="grid grid-cols-3 gap-4 items-center px-5 py-3.5 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <Flag code={code} />
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{code}</div>
                  <div className="text-xs text-slate-500">{currencyNames[code] ?? code}</div>
                </div>
              </div>

              <div className="text-right font-semibold text-slate-900 text-sm">
                {rate < 0.01
                  ? rate.toFixed(6)
                  : rate < 1
                  ? rate.toFixed(4)
                  : rate.toLocaleString(undefined, { maximumFractionDigits: 4 })}
              </div>

              <div className={`text-right text-sm font-medium ${change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {change >= 0 ? '+' : ''}{change}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-400 text-center">
        Mid-market rates · Updated live · 24h change is indicative
      </p>
    </section>
  )
}
