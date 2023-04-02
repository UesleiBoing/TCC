FROM node:alpine

WORKDIR /user/app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD ["yarn", "dev:server"]