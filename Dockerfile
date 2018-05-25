FROM node:latest

RUN mkdir app
ADD . /app
WORKDIR /app

ADD package.json /app
RUN npm install

EXPOSE 8888

CMD ["npm", "start" ]