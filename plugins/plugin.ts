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
          if(!(exportDefaultRegExp.test(fileData) && exportNamedRegExp.test(fileData))){
            console.log('HMR_LIST.get(fileName)',HMR_LIST.get(fileName))
            if(HMR_LIST.get(fileName) =='default'){
              fs.readFile(outputFile, 'utf8', function(err,data){
                const fileBuffer = data.toString().replace(`export {default as ${fileName} } from './${fileName}'`,'')
                fs.writeFile(outputFile, fileBuffer, 'utf8',(err)=>{})
                HMR_LIST.delete(fileName)
              })
            }
            if(HMR_LIST.get(fileName) =='named'){

            }
          }
          console.log('test1',fileData)
          console.log('test2',exportDefaultRegExp.test(fileData))
          console.log('test3',exportNamedRegExp.test(fileData))

        }
      }
    }
  }
}
