'use client'

import { useState, useEffect, useCallback } from 'react'

const currencyToCountry: Record<string, string> = {
  USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", JPY: "🇯🇵", AUD: "🇦🇺", CAD: "🇨🇦", CHF: "🇨🇭",
  CNY: "🇨🇳", HKD: "🇭🇰", NZD: "🇳🇿", SEK: "🇸🇪", KRW: "🇰🇷", SGD: "🇸🇬", NOK: "🇳🇴",
  MXN: "🇲🇽", INR: "🇮🇳", RUB: "🇷🇺", ZAR: "🇿🇦", TRY: "🇹🇷", BRL: "🇧🇷", TWD: "🇹🇼",
  DKK: "🇩🇰", PLN: "🇵🇱", THB: "🇹🇭", IDR: "🇮🇩", HUF: "🇭🇺", CZK: "🇨🇿", ILS: "🇮🇱",
  CLP: "🇨🇱", PHP: "🇵🇭", AED: "🇦🇪", COP: "🇨🇴", SAR: "🇸🇦", MYR: "🇲🇾", RON: "🇷🇴",
  PKR: "🇵🇰", EGP: "🇪🇬", VND: "🇻🇳", BDT: "🇧🇩", NGN: "🇳🇬", ARS: "🇦🇷", MAD: "🇲🇦"
}

const currencyNames: Record<string, string> = {
  USD: "US Dollar", EUR: "Euro", GBP: "British Pound", JPY: "Japanese Yen", 
  AUD: "Australian Dollar", CAD: "Canadian Dollar", CHF: "Swiss Franc",
  CNY: "Chinese Yuan", HKD: "Hong Kong Dollar", NZD: "New Zealand Dollar", 
  SEK: "Swedish Krona", KRW: "South Korean Won", SGD: "Singapore Dollar", 
  NOK: "Norwegian Krone", MXN: "Mexican Peso", INR: "Indian Rupee", 
  RUB: "Russian Ruble", ZAR: "South African Rand", TRY: "Turkish Lira", 
  BRL: "Brazilian Real", TWD: "Taiwan Dollar", DKK: "Danish Krone", 
  PLN: "Polish Zloty", THB: "Thai Baht", IDR: "Indonesian Rupiah", 
  HUF: "Hungarian Forint", CZK: "Czech Koruna", ILS: "Israeli Shekel",
  CLP: "Chilean Peso", PHP: "Philippine Peso", AED: "UAE Dirham", 
  COP: "Colombian Peso", SAR: "Saudi Riyal", MYR: "Malaysian Ringgit", 
  RON: "Romanian Leu", PKR: "Pakistani Rupee", EGP: "Egyptian Pound", 
  VND: "Vietnamese Dong", BDT: "Bangladeshi Taka", NGN: "Nigerian Naira", 
  ARS: "Argentine Peso", MAD: "Moroccan Dirham"
}

export default function CurrencyConverter() {
  const [currencies, setCurrencies] = useState<string[]>([])
  const [rates, setRates] = useState<Record<string, number>>({})
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [amount, setAmount] = useState('1')
  const [result, setResult] = useState('')
  const [rateInfo, setRateInfo] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/exchange')
      .then(res => res.json())
      .then(data => {
        setCurrencies(Object.keys(data.rates))
        setRates(data.rates)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const calculateRate = useCallback(() => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return
    
    const amt = parseFloat(amount) || 1
    const fromRate = rates[fromCurrency]
    const toRate = rates[toCurrency]
    const rate = toRate / fromRate
    const finalAmount = amt * rate
    
    setResult(`${fromCurrency} ${amt.toFixed(2)} = ${toCurrency} ${finalAmount.toFixed(4)}`)
    setRateInfo(`1 ${fromCurrency} = ${rate.toFixed(6)} ${toCurrency}`)
  }, [amount, fromCurrency, toCurrency, rates])

  useEffect(() => {
    if (Object.keys(rates).length > 0) {
      calculateRate()
    }
  }, [calculateRate, rates])

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 flex items-start justify-center pt-20 px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
          <div className="bg-blue-900 p-4">
            <h1 className="text-white text-xl font-semibold">Currency Converter</h1>
          </div>
          <div className="p-8 text-center text-gray-500">Loading exchange rates...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-900 p-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-white text-xl font-semibold">Currency Converter</h1>
        </div>
        
        {/* Body */}
        <div className="p-6 md:p-8">
          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-gray-500 text-sm mb-2 font-medium">Amount</label>
            <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 bg-white hover:border-blue-500 transition-colors">
              <span className="text-2xl mr-2">{currencyToCountry[fromCurrency] || '🌐'}</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 text-2xl font-semibold text-gray-800 outline-none"
                min="0"
                step="0.01"
              />
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="ml-2 text-gray-600 font-medium outline-none cursor-pointer bg-transparent"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>
                    {currency} - {currencyNames[currency] || currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Swap Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleSwap}
              className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all hover:rotate-180 duration-300 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>
          
          {/* To Currency */}
          <div className="mb-6">
            <label className="block text-gray-500 text-sm mb-2 font-medium">Converted to</label>
            <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 bg-gray-50">
              <span className="text-2xl mr-2">{currencyToCountry[toCurrency] || '🌐'}</span>
              <div className="flex-1">
                <div className="text-2xl font-semibold text-gray-800">
                  {rates[toCurrency] && rates[fromCurrency] 
                    ? ((parseFloat(amount) || 1) * (rates[toCurrency] / rates[fromCurrency])).toFixed(4)
                    : '...'} {toCurrency}
                </div>
              </div>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="ml-2 text-gray-600 font-medium outline-none cursor-pointer bg-transparent"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>
                    {currency} - {currencyNames[currency] || currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Rate Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <div className="text-lg font-semibold text-gray-800 mb-1">{result}</div>
            <div className="text-sm text-gray-500">{rateInfo}</div>
          </div>
          
          {/* Disclaimer */}
          <p className="text-xs text-gray-400 text-center">
            We use the mid-market rate for our Converter. This is for informational purposes only.
          </p>
        </div>
      </div>
    </div>
  )
}
