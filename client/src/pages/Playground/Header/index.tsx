import styles from "./index.module.less";

export interface HeaderProps {
  name?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export default (props: HeaderProps) => {
  const { name = "Playground" } = props;
  return <div className={styles.header}>{name}</div>;
};
