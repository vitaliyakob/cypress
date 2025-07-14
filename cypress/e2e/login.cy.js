import LoginPage from '../pageObjects/LoginPage';
import { LoginData } from '../testData/credentials';
import { NOTIFICATIONS } from '../testData/message';

const loginPage = new LoginPage();

const testCases = [
  {
    title: 'should login successfully with valid credentials',
    username: LoginData.VALID_USERNAME,
    password: LoginData.VALID_PASSWORD,
    expectedMessage: NOTIFICATIONS.SUCCESS_MESSAGE,
    isSuccess: true,
  },
  {
    title: 'should fail login with invalid username',
    username: LoginData.INVALID_USERNAME,
    password: LoginData.VALID_PASSWORD,
    expectedMessage: NOTIFICATIONS.INVALID_USERNAME_MESSAGE,
    isSuccess: false,
  },
  {
    title: 'should fail login with invalid password',
    username: LoginData.VALID_USERNAME,
    password: LoginData.INVALID_PASSWORD,
    expectedMessage: NOTIFICATIONS.INVALID_PASSWORD_MESSAGE,
    isSuccess: false,
  },
];

describe('Login functionality', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  testCases.forEach(({ title, username, password, expectedMessage, isSuccess }) => {
    it(title, () => {
      loginPage.login(username, password);
      if (isSuccess) {
        loginPage.getSuccessMessage().should('contain', expectedMessage);
      } else {
        loginPage.getErrorMessage().should('contain', expectedMessage);
      }
    });
  });
});
