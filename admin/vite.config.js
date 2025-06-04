import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 5174
  },
  build: {
    chunkSizeWarningLimit: 1000, // increase limit to 1000kb (1MB) or whatever you want
  }
})
