FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN rm -rf node_modules
RUN npm cache clean --force
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]