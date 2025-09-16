import { expect, test } from "../main/fixtures/base_fixtures";
import { password, testUsers } from '../main/config/users';
import { getFreshchatToken, getMembershipId, getSessionKey, getWpNonce } from "../main/api/apiHelper";

const USERS_PER_BLOCK = 10; 


for (let i = 0; i < testUsers.length; i += USERS_PER_BLOCK) {
  const chunk = testUsers.slice(i, i + USERS_PER_BLOCK);

  test.describe.parallel(`User block ${i / USERS_PER_BLOCK + 1}`, () => {
    for (const user of chunk) {
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
        await familyPage.addFamilyToCard();

        const nonce = await getWpNonce(page);
        const sessionKey = await getSessionKey(request, nonce);
        const membershipId = await getMembershipId(request, nonce);

        console.log(sessionKey, user.email);
        console.log(membershipId);

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

        const billing = await detailsPage.getBillingText();
        await detailsPage.checkNameOfTheAddedItem(user.productName);

        await paymentPage.fillAdyenCard('3607 0500 0010 20','03/30','737','US');
        await paymentPage.agreeToTheTerms();
        await paymentPage.completeCheckout();

        await receiptPage.expectBillingTextToContain(billing);
        await receiptPage.getNameItem(user.productName);
      });
    }
  });
}
