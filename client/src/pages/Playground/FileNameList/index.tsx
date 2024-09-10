import { useContext, useMemo } from "react";
import styles from "./index.module.less";
import { PlaygroundContext } from "../../../context/PlaygroundContext";
import FileNameItem from "../FileNameItem";

export interface FileNameListProps {
  name?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export default (props: FileNameListProps) => {
  const { files, setSelectedFilename, selectedFilename } =
    useContext(PlaygroundContext);
  const tabs = useMemo(() => {
    return Object.keys(files);
  }, [files]);
  return (
    <div className={styles.filenameList}>
      {tabs.map((tab, index) => (
        <FileNameItem
          key={`${index}`}
          value={tab}
          active={selectedFilename === tab}
          onClick={() => setSelectedFilename(tab)}
        />
      ))}
    </div>
  );
};
