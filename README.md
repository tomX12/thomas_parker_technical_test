# Thomas Parker Technical Task - Holiday Entitlement Calculator - Playwright Test Suite

This repository contains an automated test suite using [Playwright](https://playwright.dev/) to validate the functionality of the UK Government's [Holiday Entitlement Calculator](https://www.gov.uk/calculate-your-holiday-entitlement).

## 🚀 Getting Started

### Prerequisites

- [Node.js v26 LTS](https://nodejs.org/en/download/) installed

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tomX12/thomas_parker_technical_task.git
   cd thomas_parker_technical_task
   ```
   Or, if downloading a ZIP of the repo, extract it into a folder of your choice and `cd` into that folder.
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Install Playwright Browsers**
   ```bash
   npx playwright install
   ```

## ✅ Running Tests

### Run Tests in Headless Mode

```bash
npm run test
```

### Run Accessibility Tests Only

Runs every test tagged `@a11y` (keyboard accessibility checks and the axe-core WCAG 2.2 A/AA scans).

```bash
npm run test-a11y
```

### Run Tests using Playwright UI

```bash
npm run test-ui
```

### View Previous Run Report

```bash
npm run report
```

## Accessibility Task

### Defects found on test page

| **Defect**                                    | **WCAG 2.2 Guideline**                                     | **Level** |
| --------------------------------------------- | ---------------------------------------------------------- | --------- |
| The page title is missing                     | 2.4.2 Page Titled                                          | A         |
| Language of the document is not identified    | 3.1.1 Language of Page                                     | A         |
| No page regions or ARIA landmarks             | 1.3.1 Info and Relationships, 2.4.1 Bypass Blocks          | A         |
| No first level heading                        | 1.3.1 Info and Relationships                               | A         |
| Full name input has no corresponding label    | 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions | A         |
| Email input has no corresponding label        | 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions | A         |
| Your message input has no corresponding label | 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions | A         |
| Image has missing alt text                    | 1.1.1 Non-text Content                                     | A         |
| Focus box not visible while tabbing           | 2.4.7 Focus Visible                                        | AA        |

## Thoughts on further improvements

- Data driven testing to allow the testing of many flows with minimal code duplication
- Publish HTML report to a static site (Github pages) to remove the need to download the report each time

## Bug report

**Title**: Full name input box has no corresponding label

**Description**: The full name input box has no corresponding label attribute. This means users who navigate the site using the keyboard will not receive the necessary information from their screenreader when they focus on this element. This can cause confusion for the user as they will not know what they need to input into the box.

**Steps to reproduce**:

1. spin up the environment following the steps in the repo
2. Navigate to the page via any browser
3. Right-click on the **Full Name** input box and click inspect
4. There will be no label attribute in the Full Name element

**Expected Outcome**: Element should have correct label attribute

**Actual Outcome**: Element has no label attribute

**How often is this defect observed**: Every visit to the page

**Priority**: To be triaged

**Date found**: 23/11/26

**Environment**: TEST

**Browser**: Google Chrome Version 158

**OS**: Linux Mint
