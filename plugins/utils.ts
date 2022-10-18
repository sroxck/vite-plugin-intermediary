
function getFileName(filePath: string): string {
  return filePath.replace(/(.*\/)*([^.]+).*/ig, "$2")
}

function getFileType(filePath: string): string {
  return filePath.split('.')[1]
}

const getFilePathRegExp = (dir: string): RegExp => {
  return new RegExp(dir)
}
const exportDefaultRegExp = /export *default/

const exportNamedRegExp = /export */

function getExportDefaultContent(fileName: string): string {
  return `export {default as ${fileName} } from './${fileName}'\n`
}

function getExportNameContent(fileName: string): string {
  return `export * as ${fileName} from './${fileName}'\n`
}

export {
  getFileName,
  getFileType,
  getFilePathRegExp,
  getExportDefaultContent,
  getExportNameContent,
  exportDefaultRegExp,
  exportNamedRegExp
}
