import Editor, { EditorProps } from "../Editor";
import FileNameList from "../FileNameList";
import styles from "./index.module.less";

export interface CodeEditorProps {
  name?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export default (props: CodeEditorProps) => {
  console.log("props: ", props);
  const file: EditorProps["file"] = {
    name: "App.tsx",
    language: "typescript",
    value: `import lodash from 'lodash'; export default () => { return <div>App</div> }`,
  };

  const onChange: EditorProps["onChange"] = (value) => {
    console.log("value: ", value);
  };
  return (
    <div className={styles.editor}>
      <FileNameList />
      <Editor file={file} onChange={onChange} />
    </div>
  );
};
