import './globals.css'

export const metadata = {
  title: 'Currency Converter',
  description: 'Live currency exchange rates converter',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
