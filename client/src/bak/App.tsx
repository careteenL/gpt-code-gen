import { transform } from "@babel/standalone";
import { useRef } from "react";

function App() {
  const code = `import { useState } from "react";

function App() {
  const [num, setNum] = useState(0);
  return <div onClick={() => setNum((prev) => prev + 1)}>{num}</div>;
}

export default App;
`;

  const ref = useRef<HTMLTextAreaElement>(null);

  function onClick() {
    if (!ref.current) {
      return;
    }
    const res = transform(ref.current.value, {
      presets: ["react", "typescript"],
      filename: "App.tsx",
    });
    console.log(res.code);
  }

  return (
    <div>
      <textarea
        ref={ref}
        style={{ width: "500px", height: "300px" }}
        defaultValue={code}
      ></textarea>
      <button onClick={onClick}>编译</button>
    </div>
  );
}

export default App;
