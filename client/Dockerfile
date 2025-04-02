#old
# FROM node:18 
# # FROM mirror.gcr.io/library/node:18

# WORKDIR /app

# COPY package*.json ./

# RUN npm ci

# RUN npm install rollup@3.25.2 @rollup/rollup-linux-x64-gnu@4.6.1 --save-dev

# COPY . .

# RUN npm run build

# # Этап запуска
# FROM nginx:alpine

# COPY --from=builder /app/dist /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]



# через это не работает, использую зеркало
# FROM node:18 
FROM mirror.gcr.io/library/node:18 as builder

WORKDIR /app

COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com && npm ci
RUN npm install rollup@3.25.2 @rollup/rollup-linux-x64-gnu@4.6.1 --save-dev

COPY . .
RUN npm run build

# Создаем и проверяем архив
RUN tar -czf /app/dist.tar.gz -C /app/dist .
RUN ls -la /app/dist.tar.gz  # Проверяем, что файл существует

FROM nginx:alpine

COPY --from=builder /app/dist.tar.gz /tmp/
RUN tar -xzf /tmp/dist.tar.gz -C /usr/share/nginx/html && rm /tmp/dist.tar.gz
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]