// Maps currency code -> ISO 3166-1 alpha-2 country code for flagcdn.com
export const currencyToCountryCode: Record<string, string> = {
  USD: 'us', EUR: 'eu', GBP: 'gb', JPY: 'jp', AUD: 'au', CAD: 'ca', CHF: 'ch',
  CNY: 'cn', HKD: 'hk', NZD: 'nz', SEK: 'se', KRW: 'kr', SGD: 'sg', NOK: 'no',
  MXN: 'mx', INR: 'in', RUB: 'ru', ZAR: 'za', TRY: 'tr', BRL: 'br', TWD: 'tw',
  DKK: 'dk', PLN: 'pl', THB: 'th', IDR: 'id', HUF: 'hu', CZK: 'cz', ILS: 'il',
  CLP: 'cl', PHP: 'ph', AED: 'ae', COP: 'co', SAR: 'sa', MYR: 'my', RON: 'ro',
  PKR: 'pk', EGP: 'eg', VND: 'vn', BDT: 'bd', NGN: 'ng', ARS: 'ar', MAD: 'ma',
}

export function getFlagUrl(currencyCode: string): string {
  const code = currencyToCountryCode[currencyCode]
  if (!code) return ''
  return `https://flagcdn.com/w40/${code}.png`
}

export const currencyNames: Record<string, string> = {
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
