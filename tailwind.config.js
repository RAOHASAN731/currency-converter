/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          start: '#667eea',
          end: '#764ba2',
        },
        dark: {
          bg: '#1a1a2e',
          card: '#1e1e2e',
          input: '#2a2a3e',
          border: '#3a3a4a',
        },
        text: {
          primary: '#eaeaea',
          secondary: '#b0b0b0',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      },
    },
  },
  plugins: [],
}
