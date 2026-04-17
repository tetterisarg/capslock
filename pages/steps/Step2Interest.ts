import { type Locator } from '@playwright/test';

export class Step2Interest {
    private readonly container: Locator;
    readonly nextButton: Locator;

    constructor(container: Locator) {
        this.container = container.locator('.steps.step-2');
        this.nextButton = this.container.locator('[data-tracking="btn-step-2"]');
    }

    async selectOption(optionId: string): Promise<void> {
        await this.container.locator(`label[for="${optionId}"]`).click();
    }

    async tryNextWithoutSelecting(): Promise<void> {
        await this.nextButton.click();
    }
}