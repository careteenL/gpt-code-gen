import Playground from "../Playground";
import Header from "../Playground/Header";
import GPT from "./GPT";
import styles from "./index.module.less";

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.body}>
        <GPT />
        <Playground />
      </div>
    </div>
  );
};
