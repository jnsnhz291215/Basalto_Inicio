import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const publicIndexing = process.env.VITE_PUBLIC_INDEXING ?? env.VITE_PUBLIC_INDEXING ?? 'true'
  const allowIndexing = !['0', 'false', 'off', 'no', 'none']
    .includes(String(publicIndexing).trim().toLowerCase())

  return {
    plugins: [
      vue(),
      {
        name: 'basalto-seo-switch',
        transformIndexHtml(html) {
          return html.replace(
            '__ROBOTS_META__',
            allowIndexing ? 'index, follow' : 'noindex, nofollow'
          )
        }
      }
    ],
    server: {
      port: 5173
    }
  }
})
