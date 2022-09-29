/**
 * handle file cache
 */
function fileCache(){
  
}

/**
 * find to file is cached
 */
function isCache(key:string){
  return cacheMap.has(key)
}
const cacheMap = new Map<string, string>();
export { cacheMap,isCache }
