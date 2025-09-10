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
    

    constructor(public page: Page) {
        super(page);
        this.title = page.locator('h1[class=large-title]');
        this.selectDay = page.locator('[class=selectPerf]')
        this.availableTimes = page.locator('[class=selectPerfTime]');
        this.addTickets = page.locator(`div[class="form-flex"]`);
        this.add = page.locator('button[class*="add-to-cart"]');
        this.timeDropdown = page.locator('[class="zone-id"]');
        this.oneItem = page.locator('[aria-label="Cart, 0 items"]')
        this.cart = page.locator('[class="hmns-tessitura-bar"] [class="tessitura-cell cart"]')
    }

   dateFromToday(offsetDays: number = 2): Locator {
    const today = new Date();
    today.setDate(today.getDate() + offsetDays);
    const day = today.getDate();
    return this.page.locator(`//li[@data-access='allowed' and contains(text(),'${day}')]`);
}

   timeFromISO(isoString: string, offsetHours: number = 3): Locator {
    const date = new Date(isoString);
    date.setHours(date.getHours() + offsetHours);

    // Округляємо хвилини вниз до кратного 15
    const minutes = Math.floor(date.getMinutes() / 15) * 15;
    date.setMinutes(minutes, 0, 0);

    // Форматуємо у 12-годинний формат з AM/PM
    const hours12 = date.getHours() % 12 || 12;
    const minutesStr = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    const timeText = `${hours12}:${minutesStr} ${ampm}`;

    // Шукаємо li всередині timeDropdown і тільки видимий
    return this.page.locator('[class="zone-id"]', { hasText: `${timeText}`}).nth(0);
}

async selectDateandTime() {
    await this.selectDay.click();
    const day = this.dateFromToday();
    await day.click();
   
    await this.availableTimes.click();

    const now = new Date();
    const time = this.timeFromISO(now.toISOString(), 1);

    // await this.timeDropdown.waitFor({ state: 'visible', timeout: 4000 });
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
        await this.add.click()
    };

    async goToCart() {
        await this.cart.click();
    }
}