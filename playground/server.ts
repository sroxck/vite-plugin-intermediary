import { fileURLToPath } from 'url'
import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import myPlugin from '../plugins'
const __dirname = fileURLToPath(new URL('.', import.meta.url));

(async () => {
  const server = await createServer({
    configFile: false,
    mode:'development',
    plugins: [vue()],
    root: __dirname,
    server: {
      port: 1337
    }
  })
  await server.listen()
  server.printUrls()
})()
