import { transform } from "@babel/standalone";
import { useRef } from "react";

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

  const ref = useRef<HTMLTextAreaElement>(null);

  const addCodeUrl = URL.createObjectURL(
    new Blob([addCode], { type: "application/javascript" })
  );

  function onClick() {
    if (!ref.current) {
      return;
    }
    const res = transform(callAddCode, {
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
      <textarea
        ref={ref}
        style={{ width: "500px", height: "300px" }}
        defaultValue={callAddCode}
      ></textarea>
      <button onClick={onClick}>编译</button>
    </div>
  );
}

export default App;
