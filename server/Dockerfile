FROM mirror.gcr.io/library/node:18

WORKDIR /app


COPY package*.json ./
COPY prisma ./prisma/

# zerkalo
RUN npm config set registry https://registry.npmmirror.com
RUN npm install --ignore-scripts

#ошибка из за этого
# RUN npx prisma generate --no-engine


COPY . .


RUN npm run build


EXPOSE 3000


CMD ["npm", "run", "start:prod"]