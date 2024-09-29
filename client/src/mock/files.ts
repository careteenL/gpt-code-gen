import { PlaygroundFiles } from "../context/PlaygroundContext";
import { filename2Language } from "../utils";

import AppTsxRaw from '../template/App.tsx?raw'
import AppCssRaw from '../template/App.css?raw'
import MainTsxRaw from '../template/main.tsx?raw'
import ImportMapJsonRaw from '../template/import-map.json?raw'

export const APP_TSX = 'App.tsx'
export const APP_CSS = 'App.css'
export const MAIN_TSX = 'main.tsx'
export const IMPORT_MAP_JSON = 'import-map.json'

// 不能改名和删除的文件
export const readonlyFilenames = [MAIN_TSX, IMPORT_MAP_JSON, APP_TSX]

/**
 * 默认的 create-vite 项目模板代码
 */
export const defaultFiles: PlaygroundFiles = {
  [APP_TSX]: {
    name: APP_TSX,
    value: AppTsxRaw,
    language: filename2Language(APP_TSX)
  },
  [APP_CSS]: {
    name: APP_CSS,
    value: AppCssRaw,
    language: filename2Language(APP_CSS)
  },
  [MAIN_TSX]: {
    name: MAIN_TSX,
    value: MainTsxRaw,
    language: filename2Language(MAIN_TSX)
  },
  [IMPORT_MAP_JSON]: {
    name: IMPORT_MAP_JSON,
    value: ImportMapJsonRaw,
    language: filename2Language(IMPORT_MAP_JSON)
  },
}

/**
 * 默认的历史文件
 */
export const defaultHistory = [
  {
    createTime: "2024-06-29T08:06:29.886Z",
    id: -1,
    prompt: "Hello GPT",
    result: AppTsxRaw
  }
]