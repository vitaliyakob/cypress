# 🔐 Cypress Login Automation Project

This project contains automated end-to-end tests for login functionality using [Cypress](https://www.cypress.io/).

> ✅ Tested site: [the-internet.herokuapp.com/login](https://the-internet.herokuapp.com/login)

---

## 📌 Test Scenarios Covered

- ✅ Successful login with valid credentials
- ❌ Failed login with invalid **username**
- ❌ Failed login with invalid **password**

---

## 🧱 Project Structure

cypress/
├── cypress/
│ ├── e2e/
│ │ └── login.cy.js # Test cases
│ ├── pageObjects/
│ │ └── LoginPage.js # Page Object Model for Login
│ └── testData/
│ ├── credentials.js # Test user data
│ └── messages.js # Expected messages
├── cypress.config.js # Cypress configuration
├── .gitignore
├── package.json
└── README.md

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vitaliyakob/cypress.git
cd cypress

- 2. Install dependencies
- Make sure you have Node.js installed.

- npm install

- 3. Run the tests
- Run tests in headless mode
- npx cypress run

- Run tests in interactive mode (Cypress GUI):

- npx cypress open

- Dependencies
- "cypress": "^12.x or 13.x"
- Install via:

- npm install --save-dev cypress
