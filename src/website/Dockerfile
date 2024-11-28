FROM node:20-alpine

WORKDIR /usr/src/app

ARG NPM_TOKEN

ENV LOG_LEVEL="info"

RUN npm config set "@ismyclub:registry" https://npm.pkg.github.com/ \
    && npm config set "//npm.pkg.github.com/:_authToken" $NPM_TOKEN \
    && npm install -g @ismyclub/app.website

EXPOSE 3000

CMD ["website"]
