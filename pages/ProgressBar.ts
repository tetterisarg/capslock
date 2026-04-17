import { type Locator, type Page, expect } from '@playwright/test';

export class ProgressBar {
    private readonly bar: Locator;
    private readonly currentStep: Locator;
    private readonly totalSteps: Locator;

    constructor(page: Page) {
        this.bar = page.locator('[data-form-progress] [data-current-progress]').first();
        this.currentStep = page.locator('[data-form-progress-current-step]').first();
        this.totalSteps = page.locator('[data-form-progress-total-steps]').first();
    }

    async assertStep(expectedStep: number, expectedWidth: string, expectedTotal: number, isDefect: boolean): Promise<void> {
        const assertion = isDefect ? expect.soft : expect;
        await assertion(this.bar).toHaveAttribute('style', new RegExp(`width:\\s*${expectedWidth}`));
        await assertion(this.currentStep).toHaveText(String(expectedStep));
        await expect(this.totalSteps).toHaveText(String(expectedTotal));
    }
}