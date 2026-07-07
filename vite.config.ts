import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base defaults to root for local dev / Vercel. The GitHub Pages build passes
// an explicit --base=/UNTANGLED/ (see the "build:pages" script) because it's a
// project site served under /<repo>/.
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
