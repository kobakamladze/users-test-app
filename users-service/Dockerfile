FROM node:18.7.0-alpine

WORKDIR /app
EXPOSE 8000:8000
COPY package*.json ./
RUN npm install
COPY . .

CMD [ "npm", "run", "prod" ]