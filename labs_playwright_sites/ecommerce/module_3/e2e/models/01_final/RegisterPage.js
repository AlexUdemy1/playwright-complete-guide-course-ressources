/***
 * @description This file contains the PaymentSuccessPage class, which represents the payment success page of the e-commerce site.
 * It provides methods to interact with the elements on the page, such as checking for a success message and clicking on the continue button.
 */

export class RegisterPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.confirmPasswordInput = page.locator('#confirmPassword');
        this.registerButton = page.locator('#register');
    }

    async navigate() {
        await this.page.goto('/register');
    }

    async fillRegistrationForm(firstName, lastName, email, password, confirmPassword) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmPassword);
    }

    async submitForm() {
        await this.registerButton.click();
    }
}