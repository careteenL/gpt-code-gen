# GPT 页面生成器+在线编辑实时预览

## 技术栈

- 前端 create-vite + React + Antd + Axios + @babel/standalone + URL + Blob + @monoco-editor/react + iframe + fflate + btoa
- 后端 Nestjs + @nestjs/typeorm + @nestjs/jwt + GPT api-key

## 功能描述

- 使用 ChatGPT 预置 prompt 结合用户输入需求生成前端代码
- 支持类似于在 vscode IDE 中进行代码的增删改操作，并实时编译预览显示效果
- 支持下载代码和分享链接

![gpt-preview](https://careteenl.github.io/images/project/gpt/gpt-preview.png)

## 技术难点

- 后端使用 nestjs 开发项目 、 typeorm mysql 存储数据、jwt 鉴权
- 前端使用 create-vite React 开发项目、context 管理全局状态
- 前端使用 @monaco-editor/react 实现网页版代码编辑展示，并通过 @typescript/ata 实现自动导入类型支持代码提示
- 前端使用 URL.creteObjectURL(new Blob()) 实现代码块的地址生成，并使用 import 'blob://' 进行引用，通过 script 标签的 importmap 类型引入 React Antd 等第三方依赖包
- 前端使用 @babel/standalone 实现编译文件，并编写插件递归处理所有 import 语句的 source 替换为'blob://'地址，并处理 css 和 json 文件转为 js 文件类型
- 前端使用 iframe 预览页面，并使用 postMessage 将 iframe 的报错信息通信给主应用进行展示
- 前端使用 fflate 对所有文件内容压缩成 base64 与 location 关联、并再解压实现分享功能
- 前端使用 web worker 处理 @babel/standalone 的编译过程，优化性能
- 整体使用 docker-compose 部署到阿里云服务器

## 本地开发

```shell
cd server && yarn && yarn start:dev
cd client && yarn && yarn dev
```

## 部署说明

本地开发完成后，需要前往 client 处先 build 代码

```shell
cd client
yarn build
git add . && git cz
```

在服务器端使用 docker 部署

```shell
git clone git@github.com:careteenL/gpt-code-gen.git
cd gpt-code-gen
docker-compose down --rmi all
docker-compose up -d
# 首次部署需要进去同步数据库
# 服务器
docker exec -it gpt-code-gen_gpt-server-app_1 /bin/sh
# 本地
docker exec -it gpt-code-gen-gpt-server-app-1 /bin/sh
npm run migration:run

# 端口暴露
# 前端 8700
# API 8701
# Mysql 8702
```
