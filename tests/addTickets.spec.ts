import { expect, test } from "../main/fixtures/base_fixtures";
import { password, testUsers } from '../main/config/users';
import { getFreshchatToken, getMembershipId, getSessionKey,  getWpNonce } from "../main/api/apiHelper";

test.describe('Login Page', () => {
  for (const user of testUsers) {
    test(`add items and make payments for ${user.email}`, async ({
      basePage,
      loginPage,
      mainPage,
      detailsPage,
      paymentPage,
      receiptPage,
      page,
      request,
      calendarPage,
      audubonPage
    }) => {
      console.log(`Running test with user: ${user.email}`);
      await basePage.navigateToURL();
      await basePage.loginToApplication(password);
      await mainPage.hoverToCalendar();
      await mainPage.navigateToExhibits();
      await calendarPage.selectAudubonsTicket();
      // await audubonPage.checkTitle();
      await audubonPage.selectDateandTime();
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      await audubonPage.chooseNumberOfTickets(randomNumber);
      await audubonPage.clickAddToCart()
      await mainPage.sessionTime.waitFor({state:'visible', timeout:10000})
      await mainPage.goToCart();
      const str1 = randomNumber.toString();
      await detailsPage.expectQuantityToBe(str1);
      //   const nonce = await getWpNonce(page);
      // const sessionKey = await getSessionKey(request, nonce);
      // const membershipId = await getMembershipId(request, nonce);
      // console.log(sessionKey);
      // console.log(membershipId)
      await detailsPage.expectDateToBe(audubonPage.lastSelectedDate);
      await detailsPage.checkoutTOPayments();
      await loginPage.submitLoginForm(user.email, user.password);
      // const token = await getFreshchatToken(page);
      // console.log('Freshchat token:', token);
      // await mainPage.addPromoCode(user.promoCode);
      // await detailsPage.checkMessage();

      const billing = await detailsPage.getBillingText();
      await paymentPage.fillAdyenCard(user.card,'03/30','737','US');
      await paymentPage.agreeToTheTerms();
      await paymentPage.completeCheckout();
      // await receiptPage.expectOrderTextToContain("");
      await receiptPage.expectBillingTextToContain(billing);
      // const tokenAfterBuy = await getFreshchatToken(page);
      // console.log('Freshchat token:', tokenAfterBuy);
      // expect(token).toEqual(tokenAfterBuy)
    });
  }
});
