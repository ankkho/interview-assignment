FROM postgres:11 as db
FROM node:lts-alpine
RUN apk add --no-cache libpq-dev make g++ python3 py3-pip
WORKDIR /server
COPY build .
RUN ls
RUN npm i --production --ignore-scripts

EXPOSE 4000

CMD [ "node", "./src/server.js" ]
