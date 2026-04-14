FROM mcr.microsoft.com/playwright:v1.59.1-jammy

WORKDIR /tmp/e2e-manifest

ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

COPY package.json package-lock.json ./

RUN node -e "const fs = require('node:fs'); const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')); const lock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8')); const version = lock.packages['node_modules/@playwright/test']?.version; if (!version) { throw new Error('Unable to resolve @playwright/test version from package-lock.json'); } const runtimePkg = { name: `${pkg.name}-e2e-runtime`, private: true, dependencies: { '@playwright/test': version } }; fs.writeFileSync('package.runtime.json', JSON.stringify(runtimePkg, null, 2));"

RUN mkdir -p /opt/e2e-deps \
  && cp package.runtime.json /opt/e2e-deps/package.json \
  && cd /opt/e2e-deps \
  && npm install --omit=dev --no-audit --no-fund \
  && npm cache clean --force
