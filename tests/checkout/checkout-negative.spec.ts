import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';

test.describe('Checkout - Pruebas Negativas', () => {

        test('No permitir acceder al checkout overview directamente desde URL', async ({ page }) =>{
        await page.goto('https://www.saucedemo.com/checkout-step-two.html');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('No permitir continuar al checkout-step-two con el formulario vacio', async ({ page }) => {
        const login = new LoginPage(page);
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        // Navegar y hacer login
        await login.navigate();
        await login.login('standard_user', 'secret_sauce');

        // Agrega algun producto e ir al carrito
        await inventory.addProductToCart('Sauce Labs Backpack');
        await inventory.goToCart();

        // Validar que el carrito este vacio
        //const isEmpty = await cart.isCartEmpty();
        //expect(isEmpty).toBeTruthy();

        // Intentar continuar
        await cart.proceedToCheckout();

        // Validar que esta en fomulario checkout-step-one
        const formVisible = await checkout.validateForm();
        expect (formVisible).toBeTruthy();

        // Hacer click en 'Continue'
        await checkout.submitForm();

        // Validar que aparezca mensaje de error
        const errorVisible = await checkout.getErrorMessage();
        expect(errorVisible).toContain('First Name is required');
    });

test('cancelar desde overview regresa al inventory screen', async ({ page }) =>{
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const overview = new CheckoutOverviewPage(page);
    const complete = new CheckoutCompletePage(page);
    //Navegar y hacer login
    await login.navigate();
    await login.login('standard_user','secret_sauce');
    //Agregar producto y navegar al carrito
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    //Entrar al Checkout
    await cart.proceedToCheckout();
    //Llenar formulario
    await checkout.fillCheckoutForm('Harry','Vasquez', '110111');
    // Ir al checkout-step-two
    await checkout.submitForm();
    // Validar que existan items
    const count = await overview.getItemsCount();
    expect(count).toBeGreaterThan(0);
    // Validar totales
    const subtotal = await overview.getSubtotal();
    const tax = await overview.getTax();
    const total = await overview.getTotal();
    expect(total).toBeCloseTo(subtotal + tax,2);
    // Continuar al Complete page
    await overview.cancelPurchase();    
});

    }); 

test.describe('Checkout - No permitir continuar si falta algun dato del dormulario', () => {
    test('No avanzar al checkout-step-two si falta nombre', async ({ page }) => {
        const login = new LoginPage(page);
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        // Navegar y hacer login
        await login.navigate();
        await login.login('standard_user','secret_sauce');

        // Agregar algun producto e ir al carrito
        await inventory.addProductToCart('Sauce Labs Backpack');
        await inventory.goToCart();

        // Intentar continuar
        await cart.proceedToCheckout();

        // Validar que esta en el formulario checkout-step-one
        const formVisible = await checkout.validateForm();
        expect (formVisible).toBeTruthy();

        // Llenar formulario SIN fisrt name
        await checkout.lastNameInput.fill('Vasquez');
        await checkout.postalCodeInput.fill('110111');

        // Enviar forma
        await checkout.submitForm();

        // Validar mensaje de error
        const errorText = await checkout.getErrorMessage();
        expect(errorText).toContain('First Name is required');
    });

     test('No avanzar al checkout-step-two si falta apellido', async ({ page }) => {
        const login = new LoginPage(page);
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        // Navegar y hacer login
        await login.navigate();
        await login.login('standard_user','secret_sauce');

        // Agregar algun producto e ir al carrito
        await inventory.addProductToCart('Sauce Labs Backpack');
        await inventory.goToCart();

        // Intentar continuar
        await cart.proceedToCheckout();

        // Validar que esta en el formulario checkout-step-one
        const formVisible = await checkout.validateForm();
        expect (formVisible).toBeTruthy();

        // Llenar formulario SIN fisrt name
        await checkout.firstNameInput.fill('Harry');
        await checkout.postalCodeInput.fill('110111');

        // Enviar forma
        await checkout.submitForm();

        // Validar mensaje de error
        const errorText = await checkout.getErrorMessage();
        expect(errorText).toContain('Last Name is required');
    });

     test('No avanzar al checkout-step-two si falta postalCode', async ({ page }) => {
        const login = new LoginPage(page);
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        // Navegar y hacer login
        await login.navigate();
        await login.login('standard_user','secret_sauce');

        // Agregar algun producto e ir al carrito
        await inventory.addProductToCart('Sauce Labs Backpack');
        await inventory.goToCart();

        // Intentar continuar
        await cart.proceedToCheckout();

        // Validar que esta en el formulario checkout-step-one
        const formVisible = await checkout.validateForm();
        expect (formVisible).toBeTruthy();

        // Llenar formulario SIN fisrt name
        await checkout.firstNameInput.fill('Harry');
        await checkout.lastNameInput.fill('Vasquez');

        // Enviar forma
        await checkout.submitForm();

        // Validar mensaje de error
        const errorText = await checkout.getErrorMessage();
        expect(errorText).toContain('Postal Code is required');
    });
});