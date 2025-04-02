FROM node:18-alpine

WORKDIR /app
 
COPY package*.json ./
COPY prisma ./prisma/
 
RUN npm cache clean --force
RUN npm config set registry https://registry.npmmirror.com

RUN npm install --ignore-scripts



COPY . .
RUN npm run build

RUN npx prisma generate

EXPOSE 3000
 

CMD ["npm", "run", "start:prod"]