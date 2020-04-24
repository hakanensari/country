FROM node:12-alpine
ENV NODE_ENV production
WORKDIR /app
COPY package*.json ./
RUN npm install --production --silent
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
