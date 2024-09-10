import { createContext, PropsWithChildren, useState } from "react";
import { modelOptions, STORAGE_CONFIG } from "../utils";

export interface ConfigContextState {
  apiKey: string;
  baseUrl: string;
  model: string;
  updateConfig?: (values: Partial<ConfigContextState>) => void;
}

const defaultConfigContextState: ConfigContextState = {
  apiKey: "",
  baseUrl: "",
  model: (modelOptions?.[0]?.value as string) || "",
};

export const ConfigContext = createContext<ConfigContextState>(
  defaultConfigContextState
);

export interface ConfigProviderProps extends PropsWithChildren {
  formValues: ConfigContextState;
}

export const ConfigProvider = (props: ConfigProviderProps) => {
  const { children, formValues } = props;

  const [configFormValues, setConfigFormValues] =
    useState<ConfigContextState>(formValues);

  const updateConfig: ConfigContextState["updateConfig"] = (values) => {
    const newValues = {
      ...configFormValues,
      ...values,
    };
    setConfigFormValues(newValues);

    localStorage.setItem(STORAGE_CONFIG, JSON.stringify(newValues));
  };

  return (
    <ConfigContext.Provider
      value={{
        ...configFormValues,
        updateConfig,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
