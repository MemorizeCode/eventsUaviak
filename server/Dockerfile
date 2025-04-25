FROM node:18-alpine

WORKDIR /app

# Копируем зависимости и файлы Prisma
COPY package*..json ./
COPY prisma ./prisma/

# Установка зависимостей
RUN npm cache clean --force && \
    npm config set registry https://registry.npmmirror.com && \
    npm install --ignore-scripts

# Генерация Prisma-клиента
RUN npx prisma generate

# Копируем исходный код и собираем проект
COPY . .
RUN npm run build

EXPOSE 3000

# Применяем миграции и запускаем приложение
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]