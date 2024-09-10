import copy from "copy-to-clipboard";
import styles from "./index.module.less";
import * as Icon from "@ant-design/icons";
import { message } from "antd";
import { useContext } from "react";
import { PlaygroundContext } from "../../../context/PlaygroundContext";
import { downloadFiles } from "../../../utils";

export interface HeaderProps {
  name?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export default (props: HeaderProps) => {
  const { name = "Playground" } = props;

  const { files } = useContext(PlaygroundContext);

  function onShareLink() {
    copy(window.location.href);
    message.success("分享链接已复制");
  }

  async function onDownload() {
    await downloadFiles(files);
    message.success("下载成功");
  }

  return (
    <div className={styles.header}>
      <div>
        <div className={styles.logo}></div>
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.utils}>
        <Icon.ShareAltOutlined
          title="复制当前链接"
          className={styles.icon}
          onClick={onShareLink}
        />
        <Icon.DownloadOutlined
          title="下载当前项目"
          className={styles.icon}
          onClick={onDownload}
        />
      </div>
    </div>
  );
};
