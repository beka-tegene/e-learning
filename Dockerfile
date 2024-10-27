FROM node:18.15

WORKDIR /app
COPY package*.json ./
COPY . .

RUN npm install

RUN npm run build

CMD  npm run preview --host
