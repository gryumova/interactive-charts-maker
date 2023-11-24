FROM node:18-alpine

COPY public/ /public
COPY src/ /src
COPY package.json ./
COPY package-lock.json ./
COPY webpack.config.js ./

RUN npm install

CMD ["npm", "start"]