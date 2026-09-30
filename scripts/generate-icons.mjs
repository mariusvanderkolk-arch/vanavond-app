// Maakt de PNG-iconen voor de PWA uit de SVG-bronnen in public/icons.
// Gebruik: npm run icons
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const dir = fileURLToPath(new URL('../public/icons/', import.meta.url))

const jobs = [
  { src: 'icon.svg', out: 'icon-192.png', size: 192 },
  { src: 'icon.svg', out: 'icon-512.png', size: 512 },
  { src: 'maskable.svg', out: 'maskable-512.png', size: 512 },
  // iOS rondt zelf af, dus hier de volle vlakke variant.
  { src: 'maskable.svg', out: 'apple-touch-icon.png', size: 180 },
]

for (const { src, out, size } of jobs) {
  const svg = await readFile(dir + src)
  await sharp(svg, { density: Math.ceil((72 * size) / 32) })
    .resize(size, size)
    .png()
    .toFile(dir + out)
  console.log(`✓ ${out} (${size}×${size})`)
}
