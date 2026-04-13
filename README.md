# dmbiel-demoqa-playwright

UI end-to-end tests for [DemoQA](https://demoqa.com) using `Playwright` + `TypeScript`.

The suite currently focuses on the flows that are most useful for practical UI automation exercises:

- `Forms`: student registration form submission
- `Web Tables`: create, search, edit, and delete records
- `Alerts`: standard alert, delayed alert, confirm, and prompt dialogs
- `Interactions`: drag and drop

## Stack

- `@playwright/test`
- `TypeScript`
- `ESLint`
- `Prettier`
- `GitHub Actions`

## Project structure

```text
.
|-- .github/workflows
|-- src
|   |-- data
|   |-- pages
|   `-- utils
|-- tests
|   |-- fixtures
|   `-- *.spec.ts
|-- eslint.config.mjs
|-- playwright.config.ts
`-- tsconfig.json
```

## Commands

```bash
npm test
npm run test:headed
npm run lint
npm run format:check
npm run typecheck
```

## Coverage

- `tests/forms.spec.ts`
- `tests/web-tables.spec.ts`
- `tests/alerts.spec.ts`
- `tests/drag-and-drop.spec.ts`

## CI

GitHub Actions installs dependencies, installs Playwright browsers, and runs formatting, linting, type checking, and the Playwright suite on each push and pull request to `main` or `master`.
