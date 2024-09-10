import { useContext, useEffect, useMemo, useState } from "react";
import { compile, getIframeUrl } from "./compiler";
import styles from "./index.module.less";
import { PlaygroundContext } from "../../../context/PlaygroundContext";
import iframeRaw from "./iframe.html?raw";
import { IMPORT_MAP_JSON } from "../../../mock/files";
import ErrorMessage, {
  ErrorMessageProps,
} from "../../../components/ErrorMessage";

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
  const compiledCode = useMemo(() => {
    return compile(files);
  }, [files]);

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
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className={styles.preview}>
      <iframe src={iframeUrl} className={styles.previewIframe} />
      <ErrorMessage type={errorType} content={errorContent} />
    </div>
  );
};
