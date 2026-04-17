import { type Locator } from '@playwright/test';

export class Step1Zip {
    private readonly container: Locator;
    readonly zipInput: Locator;
    readonly nextButton: Locator;

    constructor(container: Locator) {
        this.container = container.locator('.steps.step-1');
        this.zipInput = this.container.locator('[data-zip-code-input]');
        this.nextButton = this.container.locator('[data-tracking="btn-step-1"]');
    }

    async enterZip(zip: string): Promise<void> {
        await this.zipInput.fill(zip);
        await this.nextButton.click();
    }
}