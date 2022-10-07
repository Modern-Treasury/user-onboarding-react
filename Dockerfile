FROM node:lts-alpine

RUN apk --no-cache add gcc g++ make musl-dev bash yarn patch git

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
