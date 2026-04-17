import { type Locator } from '@playwright/test';

export class Step4Contact {
    private readonly container: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly goToEstimateButton: Locator;

    constructor(container: Locator) {
        this.container = container.locator('.steps.step-4');
        this.nameInput = this.container.getByPlaceholder('Enter Your Name');
        this.emailInput = this.container.getByPlaceholder('Enter Your Email');
        this.goToEstimateButton = this.container.locator('[data-tracking="btn-step-4"]');
    }

    async fillAndSubmit(name: string, email: string): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.goToEstimateButton.click();
    }

    async trySubmitWithoutData(): Promise<void> {
        await this.goToEstimateButton.click();
    }
}