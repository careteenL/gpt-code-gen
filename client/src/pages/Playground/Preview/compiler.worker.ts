import { transform } from "@babel/standalone";
import { PluginObj } from '@babel/core'
import { PlaygroundFile, PlaygroundFiles } from "../../../context/PlaygroundContext";
import { MAIN_TSX } from "../../../mock/files";

/**
 * 根据入口文件进行编译
 * @param files 
 * @param entry 
 */
export const compile = (files: PlaygroundFiles, entry = MAIN_TSX) => {
  const entryFile = files[entry]
  return babelTransform(entry, entryFile.value, files)
}

/**
 * 使用 babel 进行编译代码和转换
 * @param entry 
 * @param entryCode 
 * @param files 
 */
export const babelTransform = (entry: string, entryCode: string, files: PlaygroundFiles) => {
  const code = beforeTransformCode(entry, entryCode)
  try {
    return transform(code, {
      presets: ['react', 'typescript'],
      filename: entry,
      plugins: [customResolver(files)],
      retainLines: true
    })?.code ?? ''
  } catch (error) {
    console.log('babelTransform error: ', error);
    return ''
  }
}

/**
 * 处理当某个文件没有 import React 时，在文件顶部自动引入
 * @param filename 
 * @param code 
 * @returns 
 */
function beforeTransformCode(filename: string, code: string) {
  let _code = code
  const regexReact = /import\s+React/g
  if ((filename.endsWith('.jsx') || filename.endsWith('.tsx')) && !regexReact.test(code)) {
    _code = `import React from 'react';\n${code}`
  }
  return _code
}

/**
 * 递归处理 import 语句
 * @param files 
 * @returns 
 */
function customResolver(files: PlaygroundFiles): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value
        // import './App.tsx'
        if (modulePath.startsWith('.')) {
          const file = getModuleFile(files, modulePath)
          if (!file) {
            return
          }

          // 处理不同文件后缀
          if (file.name.endsWith('css')) {
            path.node.source.value = css2Js(file)
          } else if (file.name.endsWith('json')) {
            path.node.source.value = json2Js(file)
          } else {
            path.node.source.value = js2Url(file, files)
          }
        }
      }
    }
  }
}

/**
 * 获取 import 模块的文件信息
 * @param files 
 * @param modulePath 
 */
function getModuleFile(files: PlaygroundFiles, modulePath: string) {
  // ./App.tsx -> App.tsx
  let moduleName = modulePath.split('./').pop() || ''
  if (!moduleName.includes('.')) {
    // import './App'时 从 files 找到真实的后缀 App.tsx
    const realModuleName = Object.keys(files).filter(key => {
      return key.endsWith('.ts') || key.endsWith('.tsx') || key.endsWith('js') || key.endsWith('jsx')
    }).find((key) => {
      return key.split('.').includes(moduleName)
    })
    if (realModuleName) {
      moduleName = realModuleName
    }
  }
  // 返回文件信息
  return files[moduleName]
}

/**
 * 将 css 文件转换为 js 类型
 * @param file 
 */
function css2Js(file: PlaygroundFile) {
  const randomId = Date.now()
  const jsCode = `
(() => {
  const stylesheet = document.createElement('style');
  stylesheet.setAttribute('id', 'style_${randomId}_${file.name}');
  document.head.appendChild(stylesheet);

  const stylesCode = document.createTextNode(\`${file.value}\`);
  stylesheet.innerHTML = '';
  stylesheet.appendChild(stylesCode);
})()
  `
  return URL.createObjectURL(new Blob([jsCode], { type: 'application/javascript' }))
}

/**
 * 将 json 文件转换为 js 类型
 * @param file 
 */
function json2Js(file: PlaygroundFile) {
  const jsCode = `export default ${file.value}`
  return URL.createObjectURL(new Blob([jsCode], { type: 'application/javascript' }))
}

/**
 * 将 js 文件递归转换为 url blob 类型
 * @param file 
 */
function js2Url(file: PlaygroundFile, files: PlaygroundFiles) {
  return URL.createObjectURL(new Blob([babelTransform(file.name, file.value, files)], {
    type: 'application/javascript',
  }))
}


/**
 * worker 监听 主线程的任务命令
 */
self.addEventListener('message', async (e) => {
  try {
    self.postMessage({
      type: 'COMPILED_CODE',
      data: compile(e.data)
    })
  } catch (error) {
    self.postMessage({
      type: 'ERROR',
      error
    })
  }
})