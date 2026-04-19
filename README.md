# dmbiel-demoqa-playwright

End-to-end UI automation project for [DemoQA](https://demoqa.com) built with `Playwright` and `TypeScript`.

The repository is focused on practical browser automation scenarios around:

- healthcheck and navigation
- elements
- forms
- alerts
- widgets
- interactions

## Tech stack

- `@playwright/test`
- `TypeScript`
- `ESLint`
- `Prettier`
- `GitHub Actions`

## Quick start

Install dependencies:

```bash
npm ci
```

Install Playwright system dependencies and the local Chromium browser:

```bash
npx playwright install-deps
npx playwright install chromium
```

Run the full test suite:

```bash
npm test
```

Run only the regression project:

```bash
npm test -- --project regression
```

Run only the smoke project:

```bash
npm test -- --project smoke
Run quality checks locally:

```bash
npm run format:check
npm run lint
npm run typecheck
```

## Available scripts

```bash
npm test
npm run test:headed
npm run test:ui
npm run test:debug
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run typecheck
```

## What is covered

Current automated scenarios:

- `Healthcheck`
  - homepage load
  - title and shell validation
  - core category card visibility
  - entry navigation into the `Elements` section
- `Elements`
  - `Text Box`
    - successful submit
    - invalid email negative path
  - `Buttons`
    - dedicated coverage for double click, right click, and dynamic click
  - `Check Box`
    - full `Home` selection summary
    - `Downloads` branch selection outcome
  - `Radio Button`
    - switching between `Yes` and `Impressive`
    - disabled `No` option validation
  - `Links`
    - both `Home` links in new tabs
    - API-style response links
- `Practice Form`
  - fill and submit the student registration form
  - validate submitted values in the result modal
  - required-field negative path
  - invalid mobile negative path
- `Web Tables`
  - create a new record
  - search for a created record
  - edit an existing record
  - delete a record and verify the empty filtered state
  - validate required fields in the registration modal
- `Alerts`
  - standard alert
  - delayed alert
  - confirm dialog
  - prompt dialog
- `Widgets`
  - `Tabs`
  - `Select Menu`
  - `Tool Tips`
  - `Progress Bar`
  - `Accordian`
  - `Date Picker`
  - `Auto Complete`
  - `Slider`
  - `Menu`
- `Interactions`
  - `Droppable`
  - `Dragabble`
  - `Resizable`
  - `Selectable`

## Project structure

```text
.
|-- .github/workflows
|-- docker/ci
|   |-- checks.Dockerfile         # prebuilt image for lint / format / typecheck
|   |-- e2e.Dockerfile            # prebuilt Playwright runtime image
|   `-- scripts                   # helper scripts for CI image assembly
|-- src
|   |-- data        # reusable test data
|   |-- pages       # page objects
|   `-- utils       # shared helpers for DemoQA-specific behavior
|-- tests
|   |-- fixtures    # upload files and other static test assets
|   |-- regression  # broader scenario coverage
|   |-- smoke       # high-value happy paths
|   `-- healthcheck.spec.ts
|-- docs
|   |-- ci-pipelines.md
|   `-- plan.md
|-- eslint.config.mjs
|-- playwright.config.ts
`-- tsconfig.json
```

## Architecture notes

- The suite uses `Page Object` classes to keep selectors and page actions out of spec files.
- Test data is stored separately in `src/data`, so scenarios stay readable and easy to change.
- `src/utils/demoqa-ui.ts` contains helpers for handling DemoQA-specific UI noise such as ads and layout interference.

## DemoQA notes

`DemoQA` is useful for automation practice, but some widgets are not perfectly stable in headless runs.

Because of that:

- modal assertions use actual rendered DOM instead of semantic assumptions
- alert coverage uses controlled dialog mocking to make behavior deterministic in automation
- drag and drop uses a stabilization fallback after a real drag attempt because the DemoQA widget can be flaky in automated browser runs
- some widget regressions use small DOM fallbacks after a real user-like attempt when DemoQA itself becomes unreliable in headless mode

## CI

The main GitHub Actions workflow runs on pushes and pull requests for `main` and `master`.

It is split into two jobs:

- `checks`
  - installs dependencies with `npm ci`
  - runs formatting, linting, and type checking
- `e2e`
  - installs dependencies with `npm ci`
  - restores a dedicated cache for Playwright Chromium
  - installs Playwright system dependencies
  - installs `chromium` only when the browser cache is cold
  - runs the Playwright suite
  - uploads the HTML report artifact

The repository also contains a separate workflow for publishing prebuilt CI images to `ghcr.io`.
Those images are intended to support a more containerized CI path for:

- `checks` toolchain reuse
- Playwright runtime reuse in `e2e`
- faster and more predictable setup once the image rollout is complete

See [docs/ci-pipelines.md](/C:/Users/dimon/source/dmbiel-demoqa-playwright/docs/ci-pipelines.md) for the full pipeline notes, rollout strategy, and image-publishing details.

## Next possible extensions

- add coverage for buttons and double-click / right-click interactions
- add coverage for dynamic properties and tables pagination
- refine project tagging and selective CI execution for smoke vs regression paths
- add Allure or richer reporting if needed
