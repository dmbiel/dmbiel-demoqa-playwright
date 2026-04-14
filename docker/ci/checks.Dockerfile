FROM node:22-bookworm-slim

WORKDIR /opt/checks-deps

ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

COPY package.json package-lock.json ./

RUN npm ci \
  && npm cache clean --force
