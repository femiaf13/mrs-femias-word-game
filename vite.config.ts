import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/mrs-femias-word-game/",
  plugins: [vue({
    reactivityTransform: true
  })]
})
