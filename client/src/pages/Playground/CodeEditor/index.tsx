import { useContext } from "react";
import Editor, { EditorProps } from "../Editor";
// import FileNameList from "../FileNameList";
import styles from "./index.module.less";
import { PlaygroundContext } from "../../../context/PlaygroundContext";
import { debounce } from "lodash-es";
import { Alert } from "antd";

export interface CodeEditorProps {
  name?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  const { files, selectedFilename, setFiles } = useContext(PlaygroundContext);

  const file = files[selectedFilename];

  const onChange: EditorProps["onChange"] = (value) => {
    setFiles({
      ...files,
      [selectedFilename]: {
        ...file,
        value: value ?? "",
      },
    });
  };
  return (
    <div className={styles.editor}>
      {/* <FileNameList /> */}
      <Editor file={file} onChange={debounce(onChange, 500)} />
      <div className={styles.tip}>
        <Alert
          closable
          message="提示"
          description="可增、删、改文件，并在右侧实时预览~"
        />
      </div>
    </div>
  );
};
