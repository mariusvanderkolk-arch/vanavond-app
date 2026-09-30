import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Zet `base` op '/<repo-naam>/' als je via GitHub Pages in een submap host,
// bijvoorbeeld: VITE_BASE=/vanavond/ npm run build
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
})
