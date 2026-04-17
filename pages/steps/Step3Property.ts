import { type Locator } from '@playwright/test';

export class Step3Property {
    private readonly container: Locator;
    readonly nextButton: Locator;

    constructor(container: Locator) {
        this.container = container.locator('.steps.step-3');
        this.nextButton = this.container.locator('[data-tracking="btn-step-3"]');
    }

    async selectOption(optionId: string): Promise<void> {
        await this.container.locator(`label[for="${optionId}"]`).click();
    }

    async tryNextWithoutSelecting(): Promise<void> {
        await this.nextButton.click();
    }
}