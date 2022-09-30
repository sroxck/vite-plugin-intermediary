import { fileURLToPath } from 'url'
import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import intermediary from '../plugins/index'
const __dirname = fileURLToPath(new URL('.', import.meta.url));

(async () => {
  const server = await createServer({
    configFile: false,
    mode:'development',
    plugins: [vue(),intermediary({
      dir:'/playground/test',
      output:'plugin-output.ts'
    })],
    root: __dirname,
    server: {
      watch: {
        persistent:true,
        useFsEvents:true,
        alwaysStat:true,
      },
      port: 1337
    }
  })
  await server.listen() 
  server.printUrls()
})()
