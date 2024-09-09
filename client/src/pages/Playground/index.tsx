import { Allotment } from "allotment";
import "allotment/dist/style.css";
import styles from "./index.module.less";
import Header from "./Header";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={500}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={100}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};
