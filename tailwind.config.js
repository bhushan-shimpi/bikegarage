/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        garage: {
          black: '#0B0B0B',
          dark: '#111111',
          surface: '#151515',
          card: '#1A1A1A',
          elevated: '#222222',
          border: '#262626',
          borderLight: '#333333',
          yellow: '#F5B900',
          yellowHover: '#DFA500',
          yellowSubtle: '#2A2408',
          muted: '#8E8E93',
          textMuted: '#9CA3AF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'yellow-glow': '0 0 25px -5px rgba(245, 185, 0, 0.25)',
        'yellow-sm': '0 0 10px -2px rgba(245, 185, 0, 0.3)',
        'dark-card': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      }
    },
  },
  plugins: [],
}
