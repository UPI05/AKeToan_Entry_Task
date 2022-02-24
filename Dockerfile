FROM node:12.22-bullseye

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "start"]