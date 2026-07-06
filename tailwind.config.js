/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0a0b',
          900: '#101013',
          850: '#16161a',
          800: '#1c1c22',
          700: '#26262e',
          600: '#33333d',
        },
        ember: {
          400: '#ff9d4d',
          500: '#ff7a18',
          600: '#f2610c',
        },
        signal: {
          green: '#3ddc84',
          red: '#ff5a5a',
          blue: '#5aa9ff',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
