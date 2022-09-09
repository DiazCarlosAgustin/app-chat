FROM node:16.15-slim

RUN mkdir /app

COPY package*.json /app

WORKDIR /app
#Install dependecies
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]