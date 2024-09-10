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