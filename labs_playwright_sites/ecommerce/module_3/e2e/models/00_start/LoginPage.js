/***
 * @description This file contains the PaymentSuccessPage class, which represents the payment success page of the e-commerce site.
 * It provides methods to interact with the elements on the page, such as checking for a success message and clicking on the continue button.
 */

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.email = this.page.getByRole('textbox', {name: 'email'});
        this.password = this.page.getByRole('textbox', {name: 'password'});
        this.loginBtn = this.page.getByRole('button', {name: 'Login'});
        this.errorMsg = this.page.getByText('Invalid credentials');
        this.registerBtn = this.page.getByRole('button', {name: /checkout/i});

    }

    async goto() {
        await this.page.goto('/login'); // Adjust the URL path as needed
    }
    async fillLoginForm(email, password) {
        await this.email.fill(email);
        await this.password.fill(password);
    }
    async clickLogin() {
        await this.loginBtn.click();
    }
    async checkErrorMsg() {
        await this.errorMsg.isVisible();
    }
    async clickRegister() {
        await this.registerBtn.click();
    }
}