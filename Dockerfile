FROM ubuntu

RUN apt-get update -y
RUN apt-get upgrade -y

RUN apt-get install -y curl

RUN apt-get install -y nodejs
RUN apt-get install -y npm

RUN npm install -g n
RUN n 12.22.5

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "start"]