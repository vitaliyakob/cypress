import { expect, Locator, Page } from '@playwright/test';

export default class BasePage {
    readonly logo: Locator;
    readonly password: Locator;
    readonly logIn: Locator;

    constructor(public page: Page) {
        this.page = page;
        this.logo = page.locator('.wp-login-logo');
        this.password = page.locator('#password_protected_pass');
        this.logIn = page.locator('#wp-submit');
    }

    async navigateToURL(): Promise<void> {
        await this.page.goto('/');
    }

    getUrl(): string {
        return this.page.url();
    }

    async loginToApplication(pass:string) {
        await this.logo.waitFor({state:'visible'});
        await this.password.fill(pass);
        await this.logIn.click();
    };

    async expectRedirect(expectedUrl: string, timeout = 30000, selectorToWaitFor?: string) {

    await this.page.waitForURL(
        url => url.toString().includes(expectedUrl),
        { timeout }
    );


    await this.page.waitForLoadState('networkidle', { timeout });


    if (selectorToWaitFor) {
        await this.page.locator(selectorToWaitFor).waitFor({ timeout });
    }
    const currentUrl = this.page.url();
    if (!currentUrl.includes(expectedUrl)) {
        throw new Error(`Redirect failed: expected URL to include "${expectedUrl}", got "${currentUrl}"`);
    }
}

}
