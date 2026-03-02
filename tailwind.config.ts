import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'scout-primary': '#FF6B35',
        'scout-secondary': '#2C3E50',
        'scout-accent': '#F39C12',
        'scout-dark': '#1A252F',
        'scout-light': '#ECF0F1',
      },
    },
  },
  plugins: [],
}
export default config
