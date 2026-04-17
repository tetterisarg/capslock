import { type Page, type Locator } from '@playwright/test';
import { Step1Zip } from './steps/Step1Zip';
import { Step2Interest } from './steps/Step2Interest';
import { Step3Property } from './steps/Step3Property';
import { Step4Contact } from './steps/Step4Contact';
import { Step5Phone } from './steps/Step5Phone';
import { StepOutOfArea } from './steps/StepSorry';
import { ProgressBar } from './ProgressBar';

export class LandingPage {
    private readonly page: Page;
    readonly step1: Step1Zip;
    readonly step2: Step2Interest;
    readonly step3: Step3Property;
    readonly step4: Step4Contact;
    readonly step5: Step5Phone;
    readonly outOfArea: StepOutOfArea;
    readonly progressBar: ProgressBar;

    constructor(page: Page) {
        this.page = page;
        const formContainer = page.locator('#form-container-1');

        this.step1 = new Step1Zip(formContainer);
        this.step2 = new Step2Interest(formContainer);
        this.step3 = new Step3Property(formContainer);
        this.step4 = new Step4Contact(formContainer);
        this.step5 = new Step5Phone(formContainer);
        this.outOfArea = new StepOutOfArea(formContainer);
        this.progressBar = new ProgressBar(page);

    }

    async goto(): Promise<void> {
        await this.page.goto('/');
    }
}