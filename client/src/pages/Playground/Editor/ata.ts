import { ATABootstrapConfig, setupTypeAcquisition } from "@typescript/ata";
import typescript from 'typescript'

export function createAta(receivedFile: ATABootstrapConfig['delegate']['receivedFile']) {
  return setupTypeAcquisition({
    projectName: 'GPT-Playground',
    typescript,
    logger: console,
    delegate: {
      receivedFile(code, path) {
        console.log('自动下载包：code, path: ', code, path);
        receivedFile?.(code, path)
      },
    }
  })
}