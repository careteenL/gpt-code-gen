import { useContext, useEffect, useMemo, useRef, useState } from "react";
import CompilerWorker from "./compiler.worker?worker";
import styles from "./index.module.less";
import { PlaygroundContext } from "../../../context/PlaygroundContext";
import iframeRaw from "./iframe.html?raw";
import { IMPORT_MAP_JSON } from "../../../mock/files";
import ErrorMessage, {
  ErrorMessageProps,
} from "../../../components/ErrorMessage";
import { getIframeUrl } from "./utils";
import { message } from "antd";
import { debounce } from "lodash-es";

export interface PreviewProps {
  name?: string;
}

interface MessageData {
  type: ErrorMessageProps["type"];
  message: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export default (props: PreviewProps) => {
  const { files } = useContext(PlaygroundContext);

  const [compiledCode, setCompiledCode] = useState("");

  const compilerWorkerRef = useRef<Worker>();

  function initWorker() {
    if (!compilerWorkerRef.current) {
      compilerWorkerRef.current = new CompilerWorker();
      compilerWorkerRef.current.addEventListener("message", (e) => {
        if (e.data?.type === "COMPILED_CODE") {
          setCompiledCode(e.data?.data);
        } else {
          message.error(e.data);
        }
      });
    }
  }

  const iframeUrl = useMemo(() => {
    return getIframeUrl(iframeRaw, files, IMPORT_MAP_JSON, compiledCode);
  }, [files, compiledCode]);

  const [errorContent, setErrorContent] = useState("");
  const [errorType, setErrorType] =
    useState<ErrorMessageProps["type"]>("error");

  function handleMessage(e: MessageEvent<MessageData>) {
    const { type, message } = e.data;
    console.log("type: ", type, message);
    setErrorContent(message);
    setErrorType(type);
  }

  useEffect(() => {
    initWorker();
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(
    debounce(() => {
      // 文件变动时交给 webworker 计算编译后的代码
      if (compilerWorkerRef.current) {
        compilerWorkerRef.current.postMessage(files);
      }
    }, 500),
    [files]
  );

  return (
    <div className={styles.preview}>
      <iframe src={iframeUrl} className={styles.previewIframe} />
      <ErrorMessage type={errorType} content={errorContent} />
    </div>
  );
};
