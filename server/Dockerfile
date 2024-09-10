# FROM node:18.0-alpine3.14 as build-stage
FROM node as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8701

CMD ["node", "/app/dist/main.js"]

# 下面方式不能满足在 docker 里迁移数据库数据
# # production stage
# FROM node as production-stage

# COPY --from=build-stage /app/dist /app
# COPY --from=build-stage /app/package.json /app/package.json

# WORKDIR /app

# RUN npm config set registry https://registry.npmmirror.com/

# RUN npm install --production

# EXPOSE 3001

# CMD ["node", "/app/main.js"]


# # FROM node:18.0-alpine3.14 as build-stage
# FROM node as build-stage

# WORKDIR /app

# COPY package.json .

# RUN npm config set registry https://registry.npmmirror.com/

# RUN npm install

# COPY . .

# RUN npm run build

# # production stage
# FROM node as production-stage

# COPY --from=build-stage /app/dist /app
# COPY --from=build-stage /app/package.json /app/package.json

# WORKDIR /app

# RUN npm config set registry https://registry.npmmirror.com/

# RUN npm install --production

# EXPOSE 3001

# CMD ["node", "/app/main.js"]