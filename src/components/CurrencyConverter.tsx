'use client'

import { useEffect, useMemo, useState } from 'react'

const currencyToCountry: Record<string, string> = {
  USD: 'us', EUR: 'eu', GBP: 'gb', JPY: 'jp', AUD: 'au', CAD: 'ca', CHF: 'ch',
  CNY: 'cn', HKD: 'hk', NZD: 'nz', SEK: 'se', KRW: 'kr', SGD: 'sg', NOK: 'no',
  MXN: 'mx', INR: 'in', RUB: 'ru', ZAR: 'za', TRY: 'tr', BRL: 'br', TWD: 'tw',
  DKK: 'dk', PLN: 'pl', THB: 'th', IDR: 'id', HUF: 'hu', CZK: 'cz', ILS: 'il',
  CLP: 'cl', PHP: 'ph', AED: 'ae', COP: 'co', SAR: 'sa', MYR: 'my', RON: 'ro',
  PKR: 'pk', EGP: 'eg', VND: 'vn', BDT: 'bd', NGN: 'ng', ARS: 'ar', MAD: 'ma',
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
  RUB: 'Russian Ruble', ZAR: 'South African Rand', TRY: 'Turkish Lira',
  BRL: 'Brazilian Real', TWD: 'Taiwan Dollar', DKK: 'Danish Krone',
  PLN: 'Polish Zloty', THB: 'Thai Baht', IDR: 'Indonesian Rupiah',
  HUF: 'Hungarian Forint', CZK: 'Czech Koruna', ILS: 'Israeli Shekel',
  CLP: 'Chilean Peso', PHP: 'Philippine Peso', AED: 'UAE Dirham',
  COP: 'Colombian Peso', SAR: 'Saudi Riyal', MYR: 'Malaysian Ringgit',
  RON: 'Romanian Leu', PKR: 'Pakistani Rupee', EGP: 'Egyptian Pound',
  VND: 'Vietnamese Dong', BDT: 'Bangladeshi Taka', NGN: 'Nigerian Naira',
  ARS: 'Argentine Peso', MAD: 'Moroccan Dirham',
}

type Props = {
  loading: boolean
  currencyList: string[]
  rates: Record<string, number>
  base: string
  date?: string
}

function CurrencySelect({
  value,
  onChange,
  currencies,
  disabled,
}: {
  value: string
  onChange: (v: string) => void
  currencies: string[]
  disabled: boolean
}) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <Flag code={value} />
      <div className="min-w-0">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full bg-transparent font-semibold text-slate-900 text-sm outline-none cursor-pointer"
        >
          {currencies.map((c) => (
            <option key={c} value={c}>
              {c} – {currencyNames[c] ?? c}
            </option>
          ))}
        </select>
        <div className="text-xs text-slate-500 truncate">{currencyNames[value] ?? value}</div>
      </div>
    </div>
  )
}

export default function CurrencyConverter({ loading, currencyList, rates, base, date }: Props) {
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('EUR')
  const [amount, setAmount] = useState('1')

  useEffect(() => {
    if (!currencyList.length) return
    if (!currencyList.includes(from)) setFrom(base)
    if (!currencyList.includes(to)) setTo('EUR')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyList, base])

  const result = useMemo(() => {
    const amt = parseFloat(amount) || 0
    const fromRate = rates[from]
    const toRate = rates[to]
    if (!fromRate || !toRate) return null
    const rate = toRate / fromRate
    return { amt, rate, converted: amt * rate }
  }, [amount, from, to, rates])

  const handleSwap = () => {
    setFrom(to)
    setTo(from)
  }

  return (
    <div className="rounded-2xl bg-white shadow-2xl overflow-hidden">
      <div className="p-5 md:p-7">
        <div className="flex flex-col md:flex-row md:items-end gap-3">
          {/* From */}
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Amount</label>
            <div className="flex items-center gap-3 rounded-xl border-2 border-slate-200 focus-within:border-blue-500 bg-white px-4 py-3 transition-colors">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-28 bg-transparent text-xl font-bold text-slate-900 outline-none"
                min="0"
                step="any"
              />
              <div className="h-8 w-px bg-slate-200 shrink-0" />
              <CurrencySelect value={from} onChange={setFrom} currencies={currencyList} disabled={loading} />
            </div>
          </div>

          {/* Swap */}
          <div className="flex justify-center md:pb-1 shrink-0">
            <button
              onClick={handleSwap}
              disabled={loading}
              type="button"
              aria-label="Swap currencies"
              className="h-10 w-10 rounded-full bg-slate-100 hover:bg-blue-100 hover:text-blue-600 text-slate-600 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>

          {/* To */}
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Converted to</label>
            <div className="flex items-center gap-3 rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-3">
              <div className="w-28 text-xl font-bold text-slate-900 shrink-0">
                {loading || !result ? (
                  <span className="text-slate-400">—</span>
                ) : (
                  result.converted.toLocaleString(undefined, { maximumFractionDigits: 4 })
                )}
              </div>
              <div className="h-8 w-px bg-slate-200 shrink-0" />
              <CurrencySelect value={to} onChange={setTo} currencies={currencyList} disabled={loading} />
            </div>
          </div>
        </div>

        {/* Rate info */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm text-slate-700">
            {loading ? (
              <span className="text-slate-400">Fetching live rates…</span>
            ) : result ? (
              <>
                <span className="font-semibold">
                  {result.amt.toLocaleString()} {from} = {result.converted.toLocaleString(undefined, { maximumFractionDigits: 6 })} {to}
                </span>
                <div className="mt-0.5 text-xs text-slate-500">
                  Mid-market rate · 1 {from} = {result.rate.toFixed(6)} {to}
                  {date ? ` · ${date}` : ''}
                </div>
              </>
            ) : null}
          </div>

          <div className="flex gap-2 shrink-0">
            <button type="button" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors">
              Set rate alert
            </button>
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-400">
          We use the mid-market rate for our Converter. This is for informational purposes .
        </p>
      </div>
    </div>
  )
}
