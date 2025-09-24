FROM node:20-alpine

WORKDIR /app

# Создаём непривилегированного пользователя (чтобы запускалось не от root)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --chown=appuser:appgroup package*.json ./
RUN npm ci

COPY --chown=appuser:appgroup tsconfig*.json ./
COPY --chown=appuser:appgroup nest-cli.json ./

COPY --chown=appuser:appgroup prisma ./prisma/
RUN npx prisma generate

COPY --chown=appuser:appgroup src ./src

RUN npm run build


USER root
RUN apk add --no-cache bash

RUN chown -R appuser:appgroup /app

# Переключаемся на appuser
USER appuser

EXPOSE 5000

# CMD ["npm", "run", "start:prod"]

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]