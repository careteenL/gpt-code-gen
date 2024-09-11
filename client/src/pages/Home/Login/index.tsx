import { Form, Input, message, Modal, Spin } from "antd";
import { postLogin, PostLoginParams } from "../../../services";
import { useRequest } from "ahooks";
import { STORAGE_ACCESS_TOKEN } from "../../../utils";

export interface LoginProps {
  visible: boolean;
  changeVisible: (flag: boolean) => void;
  onSuccess?: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export default (props: LoginProps) => {
  const { visible, changeVisible, onSuccess } = props;
  const [formInstance] = Form.useForm<PostLoginParams>();

  const { loading, runAsync: postLoginRequest } = useRequest(postLogin, {
    manual: true,
    onSuccess(res) {
      const { code, data } = res.data;
      if (code === 200 || code === 201) {
        localStorage.setItem(STORAGE_ACCESS_TOKEN, data?.accessToken);
        message.success("登录成功");
        changeVisible(false);
        formInstance.resetFields();
        onSuccess?.();
      }
    },
  });

  async function onOk() {
    try {
      const values = await formInstance.validateFields();
      postLoginRequest(values);
    } catch (error) {
      console.log("error: ", error);
    }
  }
  function onCancel() {
    changeVisible(false);
    formInstance.resetFields();
  }
  return (
    <Modal
      title="登录"
      open={visible}
      okText="登录"
      cancelText="取消"
      onOk={onOk}
      onCancel={onCancel}
    >
      <Spin spinning={loading}>
        <Form
          form={formInstance}
          colon={false}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            name={"username"}
            label="用户名"
            required
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
            ]}
          >
            <Input placeholder="careteen" />
          </Form.Item>
          <Form.Item
            name={"password"}
            label="密码"
            required
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input placeholder="careteen" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
