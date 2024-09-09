import styles from "./index.module.less";

export interface PreviewProps {
  name?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export default (props: PreviewProps) => {
  return (
    <div className={styles.preview}>
      <div></div>
    </div>
  );
};
