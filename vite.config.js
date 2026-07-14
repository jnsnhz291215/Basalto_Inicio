import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_BASE_URL || 'http://localhost:3000'

  return {
    plugins: [vue()],
    server: {
      port: 5173,
      proxy: {
        // Proxy opcional: la cookie sigue siendo del host localhost
        // y es visible en proyecto_basalto (:3000) y en esta app.
        '/api': {
          target: apiTarget,
          changeOrigin: true
        }
      }
    }
  }
})
