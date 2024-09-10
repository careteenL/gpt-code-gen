# # build stage
# FROM node as build-stage

# WORKDIR /app

# COPY package.json ./

# RUN npm config set registry https://registry.npmmirror.com/

# RUN npm install

# COPY . .

# RUN CI=1 npm run build

# # production stage
# FROM nginx:stable as production-stage

# COPY --from=build-stage /app/build /usr/share/nginx/html

# COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]


# 上面方式如果服务器内存配置小，会失败，使用下面方式，在本地先构建完成后 把 build 产物复制到 nginx 中
# production stage
FROM nginx:stable as production-stage

COPY dist/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]