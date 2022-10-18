/**
 * provide file append write function 
 */

import { appendFile } from "fs";
import { cacheMap } from "./cache";
import { exportDefaultRegExp, exportNamedRegExp, getExportDefaultContent, getExportNameContent } from "./utils";

function setExportDefaultContent<T extends string>(fileName: T, target: T, fileData: T): boolean {
  if (cacheMap.has(fileName)) return true
  let result: string;
  if (exportDefaultRegExp.test(fileData)) {
    result = getExportDefaultContent(fileName)
    cacheMap.set(fileName, 'default')

  } else {
    if (exportNamedRegExp.test(fileData)) {
      result = getExportNameContent(fileName)
      cacheMap.set(fileName, 'named')
    }
  }

  if (result === undefined) return false
  result && appendFile(target, result, (err: NodeJS.ErrnoException) => {
    if (err) {
      console.warn('write error', err)
    }
  })
  return false
}
export { setExportDefaultContent }
