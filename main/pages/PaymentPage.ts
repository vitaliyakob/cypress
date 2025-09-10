import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { scrollUntilVisible } from '../utils/scroll';

export default class PaymentPage extends BasePage {
    readonly cardNumber: Locator;
    readonly expirationDate: Locator;
    readonly extreme: Locator;
    readonly nameOfCard: Locator;
    readonly securityCode: Locator;
    readonly agreeTerms: Locator;
    readonly complete: Locator;
    readonly payment: Locator;
    readonly cardPayment: Locator;

    constructor(public page: Page) {
        super(page);
        this.cardNumber = page
            .frameLocator('iframe[title="Iframe for secured card number"]')
            .locator('[data-fieldtype="encryptedCardNumber"]');

        this.expirationDate = page
            .frameLocator('iframe[title="Iframe for secured card expiry date"]')
            .locator('[data-fieldtype="encryptedExpiryDate"]');

        this.securityCode = page
            .frameLocator('div[class*="cvc adyen-checkout__field--security"] iframe[title="Iframe for secured card security code"]')
            .locator('[data-fieldtype="encryptedSecurityCode"]');

        this.nameOfCard = page.locator(`[class*='adyen-checkout__field adyen-checkout__card__holderName'] input`);
        this.agreeTerms = page.locator('[name=AgreeToTerms]');
        this.complete = page.locator('#tn-payment-submit-button');
        this.payment = page.locator(`[id*='payment-drop'] span[class='adyen-checkout__payment-method__radio']`);
        this.cardPayment = page.locator("#tn-payment-drop-target")
    }

    async fillAdyenCard(
        cardNumber: string,
        expiry: string,
        cvc: string,
        name: string
    ) {
        console.log('➡️ Starting to fill card details');

        console.log('🔎 Scrolling to payment section...');
        await scrollUntilVisible(this.page, this.cardPayment);

        if (await this.payment.isVisible()) {
            console.log('✅ Card payment option is visible. Clicking...');
            await this.payment.click();
        } else {
            console.log('⚠️ No need to click card payment option');
        }

        console.log(`✏️ Filling card number: ${cardNumber}`);
        await this.cardNumber.fill(cardNumber);

        console.log(`✏️ Filling expiration date: ${expiry}`);
        await this.expirationDate.fill(expiry);

        console.log(`✏️ Filling cardholder name: ${name}`);
        await this.nameOfCard.fill(name);

        console.log(`✏️ Filling CVC: ${cvc}`);
        await this.securityCode.fill(cvc);

        console.log('✅ Card details filled successfully');
    }

    async agreeToTheTerms() {
        console.log('☑️ Agreeing to terms and conditions');
        await this.agreeTerms.click()
    };

    async completeCheckout() {
        console.log('💳 Completing checkout...');
        await this.complete.click();
        console.log('✅ Clicked complete checkout button');
    }
}
