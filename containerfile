FROM node:alpine:lastest

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

CMD ["next", "start"]