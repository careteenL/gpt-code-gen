import { useContext, useMemo } from "react";
import { compile, getIframeUrl } from "./compiler";
import styles from "./index.module.less";
import { PlaygroundContext } from "../../../context/PlaygroundContext";
// import Editor from "../Editor";
import iframeRaw from "./iframe.html?raw";
import { IMPORT_MAP_JSON } from "../../../mock/files";

export interface PreviewProps {
  name?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export default (props: PreviewProps) => {
  const { files } = useContext(PlaygroundContext);
  const compiledCode = useMemo(() => {
    return compile(files);
  }, [files]);

  const iframeUrl = useMemo(() => {
    return getIframeUrl(iframeRaw, files, IMPORT_MAP_JSON, compiledCode);
  }, [files, compiledCode]);

  return (
    <div className={styles.preview}>
      <iframe src={iframeUrl} className={styles.previewIframe} />
      {/* <Editor
        file={{
          name: "dist.js",
          value: compiledCode,
          language: "javascript",
        }}
      /> */}
    </div>
  );
};
