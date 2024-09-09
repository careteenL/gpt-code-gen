import {
  Editor,
  OnMount,
  EditorProps as MonacoEditorProps,
} from "@monaco-editor/react";
// import styles from "./index.module.less";
import { createAta } from "./ata";
import { editor } from "monaco-editor";

export interface EditorProps {
  file: {
    name: string;
    value: string;
    language: string;
  };
  onChange?: MonacoEditorProps["onChange"];
  options?: editor.IStandaloneEditorConstructionOptions;
}

// eslint-disable-next-line react-refresh/only-export-components
export default (props: EditorProps) => {
  const { file, options, onChange } = props;
  const onMount: OnMount = (editor, monaco) => {
    // 配置 typescript
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    });

    // 增加快捷键
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });

    // 自动下载所使用的包的 ts 提示包
    const ata = createAta((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      );
    });

    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });

    ata(editor.getValue());
  };
  return (
    <Editor
      height={"100%"}
      path={file.name}
      language={file.language}
      value={file.value}
      onMount={onMount}
      onChange={onChange}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
    />
  );
};
