import styles from "./index.module.less";

export interface FileNameListProps {
  name?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export default (props: FileNameListProps) => {
  return (
    <div className={styles.editor}>
      <div>filename</div>
    </div>
  );
};
