/***
 * @description This file contains the PaymentSuccessPage class, which represents the payment success page of the e-commerce site.
 * It provides methods to interact with the elements on the page, such as checking for a success message and clicking on the continue button.
 */
export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = this.page.getByRole('listitem');
        this.subtotal = this.page.locator("p[aria-label='subtotal']");
    }

    async goto() {
        await this.page.goto('/cart'); 
    }

    async getCartItemCount() {
        return await this.page.locator(this.cartItems).count();
    }

    async verifyCartItem(itemName) {
        return this.page.getByRole('listitem').filter({has: this.page.getByText(itemName)});
    }

    addRemoveQuantity(operation, car) {
        return this.page.getByRole('button', { name: `${operation} quantity of ${car}` });
    }
    carQuantity(car) {
        return this.page.getByRole('group', { name: `Quantity for ${car}` })
            .filter({ has: this.page.locator("span[aria-live='polite']") });
    }
}