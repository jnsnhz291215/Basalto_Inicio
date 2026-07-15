import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(process.cwd())
const publicDir = resolve(root, 'public')

function parseEnvFile(path) {
  if (!existsSync(path)) return {}
  return Object.fromEntries(
    readFileSync(path, 'utf8')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const index = line.indexOf('=')
        const key = line.slice(0, index).trim()
        const value = line.slice(index + 1).trim().replace(/^['"]|['"]$/g, '')
        return [key, value]
      })
  )
}

const mode = process.env.MODE || 'production'
const env = {
  ...parseEnvFile(resolve(root, '.env')),
  ...parseEnvFile(resolve(root, '.env.local')),
  ...parseEnvFile(resolve(root, `.env.${mode}`)),
  ...parseEnvFile(resolve(root, `.env.${mode}.local`)),
  ...process.env
}

const rawIndexing = String(env.VITE_PUBLIC_INDEXING ?? 'true').trim().toLowerCase()
const allowIndexing = !['0', 'false', 'off', 'no', 'none'].includes(rawIndexing)

mkdirSync(publicDir, { recursive: true })

const robots = allowIndexing
  ? `User-agent: *
Allow: /

Disallow: /login
Disallow: /dashboard
Disallow: /sin-permiso

Sitemap: https://inicio.basalto.app/sitemap.xml
`
  : `User-agent: *
Disallow: /
`

writeFileSync(resolve(publicDir, 'robots.txt'), robots)
writeFileSync(
  resolve(publicDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://inicio.basalto.app/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
)

console.log(`[seo] VITE_PUBLIC_INDEXING=${allowIndexing ? 'true' : 'false'}`)
