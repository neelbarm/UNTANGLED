/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic theme tokens (driven by CSS variables in index.css).
        canvas: 'var(--canvas)',
        sidebar: 'var(--sidebar)',
        card: 'var(--card)',
        elevated: 'var(--elevated)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        hover: 'var(--hover)',
        // Muted, calmer goal hues (used as small dots + status accents).
        goal: {
          body: '#5b9d78',
          trading: '#c88a49',
          career: '#5b86c9',
          apartment: '#9a78c2',
          meta: '#c0a24a',
        },
        signal: {
          green: '#5b9d78',
          red: '#cf6b6b',
          blue: '#5b86c9',
        },
      },
      boxShadow: {
        soft: 'var(--shadow)',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
