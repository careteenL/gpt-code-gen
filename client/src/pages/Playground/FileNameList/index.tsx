import { useContext, useMemo, useState } from "react";
import styles from "./index.module.less";
import { PlaygroundContext } from "../../../context/PlaygroundContext";
import FileNameItem from "../FileNameItem";
import { MAIN_TSX, readonlyFilenames } from "../../../mock/files";

export interface FileNameListProps {
  name?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export default (props: FileNameListProps) => {
  const {
    files,
    setSelectedFilename,
    selectedFilename,
    updateFilename,
    addFile,
    removeFile,
  } = useContext(PlaygroundContext);

  const [creating, setCreating] = useState(false);
  const tabs = useMemo(() => {
    return Object.keys(files);
  }, [files]);

  function onEditComplete(newName: string, oldName: string) {
    if (updateFilename(oldName, newName)) {
      setSelectedFilename(newName);
    } else {
      setSelectedFilename(oldName);
    }
    setCreating(false);
  }

  function onAdd() {
    addFile(`Com${Math.random().toString().slice(2, 6)}.tsx`);
    setCreating(true);
  }

  function onDelete(currentFilename: string) {
    removeFile(currentFilename);
    setSelectedFilename(MAIN_TSX);
  }

  return (
    <div className={styles.filenameList}>
      {tabs.map((tab, index, arr) => (
        <FileNameItem
          key={`${tab}_${index}`}
          value={tab}
          creating={creating && index === arr.length - 1}
          active={selectedFilename === tab}
          readonly={readonlyFilenames.includes(tab)}
          onClick={() => setSelectedFilename(tab)}
          onDelete={() => onDelete(tab)}
          onEditComplete={(name) => onEditComplete(name, tab)}
        />
      ))}
      <div className={styles.add} onClick={onAdd}>
        +
      </div>
    </div>
  );
};
