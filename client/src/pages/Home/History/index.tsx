import { Avatar, List, ListProps } from "antd";
import styles from "./index.module.less";

export interface HistoryProps {
  loading: boolean;
  dataSource: ListProps<any>["dataSource"];
  onClickItem: (id: number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export default (props: HistoryProps) => {
  const { dataSource, onClickItem } = props;

  function onClickItemInner(item: any) {
    console.log("item: ", item);
    onClickItem(item.id);
  }

  return (
    <div className={styles.body}>
      {/* <Spin spinning={loading}> */}
      <List
        itemLayout="horizontal"
        className={styles.list}
        dataSource={dataSource}
        renderItem={(item: any, index) => (
          <List.Item
            className={styles.listItem}
            onClick={() => onClickItemInner(item)}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={item?.createTime}
              description={item?.prompt}
            />
          </List.Item>
        )}
      />
      {/* </Spin> */}
    </div>
  );
};
