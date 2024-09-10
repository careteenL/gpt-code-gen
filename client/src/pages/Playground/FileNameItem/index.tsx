import { useEffect, useRef, useState } from "react";
import styles from "./index.module.less";
import classNames from "classnames";
import { Popconfirm } from "antd";

export interface FileNameItemProps {
  value: string;
  active?: boolean;
  creating?: boolean; // 当前是否为新建
  onClick: () => void;
  onEditComplete: (name: string) => void;
  readonly?: boolean;
  onDelete: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export default (props: FileNameItemProps) => {
  const {
    value,
    active = false,
    onClick,
    onDelete,
    onEditComplete,
    creating = false,
    readonly = false,
  } = props;
  const [name, setName] = useState(value);
  const [editing, setEditing] = useState(creating);

  const inputRef = useRef<HTMLInputElement>(null);

  function onDoubleClick() {
    if (!readonly) {
      setEditing(true);
      inputRef.current?.focus();
    }
  }

  function onBlur() {
    setEditing(false);
    onEditComplete(name);
  }

  function onDeleteInner(e?: React.MouseEvent<HTMLElement>) {
    e?.stopPropagation();
    onDelete();
  }

  useEffect(() => {
    if (creating) {
      inputRef.current?.focus();
    }
  }, [creating]);

  return (
    <div
      className={classNames(styles.tabItem, active ? styles.tabActive : "")}
      onClick={onClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          onBlur={onBlur}
        />
      ) : (
        <>
          <span onDoubleClick={onDoubleClick}>{name}</span>
          {!readonly && (
            <Popconfirm
              title="确认删除该文件？"
              okText="确定"
              cancelText="取消"
              onConfirm={onDeleteInner}
            >
              <span className={styles.delete}>x</span>
            </Popconfirm>
          )}
        </>
      )}
    </div>
  );
};
