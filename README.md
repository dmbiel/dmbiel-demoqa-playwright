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

Run only the regression project:

```bash
npm test -- --project regression
```

Run only the smoke project:

```bash
npm test -- --project smoke
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
|-- src
|   |-- data        # reusable test data
|   |-- pages       # page objects
|   `-- utils       # shared helpers for DemoQA-specific behavior
|-- tests
|   |-- fixtures    # upload files and other static test assets
|   |-- smoke       # happy-path scenarios
|   |-- regression  # deeper scenarios and edge cases
|   `-- healthcheck.spec.ts
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

GitHub Actions runs on pushes and pull requests for `main` and `master` and performs:

- dependency installation
- formatting check
- linting
- type checking
- Playwright test execution

## Next possible extensions

- continue deeper `Elements` regression where the value clearly outweighs the maintenance cost
- keep extending stable `Widgets` and `Interactions` scenarios
- add tags or project filtering conventions if the suite grows much larger
- add richer reporting if it becomes useful for CI or triage
