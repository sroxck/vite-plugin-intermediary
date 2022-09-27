import { log } from 'console'
import path from 'path'
import fs, { constants } from 'fs'
import { type HmrContext } from 'vite'
import { Intermediary } from './types'
import { exportDefaultRegExp, exportNamedRegExp, getFileName, getFilePathRegExp } from './utils'

/**
 * @param options 
 * @returns 
 */
export default function myPlugin(options: Intermediary) {
  const { dir, include = ['ts', 'js'], output } = options
  const targetDir = path.join(process.cwd(), dir, '/')
  const outputFile = targetDir + output
  let HMR_LIST:any = []
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
          // todo : cache...
          if (HMR_LIST.includes(fileName)) return
          fs.appendFile(outputFile, `export {default as ${fileName} } from './${fileName}'\n`, (err) => {
            console.log(' err', err)
          })
          HMR_LIST.push(fileName)
        }
          // if the file content  contains export 
        if (exportNamedRegExp.test(fileData)) {
          if (HMR_LIST.includes(fileName)) return
          fs.appendFile(outputFile, `export * as ${fileName} from './${fileName}'\n`, (err) => {
            console.log(' err', err)
          })
          HMR_LIST.push(fileName)
        }
      }
    }
  }
}
