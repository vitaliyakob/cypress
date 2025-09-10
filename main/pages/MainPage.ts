import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class MainPage extends BasePage {
    readonly promoCode: Locator;
    readonly calendar: Locator;
    readonly exhibits: Locator;
    readonly spinner: Locator;
    readonly sessionTime: Locator;
    readonly cart: Locator;
    readonly memberships: Locator;
    readonly membershipsLevel: Locator;
    readonly oneItem: Locator;
    readonly promoBtn: Locator;

    constructor(public page: Page) {
        super(page);
        this.promoCode = page.locator('[class="hmns-tessitura-bar"] [placeholder="PROMO CODE"]');
        this.promoBtn = page.locator(`button[class*="promo-code-form__btn-submit"]`)
        this.calendar = page.locator(`[id='header'] a[title='Go to the HMNS Calendar']`);
        this.exhibits = page.getByRole('link', { name: 'Exhibits' });
        this.spinner = page.locator(`[class="hmns-tessitura-bar"] [class=promo-spinner]`);
        this.sessionTime = page.locator('[class="sessionTimer"]');
        this.cart = page.locator(`[class="hmns-tessitura-bar"] [class="tessitura-cell cart populated"]`);
        this.memberships = page.locator("#extra-menu").getByText("Memberships");
        this.membershipsLevel = page.getByText('Membership Levels');
        this.oneItem = page.locator('[aria-label="Cart, 0 items"]')
    };

    async addPromoCode(promo: string): Promise<void> {
        await this.promoCode.waitFor({state:'visible'})
        await this.promoCode.click();
        await this.promoCode.fill(promo);
        await this.page.keyboard.press('Enter');
        // await this.spinner.waitFor({state:'visible'})
        await this.spinner.waitFor({state:'hidden', timeout:30000})
    };

    async hoverToCalendar(): Promise<void> {
        await this.calendar.hover();
    };

    async navigateToExhibits(): Promise<void> {
        await this.exhibits.click();
    };

    async sessionTimeIsDisplayed() {
        await this.sessionTime.waitFor({state:'visible', timeout:20000})
    };

    async navigateToMembershipsLevel() {
        await this.memberships.waitFor({state:'visible'})
        await this.memberships.hover();
        await this.memberships.click();
        await this.membershipsLevel.waitFor({state:'visible'});
        await this.membershipsLevel.click()
    };

    async goToCart() {
        await this.oneItem.waitFor({state:'hidden', timeout:3000})
        await this.cart.click();
    }
}
