import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import myPlugin from './plugins'
export default defineConfig({
  plugins: [vue(),myPlugin({
    dir:'src/components',
    output:'index.ts',
    auto:true
  })]
})
