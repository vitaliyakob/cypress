import BasePage from "../pages/BasePage";
import CalendarPage from "../pages/CalendarPage";
import DetailsPage from "../pages/DetailsPage";
import LoginPage from "../pages/LoginPage"
import {test as base} from '@playwright/test'
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
    familyPage: FamilyPage
};

export const test = base.extend<Fixtures>({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    basePage: async ({page}, use) => {
        await use(new BasePage(page));
    },
    mainPage: async ({page}, use) => {
        await use(new MainPage(page));
    },
    detailsPage: async ({page}, use) => {
        await use(new DetailsPage(page));
    },
    calendarPage: async ({page}, use) => {
        await use(new CalendarPage(page));
    },
    paymentPage: async ({page}, use) => {
        await use(new PaymentPage(page));
    },
    audubonPage: async ({page}, use) => {
        await use(new AudubonsPage(page));
    },
    receiptPage: async ({page}, use) => {
        await use(new ReceiptPage(page));
    },
    membershipPage: async ({page}, use) => {
        await use(new MembershipPage(page));
    },
    familyPage: async ({page}, use) => {
        await use(new FamilyPage(page));
    },
})

export { expect } from '@playwright/test'