import { expect, test } from "../main/fixtures/base_fixtures";
import { password, testUsers } from '../main/config/users';
import { getFreshchatToken, getMembershipId, getSessionKey, getSessionKeyFirst, getWpNonce } from "../main/api/apiHelper";

test.describe.parallel('Login Page', () => {
  for (const user of testUsers) {
    test(`add items and make payments for ${user.email}`, async ({
      basePage,
      loginPage,
      mainPage,
      detailsPage,
      paymentPage,
      receiptPage,
      membershipPage,
      familyPage,
      page,
      request
    }, testInfo) => {
      console.log(`Running test with user: ${user.email}`);
      await basePage.navigateToURL();
      await basePage.loginToApplication(password);
      await mainPage.addPromoCode("ANNUAL15");
      await mainPage.navigateToMembershipsLevel();
      await membershipPage.clickMembership(user.productName);
      // await familyPage.expectRedirect('memberships/family/');
      await familyPage.addFamilyToCard();
       const nonce = await getWpNonce(page);
      const sessionKey = await getSessionKey(request, nonce);
      const membershipId = await getMembershipId(request, nonce);
      console.log(sessionKey, user.email);
      console.log(membershipId)
      const attachmentData = Buffer.from(JSON.stringify({ sessionKey, membershipId }, null, 2));

      testInfo.attachments.push({
        name: `Session and Membership for ${user.email}`,
        contentType: 'application/json',
        body: attachmentData,
      });
      await mainPage.goToCart();
      await detailsPage.checkNameOfTheAddedItem(user.productName);
      
      await detailsPage.checkoutTOPayments();
      await loginPage.submitLoginForm(user.email, user.password);
      // const token = await getFreshchatToken(page);
      // console.log('Freshchat token:', token);
      
      
      // await detailsPage.checkMessage();

      const billing = await detailsPage.getBillingText();
      await detailsPage.checkNameOfTheAddedItem(user.productName);
      await paymentPage.fillAdyenCard('3607 0500 0010 20','03/30','737','US');
      await paymentPage.agreeToTheTerms();
      await paymentPage.completeCheckout();
      // await receiptPage.expectRedirect('cart/receipt/');
      // await receiptPage.expectOrderTextToContain("");
      await receiptPage.expectBillingTextToContain(billing);
      await receiptPage.getNameItem(user.productName);
      // const tokenAfterBuy = await getFreshchatToken(page);
      // console.log('Freshchat token:', tokenAfterBuy);
      // await expect(token).toEqual(tokenAfterBuy)
    });
  }
});
