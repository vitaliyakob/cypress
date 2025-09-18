import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class AudubonsPage extends BasePage {
    readonly title: Locator;
    readonly availableTimes: Locator;
    readonly selectDay: Locator;
    readonly addTickets: Locator;
    readonly add: Locator;
    readonly timeDropdown: Locator;
    readonly cart: Locator;
    readonly oneItem: Locator;
    public lastSelectedDate: string;
    readonly spinner: Locator;
    

    constructor(public page: Page) {
        super(page);
        this.title = page.locator('h1[class=large-title]');
        this.selectDay = page.locator('[class=selectPerf]')
        this.availableTimes = page.locator('[class=selectPerfTime]');
        this.addTickets = page.locator(`div[class="form-flex"]`);
        this.add = page.locator('button[class*="add-to-cart"]');
        this.timeDropdown = page.locator('[class="zone-id"]');
        this.oneItem = page.locator('[aria-label="Cart, 0 items"]')
        this.cart = page.locator('[class="hmns-tessitura-bar"] [class="tessitura-cell cart"]');
        this.spinner = page.locator('[class="hmns-tessitura-bar"] [class="logged-out"]')
    }

   dateFromNextDays(maxOffsetDays: number = 10): Locator {
    const offsetDays = Math.floor(Math.random() * maxOffsetDays) + 1;

    const date = new Date();
    date.setDate(date.getDate() + offsetDays);

    const fullMonth = date.toLocaleDateString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    this.lastSelectedDate = `${fullMonth} ${day}, ${year}`;

    const shortMonth = date.toLocaleDateString('en-US', { month: 'short' });
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = `${weekday}, ${shortMonth} ${day} ${year}`;

    return this.page.locator('.perfDropDownMenu').getByText(formattedDate, { exact: true });
}

    timeFromISO(isoString: string, offsetHours: number = 3): Locator {
        const date = new Date(isoString);
        date.setHours(date.getHours() + offsetHours);

        const minutes = Math.floor(date.getMinutes() / 15) * 15;
        date.setMinutes(minutes, 0, 0);

        const hours12 = date.getHours() % 12 || 12;
        const minutesStr = date.getMinutes().toString().padStart(2, '0');
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        const timeText = `${hours12}:${minutesStr} ${ampm}`;

        return this.page.locator('[class="zone-id"]', { hasText: `${timeText}`}).nth(0);
    }

    async selectDateandTime() {
        await this.selectDay.waitFor({state:'visible'})
        await this.selectDay.click({ timeout: 5000 });
        const day = this.dateFromNextDays();
        await day.waitFor({state:'visible'})
        await day.click({ timeout: 5000 });
    
        await this.availableTimes.click();

        const now = new Date();
        const time = this.timeFromISO(now.toISOString(), 1);

        await time.waitFor({ state: 'visible', timeout: 10000 });
        await time.click({ timeout: 10000 });
    }

    async checkTitle() {
        await this.title.waitFor({state:'visible', timeout:10000});
        await expect(this.title).toHaveText(`Audubon’s Birds of America`)
    };

    async chooseNumberOfTickets(count: number) {
        const tikets = this.page.locator('[class="form-flex"]', { hasText: `Public Adult`}).locator('span[class="plus"]');
        for (let i = 0; i < count; i++) {
            await tikets.click();
        }
    };

    async clickAddToCart() {
        await this.spinner.waitFor({state:"visible", timeout:20000})
        await this.page.waitForTimeout(5000)
        await this.add.click();
    }

    async goToCart() {
        await this.cart.click();
    }
}