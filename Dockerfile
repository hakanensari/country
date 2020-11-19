FROM node:14-alpine
RUN apk add --no-cache curl
ENV NODE_ENV production
WORKDIR /app
COPY package*.json ./
RUN npm install --production --silent
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
