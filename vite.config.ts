import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Basispad van de site. Lokaal en op Vercel/Netlify is dat '/'.
// Voor GitHub Pages zet de workflow VITE_BASE=/vanavond-app/.
const base = process.env.VITE_BASE ?? '/'

// Volledig adres van de site (voor de deelafbeelding), bijvoorbeeld
// https://mariusvanderkolk-arch.github.io. Leeg laten mag.
const siteUrl = (process.env.VITE_SITE_URL ?? '').replace(/\/$/, '')

/** Zet het juiste adres van de deelafbeelding (og:image) in index.html. */
function shareImage(): Plugin {
  return {
    name: 'vanavond-share-image',
    transformIndexHtml: (html) => html.replace('__OG_IMAGE__', `${siteUrl}${base}og.jpg`),
  }
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), shareImage()],
})
