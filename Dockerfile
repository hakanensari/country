FROM node:erbium

WORKDIR /app

COPY package*.json ./
RUN npm install --only=prod
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
