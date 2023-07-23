FROM node:20-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD ["nohup", "npm", "start", "&", "</dev/null"] 