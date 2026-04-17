import { type Locator } from '@playwright/test';

export class StepOutOfArea {
    private readonly container: Locator;
    readonly emailInput: Locator;
    readonly submitButton: Locator;
    readonly confirmationMessage: Locator;
    readonly outOfAreaMessage: Locator;

    constructor(container: Locator) {
        this.container = container.locator('.steps.step-sorry');
        this.emailInput = this.container.locator('[data-email-input]');
        this.submitButton = this.container.locator('button[type="submit"]')
        this.outOfAreaMessage = this.container.getByText("Sorry, unfortunately we don’t yet install in your area but if you’d like us to notify you when we do please enter your email address below");
        this.confirmationMessage = this.container.getByText("we will contact you when our service becomes available");
    }

    async submitEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.submitButton.click();
    }
}