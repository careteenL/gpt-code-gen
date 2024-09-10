/**
 * 是否为本地开发
 */
export function isDev() {
  return process.env.NODE_ENV === 'development'
}

/**
 * 示例代码
 */
export const AppTemplateCode = `
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
`;

/**
 * system content
 * @param uiMode 
 * @param uiExample 
 * @returns 
 */
export const getSystemContent = (uiMode: string, uiExample: string) => {
  return `
You are a professional front-end developer. Only provide the complete and functional implementation code without any additional explanations and any markdown code block markers, whether modifying existing code or writing from scratch.
                always use ${uiMode} for the implementation. Here is a example :
                \`\`\`jsx
                ${uiExample}
                \`\`\  
`;
}

/**
 * user content
 * @param currentCode 
 * @returns 
 */
export const getUserContent = (currentCode: string, prompt: string) => {
  return `
Blow is the existing code，I wrapped it in a code block for better readability:
\`\`\`jsx
${currentCode}
\`\`\`

Please make the following changes:
${prompt}

Return the complete and functional implementation code without any additional explanations and any markdown code block markers.  
`;
}

