# 模拟 chatgpt 流式输出

![](https://raw.githubusercontent.com/careteenL/images/master/script/image_1730533942128.jpg)

- `fetch` 需要 `await` 两次才能拿到 `body`
  - 只要服务器响应了头信息，fetch 方法就立即结束了；资料[MDN fetch 概念用法解释](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API#%E6%A6%82%E5%BF%B5%E5%92%8C%E7%94%A8%E6%B3%95)
  - 第一个 await 等待的是 header
  - 第二个 await 等待的是 body
- `fs.createReadStream` 流式一个字节一个字节的读取文件内容，返回的格式为`Unit8Array`；资料[createReadStream.read([size])](https://nodejs.org/api/stream.html#readablereadsize)
- 使用 `TextDecoder`将`Unit8Array`解码为字符； 资料[TextDecoder 和 TextEncoder](https://zh.javascript.info/text-decoder)

```javascript
const response = await fetch("/json");
const body = await response.json();
console.log("body: ", body);
```

### 服务端读取

```javascript
const filePath = path.join(__dirname, "data.json");
const stream = fs.createReadStream(filePath, { encoding: "utf8" });

stream.on("readable", function () {
  const interval = setInterval(() => {
    const chunk = stream.read(1);
    if (chunk !== null) {
      res.write(chunk);
    } else {
      clearInterval(interval);
      res.end();
    }
  }, 2); // <--- slow!
});
```

### 客户端解析

```javascript
const fetchStream = async function () {
  outputBox.textContent = "";
  let response = await fetch("/json");
  const decoder = new TextDecoder("utf-8");
  for await (const value of response.body) {
    const chunk = decoder.decode(value);
    outputBox.textContent += chunk;
  }
};
```

## Usage

```shell
pnpm server
# 浏览器访问 http://localhost:8703/
```
