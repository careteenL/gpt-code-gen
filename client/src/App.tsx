import Playground from "./pages/Playground";
import "./App.css";
import { PlaygroundProvider } from "./context/PlaygroundContext";
import { APP_TSX, defaultFiles } from "./mock/files";

function App() {
  return (
    <div>
      <PlaygroundProvider files={defaultFiles} selectedFilename={APP_TSX}>
        <Playground />
      </PlaygroundProvider>
    </div>
  );
}

export default App;
