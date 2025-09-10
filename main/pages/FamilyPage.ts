import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class FamilyPage extends BasePage {
    readonly addToCart: Locator;

    constructor(public page: Page) {
        super(page);
        this.addToCart = page.locator('button[class=add-to-cart-btn]');
    }

    async addFamilyToCard(): Promise<void> {
        await this.addToCart.click();
    }
}