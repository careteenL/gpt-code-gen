import { useEffect, useState } from "react";
import styles from "./index.module.less";
import classNames from "classnames";

export interface ErrorMessageProps {
  type?: "error" | "warn";
  content?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export default (props: ErrorMessageProps) => {
  const { content = "", type = "error" } = props;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!!content);
  }, [content]);

  function onDismiss() {
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={classNames(styles.message, styles[type])}>
      <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
      <button className={styles.dismiss} onClick={onDismiss}>
        x
      </button>
    </div>
  );
};
