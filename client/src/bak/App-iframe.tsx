import { transform } from "@babel/standalone";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import iframeRaw from "./iframe.html?raw";

function App() {
  const addCode = `
function add(a: number, b: number) {
  return a + b
}
export { add }
`;

  const callAddCode = `
import { add } from './add';
console.log(add(1, 2));  
`;

  const [editorCode, setEditorCode] = useState(callAddCode);

  const addCodeUrl = URL.createObjectURL(
    new Blob([addCode], { type: "application/javascript" })
  );

  const iframeUrl = URL.createObjectURL(
    new Blob([iframeRaw], { type: "text/html" })
  );

  function onClick() {
    if (!editorCode) {
      return;
    }
    const res = transform(editorCode, {
      presets: ["react", "typescript"],
      filename: "App.tsx",
      plugins: [
        {
          visitor: {
            ImportDeclaration(path) {
              path.node.source.value = addCodeUrl;
            },
          },
        },
      ],
    });
    console.log(res.code);
  }

  return (
    <div>
      <Editor
        height={500}
        defaultLanguage="javascript"
        value={editorCode}
        onChange={(v) => setEditorCode(v!)}
      />
      <iframe
        src={iframeUrl}
        style={{
          width: "500px",
          height: "500px",
          padding: 0,
        }}
      />
      <button onClick={onClick}>编译</button>
    </div>
  );
}

export default App;
