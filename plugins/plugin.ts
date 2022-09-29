import path from 'path'
import fs, { constants } from 'fs'
import { type HmrContext } from 'vite'
import { Intermediary } from './types'
import { exportDefaultRegExp, exportNamedRegExp, getFileName, getFilePathRegExp } from './utils'
import { cacheMap } from './cache'
export default function plugin(options: Intermediary) {
  const { dir, include = ['ts', 'js'], output, auto } = options
  const targetDir = path.join(process.cwd(), dir, '/')
  const outputFile = targetDir + output
  return {
    name: 'vite-plugin-intermediary',
    async handleHotUpdate(hmr: HmrContext) {
      const { file, read } = hmr
      const fileName = getFileName(file)
      const filePathReg = getFilePathRegExp(targetDir)
      // if triggered hot update is output file break function 
      if (file == outputFile) return
      // if hot update files from options dir 
      if (filePathReg.test(file)) {
        const fileData = await read()
        // if the file content  contains export default 
        if (exportDefaultRegExp.test(fileData)) {
          if (cacheMap.has(fileName)) return
          fs.appendFile(outputFile, `export {default as ${fileName} } from './${fileName}'\n`, (err) => {
            console.log(' err1', err)
          })
          cacheMap.set(fileName, 'default')
          return
        }
        // if the file content  contains export 
        if (exportNamedRegExp.test(fileData)) {
          if (cacheMap.has(fileName)) return
          fs.appendFile(outputFile, `export * as ${fileName} from './${fileName}'\n`, (err) => {
            console.log(' err', err)
          })
          cacheMap.set(fileName, 'named')
          return
        }

        if (cacheMap.has(fileName)) {
          if (!(exportDefaultRegExp.test(fileData) && exportNamedRegExp.test(fileData))) {
            console.log('cacheMap.get(fileName)', cacheMap.get(fileName))
            if (cacheMap.get(fileName) == 'default') {
              fs.readFile(outputFile, 'utf8', function (err, data) {
                const fileBuffer = data.toString().replace(`export {default as ${fileName} } from './${fileName}'`, '')
                fs.writeFile(outputFile, fileBuffer, 'utf8', (err) => { })
                cacheMap.delete(fileName)
              })
            }
            if (cacheMap.get(fileName) == 'named') {
              fs.readFile(outputFile, 'utf8', function (err, data) {
                const fileBuffer = data.toString().replace(`export * as ${fileName} from './${fileName}'`, '')
                fs.writeFile(outputFile, fileBuffer, 'utf8', (err) => { })
                cacheMap.delete(fileName)
              })
            }
          }
        }
      }
    }
  }
}
