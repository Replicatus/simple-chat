FROM node:16-alpine

WORKDIR /var/www/app

COPY package.json package-lock.lock ./

RUN npm install

COPY . .

RUN npm build

EXPOSE 3000

CMD ["node", "./server.js"]
