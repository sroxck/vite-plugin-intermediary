import { readFile, writeFile } from "node:fs";
import { exportDefaultRegExp, exportNamedRegExp } from "./utils";

const cacheMap = new Map<string, string>();

/**
 * find to file is cached
 */
function isCache(key: string) {
  return cacheMap.has(key)
}

function watchCacheFileChange<T extends string>(fileName:T,fileData:T,target:T){
  if (!(exportDefaultRegExp.test(fileData) && exportNamedRegExp.test(fileData))) {
    // console.log('cacheMap.get(fileName)', cacheMap.get(fileName))
    if (cacheMap.get(fileName) == 'default') {
      console.log('default cache')

      readFile(target, 'utf8', function (err, data) {
        const fileBuffer = data.toString().replace(`export {default as ${fileName} } from './${fileName}'`, '')
        writeFile(target, fileBuffer, 'utf8', (err) => { })
        cacheMap.delete(fileName)
      })
    }
    if (cacheMap.get(fileName) == 'named') {
      console.log('named cache')
      readFile(target, 'utf8', function (err, data) {
        const fileBuffer = data.toString().replace(`export * as ${fileName} from './${fileName}'`, '')
        writeFile(target, fileBuffer, 'utf8', (err) => { })
        cacheMap.delete(fileName)
      })
    }
  }
}

export { cacheMap, isCache, watchCacheFileChange }
