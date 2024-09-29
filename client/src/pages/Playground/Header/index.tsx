import copy from "copy-to-clipboard";
import styles from "./index.module.less";
import * as Icon from "@ant-design/icons";
import { message } from "antd";
import { useContext } from "react";
import { PlaygroundContext } from "../../../context/PlaygroundContext";
import { downloadFiles } from "../../../utils";
import logo from "../../../assets/32.png";

export interface HeaderProps {
  name?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export default (props: HeaderProps) => {
  const { name = "GPT 代码生成器" } = props;

  const { files } = useContext(PlaygroundContext);

  function onShareLink() {
    copy(window.location.href);
    message.success("分享链接已复制");
  }

  async function onDownload() {
    await downloadFiles(files);
    message.success("下载成功");
  }

  function onLogo() {
    window.open("http://careteen.cn", "__blank");
  }

  function onGotoGithub() {
    window.open("https://github.com/careteenL/gpt-code-gen/", "__blank");
  }

  return (
    <div className={styles.header}>
      <div className={styles.nameWrapper}>
        <img src={logo} className={styles.logo} onClick={onLogo}></img>
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
        <Icon.GithubOutlined
          title="前往 github"
          className={styles.icon}
          onClick={onGotoGithub}
        />
      </div>
    </div>
  );
};
