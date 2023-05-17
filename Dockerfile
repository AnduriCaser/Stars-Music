FROM node:18.16.0-alpine3.17
COPY . ./app

WORKDIR /app

RUN npm install

COPY src/ .
EXPOSE 3005
CMD [ "npm", "start"]