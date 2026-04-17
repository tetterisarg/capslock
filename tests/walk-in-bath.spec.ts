import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { ZIP, INTEREST_OPTIONS, PROPERTY_OPTIONS, CONTACT, URLS } from '../data/testData';

let lp: LandingPage;

test.beforeEach(async ({ page }) => {
    lp = new LandingPage(page);
    await lp.goto();
});

test.describe('Walk-In Bath - Form Flow', () => {

    test('TC1 - User in service area completes all steps and reaches Thank You page - Checking Progress Bar', async ({ page }) => {
        await lp.step1.enterZip(ZIP.serviceArea);

        await lp.step2.selectOption(INTEREST_OPTIONS.safety);
        await lp.progressBar.assertStep(2, '40%', 5, true); // DEFECT-02: currently 36%
        await lp.step2.nextButton.click();

        await lp.step3.selectOption(PROPERTY_OPTIONS.ownedHouse);
        await lp.progressBar.assertStep(3, '60%', 5, true); // DEFECT-02: currently 36%
        await lp.step3.nextButton.click();

        await lp.progressBar.assertStep(4, '80%', 5, true); // DEFECT-02: currently 52%
        await lp.step4.fillAndSubmit(CONTACT.valid.name, CONTACT.valid.email);


        await lp.progressBar.assertStep(5, '100%', 5, false);
        await lp.step5.fillAndSubmit(CONTACT.valid.phone);
        await expect(page).toHaveURL(URLS.thankyou);
    });

    test('TC2 - Out-of-area user submits notification email and sees confirmation', async ({ page }) => {
        await lp.step1.enterZip(ZIP.outOfArea);

        await expect(lp.outOfArea.outOfAreaMessage).toBeVisible();
        await expect(lp.outOfArea.emailInput).toBeVisible();
        await lp.outOfArea.submitEmail(CONTACT.valid.email);
        await expect(lp.outOfArea.confirmationMessage).toBeVisible();
    });

    test('TC3 - User entering an invalid ZIP format is blocked from proceeding', async ({ page }) => {
        for (const zip of [ZIP.tooShort, ZIP.tooLong, ZIP.nonNumeric]) {
            await lp.step1.zipInput.fill(zip);
            await lp.step1.nextButton.click();
            await expect(lp.step2.nextButton).not.toBeVisible({ timeout: 3000 });
            await lp.step1.zipInput.clear();
        }
    });

    test.fail('TC4 - [DEFECT-01] Step 2 requires a selection before proceeding', async ({ page }) => {
        await lp.step1.enterZip(ZIP.serviceArea);
        // Expected: Next should be blocked without a selection.
        // Current behavior: form advances — this test will fail against the live page.
        await lp.step2.tryNextWithoutSelecting();

        await expect(lp.step3.nextButton).not.toBeVisible();
    });

    test.fail('TC5 - [DEFECT-06] Step 4 email without TLD should be rejected', async ({ page }) => {
        await lp.step1.enterZip(ZIP.serviceArea);
        await lp.step2.selectOption(INTEREST_OPTIONS.safety);
        await lp.step2.nextButton.click();
        await lp.step3.selectOption(PROPERTY_OPTIONS.ownedHouse);
        await lp.step3.nextButton.click();

        // Expected: submission should be blocked for email without TLD.
        // Current behavior: form advances to step 5 — this test will fail against the live page.
        await lp.step4.fillAndSubmit(CONTACT.valid.name, CONTACT.invalid.emailNoTld);

        await expect(lp.step5.submitButton).not.toBeVisible();
    });

    test('TC6 - User entering an invalid phone number is blocked from proceeding', async ({ page }) => {
        await lp.step1.enterZip(ZIP.serviceArea);
        await lp.step2.selectOption(INTEREST_OPTIONS.safety);
        await lp.step2.nextButton.click();
        await lp.step3.selectOption(PROPERTY_OPTIONS.ownedHouse);
        await lp.step3.nextButton.click();
        await lp.step4.fillAndSubmit(CONTACT.valid.name, CONTACT.valid.email);

        await lp.step5.phoneInput.fill('555123456'); // 9 digits
        await lp.step5.submitButton.click();

        await expect(lp.step5.errorBlock).toBeVisible();
        await expect(lp.step5.errorBlock).toContainText('Wrong phone number.');
        await expect(page).not.toHaveURL(URLS.thankyou);
    });

});