import BasePage from "../pages/BasePage";
import CalendarPage from "../pages/CalendarPage";
import DetailsPage from "../pages/DetailsPage";
import LoginPage from "../pages/LoginPage"
import { test as base } from '@playwright/test'
import MainPage from "../pages/MainPage";
import AudubonsPage from "../pages/AudubonsPage";
import PaymentPage from "../pages/PaymentPage";
import ReceiptPage from "../pages/ReceiptPage";
import MembershipPage from "../pages/MembershipPage";
import FamilyPage from "../pages/FamilyPage";

type Fixtures = {
    loginPage: LoginPage;
    basePage: BasePage;
    detailsPage: DetailsPage;
    calendarPage: CalendarPage;
    mainPage: MainPage;
    audubonPage: AudubonsPage;
    paymentPage: PaymentPage;
    receiptPage: ReceiptPage;
    membershipPage: MembershipPage;
    familyPage: FamilyPage;
}

export const test = base.extend<Fixtures>({
    loginPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await use(new LoginPage(page));
        await context.close();
    },
    basePage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await use(new BasePage(page));
        await context.close();
    },
    mainPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await use(new MainPage(page));
        await context.close();
    },
    detailsPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await use(new DetailsPage(page));
        await context.close();
    },
    calendarPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await use(new CalendarPage(page));
        await context.close();
    },
    paymentPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await use(new PaymentPage(page));
        await context.close();
    },
    audubonPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await use(new AudubonsPage(page));
        await context.close();
    },
    receiptPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await use(new ReceiptPage(page));
        await context.close();
    },
    membershipPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await use(new MembershipPage(page));
        await context.close();
    },
    familyPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await use(new FamilyPage(page));
        await context.close();
    },
})

export { expect } from '@playwright/test'
