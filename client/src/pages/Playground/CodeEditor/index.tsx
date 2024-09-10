import { useContext } from "react";
import Editor, { EditorProps } from "../Editor";
import FileNameList from "../FileNameList";
import styles from "./index.module.less";
import { PlaygroundContext } from "../../../context/PlaygroundContext";
import { debounce } from "lodash-es";

export interface CodeEditorProps {
  name?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export default (props: CodeEditorProps) => {
  console.log("props: ", props);

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
      <FileNameList />
      <Editor file={file} onChange={debounce(onChange, 500)} />
    </div>
  );
};
