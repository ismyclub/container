# Created by ../../.codegen/index.ts
FROM node:20-alpine

WORKDIR /usr/src/app

ARG NPM_TOKEN

ENV LOG_LEVEL="info" \
    PG_DATABASE="" \
    PG_HOST="" \
    PG_USER="" \
    PG_PASSWORD="" \
    PG_PORT=""

RUN npm config set "@ismyclub:registry" https://npm.pkg.github.com/ \
    && npm config set "@studio-75:registry" https://npm.pkg.github.com/ \
    && npm config set "//npm.pkg.github.com/:_authToken" $NPM_TOKEN \
    && npm install -g @ismyclub/app.sign-up

EXPOSE 3000

CMD ["sign-up"]
