FROM node:carbon

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --no-cache --frozen-lockfile
COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
