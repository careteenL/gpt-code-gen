import { ATABootstrapConfig, setupTypeAcquisition } from "@typescript/ata";
import typescript from 'typescript'

export function createAta(receivedFile: ATABootstrapConfig['delegate']['receivedFile']) {
  console.log('console 控制台打开 verbose level 查看 ata 自动下载的包');
  return setupTypeAcquisition({
    projectName: 'GPT-Playground',
    typescript,
    logger: console,
    delegate: {
      receivedFile(code, path) {
        console.debug('自动下载包：code, path: ', code, path);
        receivedFile?.(code, path)
      },
    }
  })
}