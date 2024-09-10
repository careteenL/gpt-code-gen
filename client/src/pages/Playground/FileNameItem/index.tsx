import { useState } from "react";
import styles from "./index.module.less";
import classNames from "classnames";

export interface FileNameItemProps {
  value: string;
  active?: boolean;
  onClick: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export default (props: FileNameItemProps) => {
  const { value, active = false, onClick } = props;
  const [name, setName] = useState(value);
  return (
    <div
      className={classNames(styles.tabItem, active ? styles.tabActive : "")}
      onClick={onClick}
    >
      {name}
    </div>
  );
};
