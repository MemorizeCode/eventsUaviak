# Этап сборки
FROM node:18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install rollup@3.25.2 @rollup/rollup-linux-x64-gnu@4.6.1 --save-dev
COPY . .
RUN npm run build

# Этап запуска
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]