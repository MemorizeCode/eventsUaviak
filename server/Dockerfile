FROM node:18-alpine

WORKDIR /app

# Устанавливаем переменную окружения для зеркала Prisma потому что ркн говна поел
ENV PRISMA_ENGINES_MIRROR="https://registry.npmmirror.com/-/binary/prisma"

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install --ignore-scripts

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

# CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]