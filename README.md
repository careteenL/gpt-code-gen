# GPT 页面生成器

## 部署说明

```shell
docker-compose up

# 进去同步数据库
# 服务器
docker exec -it gpt-code-gen_gpt-server-app_1 /bin/sh
# 本地
docker exec -it gpt-code-gen-gpt-server-app-1 /bin/sh
npm run migration:run
```
