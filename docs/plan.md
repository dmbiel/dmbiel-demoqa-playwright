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
- A dedicated `healthcheck` Playwright project is planned as the execution precondition for all other test packages

## Coverage expansion roadmap

### 1. Healthcheck and smoke foundation

- add a dedicated `healthcheck.spec.ts` in `tests`
- validate homepage availability, title, header/logo, and main category cards
- verify that the most important entry-point navigation works
- keep this layer fast and stable so it can serve as the precondition for broader UI coverage

### 2. Core navigation coverage

- validate navigation from the homepage into the main DemoQA sections
- verify left-side navigation rendering after section entry
- cover direct deep links for critical pages such as Forms, Web Tables, Alerts, and Droppable
- confirm that section headings and active navigation states are correct

### 3. Expanded widget and interaction coverage

- `Elements`
  - Text Box
  - Buttons
  - Check Box
  - Radio Button
  - Links
- `Widgets`
  - Accordian
  - Tabs
  - Tool Tips
  - Progress Bar
  - Select Menu
- `Interactions`
  - Selectable
  - Sortable
  - Resizable

### 4. Contract-like UI checks

- verify that critical pages load without broken shell rendering
- add guardrails for missing headings, missing primary controls, or obviously broken page states
- add optional console-error checks for critical failures
- add lightweight assertions for important layout anchors before deeper scenario execution

## Proposed execution layers

- `healthcheck`
  - the fastest layer
  - verifies homepage availability and core shell rendering
  - must pass before any broader UI package is executed
- `smoke`
  - one high-value happy path per major DemoQA area
- `regression`
  - broader scenario coverage for forms, widgets, interactions, and edge cases

## Short-term next steps

- implement the dedicated `healthcheck` package and wire it as a dependency for other Playwright projects
- add a `navigation` package after the healthcheck layer is stable
- expand smoke coverage for `Text Box` and `Buttons`
- document file organization for healthcheck, smoke, and regression packages before the suite grows further

## Maintenance rules

- keep selectors and page actions inside page objects
- keep static test data in `src/data`
- keep shared DemoQA-specific helpers in `src/utils`
- use Playwright project dependencies when a package must act as a precondition for another package
- run `npm run format`, `npm run lint`, `npm run typecheck`, and `npm test` before commits when practical
