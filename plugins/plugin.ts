import path from 'path'
import fs, { constants } from 'fs'
import { type HmrContext } from 'vite'
import { Intermediary } from './types'
import { exportDefaultRegExp, exportNamedRegExp, getFileName, getFilePathRegExp } from './utils'
export default function plugin(options: Intermediary) {
  const { dir, include = ['ts', 'js'], output, auto } = options
  const targetDir = path.join(process.cwd(), dir, '/')
  const outputFile = targetDir + output
  let HMR_LIST = new Map<string,string>
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
          if (HMR_LIST.has(fileName)) return
          fs.appendFile(outputFile, `export {default as ${fileName} } from './${fileName}'\n`, (err) => {
            console.log(' err1', err)
          })
          HMR_LIST.set(fileName,'default')
        }
        // if the file content  contains export 
        if (exportNamedRegExp.test(fileData)) {
          if (HMR_LIST.has(fileName)) return
          fs.appendFile(outputFile, `export * as ${fileName} from './${fileName}'\n`, (err) => {
            console.log(' err', err)
          })
          HMR_LIST.set(fileName,'named')
        }

        if(HMR_LIST.has(fileName)){
          console.log('独一无二1',fileData)
          console.log('独一无二2',exportDefaultRegExp.test(fileData))
          console.log('独一无二3',exportNamedRegExp.test(fileData))

        }
      }
    }
  }
}
