import { strFromU8, strToU8, unzlibSync, zlibSync } from "fflate"
import { PlaygroundFiles } from "../context/PlaygroundContext"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { SelectProps } from "antd"

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

/**
 * 下载文件成 zip
 * @param files 
 */
export async function downloadFiles(files: PlaygroundFiles) {
  const zip = new JSZip()
  Object.keys(files).forEach(filename => {
    zip.file(filename, files[filename].value)
  })

  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, `GPT_Code_${Date.now()}.zip`)
}


/**
 * gpt 模式类型
 */
export const modelOptions: SelectProps['options'] = [
  {
    value: 'gpt-4',
    label: 'GPT-4'
  },
  {
    value: 'gpt-4o',
    label: 'GPT-40'
  },
  {
    value: 'gemini-pro',
    label: 'Gemini Pro'
  },
]

/**
 * 配置
 */
export const STORAGE_CONFIG = 'STORAGE_CONFIG'