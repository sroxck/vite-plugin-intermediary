import path from 'path'
import { type HmrContext } from 'vite'
import { includeOptins, Intermediary } from './types'
import { getFileName, getFilePathRegExp, getFileType } from './utils'
import { isCache, watchCacheFileChange } from './cache'
import { scanUtils } from './scan'
import { setExportDefaultContent } from './append'

export default function plugin(options: Intermediary) {
  const { dir, include = ['ts', 'js'], output, auto } = options
  const targetDir = path.join(process.cwd(), dir, '/')
  const outputFile = targetDir + output
  return {
    name: 'vite-plugin-intermediary',
    buildStart() {
      if (!auto) return
      // scan for dir 
      console.log(options, options)
      // todo: 1.scan dir and check cache
      // todo: 2.match template in dir files
    },
    async handleHotUpdate(hmr: HmrContext) {
      const { file, read } = hmr
      const fileName = getFileName(file)
      const filePathReg = getFilePathRegExp(targetDir)

      if (file == outputFile) return
      if (!include.includes(getFileType(file) as includeOptins)) return

      if (filePathReg.test(file)) {
        const fileData = await read()
        if (!setExportDefaultContent<string>(fileName, outputFile, fileData)) return

        if (isCache(fileName)) {
          console.log('缓存中的文件修改', fileName, isCache(fileName))
          watchCacheFileChange(fileName, fileData, outputFile)
        }
      }
    }
  }
}
