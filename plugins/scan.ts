import { appendFile, fstat, readdir, readFile } from "fs"
import { cacheMap } from "./cache"
import { exportDefaultRegExp, exportNamedRegExp, getFileName } from "./utils"
export const scanUtils = {
  getDir() {

  },
  readDir() {

  },
  writeDir() {

  },
  scanDir(path: string, target: string) {
    console.log('path', path)
    console.log('target', target)
    readdir(path, (err, files) => {
      for (const file of files) {
        const currentFilePath = path + file
        if (currentFilePath == target) continue
        readFile(currentFilePath, (err, content) => {
          // todo: should ...
          if (exportDefaultRegExp.test(content.toString())) {
            console.log('export default')
          }

          if (exportNamedRegExp.test(content.toString())) {
            console.log('export named')
            const fileName = getFileName(file)
            appendFile(currentFilePath, `export {default as ${fileName} } from './${fileName}'\n`, (err) => {
              // console.log(' err1', err)
              // cacheMap.set(fileName,'export named')
            })
          }
        })
      }
    })
  }
}
