import { createContext, PropsWithChildren, useState } from "react";
import { filename2Language } from "../utils";
import { message } from "antd";

export interface PlaygroundFile {
  /**
   * 文件名
   */
  name: string;
  /**
   * 文件内容
   */
  value: string;
  /**
   * 文件语言
   */
  language: string;
}

export type PlaygroundFiles = Record<string, PlaygroundFile>;

export interface PlaygroundContextState {
  /**
   * 文件 map
   */
  files: PlaygroundFiles;
  /**
   * 当前选中文件名
   */
  selectedFilename: string;
  /**
   * 设置当前文件名
   * @param filename
   * @returns
   */
  setSelectedFilename: (filename: string) => void;
  /**
   * 设置多个文件
   * @param files
   * @returns
   */
  setFiles: (files: PlaygroundFiles) => void;
  /**
   * 新增文件
   * @param filename
   * @returns
   */
  addFile: (filename: string) => void;
  /**
   * 删除某个文件名
   * @param filename
   * @returns
   */
  removeFile: (filename: string) => void;
  /**
   * 更新文件名
   * @param oldFilename
   * @param newFilename
   * @returns true 修改成功 false 修改失败
   */
  updateFilename: (oldFilename: string, newFilename: string) => boolean;
}

export const PlaygroundContext = createContext<PlaygroundContextState>({});

export interface PlaygroundProviderProps extends PropsWithChildren {
  selectedFilename: string;
  files: PlaygroundFiles;
}

export const PlaygroundProvider = (props: PlaygroundProviderProps) => {
  const {
    children,
    selectedFilename: defaultSelectedFilename,
    files: defaultFiles,
  } = props;
  const [selectedFilename, setSelectedFilename] = useState(
    defaultSelectedFilename
  );
  const [files, setFiles] =
    useState<PlaygroundContextState["files"]>(defaultFiles);
  const addFile: PlaygroundContextState["addFile"] = (filename) => {
    setFiles({
      ...files,
      [filename]: {
        name: filename,
        value: "",
        language: filename2Language(filename),
      },
    });
  };
  const removeFile: PlaygroundContextState["removeFile"] = (filename) => {
    delete files[filename];
    setFiles({
      ...files,
    });
  };

  const updateFilename: PlaygroundContextState["updateFilename"] = (
    oldFilename,
    newFilename
  ) => {
    if (!files[oldFilename] || !newFilename) return false;
    const { [oldFilename]: oldFilenameValue, ...restFiles } = files;
    const otherKeys = Object.keys(files).filter((key) => key !== oldFilename);
    if (otherKeys.includes(newFilename)) {
      message.error(`文件${newFilename}已存在，请重新命名`);
      setFiles({
        ...files,
      });
      return false;
    }
    setFiles({
      ...restFiles,
      [newFilename]: {
        ...oldFilenameValue,
        name: newFilename,
        language: filename2Language(newFilename),
      },
    });
    return true;
  };

  return (
    <PlaygroundContext.Provider
      value={{
        files,
        setFiles,
        addFile,
        removeFile,
        selectedFilename,
        setSelectedFilename,
        updateFilename,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};
