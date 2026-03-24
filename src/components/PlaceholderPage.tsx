import Navbar from '@/components/Navbar'

type Props = {
  title: string
  description: string
  icon: React.ReactNode
}

export default function PlaceholderPage({ title, description, icon }: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
          {icon}
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-500 max-w-sm">{description}</p>
        <span className="mt-4 inline-block rounded-full bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1">
          Coming soon
        </span>
      </main>
    </div>
  )
}
