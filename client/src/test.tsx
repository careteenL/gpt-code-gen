import { useState } from "react";

function App() {
  const [num, setNum] = useState(0);
  return <div onClick={() => setNum((prev) => prev + 1)}>{num}</div>;
}

export default App;
