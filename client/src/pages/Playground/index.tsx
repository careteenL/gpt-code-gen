import { Allotment } from "allotment";
import "allotment/dist/style.css";
import styles from "./index.module.less";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import FileNameList from "./FileNameList";

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  return (
    <div className={styles.wrapper}>
      <Allotment defaultSizes={[20, 100, 100]}>
        <Allotment.Pane minSize={80}>
          <FileNameList />
        </Allotment.Pane>
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
