import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class DetailsPage extends BasePage {
    readonly detailsPage: Locator;
    readonly checkout: Locator;
    readonly promoApply: Locator;
    readonly billing: Locator;
    readonly checkCartItem: Locator;
    readonly quantity: Locator;
    readonly selectedDate: Locator;
    

    constructor(public page: Page) {
        super(page);
        this.detailsPage = page.locator('.tn-cart-details-page');
        this.checkout = page.locator('[class*="cart-buttons__primary"]');
        this.promoApply = page.locator('[class*="cart__promo-applied"]');
        this.billing = page.locator('[class="tn-patron-billing-information"]>div>div:nth-child(2)');
        this.checkCartItem = page.locator('[class="tn-cart-line-item-name"]');
        this.quantity = page.locator('[class*="item--quantity"]');
        this.selectedDate = page.locator('[class*="property--date-time"]')
        
    }

    async checkoutTOPayments(): Promise<void> {
        await this.detailsPage.waitFor({state:'visible', timeout:10000})
        await this.checkout.click()
    };

    async expectQuantityToBe(value: string) {
        await this.detailsPage.waitFor({state:'visible', timeout:10000})
        await expect(this.quantity).toContainText(value);
    };

    async expectDateToBe(value: string) {
        const escapedDate = value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(escapedDate);

        await expect(this.selectedDate).toContainText(regex, { timeout: 10000 });
    };

   async checkNameOfTheAddedItem(membership: string) {
        await this.checkCartItem.scrollIntoViewIfNeeded();
        await this.checkCartItem.waitFor({ state: "visible", timeout: 200000 });

        const text = await this.checkCartItem.textContent();
        console.log("Membership is:", text);

        expect(text?.trim()).toContain(membership);
    }

    async checkMessage() {
        await this.promoApply.scrollIntoViewIfNeeded();
        await this.promoApply.waitFor({state:'visible', timeout:10000});
        await expect(this.promoApply).toContainText(' The promotion has been applied to your cart.')
    };

    async getBillingText() {
    await this.billing.first().waitFor({ state: 'visible', timeout: 200000 });
    const allTexts = await this.billing.allTextContents();
    const fullText = allTexts.join('\n').trim();

    const normalizedText = fullText.replace(/\s+/g, ' ').trim();

    console.log('Billing Text:', normalizedText);
    return normalizedText;
}
}