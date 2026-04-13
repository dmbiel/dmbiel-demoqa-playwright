# Project Plan

## Current state

- Playwright + TypeScript project structure is in place
- ESLint and Prettier are configured and used across the repository
- End-to-end coverage is implemented for:
  - Practice Form
  - Web Tables
  - Alerts
  - Drag and Drop
- GitHub Actions runs formatting, linting, type checking, and Playwright tests

## Short-term next steps

- extend coverage for additional DemoQA widgets and interactions
- split tests into smoke and regression layers if the suite grows
- improve reporting if richer CI feedback is needed
- document test data conventions and page object patterns in more detail

## Maintenance rules

- keep selectors and page actions inside page objects
- keep static test data in `src/data`
- run `npm run format`, `npm run lint`, `npm run typecheck`, and `npm test` before commits when practical
