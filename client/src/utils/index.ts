import { strFromU8, strToU8, unzlibSync, zlibSync } from "fflate"

/**
 * 根据文件名得到文件类型
 * @param filename 
 * @returns 
 */
export function filename2Language(filename: string) {
  const fileArr = filename.split('.')
  const extname = fileArr[fileArr.length - 1]
  switch (extname) {
    case 'js':
    case 'jsx':
      return 'javascript'
    case 'ts':
    case 'tsx':
      return 'typescript'
    case 'json':
      return 'json'
    case 'css':
    case 'less':
      return 'css'
    default:
      return 'javascript'
  }
}

/**
 * 压缩字符串
 * @param data 
 */
export function compress(data: string) {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const binary = strFromU8(zipped, true)
  return btoa(binary)
}

/**
 * 解压成字符串
 * @param base64 
 */
export function uncompress(base64: string) {
  const binary = atob(base64)
  const buffer = strToU8(binary, true)
  const unzipped = unzlibSync(buffer)
  return strFromU8(unzipped)
}