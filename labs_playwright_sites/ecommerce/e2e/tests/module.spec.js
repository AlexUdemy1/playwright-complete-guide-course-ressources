import test, { expect } from "@playwright/test";

const cars = [
    {name: "BMW X5"},
    {name: "Lotus Eletre" },
    {name: "MERCEDES BENZ CLASS V"},
    {name: "MERCEDES BENZ EQB"},
    {name: "Mercedes Benz EQE"},
    {name: "RENAULT CAPTUR"},
    {name: "Renaud Clio"},
    {name: "Tesla Model Y"},
    {name: "Volkswagen Polo"},
    {name: "Volkswagen Taigo"},
]

test.describe('testing the Cart', () => {
    test.beforeEach(async ({page}) => {
        await page.goto("http://localhost:3000/login");
        // Arrange
        const email = page.getByRole('textbox', {name: 'email'});
        const password = page.getByRole('textbox', {name: 'password'});
        const loginBtn = page.getByRole('button', {name: 'Login'})
        // Act
        await email.fill('admin@gmail.com');
        await password.fill('admin');
        await loginBtn.click();
    })

    test('Increase and Decrease Quantity in Cart', async ({page}) => {
        await page.goto("http://localhost:3000/shop")
        const BmwX5Car = page.getByRole('listitem').filter({has: page.getByText(/BMW X5/i)}).getByRole('button', {name: /add to cart/i});
        const gotoCartIcon = page.getByRole('img', {name: 'cart icon'});
        const BmwX5CarInCart = page.getByRole('listitem').filter({has: page.getByText(/BMW X5/i)});

        await BmwX5Car.click();
        await gotoCartIcon.click();
        await expect(BmwX5CarInCart).toBeVisible();

        // Increase Quantity by One and then remove quantity By One

        // Function to increase or decrease a quantity in the Cart
        const addRemoveQuantity = (operation, car) => {
            return page.getByRole('button', {name: `${operation} quantity of ${car}`});
        }

        // Function to find the quantity of a specific car in the Cart
        const carQuantity = (car) => { 
            return page.getByRole('group', {name: `Quantity for ${car}`})
                    .filter({has: page.locator("span[aria-live='polite']")}) 
        };
        const subtotal = page.locator("p[aria-label='subtotal']");
        await addRemoveQuantity('Increase', 'BMW X5').click();
        await expect(carQuantity("BMW X5")).toContainText("2");
        await expect(subtotal).toContainText("79998");
    });

    test.beforeEach('teardow', async ({page}) => {
        await page.goto("http://localhost:3000/cart");
        const emptyCart = page.getByText('Continue Shopping');
        // Function to increase or decrease a quantity in the Cart
        const decreaseQuantity = async (car) => {
            const button = page.getByRole('button', { name: new RegExp(`Decrease quantity of ${car}`, 'i') });
            if (button.isVisible()) {
              await button.click();
            }
          };
        while(!(await emptyCart.isVisible())) {
            for(let car of cars) {
                decreaseQuantity(car);
            }
            await page.waitForTimeout(500);
        }
    })
});