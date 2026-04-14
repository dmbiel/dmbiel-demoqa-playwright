# Project Plan

## Current state

- Playwright + TypeScript project structure is in place
- ESLint and Prettier are configured and enforced in CI
- End-to-end coverage is implemented for:
  - Practice Form
  - Web Tables
  - Alerts
  - Drag and Drop
- Test execution is organized into `healthcheck`, `smoke`, and `regression` layers
- `healthcheck` is wired as a Playwright project dependency for broader packages
- GitHub Actions is split into `checks` and `e2e` jobs
- The `e2e` job is optimized for `chromium` only and uses a dedicated Playwright browser cache
- A separate `publish-ci-images` workflow builds preconfigured CI images for `checks` and `e2e` in `ghcr.io`

## Coverage expansion roadmap

### 1. Healthcheck and smoke foundation

- keep `healthcheck` fast and stable so it remains the entry condition for broader UI coverage
- expand `smoke` with one reliable happy path per major DemoQA area
- keep package boundaries clear so CI can later target only the needed layer

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

### 5. CI and image maturity

- complete the rollout from runner-based setup to prebuilt GHCR images for `checks` and `e2e`
- keep Playwright image version aligned with `package-lock.json`
- document image publishing, rollback, and cache behavior alongside the test architecture
- consider selective workflow triggers or path filters once the suite grows

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

- complete the GHCR image rollout after the publish workflow is available on `main`
- add a `navigation` package after the healthcheck layer is stable
- expand smoke coverage for `Text Box` and `Buttons`
- keep docs synchronized with the current setup, CI layers, and container strategy

## Maintenance rules

- keep selectors and page actions inside page objects
- keep static test data in `src/data`
- keep shared DemoQA-specific helpers in `src/utils`
- use Playwright project dependencies when a package must act as a precondition for another package
- run `npm run format`, `npm run lint`, `npm run typecheck`, and `npm test` before commits when practical
- keep CI image changes in sync with `package.json`, `package-lock.json`, and the workflow rollout plan
