const steps = [
  {
    n: '1',
    title: 'Sign up for free',
    desc: 'It only takes a few minutes — all you need is an email address.',
  },
  {
    n: '2',
    title: 'Get a quote',
    desc: 'Choose your destination country, currencies, and send amount.',
  },
  {
    n: '3',
    title: 'Add your recipient',
    desc: "Provide your recipient's payment information and details.",
  },
  {
    n: '4',
    title: 'Confirm & send',
    desc: 'Fund your transfer with a bank account, credit or debit card.',
  },
  {
    n: '5',
    title: 'Track your transfer',
    desc: 'See where your money is and when it arrives. Live support included.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
       
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="flex flex-col items-center text-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1a56db] text-white font-bold text-lg flex items-center justify-center shrink-0">
                {s.n}
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">{s.title}</div>
                <div className="mt-1 text-xs text-slate-500 leading-relaxed">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
