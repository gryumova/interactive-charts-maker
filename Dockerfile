FROM node:18-alpine

WORKDIR /app

ENV PATH="/app/node_modules/.bin:$PATH"

COPY package.json ./
COPY package-lock.json ./
COPY webpack.config.js ./

RUN npm install

COPY . ./

CMD ["npm", "start"]