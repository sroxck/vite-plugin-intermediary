function getFileName(filePath: string): string {
  return filePath.replace(/(.*\/)*([^.]+).*/ig, "$2")
}
const getFilePathRegExp = (dir:string):RegExp=>{
  return new RegExp(dir)
}
const exportDefaultRegExp = /export *default/g

const exportNamedRegExp = /export */g

export {
  getFileName,
  getFilePathRegExp,
  exportDefaultRegExp,
  exportNamedRegExp
}
