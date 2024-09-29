import { Form, FormProps, Input, Select } from "antd";
// import styles from "./index.module.less";
import { modelOptions } from "../../../utils";
import { forwardRef, useContext, useImperativeHandle } from "react";
import {
  ConfigContext,
  ConfigContextState,
} from "../../../context/ConfigContext";

export interface ConfigurationProps {
  // ref: any
}

export type ConfigurationFormItem = Pick<
  ConfigContextState,
  "apiKey" | "baseUrl" | "model"
>;

export interface ConfigurationRef {
  setFieldsValue: (values: Partial<ConfigurationFormItem>) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export default forwardRef<ConfigurationRef, ConfigurationProps>((_, ref) => {
  const { updateConfig } = useContext(ConfigContext);
  const [formInstance] = Form.useForm();

  const onValuesChange: FormProps["onValuesChange"] = (
    values: Partial<ConfigurationFormItem>
  ) => {
    console.log("values: ", values);
    updateConfig?.(values);
  };

  function setFieldsValue(values: Partial<ConfigurationFormItem>) {
    formInstance.setFieldsValue({
      ...values,
    });
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        setFieldsValue,
      };
    },
    [ref]
  );

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
});
