# Project Plan

## Current state

- Playwright + TypeScript project structure is in place
- ESLint and Prettier are configured and used across the repository
- A dedicated `healthcheck` Playwright project is implemented and configured as a dependency for broader UI packages
- `smoke` coverage is implemented for key DemoQA flows across:
  - homepage navigation and platform healthcheck
  - `Elements`
    - Text Box
    - Buttons
    - Check Box
    - Radio Button
    - Links
    - Web Tables
  - `Widgets`
    - Tabs
    - Select Menu
    - Tool Tips
    - Progress Bar
    - Accordian
    - Date Picker
    - Slider
    - Menu
    - Auto Complete
  - `Interactions`
    - Sortable
    - Selectable
    - Resizable
    - Droppable
    - Dragabble
- `regression` coverage is implemented for:
  - `Alerts`
  - `Forms / Practice Form`
  - `Elements`
    - Web Tables
    - Buttons
    - Links
    - Text Box
    - Radio Button
    - Check Box
  - `Widgets`
    - Select Menu
    - Date Picker
    - Auto Complete
    - Tabs
    - Tool Tips
    - Progress Bar
    - Accordian
    - Slider
    - Menu
  - `Interactions`
    - Droppable
    - Dragabble
    - Resizable
    - Selectable
- GitHub Actions runs formatting, linting, type checking, and Playwright tests

## Coverage expansion roadmap

### 1. Healthcheck and smoke foundation

- keep the dedicated `healthcheck.spec.ts` stable and fast
- validate homepage availability, title, header/logo, and main category cards
- verify that the most important entry-point navigation works
- preserve this layer as the execution precondition for broader UI coverage

### 2. Core navigation coverage

- keep homepage and section-entry navigation covered through `healthcheck` and `smoke`
- preserve left-side navigation validation after section entry
- extend direct deep-link coverage where additional regression value appears
- confirm section headings and active navigation states for newly added areas

### 3. Expanded widget and interaction coverage

- `Elements`
  - extend `Web Tables` edge cases if needed
  - deepen `Check Box` only if the tree widget remains worth the maintenance cost
  - consider deeper `Links` API-response coverage if practical
- `Widgets`
  - expand `Select Menu`, `Date Picker`, and `Auto Complete` only if additional edge cases justify it
  - consider whether `Slider` and `Menu` need anything beyond the current stable coverage
- `Interactions`
  - Sortable
  - deepen `Sortable`
  - consider additional edge cases for `Droppable` and `Dragabble` only if they remain stable

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

- decide the next highest-value stable regression target in `Elements`
- keep running targeted checks plus periodic full `regression` project runs as the suite grows
- continue documentation refreshes when actual coverage meaningfully changes

## Maintenance rules

- keep selectors and page actions inside page objects
- keep static test data in `src/data`
- keep shared DemoQA-specific helpers in `src/utils`
- use Playwright project dependencies when a package must act as a precondition for another package
- run `npm run format`, `npm run lint`, `npm run typecheck`, and `npm test` before commits when practical
