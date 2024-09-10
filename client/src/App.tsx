import { useEffect, useState } from "react";
import "./App.css";
import { ConfigContextState, ConfigProvider } from "./context/ConfigContext";
import { PlaygroundProvider } from "./context/PlaygroundContext";
import { APP_TSX, defaultFiles } from "./mock/files";
import Home from "./pages/Home";
import { modelOptions, STORAGE_CONFIG } from "./utils";

function App() {
  const [defaultFormValues, setDefaultFormValues] =
    useState<ConfigContextState>({
      apiKey: "",
      baseUrl: "https://api.openai.com",
      model: modelOptions?.[0]?.value as string,
    });

  function initDefaultValue() {
    try {
      const configValues = JSON.parse(
        localStorage.getItem(STORAGE_CONFIG) ?? ""
      );
      setDefaultFormValues(configValues);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    initDefaultValue();
  }, []);

  return (
    <div>
      <ConfigProvider formValues={defaultFormValues}>
        <PlaygroundProvider files={defaultFiles} selectedFilename={APP_TSX}>
          <Home />
        </PlaygroundProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
