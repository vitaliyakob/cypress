import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginForm: Locator;
    readonly sighIn: Locator;
    readonly title: Locator;

    constructor(public page: Page) {
        super(page);
        this.userNameInput = page.locator('#PatronAccountLogin_Username');
        this.passwordInput = page.locator('#PatronAccountLogin_Password');
        this.loginButton = page.locator(`[class='top-nav'] [class='logged-out']`)
        this.loginForm = page.locator('[id*=login-form]');
        this.sighIn = page.locator('#tn-login-button');
        this.title = page.locator('[title="Houston Museum of Natural Science (HMNS)"]')
    }

    async inputUsername(username: string): Promise<void> {
        await this.userNameInput.fill(username);
    }

    async inputPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.waitFor({state:'visible'});
        await this.loginButton.click();
        await this.loginForm.waitFor({state:'visible'});
    }

    async submitLoginForm(username: string, password: string): Promise<void> {
        await this.inputUsername(username);
        await this.inputPassword(password);
        await this.sighIn.click();
        // await this.title.waitFor({state:'visible', timeout:10000})
    }
}
