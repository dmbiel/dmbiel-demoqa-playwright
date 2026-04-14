# CI Pipelines

## Overview

The project currently uses two GitHub Actions workflows:

- `Playwright Tests`
  - the main validation workflow for pushes and pull requests to `main` and `master`
- `Publish CI Images`
  - the infrastructure workflow that builds and publishes reusable CI images to `ghcr.io`

The repository is in a transition period between:

- a runner-based workflow that installs dependencies during each CI run
- a containerized workflow that reuses prebuilt images for `checks` and `e2e`

Because GitHub only exposes newly added workflows from the default branch, the rollout is intentionally split into two stages.

## Main validation workflow

File: [playwright.yml](/C:/Users/dimon/source/dmbiel-demoqa-playwright/.github/workflows/playwright.yml)

### `checks` job

Responsibilities:

- checkout repository contents
- restore npm cache through `actions/setup-node`
- install dependencies with `npm ci`
- run:
  - `npm run format:check`
  - `npm run lint`
  - `npm run typecheck`

Why this exists:

- formatting, linting, and type checking are fast feedback tasks
- keeping them separate from browser tests makes failures easier to understand
- this split also creates a clean future path for a dedicated prebuilt `checks` image

### `e2e` job

Responsibilities:

- checkout repository contents
- restore npm cache through `actions/setup-node`
- install dependencies with `npm ci`
- restore Playwright browser cache from `~/.cache/ms-playwright`
- install Playwright system dependencies with `npx playwright install-deps`
- install `chromium` only when the browser cache is cold
- run `npm test`
- upload the HTML report artifact

Why this exists:

- local execution uses `chromium`, so CI is aligned to the same browser
- browser caching reduces repeated download time
- system libraries are still runner-managed in the current stage

## Publish CI Images workflow

File: [publish-ci-images.yml](/C:/Users/dimon/source/dmbiel-demoqa-playwright/.github/workflows/publish-ci-images.yml)

This workflow publishes two images to GitHub Container Registry:

- `ghcr.io/<owner>/dmbiel-demoqa-playwright-checks`
- `ghcr.io/<owner>/dmbiel-demoqa-playwright-e2e`

It runs on:

- pushes to `main` and `master` when CI-image-related files change
- manual `workflow_dispatch`

It uses:

- `docker/login-action`
- `docker/setup-buildx-action`
- `docker/build-push-action`
- GitHub Actions cache for Docker layer reuse

### Tagging rules

Each image is always published with a commit SHA tag:

- `image:<sha>`

The `latest` tag is published only from `main` or `master`.

Why this matters:

- feature branches must not overwrite the shared `latest` tag
- the main branch remains the source of truth for stable CI images

## Docker image layout

### Checks image

File: [checks.Dockerfile](/C:/Users/dimon/source/dmbiel-demoqa-playwright/docker/ci/checks.Dockerfile)

Base image:

- `node:22-bookworm-slim`

Purpose:

- preinstall the full repository toolchain used by formatting, linting, and type checking

Notes:

- it runs `npm ci`
- browser download is explicitly skipped
- it is intended for a future checks-container rollout

### E2E image

File: [e2e.Dockerfile](/C:/Users/dimon/source/dmbiel-demoqa-playwright/docker/ci/e2e.Dockerfile)

Base image:

- `mcr.microsoft.com/playwright:v<PLAYWRIGHT_VERSION>-jammy`

Purpose:

- provide a Playwright-ready runtime image without the full lint/typecheck toolchain

Important design choices:

- `PLAYWRIGHT_VERSION` is an explicit build argument
- the Dockerfile checks that the version in `package-lock.json` matches the expected Playwright image version
- runtime manifest generation is delegated to a script instead of a long inline shell command

Helper script:

- [build-e2e-runtime-package.mjs](/C:/Users/dimon/source/dmbiel-demoqa-playwright/docker/ci/scripts/build-e2e-runtime-package.mjs)

Responsibilities:

- validate `package-lock.json`
- resolve the exact `@playwright/test` version from the lockfile
- fail fast on version mismatch against the Docker build argument
- generate `package.runtime.json` for runtime-only install

## Rollout strategy

GitHub does not allow convenient manual execution of a brand-new workflow from a feature branch until that workflow exists on the default branch.

Because of that, the recommended rollout is:

1. Merge the image-publishing infrastructure into `main`.
2. Run `Publish CI Images` from the Actions UI.
3. Confirm that both GHCR images are published successfully.
4. Only then switch the main validation workflow to consume the prebuilt images.

This avoids a circular dependency where:

- the main workflow expects images
- but the image-publishing workflow is not yet available from `main`

## Local setup implications

For local work, the current project setup is still:

```bash
npm ci
npx playwright install-deps
npx playwright install chromium
```

Then:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
```

The GHCR image path improves CI repeatability, but it does not replace the standard local developer workflow.

## Operational notes

- If `Publish CI Images` fails in `e2e`, inspect the Playwright version alignment first.
- If `latest` unexpectedly changes, verify which branch published the image and confirm the tagging logic.
- If the main CI moves to GHCR-backed images later, update this document together with `README.md` and `docs/plan.md`.
