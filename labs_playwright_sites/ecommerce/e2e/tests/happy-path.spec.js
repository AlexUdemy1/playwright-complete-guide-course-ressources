import { expect, test } from "@playwright/test";

test('login failed successfully', async ({page}) => {
    await page.goto("http://localhost:3000/login");

    // Arrange
    const email = page.getByRole('textbox', {name: 'email'});
    const password = page.getByRole('textbox', {name: 'password'});
    const loginBtn = page.getByRole('button', {name: 'Login'})
    const errorMsg = page.getByText('Invalid credentials');

    // Act
    await email.fill('john.doe@hotmail.com');
    await password.fill('student');
    await loginBtn.click();

    //Assert
    await expect(errorMsg).toBeVisible();
});

// We will get back here in the Module for Cookies Management
test.skip('register user', async ({page, browser}) => {
    await page.goto("http://localhost:3000/login");
    // Arrange 
    const registerLink = page.getByRole('link', {name: 'Register'});
    // Act 
    await registerLink.click();
    // Assert
    await expect(page).toHaveURL('http://localhost:3000/register');

    // Register Form
    // Arrange
    const firstname = page.getByRole('textbox', {name: 'firstname'});
    const lastname = page.getByRole('textbox', {name: 'lastname' });
    const email = page.getByRole('textbox', { name: 'email' });
    const postalCode = page.getByRole('textbox', { name: 'postalCode'});
    const address = page.getByRole('textbox', {name: 'address'});
    const country = page.getByRole('textbox', { name: 'country'});
    const username = page.getByRole('textbox', { name: 'username'});
    const password = page.getByRole('textbox', { name: 'password' });
    const registerBtn = page.getByRole('button', {name: 'Register'});
    const accountCreatedMsg = page.getByText('Account created successfully!');

    // Act
    await firstname.fill('John');
    await lastname.fill('Doe');
    await email.fill('john.doe@hotmail.com');
    await postalCode.fill('W91AN');
    await address.fill('1 Queen Street');
    await country.fill('UK');
    await username.fill('johndoe123');
    await password.fill('johndoe123');
    await registerBtn.click();

    // Assert
    await expect(accountCreatedMsg).toBeVisible();
});

test('buy a car', async ({page}) => {
    await page.goto("http://localhost:3000/login");
    // Login 
    // Arrange
    const email = page.getByRole('textbox', {name: 'email'});
    const password = page.getByRole('textbox', {name: 'password'});
    const loginBtn = page.getByRole('button', {name: 'Login'})
    // Act
    await email.fill('john.doe@hotmail.com');
    await password.fill('johndoe123');
    await loginBtn.click();

    // Add item to Cart
    // Arrange
    const lotusCar = page.getByRole('listitem').filter({has: page.getByText(/lotus/i)}).getByRole('button', {name: /add to cart/i});
    const gotoCart = page.getByRole('img', {name: 'cart icon'})
    const itemInCart = page.getByRole('listitem').filter({has: page.getByText(/lotus/i)});
    // Act
    await lotusCar.click();
    await gotoCart.click();
    // Assert
    await expect(itemInCart).toBeVisible();

    // Cart to Checkout
    // Arrange
    const registerBtn = page.getByRole('button', {name: /checkout/i});
    const checkoutFormTitle = page.getByRole('heading', {name: 'Checkout Form'});
    // Act 
    await registerBtn.click()
    // Assert
    await expect(checkoutFormTitle).toBeVisible();

    // Checkout
    // Arrange
    const firstname = page.locator('#firstname');
    const emailCheckout = page.getByRole('textbox', {name: /email/i});
    const phone = page.getByRole('textbox', {name: /phone/i});
    const shipping = page.getByRole('textbox', {name: /shipping/i});
    const billing = page.getByRole('textbox', {name: /billing/i});
    const country = page.getByRole('textbox', {name: /country/i});
    const postalCode = page.getByRole('textbox', {name: /postal/i});
    const payBtn = page.getByRole('button', {name: 'Pay'});

    // Act
    await firstname.fill('John');
    await emailCheckout.fill('johnDoe@hotmail.com');
    await phone.fill('020 1234 1234');
    await shipping.fill('1 Queen Street');
    await billing.fill('1 King Street');
    await country.fill('UK');
    await postalCode.fill('W91AN');

    await payBtn.click();
    const paymentSuccess = page.getByRole('heading', {name: 'Payment Successful!'})

    // Assert
    await expect(paymentSuccess).toBeVisible();
});