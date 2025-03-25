FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN rm -rf node_modules
RUN npm cache clean --force
RUN npm install

#Генерация клиента Prisma, хз мб понадобится
RUN npx prisma generate

COPY . .

# Миграции
RUN npx prisma migrate deploy

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]