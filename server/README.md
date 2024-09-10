## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migration

本地开发迁移数据

```shell
# 找出当前项目和远端数据库表结构的差异，生成迁移代码
npm run migration:generate src/migrations/init
# 运行差异迁移代码
npm run migration:run
# 生成数据迁移的框架
npm run migration:create src/migrations/data
# 然后前往 src/migrations/data 将本地数据库导出的数据复制过来
# 运行差异迁移代码
npm run migration:run
```
