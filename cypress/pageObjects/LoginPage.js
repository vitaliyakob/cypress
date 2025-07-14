class LoginPage {
    visit() {
        cy.visit('/login');
    }

    fillUsername(username) {
        cy.get('#username').clear().type(username);
    }

    fillPassword(password) {
        cy.get('#password').clear().type(password);
    }

    submit() {
        cy.get('button[type="submit"]').click();
    }

    login(username, password) {
        this.fillUsername(username);
        this.fillPassword(password);
        this.submit();
    }

    getSuccessMessage() {
        return cy.get('.flash.success');
    }

    getErrorMessage() {
        return cy.get('.flash.error');
    }
}

export default LoginPage;