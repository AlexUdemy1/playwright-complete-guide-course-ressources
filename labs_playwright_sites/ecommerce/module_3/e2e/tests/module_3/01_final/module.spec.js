import { expect, test } from "@playwright/test";
import { CartPage } from "../../../models/01_final/CartPage";
import { LoginPage } from "../../../models/01_final/LoginPage";
import { ShopPage } from "../../../models/01_final/ShopPage";

test.describe('testing the Cart', () => {
    test.beforeEach(async ({page}) => {
        // Arrange
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        // Act
        await loginPage.fillLoginForm('admin@gmail.com', 'admin');
        await loginPage.clickLogin();
    })

    test('should be able to Increase Quantity in Cart', async ({page}) => {
        // Arrange
        const shopPage = new ShopPage(page); 
        const cartPage = new CartPage(page);  
        await shopPage.goto()
        
        // Add car to the cart
        await shopPage.addCarToCart('BMW X5');
        await shopPage.cartIcon.click();
        await expect(cartPage.verifyCartItem('BMW X5')).resolves.toBeVisible();

        // Increase Quantity by One and then remove quantity By One
        await cartPage.addRemoveQuantity('Increase', 'BMW X5').click();
        await expect(cartPage.carQuantity("BMW X5")).toContainText("2");
        await expect(cartPage.subtotal).toContainText("79998");
    });

    test('should be able to Decrease Quantity in Cart', async ({page}) => {
        // Arrange
        const shopPage = new ShopPage(page); 
        const cartPage = new CartPage(page);  
        await shopPage.goto()
        
        // Add car to the cart
        await shopPage.addCarToCart('BMW X5');
        await shopPage.cartIcon.click();
        await expect(cartPage.verifyCartItem('BMW X5')).resolves.toBeVisible();

        // Increase Quantity by One and then remove quantity By One
        await cartPage.addRemoveQuantity('Increase', 'BMW X5').click();
        await expect(cartPage.carQuantity("BMW X5")).toContainText("2");
        await expect(cartPage.subtotal).toContainText("79998");
        
        // Decrease Quantity by One
        await cartPage.addRemoveQuantity('Decrease', 'BMW X5').click();
        await expect(cartPage.carQuantity("BMW X5")).toContainText("1");
    });

    test.afterEach('teardow', async ({context}) => {
        const page = await context.newPage();
        const response = await page.request.post('http://localhost:3001/cart/clear');
        await page.close();

        if (response.status() !== 200) {
            console.warn('Cart reset failed with status:', response.status());
        } else {
            console.log('Cart reset successfully');
        }
    })
});