# Codyza Project Autopsy

Repository analysis web application built with Next.js, React, Redux Toolkit, and Vitest.

## Overview

This workspace contains a frontend application in the `app` folder that lets users analyze a GitHub repository, provide optional AI settings, and review the generated analysis output.

The project currently includes:

- a Next.js application under `app/`
- Redux state management for homepage and AI analysis state
- Vitest unit and integration tests colocated with features
- Playwright end-to-end test coverage
- GitHub Actions workflows for automated test runs

## Project Structure

```text
.
|- .github/
|  \- workflows/
|- app/
|  |- app/
|  |- lib/
|  |- playwright-tests/
|  |- public/
|  |- package.json
|  \- README.md
\- README.md
```

## Prerequisites

- Node.js 20+
- npm

## Getting Started

Install dependencies from the application folder:

```bash
cd app
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Useful Scripts

Run from `app/`:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
npm run test:watch
```

## Testing

Vitest is used for unit and integration tests.

```bash
cd app
npm run test
```

Playwright is available for browser-level tests.

```bash
cd app
npx playwright test
```

## CI

The repository includes GitHub Actions workflows under `.github/workflows/` for automated test execution on pull requests and other repository events.

## Notes

- The application package lives in the `app/` subdirectory.
- The existing `app/README.md` is still the default framework-generated README and can be updated separately if you want app-specific documentation there as well.