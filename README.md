# dmbiel-demoqa-playwright

End-to-end UI automation project for [DemoQA](https://demoqa.com) built with `Playwright` and `TypeScript`.

The repository is focused on practical browser automation scenarios around:

- forms
- web tables
- alerts
- drag and drop

## Tech stack

- `@playwright/test`
- `TypeScript`
- `ESLint`
- `Prettier`
- `GitHub Actions`

## Quick start

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Run the full test suite:

```bash
npm test
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

- `Practice Form`
  - fill and submit the student registration form
  - validate submitted values in the result modal
- `Web Tables`
  - create a new record
  - search for a created record
  - edit an existing record
  - delete a record and verify the empty filtered state
- `Alerts`
  - standard alert
  - delayed alert
  - confirm dialog
  - prompt dialog
- `Droppable`
  - drag the source element into the drop zone

## Project structure

```text
.
|-- .github/workflows
|-- src
|   |-- data        # reusable test data
|   |-- pages       # page objects
|   `-- utils       # shared helpers for DemoQA-specific behavior
|-- tests
|   |-- fixtures    # upload files and other static test assets
|   `-- *.spec.ts   # Playwright specs
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

## CI

GitHub Actions runs on pushes and pull requests for `main` and `master` and performs:

- dependency installation
- formatting check
- linting
- type checking
- Playwright test execution

## Next possible extensions

- add coverage for buttons and double-click / right-click interactions
- add coverage for dynamic properties and tables pagination
- add tags or projects for smoke vs regression runs
- add Allure or richer reporting if needed
