const fs = require('node:fs');

const packageJsonPath = 'package.json';
const packageLockPath = 'package-lock.json';
const outputPath = 'package.runtime.json';
const expectedPlaywrightVersion = process.env.EXPECTED_PLAYWRIGHT_VERSION;

const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const lock = JSON.parse(fs.readFileSync(packageLockPath, 'utf8'));

if (typeof lock.lockfileVersion !== 'number' || lock.lockfileVersion < 2) {
  throw new Error(
    `Unsupported package-lock.json format: expected lockfileVersion >= 2, got ${lock.lockfileVersion}`,
  );
}

const runtimePlaywrightVersion =
  lock.packages?.['node_modules/@playwright/test']?.version;

if (!runtimePlaywrightVersion) {
  throw new Error(
    'Unable to resolve @playwright/test version from package-lock.json',
  );
}

if (
  expectedPlaywrightVersion &&
  runtimePlaywrightVersion !== expectedPlaywrightVersion
) {
  throw new Error(
    `Playwright version mismatch: Docker image expects ${expectedPlaywrightVersion}, package-lock.json contains ${runtimePlaywrightVersion}`,
  );
}

const runtimePkg = {
  name: `${pkg.name}-e2e-runtime`,
  private: true,
  dependencies: {
    '@playwright/test': runtimePlaywrightVersion,
  },
};

fs.writeFileSync(outputPath, `${JSON.stringify(runtimePkg, null, 2)}\n`);
