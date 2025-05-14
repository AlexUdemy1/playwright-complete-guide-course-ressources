/***
 * @description This file contains the PaymentSuccessPage class, which represents the payment success page of the e-commerce site.
 * It provides methods to interact with the elements on the page, such as checking for a success message and clicking on the continue button.
 */
export class ShopPage {
    constructor(page) {
        this.page = page;
        this.itemList = this.page.getByRole('listitem');
        this.addToCartButton = this.page.getByRole('button', { name: /add to cart/i });
        this.cartIcon = this.page.getByRole('img', { name: 'cart icon' });
        
    }

    async goto() {
        await this.page.goto('/shop');
    }

    async addCarToCart(carName) {
        const carItem = this.itemList.filter({ has: this.page.getByText(carName) });
        const addToCartButton = carItem.getByRole('button', { name: /add to cart/i });
        await addToCartButton.click();
    }
}