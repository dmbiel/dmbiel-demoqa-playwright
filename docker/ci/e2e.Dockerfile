ARG PLAYWRIGHT_VERSION=1.59.1

FROM mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-jammy

ARG PLAYWRIGHT_VERSION

WORKDIR /tmp/e2e-manifest

ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
    EXPECTED_PLAYWRIGHT_VERSION=${PLAYWRIGHT_VERSION}

COPY package.json package-lock.json ./
COPY docker/ci/scripts/build-e2e-runtime-package.mjs ./docker/ci/scripts/

RUN node ./docker/ci/scripts/build-e2e-runtime-package.mjs

RUN mkdir -p /opt/e2e-deps \
  && cp package.runtime.json /opt/e2e-deps/package.json \
  && cd /opt/e2e-deps \
  && npm install --omit=dev --no-audit --no-fund \
  && npm cache clean --force
