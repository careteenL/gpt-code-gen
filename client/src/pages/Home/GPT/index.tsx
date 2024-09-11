import { Button, Collapse, CollapseProps, Input, message } from "antd";
import styles from "./index.module.less";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Configuration, { ConfigurationRef } from "../Configuration";
import History from "../History";
import { ConfigContext } from "../../../context/ConfigContext";
import { useRequest } from "ahooks";
import { getHistory, getHistoryList, postGptGenerate } from "../../../services";
import { PlaygroundContext } from "../../../context/PlaygroundContext";
import { APP_TSX } from "../../../mock/files";
import { STORAGE_CONFIG } from "../../../utils";

const DEFAULT_TIP =
  "请耐心等候编译，也可以编辑文件内容触发重新编译，再查看显示效果";

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  const { setFiles, files } = useContext(PlaygroundContext);
  const [inputValue, setInputValue] = useState("");

  const file = files[APP_TSX];

  const {
    loading: getHistoryLoading,
    runAsync: getHistoryListRequest,
    data: historyData,
  } = useRequest(getHistoryList, {
    manual: true,
  });

  const { loading, runAsync: postGptGenerateRequest } = useRequest(
    postGptGenerate,
    {
      manual: true,
      onSuccess(res) {
        console.log("res: ", res);
        const { code, data } = res.data;
        if (code === 200 || code === 201) {
          setFiles({
            ...files,
            [APP_TSX]: {
              ...file,
              value: data ?? "",
            },
          });
          // 刷新历史记录
          getHistoryListRequest();
          // 清空输入项
          setInputValue("");
          message.info(DEFAULT_TIP);
        }
      },
    }
  );

  const { runAsync: getHistoryRequest } = useRequest(getHistory, {
    manual: true,
    onSuccess: (res) => {
      console.log("res: ", res);
      const { code, data } = res?.data || {};
      if (code === 200 || code === 201) {
        setFiles({
          ...files,
          [APP_TSX]: {
            ...file,
            value: data?.result ?? "",
          },
        });
        message.info(DEFAULT_TIP);
      }
    },
  });

  const historyDataSource = useMemo(() => {
    const { code, data } = historyData?.data || {};
    if (code === 200 || code === 201) {
      return data;
    }
  }, [historyData]);

  const { apiKey, baseUrl, model, updateConfig } = useContext(ConfigContext);

  const configRef = useRef<ConfigurationRef>(null);

  const items: CollapseProps["items"] = [
    {
      key: "config",
      label: "配置 API Key",
      children: <Configuration ref={configRef} />,
    },
    {
      key: "history",
      label: "历史记录",
      children: (
        <History
          loading={getHistoryLoading}
          dataSource={historyDataSource}
          onClickItem={onClickHistoryItem}
        />
      ),
    },
  ];

  function onClickHistoryItem(id: number) {
    getHistoryRequest(id);
  }

  async function onGenerate() {
    if (!apiKey || !baseUrl || !model) {
      message.error("请配置 apiKey");
      return;
    }
    if (!inputValue) {
      message.error("请输入内容");
      return;
    }
    postGptGenerateRequest({
      apiKey,
      baseUrl,
      model,
      prompt: inputValue,
    });
  }

  useEffect(() => {
    getHistoryListRequest();
    initDefaultValue();
  }, []);

  function initDefaultValue() {
    try {
      const configValues: any = JSON.parse(
        localStorage.getItem(STORAGE_CONFIG) ?? ""
      );
      updateConfig?.(configValues);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    configRef.current?.setFieldsValue({
      apiKey,
      baseUrl,
      model,
    });
  }, [apiKey, baseUrl, model]);

  return (
    <div className={styles.body}>
      <Collapse
        className={styles.collapse}
        items={items}
        accordion
        defaultActiveKey={"config"}
      />
      <div className={styles.inputWrapper}>
        <Input.TextArea
          placeholder="例如：生成一个 Mac 风格的计算器页面"
          value={inputValue}
          rows={4}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {!loading ? (
          <Button
            type={"primary"}
            onClick={onGenerate}
            className={styles.button}
          >
            生成页面
          </Button>
        ) : (
          <Button className={styles.button} type={"primary"} disabled>
            生成中...
          </Button>
        )}
      </div>
    </div>
  );
};
