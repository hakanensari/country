FROM node:20-alpine
RUN apk add --no-cache curl inotify-tools
ENV NODE_ENV production
WORKDIR /app
COPY package*.json ./
RUN npm install --production --silent
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
