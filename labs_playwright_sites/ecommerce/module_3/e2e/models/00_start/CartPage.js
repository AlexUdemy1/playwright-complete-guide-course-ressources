/***
 * @description This file contains the PaymentSuccessPage class, which represents the payment success page of the e-commerce site.
 * It provides methods to interact with the elements on the page, such as checking for a success message and clicking on the continue button.
 */
export class CartPage {
    constructor(page) { // Constructor to initialize the CartPage class
        this.page = page; // Assign the page object to the instance variable
    }

    async goto() {
        await this.page.goto('/cart'); // Navigate to the cart page
    }
}