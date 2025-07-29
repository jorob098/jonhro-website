import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // ✅ Correct for custom domain like jonhrorobles.com
  plugins: [react()],
})
