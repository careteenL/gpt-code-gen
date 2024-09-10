import { PlaygroundFiles } from "../../../context/PlaygroundContext";

/**
 * 获取 iframe 的 url
 * @param iframeRaw
 * @param files
 * @param importMapJson
 * @param compiledCode
 * @returns
 */
export function getIframeUrl(
  iframeRaw: string,
  files: PlaygroundFiles,
  importMapJson: string,
  compiledCode: string
) {
  const htmlCode = iframeRaw
    .replace(
      '<script type="importmap"></script>',
      `<script type="importmap">${files[importMapJson].value}</script>`
    )
    .replace(
      '<script type="module" id="appSrc"></script>',
      `<script type="module" id="appSrc">${compiledCode}</script>`
    );
  return URL.createObjectURL(new Blob([htmlCode], { type: "text/html" }));
}