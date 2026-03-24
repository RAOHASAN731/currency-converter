const links: Record<string, string[]> = {
  Personal: ['Currency converter', 'Send money', 'Rate alerts', 'Currency charts', 'Historical rates', 'IBAN calculator'],
  Business: ['Business transfers', 'FX risk management', 'Mass payments', 'API integration', 'White label'],
  Company: ['About', 'Careers', 'Press', 'Blog', 'Contact us'],
  Legal: ['Privacy policy', 'Terms of use', 'Cookie policy', 'Regulatory info'],
}

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-0">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <div className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">{heading}</div>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
         
          <div className="flex gap-4">
            {['Twitter', 'Facebook', 'LinkedIn', 'Instagram'].map((s) => (
              <a key={s} href="#" className="hover:text-white/80 transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
