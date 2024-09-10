import { Button, Form, Input, Table } from "antd";

const App = () => {
  return (
    <div>
      <Form>
        <Form.Item>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item>
          <Button>提交</Button>
        </Form.Item>
      </Form>
      <Table columns={[]} dataSource={[]} />
    </div>
  );
};

export default App;
