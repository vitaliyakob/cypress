import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class ReceiptPage extends BasePage {
    readonly orderInformation: Locator;
    readonly checkout: Locator;
    readonly extreme: Locator;
    readonly order: Locator;
    readonly billing: Locator;
    readonly name: Locator;
    readonly productName: Locator;
    readonly listItem: Locator;

    constructor(public page: Page) {
        super(page);
        this.orderInformation = page.locator('.tn-receipt-page');
        this.checkout = page.locator('[class*="cart-buttons__primary"]');
        this.order = page.locator('[class="tn-receipt-component"]>div>div:last-child span');
        this.billing = page.locator('[class="tn-patron-billing-information"]>div>div:last-child>div');
        this.name = page.locator('[class*="item-name"]');
        this.productName = page.locator('[class*="tn-product-type-name"]');
        this.listItem = page.locator('[class*="performance-detail"] [class*="list-item--pricetype"]');
    }

    async orderIsCompleted(): Promise<void> {
        await this.orderInformation.waitFor({state:'visible', timeout:20000})
    }

    async expectOrderTextToContain(expectedText: string) {
        await this.order.first().waitFor({ state: 'visible', timeout: 20000 });
        const allTexts = await this.order.allTextContents();
        const fullText = allTexts.join('\n').trim();
        console.log('Order Text:', fullText);
        expect(fullText).toContain(expectedText);
    }

    async expectBillingTextToContain(expectedText: string) {
        // await this.billing.first().waitFor({ state: 'visible', timeout: 20000 });
        const allTexts = await this.billing.allTextContents();
        const fullText = allTexts.join('\n').trim();

        const normalizedText = fullText.replace(/\s+/g, ' ').trim();

        console.log('Billing Text:', normalizedText);
        expect(normalizedText).toContain(expectedText.replace(/\s+/g, ' ').trim());
    }

    async getNameItem(name:string) {
        await this.name.scrollIntoViewIfNeeded();
        await expect(this.name).toContainText(name);
    }
}