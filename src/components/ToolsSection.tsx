const tools = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: 'International transfers',
    desc: 'Send money to 190 countries across 130 currencies with low fees starting at $0.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: 'Rate alerts',
    desc: 'Set free rate alerts for any currency pair. Get notified at your desired rate.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Historical rates',
    desc: 'Analyze rate trends for any currency over days, weeks, months, or years.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Currency data API',
    desc: 'Real-time, accurate exchange rate data for 3000+ companies worldwide.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Currency email updates',
    desc: 'Daily analysis of markets, exchange rates, and news straight to your inbox.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'IBAN calculator',
    desc: 'Search and validate your IBAN to make sure your transfer reaches the right destination.',
  },
]

export default function ToolsSection() {
  return (
    <section className="py-16 mx-auto max-w-7xl px-4">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Currency tools</h2>
      <p className="text-sm text-slate-500 mb-8">FX insights, advanced indicators, live news feeds &amp; customizable dashboards</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((t) => (
          <a
            key={t.title}
            href="#"
            className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              {t.icon}
            </div>
            <div>
              <div className="font-semibold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                {t.title}
              </div>
              <div className="mt-1 text-xs text-slate-500 leading-relaxed">{t.desc}</div>
              <span className="mt-2 inline-block text-xs font-semibold text-blue-600">Learn more →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
