# Walk-In Bath Landing Page – Playwright Test Suite

QA Team Lead Assignment | Capslock

---

## Project Structure

```
capslock/
├── .github/workflows/
│   └── playwright.yml       # CI pipeline
├── data/
│   └── testData.ts          # Centralized test data and constants
├── pages/
│   ├── steps/
│   │   ├── Step1Zip.ts
│   │   ├── Step2Interest.ts
│   │   ├── Step3Property.ts
│   │   ├── Step4Contact.ts
│   │   ├── Step5Phone.ts
│   │   └── StepSorry.ts
│   ├── LandingPage.ts
│   └── ProgressBar.ts
├── tests/
│   └── walk-in-bath.spec.ts
├── playwright.config.ts
└── tsconfig.json
```

---

## Getting Started

**Requirements:** Node.js 24+

```bash
npm ci
npx playwright install --with-deps chromium
npx playwright test
```

Optional:
```bash
npx playwright test --headed        # run in browser
npx playwright test --grep "TC1"    # run a single test
npx playwright show-report          # open last HTML report
```

---

## Full Scenario List

| # | Scenario | Priority |
|---|---|:---:|
| TC1 | User in service area completes all steps and reaches Thank You page (includes progress bar validation) | ★ |
| TC2 | Out-of-area user submits notification email and sees confirmation | ★ |
| TC3 | User entering an invalid ZIP format is blocked from proceeding | ★ |
| TC4 | Step 2 requires a selection before proceeding | ★ |
| TC5 | Step 4 email without TLD should be rejected | ★ |

---

## Top 5 Prioritization Rationale

**TC1 – Full happy path**
The entire purpose of the page is lead capture. A broken end-to-end path means zero conversions. Verified first and used as the vehicle for progress bar validation.

**TC2 – Out-of-area flow**
A secondary but complete lead capture funnel. Routing out-of-area users correctly is both a UX and business requirement.

**TC3 – ZIP format validation**
ZIP is the routing key of the entire form. A malformed ZIP causes silent misrouting — either blocking valid users or advancing invalid ones.

**TC4 – Step 2 selection required**
Skipping required selections produces incomplete lead data in the CRM. This is a known defect marked with `test.fail()`.

**TC5 – Contact field validation**
Invalid email renders a lead unreachable. This is a known defect marked with `test.fail()`.

---
## Full Scenario List

| # | Scenario | Priority |
|---|---|:---:|
| 1 | User in service area completes all steps and reaches Thank You page | ★ |
| 2 | Out-of-area user submits notification email and sees confirmation | ★ |
| 3 | User entering an invalid ZIP format is blocked from proceeding | ★ |
| 4 | Step 2 requires a selection before proceeding | ★ |
| 5 | Step 4 email without TLD should be rejected | ★ |
| 6 | Page loads with correct headline visible | |
| 7 | Hero section renders the full feature list | |
| 8 | First video plays on click and pauses on second click | |
| 9 | Second video plays on click and pauses on second click | |
| 10 | Carousel advances forward with next arrow | |
| 11 | Carousel goes back with previous arrow | |
| 12 | Clicking a thumbnail updates the active slide | |
| 13 | Reviews section displays initial reviews on load | |
| 14 | "Show more" button loads additional reviews | |
| 15 | Walk-In Bath Benefits section renders all 3 GIF items | |
| 16 | Health benefits section renders all 8 conditions | |
| 17 | Bath walls section renders colour options | |
| 18 | "Our Price Promise" section is visible | |
| 19 | Both ZIP forms are present on the page | |
| 20 | Footer copyright text is visible | |


## Prioritization Logic

The top 5 scenarios were selected based on **business impact and risk**.

The form is the sole conversion mechanism of the page — every other element is supporting content. A broken form means zero leads captured, making it the highest risk area by far.

Within the form, priority was assigned as follows:

- **Scenario 1** covers the full happy path end-to-end. If this breaks, the product has no value.
- **Scenario 2** covers the secondary lead capture funnel for out-of-area users — a complete user journey in its own right.
- **Scenario 3** targets ZIP validation, which is the routing key of the entire form. A malformed ZIP causes silent misrouting.
- **Scenario 4** covers a known defect where step 2 allows proceeding without a selection, producing incomplete lead data.
- **Scenario 5** covers a known defect where an email without a TLD is accepted, rendering the lead unreachable.

Scenarios 6–20 cover page content, interactive elements, and static sections. These were identified but not automated in this submission — they carry lower business risk and would be addressed in a follow-up iteration.


## Defects Found

### DEFECT-01 — Step 2 allows proceeding without selecting an option
**Expected:** Next button should be blocked until at least one option is selected.
**Observed:** Clicking Next with no selection advances the form to step 3.
**Covered by:** TC4 (`test.fail()`)

### DEFECT-02 — Progress bar shows incorrect width and step counter
**Expected:** Steps 2–4 should show 40%, 60%, 80% width and matching step counters.
**Observed:** Step 2 shows 36%, step 3 stays at 36%, step 4 shows 52%.
**Covered by:** TC1 (`expect.soft()`)

### DEFECT-03 — Out-of-area stepper shows "1 of" with no total
**Expected:** Step counter should show a complete label e.g. "1 of 1".
**Observed:** Displays "1 of" with the total missing.

### DEFECT-04 — Field labeled "Name" but validation error references "full name"
**Expected:** Label should read "Full Name" to match the validation message.
**Observed:** Label says "Name" but error says "Your full name should contain both first and last name."

### DEFECT-05 — Step 4 email accepts addresses without a TLD
**Expected:** `test@test` should be rejected — a valid TLD is required.
**Observed:** `test@test` passes validation and the form advances to step 5.
**Covered by:** TC5 (`test.fail()`)

### DEFECT-06 — Step 3 progress bar counter does not advance
**Expected:** Counter should show "3 of 5" on step 3.
**Observed:** Counter remains at "2 of 5".
**Covered by:** TC1 (`expect.soft()`)

---

## Ideas for Future Improvements

1. **Fixtures** — Replace `beforeEach` instantiation with Playwright fixtures to inject `LandingPage` directly into tests, reducing boilerplate further.
2. **API mocking** — Mock ZIP validation API responses to decouple tests from network availability and test edge cases without relying on specific ZIP codes remaining valid.
3. **Cross-browser testing** — Extend `playwright.config.ts` projects to include Firefox and WebKit for broader coverage.
4. **Visual regression** — Integrate screenshot comparison to catch unintended UI changes from design updates, particularly important on a frequently updated landing page.
```