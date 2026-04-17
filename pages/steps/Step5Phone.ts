import { type Locator } from '@playwright/test';

export class Step5Phone {
    private readonly container: Locator;
    readonly phoneInput: Locator;
    readonly submitButton: Locator;
    readonly errorBlock: Locator;

    constructor(container: Locator) {
        this.container = container.locator('.steps.step-5');
        this.phoneInput = this.container.getByPlaceholder('(XXX)XXX-XXXX');
        this.submitButton = this.container.locator('[data-tracking="btn-step-5"]');
        this.errorBlock = this.container.locator('[data-error-block]');
    }

    async fillAndSubmit(phone: string): Promise<void> {
        await this.phoneInput.fill(phone);
        await this.submitButton.click();
    }

    async trySubmitWithoutData(): Promise<void> {
        await this.submitButton.click();
    }
}