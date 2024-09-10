import { Form, FormProps, Input, Select } from "antd";
// import styles from "./index.module.less";
import { modelOptions } from "../../../utils";
import { useContext, useEffect } from "react";
import {
  ConfigContext,
  ConfigContextState,
} from "../../../context/ConfigContext";

export interface ConfigurationProps {}

export type ConfigurationFormItem = Pick<
  ConfigContextState,
  "apiKey" | "baseUrl" | "model"
>;

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  const { apiKey, baseUrl, model, updateConfig } = useContext(ConfigContext);
  const [formInstance] = Form.useForm();

  const onValuesChange: FormProps["onValuesChange"] = (
    values: Partial<ConfigurationFormItem>
  ) => {
    console.log("values: ", values);
    updateConfig?.(values);
  };

  function init() {
    formInstance.setFieldsValue({
      apiKey,
      baseUrl,
      model,
    });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <Form form={formInstance} colon={false} onValuesChange={onValuesChange}>
        <Form.Item name="apiKey">
          <Input placeholder="请输入 apiKey" />
        </Form.Item>
        <Form.Item name="baseUrl">
          <Input placeholder="请输入 baseUrl" />
        </Form.Item>
        <Form.Item name="model">
          <Select options={modelOptions} placeholder="请选择 model" />
        </Form.Item>
      </Form>
    </div>
  );
};
