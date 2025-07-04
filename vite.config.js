import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // Usar caminhos relativos para compatibilidade
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  },
  server: {
    port: 5174,
    host: true,
    allowedHosts: ["5174-iimj3zwixpx3uvtezl1r4-43ae8f9e.manusvm.computer", "5175-iimj3zwixpx3uvtezl1r4-43ae8f9e.manusvm.computer"]
  },
  preview: {
    port: 3000,
    host: true
  }
})

