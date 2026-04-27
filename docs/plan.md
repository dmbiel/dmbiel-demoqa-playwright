# Project Plan

## Current state

- Playwright + TypeScript project structure is in place
- ESLint, Prettier, and TypeScript checks are configured and exposed through npm scripts
- Test execution is organized into `healthcheck`, `smoke`, and `regression` Playwright projects
- `smoke` and `regression` depend on `healthcheck`, so the base shell check stays the entry condition for broader UI coverage
- baseline contract-like UI guardrails are implemented for homepage, section landing pages, and covered content pages
- CI is split into `checks` and `e2e` workflows, with separate Docker images prepared for both paths
- The main browser target is `chromium`, aligned between local runs and CI
- Page objects are in `src/pages`, shared test data is in `src/data`, and shared UI helpers live in `src/utils`

## Current coverage

### Healthcheck

- homepage availability
- core shell rendering for the base application entry point

### Smoke coverage

- `Navigation`
  - top-level and section-entry navigation checks
- `Forms`
  - Practice Form
- `Alerts, Frame & Windows`
  - Alerts
  - Browser Windows
  - Frames
  - Nested Frames
  - Modal Dialogs
- `Elements`
  - Text Box
  - Check Box
  - Radio Button
  - Web Tables
  - Buttons
  - Links
  - Broken Links - Images
  - Dynamic Properties
  - Upload and Download
- `Widgets`
  - Accordian
  - Auto Complete
  - Date Picker
  - Menu
  - Progress Bar
  - Select Menu
  - Slider
  - Tabs
  - Tool Tips
- `Interactions`
  - Dragabble
  - Droppable
  - Resizable
  - Selectable
  - Sortable

### Regression coverage

- `Forms`
  - Practice Form
- `Alerts, Frame & Windows`
  - Alerts
- `Elements`
  - Text Box
  - Check Box
  - Radio Button
  - Web Tables
  - Buttons
  - Links
  - Broken Links - Images
  - Dynamic Properties
  - Upload and Download
- `Widgets`
  - Accordian
  - Auto Complete
  - Date Picker
  - Menu
  - Progress Bar
  - Select Menu
  - Slider
  - Tabs
  - Tool Tips
- `Interactions`
  - Dragabble
  - Droppable
  - Resizable
  - Selectable
  - Sortable

## Coverage gaps

- broader DemoQA areas such as `Broken Links - Images` and `Upload and Download` are not covered yet
- `Widgets`
  - all currently implemented widget areas are covered in smoke and regression, but additional widget pages are still outside the suite

## Execution layers

- `healthcheck`
  - the fastest layer
  - verifies homepage reachability and base shell rendering
  - must stay stable because it gates broader UI packages
- `smoke`
  - one reliable happy path per covered page or area
  - should remain lean enough for fast CI feedback
- `regression`
  - deeper scenario coverage and richer assertions for already adopted pages
  - can grow more slowly as long as maintenance cost stays justified

## Near-term priorities

- decide which uncovered DemoQA pages are worth adding next based on regression value and maintenance cost
- keep `README.md`, `docs/ci-pipelines.md`, and this document synchronized when CI image rollout changes

## CI and container direction

- keep the rollout from runner-managed setup to reusable GHCR images explicit and documented
- keep the Playwright image version aligned with `package-lock.json`
- preserve the split between `checks` and `e2e` responsibilities so failures stay easy to diagnose
- update docs when the main validation workflow switches from install-on-run to container-backed execution

## Maintenance rules

- keep selectors and page actions inside page objects
- keep static test data in `src/data`
- keep shared DemoQA-specific helpers in `src/utils`
- use Playwright project dependencies when a package must act as a precondition for another package
- run `npm run format`, `npm run lint`, `npm run typecheck`, and `npm test` before commits when practical
- keep CI image changes in sync with `package.json`, `package-lock.json`, and workflow configuration
