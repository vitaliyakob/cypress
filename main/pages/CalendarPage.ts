import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class CalendarPage extends BasePage {
    readonly audubons: Locator;
    readonly calendarSection: Locator;
    readonly extreme: Locator;

    constructor(public page: Page) {
        super(page);
        this.calendarSection = page.locator('[id=calendar-extraordinaire]');
        this.audubons = page.locator(".calendar-items >> div.performance:nth-child(2) >> .bb-tickets");
        this.extreme = page.locator(".calendar-items >> div.performance:nth-child(3) >> .bb-tickets");
    }

    async selectAudubonsTicket(): Promise<void> {
        await this.calendarSection.waitFor({state:'visible'})
        await this.audubons.click()
    }
}