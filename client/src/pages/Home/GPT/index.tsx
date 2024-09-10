import { Button, Collapse, CollapseProps, Input, message } from "antd";
import styles from "./index.module.less";
import { useContext, useEffect, useMemo, useState } from "react";
import Configuration from "../Configuration";
import History from "../History";
import { ConfigContext } from "../../../context/ConfigContext";
import { useRequest } from "ahooks";
import { getHistory, getHistoryList, postGptGenerate } from "../../../services";
import { PlaygroundContext } from "../../../context/PlaygroundContext";
import { APP_TSX } from "../../../mock/files";

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

  const { runAsync: postGptGenerateRequest } = useRequest(postGptGenerate, {
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
      }
    },
  });

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
        message.info(
          "请耐心等候编译，也可以编辑文件内容触发重新编译，再查看显示效果"
        );
      }
    },
  });

  const historyDataSource = useMemo(() => {
    const { code, data } = historyData?.data || {};
    if (code === 200 || code === 201) {
      return data;
    }
  }, [historyData]);

  const { apiKey, baseUrl, model } = useContext(ConfigContext);

  const items: CollapseProps["items"] = [
    {
      key: "config",
      label: "配置 API",
      children: <Configuration />,
    },
    {
      key: "history",
      label: "生成历史",
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
  }, []);

  return (
    <div className={styles.body}>
      <Collapse items={items} defaultActiveKey={"history"} />
      <div className={styles.inputWrapper}>
        <Input.TextArea
          placeholder="请输入"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type={"primary"} onClick={onGenerate} className={styles.button}>
          生成页面
        </Button>
      </div>
    </div>
  );
};
