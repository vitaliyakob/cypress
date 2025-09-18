import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class FamilyPage extends BasePage {
    readonly addToCart: Locator;
    readonly spinner: Locator;

    constructor(public page: Page) {
        super(page);
        this.addToCart = page.locator('button[class=add-to-cart-btn]');
        this.spinner = page.locator('[class="hmns-tessitura-bar"] [class="logged-out"]')
    }

    async addFamilyToCard(): Promise<void> {
        await this.spinner.waitFor({state:"visible", timeout:60000})
        await this.addToCart.click();
    }
}