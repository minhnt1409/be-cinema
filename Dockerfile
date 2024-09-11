FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV JWT_ACCESS_KEY=qwerty
ENV JWT_ACCESS_KEY_EXPIRE_TIME=5d
ENV JWT_REFRESH_KEY=asdfghjkl
ENV JWT_REFRESH_KEY_EXPIRE_TIME=365d
EXPOSE 8000

CMD ["npm", "start"]