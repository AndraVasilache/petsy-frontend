FROM node:19.4.0-alpine3.16
WORKDIR /app

RUN npm install -g @angular/cli

COPY ./package.json .
RUN npm install
COPY . .
RUN ng build
ENTRYPOINT ng serve
