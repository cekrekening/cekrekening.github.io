import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          framework: [
            "react",
            "react-dom",
            "react-router-dom",
            "react-dom/client",
          ],
        },
      },
    },
  }
})
