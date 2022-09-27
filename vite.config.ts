import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import myPlugin from './plugins/vite-plugin-intermediary'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),myPlugin({
    dir:'src/components',
    output:'fs.ts'
  })]
})
