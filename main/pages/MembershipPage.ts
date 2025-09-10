import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class MembershipPage extends BasePage {
    readonly orderInformation: Locator;
    readonly nextButton: Locator;
    readonly prevButton: Locator;
    readonly membershipSection: Locator;

    constructor(public page: Page) {
        super(page);
        this.nextButton = page.locator('button[class*="button next"]');
        this.prevButton = page.locator('button[class*="button prev"]');
        this.membershipSection = page.locator('[id=membership-levels]')
    }

    async clickMembership(type: string) {
        await this.membershipSection.scrollIntoViewIfNeeded()
        const membershipLocator = this.page.locator(
            `[aria-label*="Purchase ${type} HMNS Membership"]`
        );

        while (true) {
            if (await membershipLocator.isVisible()) {
                await membershipLocator.click();
                break;
            }

            if (await this.nextButton.isDisabled()) {
                throw new Error(`Membership type "${type}" not found`);
            }

            await this.nextButton.click();
            await this.page.waitForTimeout(500);
        }
    }
}